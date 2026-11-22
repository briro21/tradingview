// Episode 10 (Ed Zitron's week): motion engine + Halftone Dossier opening and part cards (Lemo-Opuscar style, MIT code).
// Pure function of time: window.seek(t) paints frame t. The clock is the narration: every shot and
// every element lands on the word that says it (data.js, generated from the episode's beats).
import * as M from './lib/motion.js';
import { DATA, HITS } from './data.js';

const { W, H, E, prog, lerp, clamp, springU, SPRING, wobble, font, layout, glyph, fill, rrect, U, hash01, noise1 } = M;

// Look: dark stage, warm white type, one accent (the red of the thumbnails). Cold open is the
// light thumbnail-A frame; part cards are red slabs.
const C = { bg: '#0D0D10', bg2: '#17171C', ink: '#F4F1EA', dim: '#B9B5AC', paper: '#F4F1EA', paperInk: '#141414', accent: '#FF3B30' };
const DISPLAY = 'Display', UI = 'UI';
const RED = DATA.theme.red;
const SHOTS = DATA.shots;
const WHIP = 0.42;                       // seconds a whip takes (both shots on screen)

// panel (1600x900, the episode's layout space) -> frame
const PX = (x) => 960 + (x - 800) * 1.1;
const PY = (y) => 500 + (y - 450) * 1.12;
const SC = 1.1;

// ------------------------------------------------------------ per-shot look
function look(i) {
  const s = SHOTS[i];
  const rich = s.part ? null : richOf(s);
  if (rich) return rich.k === 'bars' || rich.k === 'line' ? 'chart' : rich.k === 'sheet' ? 'sheet' : 'dark';
  if (s.id.startsWith('S00') || s.part) return 'dossier';
  return i % 3 === 2 ? 'paper' : 'dark';
}
// Halftone Dossier inks (Lemo-Opuscar style): cream paper, navy ink, cobalt overprint, pink dots, stamp red
const D = { paper: '#F1E6CF', ink: '#1B2A4A', cobalt: '#2F5BD3', pink: '#E85D8C', yellow: '#F2B53B', red: '#D62E2E' };
let DOSSIER = false;
const pal = (lk) => lk === 'dossier' ? { bg: D.paper, ink: D.ink, dim: '#3B4A6B', fillc: '#E6D5B0', dossier: true }
  : lk === 'paper' ? { bg: C.paper, ink: C.paperInk, dim: '#4A4740', fillc: '#E2DCCF' }
  : lk === 'red' ? { bg: C.accent, ink: '#141414', dim: '#2A0B08', fillc: '#D9302A' }
  : { bg: C.bg, ink: C.ink, dim: C.dim, fillc: '#2A2A31' };
const colorOf = (c, P) => (c === RED ? (P.dossier ? D.red : P.bg === C.accent ? '#FFFFFF' : C.accent) : P.ink);

// ------------------------------------------------------------ paths (lengths measured once)
const PATHS = new Map();
function pathOf(d) {
  let p = PATHS.get(d);
  if (!p) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    el.setAttribute('d', d);
    p = { p2: new Path2D(d), len: el.getTotalLength() };
    PATHS.set(d, p);
  }
  return p;
}
function strokeOn(ctx, d, k, color, width) {
  const { p2, len } = pathOf(d);
  if (k <= 0) return;
  ctx.save();
  ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (k < 1) { ctx.setLineDash([len, len + 1]); ctx.lineDashOffset = len * (1 - k); }
  ctx.stroke(p2);
  ctx.restore();
}

// ------------------------------------------------------------ text with a drawn arrow for "→"
function runs(str) { return str.split('→'); }
function measure(ctx, str, f, track) {
  const parts = runs(str); ctx.font = f;
  const size = parseFloat(f.split(' ')[1]);
  let w = 0;
  parts.forEach((p, i) => { w += layout(ctx, p, f, track).width; if (i < parts.length - 1) w += size * 0.95; });
  return w;
}
function arrowGlyph(ctx, x, y, size, color, k = 1) {
  const a = size * 0.62, yy = y - size * 0.36;
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = Math.max(3, size * 0.09); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(x + size * 0.14, yy); ctx.lineTo(x + size * 0.14 + a * k, yy);
  if (k > 0.6) { const hx = x + size * 0.14 + a * k; ctx.moveTo(hx - size * 0.22, yy - size * 0.2); ctx.lineTo(hx, yy); ctx.lineTo(hx - size * 0.22, yy + size * 0.2); }
  ctx.stroke(); ctx.restore();
}

// Display line: glyphs rise out of a mask on a spring, each a touch later than the last.
function displayText(ctx, str, cx, base, size, color, age, slam) {
  if (DOSSIER) size *= slam ? 0.64 : 0.82;   // the slab face runs wider than Anton; stamps add a border
  const f = font(size, 400, DOSSIER ? 'Slab' : DISPLAY), track = size * 0.01;
  const total = measure(ctx, str, f, track);
  let x = cx - total / 2;
  const parts = runs(str);
  let gi = 0;
  const sAge = age;
  if (slam) {
    // slam: whole line drops in big and settles with a squash; no mask
    const k = M.spring(sAge + 0, SPRING.snappy);
    const s = lerp(1.9, 1, clamp(k, 0, 1.2));
    const q = 0.06 * wobble(sAge - 0.16, 3, 7);
    ctx.save(); ctx.translate(cx, base - size * 0.35); ctx.scale(s * (1 + q), s * (1 - q));
    if (DOSSIER) {   // rubber stamp: tilted, double rounded border, ink-red
      ctx.rotate(-0.07);
      ctx.strokeStyle = D.red; ctx.lineWidth = size * 0.07;
      rrect(ctx, -total / 2 - size * 0.3, -size * 0.75, total + size * 0.6, size * 1.25, size * 0.18); ctx.stroke();
      ctx.lineWidth = size * 0.025;
      rrect(ctx, -total / 2 - size * 0.42, -size * 0.87, total + size * 0.84, size * 1.49, size * 0.24); ctx.stroke();
    }
    ctx.translate(-cx, -(base - size * 0.35));
    ctx.globalAlpha = clamp(sAge / 0.06);
  } else {
    ctx.save();
    ctx.beginPath(); ctx.rect(0, base - size * 1.25, W, size * 1.25 + size * 0.28); ctx.clip();
  }
  parts.forEach((p, pi) => {
    const L = layout(ctx, p, f, track);
    L.glyphs.forEach((g) => {
      const a = slam ? 1 : M.spring(sAge - gi * 0.022, SPRING.bouncy);
      gi++;
      if (a <= 0) return;
      if (DOSSIER && !slam) { ctx.save(); ctx.globalAlpha *= 0.55; glyph(ctx, g.ch, x + g.cx + size * 0.05, base + (1 - a) * size * 1.15 + size * 0.05, f, D.cobalt); ctx.restore(); }
      glyph(ctx, g.ch, x + g.cx, base + (1 - a) * size * 1.15, f, color);
    });
    x += L.width;
    if (pi < parts.length - 1) {
      const a = slam ? 1 : clamp((sAge - gi * 0.022) / 0.25);
      arrowGlyph(ctx, x, base, size, color, E.outCubic(a));
      x += size * 0.95;
    }
  });
  ctx.restore();
}

