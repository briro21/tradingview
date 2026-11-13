// Hook, title card, and the Mecca chapter (lines 4-18).
import * as M from './lib/motion.js';
import * as A from './lib/art.js';
import { env, ground, crowd, KIND, CROWD } from './sets.js';
const { W, H, layer, camAt, glow, rgba, mixc, lerp, clamp, hash01, noise1, sstep, ease, caption, words, figure, camel, kaaba, idol, town, house, terrain, dust, rays, flame, embers, shadowEllipse, hazeBand, TAU } = A;
const cx = W / 2;

// ---- shared pieces
// rock frame with an arched opening (cave mouth). rough edge from noise.
export function caveFrame(ctx, o = {}) {
  const { x = cx, y = 470, w = 900, h = 640, col = '#07070b', seed = 3, rim = '#1b1f2e', t = 0 } = o;
  ctx.save(); ctx.beginPath(); ctx.rect(-W, -H, W * 3, H * 3);
  const pts = []; const N = 40;
  for (let i = 0; i <= N; i++) {
    const a = Math.PI + (i / N) * Math.PI; const r = 1 + noise1(i * 0.55, seed) * 0.07 + (hash01(i, seed + 4) - 0.5) * 0.03;
    pts.push([x + Math.cos(a) * w / 2 * r, y + Math.sin(a) * h / 2 * r * (i > 6 && i < N - 6 ? 1 : 0.9)]);
  }
  ctx.moveTo(x - w / 2, y + h * 0.9); pts.forEach(([px, py]) => ctx.lineTo(px, py)); ctx.lineTo(x + w / 2, y + h * 0.9); ctx.closePath();
  ctx.fillStyle = col; ctx.fill('evenodd');
  ctx.lineWidth = 7; ctx.strokeStyle = rim; ctx.globalAlpha = 0.6; ctx.beginPath(); pts.forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py))); ctx.stroke();
  ctx.restore();
}
export const lowerThird = (ctx, s, a, b, u0 = 1) => {
  const k = M.springU(s.lu, u0, M.SPRING.gentle), out = 1 - sstep(s.nb - 1.2, s.nb - 0.3, s.lu); if (k <= 0) return;
  ctx.save(); ctx.globalAlpha = clamp(k) * out; ctx.translate(120, H - 150 + (1 - k) * 24);
  ctx.fillStyle = 'rgba(240,200,120,.9)'; ctx.fillRect(0, 0, 4, 78);
  M.text(ctx, a, 22, 36, M.font(46, 700, 'Display'), '#fff4dc'); M.text(ctx, b, 22, 74, M.font(26, 500, 'UI'), 'rgba(255,236,200,.8)', 'left', 4); ctx.restore();
};
export const lock = (ctx, x, y, s, col) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = col; ctx.lineWidth = 9; ctx.beginPath(); ctx.arc(0, -22, 22, Math.PI, 0); ctx.lineTo(22, -2); ctx.moveTo(-22, -22); ctx.lineTo(-22, -2); ctx.stroke(); ctx.fillStyle = col; ctx.beginPath(); ctx.roundRect(-34, -6, 68, 54, 8); ctx.fill(); ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(0, 18, 7, 0, TAU); ctx.fill(); ctx.restore(); };

