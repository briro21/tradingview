// Pabrik bangkrut, kasnya kosong — Isometric People Scene (OpusCar style) for "Pesangon dititipkan ke negara", Bagian 2.
// One world built once: a cut-away textile factory (back wall tall, near walls low), its gate, and the yard behind it.
// Timed to narration lines 19–22 (t = 0 at line 19). Everything is a pure function of t.
import { C, W, H, TOPS, LEGS, iso, tri, mix, hex, css, TAU, clamp, lerp, seg, ss, eo, eio, hash,
  onPlane, fillPoly, rect, tracePath, font, phraseLayout, floorType, drawPerson } from './kit.js';

export const DUR = 37.42;

// ---------- palette additions (stay inside the colour logic: warm paper, one ink, accent only for the rule) ----------
const FLOOR = '#E7DDCB', FLOOR_DARK = '#D6CBB7', YARD = C.apron, WALL = '#EFE6D6', LOW = '#E4D9C6';
const MACH = C.green, MACH_LT = C.greenLt, SAFE = '#5E6660', OFF = '#8F887B', GLOW = '#F3D98E';
const KURATOR = { h: 1.74, top: '#4E4A55', legs: '#2E3036' };
const BANKER = { h: 1.76, top: '#34506E', legs: '#2A2D33' };

// ---------- world ----------
const FX = 15, FY = 11.3;                       // factory floor x ∈ [0, FX], y ∈ [0, FY]
const MC = [2.6, 6.0, 9.4];                     // machine centres (y); machines at x ∈ [2.0, 4.2]
const MX0 = 2.0, MX1 = 4.2, MD = 2.2, MH = 1.25;
const LINE_X = 5.1;                             // workers stand and walk along this line
const GATE0 = 3.95, GATE1 = 6.45;               // gate gap in the y = 0 wall
const SAFE_B = { x: 9.6, y: 4.2, w: 1.2, d: 1.2, h: 1.45 };
const SLOT = i => -12.4 + 1.15 * i;             // queue slots in the yard (y), head first

// workers: two per machine, sorted by y (the one nearest the gate leaves first)
const WORKERS = [];
MC.forEach(c => { WORKERS.push(c - .55, c + .55); });
WORKERS.sort((a, b) => a - b);
const PEOPLE = WORKERS.map((y0, i) => ({
  y0, i, ts: 6.3 + .55 * i, target: SLOT(i),
  p: { h: 1.64 + hash(i * 7 + 1) * .12, top: TOPS[(i * 3 + 1) % 4], legs: LEGS[i % 4], hairLong: i === 1 || i === 4 },
}));
const RECEIVER = 3;                              // the worker who is paid from the cash box in beat 1

// trapezoid walk: accelerate .35 s, cruise at v, decelerate .35 s. returns {s, moving}
function walk(t, t0, d, v = 1.8) {
  const a = .35, T = d / v + a;
  if (t <= t0) return { s: 0, m: 0 };
  const u = t - t0;
  if (u >= T) return { s: d, m: 0 };
  // integral of a speed ramp 0 → v over a seconds, hold, ramp down
  const acc = v / a;
  let s;
  if (u < a) s = .5 * acc * u * u;
  else if (u < T - a) s = .5 * v * a + v * (u - a);
  else { const r = T - u; s = d - .5 * acc * r * r; }
  return { s: clamp(s, 0, d), m: 1 };
}

