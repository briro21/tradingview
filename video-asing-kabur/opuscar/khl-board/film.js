// KHL vs UMP — Whiteboard Explainer (OpusCar style "whiteboard", engine wb.js, MIT). UMP 2027 video, lines 18–22 (t = 0 at line 18).
// Inks: black = things, blue = measurement (KHL lines, axes), orange = what matters (the 2027 wage that applies).
import * as W from './engine/wb.js';
const { INK } = W;
export const DUR = 53.86;

export async function build() {
  await W.loadFont('tech', 'fonts/EMSTech.json');
  const tl = new W.Timeline();
  const K = new W.Pen('black', INK.black, { park: [2150, 1250] });
  const O = new W.Pen('orange', INK.orange, { park: [2300, 1150] });
  const B = new W.Pen('blue', INK.blue, { park: [2050, 1350] });
  const PENS = [K, O, B], T = W.text;
  const D = (pen, shapes, a, b, o = {}) => tl.draw(pen, shapes, a, { by: b, ...o });
  const ghosts = []; const gR = (i => () => (i = (i * 16807) % 2147483647) / 2147483647)(11);
  for (let i = 0; i < 24; i++) { const x = gR() * 3000 + 50, y = gR() * 2000 + 50, o = { w: 10, alpha: .05 + gR() * .04, color: gR() < .3 ? '#8aa0c8' : '#9aa0a8' };
    ghosts.push(gR() < .5 ? W.circle(x, y, 40 + gR() * 90, o) : W.line(x, y, x + 200 + gR() * 400, y + (gR() - .5) * 60, o)); }

  // ── title: KHL (0–7.8)
  D(K, T('KHL', 1500, 330, { h: 190, align: 'center', w: 20 }), .1, .9);
  D(K, T('= kebutuhan hidup layak', 1500, 500, { h: 80, align: 'center', w: 10 }), 1.0, 3.2);
  D(B, T('perkiraan biaya hidup 1 pekerja / bulan', 1500, 630, { h: 58, align: 'center', w: 7 }), 4.8, 7.4);
  // ── the rule (7.9–18.8)
  D(O, T('UMP jauh di bawah KHL', 1500, 800, { h: 66, align: 'center', w: 8 }), 10.0, 12.2);
  D(B, W.arrow(1500, 840, 1500, 960, { w: 9, head: 28 }), 12.4, 12.8);
  D(O, T('kenaikan bisa jauh lebih besar dari rumus', 1500, 1060, { h: 66, align: 'center', w: 8 }), 14.6, 17.6);

  // ── charts: 1 juta = 110 px, baseline y = 1950
  const BY = 2250, S = 110, bar = (x, v, w = 180) => W.rect(x, BY - v * S, w, v * S, { w: 8 });
  const hatch = (x, v, w = 180) => W.hatch([[x + 8, BY - v * S + 8], [x + w - 8, BY - v * S + 8], [x + w - 8, BY - 8], [x + 8, BY - 8]], { w: 7, gap: 26 });
  // Bali (18.9–37)
  D(K, W.line(300, BY, 1350, BY, { w: 8 }), 18.9, 19.3);
  D(K, T('BALI', 820, 1470, { h: 90, align: 'center', w: 11 }), 18.9, 19.6);
  D(K, bar(420, 3.2), 19.8, 20.6); D(K, T('2026', 510, BY + 80, { h: 50, align: 'center', w: 6 }), 20.6, 21.0);
  D(K, T('Rp3,2 jt', 510, BY - 3.2 * S - 30, { h: 50, align: 'center', w: 6 }), 21.0, 21.6);
  D(O, bar(760, 4.56), 22.0, 23.0); D(O, hatch(760, 4.56), 23.0, 24.0);
  D(K, T('2027', 850, BY + 80, { h: 50, align: 'center', w: 6 }), 23.0, 23.4);
  D(O, T('Rp4,6 jt', 850, BY - 4.56 * S - 30, { h: 54, align: 'center', w: 7 }), 24.0, 24.5);
  D(B, W.dashed([[330, BY - 5.6 * S], [1330, BY - 5.6 * S]], { w: 8 }), 25.0, 26.2);
  D(B, T('KHL Rp5,6 jt', 1150, BY - 5.6 * S - 34, { h: 54, align: 'center', w: 7 }), 26.3, 27.2);
  D(O, T('+42%', 1180, BY - 3.4 * S, { h: 80, align: 'center', w: 10 }), 29.2, 30.2);
  D(O, T('baru 81% dari KHL', 820, BY + 200, { h: 64, align: 'center', w: 8 }), 31.6, 34.3);
  // Jawa Barat (37.2–53.9)
  D(K, W.line(1750, BY, 2850, BY, { w: 8 }), 37.2, 37.6);
  D(K, T('JAWA BARAT', 2300, 1470, { h: 90, align: 'center', w: 11 }), 37.2, 38.4);
  D(K, bar(1880, 3.0), 38.6, 39.4); D(K, T('UMP Jabar', 1970, BY + 80, { h: 50, align: 'center', w: 6 }), 39.4, 40.0);
  D(K, T('Rp3 jt', 1970, BY - 3.0 * S - 30, { h: 54, align: 'center', w: 7 }), 40.0, 40.6);
  D(O, bar(2380, 6.0), 46.6, 47.8); D(O, hatch(2380, 6.0), 47.8, 48.8);
  D(K, T('UMK Bekasi', 2470, BY + 80, { h: 50, align: 'center', w: 6 }), 44.0, 45.0);
  D(O, T('± Rp6 jt', 2470, BY - 6.0 * S - 30, { h: 54, align: 'center', w: 7 }), 51.9, 52.6);
  D(O, W.circle(2470, BY - 330, 190, { w: 10, ry: 420 }), 52.6, 53.6);
  tl.end();

  const cam = new W.Camera([
    [0, 1500, 420, 1.15], [7.4, 1500, 470, 1.08], [8.2, 1500, 700, .95], [18.4, 1500, 720, .93],
    [19.2, 830, 1930, .92], [36.6, 840, 1950, .9],
    [37.6, 2300, 1830, .95], [52.0, 2310, 1810, .93],
    [53.3, 1580, 1330, .48], [DUR, 1580, 1330, .49]]);
  const board = new W.Board(tl, { ghosts, W: 3200, H: 2700 });
  board.objs.push({ draw: (ctx, t, c) => { for (const p of PENS) { const pose = W.penPose(p, t, cam); if (pose) W.drawMarker(ctx, p, pose, c, t); } } });
  return { dur: DUR, render: (ctx, t) => board.render(ctx, t, cam) };
}
