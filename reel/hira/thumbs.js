// YouTube thumbnails, drawn with the same kit as the film. Rendered at negative times: t=-1 -> A, -2 -> B, -3 -> C.
import * as A from './lib/art.js';
const { W, H, glow, rays, figure, rgba, TAU } = A;
function fit(ctx, s, size, maxW) { ctx.font = `800 ${size}px Thumb`; ctx.letterSpacing = '-3px'; const w = ctx.measureText(s).width; return w > maxW ? size * maxW / w : size; }
function txt(ctx, s, x, y, size, col, align = 'left', maxW = 1e9) {
  size = fit(ctx, s, size, maxW); ctx.save(); ctx.font = `800 ${size}px Thumb`; ctx.letterSpacing = '-3px'; ctx.textAlign = align; ctx.lineJoin = 'round';
  ctx.lineWidth = size * 0.13; ctx.strokeStyle = 'rgba(12,6,0,.95)'; ctx.strokeText(s, x, y); ctx.fillStyle = col; ctx.fillText(s, x, y); ctx.restore();
}
const arch = (ctx, x, base, w, top, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x - w, base); ctx.lineTo(x - w, top); ctx.arc(x, top, w, Math.PI, 0); ctx.lineTo(x + w, base); ctx.fill(); };
const KH = { col: '#4a1a30', trim: '#f0c040', rim: '#fff4d0' };
function A_(ctx) {
  A.sky(ctx, [[0, '#241206'], [1, '#8a5420']]); glow(ctx, 1330, 460, 1200, '#ffd890', 0.75);
  arch(ctx, 1330, 1080, 300, 430, '#e8b860'); arch(ctx, 1330, 1080, 240, 440, '#fff3c8');
  rays(ctx, 1330, 520, Math.PI * 0.5, 1.8, 1100, '#fff0c0', 0.16, 0, 10);
  figure(ctx, 1330, 1130, 3.6, { ...KH, pose: 'stand', t: 0 });
  txt(ctx, '“NEVER!”', 70, 560, 320, '#fff4dc', 'left', 940);
  ctx.fillStyle = '#ffc84a'; ctx.fillRect(80, 600, 760, 14);
  txt(ctx, "KHADIJAH’S ANSWER", 76, 730, 88, '#ffc84a', 'left', 940);
}
function B_(ctx) {
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W / 2, H); ctx.clip(); A.sky(ctx, [[0, '#0e1630'], [1, '#2a3f7a']]); A.stars(ctx, 1, { n: 80, y1: 600 }); glow(ctx, 420, 600, 700, '#8fa8ff', 0.4);
  figure(ctx, 440, 1010, 3.3, { col: '#080a18', rim: '#a8c0ff', pose: 'hands', t: 0, shiver: 3, rimDx: 4 }); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(W / 2, 0, W / 2, H); ctx.clip(); A.sky(ctx, [[0, '#4a2a0c'], [1, '#d89a40']]); glow(ctx, 1450, 560, 900, '#fff0c0', 0.8);
  rays(ctx, 1450, 520, Math.PI * 0.5, 1.8, 1000, '#fff0c0', 0.14, 0, 9); figure(ctx, 1450, 1060, 3.5, { ...KH, pose: 'stand', t: 0 }); ctx.restore();
  ctx.fillStyle = '#fff4d0'; ctx.fillRect(W / 2 - 4, 0, 8, H);
  txt(ctx, 'SHE STAYED', W / 2, 250, 250, '#fff4dc', 'center', 1740);
}
function C_(ctx) {
  A.sky(ctx, [[0, '#03050e'], [1, '#12204a']]); A.stars(ctx, 2, { n: 140, y1: 800, big: 0.2 }); A.moon(ctx, 1680, 190, 70); glow(ctx, 470, 620, 900, '#ffd890', 0.7);
  arch(ctx, 470, 1080, 250, 520, '#d8a850'); arch(ctx, 470, 1080, 200, 530, '#fff0c0'); figure(ctx, 470, 1120, 3.7, { ...KH, pose: 'stand', t: 0 });
  txt(ctx, 'SHE', 900, 420, 230, '#fff4dc', 'left', 960); txt(ctx, 'BELIEVED', 900, 650, 230, '#fff4dc', 'left', 960); txt(ctx, 'FIRST', 900, 900, 300, '#ffc84a', 'left', 960);
}
export const TH = [A_, B_, C_];