// ---------- shots and camera ----------
const KEY = (a, b, f) => ({ x: lerp(a.x, b.x, f), y: lerp(a.y, b.y, f), z: 0, k: lerp(a.k, b.k, f) });
const CAM = {
  a0: { x: 8.4, y: 6.6, k: 66 }, a1: { x: 8.5, y: 6.5, k: 70 },
  b1: { x: 8.4, y: 6.2, k: 73 },
  c0: { x: 7.6, y: -7.0, k: 66 }, c1: { x: 7.4, y: -7.3, k: 69 },
  d0: { x: 8.6, y: 6.8, k: 66 }, d1: { x: 8.5, y: 6.7, k: 69 },
  e0: { x: 7.0, y: -1.8, k: 48 }, e1: { x: 6.9, y: -2.0, k: 50 },
  f0: { x: 6.2, y: -6.0, k: 60 }, f1: { x: 6.1, y: -6.2, k: 63 },
};
export function camAt(t) {
  if (t < 5.75) return KEY(CAM.a0, CAM.a1, ss(seg(t, 0, 5.75)));
  if (t < 10.3) return KEY(CAM.a1, CAM.b1, ss(seg(t, 5.75, 10.3)));
  if (t < 15.9) return t < 11.7 ? KEY(CAM.b1, CAM.c0, eio(seg(t, 10.3, 11.7))) : KEY(CAM.c0, CAM.c1, ss(seg(t, 11.7, 15.9)));
  if (t < 20.31) return t < 17.0 ? KEY(CAM.c1, CAM.d0, eio(seg(t, 15.9, 17.0))) : KEY(CAM.d0, CAM.d1, ss(seg(t, 17.0, 20.31)));
  if (t < 29.37) return t < 21.6 ? KEY(CAM.d1, CAM.e0, eio(seg(t, 20.31, 21.6))) : KEY(CAM.e0, CAM.e1, ss(seg(t, 21.6, 29.37)));
  return t < 30.5 ? KEY(CAM.e1, CAM.f0, eio(seg(t, 29.37, 30.5))) : KEY(CAM.f0, CAM.f1, ss(seg(t, 30.5, DUR)));
}

// ---------- floor type (Latin, Newsreader: n = big ink, na = big accent) ----------
const FT_X = 12.9, FT_Y = 8.8;                   // factory strip: glyphs x ∈ [11.55, 12.9] (2nd line to 14.56), reading from y = 8.8 toward −y
const YT_X = 10.6, YT_Y = -3.0;                  // yard strip
const PH = {
  kas:    { x: FT_X, y: FT_Y, t0: .7, t1: 5.5, step: .16, scale: .9, lines: [[['DARI ', 'n'], ['KAS', 'na']]] },
  kosong: { x: FT_X, y: FT_Y, t0: 8.3, t1: 10.5, step: .16, scale: .9, lines: [[['KAS', 'n']], [['KOSONG', 'na']]], indent: 0 },
  dulu:   { x: YT_X, y: YT_Y, t0: 11.6, t1: 15.7, step: .16, scale: .9, lines: [[['PEKERJA', 'na']], [['DIDAHULUKAN', 'n']]], indent: 0 },
  jual:   { x: FT_X, y: FT_Y, t0: 17.1, t1: 20.15, step: .16, scale: .9, lines: [[['DIJUAL ', 'na']], [['KURATOR', 'n']]], indent: 0 },
  tunggu: { x: YT_X, y: YT_Y, t0: 21.7, t1: 29.2, step: .16, scale: .9, lines: [[['MENUNGGU', 'n']]] },
  bank:   { x: YT_X, y: YT_Y, t0: 29.9, t1: 32.45, step: .16, scale: .82, lines: [[['DIJAMINKAN', 'n']], [['KE ', 'n'], ['BANK', 'na']]], indent: 0 },
  bagi:   { x: YT_X, y: YT_Y, t0: 32.8, t1: 99, step: .16, scale: .82, lines: [[['DIBAGI', 'n']], [['BANYAK ', 'n'], ['PIHAK', 'na']]], indent: 0 },
};
const LAY = {}; for (const k in PH) LAY[k] = phraseLayout(PH[k]);

// text drawn flat on the floor (labels, the month counter): baseline along x = x0, reading toward −y
function floorText(g, s, x0, y0, size, col, a = 1, w = 600, align = 'left') {
  if (a <= 0) return;
  onPlane(g, x0, y0, 0, 'xy', g2 => {
    g2.globalAlpha = a; g2.font = font(w, 100, 'Newsreader'); g2.fillStyle = col; g2.textBaseline = 'alphabetic'; g2.textAlign = align;
    g2.scale(size / 100, size / 100); g2.fillText(s, 0, 0);
  });
}