// UI line: a left-to-right wipe with a short slide; the wipe edge leads with an accent bar.
function uiText(ctx, str, cx, base, size, color, age, accent) {
  const f = font(size, 600, UI);
  const total = measure(ctx, str, f, 0);
  const p = E.outCubic(clamp(age / 0.45));
  if (p <= 0) return;
  const x0 = cx - total / 2 - 8, x1 = cx + total / 2 + 8;
  const edge = lerp(x0, x1, p);
  ctx.save();
  ctx.beginPath(); ctx.rect(x0 - 4, base - size * 1.1, edge - x0 + 4, size * 1.5); ctx.clip();
  let x = cx - total / 2 + (1 - p) * -28;
  runs(str).forEach((part, i, arr) => {
    ctx.font = f; ctx.fillStyle = color; ctx.textAlign = 'left';
    ctx.fillText(part, x, base);
    x += ctx.measureText(part).width;
    if (i < arr.length - 1) { arrowGlyph(ctx, x, base, size * 0.95, color); x += size * 0.95 * 0.95; }
  });
  ctx.restore();
  if (p < 1) { ctx.fillStyle = accent; ctx.fillRect(edge - 3, base - size * 0.95, 6, size * 1.2); }
}

// ------------------------------------------------------------ items
function drawIcon(ctx, it, age, P) {
  const strokes = DATA.icons[it.name];
  const k = (it.s ?? 1) * 2.2 * SC * (it.big ? 1.3 : 1);
  const cx = PX(it.x), cy = PY(it.y);
  const draw = clamp(age / 0.6);
  const pop = M.spring(age, SPRING.bouncy);
  if (pop <= 0) return;
  const bob = Math.sin((age + it.x * 0.01) * 1.6) * 6 * clamp(age - 0.6);
  ctx.save();
  ctx.translate(cx, cy + bob); ctx.scale(lerp(0.6, 1, Math.min(pop, 1.15)), lerp(0.6, 1, Math.min(pop, 1.15)));
  ctx.rotate(lerp(-0.12, 0, clamp(pop)));
  ctx.scale(k, k); ctx.translate(-50, -50);
  const n = strokes.length;
  strokes.forEach((s, i) => {
    const kk = clamp(draw * n - i * 0.85);
    if (kk <= 0) return;
    if (s.fill && kk > 0.5) {
      ctx.fillStyle = s.fill === RED ? C.accent : P.fillc;
      ctx.globalAlpha = clamp((kk - 0.5) * 2);
      ctx.fill(pathOf(s.d).p2);
      ctx.globalAlpha = 1;
    }
    const col = s.color && s.color === RED ? (P.dossier ? D.red : C.accent) : P.ink;
    strokeOn(ctx, s.d, kk, P.bg === C.accent && col === C.accent ? '#FFFFFF' : col, 9 * (s.w ?? 1) / k);
  });
  ctx.restore();
}

function fmtNum(v, plain) { const n = Math.round(v); return plain ? String(n) : n.toLocaleString('en-US'); }

function drawItem(ctx, it, age, P, shotAge) {
  if (age < 0) return;
  if (it.k === 'text') {
    const col = colorOf(it.color, P);
    if (it.font === 'hand') {
      const size = fitSize(ctx, it.text, (it.size ?? 64) * SC, 600, UI, it.maxW);
      uiText(ctx, it.text, PX(it.x), PY(it.y) + size * 0.35, size, it.color === RED ? col : P.dim === C.dim ? '#DAD6CD' : P.ink, age, C.accent);
    } else {
      const size = fitSize(ctx, it.text.toUpperCase(), (it.size ?? 80) * SC * 0.98, 400, DISPLAY, it.maxW, 1);
      const slam = it.color === RED && (it.size ?? 80) >= 90 && it.t >= 0;
      displayText(ctx, it.text.toUpperCase(), PX(it.x), PY(it.y) + size * 0.38, size, col, it.t < 0 ? 9 : age, slam);
    }
  } else if (it.k === 'count') {
    const size = fitSize(ctx, `${it.prefix ?? ''}${fmtNum(it.to, it.plain)}${it.suffix ?? ''}`.toUpperCase(), (it.size ?? 90) * SC, 400, DISPLAY, it.maxW, 1);
    const p = E.outExpo(clamp(age / 1.0));
    const v = lerp(it.from ?? 0, it.to, p);
    const str = `${it.prefix ?? ''}${fmtNum(v, it.plain)}${it.suffix ?? ''}`;
    displayText(ctx, str.toUpperCase(), PX(it.x), PY(it.y) + size * 0.38, size, colorOf(it.color, P), 9, false);
    if (age < 1.2) { // ticker underline that runs with the count
      ctx.fillStyle = C.accent; const w = measure(ctx, str, font(size, 400, DISPLAY), size * 0.01);
      ctx.fillRect(PX(it.x) - w / 2, PY(it.y) + size * 0.52, w * p, 6);
    }
  } else if (it.k === 'icon') {
    drawIcon(ctx, it, it.t < 0 ? 9 : age, P);
  } else if (it.k === 'path') {
    const k = E.outCubic(clamp(age / 0.4));
    ctx.save(); ctx.translate(PX(0), PY(0)); ctx.scale(SC, SC);
    const col = P.bg === C.accent ? '#FFFFFF' : C.accent;
    strokeOn(ctx, it.d, it.t < 0 ? 1 : k, col, 9 * (it.w ?? 1));
    ctx.restore();
  } else if (it.k === 'image') {
    const img = IMGS[it.src.split('/').pop()];
    if (!img) return;
    const a = it.t < 0 ? 1 : M.spring(age, SPRING.bouncy);
    const w = it.w * SC, h = it.h * SC;
    // cold open stands on the bottom edge (like thumbnail A); inline photos sit where the icon was
    const x = it.anchor === 'center' ? PX(it.x) : PX(it.x) + 70, y = it.anchor === 'center' ? PY(it.y) : H - h / 2 + 10;
    const breathe = 1 + 0.012 * Math.sin(shotAge * 1.3);
    ctx.save(); ctx.translate(x, y + h / 2);
    ctx.rotate(lerp(-0.2, 0, clamp(a)) + 0.012 * Math.sin(shotAge * 0.9));
    ctx.scale(breathe * lerp(0.7, 1, Math.min(a, 1.1)), breathe * lerp(0.7, 1, Math.min(a, 1.1)));
    const ih = h, iw = ih * (img.width / img.height);
    ctx.drawImage(img, -iw / 2, -ih, iw, ih);
    ctx.restore();
  } else if (it.k === 'face') {
    const a = M.spring(age, SPRING.bouncy);
    faceBadge(ctx, it.who, PX(it.x), PY(it.y), it.r * SC * a);
  }
}

