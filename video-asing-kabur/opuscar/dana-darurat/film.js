// Dana darurat → dana cadangan pesangon — Whiteboard Explainer (OpusCar style "whiteboard", engine wb.js, MIT).
// For "Pesangon dititipkan ke negara", narration lines 25–26 (t = 0 at line 25). No hands; floating markers.
// Inks: black = things, blue = process (arrows, water), orange = the one thing that matters ("before / healthy").
import * as W from './engine/wb.js';
const { INK } = W;
export const DUR = 14.94;

export async function build() {
  await W.loadFont('tech', 'fonts/EMSTech.json');
  const tl = new W.Timeline();
  const K = new W.Pen('black', INK.black, { park: [2150, 1250] });
  const O = new W.Pen('orange', INK.orange, { park: [2300, 1150] });
  const B = new W.Pen('blue', INK.blue, { park: [2050, 1350] });
  const PENS = [K, O, B], T = W.text;
  const D = (pen, shapes, a, b, o = {}) => tl.draw(pen, shapes, a, { by: b, ...o });
  // words in several inks on one line: returns [[pen, strokes], ...]
  const words = (parts, cx, y, h) => {
    const ws = parts.map(([s]) => T(s + ' ', 0, y, { h }).width), tot = ws.reduce((a, b) => a + b, 0);
    let x = cx - tot / 2; return parts.map(([s, pen], i) => { const r = [pen, T(s, x, y, { h, w: Math.max(5, h * .13) })]; x += ws[i]; return r; });
  };

  // ghosts of an old lesson
  const ghosts = []; const gR = (i => () => (i = (i * 16807) % 2147483647) / 2147483647)(7);
  for (let i = 0; i < 26; i++) { const x = gR() * 2900 + 50, y = gR() * 1900 + 50, o = { w: 10, alpha: .05 + gR() * .04, color: gR() < .3 ? '#8aa0c8' : '#9aa0a8' };
    ghosts.push(gR() < .4 ? W.circle(x, y, 40 + gR() * 90, o) : gR() < .5 ? W.line(x, y, x + 200 + gR() * 400, y + (gR() - .5) * 60, o) : T(['x = 2', 'hal 4', 'Rp?', 'cek', '→ 3'][i % 5], x, y, { h: 50, ...o })[0]); }

  // ── A · "Bayangkan dana darurat" (0–2.4): title
  D(K, T('DANA DARURAT', 1500, 250, { h: 120, align: 'center', w: 14 }), .15, 1.6);
  D(O, W.curve([[1120, 290], [1350, 278], [1650, 282], [1880, 292]], { w: 12 }), 1.65, 1.95);

  // ── B · left: a jar that fills before you are sick (2.4–4.8)
  const jar = [W.roundRect(520, 430, 300, 330, 46, { w: 9 }), W.line(560, 405, 780, 405, { w: 11 }), W.line(560, 405, 560, 432, { w: 9 }), W.line(780, 405, 780, 432, { w: 9 })];
  D(K, jar, 2.45, 3.25);
  const coins = [[600, 700], [690, 705], [645, 640], [735, 650], [610, 585]].map(([x, y]) => W.circle(x, y, 34, { w: 7 }));
  D(O, coins, 3.25, 4.0);
  D(O, T('Rp', 645, 655, { h: 34, align: 'center', w: 5 }), 4.0, 4.2);
  for (const [pen, s] of words([['nabung', K], ['SEBELUM', O], ['sakit', K]], 670, 880, 58)) D(pen, s, pen === O ? 3.6 : 3.1, pen === O ? 4.3 : 4.75);
  // ── C · right: a hospital bed, a loan you hunt for afterwards (4.8–6.65)
  const bed = [W.rect(1880, 600, 520, 110, { w: 9 }), W.line(1900, 710, 1900, 780, { w: 9 }), W.line(2380, 710, 2380, 780, { w: 9 }), W.roundRect(1900, 560, 140, 46, 20, { w: 7 }), W.circle(2000, 520, 44, { w: 8 })];
  const plus = [W.roundRect(2230, 360, 150, 150, 26, { w: 8 }), W.line(2305, 385, 2305, 485, { w: 13 }), W.line(2255, 435, 2355, 435, { w: 13 })];
  D(K, bed, 4.8, 5.6); D(K, plus, 5.6, 6.0);
  for (const [pen, s] of words([['pinjam', K], ['SETELAH', K], ['sakit', K]], 2140, 880, 58)) D(pen, s, 5.0, 6.5);
  D(B, [W.line(1840, 330, 2440, 930, { w: 16 }), W.line(2440, 330, 1840, 930, { w: 16 })], 6.6, 7.0);

  // ── D · the idea carries over (7.1–9.3)
  D(B, W.arrow(1500, 960, 1500, 1110, { w: 9, head: 30 }), 7.1, 7.45);
  D(K, T('DANA CADANGAN PESANGON', 1500, 1240, { h: 92, align: 'center', w: 12 }), 7.5, 9.2);
  // ── E · left: a healthy factory puts money aside (9.3–12.0)
  const fac = [W.poly([[430, 1720], [430, 1520], [530, 1440], [530, 1520], [630, 1440], [630, 1520], [730, 1440], [730, 1720]], { w: 9 }), W.rect(470, 1600, 60, 120, { w: 7 }),
    W.line(690, 1440, 690, 1360, { w: 9 }), W.line(730, 1440, 730, 1360, { w: 9 }), W.line(690, 1360, 730, 1360, { w: 9 })];
  const smoke = [W.curve([[710, 1340], [680, 1300], [730, 1260], [700, 1220]], { w: 7 })];
  D(K, fac, 9.35, 10.2); D(B, smoke, 10.2, 10.5);
  D(B, W.arrow(760, 1600, 860, 1600, { w: 8, head: 24 }), 10.5, 10.75);
  D(K, W.roundRect(880, 1500, 170, 220, 34, { w: 8 }), 10.75, 11.1);
  D(O, [[920, 1680], [1005, 1680], [962, 1625], [962, 1570]].map(([x, y]) => W.circle(x, y, 26, { w: 6 })), 11.1, 11.6);
  for (const [pen, s] of words([['disisihkan saat', K], ['SEHAT', O]], 740, 1850, 56)) D(pen, s, pen === O ? 11.35 : 10.2, pen === O ? 11.95 : 11.3);
  // ── F · right: the sinking factory — too late to look for money (12.0–14.5)
  const sink = [W.poly([[1950, 1700], [1940, 1530], [2040, 1460], [2045, 1530], [2140, 1465], [2150, 1700]], { w: 9 })];
  const waves = [1, 2, 3].map(k => W.curve([[1820, 1600 + k * 40], [1920, 1580 + k * 40], [2020, 1620 + k * 40], [2120, 1580 + k * 40], [2220, 1620 + k * 40], [2320, 1590 + k * 40]], { w: 8 }));
  D(K, sink, 12.0, 12.5); D(B, waves, 12.5, 13.1);
  for (const [pen, s] of words([['bukan dicari saat', K], ['TENGGELAM', K]], 2120, 1850, 56)) D(pen, s, 12.4, 13.9);
  // ── G · the answer circled
  D(O, W.circle(740, 1120, 520, { w: 12, ry: 880, a0: -2.0 }), 13.85, 14.6);
  tl.end();

  const cam = new W.Camera([
    [0, 1500, 330, 1.25], [1.9, 1480, 380, 1.15], [2.6, 1350, 640, .78], [6.9, 1350, 650, .78],
    [7.4, 1350, 1320, .78], [9.2, 1350, 1330, .78], [9.6, 1350, 1520, .78], [13.6, 1350, 1530, .78],
    [14.55, 1450, 1080, .5], [DUR, 1450, 1080, .505]]);
  const board = new W.Board(tl, { ghosts, W: 3000, H: 2100 });
  board.objs.push({ draw: (ctx, t, c) => { for (const p of PENS) { const pose = W.penPose(p, t, cam); if (pose) W.drawMarker(ctx, p, pose, c, t); } } });
  function render(ctx, t) { board.render(ctx, t, cam); }
  return { dur: DUR, render };
}
