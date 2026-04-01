const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 打开目标网页（使用正确的登录页面）
  await page.goto('http://jcerp.jcintergl.com/#/login?redirect=/dashboard', { waitUntil: 'networkidle' });
  console.log('🌐 已打开 JCErp 登录页面，请手动完成登录操作');

  // 抓取页面内容
  const html = await page.content();
  fs.writeFileSync('page-content.html', html);
  console.log('📄 已保存页面 DOM 到 page-content.html');

  // 截图功能
  await page.screenshot({ path: 'target-screenshot.png', fullPage: true });
  console.log('📸 已保存页面截图到 target-screenshot.png');

  // 暂停，等待人工操作
  await page.pause();
  console.log('====================================================');
  console.log('🔴 【Resume】按钮！');
  console.log('====================================================');

  // 彻底暂停，把方向盘交给人类
  await page.pause();

  // 人类点击 Resume 后，脚本接管，只做一件事：拍照+拔源码
  console.log('📸 收到恢复指令，正在咔嚓截图并保存源码...');
  await page.screenshot({ path: 'target-screenshot.png', fullPage: true });
  const finalHtml = await page.content();
  fs.writeFileSync('page-content.html', finalHtml);
  console.log('📄 已更新页面 DOM 到 page-content.html');

  // 恢复后，保存真实的登录凭证
  await context.storageState({ path: 'auth.json' });
  console.log('✅ 真实的网页凭证已成功保存到 auth.json！');

  await browser.close();
  console.log('✅ 抓取完美结束！请根据 target-screenshot.png 和 page-content.html 生成 React 原型！');
})();