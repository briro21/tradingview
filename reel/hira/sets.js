// Reusable environments + palettes. env() draws sky, celestial body and three terrain layers with parallax.
import * as A from './lib/art.js';
const { W, H, layer, terrain, ridge, sky, glow, sun, moon, stars, milkyway, hazeBand, mixc, rgba } = A;

export const KIND = {
  noon: { sky: [[0, '#f6e3be'], [0.6, '#efc48d'], [1, '#e0a06c']], far: '#d9a477', mid: '#c0794d', near: '#8c4a2c', fg: '#4a2414', figure: '#4a2a1c', rim: '#ffe1b0', haze: '#fff0d0', light: '#ffe6b8' },
  dawn: { sky: [[0, '#2a2744'], [0.45, '#b4604a'], [1, '#f6b97a']], far: '#8a4a48', mid: '#6b3436', near: '#432326', fg: '#230f12', figure: '#1d1013', rim: '#ffc58a', haze: '#ffb878', light: '#ffc48a' },
  dusk: { sky: [[0, '#241a3a'], [0.5, '#a43e30'], [1, '#f08c3e']], far: '#7a3234', mid: '#552329', near: '#34161c', fg: '#1a0a0e', figure: '#1a0c10', rim: '#ff9a50', haze: '#ff9250', light: '#ff9a50' },
  night: { sky: [[0, '#02040f'], [0.6, '#0a1430'], [1, '#1b2c55']], far: '#13203f', mid: '#0d1730', near: '#080e20', fg: '#04070f', figure: '#05070f', rim: '#7e9be0', haze: '#4f6fb8', light: '#9db6ff' },
  red: { sky: [[0, '#150304'], [0.55, '#5e0e12'], [1, '#c2401f']], far: '#6e1a1a', mid: '#4a1012', near: '#2c090b', fg: '#140304', figure: '#0f0405', rim: '#ff6a40', haze: '#d8482a', light: '#ff6a40' },
  grey: { sky: [[0, '#2b2f3a'], [0.6, '#586070'], [1, '#8a8e98']], far: '#5a5f6c', mid: '#454a58', near: '#2f3340', fg: '#1a1c24', figure: '#14161d', rim: '#c8d0e0', haze: '#a8b0c0', light: '#d8e0f0' },
};
export const CROWD = ['#d9d2c0', '#9a6a4a', '#7a8a6a', '#a8483a', '#c8a45a', '#5a6a8a', '#e8e0d0', '#6a4a3a'];

// c = camera. o: {kind, t, sun:[x,y,r], moon:[x,y,r], stars:n, y:horizon base, amp, ridges:true}
export function env(ctx, c, o) {
  const P = KIND[o.kind || 'noon'], t = o.t || 0, hy = o.y ?? 640;
  layer(ctx, c, 0.02, () => { sky(ctx, P.sky, -200, H + 200); });
  if (o.stars || o.kind === 'night') layer(ctx, c, 0.03, () => { if (o.milky) milkyway(ctx, t, 1); else stars(ctx, t, { n: o.stars ?? 180, y0: -100, y1: hy, a: 0.9 }); });
  if (o.sun) layer(ctx, c, 0.05, () => sun(ctx, o.sun[0], o.sun[1], o.sun[2], o.sunCol || '#fff2cf', P.haze));
  if (o.moon) layer(ctx, c, 0.05, () => moon(ctx, o.moon[0], o.moon[1], o.moon[2]));
  if (o.rd !== false) {
    layer(ctx, c, 0.12, () => { (o.jag ? ridge : terrain)(ctx, { y: hy - 70, amp: o.jag ? 120 : 50, freq: 0.0032, seed: 3, col: P.far }); });
    hazeBand(ctx, hy - 20, 90, P.haze, o.kind === 'night' ? 0.18 : 0.38);
    layer(ctx, c, 0.3, () => { terrain(ctx, { y: hy + 10, amp: 55, freq: 0.0036, seed: 8, col: P.mid }); });
    layer(ctx, c, 0.55, () => { terrain(ctx, { y: hy + 90, amp: 48, freq: 0.0042, seed: 14, col: P.near, bot: P.fg }); });
  }
  return P;
}
export function ground(ctx, c, k, y, P, seed = 2, amp = 24) { layer(ctx, c, k, () => { terrain(ctx, { y, amp, freq: 0.006, seed, col: P.near, bot: P.fg }); }); }
// rim-lit robe colour helper
export const robe = (P, i = 0) => ({ col: P.figure, rim: P.rim });
export function crowd(ctx, t, { x0 = 0, x1 = W, y = 820, n = 8, seed = 3, s = 0.5, P, walk = true, colors = CROWD, dirs = 1, spread = 30 }) {
  for (let i = 0; i < n; i++) {
    const q = A.hash01(i, seed), x = x0 + (i + q * 0.6) * (x1 - x0) / n, yy = y + (A.hash01(i, seed + 1) - 0.5) * spread;
    const flip = dirs === 0 ? (q > 0.5 ? 1 : -1) : dirs;
    A.shadowEllipse(ctx, x, yy, 34 * s * 1.4, 0.25);
    A.figure(ctx, x + (walk ? Math.sin(t * 0.7 + i) * 6 : 0), yy, s * (0.9 + q * 0.25), { col: colors ? colors[i % colors.length] : P.figure, rim: P?.rim, pose: walk ? 'walk' : 'stand', t: t + i, flip, hood: q > 0.4, trim: i % 3 === 0 ? '#e8d6a0' : null });
  }
}
