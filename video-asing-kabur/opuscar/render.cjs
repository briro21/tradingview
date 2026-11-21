// Render an OpusCar-style canvas film (window.DUR / render(t) / READY) to stills or an mp4.
// node render.cjs <dir> --stills 1,5,9 [--out dir]      |   node render.cjs <dir> --video out.mp4 [--fps 30] [--size 1920x1080]
const http = require('http'), fs = require('fs'), path = require('path'), { spawn, execSync } = require('child_process');
const { chromium } = require('playwright');
const args = process.argv.slice(2), dir = path.resolve(args[0]);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const [W, H] = opt('--size', '1920x1080').split('x').map(Number), FPS = +opt('--fps', 30);
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.ttf': 'font/ttf', '.json': 'application/json' };
const srv = http.createServer((q, r) => { const f = path.join(dir, decodeURIComponent(q.url.split('?')[0])); if (!f.startsWith(dir) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); });
const exe = (() => { try { return execSync('ls -d /opt/pw-browsers/chromium_headless_shell-*/*/chrome-headless-shell | head -1').toString().trim(); } catch { return undefined; } })();
(async () => {
  await new Promise(r => srv.listen(0, r)); const port = srv.address().port;
  const browser = await chromium.launch({ executablePath: exe || undefined });
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  page.on('pageerror', e => { console.error('PAGE ERROR', e.message); process.exit(1); });
  await page.goto(`http://127.0.0.1:${port}/index.html${opt('--q', '') ? '?' + opt('--q') : ''}`);
  await page.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
  const DUR = await page.evaluate(() => window.DUR);
  if (opt('--stills')) {
    const out = opt('--out', path.join(dir, 'stills')); fs.mkdirSync(out, { recursive: true });
    for (const t of opt('--stills').split(',').map(Number)) { await page.evaluate(t => window.render(t), t); await page.screenshot({ path: path.join(out, `t_${t.toFixed(2)}.jpg`), type: 'jpeg', quality: 88 }); }
  } else {
    const out = path.resolve(opt('--video')), N = Math.round(DUR * FPS), t0 = Date.now();
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let f = 0; f < N; f++) {
      await page.evaluate(t => window.render(t), f / FPS);
      const buf = await page.screenshot({ type: 'jpeg', quality: 94 });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (f % 150 === 0) console.log(`${f}/${N} ${((Date.now() - t0) / 1000).toFixed(0)}s`);
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r));
    console.log('done', out, ((Date.now() - t0) / 1000).toFixed(0) + 's');
  }
  await browser.close(); srv.close();
})();
