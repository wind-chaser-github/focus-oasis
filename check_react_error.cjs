const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('LOG:', msg.text()));
  page.on('pageerror', err => console.log('ERROR:', err.toString()));
  
  await page.goto('http://localhost:8999', {waitUntil: 'networkidle0', timeout: 5000}).catch(e => console.log('Timeout/Error:', e.message));
  
  await browser.close();
})();
