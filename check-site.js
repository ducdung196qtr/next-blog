const https = require('https');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  const html = await fetch('https://next-blog-vert.vercel.app');

  // 1. Check dark mode
  const hasDarkScript = html.includes('classList.add(\'dark\')') || html.includes('classList.add("dark")');
  console.log('=== DARK MODE ===');
  console.log('Inline script:', hasDarkScript ? '✅ YES' : '❌ NO');
  console.log('html.dark in page:', html.includes('html.dark') ? '✅ YES' : '❌ NO');

  // 2. Extract CSS URL
  const cssMatch = html.match(/href="(\/_next\/static\/css\/[^"]+\.css)"/);
  if (cssMatch) {
    const cssUrl = 'https://next-blog-vert.vercel.app' + cssMatch[1];
    console.log('\n=== CSS ANALYSIS ===');
    console.log('CSS URL:', cssUrl);
    
    const css = await fetch(cssUrl);
    
    // Check html.dark selector
    const darkIndex = css.indexOf('html.dark');
    if (darkIndex >= 0) {
      console.log('html.dark selector: ✅ YES at byte', darkIndex);
      const snippet = css.substring(darkIndex, darkIndex + 80);
      console.log('  Preview:', snippet);
    } else {
      console.log('html.dark selector: ❌ NO');
    }
    
    // Check :root block
    const rootMatches = css.match(/:root\s*\{/g);
    console.log(':root blocks:', rootMatches ? rootMatches.length : 0);
    
    // Check if .dark (without html) exists (old bug)
    const oldDarkCount = (css.match(/^[^h]*\.dark\s*\{/gm) || []).length;
    console.log('Bare .dark blocks (without html):', oldDarkCount);
  }

  // 3. Hero structure
  console.log('\n=== HERO ===');
  console.log('.hero class:', html.includes('class="hero"') ? '✅ YES' : '❌ NO');
  console.log('.hero-main:', html.includes('hero-main') ? '✅ YES' : '❌ NO');
  
  // 4. Image quality
  const q1600 = (html.match(/w=1600/g) || []).length;
  const q1200 = (html.match(/w=1200/g) || []).length;
  console.log('\n=== IMAGES ===');
  console.log('1600px images:', q1600);
  console.log('1200px images:', q1200);

  // 5. Dark mode toggle button
  const hasToggle = html.includes('dark-toggle');
  console.log('\n=== TOGGLE BUTTON ===');
  console.log('.dark-toggle:', hasToggle ? '✅ YES' : '❌ NO');
}

main().catch(e => console.error('ERROR:', e.message));