// Real photos (Wikimedia Commons, docs/credits.md). Face circle in sticker pixels.
const FACES = { zitron: { src: 'photo_zitron.png', cx: 380, cy: 400, r: 235 }, bartlett: { src: 'photo_bartlett.png', cx: 210, cy: 300, r: 195 }, cuban: { src: 'photo_cuban.png', cx: 420, cy: 470, r: 255 } };
function faceBadge(ctx, who, x, y, r) {
  const f = FACES[who], img = IMGS[f.src];
  if (!img || r <= 1) return;
  ctx.save();
  ctx.beginPath(); ctx.arc(x, y, r + Math.max(3, r * 0.08), 0, M.TAU); ctx.fillStyle = '#FFFFFF'; ctx.fill();
  ctx.beginPath(); ctx.arc(x, y, r, 0, M.TAU); ctx.clip();
  ctx.fillStyle = '#2A2A31'; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  const k = r / f.r;
  ctx.drawImage(img, x - f.cx * k, y - f.cy * k, img.width * k, img.height * k);
  ctx.restore();
}
// who does a caption name? (the face pops beside it, unless that person is already on screen)
const WHO = (ws) => { const s = ws.map((w) => w[0]).join(' '); return /Cuban/.test(s) ? 'cuban' : /Zitron/.test(s) ? 'zitron' : /Bartlett/.test(s) ? 'bartlett' : null; };
function onScreen(t, who) {
  const s = SHOTS[shotIndex(t)];
  return s.items.some((it) => it.t <= t && ((it.k === 'image' && it.src.includes(who)) || (it.k === 'face' && it.who === who)));
}
function nameTime(c) { const w = c.ws.find((w) => /Cuban|Zitron|Bartlett/.test(w[0])); return w ? w[1] : c.a; }


