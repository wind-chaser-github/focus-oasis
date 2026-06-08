const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({defaultViewport: {width: 1920, height: 1080}});
  const page = await browser.newPage();
  
  await page.goto('https://hashgraphvc.com/', {waitUntil: 'networkidle2'});
  
  for(let i = 0; i < 5; i++) {
    await page.screenshot({path: `hashgraph_screen_${i}.png`});
    await new Promise(r => setTimeout(r, 1000));
    // Simulate mouse move to trigger parallax/animation
    await page.mouse.move(960 + i*50, 540 + i*50);
  }
  
  await browser.close();
})();
