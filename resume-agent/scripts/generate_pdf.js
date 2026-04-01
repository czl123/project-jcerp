const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

async function generatePRA_PDF() {
  const resumesDir = path.join(__dirname, '../../resumes');
  if (!fs.existsSync(resumesDir)) fs.mkdirSync(resumesDir, { recursive: true });

  const doc = new PDFDocument({ margin: 50 });
  const outputPath = path.join(resumesDir, 'Resume_Agent_PRA_Standard.pdf');
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // --- 中文字体支持 (Windows 微软雅黑) ---
  const chineseFont = 'C:\\Windows\\Fonts\\msyh.ttc'; 
  if (fs.existsSync(chineseFont)) {
    doc.font(chineseFont);
  } else {
    console.warn('[Warning] 未发现微软雅黑字体，中文可能显示不正常。');
  }

  // --- 文档内容 ---
  doc.fontSize(22).text('简历筛选 Agent 全流程自动化方案 (PRA 标准文档)', { align: 'center' });
  doc.moveDown(1);

  doc.fontSize(14).fillColor('#333').text('1. 项目概述 (Project Overview)', { underline: true });
  doc.fontSize(10).fillColor('#666').text('项目名称：智能简历筛选与全自主采集 Agent (Resume Screening Agent - RSA)');
  doc.text('业务目标：实现从“人才画像配置”到“简历全网采集”再到“AI 深度评估”的全链路闭环。');
  doc.moveDown();

  doc.fontSize(14).fillColor('#333').text('2. 流程需求分析 (Process Requirement Analysis - PRA)', { underline: true });
  doc.fontSize(10).fillColor('#666').text('2.1 业务流程描述：');
  doc.text('1. 需求阶段：用户在控制面板输入岗位名称、职级、核心技能及定制化评估权重指标。');
  doc.text('2. 指令阶段：Agent 自动将画像转化为结构化的 requirements.xlsx 指令表。');
  doc.text('3. 采集阶段：影刀 RPA 读取指令表，模拟真人登录，并将简历下载至本地。');
  doc.text('4. 分析阶段：Agent 自动分析 PDF 文字，对照岗位专属指标进行加权打分。');
  doc.text('5. 交付阶段：自动生成 shortlist.xlsx 结果清单，并触发后续通知。');
  doc.moveDown();

  doc.fontSize(14).fillColor('#333').text('3. 技术架构设计 (Solution Design)', { underline: true });
  doc.fontSize(10).fillColor('#666').text('技术栈：React (前端), Node.js (调度器), 影刀 (RPA), Gemini-1.5-Flash (AI引擎)。');
  doc.text('安全合规：数据仅保存在本地 resumes/ 目录，不泄露至公有云。');
  doc.moveDown();

  doc.fontSize(14).fillColor('#333').text('4. 核心评估维度 (Evaluation Matrix)', { underline: true });
  doc.fontSize(10).fillColor('#666').text('系统支持针对不同职级进行动态权重分配：');
  doc.text('- 初级/中级：基础技能匹配度(60%)、稳定性(30%)、潜力(10%)');
  doc.text('- 高级/专家：架构设计能力(40%)、底层原理(30%)、经验(30%)');
  doc.moveDown();

  doc.fontSize(14).fillColor('#333').text('5. 异常处理与稳定性', { underline: true });
  doc.fontSize(10).fillColor('#666').text('系统具备完备的反爬虫防护、格式解析失败自动转人工、以及 LLM 服务重试机制。');
  doc.moveDown(2);

  doc.fontSize(10).fillColor('#aaa').text('--- 文档结束 ---', { align: 'center' });
  doc.text(`导出时间: ${new Date().toLocaleString()}`, { align: 'center' });

  doc.end();
  
  stream.on('finish', () => {
    console.log(`[Success] PRA 标准 PDF 文档已生成: ${outputPath}`);
  });
}

generatePRA_PDF().catch(err => {
  console.error('[Error] PDF 生成失败:', err);
});
