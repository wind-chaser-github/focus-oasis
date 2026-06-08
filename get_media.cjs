const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const urls = [];
  
  page.on('response', response => {
    const url = response.url();
    if (url.includes('.webm') || url.includes('.mp4') || url.includes('.json') || url.includes('.lottie') || url.includes('.glb')) {
      urls.push(url);
    }
  });

  await page.goto('https://hashgraphvc.com/', {waitUntil: 'networkidle0', timeout: 30000});
  
  // Simulate scrolling and moving
  for(let i=0; i<5; i++) {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await page.mouse.move(500, 500);
    await new Promise(r => setTimeout(r, 1000));
  }
  
  console.log('Found Media URLs:');
  [...new Set(urls)].forEach(u => console.log(u));
  
  await browser.close();
})();
