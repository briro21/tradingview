// Lines 96-112: the prophecy, the silence (Fatrah), and the end screen.
import * as M from './lib/motion.js';
import * as A from './lib/art.js';
import { env, KIND, CROWD } from './sets.js';
import { SC1, caveFrame } from './scenes1.js';
import { oldman } from './scenes4.js';
const { W, H, layer, camAt, glow, rgba, mixc, lerp, clamp, hash01, noise1, sstep, ease, caption, words, figure, terrain, ridge, dust, rays, flame, embers, shadowEllipse, town, TAU } = A;
const cx = W / 2;
const flash = (ctx, a, col = '#fff') => { if (a > 0.01) { ctx.fillStyle = rgba(col, clamp(a)); ctx.fillRect(0, 0, W, H); } };
const shk = (ctx, T, a, seed = 3) => { if (a > 0.1) ctx.translate(noise1(T * 55, seed) * a, noise1(T * 55, seed + 7) * a); };
const quote = (ctx, s, str, u0, col = '#fff4dc', y = 980, size = 52) => { const a = sstep(u0, u0 + 0.5, s.lu) * (1 - sstep(s.nb - 0.8, s.nb - 0.2, s.lu)); caption(ctx, str, cx, y, size, col, { a, track: 3 }); };
const hand = (ctx, x, y, s, col, a = 0) => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s); ctx.fillStyle = '#c99870'; ctx.beginPath(); ctx.ellipse(0, 0, 70, 54, 0, 0, TAU); ctx.fill(); for (let f = 0; f < 4; f++) { ctx.beginPath(); ctx.roundRect(-60 + f * 34, -112, 28, 100, 14); ctx.fill(); } ctx.beginPath(); ctx.ellipse(-76, -6, 20, 46, 0.5, 0, TAU); ctx.fill(); ctx.restore(); };
function stormSky(ctx, T, c, flashA) {
  A.sky(ctx, [[0, '#07080e'], [0.6, '#1c2236'], [1, '#3a4258']]); layer(ctx, c, 0.1, () => { for (let i = 0; i < 9; i++) { ctx.fillStyle = `rgba(20,26,40,${0.6})`; ctx.beginPath(); ctx.ellipse(((i * 380 + T * 18) % 2600) - 300, 140 + (i % 3) * 120, 360, 110, 0, 0, TAU); ctx.fill(); } });
  if (flashA > 0) { ctx.fillStyle = rgba('#cfe0ff', flashA * 0.55); ctx.fillRect(0, 0, W, H); }
}
function bolt(ctx, x, y0, y1, seed, a) { if (a <= 0.01) return; ctx.save(); ctx.strokeStyle = rgba('#e8f0ff', a); ctx.shadowColor = '#9db6ff'; ctx.shadowBlur = 40; ctx.lineWidth = 7; ctx.lineJoin = 'round'; ctx.beginPath(); let px = x, py = y0; ctx.moveTo(px, py); for (let i = 1; i <= 14; i++) { px += (hash01(i, seed) - 0.5) * 120; py = lerp(y0, y1, i / 14); ctx.lineTo(px, py); } ctx.stroke(); ctx.lineWidth = 2; ctx.strokeStyle = rgba('#fff', a); ctx.stroke(); ctx.restore(); }
const pulse = (T, f, a = 0) => Math.max(0, Math.sin(T * f + a)) ** 10;