export const SC1 = {
  // ------------------------------------------------------------- HOOK
  h0(ctx, s) {
    const { T, p, lu, vo } = s; const seize = sstep(3.9, 5.3, vo), dark = sstep(5.4, 6.9, vo);
    A.sky(ctx, [[0, '#02040c'], [1, '#0d1a38']]);
    const c = camAt(p, { z0: 1.0, z1: 1.28, x0: cx, y0: 520, y1: 560 });
    layer(ctx, c, 0.05, () => { A.stars(ctx, T, { n: 120, y0: 0, y1: 640 }); A.moon(ctx, 1380, 250, 70); });
    layer(ctx, c, 0.25, () => terrain(ctx, { y: 650, amp: 70, freq: 0.004, seed: 5, col: '#0a1228' }));
    layer(ctx, c, 0.6, () => { terrain(ctx, { y: 770, amp: 40, freq: 0.006, seed: 9, col: '#070b19' }); });
    // the man: seated, rim-lit by the moon; jolts when seized
    layer(ctx, c, 0.9, () => { ctx.fillStyle = '#05060b'; ctx.fillRect(-W, 836, W * 3, 600); shadowEllipse(ctx, cx, 836, 150, 0.4);
      figure(ctx, cx, 838, 1.45, { col: '#07090f', rim: '#6c8cd8', pose: 'sit', t: T, shiver: seize * 6 + dark * 4, rimDx: -3 }); });
    layer(ctx, c, 1.15, () => caveFrame(ctx, { x: cx, y: 500, w: 1180 - seize * 140, h: 800 - seize * 120, col: '#030306', rim: '#141a30' }));
    // darkness closes in: black mass crawling over the opening
    if (seize > 0) { ctx.save(); ctx.fillStyle = '#000'; ctx.beginPath(); const N = 36; for (let i = 0; i <= N; i++) { const a = i / N * TAU, r = lerp(1300, 60, ease(seize * 0.6 + dark * 0.5)) * (0.8 + noise1(i * 0.6 + T * 1.3, 5) * 0.25); const px = cx + Math.cos(a) * r * 1.3, py = 560 + Math.sin(a) * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); ctx.rect(W, 0, -W, H); ctx.fill('evenodd'); ctx.restore(); }
    // breath: the figure's glow dims
    A.vignette(ctx, 0.5 + dark * 0.4);
    // title in the first seconds
    const a = sstep(0.1, 0.8, lu) * (1 - sstep(2.6, 3.6, lu));
    if (a > 0) { caption(ctx, '610 A.D.', cx, 330, 84, '#f0e2c4', { a, track: 14 }); caption(ctx, 'A CAVE ABOVE MECCA', cx, 384, 30, '#a9bde8', { a, font: 'UI', w: 500, track: 10 }); }
    ctx.fillStyle = `rgba(0,0,0,${dark})`; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = `rgba(0,0,0,${1 - sstep(0, 1.2, lu)})`; ctx.fillRect(0, 0, W, H);
  },
  h1(ctx, s) {
    const { T, lu } = s; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    const k = M.springU(lu, 0.0, { stiffness: 380, damping: 17 }), sh = Math.max(0, 1 - lu * 1.6);
    ctx.save(); ctx.translate(cx + noise1(T * 60, 2) * 26 * sh, H / 2 + noise1(T * 60, 4) * 16 * sh); ctx.scale(0.9 + k * 0.1 + lu * 0.01, 0.9 + k * 0.1 + lu * 0.01);
    ctx.globalCompositeOperation = 'lighter'; const f = M.font(250, 700, 'Display');
    [['#ff1f3a', -9 * sh - 2], ['#18d8ff', 9 * sh + 2]].forEach(([c, dx]) => { ctx.globalAlpha = 0.55; M.text(ctx, 'NOT', dx, -10, f, c, 'center', 20); M.text(ctx, 'HUMAN', dx, 240, f, c, 'center', 20); });
    ctx.globalAlpha = 1; M.text(ctx, 'NOT', 0, -10, f, '#fff', 'center', 20); M.text(ctx, 'HUMAN', 0, 240, f, '#fff', 'center', 20); ctx.restore();
    ctx.fillStyle = `rgba(255,255,255,${0.04 * Math.sin(T * 90)})`; ctx.fillRect(0, 0, W, H);
  },
  h2(ctx, s) {
    const { T, lu, p } = s; const i = Math.min(4, Math.floor(lu)); const k = lu - Math.floor(lu); const z = 1 + k * 0.1;
    ctx.save(); ctx.translate(cx, H / 2); ctx.scale(z, z); ctx.translate(-cx, -H / 2);
    if (i === 0) { const P = env(ctx, { x: cx, y: 540, z: 1 }, { kind: 'dawn', t: T, sun: [cx, 540, 70], y: 620 }); kaaba(ctx, cx, 820, 1.4, { glow: 0.5 }); }
    else if (i === 1) { env(ctx, { x: cx, y: 540, z: 1 }, { kind: 'night', t: T, moon: [cx - 300, 220, 60], y: 700, jag: true }); figure(ctx, cx + 220, 860, 1.8, { col: '#06070d', rim: '#7e9be0', pose: 'sit', t: T }); }
    else if (i === 2) { A.sky(ctx, [[0, '#120a04'], [1, '#2a1808']]); glow(ctx, cx, H / 2, 700, '#ffb347', 0.5); ctx.save(); ctx.translate(cx, H / 2); ctx.fillStyle = '#e8d3a0'; ctx.beginPath(); ctx.roundRect(-380, -200, 760, 400, 12); ctx.fill(); ctx.fillStyle = '#6a4a22'; for (let r = 0; r < 7; r++) ctx.fillRect(-320, -150 + r * 46, 640 * (0.7 + hash01(r, 4) * 0.3), 12); ctx.restore(); }
    else if (i === 3) { A.sky(ctx, [[0, '#2a2744'], [1, '#f6b97a']]); terrain(ctx, { y: 700, amp: 90, freq: 0.004, seed: 4, col: '#3a1d24' }); glow(ctx, cx, 600, 500, '#ffd9a0', 0.8); crowd(ctx, T, { x0: 200, x1: W - 200, y: 960, n: 7, s: 0.85, walk: false, P: KIND.dawn, colors: null }); }
    else { env(ctx, { x: cx, y: 540, z: 1 }, { kind: 'night', t: T, milky: true, y: 780 }); }
    ctx.restore();
    // white flash on the downbeat of each cut, then the question
    ctx.fillStyle = `rgba(255,255,255,${0.35 * Math.max(0, 1 - k * 5)})`; ctx.fillRect(0, 0, W, H);
    A.vignette(ctx, 0.35); words(ctx, lu, 0, 'WHAT HAPPENED IN THAT CAVE?', cx, 930, 78, '#fff', { stag: 0.08, w: 700 });
  },
  h3(ctx, s) {
    const { T, lu, p } = s; const c = camAt(p, { z0: 1.0, z1: 1.2, x0: cx, y0: 540 });
    A.sky(ctx, [[0, '#0b0305'], [1, '#2a0809']]);
    layer(ctx, c, 0.2, () => { glow(ctx, cx + 260, 440, 640, '#d8301c', 0.55); ctx.fillStyle = '#ff6a40'; ctx.beginPath(); ctx.roundRect(cx + 200, 330, 120, 220, [60, 60, 0, 0]); ctx.fill(); });
    layer(ctx, c, 0.7, () => { ctx.fillStyle = '#1a0507'; ctx.fillRect(-W, 800, W * 3, 600); figure(ctx, cx - 140, 830, 1.55, { col: '#0e0305', rim: '#ff5a38', pose: 'staff', t: T, rimDx: 4 }); });
    layer(ctx, c, 1.0, () => rays(ctx, cx + 260, 440, Math.PI * 0.82, 0.5, 900, '#ff6a40', 0.14, T, 8));
    dust(ctx, T, { n: 50, col: '#ff9a70', a: 0.4, sx: 8, sy: -5 });
    const a1 = sstep(2.6, 3.4, lu), a2 = sstep(5.0, 5.8, lu), pulse = 0.7 + 0.3 * Math.sin(T * 5);
    if (a1 > 0) { lock(ctx, cx + 420, 880, 1.2, `rgba(255,70,50,${a1 * pulse})`); caption(ctx, 'THE DARK PROPHECY', cx - 130, 900, 76, '#fff', { a: a1, track: 6 }); }
    if (a2 > 0) caption(ctx, 'LOCKED  ·  REVEALED AT THE END', cx - 130, 960, 30, '#ff8a70', { a: a2, font: 'UI', w: 500, track: 9 });
    A.vignette(ctx, 0.6, '#150204');
  },
  title(ctx, s) {
    const { T, lu } = s; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    const k = ease(lu / 2.2); glow(ctx, cx, 470, 700, '#c9972a', 0.35 * k);
    A.arabic(ctx, 'اقرأ', cx, 560, 420, `rgba(255,222,150,${0.1 * k})`, 1, '#ffcf80');
    words(ctx, lu, 0.5, 'THE NIGHT OF HIRA', cx, 520, 130, '#fbe9c4', { stag: 0.25, track: 10 });
    const a = sstep(2.2, 3.4, lu); ctx.fillStyle = `rgba(230,190,110,${a})`; ctx.fillRect(cx - 160 * a, 566, 320 * a, 3);
    caption(ctx, 'CHAPTER 1  ·  THE FIRST REVELATION', cx, 640, 30, `rgba(255,236,200,${a})`, { font: 'UI', w: 500, track: 12, a });
    A.vignette(ctx, 0.5);
    ctx.fillStyle = `rgba(0,0,0,${sstep(4.6, 5.8, lu)})`; ctx.fillRect(0, 0, W, H);
  },

  // ------------------------------------------------------------- MECCA
  4(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.14, x0: 900, x1: 1020, y0: 560 });
    const P = env(ctx, c, { kind: 'dawn', t: T, sun: [1250, 500, 60], y: 600 });
    layer(ctx, c, 0.5, () => town(ctx, { y: 760, x0: -500, x1: 2600, col: '#4a2428', seed: 7, h0: 60, h1: 170, win: 1, winCol: '#ffcf80' }));
    layer(ctx, c, 0.7, () => { hazeBand(ctx, 760, 70, '#ffb878', 0.35); [330, 800, 1450].forEach((x, i) => { ctx.fillStyle = 'rgba(40,30,34,.35)'; ctx.fillRect(x, 520 - i * 20, 14, 240); }); });
    layer(ctx, c, 1.0, () => { ctx.fillStyle = P.fg; ctx.fillRect(-W, 900, W * 3, 400); crowd(ctx, T, { x0: 100, x1: 1900, y: 950, n: 6, s: 0.75, P, colors: null, walk: true, dirs: 0 }); });
    dust(ctx, T, { n: 80, a: 0.4, col: '#ffd6a0', sx: 30 }); A.vignette(ctx, 0.35);
    lowerThird(ctx, s, 'Mecca', '610 AD', 1);
  },
  5(ctx, s) {
    const { T, p } = s; const c = camAt(p, { z0: 1.05, z1: 1.0, x0: 760, x1: 1160, y0: 560 });
    const P = env(ctx, c, { kind: 'noon', t: T, sun: [1500, 220, 70], y: 560, rd: true });
    layer(ctx, c, 0.45, () => town(ctx, { y: 700, x0: -500, x1: 2700, col: '#a9643e', seed: 2, h0: 80, h1: 190 }));
    layer(ctx, c, 0.85, () => {
      ctx.fillStyle = '#c28350'; ctx.fillRect(-W, 800, W * 3, 600);
      const col = ['#b3402c', '#2f6a7a', '#c9962c', '#7a2c4a', '#3a7a4a'];
      for (let i = 0; i < 7; i++) { const x = 100 + i * 330; ctx.fillStyle = col[i % 5]; ctx.beginPath(); ctx.moveTo(x - 30, 760); ctx.lineTo(x + 250, 740); ctx.lineTo(x + 280, 800); ctx.lineTo(x - 50, 800); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#4a2c1c'; ctx.fillRect(x - 24, 800, 8, 130); ctx.fillRect(x + 258, 800, 8, 130); ctx.fillStyle = '#7a4a2c'; ctx.fillRect(x - 10, 880, 270, 50); [0, 1, 2, 3].forEach((j) => { ctx.fillStyle = col[(i + j) % 5]; ctx.beginPath(); ctx.arc(x + 30 + j * 62, 872, 16, Math.PI, 0); ctx.fill(); }); }
    });
    layer(ctx, c, 1.1, () => { crowd(ctx, T, { x0: 0, x1: 2300, y: 990, n: 12, s: 0.95, P, walk: true, dirs: 0, spread: 60 }); });
    dust(ctx, T, { n: 90, a: 0.35, col: '#fff0d0', sx: 40 }); A.vignette(ctx, 0.25);
  },
  6(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.08, x0: 960, y0: 540 });
    const P = env(ctx, c, { kind: 'noon', t: T, sun: [380, 200, 80], y: 600 });
    layer(ctx, c, 0.8, () => { terrain(ctx, { y: 800, amp: 30, freq: 0.005, seed: 21, col: '#b8683c', bot: '#7a3a22' }); });
    layer(ctx, c, 1.0, () => { [0, 1, 2].forEach((i) => { const x = ((T * 62 + i * 700) % 2900) - 500; camel(ctx, x, 920 + i * 30, 1.05 - i * 0.04, { t: T + i * 0.7, col: ['#6a4328', '#4a3020', '#7a5232'][i], loadCol: ['#a8322c', '#2f6a7a', '#c9962c'][i], rim: '#ffe0a0' }); shadowEllipse(ctx, x, 924 + i * 30, 180, 0.22); }); });
    dust(ctx, T, { n: 100, a: 0.5, col: '#ffe6b0', sx: 60, y0: 700 });
    const tag = (txt, sub, x, y, u0) => { const k = M.springU(lu, u0, M.SPRING.bouncy); if (k <= 0) return; ctx.save(); ctx.translate(x, y - (1 - k) * 30); ctx.globalAlpha = clamp(k); ctx.fillStyle = 'rgba(20,10,5,.7)'; ctx.beginPath(); ctx.roundRect(0, 0, 360, 92, 10); ctx.fill(); ctx.fillStyle = '#e9c070'; ctx.fillRect(0, 0, 5, 92); M.text(ctx, txt, 26, 42, M.font(34, 700, 'Display'), '#fff4dc'); M.text(ctx, sub, 26, 76, M.font(22, 500, 'UI'), '#e9c070', 'left', 4); ctx.restore(); };
    tag('Fine fabrics', 'FROM YEMEN', 140, 150, 2.6); tag('Rich oils', 'FROM THE LEVANT', 1420, 150, 4.6);
    A.vignette(ctx, 0.3);
  },
  7(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.2, x0: cx, y0: 560 });
    const P = env(ctx, c, { kind: 'dusk', t: T, sun: [260, 560, 70], y: 620 });
    layer(ctx, c, 0.9, () => {
      ctx.fillStyle = '#2a1214'; ctx.fillRect(-W, 700, W * 3, 800); ctx.fillStyle = 'rgba(255,170,100,.1)'; ctx.beginPath(); ctx.ellipse(cx, 860, 560, 130, 0, 0, TAU); ctx.fill();
      const ring = []; for (let i = 0; i < 26; i++) { const a = i / 26 * TAU - T * 0.28, x = cx + Math.cos(a) * 520, y = 860 + Math.sin(a) * 118; ring.push([y, x, a, i]); }
      const draw = (back) => ring.filter(([y]) => (y < 860) === back).forEach(([y, x, a, i]) => figure(ctx, x, y, 0.5 + (y - 740) / 700, { col: i % 4 === 0 ? '#e8e0d0' : '#cfc6b2', rim: '#ffb070', pose: 'walk', t: T + i, flip: -Math.sin(a) > 0 ? 1 : -1, hood: false }));
      draw(true); kaaba(ctx, cx, 820, 1.0, { glow: 0.4 }); draw(false);
    });
    dust(ctx, T, { n: 70, a: 0.4, col: '#ffcf90', sx: -20 }); A.vignette(ctx, 0.4);
  },
  8(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.35, x0: cx, y0: 640, y1: 520 });
    const P = env(ctx, c, { kind: 'dawn', t: T, sun: [cx + 90, 360, 54], y: 720 });
    layer(ctx, c, 0.9, () => { ctx.fillStyle = '#331a1c'; ctx.fillRect(-W, 880, W * 3, 600); kaaba(ctx, cx, 900, 1.7, { glow: 0.6, lit: 1 }); });
    layer(ctx, c, 1.0, () => rays(ctx, cx + 90, 360, Math.PI * 0.5, 1.4, 1100, '#ffd9a0', 0.12, T, 12));
    glow(ctx, cx + 300 * Math.sin(T * 0.3), 220, 300, '#fff0c8', 0.18 + 0.1 * Math.sin(T * 2));
    caption(ctx, 'ABRAHAM  ·  ISHMAEL', cx, 1000, 34, '#ffe8c0', { font: 'UI', w: 500, track: 12, a: sstep(2, 3, lu) });
    A.vignette(ctx, 0.45);
  },
  9(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.18, x0: 700, x1: 1220, y0: 540 }); const red = sstep(1, 4, lu);
    const P = env(ctx, c, { kind: 'dusk', t: T, sun: [1500, 520, 60], y: 610 });
    layer(ctx, c, 0.7, () => { ctx.fillStyle = '#2a1214'; ctx.fillRect(-W, 800, W * 3, 800); kaaba(ctx, 900, 790, 0.8, { lit: 0.3 }); });
    layer(ctx, c, 1.0, () => { for (let i = 0; i < 22; i++) { const x = -200 + i * 130 + hash01(i, 3) * 40, y = 930 + (i % 3) * 36; const k = clamp((lu * 5 - i) * 0.5); if (k > 0) idol(ctx, x, y + 40, (1.35 + (i % 3) * 0.2) * k, i % 4, '#6e5648', '#ffb070'); } });
    dust(ctx, T, { n: 60, a: 0.5, col: '#ff8a50', sx: 10, sy: -20 }); A.tint(ctx, '#ff3a20', 0.18 * red, 'overlay');
    A.vignette(ctx, 0.55); if (lu < 0.5) { ctx.save(); ctx.translate(noise1(T * 70, 1) * 6, 0); ctx.restore(); }
  },
  10(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.2, x0: cx, y0: 560 });
    A.sky(ctx, [[0, '#10080a'], [1, '#3a1410']]); glow(ctx, cx, 600, 800, '#ff5a24', 0.35 + 0.05 * Math.sin(T * 9));
    layer(ctx, c, 0.9, () => { ctx.fillStyle = '#1a0a0a'; ctx.fillRect(-W, 860, W * 3, 600); idol(ctx, cx - 460, 880, 1.9, 0, '#3c2a28'); idol(ctx, cx + 460, 880, 1.9, 1, '#3c2a28'); idol(ctx, cx, 860, 1.5, 2, '#2a1c1c');
      ctx.fillStyle = '#5a4640'; ctx.fillRect(cx - 190, 780, 380, 120); ctx.fillStyle = '#6a544a'; ctx.fillRect(cx - 210, 760, 420, 28); flame(ctx, cx, 760, 1.1, T); embers(ctx, T, cx, 740, { n: 40, up: 380 }); });
    const lab = (txt, x, u0) => { const k = sstep(u0, u0 + 0.6, lu); caption(ctx, txt, x, 270, 46, '#ffc89a', { a: k, track: 12 }); };
    lab('AL-LAT', cx - 460, 1.8); lab('AL-UZZA', cx + 460, 4.2);
    dust(ctx, T, { n: 60, a: 0.4, col: '#ff7a3a', sx: 6, sy: -30 }); A.vignette(ctx, 0.6);
  },
  11(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.12, z1: 1.0, x0: 760, x1: cx, y0: 540 });
    env(ctx, c, { kind: 'noon', t: T, sun: [1580, 200, 70], y: 600 });
    layer(ctx, c, 0.9, () => {
      ctx.fillStyle = '#b87a48'; ctx.fillRect(-W, 800, W * 3, 800); const tilt = Math.sin(clamp(lu / 3) * 1.4) * 0.07 + Math.sin(T * 2) * 0.004;
      ctx.fillStyle = '#4a2a1a'; ctx.fillRect(cx - 7, 380, 14, 440); ctx.fillRect(cx - 80, 810, 160, 22);
      ctx.save(); ctx.translate(cx, 392); ctx.rotate(-tilt); ctx.fillStyle = '#d9b050'; ctx.fillRect(-380, -6, 760, 12); A.disc(ctx, 0, 0, 16, '#e9c870');
      [-1, 1].forEach((sd) => { ctx.save(); ctx.translate(sd * 380, 0); ctx.rotate(tilt); ctx.strokeStyle = '#d9b050'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-70, 190); ctx.moveTo(0, 0); ctx.lineTo(70, 190); ctx.stroke(); ctx.fillStyle = '#d9b050'; ctx.beginPath(); ctx.ellipse(0, 192, 96, 20, 0, 0, TAU); ctx.fill(); if (sd < 0) { for (let i = 0; i < 5; i++) A.disc(ctx, -30 + i * 18, 178, 14, '#f4ead0'); } else { for (let i = 0; i < 2; i++) A.disc(ctx, -12 + i * 24, 178, 14, '#f4ead0'); } ctx.restore(); });
      ctx.restore();
      figure(ctx, cx + 540, 930, 1.3, { col: '#3a1f18', rim: '#ffe0a0', pose: 'hands', t: T, hood: true, trim: '#c9962c' });   // the merchant: thumb on the scale
    });
    dust(ctx, T, { n: 70, a: 0.35, col: '#fff0d0' }); A.vignette(ctx, 0.35);
  },
  12(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.2, x0: cx, y0: 480, y1: 640 });
    env(ctx, c, { kind: 'dusk', t: T, sun: [cx + 200, 600, 90], y: 640 });
    layer(ctx, c, 0.8, () => { terrain(ctx, { y: 760, amp: 40, freq: 0.004, seed: 31, col: '#4a1e22', bot: '#220c10' }); });
    layer(ctx, c, 1.0, () => { const x = 260 + p * 720; ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.ellipse(x + 220, 900, 260, 16, 0, 0, TAU); ctx.fill(); figure(ctx, x, 900, 1.0, { col: '#12070a', rim: '#ff9a50', pose: 'walk', t: T, flip: 1, lean: 0.4 }); });
    hazeBand(ctx, 700, 100, '#ff9250', 0.25); dust(ctx, T, { n: 50, a: 0.4, col: '#ffb070', sx: 20, y0: 600 }); A.vignette(ctx, 0.6);
  },
  13(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.1, x0: cx, y0: 560, y1: 500 });
    A.sky(ctx, [[0, '#1a1006'], [1, '#4a3010']]); glow(ctx, cx, 520, 900, '#ffc850', 0.4);
    layer(ctx, c, 0.9, () => { ctx.fillStyle = '#2a1a0a'; ctx.fillRect(-W, 900, W * 3, 400);
      for (let i = 0; i < 9; i++) { const k = clamp((lu * 4 - i) * 0.5); if (k > 0) for (let j = 0; j < 4; j++) A.disc(ctx, cx - 160 + i * 38 + (j % 2) * 8, 892 - j * 14 * k, 22, mixc('#e8b838', '#b8862a', (i + j) % 3 / 3)); }
      figure(ctx, cx - 420, 880, 0.55, { col: '#3a2a20', rim: '#ffd890', pose: 'stand', t: T }); figure(ctx, cx + 440, 880, 0.55, { col: '#3a2a20', rim: '#ffd890', pose: 'stand', t: T + 1 });
      ctx.fillStyle = '#3a2410'; ctx.fillRect(cx - 280, 780, 560, 120); ctx.fillStyle = '#c9962c'; ctx.fillRect(cx - 280, 774, 560, 10);
      figure(ctx, cx, 774, 1.5, { col: '#4a1a22', trim: '#e8b838', rim: '#ffe6a0', pose: 'stand', t: T }); });
    embers(ctx, T, cx, 760, { n: 50, col: '#ffd060', up: 300, r: 500 }); caption(ctx, 'WEALTH', cx, 130, 64, '#f0d890', { a: sstep(0.5, 1.5, lu), track: 20 }); A.vignette(ctx, 0.5);
  },
  14(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.16, x0: 860, y0: 520 });
    env(ctx, c, { kind: 'night', t: T, moon: [1400, 250, 56], y: 640, stars: 220 });
    layer(ctx, c, 0.55, () => town(ctx, { y: 790, x0: -500, x1: 2500, col: '#101a30', seed: 12, h0: 80, h1: 200, win: 1, winCol: '#ffcf70' }));
    layer(ctx, c, 1.0, () => { ctx.fillStyle = '#0a0f1e'; ctx.fillRect(-W, 900, W * 3, 500); ctx.fillStyle = '#121a30'; ctx.fillRect(500, 880, 920, 40); figure(ctx, 880, 880, 1.3, { col: '#05080f', rim: '#7e9be0', pose: 'sit', t: T, rimDx: -3 });
      [0.3, 0.55, 0.8].forEach((k, i) => { const x = 520 + i * 330; ctx.fillStyle = '#e8b070'; ctx.fillRect(x, 840, 4, 6); }); });
    caption(ctx, 'one man who cannot find peace', cx, 1000, 36, '#bcd0ff', { font: 'UI', w: 500, a: sstep(1.4, 2.6, lu) * 0.9, track: 5 }); A.vignette(ctx, 0.5);
  },
  15(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.2, x0: 300 + p * 900, y0: 760 });
    A.sky(ctx, [[0, '#d9b078'], [1, '#e8c898']]);
    layer(ctx, c, 0.5, () => { terrain(ctx, { y: 700, amp: 40, freq: 0.004, seed: 41, col: '#c28a54' }); });
    layer(ctx, c, 1.0, () => { terrain(ctx, { y: 780, amp: 16, freq: 0.01, seed: 42, col: '#d8a468', bot: '#b9824a' });
      for (let i = 0; i < 14; i++) { const x = 220 + i * 150, k = clamp((p * 22 - i) * 0.6); if (k > 0) { ctx.fillStyle = `rgba(110,70,40,${0.45 * k})`; ctx.beginPath(); ctx.ellipse(x, 900 + (i % 2) * 36, 30, 14, 0, 0, TAU); ctx.fill(); } }
      const x = 220 + clamp(p * 22 - 0.6, 0, 13) * 150; [0, 1].forEach((f) => { const y = 900 + f * 36; ctx.fillStyle = '#5a3a22'; ctx.beginPath(); ctx.ellipse(x + 40, y, 54, 20, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#7a5232'; ctx.beginPath(); ctx.ellipse(x + 40, y - 4, 48, 15, 0, 0, TAU); ctx.fill(); });
    });
    dust(ctx, T, { n: 70, a: 0.5, col: '#fff0d0', sx: 40, y0: 600 }); A.vignette(ctx, 0.3);
    lowerThird(ctx, s, 'An orphan since childhood', 'NEARLY FORTY YEARS OLD', 1.4);
  },
  16(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.12, x0: cx - 100, y0: 560 });
    const P = env(ctx, c, { kind: 'dawn', t: T, sun: [1500, 400, 76], y: 640 });
    layer(ctx, c, 1.0, () => { terrain(ctx, { y: 880, amp: 20, freq: 0.006, seed: 51, col: '#3a1a1c', bot: '#1c0a0c' }); const x = 360 + p * 360;
      shadowEllipse(ctx, x, 940, 200, 0.3); figure(ctx, x, 940, 1.5, { col: '#22100f', rim: '#ffc58a', pose: 'walk', t: T, trim: '#e8d6a0' });
      figure(ctx, x + 150, 940, 0.78, { col: '#2a1612', rim: '#ffc58a', pose: 'walk', t: T + 0.6, hood: false, trim: '#e8d6a0' });
      ctx.strokeStyle = '#22100f'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 40, 830); ctx.quadraticCurveTo(x + 100, 880, x + 142, 862); ctx.stroke(); });
    dust(ctx, T, { n: 60, a: 0.45, col: '#ffd6a0', sx: 24 }); A.vignette(ctx, 0.4);
  },
  17(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.14, x0: cx - 120, x1: cx + 80, y0: 560 });
    A.sky(ctx, [[0, '#2a1a0e'], [1, '#5a3a1c']]); glow(ctx, cx - 200, 420, 800, '#ffb050', 0.45);
    layer(ctx, c, 1.0, () => {
      ctx.fillStyle = '#3a2210'; ctx.fillRect(-W, 760, W * 3, 600);
      ctx.save(); ctx.translate(cx - 300, 780); ctx.fillStyle = '#e8d6a8'; ctx.beginPath(); ctx.moveTo(-340, -300); ctx.lineTo(0, -280); ctx.lineTo(0, 20); ctx.lineTo(-340, 0); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(340, -300); ctx.lineTo(0, -280); ctx.lineTo(0, 20); ctx.lineTo(340, 0); ctx.closePath(); ctx.fillStyle = '#efdfb6'; ctx.fill();
      for (let r = 0; r < 9; r++) { const k = clamp((lu * 3.2 - r) * 0.7); ctx.fillStyle = '#6a4a22'; ctx.fillRect(-300, -250 + r * 30, 230 * k, 8); ctx.fillStyle = '#9a6a22'; ctx.fillRect(40, -250 + r * 30, 80 * k + 120 * hash01(r, 1) * k, 8); ctx.fillRect(250, -250 + r * 30, 50 * k, 8); }
      ctx.restore();
      for (let i = 0; i < 12; i++) { const k = clamp((lu * 3 - i) * 0.6); if (k > 0) A.disc(ctx, cx + 220 + (i % 4) * 44, 760 - Math.floor(i / 4) * 16 * k, 20, mixc('#e8b838', '#9a7a22', (i % 3) / 3)); }
      figure(ctx, cx + 600, 900, 1.45, { col: '#0f2a2e', trim: '#e8b838', rim: '#ffd890', pose: 'stand', t: T });
    });
    dust(ctx, T, { n: 50, a: 0.4, col: '#ffd090', sx: 8 }); A.vignette(ctx, 0.5);
    lowerThird(ctx, s, 'Khadijah', 'WEALTHY · RESPECTED · HIS WIFE', 2.4);
  },
  18(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.15, x0: cx, y0: 560 });
    const P = env(ctx, c, { kind: 'noon', t: T, sun: [cx, 180, 70], y: 540 });
    layer(ctx, c, 0.55, () => { town(ctx, { y: 740, x0: -400, x1: 2400, col: '#b8714a', seed: 15, h0: 140, h1: 260 }); });
    layer(ctx, c, 1.0, () => {
      ctx.fillStyle = '#c99060'; ctx.fillRect(-W, 820, W * 3, 600); glow(ctx, cx, 800, 520, '#fff0c0', 0.35 + 0.1 * Math.sin(T * 2));
      [-1, 1].forEach((sd) => { for (let i = 0; i < 4; i++) { const x = cx + sd * (360 + i * 170), bow = M.springU(lu, 1.2 + i * 0.45, M.SPRING.gentle); figure(ctx, x, 940 + (i % 2) * 24, 1.2 - i * 0.07, { col: CROWD[(i + (sd > 0 ? 3 : 0)) % 8], rim: '#fff0c8', pose: 'stand', t: T + i, flip: -sd, lean: 0.35 * bow, hood: i % 2 === 0 }); } });
      figure(ctx, cx, 980, 1.55, { col: '#e8e0d0', rim: '#fff4d0', pose: 'walk', t: T * 0.6, trim: '#c9962c' });
    });
    A.vignette(ctx, 0.3); dust(ctx, T, { n: 60, a: 0.4 });
  },
};