// ---------- lights ----------
const OFF_T = [6.0, 6.55, 7.1];                  // machine lamps go out far → near
const WIN_OFF = 7.6;
const lit = (t, i) => 1 - ss(seg(t, OFF_T[i], OFF_T[i] + .35));
const dark = t => ss(seg(t, 6.0, 8.0));
function spin(t, i) { const w = 5, t0 = OFF_T[i]; if (t < t0) return w * t; const u = t - t0; return w * t0 + w * .6 * (1 - Math.exp(-u / .6)); }

// ---------- solids ----------
function wallRun(x0, x1, y, d, h, col, o = {}) {      // a long low wall along x, cut into short pieces so the sort holds
  for (let x = x0; x < x1 - 1e-6; x += 1.5) iso.box(x, y, 0, Math.min(1.5, x1 - x), d, h, tri(col), o);
}
function wallRunY(x, y0, y1, w, h, col) {
  for (let y = y0; y < y1 - 1e-6; y += 1.5) iso.box(x, y, 0, w, Math.min(1.5, y1 - y), h, tri(col));
}

function backWall(g, t) {
  iso.add(-1e3, () => {
    iso.boxNow(-.35, -.3, 0, .35, FY + .6, 4.4, tri(WALL));
    // windows (lit warm until the factory goes dark)
    const wl = 1 - ss(seg(t, WIN_OFF, WIN_OFF + .5));
    for (let k = 0; k < 6; k++) {
      const yb = 1.0 + k * 1.75 + 1.25;
      onPlane(g, 0, yb, 3.95, 'yz', g2 => {
        g2.fillStyle = hex(mix('#B9B3A6', GLOW, wl)); g2.fillRect(0, 0, 1.25, 1.0);
        g2.fillStyle = hex(mix(WALL, '#FFF8EA', .4)); g2.fillRect(.6, 0, .05, 1.0);
      });
    }
    // factory name, on a green band
    onPlane(g, 0, 5.6, 2.55, 'yz', g2 => {
      g2.fillStyle = MACH; g2.fillRect(0, 0, 4.6, .78);
      g2.fillStyle = '#FAF4E8'; g2.font = font(600, 100, 'Newsreader'); g2.textBaseline = 'middle';
      g2.save(); g2.scale(.0046, .0046); g2.fillText('PT MAJU TEKSTIL', .22 / .0046, .39 / .0046); g2.restore();
    });
    // the sale banner (beat 4)
    const ba = eo(seg(t, 18.8, 19.25));
    if (ba > 0) onPlane(g, 0, 10.4, 2.65 - (1 - ba) * .25, 'yz', g2 => {
      g2.globalAlpha = ba; g2.fillStyle = C.ginger; g2.fillRect(0, 0, 3.4, .95);
      g2.fillStyle = C.ink; g2.font = font(700, 100, 'Newsreader'); g2.textBaseline = 'middle';
      g2.save(); g2.scale(.0062, .0062); g2.fillText('DIJUAL', .55 / .0062, .5 / .0062); g2.restore();
    });
  }, .5);
}

function machine(g, t, i) {
  const c = MC[i], y0 = c - MD / 2, L = lit(t, i);
  iso.add(MX0 + MD / 2 + c + .6, () => {
    iso.boxNow(MX0, y0, 0, MX1 - MX0, MD, MH, tri(MACH));
    iso.boxNow(MX0 + .15, y0 + .15, MH, .7, MD - .3, .55, tri(hex(mix(MACH, '#2A2E29', .15))));
    // roller with cloth (spins while the lamp is on)
    const a = spin(t, i);
    iso.cylNow(MX0 + 1.35, y0 + .2, MH + .32, .3, MD - .4, tri(MACH_LT), { axis: 'y', spin: a, n: 16, stripe: k => (k % 4 < 2 ? hex(mix(MACH_LT, '#FFF8EA', .25)) : MACH_LT) });
    // lamp on top
    iso.boxNow(MX0 + .25, c - .2, MH + .55, .35, .4, .28, tri(hex(mix(OFF, GLOW, L))));
    // sale tag on the +x face (beat 4)
    const ta = eo(seg(t, [18.3, 17.8, 17.3][i], [18.3, 17.8, 17.3][i] + .4));
    if (ta > 0) onPlane(g, MX1 + .01, c + .75, MH - .2 + (1 - ta) * .15, 'yz', g2 => {
      g2.globalAlpha = ta; g2.fillStyle = C.ginger; g2.fillRect(0, 0, 1.6, .62);
      g2.fillStyle = C.ink; g2.font = font(700, 100, 'Newsreader'); g2.textBaseline = 'middle';
      g2.save(); g2.scale(.0034, .0034); g2.fillText('DIJUAL', .16 / .0034, .32 / .0034); g2.restore();
    });
  });
}

