const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const urls = [];
  
  page.on('response', response => {
    const url = response.url();
    // Log any file that might be a 3D model
    if (url.includes('.glb') || url.includes('.gltf') || url.includes('.obj') || url.includes('.bin') || url.includes('models/')) {
      urls.push(url);
    }
  });

  // The site might need time to load the background scene after the initial HTML
  await page.goto('https://hashgraphvc.com/', {waitUntil: 'networkidle0', timeout: 30000});
  
  // Try waiting an extra 5 seconds just in case it loads lazy
  await new Promise(r => setTimeout(r, 5000));
  
  console.log('Found 3D Model URLs:');
  urls.forEach(u => console.log(u));
  
  // If no URLs found, print all requests to debug
  if (urls.length === 0) {
    console.log('No 3D models found. Let us try clicking the screen or scrolling...');
  }
  
  await browser.close();
})();
