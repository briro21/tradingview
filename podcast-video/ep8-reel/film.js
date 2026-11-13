// OpenAI Lost $20.9 Billion: motion remake of Episode 8 (Ed Zitron on The Diary of a CEO).
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
  if (s.id.startsWith('S00') && i < 3) return 'paper';
  if (s.part) return 'red';
  return i % 5 === 3 ? 'paper' : 'dark';
}
const pal = (lk) => lk === 'paper' ? { bg: C.paper, ink: C.paperInk, dim: '#4A4740', fillc: '#E2DCCF' }
  : lk === 'red' ? { bg: C.accent, ink: '#141414', dim: '#2A0B08', fillc: '#D9302A' }
  : { bg: C.bg, ink: C.ink, dim: C.dim, fillc: '#2A2A31' };
const colorOf = (c, P) => (c === RED ? (P.bg === C.accent ? '#FFFFFF' : C.accent) : P.ink);

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
  const f = font(size, 400, DISPLAY), track = size * 0.01;
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
    ctx.save(); ctx.translate(cx, base - size * 0.35); ctx.scale(s * (1 + q), s * (1 - q)); ctx.translate(-cx, -(base - size * 0.35));
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
  const k = (it.s ?? 1) * 2.2 * SC;
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
    const col = s.color && s.color === RED ? C.accent : P.ink;
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
const FACES = { zitron: { src: 'photo_zitron.png', cx: 380, cy: 400, r: 235 }, bartlett: { src: 'photo_bartlett.png', cx: 210, cy: 300, r: 195 } };
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
const WHO = (ws) => { const s = ws.map((w) => w[0]).join(' '); return /Zitron/.test(s) ? 'zitron' : /Bartlett/.test(s) ? 'bartlett' : null; };
function onScreen(t, who) {
  const s = SHOTS[shotIndex(t)];
  return s.items.some((it) => it.t <= t && ((it.k === 'image' && it.src.includes(who)) || (it.k === 'face' && it.who === who)));
}
function nameTime(c) { const w = c.ws.find((w) => /Zitron|Bartlett/.test(w[0])); return w ? w[1] : c.a; }

let IMGS = {};

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
function bgOf(ctx, P, t, i, lk) {
  fill(ctx, P.bg);
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
  if (y0 > y1 || s.drawn || s.part) return { dy: 0, sc: 1 };
  const sc = clamp(760 / (y1 - y0), 1, 1.18);
  return { dy: 470 - (y0 + y1) / 2, sc };
});

function drawShot(ctx, i, t) {
  const s = SHOTS[i];
  const lk = look(i), P = pal(lk);
  const age = t - s.t0, dur = s.t1 - s.t0;
  bgOf(ctx, P, t, i, lk);
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
  for (const it of s.items) drawItem(ctx, it, it.t < 0 ? 9 : t - it.t, P, age);
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
  // backing so captions read on light and red shots too
  ctx.save();
  ctx.globalAlpha = 0.78 * clamp(pin * 1.5);
  rrect(ctx, W / 2 - total / 2 - 26, y - size * 0.95, total + 52, size * 1.38, 16);
  ctx.fillStyle = '#0B0B0D'; ctx.fill();
  ctx.restore();
  const who = WHO(c.ws);
  if (who && !onScreen(t, who)) {
    const a = M.spring(t - nameTime(c) + 0.08, SPRING.bouncy);
    faceBadge(ctx, who, W / 2 - total / 2 - 26 - 70, y - size * 0.27, 58 * Math.max(0, a));
  }
  let x = W / 2 - total / 2;
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
  fonts: [font(100, 400, DISPLAY), font(40, 600, UI), font(40, 700, UI)],
  images: { 'photo_zitron.png': 'assets/photo_zitron.png', 'photo_bartlett.png': 'assets/photo_bartlett.png' },
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
    if (i > 0 && a < WHIP) {
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