function glowPools(g, t) {
  for (let i = 0; i < 3; i++) {
    const L = lit(t, i); if (L <= 0) continue;
    const c = MC[i], pts = [];
    for (let k = 0; k < 28; k++) { const a = k / 28 * TAU; pts.push(iso.P(MX1 + 1.0 + Math.cos(a) * 1.3, c + Math.sin(a) * 1.25, 0)); }
    fillPoly(g, pts, GLOW, .42 * L);
  }
}

// the cash box: door on its +y face, hinged at its +x edge
function safe(g, t) {
  const S = SAFE_B, X1 = S.x + S.w, Y1 = S.y + S.d;
  const open = t < 7 ? ss(seg(t, .9, 1.5)) * (1 - ss(seg(t, 4.6, 5.3))) : ss(seg(t, 8.2, 8.85));
  const full = t < 6;
  iso.add(S.x + S.w / 2 + S.y + S.d / 2 + .7, () => {
    iso.boxNow(S.x, S.y, 0, S.w, S.d, S.h, tri(SAFE), { skip: open > .02 ? [1] : [] });
    if (open > .02) {
      // the inside, seen through the open front
      const fr = .1, ins = [[S.x + fr, Y1, fr], [X1 - fr, Y1, fr], [X1 - fr, Y1, S.h - fr], [S.x + fr, Y1, S.h - fr]];
      iso.face3([[S.x, Y1, 0], [X1, Y1, 0], [X1, Y1, S.h], [S.x, Y1, S.h]], tri(SAFE), { out: [0, 1, 0] });
      fillPoly(g, ins.map(p => iso.P(...p)), '#2B2925');
      // shelf
      fillPoly(g, [[S.x + fr, Y1 - .05, .72], [X1 - fr, Y1 - .05, .72], [X1 - fr, Y1, .69], [S.x + fr, Y1, .69]].map(p => iso.P(...p)), '#4A4640');
      if (full) for (const [cx, cz] of [[.3, .12], [.6, .12], [.9, .12], [.3, .74], [.6, .74], [.9, .74]])
        iso.cylNow(S.x + cx, Y1 - .25, cz, .12, .26, tri(C.ginger), { n: 14 });
      // door, swung outward about the hinge at x = X1
      const th = open * 1.75, dw = S.w - .02, ex = X1 - Math.cos(th) * dw, ey = Y1 + Math.sin(th) * dw;
      iso.face3([[X1, Y1, .02], [ex, ey, .02], [ex, ey, S.h - .02], [X1, Y1, S.h - .02]], tri(hex(mix(SAFE, '#FFF8EA', .08))), { both: true });
    } else {
      // closed door detail: a wheel and a seam
      const [hx, hy] = iso.P(S.x + S.w * .5, Y1, S.h * .55), k = iso.cam.k;
      g.save(); g.strokeStyle = '#3A3E3B'; g.lineWidth = .045 * k; g.beginPath(); g.ellipse(hx, hy, .16 * k, .16 * k, 0, 0, TAU); g.stroke();
      g.beginPath(); g.moveTo(hx - .16 * k, hy); g.lineTo(hx + .16 * k, hy); g.moveTo(hx, hy - .16 * k); g.lineTo(hx, hy + .16 * k); g.stroke(); g.restore();
    }
  });
  // desk beside it
  iso.box(8.0, 4.25, 0, 1.3, 1.1, .74, tri('#C9A97E'));
}

