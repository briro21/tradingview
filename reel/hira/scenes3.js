// Lines 44-66: the night in the cave. No face is ever drawn: the figure is a silhouette, the entity is pure light.
import * as M from './lib/motion.js';
import * as A from './lib/art.js';
import { env, KIND } from './sets.js';
import { caveFrame, lowerThird } from './scenes1.js';
const { W, H, layer, camAt, glow, rgba, mixc, lerp, clamp, hash01, noise1, sstep, ease, caption, words, figure, terrain, ridge, dust, rays, flame, embers, TAU } = A;
const cx = W / 2;

// the cave at night, looking out. o: {moon:'full'|'crescent'|null, fig:{pose,lean,shiver,s,x}, z0,z1, glow}
function night(ctx, s, o = {}) {
  const { T, p } = s; const c = camAt(p, { z0: o.z0 ?? 1.0, z1: o.z1 ?? 1.15, x0: cx, y0: 520 });
  A.sky(ctx, [[0, '#02040f'], [1, '#0b1630']]);
  layer(ctx, c, 0.05, () => { A.stars(ctx, T, { n: 150, y1: 700 }); if (o.moon === 'crescent') { A.glow(ctx, 1440, 260, 300, '#8fa8ff', 0.25); A.disc(ctx, 1440, 260, 58, '#f0f4ff'); A.disc(ctx, 1462, 248, 56, '#0a1330'); } else if (o.moon !== null) A.moon(ctx, 1460, 260, 62); });
  layer(ctx, c, 0.3, () => terrain(ctx, { y: 700, amp: 80, freq: 0.0035, seed: 5, col: '#0a1228' }));
  layer(ctx, c, 0.95, () => { ctx.fillStyle = '#03040a'; ctx.fillRect(-W, 840, W * 3, 600); const f = o.fig || {}; if (f.show !== false) figure(ctx, f.x ?? cx - 120, 842, f.s ?? 1.5, { col: '#05070f', rim: o.rim || '#7e9be0', pose: f.pose || 'sit', t: T, rimDx: 3, lean: f.lean || 0, shiver: f.shiver || 0, hands: f.hands }); });
  layer(ctx, c, 1.15, () => caveFrame(ctx, { x: cx, y: 480, w: 1500, h: 860, col: '#020206', rim: '#16203a' }));
  return c;
}
const flash = (ctx, a, col = '#fff') => { if (a > 0.01) { ctx.fillStyle = rgba(col, clamp(a)); ctx.fillRect(0, 0, W, H); } };
const shk = (ctx, T, a, seed = 3) => { if (a > 0.1) ctx.translate(noise1(T * 55, seed) * a, noise1(T * 55, seed + 7) * a); };
const quote = (ctx, s, str, u0, col = '#fff4dc', y = 980) => { const a = sstep(u0, u0 + 0.5, s.lu) * (1 - sstep(s.nb - 0.8, s.nb - 0.2, s.lu)); caption(ctx, str, cx, y, 54, col, { a, track: 3 }); };
function squeeze(ctx, s, k, tintc = '#ffb347') {          // two walls of light closing on a tiny figure
  const { T } = s; A.sky(ctx, [[0, '#050304'], [1, '#14080a']]);
  glow(ctx, cx, 560, 700, tintc, 0.22 + 0.1 * Math.sin(T * 7));
  const gap = lerp(560, 70, k) + Math.sin(T * 9) * 6;
  [-1, 1].forEach((sd) => { ctx.fillStyle = A.lin(ctx, cx + sd * gap, 0, cx + sd * (gap + 520), 0, [[0, rgba(tintc, 0.95)], [0.12, rgba(tintc, 0.45)], [1, rgba(tintc, 0)]]); ctx.fillRect(sd < 0 ? cx - gap - 600 : cx + gap, 0, 600, H); ctx.fillStyle = '#000'; ctx.fillRect(sd < 0 ? -W : cx + gap + 40, 0, sd < 0 ? W + cx - gap - 40 : W, H); });
  figure(ctx, cx, 920, 1.25 - k * 0.2, { col: '#0a0507', rim: tintc, pose: 'hands', t: T, shiver: 2 + k * 5, rimDx: 4 });
}
function readCard(ctx, s, col, glitchAmt, bg) {
  const { T, lu } = s; ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  const k = M.springU(lu, 0, { stiffness: 420, damping: 15 }), sh = glitchAmt * Math.max(0, 1 - lu * 0.8);
  ctx.save(); ctx.translate(cx + noise1(T * 80, 2) * 34 * sh, 560 + noise1(T * 80, 3) * 18 * sh); ctx.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k);
  ctx.globalCompositeOperation = 'lighter'; const f = M.font(330, 700, 'Display'); [['#ff2040', -12 * sh], ['#20e0ff', 12 * sh], [col, 0]].forEach(([c, dx], i) => { ctx.globalAlpha = i < 2 ? 0.6 * Math.min(1, sh * 3) : 1; M.text(ctx, 'READ!', dx, 0, f, c, 'center', 24); });
  ctx.restore();
  for (let i = 0; i < 12; i++) { const y = hash01(Math.floor(T * 18) + i, 4) * H; ctx.fillStyle = rgba(col, 0.07 * sh); ctx.fillRect(0, y, W, 4 + hash01(i, 6) * 14); }
  A.arabic(ctx, 'اقْرَأْ', cx, 800, 150, rgba(col, 0.75), 0.9, col);
}