// ============================================================ rich scenes (Lemo-Opuscar grammar)
// Data Storytelling: cream paper, dot grid, ink + one red pencil for the record that matters.
// Spreadsheet: a drawn generic sheet; the formula bar speaks, cells fill on their words.
// Flow / Timeline: dark stage; money moves along arrows, dates land on one clock.
let NOW = 0;
const PAPER = { bg: '#F3EBDD', ink: '#2B2620', grid: 'rgba(43,38,32,0.10)', red: '#C8372D', blue: '#2E5A9E', pale: '#B9AE9A' };
const RICH = new Set(['bars', 'line', 'sheet', 'flow', 'timeline']);
const rp = (r, d = 0.7) => E.outCubic(clamp((NOW - r.rt) / d));
function paperBg(ctx) {
  fill(ctx, PAPER.bg);
  ctx.save(); ctx.fillStyle = PAPER.grid;
  for (let y = 30; y < H; y += 40) for (let x = 30; x < W; x += 40) { ctx.beginPath(); ctx.arc(x, y, 1.6, 0, M.TAU); ctx.fill(); }
  ctx.restore();
}
function chartTitle(ctx, it, color) {
  if (!it.title) return;
  const a = E.outCubic(clamp((NOW - it.t) / 0.5));
  ctx.save(); ctx.globalAlpha = a; ctx.font = font(66, 400, 'Slab'); ctx.fillStyle = color; ctx.textAlign = 'left';
  ctx.fillText(it.title, 160, 150 + (1 - a) * 20); ctx.restore();
}
function ring(ctx, x, y, rx, ry, k, color) {   // un-closed pencil ring
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.ellipse(x, y, rx, ry, -0.08, -2.4, -2.4 + M.TAU * 0.88 * k); ctx.stroke(); ctx.restore();
}
function note(ctx, it, x, y, color) {
  if (!it.note || it.nt == null) return;
  const a = clamp((NOW - it.nt) / 0.6); if (a <= 0) return;
  ctx.save(); ctx.font = `italic 600 40px UI`; ctx.fillStyle = color; ctx.textAlign = 'left';
  const n = Math.max(1, Math.floor(it.note.length * a));
  ctx.fillText(it.note.slice(0, n), x, y); ctx.restore();
}
function fmtVal(r, k) {
  if (r.text && k >= 0.999) return r.text;
  if (r.value == null) return r.text || '';
  const v = r.value * k, digits = Math.abs(r.value) < 10 && r.value % 1 ? 1 : 0;
  const pre = (r.text || '').match(/^[^0-9-]*/)[0], post = (r.text || '').match(/[^0-9.,]*$/)[0];
  return pre + v.toFixed(digits) + post;
}
function drawBars(ctx, it) {
  chartTitle(ctx, it, PAPER.ink);
  const rows = it.rows, n = rows.length, top = 250, bot = 860, step = (bot - top) / n, bh = Math.min(86, step * 0.62);
  const max = Math.max(...rows.map((r) => Math.abs(r.value || 0))) || 1, x0 = 640, span = 860;
  rows.forEach((r, i) => {
    const y = top + i * step + step / 2, k = rp(r), col = r.hi ? PAPER.red : PAPER.blue;
    ctx.save(); ctx.globalAlpha = clamp((NOW - r.rt + 0.3) / 0.3);
    ctx.font = font(44, 600, UI); ctx.fillStyle = PAPER.ink; ctx.textAlign = 'right'; ctx.fillText(r.label, x0 - 28, y + 15);
    ctx.restore();
    if (k <= 0) return;
    const w = span * Math.abs(r.value || 0) / max * k;
    ctx.fillStyle = col; ctx.globalAlpha = 0.9; ctx.fillRect(x0, y - bh / 2, w, bh); ctx.globalAlpha = 1;
    ctx.strokeStyle = PAPER.ink; ctx.lineWidth = 3; ctx.strokeRect(x0, y - bh / 2, w, bh);
    ctx.font = font(58, 400, DISPLAY); ctx.fillStyle = r.hi ? PAPER.red : PAPER.ink; ctx.textAlign = 'left';
    ctx.fillText(fmtVal(r, k), x0 + w + 20, y + 20);
    const tw = ctx.measureText(fmtVal(r, 1)).width;
    if (r.hi) ring(ctx, x0 + w + 20 + tw / 2, y + 2, tw / 2 + 46, 62, clamp((NOW - r.rt - 0.7) / 0.5), PAPER.red);
  });
  ctx.strokeStyle = PAPER.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, top - 20); ctx.lineTo(x0, bot + 10); ctx.stroke();
  note(ctx, it, 640, 930, PAPER.red);
}
function drawLine(ctx, it) {
  chartTitle(ctx, it, PAPER.ink);
  const rows = it.rows, n = rows.length, x0 = 300, x1 = 1620, y0 = 820, y1 = 300;
  const vals = rows.map((r) => r.value || 0), lo = Math.min(0, ...vals), hi = Math.max(...vals);
  const P = rows.map((r, i) => [x0 + (x1 - x0) * (n === 1 ? 0.5 : i / (n - 1)), y0 - (y0 - y1) * ((r.value - lo) / (hi - lo || 1))]);
  ctx.strokeStyle = PAPER.pale; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0 - 40, y0); ctx.lineTo(x1 + 40, y0); ctx.stroke();
  for (let i = 0; i < n - 1; i++) {
    const k = rp({ rt: Math.max(rows[i].rt, rows[i + 1].rt) }, 0.8); if (k <= 0) continue;
    ctx.strokeStyle = rows[i + 1].hi ? PAPER.red : PAPER.blue; ctx.lineWidth = 8; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(...P[i]); ctx.lineTo(lerp(P[i][0], P[i + 1][0], k), lerp(P[i][1], P[i + 1][1], k)); ctx.stroke();
  }
  rows.forEach((r, i) => {
    const k = M.spring(NOW - r.rt, SPRING.bouncy); if (k <= 0) return;
    const [x, y] = P[i], col = r.hi ? PAPER.red : PAPER.blue;
    ctx.fillStyle = PAPER.bg; ctx.strokeStyle = PAPER.ink; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(x, y, 18 * Math.min(k, 1.2), 0, M.TAU); ctx.fill(); ctx.stroke();
    ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 11 * Math.min(k, 1.2), 0, M.TAU); ctx.fill();
    ctx.textAlign = 'center'; ctx.font = font(62, 400, DISPLAY); ctx.fillStyle = r.hi ? PAPER.red : PAPER.ink;
    ctx.fillText(r.text || String(r.value), x, y - 44);
    ctx.font = font(36, 600, UI); ctx.fillStyle = PAPER.ink; ctx.fillText(r.label, x, y0 + 60);
    if (r.hi) ring(ctx, x, y - 64, 130, 60, clamp((NOW - r.rt - 0.6) / 0.5), PAPER.red);
  });
  note(ctx, it, 300, 960, PAPER.red);
}
function drawSheet(ctx, it) {
  fill(ctx, '#ECEBE6');
  const X = 150, Y = 110, Wd = 1620, cw0 = 90, cwA = 900, cwB = Wd - cw0 - cwA, rh = 112;
  // shell: title bar + formula bar
  ctx.fillStyle = '#DCDBD5'; ctx.fillRect(X, Y, Wd, 56);
  ctx.font = font(28, 600, UI); ctx.fillStyle = '#3A3A3A'; ctx.textAlign = 'left'; ctx.fillText(it.title || 'Sheet1', X + 24, Y + 37);
  ctx.fillStyle = '#FFFFFF'; ctx.fillRect(X, Y + 56, Wd, 70); ctx.strokeStyle = '#C9C8C2'; ctx.lineWidth = 2; ctx.strokeRect(X, Y + 56, Wd, 70);
  ctx.font = font(32, 800, 'Mono'); ctx.fillStyle = '#7A7A7A'; ctx.fillText('fx', X + 24, Y + 102);
  const f = it.formula || '', fk = clamp((NOW - it.t) / Math.max(0.8, f.length * 0.035));
  ctx.font = font(36, 600, 'Mono'); ctx.fillStyle = '#17120A'; ctx.fillText(f.slice(0, Math.floor(f.length * fk)), X + 90, Y + 104);
  // headers
  const gy = Y + 146;
  ctx.fillStyle = '#F1F0EB'; ctx.fillRect(X, gy, Wd, 44);
  ctx.font = font(26, 600, UI); ctx.fillStyle = '#6A6A6A'; ctx.textAlign = 'center';
  ctx.fillText('A', X + cw0 + cwA / 2, gy + 31); ctx.fillText('B', X + cw0 + cwA + cwB / 2, gy + 31);
  const rows = it.rows;
  rows.forEach((r, i) => {
    const y = gy + 44 + i * rh, k = clamp((NOW - r.rt) / 0.25), on = NOW >= r.rt;
    ctx.fillStyle = '#F1F0EB'; ctx.fillRect(X, y, cw0, rh);
    ctx.fillStyle = '#6A6A6A'; ctx.font = font(26, 600, UI); ctx.textAlign = 'center'; ctx.fillText(String(i + 1), X + cw0 / 2, y + rh / 2 + 9);
    const fillc = { red: '#F4B3AE', amber: '#FFD98A', lime: '#D4F2A6', blue: '#BFD3F2' }[r.color] || '#FFFFFF';
    ctx.fillStyle = on ? fillc : '#FFFFFF'; ctx.fillRect(X + cw0, y, cwA + cwB, rh);
    if (on && k < 1) { ctx.fillStyle = `rgba(255,255,255,${1 - k})`; ctx.fillRect(X + cw0, y, cwA + cwB, rh); }
    ctx.strokeStyle = '#DAD9D3'; ctx.lineWidth = 2; ctx.strokeRect(X + cw0, y, cwA, rh); ctx.strokeRect(X + cw0 + cwA, y, cwB, rh);
    if (!on) return;
    ctx.textAlign = 'left'; ctx.font = font(48, 600, UI); ctx.fillStyle = '#17120A'; ctx.fillText(r.label, X + cw0 + 24, y + rh / 2 + 16);
    ctx.textAlign = 'right'; ctx.font = font(68, 400, DISPLAY); ctx.fillStyle = r.color === 'red' ? '#B3261E' : '#17120A';
    ctx.fillText(fmtVal(r, E.outCubic(clamp((NOW - r.rt) / 0.6))), X + Wd - 28, y + rh / 2 + 20);
  });
  // the selected cell rides the newest row
  const last = rows.reduce((a, r, i) => (NOW >= r.rt ? i : a), -1);
  if (last >= 0) {
    const y = gy + 44 + last * rh, dash = (NOW * 60) % 20;
    ctx.save(); ctx.strokeStyle = '#17120A'; ctx.lineWidth = 6; ctx.strokeRect(X + cw0 + cwA, y, cwB, rh);
    ctx.setLineDash([10, 10]); ctx.lineDashOffset = -dash; ctx.strokeStyle = '#2A2F6C'; ctx.lineWidth = 3; ctx.strokeRect(X + cw0 + cwA - 8, y - 8, cwB + 16, rh + 16); ctx.restore();
  }
  note(ctx, it, X + cw0 + 24, gy + 44 + rows.length * rh + 70, '#B3261E');
}
function drawFlow(ctx, it) {
  const rows = it.rows, n = rows.length, loop = it.dir === 'loop', cx = 960, cy = loop ? 590 : 520, R = loop ? 300 : 360;
  const pos = rows.map((_, i) => { const a = -Math.PI / 2 + (i / n) * M.TAU; return [cx + Math.cos(a) * R * 1.35, cy + Math.sin(a) * R * (loop ? 0.95 : 1.05)]; });
  const arrow = (a, b, k, col) => {
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]), sx = a[0] + Math.cos(ang) * 110, sy = a[1] + Math.sin(ang) * 70;
    const ex = b[0] - Math.cos(ang) * 130, ey = b[1] - Math.sin(ang) * 80, mx = lerp(sx, ex, k), my = lerp(sy, ey, k);
    ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(mx, my); ctx.stroke();
    if (k > 0.95) { ctx.beginPath(); ctx.moveTo(ex - Math.cos(ang - 0.4) * 26, ey - Math.sin(ang - 0.4) * 26); ctx.lineTo(ex, ey); ctx.lineTo(ex - Math.cos(ang + 0.4) * 26, ey - Math.sin(ang + 0.4) * 26); ctx.stroke(); }
    return [sx, sy, ex, ey];
  };
  rows.forEach((r, i) => {
    const k = rp(r, 0.6); if (k <= 0) return;
    const to = loop ? pos[(i + 1) % n] : [cx, cy];
    const [sx, sy, ex, ey] = arrow(pos[i], to, k, r.hi ? C.accent : 'rgba(244,241,234,0.55)');
    if (k >= 1) for (let d = 0; d < 3; d++) {   // money moving along the arrow
      const q = ((NOW - r.rt) * 0.55 + d / 3) % 1;
      ctx.fillStyle = C.accent; ctx.beginPath(); ctx.arc(lerp(sx, ex, q), lerp(sy, ey, q), 9, 0, M.TAU); ctx.fill();
    }
  });
  if (!loop) {
    const k = M.spring(NOW - it.t, SPRING.bouncy);
    ctx.save(); ctx.translate(cx, cy); ctx.scale(Math.min(k, 1.1), Math.min(k, 1.1));
    ctx.fillStyle = '#1E1E24'; ctx.strokeStyle = C.accent; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(0, 0, 230, 120, 0, 0, M.TAU); ctx.fill(); ctx.stroke();
    ctx.textAlign = 'center'; ctx.fillStyle = C.ink; ctx.font = font(64, 400, DISPLAY); ctx.fillText(it.title, 0, it.amount ? -4 : 22);
    if (it.amount) { ctx.fillStyle = C.accent; ctx.font = font(52, 400, DISPLAY); ctx.fillText(it.amount, 0, 60); }
    ctx.restore();
  } else if (it.title) chartTitle(ctx, { ...it, t: it.t }, C.ink);
  rows.forEach((r, i) => {
    const k = M.spring(NOW - r.rt, SPRING.bouncy); if (k <= 0) return;
    const [x, y] = pos[i];
    ctx.save(); ctx.translate(x, y); ctx.scale(Math.min(k, 1.1), Math.min(k, 1.1));
    ctx.font = font(44, 600, UI); const w = ctx.measureText(r.label).width + 56;
    rrect(ctx, -w / 2, -42, w, 84, 42); ctx.fillStyle = r.hi ? C.accent : '#2A2A31'; ctx.fill();
    ctx.fillStyle = '#FFFFFF'; ctx.textAlign = 'center'; ctx.fillText(r.label, 0, 15); ctx.restore();
  });
}
function drawTimeline(ctx, it) {
  chartTitle(ctx, it, C.ink);
  const rows = it.rows, n = rows.length, x0 = 220, x1 = 1700, y = 540;
  const k0 = E.outCubic(clamp((NOW - it.t) / 0.8));
  ctx.strokeStyle = 'rgba(244,241,234,0.6)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(lerp(x0, x1, k0), y); ctx.stroke();
  rows.forEach((r, i) => {
    const x = x0 + (x1 - x0) * (n === 1 ? 0.5 : (i + 0.5) / n), k = M.spring(NOW - r.rt, SPRING.bouncy); if (k <= 0) return;
    const col = r.hi ? C.accent : C.ink, pulse = r.hi ? 1 + 0.15 * Math.sin(NOW * 5) : 1;
    ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 16 * Math.min(k, 1.2) * pulse, 0, M.TAU); ctx.fill();
    ctx.textAlign = 'center'; ctx.font = font(40, 800, 'Mono'); ctx.fillStyle = col; ctx.fillText(r.text || '', x, y - 60 - (1 - Math.min(k, 1)) * 40);
    ctx.font = font(42, 600, UI); ctx.fillStyle = r.hi ? C.accent : '#DAD6CD';
    const words = r.label.split(' '), lines = []; let cur = '';
    words.forEach((w) => { const t2 = cur ? cur + ' ' + w : w; if (ctx.measureText(t2).width > (x1 - x0) / n - 30 && cur) { lines.push(cur); cur = w; } else cur = t2; }); lines.push(cur);
    lines.forEach((ln, j) => ctx.fillText(ln, x, y + 90 + j * 52 + (1 - Math.min(k, 1)) * 40));
  });
  note(ctx, it, 220, 900, C.accent);
}
function drawRich(ctx, it) {
  if (it.k === 'bars') drawBars(ctx, it);
  else if (it.k === 'line') drawLine(ctx, it);
  else if (it.k === 'sheet') drawSheet(ctx, it);
  else if (it.k === 'flow') drawFlow(ctx, it);
  else if (it.k === 'timeline') drawTimeline(ctx, it);
}
const richOf = (s) => s.items.find((x) => RICH.has(x.k));

