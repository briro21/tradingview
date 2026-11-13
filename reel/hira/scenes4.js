// Lines 67-95: the flight home, Khadijah's answer, Waraqah.
import * as M from './lib/motion.js';
import * as A from './lib/art.js';
import { env, KIND, CROWD } from './sets.js';
import { SC1, caveFrame, lowerThird } from './scenes1.js';
import { SC3 } from './scenes3.js';
const { W, H, layer, camAt, glow, rgba, mixc, lerp, clamp, hash01, noise1, sstep, ease, caption, words, figure, terrain, ridge, dust, rays, flame, embers, shadowEllipse, TAU } = A;
const cx = W / 2;
const flash = (ctx, a, col = '#fff') => { if (a > 0.01) { ctx.fillStyle = rgba(col, clamp(a)); ctx.fillRect(0, 0, W, H); } };
const shk = (ctx, T, a, seed = 3) => { if (a > 0.1) ctx.translate(noise1(T * 55, seed) * a, noise1(T * 55, seed + 7) * a); };
const quote = (ctx, s, str, u0, col = '#fff4dc', y = 980, size = 52) => { const a = sstep(u0, u0 + 0.5, s.lu) * (1 - sstep(s.nb - 0.8, s.nb - 0.2, s.lu)); caption(ctx, str, cx, y, size, col, { a, track: 3 }); };
const WOMAN = { col: '#3a1626', trim: '#e8b838', rim: '#fff4d0' };
const room = (ctx, c, T, warm = 0.5) => { A.sky(ctx, [[0, '#120a06'], [1, '#2e1a0c']]); glow(ctx, cx, 560, 1000, '#ff9a40', 0.3 + warm * 0.2 + 0.03 * Math.sin(T * 8)); layer(ctx, c, 1.0, () => { ctx.fillStyle = '#3a2210'; ctx.fillRect(-W, 880, W * 3, 400); ctx.fillStyle = '#4a2c16'; ctx.fillRect(-W, 872, W * 3, 14); }); };
const fire = (ctx, T, x, y, s = 1) => { flame(ctx, x, y, s, T); embers(ctx, T, x, y - 40, { n: 30, up: 260, r: 160 }); ctx.fillStyle = '#2a1608'; ctx.beginPath(); ctx.ellipse(x, y + 4, 90 * s, 16 * s, 0, 0, TAU); ctx.fill(); };
const bubble = (ctx, x, y, w, h, a = 1) => { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(255,248,230,.95)'; ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, 36); ctx.fill(); ctx.beginPath(); ctx.arc(x - w / 2 + 30, y + h / 2 + 16, 14, 0, TAU); ctx.arc(x - w / 2 + 6, y + h / 2 + 44, 8, 0, TAU); ctx.fill(); ctx.restore(); };
// pop-up card with an icon drawn by fn(ctx, T, lu) inside a panel
const pop = (ctx, s, title, icon, bg = 'warm') => {
  const { T, lu } = s; room(ctx, { x: cx, y: 540, z: 1 }, T, 0.2); A.vignette(ctx, 0.6);
  const k = M.springU(lu, 0.1, M.SPRING.bouncy); ctx.save(); ctx.translate(cx, 470); ctx.scale(1.3 * (0.7 + 0.3 * k), 1.3 * (0.7 + 0.3 * k)); ctx.globalAlpha = clamp(k);
  ctx.fillStyle = 'rgba(255,244,214,.96)'; ctx.beginPath(); ctx.roundRect(-380, -270, 760, 520, 36); ctx.fill(); ctx.strokeStyle = '#c9962c'; ctx.lineWidth = 6; ctx.stroke();
  ctx.save(); ctx.beginPath(); ctx.roundRect(-380, -270, 760, 520, 36); ctx.clip(); icon(ctx, T, lu); ctx.restore(); ctx.restore();
  caption(ctx, title, cx, 960, 58, '#ffe8b8', { a: sstep(0.5, 1.2, lu), w: 600 });
};

export const SC4 = {
  67(ctx, s) {
    const { T, p, lu } = s; ctx.fillStyle = '#05030a'; ctx.fillRect(0, 0, W, H); const beat = Math.pow(Math.max(0, Math.sin(T * 7.2)), 6), b2 = Math.pow(Math.max(0, Math.sin(T * 7.2 - 0.9)), 8);
    const c = camAt(p, { z0: 1.0, z1: 1.14, x0: cx, y0: 560 });
    layer(ctx, c, 1.0, () => { glow(ctx, cx, 720, 900, '#d83a3a', 0.16 + 0.14 * beat); ctx.save(); ctx.translate(cx, 1120); const sc = 1 + beat * 0.025; ctx.scale(sc, sc); figure(ctx, 0, 0, 3.4, { col: '#0a0a14', rim: '#6c8cd8', pose: 'stand', t: T, shiver: 1.5, rimDx: -3 }); ctx.restore();
      [beat, b2].forEach((b, i) => { if (b > 0.05) { ctx.strokeStyle = `rgba(255,70,70,${0.55 * b})`; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(cx, 700, 60 + (1 - b) * 520 + i * 90, 0, TAU); ctx.stroke(); } }); });
    ctx.strokeStyle = 'rgba(255,90,90,.85)'; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); for (let x = 0; x <= W; x += 6) { const ph = ((x / W) * 3 - T * 1.4) % 1; const q = ph < 0 ? ph + 1 : ph; let y = 0; if (q > 0.40 && q < 0.44) y = -14 * (q - 0.4) / 0.04; else if (q >= 0.44 && q < 0.5) y = 120 * Math.sin((q - 0.44) / 0.06 * Math.PI) * -1 + 14; else if (q > 0.52 && q < 0.6) y = 30 * Math.sin((q - 0.52) / 0.08 * Math.PI); x ? ctx.lineTo(x, 1010 + y) : ctx.moveTo(x, 1010 + y); } ctx.stroke();
    A.vignette(ctx, 0.7); caption(ctx, 'his heart is pounding', cx, 120, 44, '#9db0f0', { font: 'UI', w: 500, track: 12, a: sstep(0.6, 1.4, lu) });
  },
  68(ctx, s) {
    const { T, p, lu } = s; ctx.save(); shk(ctx, T, 7); const c = camAt(p, { z0: 1.0, z1: 1.2, x0: 1200, x1: 700, y0: 420, y1: 700 });
    env(ctx, c, { kind: 'night', t: T, moon: [440, 220, 52], y: 640, jag: true });
    layer(ctx, c, 0.9, () => { ridge(ctx, { y: 760, amp: 220, freq: 0.0022, seed: 91, col: '#070b18', bot: '#02040a', x0: -200, x1: 2600, rough: 70 }); const px = 1500 - p * 900, py = 520 + p * 400; figure(ctx, px, py + 70, 0.5, { col: '#010204', rim: '#7e9be0', pose: 'walk', t: T * 1.6, lean: -0.5, flip: -1 }); });
    ctx.restore(); A.dust(ctx, T, { n: 40, col: '#8fa8ff', a: 0.3, sx: -40, sy: 30 }); A.vignette(ctx, 0.7); caption(ctx, 'in the dead of night', cx, 990, 44, '#9db0f0', { font: 'UI', w: 500, track: 12, a: sstep(0.8, 1.6, lu) });
  },
  69(ctx, s) {
    const { T, p, lu } = s; const hit = lu - 1.2; ctx.save(); if (hit > 0) shk(ctx, T, 26 * Math.exp(-hit * 2.4));
    A.sky(ctx, [[0, '#06040a'], [1, '#14101c']]); const open = hit > 0 ? M.springU(lu, 1.2, { stiffness: 220, damping: 12 }) : 0; const c = camAt(p, { z0: 1.0, z1: 1.2, x0: cx, y0: 560 });
    layer(ctx, c, 1.0, () => { ctx.fillStyle = '#2a1c14'; ctx.fillRect(-W, -200, W * 3, 1600); ctx.fillStyle = '#3a2418'; ctx.fillRect(cx - 360, 170, 720, 800);
      ctx.fillStyle = A.lin(ctx, 0, 220, 0, 960, [[0, '#ffe3a0'], [1, '#ff9a40']]); ctx.fillRect(cx - 300, 220, 600, 740); glow(ctx, cx, 600, 1000 * open, '#ffcf70', 0.8);
      [-1, 1].forEach((sd) => { ctx.save(); ctx.translate(cx + sd * 300, 0); ctx.transform(1 - open * 0.8, 0, 0, 1, 0, 0); ctx.fillStyle = '#4a2c18'; ctx.fillRect(sd < 0 ? 0 : -300, 220, 300, 740); ctx.fillStyle = '#6a3e20'; for (let i = 0; i < 4; i++) ctx.fillRect(sd < 0 ? 10 : -290, 260 + i * 170, 280, 18); ctx.restore(); });
      figure(ctx, cx, 980, 1.7, { col: '#030204', rim: '#ffd890', pose: 'arms', t: T, shiver: 3, rimDx: 4 }); });
    ctx.restore(); flash(ctx, 0.9 * Math.exp(-Math.max(0, hit) * 4) * (hit > 0 ? 1 : 0)); A.vignette(ctx, 0.45);
    caption(ctx, '“KHADIJAH!”', cx, 140, 80, '#fff', { a: sstep(1.6, 2.0, lu) * (1 - sstep(3.0, 3.6, lu)), track: 8 });
  },
  70(ctx, s) {
    const { T, p, lu } = s; ctx.save(); shk(ctx, T, 5); const c = camAt(p, { z0: 1.0, z1: 1.18, x0: cx, y0: 560 });
    room(ctx, c, T, 0.3); layer(ctx, c, 1.0, () => { figure(ctx, cx, 960, 2.0, { col: '#08050a', rim: '#ffb870', pose: 'hands', t: T, shiver: 5, lean: 0.25 }); }); ctx.restore();
    const a1 = sstep(0.1, 0.4, lu) * (1 - sstep(1.4, 1.6, lu)), a2 = sstep(1.6, 1.9, lu); const k = (a1 + a2) > 0 ? 1 : 0;
    if (a1 > 0 || a2 > 0) { ctx.save(); ctx.translate(cx + noise1(T * 60, 1) * 10, 220 + noise1(T * 60, 2) * 8); caption(ctx, '“Cover me!”', 0, 0, 120, '#fff', { a: Math.max(a1, a2), track: 4 }); ctx.restore(); }
    A.vignette(ctx, 0.6);
  },
  71(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.14, x0: cx, y0: 560 }); room(ctx, c, T, 0.8);
    layer(ctx, c, 1.0, () => { const cov = ease(lu / 3.6), sh = (1 - cov) * 4; fire(ctx, T, cx + 480, 880, 0.9);
      figure(ctx, cx - 120, 900, 1.5, { col: '#16100f', rim: '#ffb870', pose: 'sit', t: T, shiver: sh });
      ctx.save(); ctx.globalAlpha = clamp(cov * 1.4); ctx.fillStyle = '#7a2a2e'; ctx.beginPath(); ctx.moveTo(cx - 250, 900); ctx.quadraticCurveTo(cx - 270, 700, cx - 160, 640); ctx.quadraticCurveTo(cx - 100, 600, cx - 40, 640); ctx.quadraticCurveTo(cx + 100, 720, cx + 50, 900); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#c9962c'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(cx - 240, 830); ctx.lineTo(cx + 40, 830); ctx.stroke(); ctx.restore();
      figure(ctx, cx + 170, 900, 1.5, { col: WOMAN.col, trim: WOMAN.trim, rim: '#ffb870', pose: 'stand', t: T, flip: -1, lean: 0.2, hands: [[26, -146, -60 - cov * 40, -120]] }); });
    A.vignette(ctx, 0.5);
  },
  72(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.12, x0: cx, y0: 560 }); room(ctx, c, T, 0.8);
    layer(ctx, c, 1.0, () => { fire(ctx, T, cx, 900, 0.9); figure(ctx, cx - 380, 900, 1.45, { col: '#7a2a2e', rim: '#ffb870', pose: 'sit', t: T, flip: 1 }); figure(ctx, cx + 380, 900, 1.45, { col: WOMAN.col, trim: WOMAN.trim, rim: '#ffb870', pose: 'sit', t: T + 1, flip: -1 }); });
    ['THE CAVE', 'THE SQUEEZING', 'THE VOICE'].forEach((w, i) => { const u0 = 0.8 + i * 1.1, k = M.springU(lu, u0, M.SPRING.bouncy) * (1 - sstep(u0 + 1.6, u0 + 2.2, lu)); if (k > 0.02) { ctx.save(); ctx.translate(cx - 520 + i * 520, 300 - (1 - k) * 30); ctx.globalAlpha = k; ctx.fillStyle = 'rgba(255,244,214,.92)'; ctx.beginPath(); ctx.roundRect(-190, -42, 380, 84, 20); ctx.fill(); M.text(ctx, w, 0, 14, M.font(40, 700, 'Display'), '#3a1c08', 'center', 4); ctx.restore(); } });
    A.vignette(ctx, 0.5);
  },
  73(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.12, z1: 1.0, x0: cx, y0: 560 }); room(ctx, c, T, 0.8);
    layer(ctx, c, 1.0, () => { fire(ctx, T, cx + 20, 900, 0.8); figure(ctx, cx - 300, 900, 1.7, { col: '#7a2a2e', rim: '#ffb870', pose: 'sit', t: T, lean: 0 }); figure(ctx, cx + 300, 900, 1.5, { col: WOMAN.col, trim: WOMAN.trim, rim: '#ffb870', pose: 'sit', t: T + 1, flip: -1 }); });
    A.vignette(ctx, 0.5); quote(ctx, s, '“I fear for my life.”', 1.4, '#fff4dc', 980, 60);
  },
  74(ctx, s) {
    const { T, p, lu } = s; const L = (c) => { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, cx, H); ctx.clip(); c(); ctx.restore(); }, R = (c) => { ctx.save(); ctx.beginPath(); ctx.rect(cx, 0, cx, H); ctx.clip(); c(); ctx.restore(); };
    L(() => { room(ctx, { x: cx, y: 540, z: 1 }, T, 0.2); figure(ctx, 480, 940, 1.9, { col: '#08050a', rim: '#ffb870', pose: 'hands', t: T, shiver: 5, lean: 0.2 }); caption(ctx, 'HIM', 480, 150, 50, '#ffe8b8', { track: 18 }); });
    R(() => { room(ctx, { x: cx, y: 540, z: 1 }, T, 0.5); figure(ctx, 1440, 940, 1.9, { col: WOMAN.col, trim: WOMAN.trim, rim: '#ffb870', pose: 'stand', t: T }); caption(ctx, 'YOU', 1440, 150, 50, '#ffe8b8', { track: 18 }); const k = M.springU(lu, 2.5, M.SPRING.bouncy); if (k > 0) { bubble(ctx, 1560, 360, 260, 150, k); ctx.save(); ctx.globalAlpha = k; M.text(ctx, '?!', 1560, 400, M.font(110, 800, 'Display'), '#b02a1a', 'center'); ctx.restore(); } });
    ctx.fillStyle = '#fff4d0'; ctx.fillRect(cx - 2, 0, 4, H); A.vignette(ctx, 0.5);
  },
  75(ctx, s) {
    const { T, p, lu } = s; ctx.save(); shk(ctx, T, Math.max(0, 5 - lu * 2)); const c = camAt(p, { z0: 1.0, z1: 1.2, x0: cx, y0: 560 }); room(ctx, c, T, 0.5);
    layer(ctx, c, 1.0, () => figure(ctx, cx - 100, 980, 2.3, { col: WOMAN.col, trim: WOMAN.trim, rim: '#ffb870', pose: 'stand', t: T })); ctx.restore();
    const k = M.springU(lu, 0.8, M.SPRING.bouncy); bubble(ctx, cx + 360, 300, 520, 200, k); if (k > 0.1) { ctx.save(); ctx.globalAlpha = k; M.text(ctx, 'He lost his mind?', cx + 360, 320, M.font(54, 700, 'Display'), '#3a1c08', 'center'); ctx.restore(); } A.vignette(ctx, 0.55);
  },
  76(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.1, x0: cx, y0: 560 }); room(ctx, c, T, 0.5); const g = ease(lu / 4); glow(ctx, cx, 520, 700 + g * 500, '#ffd890', 0.5 * g);
    layer(ctx, c, 0.8, () => { ctx.save(); ctx.translate(cx + 360, 520); ctx.strokeStyle = rgba('#ffe0a0', 0.8 * g); ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0, -150, 44, 0, TAU); ctx.moveTo(0, -106); ctx.lineTo(0, 150); ctx.moveTo(-70, -40); ctx.lineTo(70, -40); ctx.moveTo(-170, 60); ctx.quadraticCurveTo(-120, 220, 0, 200); ctx.quadraticCurveTo(120, 220, 170, 60); ctx.stroke(); ctx.restore(); });
    layer(ctx, c, 1.0, () => figure(ctx, cx - 300, 960, 1.9, { col: WOMAN.col, trim: WOMAN.trim, rim: '#fff4d0', pose: 'stand', t: T }));
    words(ctx, lu, 0.8, 'A PSYCHOLOGICAL ANCHOR', cx, 190, 70, '#fff4dc', { stag: 0.25, track: 6 }); A.dust(ctx, T, { n: 60, col: '#ffe0a0', a: 0.5, sy: -12 }); A.vignette(ctx, 0.5);
  },
  77(ctx, s) {
    const { T, lu } = s; room(ctx, { x: cx, y: 540, z: 1 }, T, 0.2); A.vignette(ctx, 0.6); const icon = (x, kind, u0) => { const k = M.springU(lu, u0, M.SPRING.bouncy), st = sstep(u0 + 0.9, u0 + 1.3, lu); ctx.save(); ctx.translate(x, 480); ctx.scale(k, k); ctx.fillStyle = 'rgba(255,244,214,.96)'; ctx.beginPath(); ctx.roundRect(-210, -220, 420, 440, 30); ctx.fill();
      if (kind === 0) { ctx.fillStyle = '#c8c0d8'; ctx.beginPath(); ctx.moveTo(-90, 120); ctx.lineTo(-90, -40); ctx.arc(0, -40, 90, Math.PI, 0); ctx.lineTo(90, 120); for (let i = 0; i < 4; i++) ctx.lineTo(90 - (i + 1) * 45, i % 2 ? 120 : 160); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#3a3a5a'; ctx.beginPath(); ctx.arc(-34, -50, 16, 0, TAU); ctx.arc(34, -50, 16, 0, TAU); ctx.fill(); }
      else { ctx.strokeStyle = '#7a4a9a'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-90, 110); ctx.lineTo(70, -70); ctx.stroke(); ctx.fillStyle = '#e8b838'; [[80, -90, 34], [30, -150, 20], [120, -30, 20]].forEach(([a, b, r]) => { ctx.beginPath(); for (let i = 0; i < 10; i++) { const rr = i % 2 ? r * 0.45 : r, an = i / 10 * TAU - Math.PI / 2; ctx.lineTo(a + Math.cos(an) * rr, b + Math.sin(an) * rr); } ctx.closePath(); ctx.fill(); }); }
      ctx.strokeStyle = '#d02a1a'; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-170, -170); ctx.lineTo(-170 + 340 * st, -170 + 340 * st); ctx.stroke(); ctx.restore(); };
    icon(cx - 320, 0, 0.3); icon(cx + 320, 1, 1.4); caption(ctx, 'NOT GHOSTS.  NOT MAGIC.', cx, 900, 56, '#ffe8b8', { a: sstep(0.8, 1.6, lu), track: 6 });
  },
  78(ctx, s) {
    const { T, lu } = s; room(ctx, { x: cx, y: 540, z: 1 }, T, 0.4); glow(ctx, cx, 540, 900, '#ffd890', 0.35); A.vignette(ctx, 0.55);
    words(ctx, lu, 0.2, 'HIS CHARACTER', cx, 560, 150, '#ffe9b0', { stag: 0.3, track: 12 }); const a = sstep(1.4, 2.2, lu); ctx.fillStyle = `rgba(240,200,110,${a})`; ctx.fillRect(cx - 360 * a, 610, 720 * a, 4); A.dust(ctx, T, { n: 70, col: '#ffe0a0', a: 0.6, sy: -16 });
  },
  79(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.2, x0: cx, y0: 560 }); room(ctx, c, T, 0.9); const k = ease(lu / 2);
    layer(ctx, c, 1.0, () => { glow(ctx, cx, 600, 500, '#ffd890', 0.45 * k); [-1, 1].forEach((sd) => { ctx.strokeStyle = sd < 0 ? '#7a2a2e' : WOMAN.col; ctx.lineWidth = 120; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx + sd * 760, 380); ctx.quadraticCurveTo(cx + sd * 420, 520, cx + sd * lerp(300, 60, k), 640); ctx.stroke(); });
      ctx.fillStyle = '#d0a070'; ctx.beginPath(); ctx.ellipse(cx, 660, 170, 90, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#b8845a'; ctx.beginPath(); ctx.ellipse(cx - 60, 676, 100, 50, 0.2, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(cx + 70, 650, 90, 46, -0.2, 0, TAU); ctx.fill(); });
    A.dust(ctx, T, { n: 50, col: '#ffe0a0', a: 0.6, sy: -14 }); A.vignette(ctx, 0.5); quote(ctx, s, '“Never! God will never disgrace you.”', 1.0, '#fff4dc', 960, 56);
  },
  80(ctx, s) { pop(ctx, s, '“You keep good relations with your family.”', (c, T, lu) => { [-1, 0, 1].forEach((i) => { figure(c, i * 200, 190 + Math.abs(i) * 0, 0.9, { col: ['#7a2a2e', '#3a1626', '#2f6a7a'][i + 1], rim: '#fff4d0', pose: 'stand', t: T + i, hood: i !== 0 }); }); c.strokeStyle = '#e03a4a'; c.lineWidth = 6; c.beginPath(); c.moveTo(-200, 40); c.lineTo(200, 40); c.stroke(); const k = 1 + 0.08 * Math.sin(T * 5); c.fillStyle = '#e03a4a'; c.save(); c.translate(0, -140); c.scale(k, k); c.beginPath(); c.moveTo(0, 40); c.bezierCurveTo(-90, -30, -40, -80, 0, -30); c.bezierCurveTo(40, -80, 90, -30, 0, 40); c.fill(); c.restore(); }); },
  81(ctx, s) { pop(ctx, s, '“You help the poor and the destitute.”', (c, T, lu) => { figure(c, -180, 190, 1.0, { col: '#3a1626', rim: '#fff4d0', pose: 'stand', t: T, hands: [[26, -146, 120, -110]] }); figure(c, 200, 190, 0.7, { col: '#8a7a5a', rim: '#fff4d0', pose: 'stand', t: T, hood: false }); const ph = clamp((lu - 0.8) / 1.6); for (let i = 0; i < 3; i++) { const k = clamp(ph * 3 - i * 0.6); c.fillStyle = '#e8b838'; c.beginPath(); c.arc(-60 + k * 220, -30 - Math.sin(k * Math.PI) * 70 + k * 100, 22, 0, TAU); c.fill(); c.fillStyle = '#9a7a22'; c.beginPath(); c.arc(-60 + k * 220, -30 - Math.sin(k * Math.PI) * 70 + k * 100, 11, 0, TAU); c.fill(); } }); },
  82(ctx, s) { pop(ctx, s, '“You serve your guests generously.”', (c, T, lu) => { c.fillStyle = '#7a4a2a'; c.fillRect(-340, 90, 680, 36); c.fillRect(-300, 126, 28, 120); c.fillRect(272, 126, 28, 120); for (let i = 0; i < 3; i++) { c.fillStyle = ['#d8a868', '#c8985a', '#e0b878'][i]; c.beginPath(); c.ellipse(-200 + i * 90, 80, 60, 20, 0, 0, TAU); c.fill(); } c.fillStyle = '#5a8aa0'; c.beginPath(); c.moveTo(130, 90); c.quadraticCurveTo(100, -40, 150, -60); c.lineTo(210, -60); c.quadraticCurveTo(260, -40, 230, 90); c.fill(); c.fillStyle = '#e8f4ff'; c.fillRect(150, -80, 60, 24); for (let i = 0; i < 6; i++) { const ph = (T * 0.5 + i / 6) % 1; c.fillStyle = `rgba(255,255,255,${0.5 * (1 - ph)})`; c.beginPath(); c.arc(-200 + (i % 3) * 90 + Math.sin(ph * 6) * 8, 40 - ph * 120, 10 + ph * 12, 0, TAU); c.fill(); } }); },
  83(ctx, s) { pop(ctx, s, '“You assist those hit by calamities.”', (c, T, lu) => { c.fillStyle = '#8a6a50'; [[-300, 130, 160, 70, -0.3], [-140, 150, 200, 50, 0.1], [90, 140, 170, 66, 0.35], [250, 160, 150, 50, -0.1]].forEach(([x, y, w, h, r]) => { c.save(); c.translate(x, y); c.rotate(r); c.fillRect(-w / 2, -h / 2, w, h); c.restore(); }); c.fillStyle = '#a88a6a'; c.fillRect(-200, 60, 60, 50); for (let i = 0; i < 4; i++) { const ph = (T * 0.3 + i / 4) % 1; c.fillStyle = `rgba(120,100,90,${0.3 * (1 - ph)})`; c.beginPath(); c.arc(-100 + i * 70, 40 - ph * 140, 30 + ph * 40, 0, TAU); c.fill(); }
    figure(c, 40, 230, 0.9, { col: '#3a1626', rim: '#fff4d0', pose: 'stand', t: T, hands: [[26, -146, 110, -90]] }); const k = M.springU(lu, 0.9, M.SPRING.bouncy); c.fillStyle = '#e8b838'; c.save(); c.translate(190, 30); c.scale(k, k); c.beginPath(); c.moveTo(0, 30); c.bezierCurveTo(-60, -20, -30, -60, 0, -20); c.bezierCurveTo(30, -60, 60, -20, 0, 30); c.fill(); c.restore(); }); },
  84(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.14, x0: cx, y0: 540 }); env(ctx, c, { kind: 'night', t: T, milky: true, y: 900 }); glow(ctx, cx, 480, 800, '#ffd890', 0.35);
    layer(ctx, c, 1.0, () => { const tilt = Math.sin(T * 0.8) * 0.012; ctx.fillStyle = '#e8c870'; ctx.fillRect(cx - 9, 330, 18, 560); ctx.beginPath(); ctx.moveTo(cx - 90, 900); ctx.lineTo(cx + 90, 900); ctx.lineTo(cx + 50, 850); ctx.lineTo(cx - 50, 850); ctx.fill();
      ctx.save(); ctx.translate(cx, 340); ctx.rotate(tilt); ctx.fillStyle = '#f0d880'; ctx.fillRect(-480, -7, 960, 14); A.disc(ctx, 0, 0, 22, '#fff0b0'); [-1, 1].forEach((sd) => { ctx.save(); ctx.translate(sd * 480, 0); ctx.rotate(-tilt); ctx.strokeStyle = '#e8c870'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-90, 240); ctx.moveTo(0, 0); ctx.lineTo(90, 240); ctx.stroke(); ctx.fillStyle = '#e8c870'; ctx.beginPath(); ctx.ellipse(0, 242, 120, 22, 0, 0, TAU); ctx.fill(); glow(ctx, 0, 230, 140, '#fff0b0', 0.4); ctx.restore(); }); ctx.restore(); });
    rays(ctx, cx, 340, Math.PI * 0.5, 2.4, 1100, '#fff0c0', 0.08, T, 14); caption(ctx, 'THE UNIVERSE IS JUST', cx, 1000, 64, '#fff4dc', { a: sstep(0.6, 1.4, lu), track: 14 }); A.dust(ctx, T, { n: 50, col: '#ffe8b0', a: 0.5, sy: -10 }); A.vignette(ctx, 0.45);
  },
  85(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.12, x0: cx, y0: 760, y1: 420 }); room(ctx, c, T, 0.4); glow(ctx, cx, 480, 900, '#ffd890', 0.45);
    layer(ctx, c, 0.9, () => { for (let i = 0; i < 12; i++) { const x = 200 + i * 150 + (i % 2) * 30; ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.arc(x, 740, 26, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.roundRect(x - 34, 760, 68, 140, 24); ctx.fill(); } figure(ctx, cx, 960, 1.9, { col: WOMAN.col, trim: WOMAN.trim, rim: '#fff4d0', pose: 'stand', t: T }); });
    A.dust(ctx, T, { n: 60, col: '#ffe0a0', a: 0.5, sy: -12 }); A.vignette(ctx, 0.55); lowerThird(ctx, s, 'The first believer', 'BEFORE ANYONE ELSE', 1.6);
  },
  86(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.1, x0: 560, x1: 1360, y0: 540 }); A.sky(ctx, [[0, '#120a06'], [1, '#3a2210']]); glow(ctx, cx, 480, 1100, '#ffa850', 0.3);
    layer(ctx, c, 1.0, () => { ctx.fillStyle = '#4a2c16'; ctx.fillRect(-200, 140, 2400, 800); for (let r = 0; r < 4; r++) { ctx.fillStyle = '#2a1608'; ctx.fillRect(-200, 240 + r * 190, 2400, 16); for (let i = 0; i < 20; i++) { const x = -120 + i * 120 + hash01(i + r * 20, 3) * 40; ctx.fillStyle = mixc('#d8c090', '#a8884a', hash01(i + r * 20, 5)); ctx.beginPath(); ctx.roundRect(x, 160 + r * 190 + hash01(i + r * 20, 7) * 14, 78, 76, 36); ctx.fill(); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.ellipse(x + 38, 200 + r * 190, 20, 30, 0, 0, TAU); ctx.fill(); } } });
    A.dust(ctx, T, { n: 60, col: '#ffe0a0', a: 0.4, sx: 8 }); A.vignette(ctx, 0.5); if (!s.nocap) caption(ctx, 'someone who understands the supernatural', cx, 1000, 42, '#ffe8c0', { font: 'UI', w: 500, track: 5, a: sstep(0.8, 1.8, lu) });
  },
  87(ctx, s) { oldman(ctx, s, { mode: 'wide' }); },
  88(ctx, s) {
    SC4[86](ctx, { ...s, p: 0.8, nocap: true }); A.vignette(ctx, 0.2); lowerThird(ctx, s, 'Waraqah bin Naufal', 'KHADIJAH’S COUSIN', 0.6);
  },
  89(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.2, x0: cx, y0: 560 }); env(ctx, c, { kind: 'dusk', t: T, sun: [260, 600, 60], y: 640 });
    layer(ctx, c, 1.0, () => { ctx.fillStyle = '#2a1214'; ctx.fillRect(-W, 760, W * 3, 800); A.idol(ctx, cx + 120, 820, 1.6, 1, '#5a463c', '#ffb070');
      for (let i = 0; i < 9; i++) { const a = Math.PI * 0.12 + i / 8 * Math.PI * 0.76, x = cx + 120 + Math.cos(a) * 560, y = 900 + Math.sin(a) * 90; const bow = 0.5 + 0.1 * Math.sin(T * 1.2 + i); figure(ctx, x, y, 0.6 + Math.sin(a) * 0.15, { col: '#1a0e10', rim: '#ff9a50', pose: 'stand', t: T + i, lean: bow, flip: Math.cos(a) > 0 ? -1 : 1, hood: i % 2 === 0 }); }
      const x = lerp(cx - 780, cx - 640, ease(lu / 3)); glow(ctx, x, 800, 340, '#fff0c0', 0.6); figure(ctx, x, 980, 1.2, { col: '#e8e0d0', rim: '#ffffff', pose: 'stand', t: T, flip: -1 }); });
    A.dust(ctx, T, { n: 50, col: '#ffb070', a: 0.4 }); A.vignette(ctx, 0.5); caption(ctx, 'a unicorn', cx - 640, 1040, 36, '#fff4dc', { font: 'UI', w: 500, track: 12, a: sstep(2.0, 3.0, lu) });
  },
  90(ctx, s) {
    const { T, p, lu } = s; const c = camAt(p, { z0: 1.0, z1: 1.14, x0: 800, x1: 1100, y0: 560 }); A.sky(ctx, [[0, '#120a06'], [1, '#3a2210']]); glow(ctx, cx, 520, 1000, '#ffa850', 0.35);
    layer(ctx, c, 1.0, () => { ctx.fillStyle = '#4a2c16'; ctx.fillRect(-200, 820, 2400, 400); ctx.save(); ctx.translate(cx, 650); ctx.fillStyle = '#e8d6a8'; ctx.beginPath(); ctx.roundRect(-640, -230, 1280, 380, 14); ctx.fill(); for (let r = 0; r < 7; r++) { const k = clamp((lu * 1.1 - r * 0.45) / 1.0); ctx.fillStyle = '#4a2a14'; ctx.fillRect(-580, -180 + r * 46, 900 * k * (0.7 + hash01(r, 2) * 0.3), 10); } ctx.restore(); });
    [['ABANDONED IDOLS', 0.4], ['BECAME A CHRISTIAN', 2.0], ['TRANSLATES THE GOSPEL', 4.0]].forEach(([w, u0], i) => { const k = M.springU(lu, u0, M.SPRING.bouncy); if (k > 0.02) { ctx.save(); ctx.translate(cx, 250 + i * 0 - (1 - k) * 30); ctx.globalAlpha = clamp(k) * (1 - sstep(u0 + 1.6, u0 + 2.0, lu) * (i < 2 ? 1 : 0)); M.text(ctx, w, 0, 0, M.font(76, 700, 'Display'), '#fff4dc', 'center', 6); ctx.restore(); } });
    A.dust(ctx, T, { n: 40, col: '#ffe0a0', a: 0.4 }); A.vignette(ctx, 0.5);
  },
  91(ctx, s) { oldman(ctx, s, { mode: 'meet' }); quote(ctx, s, '“Listen to your nephew.”', 1.6); },
  92(ctx, s) { oldman(ctx, s, { mode: 'zoom', z1: 1.5 }); },
  93(ctx, s) { oldman(ctx, s, { mode: 'zoom', z1: 1.8, dim: true }); },
  94(ctx, s) {
    const n = 5, i = Math.min(n - 1, Math.floor(s.lu / s.nb * n)), k = s.lu / s.nb * n - i; const f = [SC1[27], SC3[58], SC4[86], SC3[58], SC4[89]][i];
    f(ctx, { ...s, p: clamp(k), lu: clamp(k) * 4, nb: 99, T: s.T + i * 2 }); ctx.fillStyle = `rgba(255,240,200,${0.4 * Math.max(0, 1 - k * 6)})`; ctx.fillRect(0, 0, W, H);
    caption(ctx, ['THE NAMUS', 'KEEPER OF SECRETS', 'THE SAME ANGEL', 'THAT CAME TO', 'MOSES'][i], cx, 150, 72, '#fff4dc', { track: 16, a: 0.95 }); A.vignette(ctx, 0.3);
  },
  95(ctx, s) {
    const { T, p, lu } = s; SC3[58](ctx, { ...s, p, lu: lu + 4, nocap: true }); words(ctx, lu, 0.8, 'NOT CRAZY.', cx, 400, 110, '#fff4dc', { stag: 0.25, track: 14 }); words(ctx, lu, 2.2, 'A PROPHET.', cx, 540, 150, '#ffe0a0', { stag: 0.3, track: 14 });
  },
};