// coins that leave the cash box toward the worker being paid (beat 1)
const PAY0 = 1.9, PAY1 = 4.3;
const PATH1 = [[10.2, 6.55], [5.85, 6.55]];
function payCoins(g, t) {
  if (t < PAY0 - .2 || t > 4.8) return;
  const f = eio(seg(t, PAY0, PAY1)), x = lerp(PATH1[0][0], PATH1[1][0], f), y = PATH1[0][1];
  const a = (1 - ss(seg(t, 4.3, 4.75))) * ss(seg(t, PAY0 - .2, PAY0 + .1));
  iso.alpha = a;
  iso.cyl(x, y, 0, .14, .3, tri(C.ginger), { n: 14 });
  iso.alpha = 1;
}
function arrow(g, pts, p, a = 1) {      // a flat accent arrow on the floor, grown to fraction p
  if (p <= 0 || a <= 0) return;
  const S = pts.map(([x, y]) => iso.P(x, y, 0)), k = iso.cam.k;
  g.save(); g.globalAlpha = a; g.strokeStyle = C.accent; g.lineWidth = .16 * k; g.lineCap = 'round'; g.lineJoin = 'round';
  tracePath(g, S, p);
  if (p > .97) {
    const [x1, y1] = pts[pts.length - 1], [x0, y0] = pts[pts.length - 2], L = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / L, uy = (y1 - y0) / L;
    const tip = [x1 + ux * .35, y1 + uy * .35], l = [x1 - uy * .38, y1 + ux * .38], r = [x1 + uy * .38, y1 - ux * .38];
    fillPoly(g, [tip, l, r].map(q => iso.P(q[0], q[1], 0)), C.accent, ss(seg(p, .97, 1)));
  }
  g.restore();
}
function outline(g, x0, x1, y0, y1, p, a = 1, col = C.accent, lw = .1) {
  if (p <= 0 || a <= 0) return;
  const S = [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]].map(([x, y]) => iso.P(x, y, 0));
  g.save(); g.globalAlpha = a; g.strokeStyle = col; g.lineWidth = lw * iso.cam.k; g.lineJoin = 'round'; tracePath(g, S, p); g.restore();
}

// ---------- the gate: posts, lintel, a sliding gate that the bank closes and chains (beat 6) ----------
function gate(g, t) {
  iso.box(GATE0 - .3, -.35, 0, .3, .35, 2.7, tri(LOW));
  iso.box(GATE1, -.35, 0, .3, .35, 2.7, tri(LOW));
  iso.box(GATE0 - .3, -.35, 2.7, GATE1 - GATE0 + .6, .35, .42, tri(MACH));
  const cl = eio(seg(t, 30.6, 31.6)), gx = lerp(GATE1 + .15, GATE0 + .02, cl), gw = GATE1 - GATE0 - .04;
  for (let k = 0; k <= 8; k++) iso.box(gx + k * gw / 8 - .025, -.68, .05, .05, .05, 1.85, tri('#6A6E68'));
  iso.box(gx, -.69, 1.82, gw, .07, .08, tri('#6A6E68'));
  iso.box(gx, -.69, .1, gw, .07, .08, tri('#6A6E68'));
  // chain and padlock
  const ch = eo(seg(t, 31.7, 32.3));
  if (ch > 0) {
    const pts = []; for (let k = 0; k <= 10; k++) { const f = k / 10; pts.push([lerp(GATE0 + .4, GATE1 - .4, f), -.62, 1.05 - Math.sin(f * Math.PI) * .32]); }
    iso.add(GATE0 + 1.2 - .6 + 1.05 + .5, () => {
      const S = pts.map(p => iso.P(...p)); g.save(); g.strokeStyle = C.ink; g.lineWidth = .07 * iso.cam.k; g.setLineDash([.12 * iso.cam.k, .06 * iso.cam.k]); tracePath(g, S, ch); g.restore();
      const la = ss(seg(t, 32.1, 32.4));
      if (la > 0) { iso.alpha = la; const m = pts[5]; iso.boxNow(m[0] - .16, m[1] - .05, m[2] - .34, .32, .12, .3, tri(C.accent)); iso.alpha = 1;
        const [sx, sy] = iso.P(m[0], m[1] + .07, m[2] - .03), k = iso.cam.k; g.save(); g.globalAlpha = la; g.strokeStyle = C.ink; g.lineWidth = .04 * k; g.beginPath(); g.arc(sx, sy, .1 * k, Math.PI, 0); g.stroke(); g.restore(); }
    });
  }
}