let IMGS = {};
for (const s of SHOTS) { const ic = s.items.filter((x) => x.k === 'icon'); if (ic.length === 1 && (ic[0].s ?? 1) >= 1.8 && !s.part) ic[0].big = true; }

// widest a line may be: inside the frame and short of its neighbours on the same row
for (const s of SHOTS) for (const it of s.items) {
  if (it.k !== 'text' && it.k !== 'count') continue;
  // the camera can scale a shot up to ~1.24x about the centre: keep lines inside the frame after that
  const half = 890 / 1.24;
  let room = 2 * Math.min(PX(it.x) - (960 - half), (960 + half) - PX(it.x));
  for (const o of s.items) {
    if (o === it || o.k === 'path' || o.x == null) continue;
    const oh = o.k === 'icon' ? 110 * (o.s ?? 1) : o.k === 'image' ? o.h * 0.5 : o.k === 'face' ? o.r : (o.size ?? 64) * 0.7;
    if (Math.abs(o.y - it.y) > oh) continue;
    const dx = Math.abs(PX(o.x) - PX(it.x));
    if (dx < 5) continue;
    const ow = o.k === 'icon' ? 110 * (o.s ?? 1) * 2.2 : o.k === 'image' ? o.h * SC : o.k === 'face' ? o.r * 2.4 : 0;
    room = Math.min(room, o.k === 'icon' || o.k === 'image' || o.k === 'face' ? 2 * (dx - ow / 2) - 40 : dx * 0.94);
  }
  it.maxW = Math.max(160, room);
}
function fitSize(ctx, str, size, weight, fam, maxW, track = 0) {
  const w = measure(ctx, str, font(size, weight, fam), track ? size * 0.01 : 0);
  return w > maxW ? size * maxW / w : size;
}

