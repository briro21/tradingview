// Upah minimum = lantai, bukan tangga — Isometric People Scene (OpusCar style, engine.js/kit.js from the library, MIT).
// UMP 2027 video, narration lines 29–33 (t = 0 at line 29). Sari (8 months) stands on the minimum-wage floor and rises
// with it; Raka (3 years) stands higher, on the company's own wage scale, and the floor rising below him changes nothing.
import { C, W, H, TOPS, LEGS, iso, tri, mix, hex, TAU, clamp, lerp, seg, ss, eo, eio, onPlane, fillPoly, font, phraseLayout, floorType, drawPerson } from './kit.js';
export const DUR = 42.22;

const SLAB = { x: 3, y: 5.6, w: 4, d: 4 }, BLOCK = { x: 3, y: .6, w: 4, d: 4, h: 1.25 };
const slabH = t => lerp(.3, .75, eio(seg(t, 16.6, 19.2)));
const SARI = { h: 1.62, top: TOPS[1], legs: LEGS[1], hairLong: true };
const RAKA = { h: 1.72, top: '#C9864F', legs: LEGS[0] };
const FT = 10.3, FY = 9.8;
const PH = {
  lantai: { x: FT, y: FY, t0: .3, t1: 8.8, step: .16, lines: [[['LANTAI', 'na']], [['BUKAN TANGGA', 'ns']]], indent: 0 },
  sari:   { x: FT, y: FY, t0: 9.3, t1: 16.2, step: .16, lines: [[['SARI', 'n']], [['8 BULAN BEKERJA', 'ns']]], indent: 0 },
  naik:   { x: FT, y: FY, t0: 16.7, t1: 24.8, step: .16, scale: .9, lines: [[['+Rp407 RIBU', 'na']], [['WAJIB IKUT NAIK', 'ns']]], indent: 0 },
  raka:   { x: FT, y: FY, t0: 25.2, t1: 31.2, step: .16, lines: [[['RAKA', 'n']], [['3 TAHUN · Rp6,5 JT', 'ns']]], indent: 0 },
  skala:  { x: FT, y: FY, t0: 31.6, t1: 99, step: .16, scale: .9, lines: [[['SKALA UPAH', 'na']], [['DITENTUKAN PERUSAHAAN', 'ns']]], indent: 0 },
};
const LAY = {}; for (const k in PH) LAY[k] = phraseLayout(PH[k]);
const cam = t => ({ x: lerp(6.9, 6.6, ss(t / DUR)), y: lerp(5.9, 5.6, ss(t / DUR)), z: .9, k: lerp(80, 86, ss(t / DUR)) });

function sign(x, y, z, w, h, text, col, ink, a = 1, size = .42) {   // a sign on a +x face (plane 'yz'), reads up-right
  if (a <= 0) return;
  onPlane(iso.g, x, y, z, 'yz', g2 => {
    g2.globalAlpha = a; g2.fillStyle = col; g2.fillRect(0, 0, w, h);
    g2.fillStyle = ink; g2.font = font(700, 100, 'Newsreader'); g2.textBaseline = 'middle';
    g2.save(); g2.scale(size / 100 * 1, size / 100); g2.fillText(text, .18 / (size / 100), h / 2 / (size / 100)); g2.restore();
  });
}
function topText(x, y, z, text, a, col, size = .62) {   // text lying on a top face, reading up-right
  if (a <= 0) return;
  onPlane(iso.g, x, y, z + .005, 'xy', g2 => { g2.globalAlpha = a; g2.fillStyle = col; g2.font = font(700, 100, 'Newsreader'); g2.textBaseline = 'alphabetic'; g2.scale(size / 100, size / 100); g2.fillText(text, 0, 0); });
}
function sariPos(t) {
  const u = eio(seg(t, 9.3, 12.2)), x = lerp(8.2, 4.1, u), y = 8.4;
  const onSlab = ss(seg(x, 7.4, 6.8));
  return { x, y, z: onSlab * slabH(t), walking: t > 9.3 && t < 12.2, phase: (x - 8.2) / .7 * Math.PI };
}

