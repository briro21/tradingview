// Lines 19-43: Al-Amin, the search for meaning, Cave Hira, Khadijah's quiet loyalty.
import * as M from './lib/motion.js';
import * as A from './lib/art.js';
import { env, ground, crowd, KIND, CROWD } from './sets.js';
import { SC1, caveFrame, lowerThird } from './scenes1.js';
const { W, H, layer, camAt, glow, rgba, mixc, lerp, clamp, hash01, noise1, sstep, ease, caption, words, figure, kaaba, idol, town, terrain, ridge, dust, rays, flame, embers, shadowEllipse, hazeBand, TAU } = A;
const cx = W / 2;
// run an earlier scene as one cut of a multi-cut line
const sub = (ctx, s, key, i, n, extra = {}) => { const k = s.lu / s.nb * n - i; const lp = clamp(k); SC1[key]?.(ctx, { ...s, p: lp, lu: lp * 6, nb: 99, T: s.T + i * 3.1, ...extra }); };
const SCx = {};
export const SC2 = {
  19(ctx, s) {
    const { T, lu } = s; A.sky(ctx, [[0, '#1a1006'], [1, '#4a3010']]); glow(ctx, cx, 520, 900, '#ffc850', 0.5);
    ctx.save(); ctx.translate(cx, 540); ctx.rotate(T * 0.04); A.rays(ctx, 0, 0, 0, 6, 1500, '#ffd890', 0.07, T, 16); ctx.restore();
    const k = M.springU(lu, 0.1, M.SPRING.bouncy); ctx.save(); ctx.translate(cx, 510); ctx.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k);
    A.arabic(ctx, 'الأمين', 0, 40, 330, '#ffe3a0', clamp(k), '#ffb347'); ctx.restore();
    words(ctx, lu, 1.1, 'THE TRUSTWORTHY', cx, 740, 84, '#fff4dc', { stag: 0.3, track: 14 });
    const a = sstep(1.8, 2.6, lu); ctx.fillStyle = `rgba(240,200,110,${a})`; ctx.fillRect(cx - 220 * a, 780, 440 * a, 3);
    A.dust(ctx, T, { n: 70, col: '#ffd890', a: 0.6, sx: 5, sy: -14 }); A.vignette(ctx, 0.5);
  },
  20(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.25, x0: 1200, x1: 1330, y0: 700, y1: 520 });
    const P = env(ctx, c, { kind: 'dawn', t: T, sun: [500, 480, 60], y: 700, jag: true });
    layer(ctx, c, 0.8, () => { ridge(ctx, { y: 900, amp: 210, freq: 0.0024, seed: 61, col: '#2a1418', bot: '#12070a', x0: 500, x1: 2400 }); });
    layer(ctx, c, 0.9, () => figure(ctx, 1480, 780 - p * 0, 0.3, { col: '#0c0508', rim: '#ffc58a', pose: 'stand', t: T }));
    words(ctx, lu, 0.6, 'MUHAMMAD', 600, 820, 96, '#fff2d8', { stag: 0, track: 12 });
    caption(ctx, 'SON OF ABDULLAH', 600, 880, 34, '#ffc58a', { font: 'UI', w: 500, track: 14, a: sstep(1.4, 2.2, lu) });
    A.dust(ctx, T, { n: 50 }); A.vignette(ctx, 0.5);
  },
  21(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.12, x0: cx, y0: 560 });
    A.sky(ctx, [[0, '#12080a'], [1, '#3a1812']]); glow(ctx, cx + 200, 520, 800, '#ff7a30', 0.35);
    layer(ctx, c, 0.9, () => { ctx.fillStyle = '#1e0e0c'; ctx.fillRect(-W, 860, W * 3, 600); idol(ctx, cx + 420, 900, 2.0, 2, '#4a362e', '#ffb070');
      ctx.fillStyle = '#5a4034'; ctx.fillRect(cx + 120, 790, 360, 120); ctx.fillStyle = '#7a5a48'; ctx.fillRect(cx + 100, 770, 400, 26);
      ctx.fillStyle = '#c9bca0'; ctx.beginPath(); ctx.ellipse(cx + 300, 770, 90, 20, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#7a1c1c'; ctx.beginPath(); ctx.ellipse(cx + 300, 766, 70, 12, 0, 0, TAU); ctx.fill();
      for (let i = 0; i < 6; i++) { const ph = (T * 0.4 + i / 6) % 1; ctx.fillStyle = `rgba(255,255,255,${0.18 * (1 - ph)})`; ctx.beginPath(); ctx.arc(cx + 260 + i * 16 + Math.sin(ph * 6 + i) * 10, 750 - ph * 130, 12 + ph * 16, 0, TAU); ctx.fill(); }
      const k = M.springU(lu, 1.6, M.SPRING.gentle); figure(ctx, cx - 340 + k * -60, 930, 1.5, { col: '#3a2a20', rim: '#ffb070', pose: 'stand', t: T, flip: -1, lean: -0.3 * k, hands: [[26, -146, 120, -170]] }); });
    A.dust(ctx, T, { n: 60, a: 0.4, col: '#ff9a50', sy: -20 }); A.vignette(ctx, 0.55);
    const x = sstep(2.0, 2.4, lu) * (1 - sstep(3.4, 4.0, lu)); caption(ctx, 'REFUSES', cx - 320, 300, 70, '#ffe0c0', { a: x, track: 18 });
  },
  22(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.1, x0: cx, y0: 800, y1: 420 });
    env(ctx, c, { kind: 'night', t: T, milky: true, y: 780 });
    layer(ctx, c, 0.9, () => { terrain(ctx, { y: 900, amp: 30, freq: 0.005, seed: 71, col: '#05080f', bot: '#02040a' }); figure(ctx, 560, 910, 0.8, { col: '#020307', rim: '#6c8cd8', pose: 'stand', t: T, lean: -0.1, rimDx: -2 }); });
    caption(ctx, 'but what should he worship?', cx, 980, 40, '#bcd0ff', { font: 'UI', w: 500, track: 6, a: sstep(0.8, 1.8, lu) * 0.9 }); A.vignette(ctx, 0.4);
  },
  23(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.4, x0: 700, y0: 540, y1: 380 });
    env(ctx, c, { kind: 'night', t: T, milky: true, y: 820 });
    layer(ctx, c, 0.9, () => { terrain(ctx, { y: 920, amp: 30, freq: 0.005, seed: 71, col: '#05080f', bot: '#02040a' }); figure(ctx, 560, 930, 1.0, { col: '#020307', rim: '#6c8cd8', pose: 'sit', t: T, rimDx: -2 }); });
    const k = sstep(1.4, 4.4, lu); layer(ctx, c, 0.4, () => { ctx.save(); ctx.translate(1100, 300); ctx.globalAlpha = 0.18 * k; ctx.font = `700 420px ${A.DISPLAY}`; ctx.textAlign = 'center'; ctx.fillStyle = '#bcd0ff'; ctx.fillText('?', 0, 160); ctx.restore(); });
    A.vignette(ctx, 0.5);
  },
  24(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.35, x0: cx, y0: 520 });
    const P = env(ctx, c, { kind: 'dawn', t: T, sun: [cx, 540, 70], y: 640 });
    layer(ctx, c, 0.95, () => { ctx.fillStyle = '#1a0e10'; ctx.fillRect(-W, 920, W * 3, 600); ctx.fillStyle = '#2a1618'; ctx.beginPath(); ctx.rect(-W, 80, W * 3, 900); ctx.moveTo(cx - 250, 920); ctx.lineTo(cx - 250, 440); ctx.arc(cx, 440, 250, Math.PI, 0); ctx.lineTo(cx + 250, 920); ctx.closePath(); ctx.fill('evenodd');
      ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(cx - 290, 80, 40, 840); ctx.fillRect(cx + 250, 80, 40, 840); });
    layer(ctx, c, 0.9, () => { const x = cx + 30 - p * 20; figure(ctx, x, 930 - p * 40, 0.85 - p * 0.35, { col: '#050204', rim: '#ffc58a', pose: 'walk', t: T, flip: 1 }); glow(ctx, cx, 760, 400, '#ffd9a0', 0.4); });
    rays(ctx, cx, 540, Math.PI * 0.5, 0.6, 700, '#ffd9a0', 0.1, T, 7); A.dust(ctx, T, { n: 50 }); A.vignette(ctx, 0.6);
  },
  25(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.2, x0: 760, x1: 1180, y0: 780, y1: 440 });
    const P = env(ctx, c, { kind: 'dawn', t: T, sun: [1500, 380, 60], y: 600, jag: true });
    layer(ctx, c, 0.8, () => { ridge(ctx, { y: 700, amp: 240, freq: 0.0021, seed: 91, col: '#2e1a1e', bot: '#150a0d', x0: -200, x1: 2600, rough: 70 }); });
    layer(ctx, c, 1.0, () => { const px = 360 + p * 1000, py = 980 - p * 420; ctx.strokeStyle = 'rgba(255,220,170,.22)'; ctx.setLineDash([14, 14]); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(300, 1000); ctx.quadraticCurveTo(900, 900, 1500, 520); ctx.stroke(); ctx.setLineDash([]);
      figure(ctx, px, py + 0, 0.55, { col: '#0a0508', rim: '#ffc58a', pose: 'walk', t: T, lean: 0.45 }); });
    A.dust(ctx, T, { n: 60, col: '#ffc89a', a: 0.4, sy: -30 }); A.vignette(ctx, 0.5);
    lowerThird(ctx, s, 'Jabal Nur', 'NORTHEAST OF MECCA', 3.2);
  },
  26(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.05, z1: 1.0, x0: 700, x1: 1100, y0: 560 });
    A.sky(ctx, [[0, '#14182e'], [0.6, '#3a4468'], [1, '#c8a090']]);
    layer(ctx, c, 0.2, () => ridge(ctx, { y: 620, amp: 90, freq: 0.003, seed: 5, col: '#4a4a6a' }));
    hazeBand(ctx, 700, 120, '#ffe0c8', 0.5); layer(ctx, c, 0.5, () => terrain(ctx, { y: 760, amp: 60, freq: 0.0035, seed: 8, col: '#34304a' }));
    hazeBand(ctx, 820, 120, '#ffe0c8', 0.4);
    layer(ctx, c, 1.0, () => { terrain(ctx, { y: 900, amp: 24, freq: 0.006, seed: 9, col: '#1e1a30', bot: '#0e0c1a' }); figure(ctx, 760, 960, 1.15, { col: '#0a0810', rim: '#a8b8f0', pose: 'lie', t: T, rimDx: -2 });
      for (let i = 0; i < 10; i++) { const ph = (T * 0.25 + i * 0.1) % 1; ctx.fillStyle = `rgba(200,215,255,${0.35 * Math.sin(ph * Math.PI)})`; ctx.beginPath(); ctx.arc(700 + Math.sin(ph * 5 + i) * 60 + ph * 120, 830 - ph * 360, 10 + ph * 26, 0, TAU); ctx.fill(); } });
    A.dust(ctx, T, { n: 40, col: '#e8e0ff', a: 0.4, sx: 10 }); A.vignette(ctx, 0.5);
    lowerThird(ctx, s, 'Aisha recounts', 'IT BEGAN WITH DREAMS', 1.8);
  },
  27(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.28, x0: cx, y0: 560 });
    A.sky(ctx, [[0, '#2a2a56'], [0.55, '#d0705a'], [1, '#ffd8a0']]);
    layer(ctx, c, 0.1, () => { ctx.save(); ctx.translate(cx, 700); ctx.rotate(T * 0.05); rays(ctx, 0, 0, 0, 6, 2200, '#fff0c8', 0.14, T, 22); ctx.restore(); glow(ctx, cx, 700, 900, '#ffe6b0', 0.8); A.disc(ctx, cx, 700, 90 + lu * 3, '#fffbe8'); });
    layer(ctx, c, 0.5, () => ridge(ctx, { y: 740, amp: 70, freq: 0.0035, seed: 5, col: '#5a3040' })); layer(ctx, c, 0.9, () => terrain(ctx, { y: 850, amp: 40, freq: 0.0045, seed: 7, col: '#2a1424', bot: '#120812' }));
    A.dust(ctx, T, { n: 70, col: '#fff0d0', a: 0.6, sy: -18 }); A.vignette(ctx, 0.35);
    caption(ctx, 'clear as the breaking dawn', cx, 1000, 42, '#fff4dc', { font: 'UI', w: 500, track: 6, a: sstep(1.0, 2.2, lu) });
  },
  28(ctx, s) {
    const { T, p, lu } = s; const d = clamp(lu / 5, 0, 1) * 0 + 0.5; const div = cx;
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, div, H); ctx.clip();
    A.sky(ctx, [[0, '#0a1030'], [1, '#2a3a78']]); A.stars(ctx, T, { n: 100, y1: 600 }); ctx.fillStyle = '#080c1c'; ctx.fillRect(0, 780, div, 400);
    figure(ctx, 400, 860, 1.0, { col: '#04060e', rim: '#8fa8f0', pose: 'lie', t: T }); glow(ctx, 520, 460, 340, '#8fa8ff', 0.3 + 0.1 * Math.sin(T * 2));
    ctx.fillStyle = 'rgba(190,210,255,.18)'; ctx.beginPath(); ctx.arc(560, 440, 190 + Math.sin(T * 2) * 6, 0, TAU); ctx.fill(); A.disc(ctx, 560, 440, 54, '#fff4d0'); ctx.fillStyle = '#3a2a4a'; ctx.beginPath(); ctx.moveTo(470, 520); ctx.lineTo(560, 400); ctx.lineTo(650, 520); ctx.fill();
    caption(ctx, 'THE DREAM', 480, 150, 50, '#bcd0ff', { track: 16 }); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(div, 0, W - div, H); ctx.clip();
    A.sky(ctx, [[0, '#7a9ad0'], [1, '#ffe0b0']]); ctx.fillStyle = '#c8a070'; ctx.fillRect(div, 780, W, 400); A.sun(ctx, 1380, 440, 54);
    ctx.fillStyle = '#7a4a40'; ctx.beginPath(); ctx.moveTo(1290, 780); ctx.lineTo(1380, 400); ctx.lineTo(1470, 780); ctx.fill(); figure(ctx, 1560, 860, 1.0, { col: '#3a2418', rim: '#fff0c0', pose: 'stand', t: T });
    caption(ctx, 'REAL LIFE', 1440, 150, 50, '#5a3a22', { track: 16, sh: false }); ctx.restore();
    ctx.fillStyle = '#fff4d0'; ctx.fillRect(div - 2, 0, 4, H); glow(ctx, div, H / 2, 300, '#fff0c0', 0.25);
    ctx.fillStyle = `rgba(0,0,0,${1 - sstep(0, 0.5, lu)})`; ctx.fillRect(0, 0, W, H);
  },
  29(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.25, x0: 1100, y0: 600, y1: 560 });
    const P = env(ctx, c, { kind: 'dusk', t: T, sun: [500, 440, 66], y: 660, jag: true });
    layer(ctx, c, 0.45, () => ridge(ctx, { y: 800, amp: 200, freq: 0.002, seed: 33, col: '#4a1e28' }));
    layer(ctx, c, 0.8, () => { ridge(ctx, { y: 960, amp: 150, freq: 0.0026, seed: 35, col: '#2a0e18', bot: '#12060c', rough: 60 }); });
    layer(ctx, c, 0.85, () => figure(ctx, 1400 + p * 120, 880, 0.22, { col: '#050204', rim: '#ff9a50', pose: 'walk', t: T }));
    A.dust(ctx, T, { n: 40, col: '#ffb070', a: 0.35 }); A.vignette(ctx, 0.5);
  },
  30(ctx, s) {
    const { T, p, lu } = s; const z = 1 + p * 0.9; const c = { x: 1320, y: 520, z };
    A.sky(ctx, [[0, '#0a0608'], [1, '#2a1a1c']]);
    layer(ctx, c, 1.0, () => { ridge(ctx, { y: 330, amp: 120, freq: 0.003, seed: 12, col: '#3a2224', x0: 0, x1: 2800, rough: 40 }); ctx.fillStyle = '#4a2e2c'; ctx.beginPath(); ctx.moveTo(500, 1200); ctx.lineTo(600, 330); ctx.lineTo(2400, 300); ctx.lineTo(2500, 1200); ctx.fill();
      for (let i = 0; i < 18; i++) { ctx.fillStyle = `rgba(0,0,0,${0.1 + hash01(i, 4) * 0.2})`; ctx.beginPath(); ctx.moveTo(700 + i * 100, 330); ctx.lineTo(680 + i * 100 + hash01(i, 5) * 120, 1100); ctx.lineTo(740 + i * 100, 1100); ctx.fill(); }
      ctx.fillStyle = '#020102'; ctx.beginPath(); ctx.moveTo(1290, 760); ctx.lineTo(1330, 520); ctx.lineTo(1352, 520); ctx.lineTo(1400, 760); ctx.closePath(); ctx.fill(); glow(ctx, 1340, 600, 160, '#3a2a40', 0.3); });
    A.dust(ctx, T, { n: 40, col: '#d8c0a0', a: 0.3 }); A.vignette(ctx, 0.55); lowerThird(ctx, s, 'Cave Hira', 'A TINY CAVE NEAR THE PEAK', 1.0);
  },
  31(ctx, s) {
    const { T, p, lu } = s; A.sky(ctx, [[0, '#050304'], [1, '#150b0a']]);
    const c = camAt(p, { z0: 1.05, z1: 1.0, x0: cx, y0: 540 });
    layer(ctx, c, 1.0, () => { ctx.fillStyle = '#2a1816'; ctx.beginPath(); ctx.moveTo(-200, 900); ctx.lineTo(-200, 100); ctx.lineTo(2200, 100); ctx.lineTo(2200, 900); ctx.lineTo(1500, 880); ctx.quadraticCurveTo(1400, 560, 1060, 520); ctx.quadraticCurveTo(700, 500, 500, 640); ctx.quadraticCurveTo(380, 760, 360, 880); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#0a0606'; ctx.fillRect(-200, 880, 2400, 400); glow(ctx, 1000, 760, 500, '#ffa850', 0.18);
      figure(ctx, 980, 884, 1.3, { col: '#120a08', rim: '#ffb870', pose: 'sit', t: T, rimDx: 3 });
      const k = sstep(1.0, 2.2, lu); ctx.strokeStyle = `rgba(255,220,160,${0.7 * k})`; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(340, 940); ctx.lineTo(1520, 940); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = `rgba(255,220,160,${k})`; ctx.fillRect(334, 928, 4, 24); ctx.fillRect(1516, 928, 4, 24); });
    caption(ctx, 'barely big enough to sit or lie down', cx, 1020, 36, '#ffd8a0', { font: 'UI', w: 500, track: 5, a: sstep(1.2, 2.2, lu) }); A.dust(ctx, T, { n: 30, a: 0.3 }); A.vignette(ctx, 0.55);
  },
  32(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.1, x0: 760, x1: 1160, y0: 540 });
    A.sky(ctx, [[0, '#6a78a8'], [0.6, '#f0b890'], [1, '#ffe0b8']]);
    layer(ctx, c, 0.3, () => ridge(ctx, { y: 700, amp: 80, freq: 0.003, seed: 5, col: '#9a7a8a' })); hazeBand(ctx, 760, 100, '#ffe8d0', 0.5);
    layer(ctx, c, 0.45, () => { town(ctx, { y: 840, x0: 800, x1: 1500, col: '#8a5a50', seed: 3, h0: 14, h1: 40, gap: 3 }); });
    layer(ctx, c, 0.55, () => terrain(ctx, { y: 880, amp: 30, freq: 0.004, seed: 4, col: '#6a4048', bot: '#3a2430' }));
    layer(ctx, c, 1.2, () => { ctx.fillStyle = '#080506'; ctx.beginPath(); ctx.moveTo(-300, 1200); ctx.lineTo(-300, -200); ctx.lineTo(500, -200); ctx.quadraticCurveTo(600, 400, 360, 700); ctx.quadraticCurveTo(300, 900, 520, 1200); ctx.fill(); ctx.beginPath(); ctx.moveTo(2400, 1200); ctx.lineTo(2400, -200); ctx.lineTo(1500, -200); ctx.quadraticCurveTo(1300, 300, 1560, 600); ctx.quadraticCurveTo(1740, 900, 1500, 1200); ctx.fill();
      ctx.fillRect(-300, 960, 2800, 400); figure(ctx, 1080, 975, 0.9, { col: '#040203', rim: '#ffd8a0', pose: 'sit', t: T }); });
    A.dust(ctx, T, { n: 40, col: '#fff0d0', a: 0.4 }); A.vignette(ctx, 0.4);
    caption(ctx, 'MECCA', 1150, 790, 30, '#fff4dc', { font: 'UI', w: 500, track: 14, a: sstep(2.2, 3.2, lu) * 0.9 });
  },
  33(ctx, s) {
    const { T, p, lu, vo } = s; const c = camAt(p, { z0: 1.0, z1: 1.2, x0: cx, y0: 520 });
    A.sky(ctx, [[0, '#02040f'], [1, '#0b1630']]); layer(ctx, c, 0.05, () => { A.stars(ctx, T, { n: 150, y1: 700 }); A.moon(ctx, 1460, 260, 62); });
    layer(ctx, c, 0.3, () => terrain(ctx, { y: 700, amp: 80, freq: 0.0035, seed: 5, col: '#0a1228' }));
    layer(ctx, c, 0.95, () => { ctx.fillStyle = '#03040a'; ctx.fillRect(-W, 840, W * 3, 600); const sw = Math.sin(T * 0.9) * 0.05; ctx.save(); ctx.translate(cx - 120, 842); ctx.rotate(sw); ctx.translate(-(cx - 120), -842); figure(ctx, cx - 120, 842, 1.5, { col: '#05070f', rim: '#7e9be0', pose: 'sit', t: T, rimDx: 3 }); ctx.restore(); });
    layer(ctx, c, 1.15, () => caveFrame(ctx, { x: cx, y: 480, w: 1500, h: 860, col: '#020206', rim: '#16203a' }));
    glow(ctx, cx - 100, 700, 420, '#7e9be0', 0.12); A.vignette(ctx, 0.5);
    const k = sstep(2.0, 2.8, lu); caption(ctx, 'TAHANNUTH', 420, 300, 54, '#d8e4ff', { a: k, track: 20, align: 'left' }); caption(ctx, 'deep reflection and worship', 424, 350, 28, '#9db6ff', { a: sstep(2.6, 3.4, lu), font: 'UI', w: 500, track: 6, align: 'left' });
  },
  34(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.18, x0: cx, y0: 620 });
    A.sky(ctx, [[0, '#0a0605'], [1, '#2a1810']]); glow(ctx, cx, 620, 900, '#ffa040', 0.35 + 0.04 * Math.sin(T * 8));
    layer(ctx, c, 1.0, () => { ctx.fillStyle = '#3a2418'; ctx.fillRect(-W, 760, W * 3, 600); ctx.fillStyle = '#4a2e20'; ctx.fillRect(-W, 750, W * 3, 18);
      ctx.fillStyle = '#7a4a2a'; ctx.beginPath(); ctx.moveTo(cx - 520, 760); ctx.quadraticCurveTo(cx - 640, 560, cx - 470, 480); ctx.quadraticCurveTo(cx - 330, 440, cx - 260, 560); ctx.quadraticCurveTo(cx - 200, 700, cx - 250, 760); ctx.fill(); ctx.fillStyle = '#5a3418'; ctx.fillRect(cx - 520, 470, 40, 30);   // waterskin
      ctx.fillStyle = 'rgba(255,200,140,.18)'; ctx.beginPath(); ctx.ellipse(cx - 440, 560, 40, 90, -0.3, 0, TAU); ctx.fill();
      ctx.fillStyle = '#5a3a28'; ctx.beginPath(); ctx.ellipse(cx + 180, 760, 260, 46, 0, 0, TAU); ctx.fill(); for (let i = 0; i < 26; i++) { const x = cx + 180 + (hash01(i, 2) - 0.5) * 380, y = 700 - hash01(i, 3) * 60 * (1 - Math.abs(x - cx - 180) / 200); ctx.fillStyle = mixc('#4a2410', '#8a5028', hash01(i, 4)); ctx.beginPath(); ctx.ellipse(x, y + 30, 26, 14, hash01(i, 5) - 0.5, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(255,230,180,.25)'; ctx.fillRect(x - 6, y + 22, 8, 3); } });
    embers(ctx, T, cx, 600, { n: 20, up: 200, r: 800 }); A.vignette(ctx, 0.55);
    caption(ctx, 'Water.  Dates.', cx, 140, 70, '#ffe2b8', { a: sstep(0.6, 1.2, lu), track: 10 });
  },
  35(ctx, s) {
    const n = 4, i = Math.min(n - 1, Math.floor(s.lu / s.nb * n)); const keys = ['15', '42', '24', '25'];
    const f = SC2[keys[i]] || SC1[keys[i]]; const k = s.lu / s.nb * n - i;
    f(ctx, { ...s, p: clamp(k), lu: clamp(k) * 5, nb: 99, T: s.T + i * 2 });
    ctx.fillStyle = `rgba(255,240,210,${0.3 * Math.max(0, 1 - k * 6)})`; ctx.fillRect(0, 0, W, H);
    caption(ctx, ['DOWN', 'SUPPLIES', 'HOME', 'BACK UP'][i], cx, 150, 56, '#fff4dc', { track: 22, a: 0.9 });
  },
  36(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.1, x0: cx, y0: 540 });
    A.sky(ctx, [[0, '#0a0a20'], [1, '#22204a']]); layer(ctx, c, 0.2, () => ridge(ctx, { y: 760, amp: 160, freq: 0.0028, seed: 4, col: '#0c0a1c' }));
    A.stars(ctx, T, { n: 100, y1: 500 });
    ctx.save(); ctx.translate(cx, 500); ctx.fillStyle = 'rgba(10,8,30,.78)'; ctx.beginPath(); ctx.roundRect(-520, -230, 1040, 520, 20); ctx.fill(); ctx.strokeStyle = 'rgba(240,200,110,.5)'; ctx.lineWidth = 2; ctx.stroke();
    const months = ['MUHARRAM', 'SAFAR', 'RABI I', 'RABI II', 'JUMADA I', 'JUMADA II', 'RAJAB', 'SHA’BAN', 'RAMADAN', 'SHAWWAL', 'DHU QI’DAH', 'DHU AL-HIJJAH'];
    months.forEach((m, i) => { const x = -420 + (i % 4) * 280, y = -150 + Math.floor(i / 4) * 150, hi = i === 8, k = hi ? sstep(1.4, 2.2, lu) : 0;
      ctx.fillStyle = hi ? `rgba(240,190,90,${0.15 + 0.5 * k})` : 'rgba(255,255,255,.05)'; ctx.beginPath(); ctx.roundRect(x - 110, y - 50, 260, 100, 10); ctx.fill();
      M.text(ctx, m, x + 20, y + 10, M.font(hi ? 30 : 24, hi ? 700 : 500, 'UI'), hi ? '#fff2cc' : 'rgba(255,255,255,.5)', 'center', 2); });
    ctx.restore();
    caption(ctx, 'AN ENTIRE MONTH EVERY YEAR', cx, 920, 40, '#ffe2b8', { font: 'UI', w: 500, track: 12, a: sstep(0.6, 1.6, lu) }); A.vignette(ctx, 0.5);
  },
  37(ctx, s) {
    const { T, p, lu } = s; const sw = sstep(s.nb * 0.55, s.nb * 0.8, lu);
    A.sky(ctx, [[0, '#0e0a08'], [1, '#2a1c10']]); glow(ctx, cx, 600, 800, '#ffb050', 0.3);
    ctx.save(); ctx.globalAlpha = 1 - sw; ctx.translate(cx, 640); ctx.fillStyle = '#e8d6a8'; ctx.beginPath(); ctx.roundRect(-460, -160, 920, 340, 8); ctx.fill();
    const px = -300 + clamp(lu / 4) * 140, py = -120 + Math.sin(T * 1.3) * 10; ctx.fillStyle = '#4a2a14'; ctx.save(); ctx.translate(px, py); ctx.rotate(-0.8); ctx.fillRect(-6, -240, 12, 240); ctx.beginPath(); ctx.moveTo(-6, 0); ctx.lineTo(6, 0); ctx.lineTo(0, 30); ctx.fill(); ctx.restore();
    ctx.fillStyle = '#1a1006'; ctx.beginPath(); ctx.arc(px, py + 30, 5 + Math.sin(T * 3) * 1, 0, TAU); ctx.fill(); caption(ctx, '?', 140, 120, 220, 'rgba(60,40,20,.2)', { sh: false }); ctx.restore();
    ctx.save(); ctx.globalAlpha = sw; env(ctx, { x: cx, y: 540, z: 1 }, { kind: 'night', t: T, milky: true, y: 820 }); ctx.restore();
    caption(ctx, 'The records don’t say.', cx, 980, 46, '#ffe8c0', { a: sstep(1.4, 2.4, lu) * (1 - sw), font: 'UI', w: 500, track: 6 }); A.vignette(ctx, 0.5);
  },
  38(ctx, s) {
    const { T, p, lu } = s; A.sky(ctx, [[0, '#010203'], [1, '#050a14']]);
    const c = camAt(p, { z0: 1.0, z1: 1.18, x0: cx, y0: 560 });
    layer(ctx, c, 0.9, () => { for (let i = 0; i < 5; i++) { const ph = (T * 0.22 + i / 5) % 1; ctx.strokeStyle = `rgba(140,170,240,${0.16 * (1 - ph)})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, 820, 80 + ph * 760, 0, TAU); ctx.stroke(); }
      figure(ctx, cx, 900, 1.5, { col: '#030509', rim: '#5a78c0', pose: 'sit', t: T, rimDx: 3 }); });
    A.vignette(ctx, 0.7); caption(ctx, 'deafening silence', cx, 150, 44, '#6f88c8', { font: 'UI', w: 500, track: 20, a: sstep(0.6, 1.8, lu) * 0.8 });
  },
  39(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.1, x0: cx, y0: 860, y1: 300 });
    env(ctx, c, { kind: 'night', t: T, milky: true, y: 900 });
    layer(ctx, c, 0.9, () => { terrain(ctx, { y: 980, amp: 20, freq: 0.005, seed: 8, col: '#05080f', bot: '#02040a' }); figure(ctx, 1500, 1000, 0.6, { col: '#020307', rim: '#6c8cd8', pose: 'sit', t: T }); });
    ['THE SKY', 'THE EARTH', 'HIS OWN EXISTENCE'].forEach((w, i) => { const a = sstep(0.8 + i * 1.5, 1.6 + i * 1.5, lu) * (i < 2 ? 1 - sstep(1.9 + i * 1.5, 2.25 + i * 1.5, lu) : 1); caption(ctx, w, cx, 520, 70, '#e8efff', { a, track: 18 }); });
    A.vignette(ctx, 0.45);
  },
  40(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.16, x0: cx, y0: 540 });
    A.sky(ctx, [[0, '#2a1808'], [1, '#7a4a20']]); glow(ctx, cx, 520, 900, '#ffd890', 0.55);
    layer(ctx, c, 0.8, () => { ctx.fillStyle = '#4a2c14'; ctx.fillRect(-W, 880, W * 3, 400); ctx.fillStyle = '#d8a860'; ctx.beginPath(); ctx.moveTo(cx - 280, 880); ctx.lineTo(cx - 280, 380); ctx.arc(cx, 380, 280, Math.PI, 0); ctx.lineTo(cx + 280, 880); ctx.fill(); ctx.fillStyle = '#fff0c0'; ctx.beginPath(); ctx.moveTo(cx - 220, 880); ctx.lineTo(cx - 220, 390); ctx.arc(cx, 390, 220, Math.PI, 0); ctx.lineTo(cx + 220, 880); ctx.fill(); });
    layer(ctx, c, 1.0, () => { figure(ctx, cx, 960, 1.7, { col: '#3a1626', rim: '#fff4d0', pose: 'stand', t: T, trim: '#e8b838' }); });
    rays(ctx, cx, 420, Math.PI * 0.5, 1.4, 900, '#fff0c0', 0.09, T, 10); A.dust(ctx, T, { n: 60, col: '#fff0c8', a: 0.5, sy: -10 }); A.vignette(ctx, 0.4);
    lowerThird(ctx, s, 'Khadijah', 'PAY ATTENTION TO HER', 1.4);
  },
  41(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.2, x0: cx - 100, y0: 560 });
    A.sky(ctx, [[0, '#1a0e08'], [1, '#3a2010']]); glow(ctx, cx - 200, 560, 800, '#ffc070', 0.45);
    layer(ctx, c, 0.8, () => { ctx.fillStyle = '#5a3420'; ctx.fillRect(-W, 860, W * 3, 400); ctx.fillStyle = '#c89050'; ctx.fillRect(cx - 420, 300, 70, 580); ctx.fillRect(cx - 40, 300, 70, 580); ctx.fillRect(cx - 440, 280, 510, 50); ctx.fillStyle = '#fff2c8'; ctx.fillRect(cx - 350, 330, 310, 550); });
    layer(ctx, c, 0.95, () => { figure(ctx, cx - 200, 940, 1.45, { col: '#3a1626', rim: '#fff4d0', pose: 'stand', t: T, trim: '#e8b838', flip: 1 }); });
    layer(ctx, c, 0.5, () => { const x = cx + 300 + p * 700; ctx.fillStyle = '#c89050'; ctx.fillRect(cx + 200, 820, 1500, 120); figure(ctx, x, 880, 0.55, { col: '#07070a', rim: '#ffd890', pose: 'walk', t: T }); });
    A.dust(ctx, T, { n: 50, col: '#ffe0b0', a: 0.45 }); A.vignette(ctx, 0.45);
  },
  42(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.2, x0: cx, y0: 600 });
    A.sky(ctx, [[0, '#1a0e08'], [1, '#3a2010']]); glow(ctx, cx, 600, 900, '#ffb860', 0.4);
    layer(ctx, c, 1.0, () => { ctx.fillStyle = '#4a2c18'; ctx.fillRect(-W, 760, W * 3, 500);
      ctx.fillStyle = '#7a5030'; ctx.beginPath(); ctx.moveTo(cx - 200, 780); ctx.quadraticCurveTo(cx - 280, 520, cx - 80, 430); ctx.lineTo(cx + 80, 430); ctx.quadraticCurveTo(cx + 280, 520, cx + 200, 780); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#5a3a20'; ctx.fillRect(cx - 90, 410, 180, 30); const tie = sstep(0.8, 3.0, lu); ctx.strokeStyle = '#e8c070'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(cx - 100, 440); ctx.quadraticCurveTo(cx, 440 + 40 * tie, cx + 100, 440); ctx.stroke();
      for (let i = 0; i < 3; i++) { const k = sstep(i * 0.8, i * 0.8 + 0.7, lu) * (1 - tie); ctx.fillStyle = ['#a8683a', '#c8a050', '#6a8a4a'][i]; ctx.beginPath(); ctx.ellipse(cx - 260 + i * 260, 740 - k * 120, 54, 36, 0, 0, TAU); if (k > 0.01) ctx.fill(); }
      const ax = lerp(cx - 640, cx - 150, ease(lu / 3)); ctx.strokeStyle = '#3a1626'; ctx.lineWidth = 56; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx - 760, 300); ctx.quadraticCurveTo(cx - 560, 380, ax, 440 + Math.sin(T * 5) * 6); ctx.stroke(); ctx.fillStyle = '#d0a070'; ctx.beginPath(); ctx.ellipse(ax + 16, 442 + Math.sin(T * 5) * 6, 34, 26, 0.2, 0, TAU); ctx.fill(); });
    A.dust(ctx, T, { n: 40, col: '#ffd890', a: 0.4 }); A.vignette(ctx, 0.5);
  },
  43(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.1, x0: 600, x1: 1300, y0: 700, y1: 400 });
    env(ctx, c, { kind: 'night', t: T, moon: [1500, 240, 50], y: 700, jag: true });
    layer(ctx, c, 0.7, () => { terrain(ctx, { y: 860, amp: 50, freq: 0.0028, seed: 3, col: '#080c1c', bot: '#03050c' }); town(ctx, { y: 880, x0: 200, x1: 900, col: '#0c1228', seed: 5, h0: 40, h1: 90, win: 1, winCol: '#ffcf70' }); });
    layer(ctx, c, 0.85, () => { const k = ease(clamp(lu / 4)); ctx.strokeStyle = '#ffd890'; ctx.lineWidth = 4; ctx.shadowColor = '#ffb347'; ctx.shadowBlur = 24; ctx.beginPath(); ctx.moveTo(500, 840); ctx.bezierCurveTo(800, 820, 1100, 500, lerp(500, 1520, k), lerp(840, 360, k)); ctx.stroke(); ctx.shadowBlur = 0; glow(ctx, lerp(500, 1520, k), lerp(840, 360, k), 120, '#ffd890', 0.8); A.disc(ctx, 500, 840, 8, '#ffd890'); });
    A.dust(ctx, T, { n: 50, col: '#ffe0a0', a: 0.4 }); A.vignette(ctx, 0.5);
    caption(ctx, 'his only lifeline', cx, 1000, 52, '#ffe2b8', { a: sstep(1.6, 2.8, lu), track: 10 });
  },
};
