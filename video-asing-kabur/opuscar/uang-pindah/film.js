// Uangnya pindah tempat — Isometric Infographic (OpusCar style "iso-infographic", engine.js from the library, MIT).
// For "Pesangon dititipkan ke negara", narration lines 8–10 (t = 0 at line 8): the law, the reserve fund inside
// the factory, and the fund moving out to a government manager that has not been appointed yet.
import { Iso, PAL, tri, mix, hex, clamp, lerp, seg, ss, eo, eio, back, TAU, hash, pin, haloText, cutLine, ring, iconGrid, person, FONT } from './engine.js';
export const DUR = 23.3;
const W = 1920, H = 1080;
const iso = new Iso(null, W, H);

// colour code (a legend): money mustard (the subject), the factory red, the state blue, paper/doc cream, road stone
const MONEY = PAL.mustard, FAC = ['#D98B6E', '#C46A4E', '#9C4F3A'], STATE = PAL.blue, ROAD = PAL.stone;
const BG = PAL.bg;
const BX = 26, BY = 13, ZB = -2.2;            // the board: x ∈ [0, BX], y ∈ [0, BY]

// ---------- camera: centre + log zoom ----------
const K = [
  [0, 12.4, 8.2, 32], [1.2, 12.4, 8.2, 34], [8.2, 12.3, 8.2, 35.5],
  [9.2, 6.0, 6.0, 58], [17.2, 5.9, 6.0, 61],
  [18.3, 13.6, 8.6, 33], [DUR, 13.8, 8.6, 34.5],
];
function cam(t) {
  let i = 0; while (i < K.length - 2 && t >= K[i + 1][0]) i++;
  const a = K[i], b = K[i + 1], u = eio(seg(t, a[0], b[0]));
  return { x: lerp(a[1], b[1], u), y: lerp(a[2], b[2], u), z: 0, k: Math.exp(lerp(Math.log(a[3]), Math.log(b[3]), u)) };
}

// ---------- the board slab with strata ----------
function board() {
  const g = iso.g;
  iso.add(-1e6, () => {
    const c = [[0, 0, ZB], [BX, 0, ZB], [BX, BY, ZB], [0, BY, ZB]].map(p => iso.P(p[0] + .6, p[1] + .6, p[2] - .4));
    g.save(); g.filter = `blur(${Math.max(2, iso.cam.k * .5)}px)`; iso.poly(c, 'rgba(120,92,60,0.25)'); g.restore();
    const band = (axis, z0, z1, col) => {
      const p = axis === 'x' ? [[BX, 0], [BX, BY]] : [[0, BY], [BX, BY]];
      iso.poly([iso.P(p[0][0], p[0][1], z1), iso.P(p[1][0], p[1][1], z1), iso.P(p[1][0], p[1][1], z0), iso.P(p[0][0], p[0][1], z0)], tri(col)[axis === 'x' ? 2 : 1]);
    };
    for (const a of ['x', 'y']) { band(a, ZB, -1.4, '#5E4631'); band(a, -1.4, -.5, '#8A6544'); band(a, -.5, 0, '#8FB070'); }
    iso.poly([[0, 0], [BX, 0], [BX, BY], [0, BY]].map(p => iso.P(p[0], p[1], 0)), '#D9DDB0');
  }, 0);
}
function road(t) {
  iso.add(-9e5, () => {
    const g = iso.g;
    iso.poly([[9, 5.2], [18.2, 5.2], [18.2, 7.4], [9, 7.4]].map(p => iso.P(p[0], p[1], .01)), ROAD[0]);
    g.save(); g.setLineDash([.6 * iso.cam.k, .5 * iso.cam.k]); g.strokeStyle = '#FBF4E6'; g.lineWidth = .12 * iso.cam.k;
    g.beginPath(); g.moveTo(...iso.P(9.2, 6.3, .02)); g.lineTo(...iso.P(18, 6.3, .02)); g.stroke(); g.restore();
    // plates: the factory yard and the state forecourt
    iso.poly([[1.2, 1.2], [9.8, 1.2], [9.8, 11.4], [1.2, 11.4]].map(p => iso.P(p[0], p[1], .01)), '#E9DCC0');
    iso.poly([[18.2, 1.6], [24.8, 1.6], [24.8, 11], [18.2, 11]].map(p => iso.P(p[0], p[1], .01)), '#E2E6EE');
  }, 0);
}

