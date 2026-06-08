const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const urls = [];
  
  page.on('response', response => {
    const url = response.url();
    if (url.includes('.glb') || url.includes('.gltf') || url.includes('cdn.sanity.io/files')) {
      console.log('FOUND:', url);
      urls.push(url);
    }
  });

  await page.goto('https://hashgraphvc.com/', {waitUntil: 'networkidle0'});
  
  console.log('All found URLs:');
  urls.forEach(u => console.log(u));
  
  await browser.close();
})();
