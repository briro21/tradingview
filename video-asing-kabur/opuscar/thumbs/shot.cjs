const http = require('http'), fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const { chromium } = require('playwright'); const dir = __dirname;
const srv = http.createServer((q, r) => { const f = path.join(dir, decodeURIComponent(q.url.split('?')[0])); if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); } r.writeHead(200); fs.createReadStream(f).pipe(r); });
(async () => {
  await new Promise(r => srv.listen(0, r));
  const exe = execSync('ls -d /opt/pw-browsers/chromium_headless_shell-*/*/chrome-headless-shell | head -1').toString().trim();
  const b = await chromium.launch({ executablePath: exe }), p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  for (const v of [1, 2, 3]) { await p.goto(`http://127.0.0.1:${srv.address().port}/index.html?v=${v}`); await p.waitForFunction(() => window.READY); await p.screenshot({ path: process.argv[2] + `/pesangon-thumb-${v}.png` }); }
  await b.close(); srv.close();
})();
