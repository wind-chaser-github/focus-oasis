const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const urls = [];
  
  page.on('response', response => {
    const url = response.url();
    if (url.includes('.json')) {
      urls.push(url);
    }
  });

  await page.goto('https://hashgraphvc.com/', {waitUntil: 'networkidle0', timeout: 30000});
  
  // Simulate scrolling to trigger all scene loads
  for(let i=0; i<10; i++) {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await new Promise(r => setTimeout(r, 1000));
  }
  
  console.log('Found JSON URLs:');
  [...new Set(urls)].forEach(u => console.log(u));
  
  await browser.close();
})();