// the old man's room: faceless, wrapped in dark cloth, staff in hand
export function oldman(ctx, s, o = {}) {
  const { T, p, lu } = s; const z1 = o.z1 ?? 1.12; const c = camAt(p, { z0: 1.0, z1, x0: o.mode === 'zoom' ? 1100 : cx, y0: 640 });
  A.sky(ctx, [[0, '#0a0806'], [1, '#2a1c10']]); glow(ctx, 380, 420, 900, o.red ? '#d8301c' : '#ffcf90', 0.3);
  layer(ctx, c, 0.6, () => { ctx.fillStyle = '#3a2a1c'; ctx.fillRect(-400, 60, 2800, 860); for (let i = 0; i < 10; i++) { ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(-300 + i * 260, 60, 4, 860); } ctx.fillStyle = o.red ? '#ff6a40' : '#ffe0a0'; ctx.beginPath(); ctx.roundRect(260, 250, 190, 300, [95, 95, 0, 0]); ctx.fill(); });
  layer(ctx, c, 0.9, () => { ctx.fillStyle = '#2a1a10'; ctx.fillRect(-400, 900, 2800, 400); rays(ctx, 350, 400, Math.PI * 0.08, 0.5, 1300, o.red ? '#ff6a40' : '#ffe0a0', 0.12, T, 8);
    const ox = o.mode === 'wide' ? 1280 : o.mode === 'meet' ? 1440 : 1100; figure(ctx, ox, 920, 1.6, { col: '#0c0806', rim: o.red ? '#ff6a40' : '#ffe0a0', pose: 'sit', t: T, rimDx: -4, trim: '#6a5a4a' }); ctx.fillStyle = '#4a3220'; ctx.fillRect(ox + 110, 540, 10, 380);
    if (o.mode === 'meet') { figure(ctx, 760, 940, 1.5, { col: WOMAN.col, trim: WOMAN.trim, rim: '#ffe0a0', pose: 'stand', t: T, flip: -1, hands: [[26, -146, 80, -130]] }); figure(ctx, 560, 940, 1.5, { col: '#7a2a2e', rim: '#ffe0a0', pose: 'stand', t: T + 1, flip: -1, lean: 0.15 }); } });
  if (o.mode === 'zoom') layer(ctx, c, 1.0, () => { for (let i = 0; i < 4; i++) { const ph = (T * 0.25 + i / 4) % 1; ctx.strokeStyle = `rgba(255,220,160,${0.14 * (1 - ph)})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(1100, 700, 120 + ph * 700, 0, TAU); ctx.stroke(); } });
  A.dust(ctx, T, { n: 60, col: '#ffd8a0', a: 0.4, sx: 6, sy: -8 }); const sm = (i) => { const x = 900 + Math.sin(T * 0.5 + i) * 100 + i * 80, y = 780 - ((T * 40 + i * 120) % 500), r = 90 + i * 16; ctx.fillStyle = A.rad(ctx, x, y, 0, r, [[0, 'rgba(210,200,190,.07)'], [1, 'rgba(210,200,190,0)']]); ctx.fillRect(x - r, y - r, r * 2, r * 2); }; for (let i = 0; i < 5; i++) sm(i);
  A.vignette(ctx, o.dim ? 0.8 : 0.55); if (o.red) A.tint(ctx, '#ff2010', 0.12, 'overlay');
}
