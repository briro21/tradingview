// Hira, Chapter 1: pure function of time. window.seek(t) paints frame t.
// Timeline (timeline.json) gives every narration line a start beat and a length; scenes*.js draw each one.
import * as M from './lib/motion.js';
import * as A from './lib/art.js';
import { SC1 } from './scenes1.js';
import { SC2 } from './scenes2.js';
import { SC3 } from './scenes3.js';
import { SC4 } from './scenes4.js';
import { SC5 } from './scenes5.js';

const { W, H, font } = M;
const TL = await fetch('timeline.json').then((r) => r.json());
const P = TL.period;
const ITEMS = TL.items.map((e) => ({ ...e, t0: e.beat * P, t1: (e.beat + e.nb) * P }));
const SC = { ...SC1, ...SC2, ...SC3, ...SC4, ...SC5 };
const HIT_MAP = {};   // key -> [[beatOffset, label, sfx, opts]]  (scenes export their own accents)
const byKey = Object.fromEntries(ITEMS.map((e) => [e.key, e]));

// Accents: [beat, label, sfx, opts]. scripts/sfx.mjs puts a sound on each one.
const HITS = [];
const add = (key, off, label, sfx, o) => { const e = byKey[key]; if (e) HITS.push([e.beat + off, label, sfx, o]); };
const CUT = new Set(['h2', 'title', '44', '48', '53', '56', '59', '64', '78', '104', '108', '112']);
ITEMS.forEach((e) => {
  if (e.key === 'h0') add(e.key, 0, 'open', 'sub');
  else if (CUT.has(e.key)) add(e.key, 0, 'impact cut', 'impact');
  else add(e.key, 0, 'cut', 'tick');
});
add('h1', 0, 'NOT HUMAN slam', 'impact'); add('h3', 0, 'prophecy', 'sub'); add('title', 0, 'title', 'bell', { pitch: 'A4' });
add('46', 0, 'grab', 'thud', { pitch: 'C2' }); add('46', 0.5, 'shake', 'crash', { len: 0.8 }); add('47', 0, 'angel', 'swell');
add('50', 0, 'squeeze', 'thud', { pitch: 'A1' }); add('55', 0, 'squeeze 2', 'thud', { pitch: 'A1' }); add('57', 0, 'squeeze 3', 'thud', { pitch: 'F1' });
add('58', 0, 'release', 'whoosh', { len: 0.6 }); add('59', 0, 'verse', 'bell', { pitch: 'D5' }); add('63', 1, 'last verse', 'bell', { pitch: 'A5' });
add('69', 0, 'door', 'thud'); add('87', 0, 'meet', 'whoosh', { len: 0.5 }); add('96', 0, 'prophecy', 'sub'); add('104', 0, 'nothing', 'sub'); add('110', 0, 'storm', 'crash', { len: 1.2 });

function find(t) { let lo = 0, hi = ITEMS.length - 1; while (lo < hi) { const m = (lo + hi + 1) >> 1; if (ITEMS[m].t0 <= t) lo = m; else hi = m - 1; } return ITEMS[lo]; }

// ------------------------------------------------------------ film grain tile (seeded) + post
let GRAIN = null;
function makeGrain() {
  const n = 256; const cv = document.createElement('canvas'); cv.width = n; cv.height = n; const g = cv.getContext('2d'); const id = g.createImageData(n, n); const r = M.mulberry32(77);
  for (let i = 0; i < n * n; i++) { const v = r() * 255; id.data[i * 4] = id.data[i * 4 + 1] = id.data[i * 4 + 2] = v; id.data[i * 4 + 3] = 255; }
  g.putImageData(id, 0, 0); return cv;
}

function draw(ctx, u, t) {
  if (t >= TL.total) { A.sky(ctx, [[0, '#000'], [1, '#000']]); return; }
  const e = find(t);
  const T = t - e.t0, dur = e.t1 - e.t0, p = Math.min(1, Math.max(0, T / dur));
  const s = { u, t, T, p, dur, lu: T / P, nb: e.nb, key: e.key, e, vo: e.vo_t == null ? -1 : t - e.vo_t, voDur: e.vo_dur, itemIndex: ITEMS.indexOf(e) };
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  const fn = SC[e.key];
  if (fn) fn(ctx, s); else { A.sky(ctx, [[0, '#111'], [1, '#222']]); A.caption(ctx, `scene ${e.key}`, W / 2, H / 2, 60); }
}
function post(ctx, u, t) {
  const e = find(t); const x = Math.floor(M.hash01(Math.floor(t * 24), 5) * 256), y = Math.floor(M.hash01(Math.floor(t * 24), 6) * 256);
  if (!GRAIN) return;
  ctx.save(); ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = 0.07;
  const pat = ctx.createPattern(GRAIN, 'repeat'); ctx.translate(-x, -y); ctx.fillStyle = pat; ctx.fillRect(0, 0, W + 256, H + 256);
  ctx.restore();
  A.vignette(ctx, e.key === '44' || e.key === 'h0' ? 0.3 : 0.4);
}

M.film({
  fonts: [font(100, 700, 'Display'), font(40, 500, 'UI'), font(80, 700, 'Arab')],
  hits: HITS,
  samples: 2,
  init: () => { GRAIN = makeGrain(); },
  draw, post,
});