// ---------- weeds that grow while everyone waits (beat 5) ----------
const WEEDS = [];
for (let n = 0; WEEDS.length < 46 && n < 400; n++) {
  const yard = hash(n * 3.1) < .55;
  const x = yard ? .6 + hash(n * 5.7) * 15.5 : 5.8 + hash(n * 5.7) * 6.5, y = yard ? -14 + hash(n * 9.3) * 12.8 : .6 + hash(n * 9.3) * 10.2;
  if (yard && Math.abs(x - LINE_X) < .9) continue;
  if (yard && x > 8.6 && x < 12.8 && y < -2.2) continue;            // keep the yard type clear
  if (yard && x < 3.2 && y < -3.4 && y > -13.4) continue;           // and the share-out squares
  if (yard && x > 3.4 && x < 7 && y > -1.6) continue;               // and the gate
  if (!yard && Math.abs(y - 6.55) < .5) continue;
  if (!yard && x > 7.6 && y > 3.8 && y < 7.4) continue;
  if (!yard && x > 11.2 && y > 1.6 && y < 9.2) continue;
  WEEDS.push({ x, y, t0: 21.8 + hash(n * 1.7) * 6.2, s: .55 + hash(n * 2.3) * .5 });
}
function weeds(t) {
  for (const w of WEEDS) {
    const f = eo(seg(t, w.t0, w.t0 + .9)); if (f <= 0) continue;
    iso.bill(w.x, w.y, 0, gg => {
      const s = w.s * f * .42, T = tri(C.greenMid, .2, .2);
      for (const [dx, a, c] of [[-.05, -.45, T[2]], [.05, .4, T[1]], [0, 0, T[0]]]) {
        gg.save(); gg.translate(dx, 0); gg.rotate(a); gg.beginPath(); gg.moveTo(-.03, 0); gg.quadraticCurveTo(0, -s * 1.2, .02, -s); gg.lineTo(.03, 0); gg.closePath(); gg.fillStyle = c; gg.fill(); gg.restore();
      }
    }, { r: 1 });
  }
}

// ---------- share-out of the sale money (beat 7) ----------
const SQ = { bank: [1.2, -12.1], lain: [1.2, -8.6], kerja: [1.2, -5.1] };
const PILE = []; for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) PILE.push([1.2 + (r - 1) * .42, -8.6 + (c - 1.5) * .42]);
const DEST = PILE.map((p, i) => i < 7 ? 'bank' : i < 10 ? 'lain' : 'kerja');
function shareOut(g, t) {
  if (t < 32.4) return;
  // squares and labels
  const sa = ss(seg(t, 33.4, 33.9));
  for (const k of ['bank', 'lain', 'kerja']) {
    const [x, y] = SQ[k]; outline(g, x - .95, x + .95, y - .95, y + .95, ss(seg(t, 33.3, 34.0)), 1, C.ink, .05);
  }
  floorText(g, 'BANK', SQ.bank[0] + 1.55, SQ.bank[1] + .9, .62, C.ink, sa);
  floorText(g, 'LAINNYA', SQ.lain[0] + 1.55, SQ.lain[1] + .9, .62, C.ink, sa);
  floorText(g, 'PEKERJA', SQ.kerja[0] + 1.55, SQ.kerja[1] + .9, .62, C.ink, sa);
  const ha = ss(seg(t, 32.9, 33.3)) * (1 - ss(seg(t, 33.4, 33.7)));
  floorText(g, 'HASIL JUAL', SQ.lain[0] + 1.55, SQ.lain[1] + 1.2, .62, C.soft, ha);
  // stacks drop in, then slide to their square
  PILE.forEach((p, i) => {
    const td = 32.5 + i * .06, a = ss(seg(t, td, td + .25)); if (a <= 0) return;
    const z = (1 - eo(seg(t, td, td + .35))) * .9;
    const d = DEST[i], ts = 34.1 + (d === 'bank' ? 0 : .25) + (i % 4) * .05, f = eio(seg(t, ts, ts + 1.1));
    let [x, y] = p;
    if (d !== 'lain') { const [qx, qy] = SQ[d], j = d === 'bank' ? i : i - 10, gx = qx + ((j % 3) - 1) * .42, gy = qy + (Math.floor(j / 3) - 1) * .42; x = lerp(x, gx, f); y = lerp(y, gy, f); }
    iso.alpha = a; iso.cyl(x, y, z, .15, .34, tri(C.ginger), { n: 14 }); iso.alpha = 1;
  });
}