// ------------------------------------------------------------ a shot, at time t
// The keyword of each shot, set huge and faint behind it (same idea as the part numbers).
const WATERMARK = SHOTS.map((s) => {
  const it = s.items.find((x) => x.k === 'count' || (x.k === 'text' && x.font !== 'hand'));
  if (!it || s.part || s.drawn || richOf(s)) return null;
  let w = it.k === 'count' ? `${it.prefix ?? ''}${it.to}${it.suffix ?? ''}` : it.text;
  w = w.replace(/["→=>+:?.]/g, ' ').trim().toUpperCase();
  if (w.length > 12) w = w.split(/\s+/).sort((a, b) => b.length - a.length)[0];
  return w;
});
// Theme motif: a faint market chart that draws itself across each shot over a fine grid.
const MOTIF = 'chart';
function motif(ctx, P, t, i, lk) {
  const s = SHOTS[i], age = t - s.t0, dur = Math.max(4, s.t1 - s.t0);
  const ink = lk === 'paper' ? '0,0,0' : '255,255,255';
  ctx.save();
  ctx.strokeStyle = `rgba(${ink},0.035)`; ctx.lineWidth = 1;
  const off = (t * 12) % 120;
  ctx.beginPath();
  for (let x = -off; x < W; x += 120) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
  for (let y = 60; y < H; y += 120) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
  ctx.stroke();
  if (MOTIF === 'chart') {
    const rnd = M.mulberry32(1000 + i * 7919);
    const n = 28, pts = [];
    let v = 0.55 + rnd() * 0.2;
    for (let k = 0; k <= n; k++) { v = clamp(v + (rnd() - 0.5) * 0.14, 0.15, 0.85); pts.push([k / n * W, H * v]); }
    const p = clamp(age / (dur * 0.9));
    const m = Math.max(1, Math.floor(p * n));
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    for (let k = 1; k <= m; k++) ctx.lineTo(pts[k][0], pts[k][1]);
    const fx = p * n - m;
    if (m < n) ctx.lineTo(lerp(pts[m][0], pts[m + 1][0], fx), lerp(pts[m][1], pts[m + 1][1], fx));
    ctx.strokeStyle = lk === 'paper' ? 'rgba(230,57,70,0.16)' : 'rgba(255,59,48,0.22)';
    ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.stroke();
    const last = m < n ? [lerp(pts[m][0], pts[m + 1][0], fx), lerp(pts[m][1], pts[m + 1][1], fx)] : pts[n];
    ctx.beginPath(); ctx.arc(last[0], last[1], 9, 0, M.TAU); ctx.fillStyle = lk === 'paper' ? 'rgba(230,57,70,0.3)' : 'rgba(255,59,48,0.4)'; ctx.fill();
  }
  const wm = WATERMARK[i];
  if (wm) {
    ctx.font = font(560, 400, DISPLAY); ctx.textAlign = 'center';
    ctx.fillStyle = `rgba(${ink},${lk === 'paper' ? 0.032 : 0.045})`;
    const dir = i % 2 ? 1 : -1;
    ctx.fillText(wm, W / 2 + dir * (age * 26 - 120), H * 0.74);
  }
  ctx.restore();
}

function halftone(ctx, color, step, angle, dens, alpha) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.fillStyle = color; ctx.globalCompositeOperation = 'multiply';
  ctx.translate(W / 2, H / 2); ctx.rotate(angle);
  ctx.beginPath();
  for (let y = -H; y < H; y += step) for (let x = -W; x < W; x += step) {
    const c = Math.cos(-angle), sn = Math.sin(-angle);
    const r = dens(x * c - y * sn + W / 2, x * sn + y * c + H / 2) * step * 0.66;
    if (r > 0.6) { ctx.moveTo(x + r, y); ctx.arc(x, y, r, 0, M.TAU); }
  }
  ctx.fill(); ctx.restore();
}
const PARTNO = (i) => SHOTS.slice(0, i + 1).filter((x) => x.part).length;
function dossierBg(ctx, t, i) {
  fill(ctx, D.paper);
  const age = t - SHOTS[i].t0;
  // paper mottling (seeded, fixed per shot)
  const r = M.mulberry32(77 + i);
  ctx.save(); ctx.globalAlpha = 0.05;
  for (let k = 0; k < 160; k++) { ctx.fillStyle = r() > 0.5 ? '#8B6B3E' : '#FFFFFF'; ctx.beginPath(); ctx.arc(r() * W, r() * H, 20 + r() * 90, 0, M.TAU); ctx.fill(); }
  ctx.restore();
  // two overprinted dot screens: pink from the bottom-right, cobalt from the top-left, breathing slowly
  const br = 0.06 * Math.sin(age * 1.4);
  halftone(ctx, D.pink, 22, 0.26, (x, y) => clamp(1.05 - Math.hypot(x - W * 1.02, y - H * 1.05) / (W * (0.62 + br))), 0.55);
  halftone(ctx, D.cobalt, 26, -0.52, (x, y) => clamp(0.8 - Math.hypot(x + W * 0.05, y + H * 0.1) / (W * 0.42)), 0.35);
  // vignette + centre fold
  const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.4, W / 2, H / 2, W * 0.75);
  g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(60,40,10,0.18)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(80,60,30,0.06)'; ctx.fillRect(W / 2 - 2, 0, 4, H);
  // HUD: case number + exhibit chip top-left, REC + date top-right
  ctx.save(); ctx.font = font(30, 800, 'Mono'); ctx.textAlign = 'left'; ctx.fillStyle = D.ink;
  ctx.fillText(`CASE FILE No. ${M.CFG.case || ''}`, 64, 76);
  const n = PARTNO(i);
  if (n) { const tx = `EXHIBIT ${n}`; const w = ctx.measureText(tx).width; rrect(ctx, 56, 92, w + 32, 46, 10); ctx.fillStyle = D.ink; ctx.fill(); ctx.fillStyle = D.yellow; ctx.fillText(tx, 72, 126); }
  const DATE = (M.CFG.date || '').toUpperCase();
  ctx.textAlign = 'right'; ctx.fillStyle = D.ink; ctx.fillText(DATE, W - 64, 76);
  if (Math.floor(t * 2) % 2 === 0) { ctx.fillStyle = D.red; ctx.beginPath(); ctx.arc(W - 64 - ctx.measureText(DATE).width - 26, 66, 10, 0, M.TAU); ctx.fill(); }
  ctx.restore();
}

// Body chrome (podcast-summary skill): chapter chip top-left + thin progress bar along the top.
const PARTS_T = SHOTS.filter((s) => s.part).map((s) => [s.t0, (s.items[1] && s.items[1].text) || '']);
function chapterChrome(ctx, t, lk) {
  const k = PARTS_T.filter(([a]) => a <= t).length;
  ctx.save();
  ctx.fillStyle = lk === 'paper' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)'; ctx.fillRect(0, 0, W, 6);
  ctx.fillStyle = C.accent; ctx.fillRect(0, 0, W * clamp(t / DATA.duration), 6);
  for (const [a] of PARTS_T) { ctx.fillStyle = lk === 'paper' ? '#141414' : '#0D0D10'; ctx.fillRect(W * a / DATA.duration - 2, 0, 4, 6); }
  if (k) {
    const tx = `PART ${k} · ${PARTS_T[k - 1][1]}`;
    ctx.font = font(24, 800, 'Mono'); ctx.textAlign = 'left';
    const w = ctx.measureText(tx).width;
    rrect(ctx, 40, 26, w + 28, 40, 9); ctx.fillStyle = lk === 'paper' ? 'rgba(20,20,20,0.85)' : 'rgba(255,255,255,0.1)'; ctx.fill();
    ctx.fillStyle = lk === 'paper' ? '#F4F1EA' : 'rgba(244,241,234,0.85)'; ctx.fillText(tx, 54, 54);
  }
  ctx.restore();
}

