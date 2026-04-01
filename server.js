const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

// 设置跨域
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const RESUME_AGENT_PATH = path.join(__dirname, 'resume-agent');

// 1. 全自动执行端点
app.post('/api/run-agent', async (req, res) => {
  const { requirements, onlyExport } = req.body;
  
  try {
    // 确保目录存在
    const resumesDir = path.join(__dirname, 'resumes');
    if (!fs.existsSync(resumesDir)) fs.mkdirSync(resumesDir, { recursive: true });
    if (!fs.existsSync(RESUME_AGENT_PATH)) fs.mkdirSync(RESUME_AGENT_PATH, { recursive: true });

    // A. 自动更新人才画像 (requirements.json)
    const jsonPath = path.join(RESUME_AGENT_PATH, 'requirements.json');
    fs.writeFileSync(jsonPath, JSON.stringify(requirements, null, 2), 'utf8');
    console.log(`[Agent] 人才画像已写入: ${jsonPath}`);
    
    // B. 自动生成影刀指令 Excel
    const excelPath = path.join(resumesDir, 'requirements.xlsx');
    console.log('[Agent] 正在导出影刀指令 Excel...');
    await runScript(`node ${path.join(RESUME_AGENT_PATH, 'scripts/export_requirements.js')}`);

    if (onlyExport) {
      return res.json({ 
        success: true, 
        message: "画像已同步，Excel 指令已生成。",
        jsonPath: jsonPath,
        excelPath: excelPath
      });
    }

    res.json({ 
      success: true, 
      message: "全自动流水线已启动！",
      jsonPath: jsonPath,
      excelPath: excelPath
    });
  } catch (err) {
    console.error('[ServerError]', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. 触发 AI 筛选 (供 RPA 完成后自动回调或手动触发)
app.post('/api/run-screening', async (req, res) => {
  try {
    console.log('[Agent] 正在启动 AI 智能筛选分析...');
    const result = await runScript(`node ${path.join(RESUME_AGENT_PATH, 'scripts/ai_screener.js')}`);
    res.json({ success: true, log: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

function runScript(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) reject(error);
      else resolve(stdout);
    });
  });
}

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`[Agent Server] 后端调度中心已在端口 ${PORT} 启动。`);
});