// ---------- the factory (cut away in beat 2) ----------
const FX0 = 2, FX1 = 9, FY0 = 2.2, FY1 = 10.4, FH = 3.6;
function factory(t) {
  const cut = ss(seg(t, 9.15, 9.6));                   // near skins slide away
  const T3 = iso.desat > 0 ? FAC : FAC;
  iso.box(FX0, FY0, 0, .3, FY1 - FY0, FH, T3, { bias: -2 });           // back wall (x)
  iso.box(FX0, FY0, 0, FX1 - FX0, .3, FH, T3, { bias: -2 });           // back wall (y)
  if (cut < 1) {
    iso.alpha = 1 - cut;
    iso.push(cut * 3, 0, 0); iso.box(FX1 - .3, FY0, 0, .3, FY1 - FY0, FH, T3); iso.pop();
    iso.push(0, cut * 3, 0); iso.box(FX0, FY1 - .3, 0, FX1 - FX0, .3, FH, T3); iso.pop();
    iso.push(0, 0, cut * 5); iso.roof(FX0 - .2, FY0 - .2, FH, FX1 - FX0 + .4, FY1 - FY0 + .4, 2, tri('#8E7D72'), { ridge: 'y' }); iso.pop();
    iso.alpha = 1;
  } else {
    // the cut rims, low
    iso.box(FX1 - .3, FY0, 0, .3, FY1 - FY0, .6, T3); iso.box(FX0, FY1 - .3, 0, FX1 - FX0, .3, .6, T3);
  }
  // chimney + sign stay
  iso.box(FX0 + .6, FY0 + .6, FH, .8, .8, 2.4, tri('#A88C7C'));
}
// inside: machines, three workers, the reserve plate filling with money
const STACKS = []; for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) STACKS.push({ x: 5.2 + c * .85, y: 4.0 + r * .85, i: r * 4 + c });
function inside(t) {
  for (const [x, y] of [[2.8, 7.4], [2.8, 9.1]]) { iso.box(x, y, 0, 1.8, 1.1, 1.0, tri('#6E9A86')); iso.cyl(x + .9, y + .1, 1.25, .25, .9, tri('#A7C2B2'), { axis: 'y' }); }
  // the reserve plate (dashed outline + accent)
  const pa = eo(seg(t, 9.9, 10.4));
  if (pa > 0) iso.add(-8e5, () => {
    const g = iso.g, pts = [[4.8, 3.6], [8.6, 3.6], [8.6, 6.6], [4.8, 6.6]].map(p => iso.P(p[0], p[1], .02));
    g.save(); g.globalAlpha = pa; iso.poly(pts, '#F6E7B8'); g.setLineDash([8, 6]); g.strokeStyle = PAL.ink; g.lineWidth = 2; g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(...p) : g.moveTo(...p)); g.closePath(); g.stroke(); g.restore();
  }, 0);
  // workers by the machines
  [[5.0, 8.3, '#7F98AE'], [6.3, 8.9, '#8C8199'], [7.4, 8.1, '#B9824F']].forEach(([x, y, c], i) => iso.bill(x, y, 0, gg => person(gg, { h: 1.7, body: c, hair: '#2A2624', arm: .25 + .1 * Math.sin(t * 2 + i) })));
}
// money stacks: grow in on the plate (beat 2), then travel to the state building (beat 3)
const PATH = [[6.9, 5.1], [9.6, 6.3], [18.6, 6.3], [20.6, 6.3]];
function along(u) {
  let L = 0; const d = []; for (let i = 1; i < PATH.length; i++) { const l = Math.hypot(PATH[i][0] - PATH[i - 1][0], PATH[i][1] - PATH[i - 1][1]); d.push(l); L += l; }
  let r = u * L; for (let i = 1; i < PATH.length; i++) { if (r <= d[i - 1]) { const f = r / d[i - 1]; return [lerp(PATH[i - 1][0], PATH[i][0], f), lerp(PATH[i - 1][1], PATH[i][1], f)]; } r -= d[i - 1]; }
  return PATH[PATH.length - 1];
}
const DEST = STACKS.map((s, i) => ({ x: 20.4 + (i % 4) * .7, y: 4.4 + Math.floor(i / 4) * .7 }));
function money(t) {
  iso.keep = true;
  for (const s of STACKS) {
    const t0 = 10.4 + s.i * .2, gro = back(seg(t, t0, t0 + .35), 2.2); if (gro <= 0) continue;
    const h = .55 * gro;
    const m0 = 18.6 + s.i * .12, u = eio(seg(t, m0, m0 + 2.4));
    let x = s.x, y = s.y;
    if (u > 0) {
      if (u < 1) { const p = along(u), wob = Math.sin(u * Math.PI); x = lerp(s.x, p[0], Math.min(1, u * 6)); y = lerp(s.y, p[1], Math.min(1, u * 6)); if (u > .15) [x, y] = [p[0] + (s.i % 4 - 1.5) * .25 * wob, p[1] + (Math.floor(s.i / 4) - 1) * .25 * wob]; }
      else { x = DEST[s.i].x; y = DEST[s.i].y; }
      if (u > .92) { const f = seg(u, .92, 1); x = lerp(x, DEST[s.i].x, f); y = lerp(y, DEST[s.i].y, f); }
    }
    iso.cyl(x, y, 0, .3, h, MONEY, { n: 18 });
  }
  iso.keep = false;
}
// ---------- the state building: pediment, columns, a blank sign ----------
function stateBuilding(t) {
  const x0 = 19.4, x1 = 24.2, y0 = 2.4, y1 = 9.8;
  iso.box(x0, y0, 0, x1 - x0, y1 - y0, .5, tri('#E4E8F0'));
  iso.box(x0 + .3, y0 + .3, .5, x1 - x0 - 1.8, y1 - y0 - .6, 3.4, STATE);
  for (let k = 0; k < 4; k++) iso.cyl(x1 - .8, y0 + 1.2 + k * 1.75, .5, .28, 3.0, tri('#F2F4F8'));
  iso.box(x0 + .2, y0 + .2, 3.5, x1 - x0 - .4, y1 - y0 - .4, .4, tri('#EEF0F5'));
  iso.roof(x0 + .2, y0 + .2, 3.9, x1 - x0 - .4, y1 - y0 - .4, 1.4, STATE, { ridge: 'y' });
}
// ---------- the law: a document that drops onto the board ----------
function law(t) {
  const dz = (1 - eo(seg(t, .35, .85))) * 7, sq = 1 - .18 * Math.sin(Math.PI * seg(t, .85, 1.05));
  if (t < .35) return;
  iso.keep = false;
  iso.box(11.2, 8.4, dz, 3.4, 2.4, .35 * sq, tri('#FBF4E6'));
  iso.text3('UU 27/2026', 11.5 + 1.8, 8.5 + 2.2, dz + .36, { size: .62, plane: 'xy', tri: tri('#2E2522'), weight: 600, font: FONT, extrude: 0 });
}
// ---------- the frame ----------
export function render(g, t) {
  iso.g = g; iso.cam = cam(t); iso.alpha = 1; iso.keep = false;
  { const q = new URLSearchParams(location.search).get('cam'); if (q) { const [x, y, k] = q.split(',').map(Number); iso.cam = { x, y, z: 0, k }; } }
  { const b = new URLSearchParams(location.search).get('bg'); g.fillStyle = b ? '#' + b : BG; } g.fillRect(0, 0, W, H);
  // faint iso dot lattice
  g.save(); g.fillStyle = 'rgba(46,37,34,.08)'; for (let i = -6; i < 40; i++) for (let j = -14; j < 30; j++) { const [x, y] = iso.P(i * 1.5, j * 1.5, ZB - 3); if (x > 0 && x < W && y > 0 && y < H) g.fillRect(x, y, 2, 2); } g.restore();
  // focus + context in beat 3: everything but the money fades toward warm grey
  iso.desat = new URLSearchParams(location.search).has('nodesat') ? 0 : .75 * ss(seg(t, 17.8, 18.6));
  board(); road(t); factory(t); inside(t); stateBuilding(t); law(t); money(t);
  iso.flush();
  iso.desat = 0;
  // ---- infographic layer ----
  if (new URLSearchParams(location.search).has('notype')) return;
  const P = (x, y, z) => iso.P(x, y, z);
  pin(iso, 12.6, 9.4, .4, { a: seg(t, .9, 2.4), up: 150, dir: 1, len: 60, title: 'UNDANG-UNDANG', num: '27', unit: 'TAHUN 2026', ts: 30, ns: 54, fade: 1 - ss(seg(t, 8.4, 8.9)) });
  pin(iso, 11.6, 9.0, .4, { a: seg(t, 6.2, 7.6), up: 110, dir: -1, len: 50, title: 'DIUNDANGKAN', num: '28', unit: 'OKT 2026', ts: 30, ns: 54, fade: 1 - ss(seg(t, 8.4, 8.9)) });
  // the cut line around the factory before its skin slides away
  if (t > 8.7 && t < 9.7) cutLine(g, [P(FX1, FY0, FH), P(FX1, FY1, FH), P(FX0, FY1, FH)], seg(t, 8.75, 9.15), { color: PAL.ink });
  pin(iso, 6.7, 5.1, .6, { a: seg(t, 9.8, 11.2), up: 190, dir: 1, len: 70, title: 'PASAL 253', num: 'Dana cadangan', unit: 'PESANGON', ns: 46, ts: 30, fade: 1 - ss(seg(t, 17.4, 17.9)) });
  pin(iso, 6.3, 8.9, 1.7, { a: seg(t, 14.3, 15.6), up: 120, dir: -1, len: 60, title: 'UNTUK HAK PEKERJA SAAT PHK', ts: 30, fade: 1 - ss(seg(t, 17.4, 17.9)),
    icons: (gg, x, y, dir) => iconGrid(gg, x - (dir < 0 ? 4 * 46 : 0), y, 4, clamp((t - 15.2) * 5, 0, 4), 4, 46, (q, a, b, s, on) => { q.save(); q.translate(0, s * .45); person(q, { h: s * .95, body: on ? '#7F98AE' : '#D8CCB6', hair: on ? '#2A2624' : '#CFC2AA' }); q.restore(); }) });
  // beat 3: the route line runs ahead of the money; labels on both ends
  if (t > 17.9) {
    const a = eo(seg(t, 17.9, 18.8)), pts = PATH.map(p => P(p[0], p[1], .05));
    g.save(); g.strokeStyle = '#D0573A'; g.lineWidth = 5; g.lineCap = 'round'; g.lineJoin = 'round'; g.setLineDash([14, 10]);
    let L = 0; const d = []; for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); d.push(l); L += l; }
    let rem = L * a; g.beginPath(); g.moveTo(...pts[0]); for (let i = 1; i < pts.length && rem > 0; i++) { const f = Math.min(1, rem / d[i - 1]); g.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)); rem -= d[i - 1]; } g.stroke(); g.restore();
  }
  pin(iso, 5.0, 4.0, .1, { a: seg(t, 18.0, 19.2), up: 230, dir: -1, len: 50, title: 'TIDAK LAGI DISIMPAN SENDIRI', ts: 30 });
  pin(iso, 21.8, 2.6, 5.3, { a: seg(t, 19.9, 21.3), up: 150, dir: 1, len: 60, title: 'LEMBAGA PEMERINTAH', num: '?', unit: 'BELUM DITUNJUK', ns: 60, ts: 30 });
  const [rx, ry] = P(21.4, 5.6, 1); ring(g, rx, ry, 120, seg(t, 21.0, 21.6), t);
}
