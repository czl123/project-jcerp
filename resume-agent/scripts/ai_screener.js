const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const ExcelJS = require('exceljs');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// 1. 初始化大模型 (Gemini)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'YOUR_API_KEY_HERE');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function extractText(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.pdf') {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } else if (ext === '.docx') {
    const data = await mammoth.extractRawText({ path: filePath });
    return data.value;
  }
  return '';
}

async function screenResume(resumeText, roleConfig) {
  const prompt = `
    你是一个专业的HR简历筛选助手。
    请针对【${roleConfig.role}】岗位进行简历评估。

    该岗位的具体评估指标及权重如下：
    ${roleConfig.indicators || '通用评估指标：技能匹配度、经验丰富度、稳定性。'}

    岗位基本要求：
    - 经验：${roleConfig.experience}
    - 技能：${roleConfig.skills}
    - 学历：${roleConfig.education}

    候选人简历内容：
    ---
    ${resumeText}
    ---

    请根据上述简历内容，严格按照【评估指标及权重】进行打分和分析。
    返回 JSON 格式结果：
    - score: 0-100分 (请根据权重计算总分)
    - matchReason: 核心匹配点 (对应指标的优势)
    - gapReason: 不足之处 (对应指标的缺失)
    - recommendation: 建议 (面试/储备/淘汰)

    仅返回 JSON 字符串。
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    // 清理 Markdown JSON 格式 (```json ... ```)
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(text);
  } catch (error) {
    console.error(`[AI Error] 模型评估失败:`, error.message);
    return { score: 0, matchReason: '评估失败', gapReason: error.message, recommendation: '错误' };
  }
}

async function main() {
  const downloadsDir = path.join(__dirname, '../../resumes/downloads');
  const reqPath = path.join(__dirname, '../../resumes/requirements.xlsx');
  const resultPath = path.join(__dirname, '../../resumes/shortlist.xlsx');

  if (!fs.existsSync(downloadsDir)) {
    console.log('[AI] 未发现下载的简历。');
    return;
  }

  // 读取需求
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(reqPath);
  const worksheet = workbook.getWorksheet('人才需求');
  const reqRow = worksheet.getRow(2);
  const requirements = {
    role: reqRow.getCell(1).value,
    experience: reqRow.getCell(2).value,
    skills: reqRow.getCell(3).value,
    education: reqRow.getCell(4).value,
    keywords: reqRow.getCell(6).value
  };

  const files = fs.readdirSync(downloadsDir);
  const results = [];

  for (const file of files) {
    const filePath = path.join(downloadsDir, file);
    console.log(`[AI] 正在解析并评估简历: ${file}...`);
    
    const text = await extractText(filePath);
    if (!text) continue;

    const analysis = await screenResume(text, requirements);
    results.push({ fileName: file, ...analysis });
  }

  // 写入筛选结果
  const resultWorkbook = new ExcelJS.Workbook();
  const resSheet = resultWorkbook.addWorksheet('筛选结果');
  resSheet.columns = [
    { header: '文件名', key: 'fileName', width: 25 },
    { header: '匹配分数', key: 'score', width: 10 },
    { header: '推荐状态', key: 'recommendation', width: 15 },
    { header: '匹配优势', key: 'matchReason', width: 40 },
    { header: '不足/风险', key: 'gapReason', width: 40 },
  ];
  resSheet.addRows(results);

  await resultWorkbook.xlsx.writeFile(resultPath);
  console.log(`[Success] 筛选报告已生成: ${resultPath}`);
  
  // 模拟发送邮件给人事
  const topCandidates = results.filter(r => r.score >= 80);
  console.log(`[Notify] 已将 ${topCandidates.length} 份优质简历发送给人事。`);
}

main().catch(err => {
  console.error('[Error] AI 筛选任务执行失败:', err);
});