export const SC3 = {
  44(ctx, s) {
    const { T, p, lu } = s; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    const a = sstep(1.5, 4.5, lu); ctx.globalAlpha = a; A.stars(ctx, T, { n: 220, y1: 700, a: 0.9 }); layer(ctx, { x: cx, y: 540, z: 1 + p * 0.1 }, 0.3, () => terrain(ctx, { y: 800, amp: 90, freq: 0.003, seed: 6, col: '#070b18' })); ctx.globalAlpha = 1;
    glow(ctx, cx, 600, 60 + lu * 40, '#8fa8ff', 0.12 * a);
  },
  45(ctx, s) {
    const { T, lu } = s; night(ctx, s, { moon: 'crescent' }); A.dust(ctx, T, { n: 40, col: '#a8c0ff', a: 0.3 }); A.vignette(ctx, 0.5);
    caption(ctx, 'RAMADAN', 420, 300, 54, '#d8e4ff', { a: sstep(0.6, 1.4, lu), track: 20, align: 'left' }); caption(ctx, '610 AD  ·  CAVE HIRA', 424, 350, 26, '#9db6ff', { a: sstep(1.2, 2.0, lu), font: 'UI', w: 500, track: 8, align: 'left' });
  },
  46(ctx, s) {
    const { T, lu } = s; const hit = lu > 1.6 ? lu - 1.6 : -1; ctx.save(); if (hit >= 0) shk(ctx, T, 34 * Math.exp(-hit * 2.2));
    night(ctx, s, { moon: 'crescent', z0: 1.0, z1: 1.3, fig: { lean: hit >= 0 ? -0.9 : 0, shiver: hit >= 0 ? 6 : 0, pose: 'sit' } }); ctx.restore();
    if (hit >= 0) { flash(ctx, Math.exp(-hit * 4) * 0.9, '#cfe0ff'); A.vignette(ctx, 0.8); } else A.vignette(ctx, 0.5);
    caption(ctx, 'It grabs him.', cx, 960, 64, '#fff', { a: sstep(1.9, 2.4, lu) * (1 - sstep(4.0, 4.6, lu)), track: 4 });
  },
  47(ctx, s) {
    const { T, p, lu } = s; const k = ease(lu / 2.2); const c = camAt(p, { z0: 1.0, z1: 1.15, x0: cx, y0: 560 });
    A.sky(ctx, [[0, '#0a0805'], [1, '#2a1a08']]);
    layer(ctx, c, 0.3, () => {
      glow(ctx, cx, 520, 1300 * k, '#ffcf70', 0.75);
      ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 7; i++) { const w = (i + 1) / 7, a = 0.1 + 0.05 * Math.sin(T * 1.4 + i); [-1, 1].forEach((sd) => { ctx.fillStyle = A.lin(ctx, cx, 520, cx + sd * 1100 * k, 520 - 380 * w, [[0, rgba('#fff0c0', a * 2)], [1, rgba('#ffb347', 0)]]); ctx.beginPath(); ctx.moveTo(cx, 760); ctx.quadraticCurveTo(cx + sd * 700 * k, 640 - 700 * w * k, cx + sd * 1200 * k, 260 + 220 * w); ctx.quadraticCurveTo(cx + sd * 600 * k, 470 - 120 * w, cx, 300); ctx.fill(); }); }
      ctx.fillStyle = A.lin(ctx, 0, 100, 0, 900, [[0, 'rgba(255,248,220,0)'], [0.5, `rgba(255,248,220,${0.9 * k})`], [1, 'rgba(255,248,220,0)']]); ctx.fillRect(cx - 90 * k, 100, 180 * k, 800); ctx.restore();
      ctx.save(); ctx.translate(cx, 440); ctx.strokeStyle = rgba('#fff0b0', 0.6 * k); ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, 0, 190, 0, TAU); ctx.stroke(); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, 240 + Math.sin(T * 2) * 8, 0, TAU); ctx.stroke(); ctx.restore(); });
    rays(ctx, cx, 520, 0, 6.28, 1800, '#fff0c0', 0.1 * k, T, 20);
    layer(ctx, c, 0.95, () => { ctx.fillStyle = '#0a0604'; ctx.fillRect(-W, 900, W * 3, 400); figure(ctx, cx, 960, 0.8, { col: '#050302', rim: '#fff0c0', pose: 'sit', t: T, shiver: 2, rimDx: 4 }); });
    layer(ctx, c, 1.15, () => caveFrame(ctx, { x: cx, y: 480, w: 1900, h: 1000, col: '#030202', rim: '#6a4a18' }));
    flash(ctx, 0.9 * Math.exp(-lu * 3), '#fff0c0'); A.dust(ctx, T, { n: 90, col: '#ffe8a0', a: 0.7, sy: -26 }); A.vignette(ctx, 0.4);
  },
  48(ctx, s) {
    const { T, lu } = s; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 4; i++) { const ph = clamp(lu / 3 - i * 0.1); if (ph > 0 && ph < 1) { ctx.strokeStyle = `rgba(255,220,130,${0.6 * (1 - ph)})`; ctx.lineWidth = 10 * (1 - ph) + 1; ctx.beginPath(); ctx.arc(cx, 540, ph * 1300, 0, TAU); ctx.stroke(); } }
    const k = M.springU(lu, 0.1, { stiffness: 340, damping: 14 }); ctx.save(); ctx.translate(cx + noise1(T * 70, 1) * 14 * Math.exp(-lu * 2), 540); ctx.scale(0.4 + 0.6 * k, 0.4 + 0.6 * k);
    A.arabic(ctx, 'اقْرَأْ', 0, -20, 360, '#ffe3a0', clamp(k * 2), '#ffb347'); ctx.restore(); words(ctx, lu, 0.4, 'READ!', cx, 880, 150, '#fff', { stag: 0, track: 30 });
  },
  49(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.2, x0: cx, y0: 560 });
    A.sky(ctx, [[0, '#080408'], [1, '#1c0c08']]); glow(ctx, cx + 500, 400, 900, '#ffcf70', 0.4 + 0.1 * Math.sin(T * 3));
    layer(ctx, c, 0.95, () => { ctx.fillStyle = '#0a0504'; ctx.fillRect(-W, 900, W * 3, 400); figure(ctx, cx - 160, 980, 2.3, { col: '#08050a', rim: '#ffcf70', pose: 'hands', t: T, shiver: 2, rimDx: 6, lean: 0.1 }); });
    rays(ctx, cx + 500, 400, Math.PI * 0.92, 0.9, 1300, '#ffcf70', 0.12, T, 8); A.dust(ctx, T, { n: 40, col: '#ffd890', a: 0.5 }); A.vignette(ctx, 0.6);
    quote(ctx, s, '“I am not a reader.”', 1.6);
  },
  50(ctx, s) { const { T, lu } = s; ctx.save(); shk(ctx, T, 8 + lu * 1.6); squeeze(ctx, s, clamp(lu / 7)); ctx.restore(); A.vignette(ctx, 0.7); },
  51(ctx, s) {
    const { T, lu } = s; ctx.save(); shk(ctx, T, 6); night(ctx, s, { z0: 1.1, z1: 1.3, rim: '#5a78c0', fig: { pose: 'hands', lean: Math.sin(T * 5) * 0.2 + 0.2, shiver: 4, s: 1.7 } }); ctx.restore();
    const br = 0.4 + 0.3 * Math.sin(T * 5.5); A.vignette(ctx, 0.55 + br * 0.5); A.tint(ctx, '#2040a0', 0.25, 'multiply');
    for (let i = 0; i < 6; i++) { const y = ((T * 140 + i * 190) % H); ctx.fillStyle = 'rgba(120,150,255,.05)'; ctx.fillRect(0, y, W, 24); }
    caption(ctx, 'suffocating', cx, 980, 50, '#8fa8e8', { font: 'UI', w: 500, track: 18, a: sstep(0.6, 1.4, lu) * 0.9 });
  },
  52(ctx, s) {
    const { T, lu } = s; const g = sstep(0.2, 1.4, lu); night(ctx, s, { z0: 1.3, z1: 1.1, fig: { pose: 'sit', lean: lerp(0.9, 0.1, g), s: 1.7, shiver: 3 * (1 - g) } });
    flash(ctx, 0.8 * Math.exp(-lu * 3.5), '#cfe0ff'); A.vignette(ctx, 0.5); A.bars(ctx, ease(lu / 1.2) * 1);
    quote(ctx, s, 'Muhammad gasps for air.', 1.0, '#e8efff', 900);
  },
  53(ctx, s) { readCard(ctx, s, '#ffe3a0', 1.0, '#030204'); },
  54(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.12, z1: 1.0, x0: cx, y0: 560 });
    A.sky(ctx, [[0, '#080408'], [1, '#1c0c08']]); glow(ctx, cx - 500, 400, 900, '#ffcf70', 0.4);
    layer(ctx, c, 0.95, () => { ctx.fillStyle = '#0a0504'; ctx.fillRect(-W, 900, W * 3, 400); figure(ctx, cx + 160, 980, 2.1, { col: '#08050a', rim: '#ffcf70', pose: 'hands', t: T, shiver: 3, rimDx: -6, flip: -1 }); });
    rays(ctx, cx - 500, 400, Math.PI * 0.08, 0.9, 1300, '#ffcf70', 0.12, T, 8); A.dust(ctx, T, { n: 40, col: '#ffd890', a: 0.5 }); A.vignette(ctx, 0.6);
    quote(ctx, s, 'Same answer.  “I am not a reader.”', 1.6);
  },
  55(ctx, s) { const { T, lu } = s; ctx.save(); shk(ctx, T, 10 + lu * 1.2); squeeze(ctx, s, clamp(lu / 6) * 0.95, '#a8c0ff'); ctx.restore(); A.vignette(ctx, 0.75); },
  56(ctx, s) { readCard(ctx, s, '#ff3a2a', 1.4, '#080102'); A.vignette(ctx, 0.6, '#200000'); },
  57(ctx, s) {
    const { T, p, lu } = s; ctx.save(); shk(ctx, T, Math.max(0, 8 - lu * 2)); night(ctx, s, { moon: null, z0: 1.0, z1: 1.2, rim: '#3a4878', fig: { pose: 'sit', lean: 0.45 + 0.4 * ease(p), s: 1.6, shiver: 2 * (1 - p) } }); ctx.restore();
    const fl = hash01(Math.floor(T * 14), 9) > 0.86 ? 0.5 : 0; flash(ctx, fl * 0.2, '#8fa8ff'); A.vignette(ctx, 0.6 + p * 0.3);
    caption(ctx, 'exhausted.  broken down.', cx, 960, 48, '#8fa0d0', { a: sstep(1.2, 2.2, lu), font: 'UI', w: 500, track: 10 });
  },
  58(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.12, x0: cx, y0: 540 });
    A.sky(ctx, [[0, '#1a1006'], [1, '#6a4a1a']]); glow(ctx, cx, 480, 1200, '#ffd890', 0.7);
    layer(ctx, c, 0.2, () => { ctx.save(); ctx.translate(cx, 480); A.rays(ctx, 0, 0, T * 0.04, 6.28, 1700, '#fff0c0', 0.1, T, 18); ctx.restore(); });
    layer(ctx, c, 0.95, () => { ctx.fillStyle = '#1a0e06'; ctx.fillRect(-W, 900, W * 3, 400); figure(ctx, cx, 960, 1.55, { col: '#241408', rim: '#fff0c0', pose: 'sit', t: T, rimDx: 4 }); });
    layer(ctx, c, 1.15, () => caveFrame(ctx, { x: cx, y: 500, w: 2000, h: 1100, col: '#0a0603', rim: '#8a6a28' }));
    for (let i = 0; i < 5; i++) { const k = s.nocap ? 0 : M.springU(lu, 1.5 + i * 0.7, M.SPRING.bouncy); if (k > 0) { glow(ctx, cx - 240 + i * 120, 220, 60 * k, '#fff0b0', 0.9); A.disc(ctx, cx - 240 + i * 120, 220, 14 * k, '#fff8e0'); } }
    if (!s.nocap) caption(ctx, 'FIVE VERSES', cx, 330, 40, '#ffe8b8', { font: 'UI', w: 500, track: 24, a: sstep(1.2, 2.0, lu) }); A.dust(ctx, T, { n: 80, col: '#fff0c0', a: 0.7, sy: -22 }); A.vignette(ctx, 0.35);
  },
  59(ctx, s) {
    const { T, lu } = s; A.sky(ctx, [[0, '#120c04'], [1, '#2e1e08']]); glow(ctx, cx, 480, 1100, '#ffc050', 0.45);
    const r = ease(lu / 2.2); ctx.save(); ctx.beginPath(); ctx.rect(cx - 880 * r, 0, 1760 * r, H); ctx.clip(); A.arabic(ctx, 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ', cx, 520, 150, '#ffe3a0', 1, '#ffb347'); ctx.restore();
    caption(ctx, '“Read in the name of your Lord who created.”', cx, 760, 46, '#fff4dc', { a: sstep(1.0, 2.0, lu), w: 600 }); A.dust(ctx, T, { n: 60, col: '#ffd890', a: 0.6, sy: -16 }); A.vignette(ctx, 0.5);
  },
  60(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.3, x0: cx, y0: 540 });
    A.sky(ctx, [[0, '#0a0610'], [1, '#2a1030']]);
    layer(ctx, c, 0.8, () => { for (let i = 0; i < 40; i++) { const a = hash01(i, 5) * TAU, r = 40 + hash01(i, 6) * 300 * (1 - 0.5 * ease(lu / 3)), x = cx + Math.cos(a + T * 0.15) * r * 1.3, y = 540 + Math.sin(a + T * 0.15) * r, sz = 26 + hash01(i, 7) * 50 + Math.sin(T * 1.5 + i) * 4;
      ctx.fillStyle = A.rad(ctx, x, y, 0, sz, [[0, 'rgba(255,200,230,.85)'], [0.7, 'rgba(210,110,190,.5)'], [1, 'rgba(120,40,120,0)']]); ctx.beginPath(); ctx.arc(x, y, sz, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(255,240,250,.5)'; ctx.beginPath(); ctx.arc(x - sz * 0.2, y - sz * 0.2, sz * 0.25, 0, TAU); ctx.fill(); } });
    glow(ctx, cx, 540, 600, '#ff8ad0', 0.18); A.dust(ctx, T, { n: 50, col: '#ffc0f0', a: 0.4 }); A.vignette(ctx, 0.55);
    caption(ctx, '“Created man from a clinging substance.”', cx, 960, 44, '#ffe0f4', { a: sstep(0.6, 1.4, lu) });
  },
  61(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.12, z1: 1.0, x0: cx, y0: 540 });
    A.sky(ctx, [[0, '#4a5890'], [0.5, '#f0b080'], [1, '#ffe0a8']]); layer(ctx, c, 0.3, () => ridge(ctx, { y: 740, amp: 80, freq: 0.003, seed: 5, col: '#8a6070' }));
    layer(ctx, c, 0.5, () => terrain(ctx, { y: 860, amp: 40, freq: 0.004, seed: 6, col: '#5a3a48', bot: '#2a1a24' }));
    rays(ctx, cx, 700, Math.PI * 1.5, 1.6, 1100, '#fff0c0', 0.2, T, 12); glow(ctx, cx, 700, 700, '#ffe8b0', 0.5);
    layer(ctx, c, 1.2, () => { ctx.fillStyle = '#060304'; ctx.beginPath(); ctx.moveTo(-300, 1300); ctx.lineTo(-300, -200); ctx.lineTo(560, -200); ctx.quadraticCurveTo(660, 500, 380, 800); ctx.quadraticCurveTo(300, 1000, 520, 1300); ctx.fill(); ctx.beginPath(); ctx.moveTo(2300, 1300); ctx.lineTo(2300, -200); ctx.lineTo(1400, -200); ctx.quadraticCurveTo(1260, 400, 1540, 700); ctx.quadraticCurveTo(1700, 950, 1480, 1300); ctx.fill(); });
    caption(ctx, '“Read, and your Lord is the most Generous.”', cx, 980, 44, '#fff4dc', { a: sstep(0.5, 1.3, lu) }); A.dust(ctx, T, { n: 70, col: '#fff0c8', a: 0.6, sy: -12 }); A.vignette(ctx, 0.4);
  },
  62(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.25, x0: 800, x1: 1100, y0: 600 });
    A.sky(ctx, [[0, '#120c06'], [1, '#2e1c0a']]); glow(ctx, cx, 640, 900, '#ffb050', 0.35);
    layer(ctx, c, 1.0, () => { ctx.fillStyle = '#e8d6a8'; ctx.beginPath(); ctx.roundRect(300, 500, 1320, 440, 10); ctx.fill(); const k = ease(lu / 2.0), pts = [];
      for (let i = 0; i <= 60; i++) { const f = i / 60; pts.push([420 + f * 1000, 700 + Math.sin(f * 26) * 40 * (0.4 + Math.sin(f * 4) * 0.3) + Math.sin(f * 9) * 20]); }
      ctx.strokeStyle = '#3a1c08'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.shadowColor = '#ffb347'; ctx.shadowBlur = 16; ctx.beginPath(); pts.slice(0, Math.max(2, Math.floor(60 * k))).forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.shadowBlur = 0;
      const [px, py] = pts[Math.max(1, Math.floor(60 * k))]; ctx.save(); ctx.translate(px, py); ctx.rotate(-0.7); ctx.fillStyle = '#5a3418'; ctx.fillRect(-8, -460, 16, 460); ctx.beginPath(); ctx.moveTo(-8, 0); ctx.lineTo(8, 0); ctx.lineTo(0, 44); ctx.fill(); ctx.restore(); glow(ctx, px, py, 90, '#ffd890', 0.8); });
    A.dust(ctx, T, { n: 40, col: '#ffd890', a: 0.5 }); A.vignette(ctx, 0.5); caption(ctx, '“Who taught by the pen.”', cx, 1010, 46, '#fff4dc', { a: sstep(0.4, 1.0, lu) });
  },
  63(ctx, s) {
    const { T, p, lu } = s; A.sky(ctx, [[0, '#0a0814'], [1, '#2a1a3a']]); A.stars(ctx, T, { n: 100, y1: 900 });
    const b = ease(lu / 1.6); glow(ctx, cx, 720, 500 + 700 * b, '#ffd890', 0.7 * (1 - b * 0.4));
    for (let i = 0; i < 70; i++) { const a = -Math.PI / 2 + (hash01(i, 3) - 0.5) * 2.4, sp = 300 + hash01(i, 4) * 900, k = clamp((lu - 0.15) / 3); const x = cx + Math.cos(a) * sp * k * 1.1, y = 720 + Math.sin(a) * sp * k; ctx.save(); ctx.translate(x, y); ctx.rotate(hash01(i, 8) * 6 + T * (hash01(i, 9) - 0.5) * 3); ctx.globalAlpha = (1 - k) * 0.9; A.arabic(ctx, ['ا', 'ب', 'ت', 'ع', 'ل', 'م', 'ن', 'ه', 'و', 'ي'][i % 10], 0, 0, 34 + hash01(i, 5) * 54, '#ffe8b0', 1, '#ffb347'); ctx.restore(); }
    ctx.fillStyle = '#e8d6a8'; ctx.beginPath(); ctx.roundRect(cx - 360, 730, 720, 90, 8); ctx.fill();
    caption(ctx, '“Taught man that which he knew not.”', cx, 980, 46, '#fff4dc', { a: sstep(0.4, 1.0, lu) }); flash(ctx, 0.5 * Math.exp(-lu * 6), '#fff0c0'); A.vignette(ctx, 0.45);
  },
  64(ctx, s) {
    const { T, lu } = s; ctx.fillStyle = '#060304'; ctx.fillRect(0, 0, W, H); glow(ctx, cx, 520, 900, '#ffb347', 0.1);
    caption(ctx, 'ONLY FIVE VERSES.', cx, 300, 70, '#ffe8b8', { track: 10, a: sstep(0, 0.6, lu) });
    ['NO LAWS', 'NO RULES ABOUT PRAYER', 'NO STORIES OF PAST PROPHETS'].forEach((w, i) => { const u0 = 1.6 + i * 1.5, a = sstep(u0, u0 + 0.5, lu), strike = sstep(u0 + 0.5, u0 + 1.0, lu), y = 520 + i * 130;
      caption(ctx, w, cx, y, 70, '#fff', { a: a * (1 - strike * 0.55), track: 6 }); ctx.font = M.font(70, 700, 'Display'); ctx.letterSpacing = '6px'; const wd = ctx.measureText(w).width; ctx.letterSpacing = '0px';
      ctx.fillStyle = '#ff3a2a'; ctx.fillRect(cx - wd / 2 - 10, y - 26, (wd + 20) * strike, 8); });
    A.vignette(ctx, 0.5);
  },
  65(ctx, s) {
    const { T, p, lu } = s; const k = ease(lu / 3.2), big = ease(clamp((lu - 3.2) / 2)); const c = camAt(p, { z0: 1.0, z1: 1.2, x0: cx, y0: 620 });
    A.sky(ctx, [[0, '#080404'], [1, '#2a1208']]); glow(ctx, cx, 640, 700 + big * 900, '#ff7a30', 0.35 + big * 0.5);
    layer(ctx, c, 1.0, () => { ctx.save(); ctx.translate(cx, 880); ctx.rotate(-0.28); ctx.fillStyle = '#c89050'; ctx.fillRect(-12, -520, 24, 520); ctx.fillStyle = '#b02a1a'; ctx.beginPath(); ctx.ellipse(0, -526, 22, 28, 0, 0, TAU); ctx.fill(); ctx.restore(); flame(ctx, cx - 140 + 0, 400, 0.6 + 2.2 * k + big * 2.2, T); });
    embers(ctx, T, cx - 140, 380, { n: 70, up: 520, r: 500 + big * 700 }); A.vignette(ctx, 0.5);
    caption(ctx, '23 YEARS OF REVELATION', cx, 990, 44, '#ffc89a', { a: sstep(3.0, 4.0, lu), font: 'UI', w: 500, track: 14 });
  },
  66(ctx, s) {
    const { T, p, lu } = s; night(ctx, s, { moon: 'crescent', z0: 1.1, z1: 1.0, fig: { pose: 'sit', s: 1.5 } }); const g = 1 - sstep(0, 2.0, lu);
    glow(ctx, cx, 560, 900, '#ffe8a0', 0.6 * g); for (let i = 0; i < 40; i++) { const ph = (lu / 4 + hash01(i, 3)) % 1; ctx.fillStyle = `rgba(255,240,180,${0.9 * g * (1 - ph)})`; ctx.beginPath(); ctx.arc(cx - 400 + hash01(i, 4) * 800, 800 - ph * 700, 2 + hash01(i, 5) * 3, 0, TAU); ctx.fill(); }
    A.vignette(ctx, 0.5); caption(ctx, 'the cave is empty again', cx, 960, 44, '#9db6ff', { a: sstep(1.0, 2.0, lu), font: 'UI', w: 500, track: 10 });
  },
};
