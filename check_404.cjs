const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('requestfailed', request => {
    console.log('FAILED:', request.url(), request.failure().errorText);
  });
  
  page.on('response', response => {
    if (response.status() >= 400) {
      console.log('404:', response.url());
    }
  });

  await page.goto('http://localhost:8999', {waitUntil: 'networkidle0', timeout: 5000}).catch(e => console.log('Timeout/Error:', e.message));
  
  await browser.close();
})();