// ---------- people ----------
function personAt(t, P) {
  const d = P.y0 - P.target, w = walk(t, P.ts, d);
  return { x: LINE_X, y: P.y0 - w.s, s: w.s, m: w.m };
}
function drawWorkers(g, t) {
  PEOPLE.forEach(P => {
    const q = personAt(t, P), sway = Math.sin(t * 1.3 + P.i * 1.7) * .012;
    const carry = P.i === RECEIVER && t > 4.35;
    iso.bill(q.x, q.y, 0, gg => {
      gg.translate(q.m ? 0 : sway, 0);
      drawPerson(gg, P.p, { walking: q.m > 0, phase: q.s / .72 * Math.PI });
      if (carry) { const h = P.p.h, a = ss(seg(t, 4.35, 4.75)); gg.globalAlpha = a; const T = tri(C.ginger); gg.fillStyle = T[1]; gg.fillRect(.13 * h, -.56 * h, .12 * h, .08 * h); gg.fillStyle = T[0]; gg.fillRect(.13 * h, -.56 * h, .12 * h, .025 * h); gg.globalAlpha = 1; }
    });
    globalThis.__POS?.push({ i: P.i, k: 'w', x: q.x, y: q.y, a: 1 });
  });
}
// the curator walks in along the front of the factory, stops, and strikes the gavel
const KUR = { y: 10.6, x0: 16.6, x1: 7.0, t0: 13.8 };
function curator(g, t) {
  if (t < KUR.t0) return;
  const w = walk(t, KUR.t0, KUR.x0 - KUR.x1), x = KUR.x0 - w.s;
  iso.bill(x, KUR.y, 0, gg => {
    drawPerson(gg, KURATOR, { walking: w.m > 0, phase: w.s / .74 * Math.PI });
    const h = KURATOR.h; gg.fillStyle = '#FAF4E8'; gg.fillRect(-.21 * h, -.58 * h, .1 * h, .14 * h); gg.fillStyle = '#7A5A3A'; gg.fillRect(-.19 * h, -.6 * h, .06 * h, .025 * h);
  });
  globalThis.__POS?.push({ i: 90, k: 'w', x, y: KUR.y, a: 1 });
}
// the bank officer walks along the yard side of the wall to the gate (beat 6)
const BNK = { y: -1.25, x0: 16.8, x1: 7.25, t0: 24.6 };
function banker(g, t) {
  if (t < BNK.t0) return;
  const w = walk(t, BNK.t0, BNK.x0 - BNK.x1), x = BNK.x0 - w.s;
  iso.bill(x, BNK.y, 0, gg => { drawPerson(gg, BANKER, { walking: w.m > 0, phase: w.s / .74 * Math.PI }); const h = BANKER.h, T = tri('#3A2E26'); gg.fillStyle = T[1]; gg.fillRect(-.24 * h, -.42 * h, .12 * h, .1 * h); });
  globalThis.__POS?.push({ i: 91, k: 'w', x, y: BNK.y, a: 1 });
}