function bgOf(ctx, P, t, i, lk) {
  if (lk === 'dossier') { dossierBg(ctx, t, i); return; }
  if (lk === 'chart') { paperBg(ctx); return; }
  if (lk === 'sheet') { fill(ctx, '#ECEBE6'); return; }
  fill(ctx, P.bg);
  if (lk !== 'red' && !SHOTS[i].drawn) motif(ctx, P, t, i, lk);
  if (lk === 'dark') {
    // a slow pool of light that drifts behind the type: depth without chrome
    const gx = W * (0.3 + 0.4 * noise1(t * 0.05 + i, 4)), gy = H * (0.35 + 0.3 * noise1(t * 0.04 + i, 9));
    const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, W * 0.7);
    g.addColorStop(0, '#24242B'); g.addColorStop(1, 'rgba(13,13,16,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  } else if (lk === 'red') {
    // giant outlined part number behind the card
    const m = /PART (\d)/.exec(SHOTS[i].items[0].text || '');
    if (m) {
      ctx.save(); ctx.font = font(1100, 400, DISPLAY); ctx.textAlign = 'center';
      ctx.strokeStyle = 'rgba(0,0,0,0.16)'; ctx.lineWidth = 6;
      const age = t - SHOTS[i].t0;
      ctx.strokeText(m[1], W * 0.5 + (age * 22), H * 0.98);
      ctx.restore();
    }
  }
}

function focusOf(s, t) {
  // camera leans toward whatever was revealed last (springs between targets)
  let fx = 960, fy = 500, last = s.t0;
  const seen = s.items.filter((it) => it.t <= t).slice(-2);
  if (seen.length) {
    const xs = seen.map((it) => PX(it.x ?? 800)), ys = seen.map((it) => PY(it.y ?? 450));
    fx = xs.reduce((a, b) => a + b) / xs.length; fy = ys.reduce((a, b) => a + b) / ys.length;
    last = Math.max(...seen.map((it) => it.t));
  }
  return { fx, fy, last };
}

// frame each shot on its own content: centre the block vertically, grow small layouts a little
const FRAMING = SHOTS.map((s) => {
  let y0 = 1e9, y1 = -1e9;
  for (const it of s.items) {
    if (it.k === 'image' && it.anchor !== 'center') continue;
    const h = it.k === 'icon' ? 110 * (it.s ?? 1) : it.k === 'image' ? it.h * 0.5 : it.k === 'face' ? it.r : it.k === 'path' ? 0 : (it.size ?? 64) * 0.6;
    if (it.k === 'path') continue;
    y0 = Math.min(y0, PY(it.y) - h); y1 = Math.max(y1, PY(it.y) + h);
  }
  if (y0 > y1 || s.drawn || s.part || richOf(s)) return { dy: 0, sc: 1 };
  const sc = clamp(760 / (y1 - y0), 1, 1.18);
  return { dy: 470 - (y0 + y1) / 2, sc };
});

function drawShot(ctx, i, t) {
  const s = SHOTS[i];
  const lk = look(i), P = pal(lk);
  const age = t - s.t0, dur = s.t1 - s.t0;
  bgOf(ctx, P, t, i, lk);
  DOSSIER = lk === 'dossier';
  NOW = t;
  ctx.save();
  // slow log-space push over the whole shot, plus a lean toward the newest element
  const z = Math.pow(1.07, clamp(age / Math.max(dur, 1)));
  const f0 = focusOf(s, t - 0.5), f1 = focusOf(s, t);
  const k = clamp(springU(U(t), U(f1.last), SPRING.gentle));
  const fx = lerp(f0.fx, f1.fx, k), fy = lerp(f0.fy, f1.fy, k);
  const lean = 0.07;
  const fr = FRAMING[i];
  ctx.translate(W / 2 + (960 - fx) * lean, H / 2 + (500 - fy) * lean + fr.dy * fr.sc);
  ctx.scale(z * fr.sc, z * fr.sc);
  ctx.translate(-W / 2, -H / 2);
  // shake after each slam
  for (const it of s.items) {
    if (it.k === 'text' && it.color === RED && (it.size ?? 80) >= 90 && it.t >= 0 && t > it.t && t < it.t + 0.45)
      M.shake(ctx, U(t), U(it.t + 0.12), 9, 7, 0.35);
  }
  s.items.forEach((it, j) => {
    const a = it.t < 0 ? 9 : t - it.t;
    if (a < 0) return;
    if (RICH.has(it.k)) { drawRich(ctx, it); return; }
    // idle life: once settled, each element floats a few pixels on its own phase
    const idle = clamp((a - 0.8) / 0.6) * (it.k === 'icon' ? 0 : 1);
    ctx.save(); ctx.translate(Math.sin(t * 0.7 + j * 1.9) * 3 * idle, Math.sin(t * 0.9 + j * 1.3) * 5 * idle);
    drawItem(ctx, it, a, P, age);
    ctx.restore();
  });
  ctx.restore();
}