export function render(g, t, Q) {
  iso.g = g; iso.cam = cam(t); iso.alpha = 1;
  { const q = new URLSearchParams(location.search).get('cam'); if (q) { const [x, y, k] = q.split(',').map(Number); iso.cam = { x, y, z: .9, k }; } }
  const NOTYPE = new URLSearchParams(location.search).has('notype');
  { const b = new URLSearchParams(location.search).get('bg'); g.fillStyle = b ? '#' + b : C.bg; } g.fillRect(0, 0, W, H);
  fillPoly(g, [[0, 0], [14, 0], [14, 10.5], [0, 10.5]].map(([x, y]) => iso.P(x, y, 0)), C.carpet);
  // accent outline: the floor the law guarantees
  const oa = eo(seg(t, .6, 1.6));
  if (oa > 0) { const P = [[SLAB.x - .25, SLAB.y - .25], [SLAB.x + SLAB.w + .25, SLAB.y - .25], [SLAB.x + SLAB.w + .25, SLAB.y + SLAB.d + .25], [SLAB.x - .25, SLAB.y + SLAB.d + .25], [SLAB.x - .25, SLAB.y - .25]].map(([x, y]) => iso.P(x, y, .01));
    g.save(); g.globalAlpha = oa; g.strokeStyle = C.accent; g.lineWidth = .1 * iso.cam.k; g.beginPath(); P.forEach((p, i) => i ? g.lineTo(...p) : g.moveTo(...p)); g.stroke(); g.restore(); }
  if (!NOTYPE) for (const k in PH) floorType(g, t, PH[k], LAY[k]);

  // back wall
  iso.add(-1e3, () => { iso.boxNow(-.35, -.3, 0, .35, 11, 3.6, tri('#EFE6D6'));
    onPlane(g, 0, 9.6, 3.1, 'yz', g2 => { g2.fillStyle = C.green; g2.fillRect(0, 0, 5.2, .72); g2.fillStyle = '#FAF4E8'; g2.font = font(600, 100, 'Newsreader'); g2.textBaseline = 'middle'; g2.save(); g2.scale(.0042, .0042); g2.fillText('PT MAJU TEKSTIL · KANTOR', .2 / .0042, .36 / .0042); g2.restore(); });
  }, .5);
  // the minimum-wage floor (rises in January) with its sign
  const h = slabH(t);
  iso.add(SLAB.x + SLAB.w / 2 + SLAB.y + SLAB.d / 2 + h / 2, () => {
    iso.boxNow(SLAB.x, SLAB.y, 0, SLAB.w, SLAB.d, h, tri(C.ginger));
    const v = t < 18 ? 'Rp5,73 jt' : 'Rp6,14 jt', a = eo(seg(t, 1.0, 1.5)) * (t < 18 ? 1 - ss(seg(t, 17.4, 17.9)) : ss(seg(t, 18.0, 18.5)));
    topText(SLAB.x + SLAB.w - .2, SLAB.y + SLAB.d - .25, h, v, a, t >= 18 ? C.accent : C.ink);
    topText(SLAB.x + SLAB.w - 1.0, SLAB.y + SLAB.d - .25, h, 'UPAH MINIMUM', eo(seg(t, 1.0, 1.5)), C.ink, .32);
  });
  // the company's wage scale: steps behind Raka, the top one with a question mark
  const sa = eo(seg(t, 31.6, 32.6));
  iso.add(BLOCK.x + BLOCK.w / 2 + BLOCK.y + BLOCK.d / 2 + BLOCK.h / 2, () => {
    iso.boxNow(BLOCK.x, BLOCK.y, 0, BLOCK.w, BLOCK.d, BLOCK.h, tri(C.green));
    topText(BLOCK.x + BLOCK.w - .2, BLOCK.y + BLOCK.d - .25, BLOCK.h, 'Rp6,5 jt', eo(seg(t, 26.5, 27.0)), '#FAF4E8');
  });
  for (let k = 0; k < 3; k++) {
    const hh = BLOCK.h + (k + 1) * .45 * sa, x0 = BLOCK.x - (k + 1) * 1.0;
    if (sa <= 0) break;
    iso.box(x0, BLOCK.y, 0, 1.0, BLOCK.d, hh, tri(hex(mix(C.green, '#FFF8EA', .15 + k * .12))), { bias: -1 });
  }
  if (sa > 0) iso.add(20, () => {
    const [sx, sy] = iso.P(BLOCK.x - 1.6, BLOCK.y + 4.9, BLOCK.h + 1.6), k = iso.cam.k;
    g.save(); g.globalAlpha = sa; g.fillStyle = C.accent; g.beginPath(); g.arc(sx, sy, .45 * k, 0, TAU); g.fill();
    g.fillStyle = '#fff'; g.font = `700 ${.62 * k}px Newsreader`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('?', sx, sy + .03 * k); g.restore();
  }, 2);
  // people
  const s = sariPos(t);
  iso.bill(s.x, s.y, s.z, gg => drawPerson(gg, SARI, { walking: s.walking, phase: s.phase }), { bias: .8 });
  const ra = eo(seg(t, 25.0, 25.6));
  if (ra > 0) iso.bill(4.2, 2.6, BLOCK.h - (1 - ra) * .3, gg => { gg.globalAlpha = ra; drawPerson(gg, RAKA, {}); }, { bias: .8 });
  // a little arrow when the floor rises, beside Sari
  const up = seg(t, 16.6, 19.2) * (1 - seg(t, 23.5, 24.5));
  if (up > 0) iso.add(30, () => { const [sx, sy] = iso.P(7.5, 5.2, .9 + h), k = iso.cam.k; g.save(); g.globalAlpha = Math.min(1, up * 3); g.fillStyle = C.accent;
    g.beginPath(); g.moveTo(sx, sy - .9 * k); g.lineTo(sx + .32 * k, sy - .45 * k); g.lineTo(sx + .11 * k, sy - .45 * k); g.lineTo(sx + .11 * k, sy + .2 * k); g.lineTo(sx - .11 * k, sy + .2 * k); g.lineTo(sx - .11 * k, sy - .45 * k); g.lineTo(sx - .32 * k, sy - .45 * k); g.closePath(); g.fill(); g.restore(); }, 2);
  iso.flush();
}