// ---------- the month counter (beat 5) ----------
function months(g, t) {
  const a = ss(seg(t, 22.4, 22.8)) * (1 - ss(seg(t, 29.0, 29.3))); if (a <= 0) return;
  const n = 1 + Math.floor(13 * clamp((t - 22.6) / 5.4));
  const pulse = 1 - eo(seg(t, 22.6 + (n - 1) * 5.4 / 13, 22.6 + (n - 1) * 5.4 / 13 + .3));
  const x = YT_X + 1.85 * .9;
  floorText(g, 'BULAN KE-', x, YT_Y, 1.05, C.ink, a, 600);
  // number in the accent, after the words
  const off = 6.25;
  floorText(g, String(n), x, YT_Y - off, 1.35 * (1 + .08 * pulse), C.accent, a, 600);
}

// ---------- the frame ----------
export function render(g, t, Q) {
  iso.g = g; iso.cam = camAt(t); iso.alpha = 1;
  { const q = new URLSearchParams(location.search).get('cam'); if (q) { const [x, y, k] = q.split(',').map(Number); iso.cam = { x, y, z: 0, k }; } }
  g.fillStyle = C.bg; g.fillRect(0, 0, W, H);
  // ground: yard, then the factory floor (darkens when the lights go out)
  fillPoly(g, [[-.3, -15], [17.5, -15], [17.5, -.3], [-.3, -.3]].map(([x, y]) => iso.P(x, y, 0)), YARD);
  g.save(); g.strokeStyle = C.apronJoint; g.lineWidth = 1.2;
  for (let x = 0; x <= 17.5; x += 3.5) { const a = iso.P(x, -15, 0), b = iso.P(x, -.3, 0); g.beginPath(); g.moveTo(...a); g.lineTo(...b); g.stroke(); }
  for (let y = -15; y <= -.3; y += 3.5) { const a = iso.P(-.3, y, 0), b = iso.P(17.5, y, 0); g.beginPath(); g.moveTo(...a); g.lineTo(...b); g.stroke(); }
  g.restore();
  fillPoly(g, [[0, 0], [FX, 0], [FX, FY], [0, FY]].map(([x, y]) => iso.P(x, y, 0)), hex(mix(FLOOR, FLOOR_DARK, dark(t))));
  glowPools(g, t);
  // painted walkway to the gate
  g.save(); g.setLineDash([.5 * iso.cam.k, .35 * iso.cam.k]); g.strokeStyle = C.ginger; g.globalAlpha = .55; g.lineWidth = .07 * iso.cam.k;
  for (const dx of [-.75, .75]) { const a = iso.P(LINE_X + dx, .2, 0), b = iso.P(LINE_X + dx, FY - .3, 0); g.beginPath(); g.moveTo(...a); g.lineTo(...b); g.stroke(); }
  g.restore();

  // floor marks of the rule
  arrow(g, PATH1, eo(seg(t, 1.5, 2.4)), 1 - ss(seg(t, 4.6, 5.2)));
  const S = SAFE_B;
  outline(g, S.x - .35, S.x + S.w + .35, S.y - .35, S.y + S.d + 1.55, eo(seg(t, 8.7, 9.5)), 1 - ss(seg(t, 10.2, 10.8)));
  const hq = SLOT(0);
  outline(g, LINE_X - .55, LINE_X + .55, hq - .55, hq + .55, eo(seg(t, 11.9, 12.6)), 1 - ss(seg(t, 15.6, 16.2)));
  if (!Q?.has?.('notype')) for (const k in PH) floorType(g, t, PH[k], LAY[k]);
  if (!Q?.has?.('notype')) months(g, t);
  shareOut(g, t);

  // solids and people, one sorted queue
  backWall(g, t);
  wallRun(0, GATE0 - .3, -.3, .3, 1.0, LOW); wallRun(GATE1 + .3, FX + .3, -.3, .3, 1.0, LOW);
  wallRunY(FX, 0, FY - 1.4, .3, .5, LOW);                          // near walls low (cut-away); a gap where the curator walks in
  wallRun(0, FX + .3, FY, .3, .5, LOW);
  gate(g, t);
  for (let i = 0; i < 3; i++) machine(g, t, i);
  safe(g, t); payCoins(g, t);
  weeds(t);
  drawWorkers(g, t); curator(g, t); banker(g, t);
  iso.flush();
}