// ------------------------------------------------------------ captions (karaoke, word-locked)
const WORDS = DATA.words;
const CAPS = DATA.captions.map(([a, b, txt]) => {
  const ws = WORDS.filter((w) => w[1] >= a - 0.02 && w[2] <= b + 0.02);
  return { a, b, ws };
});
function captionAt(t) {
  let lo = 0, hi = CAPS.length - 1, best = -1;
  while (lo <= hi) { const m = (lo + hi) >> 1; if (CAPS[m].a <= t) { best = m; lo = m + 1; } else hi = m - 1; }
  if (best < 0) return null;
  const c = CAPS[best];
  if (t > c.b + 0.35) return null;
  return c;
}
// While a shot's stage is still empty, the narration itself is the picture: big kinetic words.
function stageEmpty(t) {
  const s = SHOTS[shotIndex(t)];
  if (s.part || s.drawn) return false;
  return !s.items.some((it) => it.t <= t + 0.05);
}
function drawBigCaption(ctx, t) {
  const c = captionAt(t);
  if (!c || !c.ws.length) return;
  const size = 118, f = font(size, 400, DISPLAY), gap = size * 0.24;
  ctx.font = f;
  const ws = c.ws.map((w) => [w[0].toUpperCase(), w[1], w[2]]);
  const widths = ws.map((w) => layout(ctx, w[0], f, 1).width);
  // wrap into lines of <= 1500 px
  const lines = [[]]; let lw = 0;
  ws.forEach((w, i) => { if (lw + widths[i] > 1500 && lines[lines.length - 1].length) { lines.push([]); lw = 0; } lines[lines.length - 1].push(i); lw += widths[i] + gap; });
  const lh = size * 1.02, y0 = H / 2 - (lines.length - 1) * lh / 2 + size * 0.36;
  const s = SHOTS[shotIndex(t)], lk = look(shotIndex(t)), P = pal(lk);
  const who = WHO(c.ws);
  if (who) {
    const a = M.spring(t - nameTime(c) + 0.08, SPRING.bouncy);
    faceBadge(ctx, who, W / 2, y0 - size * 0.9 - 130, 105 * Math.max(0, a));
  }
  lines.forEach((ln, li) => {
    const tw = ln.reduce((a, i) => a + widths[i], 0) + gap * (ln.length - 1);
    let x = W / 2 - tw / 2;
    ln.forEach((i) => {
      const w = ws[i];
      const a = M.spring(t - w[1] + 0.06, SPRING.snappy);
      if (a > 0) {
        const cur = t >= w[1] - 0.03 && (i === ws.length - 1 || t < ws[i + 1][1] - 0.03);
        ctx.save(); ctx.beginPath(); ctx.rect(x - 10, y0 + li * lh - size * 1.05, widths[i] + 20, size * 1.35); ctx.clip();
        text0(ctx, w[0], x, y0 + li * lh + (1 - a) * size, f, cur ? C.accent : P.ink);
        ctx.restore();
      }
      x += widths[i] + gap;
    });
  });
}
function text0(ctx, str, x, y, f, color) { ctx.font = f; ctx.fillStyle = color; ctx.textAlign = 'left'; ctx.fillText(str, x, y); }
function drawCaption(ctx, t) {
  if (stageEmpty(t)) { drawBigCaption(ctx, t); return; }
  const c = captionAt(t);
  if (!c || !c.ws.length) return;
  const size = 50, f = font(size, 700, UI);
  ctx.font = f;
  const gap = size * 0.3;
  const widths = c.ws.map((w) => ctx.measureText(w[0]).width);
  const total = widths.reduce((a, b) => a + b, 0) + gap * (c.ws.length - 1);
  const base = 1024;
  const pin = springU(U(t), U(c.a), SPRING.snappy);
  const y = base + (1 - clamp(pin)) * 26;
  // photo sticker rises from the bottom-left whenever the narration names the person;
  // the caption slides right to make room for it
  const who = WHO(c.ws);
  let rise = 0, img = null;
  if (who && !onScreen(t, who)) {
    const a = M.spring(t - nameTime(c) + 0.08, SPRING.bouncy);
    img = IMGS[FACES[who].src];
    rise = img ? clamp(a) * (1 - E.inCubic(clamp((t - (c.b + 0.2)) / 0.35))) : 0;
  }
  const sw = img ? 360 * img.width / img.height : 0;
  const cx = lerp(W / 2, Math.max(W / 2, 70 + sw + 40 + 26 + total / 2), clamp(rise));
  if (rise > 0) {
    ctx.save(); ctx.translate(70, H + 20 - rise * 360);
    ctx.rotate(-0.04 + 0.02 * Math.sin(t * 1.5));
    ctx.drawImage(img, 0, 0, sw, 360);
    ctx.restore();
  }
  // backing so captions read on light and red shots too
  ctx.save();
  ctx.globalAlpha = 0.78 * clamp(pin * 1.5);
  rrect(ctx, cx - total / 2 - 26, y - size * 0.95, total + 52, size * 1.38, 16);
  ctx.fillStyle = '#0B0B0D'; ctx.fill();
  ctx.restore();
  let x = cx - total / 2;
  c.ws.forEach((w, i) => {
    const on = t >= w[1] - 0.03;
    const cur = on && (i === c.ws.length - 1 ? t <= c.b + 0.35 : t < c.ws[i + 1][1] - 0.03);
    if (cur) {
      const pk = E.outBack(clamp((t - w[1] + 0.03) / 0.16), 2);
      rrect(ctx, x - 9, y - size * 0.86 - 2 * pk, widths[i] + 18, size * 1.16 + 4 * pk, 10);
      ctx.fillStyle = C.accent; ctx.fill();
    }
    ctx.font = f; ctx.textAlign = 'left';
    ctx.fillStyle = on ? '#FFFFFF' : 'rgba(255,255,255,0.5)';
    ctx.fillText(w[0], x, y);
    x += widths[i] + gap;
  });
}

// ------------------------------------------------------------ chapter rail: thin progress line
// under the captions' backing, filling across each part (no corner labels).
const PARTS = SHOTS.filter((s) => s.part).map((s) => s.t0);

// ------------------------------------------------------------ the film
function shotIndex(t) {
  let lo = 0, hi = SHOTS.length - 1, best = 0;
  while (lo <= hi) { const m = (lo + hi) >> 1; if (SHOTS[m].t0 <= t) { best = m; lo = m + 1; } else hi = m - 1; }
  return best;
}

M.film({
  fonts: [font(100, 400, DISPLAY), font(40, 600, UI), font(40, 700, UI), font(100, 400, 'Slab'), font(30, 800, 'Mono')],
  images: { 'photo_zitron.png': 'assets/photo_zitron.png', 'photo_bartlett.png': 'assets/photo_bartlett.png', 'photo_cuban.png': 'assets/photo_cuban.png' },
  hits: HITS,
  samples: (t) => {
    const i = shotIndex(t), a = t - SHOTS[i].t0;
    return a < WHIP + 0.05 && i > 0 ? 8 : 3;   // blur where the whips move fast
  },
  init(ctx, IMG) { IMGS = IMG; for (const s of SHOTS) for (const it of s.items) if (it.k === 'path') pathOf(it.d); for (const n in DATA.icons) for (const st of DATA.icons[n]) pathOf(st.d); },
  draw(ctx, u, t) {
    const i = shotIndex(t);
    const s = SHOTS[i];
    const a = t - s.t0;
    const dossierCut = i > 0 && (look(i) === 'dossier' || look(i - 1) === 'dossier');
    if (dossierCut && a < 0.46) {
      // dot wipe: a grid of ink dots grows to cover, the scene switches under it, then the dots shrink
      const p = a / 0.46, cover = p < 0.5;
      drawShot(ctx, cover ? i - 1 : i, t);
      ctx.save(); ctx.fillStyle = look(i) === 'dossier' ? D.ink : D.paper; ctx.beginPath();
      const step = 110;
      for (let y = 0; y <= H + step; y += step) for (let x = 0; x <= W + step; x += step) {
        const delay = (x / W + y / H) * 0.22;
        const q = clamp((cover ? p * 2 : (1 - p) * 2) * 1.25 - delay);
        const r = E.inOutCubic(q) * step * 0.75;
        if (r > 0.5) { ctx.moveTo(x + r, y); ctx.arc(x, y, r, 0, M.TAU); }
      }
      ctx.fill(); ctx.restore();
    } else if (i > 0 && a < WHIP) {
      // whip: A slides out while B slides in, both on screen, one continuous pan
      const e = E.inOutCubic(a / WHIP);
      const d = s.dir;
      ctx.save(); ctx.translate(-d * W * e, 0); drawShot(ctx, i - 1, t); ctx.restore();
      ctx.save(); ctx.translate(d * W * (1 - e), 0); drawShot(ctx, i, t); ctx.restore();
      // the seam: an accent slab rides the cut
      const sx = d > 0 ? W * (1 - e) : W * e;
      ctx.fillStyle = C.accent; ctx.fillRect(sx - 14, 0, 28, H);
    } else {
      drawShot(ctx, i, t);
    }
    if (look(i) !== 'dossier' && !(i > 0 && a < WHIP)) chapterChrome(ctx, t, ['chart', 'sheet'].includes(look(i)) ? 'paper' : look(i));
    drawCaption(ctx, t);
  },
  post(ctx, u, t) {
    // film grain (seeded per frame), after the blur so it isn't averaged away
    const fr = Math.floor(t * 30);
    ctx.save(); ctx.globalAlpha = 0.05;
    for (let k = 0; k < 900; k++) {
      const x = hash01(k * 3 + 1, fr) * W, y = hash01(k * 3 + 2, fr) * H;
      ctx.fillStyle = hash01(k * 3 + 3, fr) > 0.5 ? '#FFFFFF' : '#000000';
      ctx.fillRect(x, y, 2, 2);
    }
    ctx.restore();
  },
});
