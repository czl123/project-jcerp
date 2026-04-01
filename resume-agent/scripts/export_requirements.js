const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');
const config = require('../requirements.json');

async function exportRequirements() {
  const dir = path.join(__dirname, '../../resumes');
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('影刀指令表');

  // 定义影刀最容易读取的表头格式
  worksheet.columns = [
    { header: '任务ID', key: 'id', width: 10 },
    { header: '搜索关键词', key: 'keywords', width: 40 },
    { header: '目标岗位', key: 'role', width: 25 },
    { header: '最低学历', key: 'education', width: 15 },
    { header: '经验范围', key: 'experience', width: 15 },
    { header: '处理状态', key: 'status', width: 15 }, // 影刀抓取完可以反填此列
  ];

  const configs = Array.isArray(config) ? config : [config];

  configs.forEach((item, index) => {
    worksheet.addRow({
      id: index + 1,
      keywords: Array.isArray(item.keywords) ? item.keywords.join(' ') : item.keywords,
      role: item.role,
      education: item.education,
      experience: item.experience,
      status: '待抓取'
    });
  });

  const filePath = path.join(dir, 'requirements.xlsx');
  await workbook.xlsx.writeFile(filePath);
  console.log(`[Success] 影刀指令表已生成！共 ${configs.length} 个任务。`);
}
exportRequirements().catch(err => {
  console.error('[Error] 导出失败:', err);
  process.exit(1);
});