export const SC5 = {
  96(ctx, s) { oldman(ctx, s, { mode: 'wide', red: true, z1: 1.18 }); caption(ctx, 'THE PROPHECY', cx, 160, 76, '#ff8a70', { track: 20, a: sstep(1.4, 2.4, s.lu) }); },
  97(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.2, x0: cx, y0: 560 }); A.sky(ctx, [[0, '#0e0405'], [1, '#2a0a0a']]); glow(ctx, cx - 300, 400, 1000, '#d8301c', 0.4);
    layer(ctx, c, 1.0, () => { ctx.fillStyle = '#4a2c16'; ctx.fillRect(cx + 120, -100, 40, 1400); ctx.fillStyle = '#2a1a10'; ctx.beginPath(); ctx.moveTo(cx - 400, 1200); ctx.quadraticCurveTo(cx - 360, 560, cx + 60, 520); ctx.lineTo(cx + 240, 560); ctx.quadraticCurveTo(cx + 380, 800, cx + 400, 1200); ctx.fill();
      hand(ctx, cx + 140, 640, 1.5, '#c99870', 0); });
    rays(ctx, cx - 300, 400, Math.PI * 0.1, 0.7, 1300, '#ff6a40', 0.1, T, 8); A.dust(ctx, T, { n: 50, col: '#ff9a70', a: 0.4 }); A.vignette(ctx, 0.7, '#150204'); quote(ctx, s, '“I wish I were young...”', 1.0, '#ffb0a0', 960, 60);
  },
  98(ctx, s) {
    const { T, p, lu } = s; ctx.save(); shk(ctx, T, 14 * Math.exp(-lu * 2)); const c = camAt(p, { z0: 1.0, z1: 1.2, x0: cx, y0: 560 }); A.sky(ctx, [[0, '#1a0e06'], [1, '#6a4a1a']]); glow(ctx, cx, 480, 1000, '#ffd890', 0.55);
    layer(ctx, c, 1.0, () => { ctx.fillStyle = '#2a1608'; ctx.fillRect(-W, 900, W * 3, 400); figure(ctx, cx, 960, 2.0, { col: '#7a2a2e', rim: '#fff4d0', pose: 'arms', t: T, shiver: 2 * Math.exp(-lu), rimDx: 4 }); }); ctx.restore(); flash(ctx, 0.8 * Math.exp(-lu * 5), '#fff'); A.vignette(ctx, 0.45);
    words(ctx, lu, 0.8, 'AL-AMIN!', cx, 200, 130, '#fff4dc', { stag: 0, track: 18 }); caption(ctx, 'the most loved man in the city', cx, 990, 42, '#ffe8c0', { font: 'UI', w: 500, track: 8, a: sstep(1.6, 2.6, lu) });
  },
  99(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.22, x0: cx, y0: 560 }); env(ctx, c, { kind: 'dusk', t: T, sun: [1500, 620, 60], y: 650 });
    layer(ctx, c, 0.55, () => town(ctx, { y: 800, x0: -300, x1: 2500, col: '#3a1420', seed: 5, h0: 80, h1: 190, win: 1, winCol: '#ff6a40' })); A.tint(ctx, '#ff2a10', 0.1 * sstep(1, 4, lu), 'overlay');
    layer(ctx, c, 1.0, () => { ctx.fillStyle = '#12070a'; ctx.fillRect(-W, 920, W * 3, 400); figure(ctx, cx - 300, 960, 1.7, { col: '#06030a', rim: '#ff9a50', pose: 'hands', t: T, shiver: 2 }); });
    A.vignette(ctx, 0.6); quote(ctx, s, '“Will they really drive me out?”', 0.8, '#ffe8c0', 980, 56);
  },
  100(ctx, s) {
    const n = 3, i = Math.min(n - 1, Math.floor(s.lu / s.nb * n)), k = clamp(s.lu / s.nb * n - i), T = s.T;
    ctx.save(); const z = 1 + k * 0.1; ctx.translate(cx, H / 2); ctx.scale(z, z); ctx.translate(-cx, -H / 2);
    env(ctx, { x: cx, y: 540, z: 1 }, { kind: 'red', t: T, sun: [cx + (i - 1) * 300, 560, 80], y: 640 }); ctx.fillStyle = '#1a0507'; ctx.fillRect(0, 800, W, 400);
    const N = 7 + i * 2; for (let j = 0; j < N; j++) { const x = (j + 0.5) / N * W + noise1(T * 2 + j, 3) * 20, y = 960 + (j % 3) * 20, sc = 1.0 + (j % 3) * 0.2; const up = 0.5 + 0.5 * Math.sin(T * 6 + j); figure(ctx, x, y, sc, { col: '#0a0305', rim: '#ff6a40', pose: 'arms', t: T + j, rimDx: 4, flip: j % 2 ? 1 : -1 }); if (j % 2 === 0) { flame(ctx, x + 70 * sc, y - 230 * sc, 0.35, T, { seed: j }); } }
    ctx.restore(); embers(ctx, T, cx, 700, { n: 60, up: 500, r: 1600, col: '#ff7a30' }); A.vignette(ctx, 0.55, '#150204'); flash(ctx, 0.3 * Math.max(0, 1 - k * 7), '#ff6a40');
    caption(ctx, ['“Yes.”', 'brought what you brought', '“treated as an enemy.”'][i], cx, 160, i === 0 ? 120 : 64, '#fff4dc', { track: 4 });
  },
  101(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.2, x0: cx, y0: 560 }); A.sky(ctx, [[0, '#0e0605'], [1, '#2a1208']]); glow(ctx, cx - 300, 400, 1000, '#ffb050', 0.35);
    layer(ctx, c, 1.0, () => { ctx.fillStyle = '#4a2c16'; ctx.fillRect(cx + 120, -100, 40, 1400); ctx.fillStyle = '#2a1a10'; ctx.beginPath(); ctx.moveTo(cx - 400, 1200); ctx.quadraticCurveTo(cx - 360, 560, cx + 60, 520); ctx.lineTo(cx + 240, 560); ctx.quadraticCurveTo(cx + 380, 800, cx + 400, 1200); ctx.fill(); const lift = ease(lu / 2.4) * 120; hand(ctx, cx + 140, 640 - lift, 1.5, '#c99870', 0); });
    A.dust(ctx, T, { n: 50, col: '#ffd890', a: 0.4 }); A.vignette(ctx, 0.6); quote(ctx, s, '“I will support you with all my strength.”', 1.0, '#ffe8c0', 980, 52);
  },
  102(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.14, x0: cx, y0: 540 }); A.sky(ctx, [[0, '#0a0203'], [1, '#2a0608']]); glow(ctx, cx, 480, 1000, '#d8301c', 0.4 + 0.1 * Math.sin(T * 3));
    layer(ctx, c, 1.0, () => { ctx.fillStyle = '#1a0507'; ctx.fillRect(-W, 0, W * 3, H * 2); ctx.fillStyle = A.lin(ctx, 0, 220, 0, 800, [[0, '#ff9a60'], [1, '#d8301c']]); ctx.beginPath(); ctx.roundRect(cx - 190, 220, 380, 560, [190, 190, 0, 0]); ctx.fill(); ctx.fillStyle = '#1a0507'; ctx.fillRect(cx - 4, 220, 8, 560); ctx.fillRect(cx - 190, 470, 380, 8); figure(ctx, cx, 1000, 1.9, { col: '#030102', rim: '#ff6a40', pose: 'stand', t: T, rimDx: 0 }); });
    ['WAR', 'EXILE', 'SUFFERING'].forEach((w, i) => { const a = sstep(0.6 + i * 1.2, 1.2 + i * 1.2, lu); caption(ctx, w, cx - 640 + i * 640, 960, 64, '#ff7a60', { a, track: 18 }); }); A.vignette(ctx, 0.65, '#150204');
  },
  103(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.2, x0: cx, y0: 760, y1: 560 }); env(ctx, c, { kind: 'night', t: T, milky: true, y: 900 });
    layer(ctx, c, 0.9, () => { ridge(ctx, { y: 960, amp: 80, freq: 0.004, seed: 77, col: '#04060e', bot: '#02030a', x0: -300, x1: 2400 }); ctx.fillStyle = '#02030a'; ctx.fillRect(-W, 1000, W * 3, 300); figure(ctx, 1200, 1010, 0.8, { col: '#010204', rim: '#7e9be0', pose: 'stand', t: T, rimDx: -2 }); });
    A.vignette(ctx, 0.45); caption(ctx, 'he waits for the angel', cx, 160, 52, '#bcd0ff', { a: sstep(0.6, 1.6, lu), font: 'UI', w: 500, track: 14 });
  },
  104(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.2, z1: 1.28, x0: cx, y0: 560 }); const out = sstep(0.4, s.nb - 0.2, lu); ctx.fillStyle = '#010206'; ctx.fillRect(0, 0, W, H);
    layer(ctx, c, 0.05, () => { for (let i = 0; i < 260; i++) { const x = hash01(i, 9) * (W + 200) - 100, y = hash01(i, 10) * 900, die = hash01(i, 11); const a = clamp((die - out) * 6) * (0.4 + hash01(i, 12) * 0.6); ctx.fillStyle = `rgba(255,255,240,${a})`; ctx.fillRect(x, y, hash01(i, 13) > 0.9 ? 3 : 1.6, hash01(i, 13) > 0.9 ? 3 : 1.6); } });
    layer(ctx, c, 0.9, () => { ridge(ctx, { y: 960, amp: 80, freq: 0.004, seed: 77, col: '#04060e', x0: -300, x1: 2400 }); figure(ctx, 1200, 1010, 0.8, { col: '#010204', rim: '#7e9be0', pose: 'stand', t: T, alpha: 1 - out * 0.7, rimDx: -2 }); });
    A.vignette(ctx, 0.6); words(ctx, lu, 1.0, 'nothing.', cx, 560, 130, '#fff', { stag: 0, track: 20 });
  },
  105(ctx, s) {
    const n = 3, i = Math.min(n - 1, Math.floor(s.lu / s.nb * n)), k = clamp(s.lu / s.nb * n - i), T = s.T, c = { x: cx, y: 540, z: 1 + 0.05 * k };
    A.sky(ctx, [[0, '#0a0604'], [1, '#2a1608']]); layer(ctx, c, 1.0, () => { ctx.fillStyle = '#3a2210'; ctx.fillRect(-W, 800, W * 3, 400); ctx.fillStyle = '#c89050'; ctx.beginPath(); ctx.moveTo(cx - 200, 800); ctx.quadraticCurveTo(cx - 260, 640, cx - 90, 600); ctx.lineTo(cx + 90, 600); ctx.quadraticCurveTo(cx + 260, 640, cx + 200, 800); ctx.fill(); ctx.fillStyle = '#a87030'; ctx.fillRect(cx - 120, 560, 240, 50); ctx.fillStyle = '#5a3a1a'; ctx.fillRect(cx - 6, 520, 12, 44);
      if (i < 2) { flame(ctx, cx, 520, 0.9 * (i === 1 ? 0.8 - 0.2 * k : 1), T, { seed: i }); } else { const t2 = k; for (let j = 0; j < 6; j++) { const ph = (t2 * 1.4 + j * 0.12); ctx.fillStyle = `rgba(210,200,190,${0.3 * (1 - clamp(ph))})`; ctx.beginPath(); ctx.arc(cx + Math.sin(ph * 6 + j) * 30, 500 - ph * 300, 14 + ph * 40, 0, TAU); ctx.fill(); } ctx.fillStyle = '#ff6a30'; if (k < 0.15) ctx.fillRect(cx - 3, 512, 6, 6); } });
    glow(ctx, cx, 520, 900 * (i < 2 ? 1 : Math.max(0, 1 - k * 4)), '#ff9a40', 0.5); A.vignette(ctx, 0.6 + (i === 2 ? k * 0.3 : 0));
    caption(ctx, ['DAYS PASS', 'WARAQAH DIES', ''][i], cx, 220, 74, '#ffe2b8', { track: 20, a: 0.95 });
  },
  106(ctx, s) {
    const { T, p, lu } = s; const day = (lu * 0.42) % 1, ang = day * TAU, dark = 0.5 - 0.5 * Math.cos(ang), sun = Math.cos(ang);
    const kind = dark > 0.5 ? 'night' : 'dawn'; A.sky(ctx, [[0, mixc('#7a9ad0', '#02040f', ease(dark))], [1, mixc('#ffd8a0', '#12204a', ease(dark))]]);
    ctx.save(); A.stars(ctx, T, { n: 160, y1: 700, a: ease(clamp((dark - 0.35) * 2)) }); ctx.restore(); const sx = cx + Math.sin(ang) * 760, sy = 620 - Math.cos(ang) * 520; if (Math.cos(ang) > -0.1) A.sun(ctx, sx, sy, 56); else A.moon(ctx, cx - Math.sin(ang) * 760, 620 + Math.cos(ang) * 520, 50);
    layer(ctx, { x: cx, y: 540, z: 1 }, 0.5, () => terrain(ctx, { y: 760, amp: 60, freq: 0.0035, seed: 5, col: mixc('#6a3a38', '#080c1c', ease(dark)) }));
    layer(ctx, { x: cx, y: 540, z: 1 }, 1.0, () => { ctx.fillStyle = mixc('#2a1418', '#02030a', ease(dark)); ctx.fillRect(-W, 880, W * 3, 400); figure(ctx, cx, 940, 1.2, { col: mixc('#241014', '#04060c', ease(dark)), rim: dark > 0.5 ? '#7e9be0' : '#ffd8a0', pose: 'sit', t: T }); });
    layer(ctx, { x: cx, y: 540, z: 1 }, 1.15, () => caveFrame(ctx, { x: cx, y: 460, w: 1700, h: 900, col: '#030203', rim: '#2a1a1a' }));
    A.vignette(ctx, 0.5); const wk = 1 + Math.floor(lu * 0.42); caption(ctx, 'WEEKS', cx, 990, 56, '#fff4dc', { track: 22, a: 0.9 }); caption(ctx, 'the sky is completely silent', cx, 1050, 40, '#d8e4ff', { font: 'UI', w: 500, track: 8, a: sstep(1.4, 2.4, lu) });
  },
  107(ctx, s) {
    const { T, p, lu } = s; const q = SC1.h0; const c = camAt(p, { z0: 1.0, z1: 1.18, x0: cx, y0: 560 });
    A.sky(ctx, [[0, '#02040f'], [1, '#0b1630']]); layer(ctx, c, 0.05, () => { A.stars(ctx, T, { n: 100, y1: 700, a: 0.5 }); A.moon(ctx, 1460, 260, 62); }); layer(ctx, c, 0.3, () => terrain(ctx, { y: 700, amp: 80, freq: 0.0035, seed: 5, col: '#0a1228' }));
    layer(ctx, c, 0.95, () => { ctx.fillStyle = '#03040a'; ctx.fillRect(-W, 860, W * 3, 600); figure(ctx, cx - 100, 862, 1.5, { col: '#05070f', rim: '#5a78c0', pose: 'sit', t: T, lean: 0.5, rimDx: 3 }); for (let i = 0; i < 4; i++) { const ph = (T * 0.18 + i * 0.25) % 1; ctx.save(); ctx.globalAlpha = 0.18 * Math.sin(ph * Math.PI); ctx.font = `700 ${120 + i * 30}px ${A.DISPLAY}`; ctx.fillStyle = '#9db6ff'; ctx.textAlign = 'center'; ctx.fillText('?', 560 + i * 280, 640 - ph * 200); ctx.restore(); } });
    layer(ctx, c, 1.15, () => caveFrame(ctx, { x: cx, y: 480, w: 1500, h: 860, col: '#020206', rim: '#16203a' })); A.vignette(ctx, 0.6);
    caption(ctx, 'doubting everything all over again', cx, 990, 42, '#8fa8e8', { font: 'UI', w: 500, track: 8, a: sstep(0.8, 1.8, lu) });
  },
  108(ctx, s) {
    const { T, lu } = s; ctx.fillStyle = '#020306'; ctx.fillRect(0, 0, W, H); for (let i = 0; i < 6; i++) { const ph = (T * 0.2 + i / 6) % 1; ctx.strokeStyle = `rgba(140,170,240,${0.14 * (1 - ph)})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, 540, 100 + ph * 900, 0, TAU); ctx.stroke(); }
    const k = ease(lu / 2); glow(ctx, cx, 520, 700, '#6f90e0', 0.25 * k); A.arabic(ctx, 'الفترة', cx, 480, 260, '#cfdcff', k * 0.9, '#6f90e0'); words(ctx, lu, 0.8, 'THE FATRAH', cx, 680, 120, '#eaf0ff', { stag: 0.3, track: 20 });
    const a = sstep(2.4, 3.2, lu); caption(ctx, 'AN AGONIZING SILENCE', cx, 770, 34, '#9db6ff', { font: 'UI', w: 500, track: 20, a }); A.vignette(ctx, 0.5);
  },
  109(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.35, x0: cx, y0: 540 }); A.sky(ctx, [[0, '#020204'], [1, '#08080e']]);
    layer(ctx, c, 1.0, () => { for (let i = 0; i < 14; i++) { const r = 80 + i * 70; ctx.strokeStyle = `rgba(110,130,190,${0.5 - i * 0.034})`; ctx.lineWidth = 6 - i * 0.3; ctx.beginPath(); ctx.ellipse(cx, 540 + i * 16, r * 1.5, r * 0.55, 0, 0, TAU); ctx.stroke(); }
      glow(ctx, cx, 520, 500, '#8fa8ff', 0.18); figure(ctx, cx, 760, 0.7, { col: '#010204', rim: '#8fa8ff', pose: 'sit', t: T, rimDx: 2 }); });
    A.vignette(ctx, 0.7); quote(ctx, s, 'Did God abandon him?', 1.4, '#cfdcff', 960, 66);
  },
  110(ctx, s) {
    const { T, p, lu } = s; const fl = (k) => Math.exp(-((lu - k) % 1.1) * 6) * (lu > k ? 1 : 0); const f1 = fl(0.5), f2 = fl(2.2), f3 = fl(3.6); const c = camAt(p, { z0: 1.0, z1: 1.15, x0: cx, y0: 560 });
    ctx.save(); shk(ctx, T, 10 * Math.max(f1, f2, f3)); stormSky(ctx, T, c, Math.max(f1, f2, f3));
    layer(ctx, c, 0.9, () => { ridge(ctx, { y: 780, amp: 160, freq: 0.0024, seed: 12, col: '#0a0d18', bot: '#04050a', x0: -300, x1: 2400 }); ctx.fillStyle = '#04050a'; ctx.fillRect(-W, 900, W * 3, 400); figure(ctx, 1420, 930, 1.2, { col: '#020307', rim: '#9db6ff', pose: 'sit', t: T }); });
    bolt(ctx, 600, -50, 620, 3, f1); bolt(ctx, 1500, -50, 700, 8, f2); bolt(ctx, 960, -50, 640, 13, f3); ctx.restore(); for (let i = 0; i < 90; i++) { const x = (hash01(i, 5) * W * 1.2 + T * 240) % (W + 200), y = ((hash01(i, 6) * H + T * 1400) % (H + 100)); ctx.strokeStyle = 'rgba(190,210,255,.25)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 14, y + 44); ctx.stroke(); } A.vignette(ctx, 0.6);
    caption(ctx, 'THE SECOND REVELATION', cx, 150, 60, '#e8f0ff', { track: 16, a: sstep(2.4, 3.2, lu) });
  },
  111(ctx, s) {
    const { T, p, lu } = s; const fl = (k) => Math.exp(-((lu - k) % 1.2) * 6) * (lu > k ? 1 : 0); const f = Math.max(fl(0.4), fl(2.6)); const c = camAt(p, { z0: 1.0, z1: 1.22, x0: cx, y0: 640, y1: 520 });
    ctx.save(); shk(ctx, T, 6 * f); stormSky(ctx, T, c, f); const k = ease(lu / 3.4);
    layer(ctx, c, 0.9, () => { ridge(ctx, { y: 800, amp: 170, freq: 0.0024, seed: 12, col: '#0a0d18', bot: '#04050a', x0: -300, x1: 2400 }); ctx.fillStyle = '#04050a'; ctx.fillRect(-W, 920, W * 3, 400);
      glow(ctx, cx, 640, 500, '#ffd890', 0.4 * k); figure(ctx, cx, 960 - k * 40, 1.0 + k * 0.9, { col: '#04050a', rim: '#ffd890', pose: k > 0.55 ? 'arms' : 'stand', t: T, rimDx: 0 }); });
    bolt(ctx, 520, -50, 700, 21, f); bolt(ctx, 1400, -50, 700, 5, fl(2.6)); ctx.restore(); A.vignette(ctx, 0.5);
    words(ctx, lu, 0.4, 'A QUIET THINKER', cx - 0, 190, 64, '#9db6ff', { stag: 0.2, track: 12 }); words(ctx, lu, 2.4, 'A FEARLESS WARNER', cx, 320, 86, '#fff4dc', { stag: 0.25, track: 12 });
  },
  112(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.08, x0: cx, y0: 540 }); env(ctx, c, { kind: 'dawn', t: T, sun: [cx, 520, 70], y: 640, jag: true });
    layer(ctx, c, 0.9, () => { ridge(ctx, { y: 860, amp: 130, freq: 0.0026, seed: 33, col: '#2a1418', bot: '#12070a', x0: -300, x1: 2400 }); figure(ctx, 1400, 800, 0.35, { col: '#050204', rim: '#ffc58a', pose: 'stand', t: T }); });
    ctx.fillStyle = 'rgba(8,4,10,.62)'; ctx.fillRect(0, 0, W, H); rays(ctx, cx, 520, Math.PI * 0.5, 2.2, 1200, '#ffd9a0', 0.06, T, 14);
    const k = M.springU(lu, 0.2, M.SPRING.gentle); A.words(ctx, lu, 0.3, 'CHAPTER 2', cx, 250, 120, '#fff0d4', { stag: 0.3, track: 20 }); caption(ctx, 'THE SECOND REVELATION', cx, 320, 38, '#ffc58a', { font: 'UI', w: 500, track: 18, a: sstep(1.0, 2.0, lu) });
    [[cx - 470, 'NEXT EPISODE', 2.0], [cx + 470, 'WATCH NEXT', 2.4]].forEach(([x, w, u0]) => { const a = M.springU(lu, u0, M.SPRING.gentle); if (a <= 0) return; ctx.save(); ctx.translate(x, 650 - (1 - a) * 40); ctx.globalAlpha = clamp(a); ctx.strokeStyle = 'rgba(255,220,160,.7)'; ctx.lineWidth = 3; ctx.fillStyle = 'rgba(255,255,255,.05)'; ctx.beginPath(); ctx.roundRect(-380, -210, 760, 420, 20); ctx.fill(); ctx.stroke(); M.text(ctx, w, 0, 10, M.font(34, 500, 'UI'), 'rgba(255,230,190,.85)', 'center', 14); ctx.restore(); });
    const sb = M.springU(lu, 4.0, M.SPRING.bouncy); if (sb > 0) { ctx.save(); ctx.translate(cx, 940); ctx.scale(sb, sb); ctx.fillStyle = '#e03a2a'; ctx.beginPath(); ctx.roundRect(-190, -42, 380, 84, 42); ctx.fill(); M.text(ctx, 'SUBSCRIBE', 0, 12, M.font(34, 700, 'UI'), '#fff', 'center', 6); ctx.restore(); }
    A.dust(ctx, T, { n: 70, col: '#ffd8a0', a: 0.4, sy: -10 }); A.vignette(ctx, 0.5); ctx.fillStyle = `rgba(0,0,0,${sstep(s.nb - 1.6, s.nb - 0.1, lu)})`; ctx.fillRect(0, 0, W, H);
  },
};
