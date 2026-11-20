import * as M from './motion.js';
import * as G from './gl.js';
const { THREE } = G;
const { W, H, FORMAT, E, prog, lerp, clamp, springU, SPRING, TAU, font, hexRgb } = M;
const DISPLAY = 'Display', UI = 'UI';
const lerpHex = (a, b, t) => { const x = hexRgb(a), y = hexRgb(b); return `rgb(${x.map((v, i) => Math.round(lerp(v, y[i], t))).join(',')})`; };
const open = (u, a, b) => clamp(springU(u, a, SPRING.gentle) - springU(u, b, SPRING.gentle), 0, 1.04);
export const std = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.45, metalness: 0, envMapIntensity: 0.9, ...o });

export function run(SPEC) {
  const P = { bg0: '#262422', bg1: '#161514', ink: '#f2f0ec', dim: '#8e8a86', accent: '#e8b85c', c1: '#4aa3ff', c2: '#ffb04a', ...(SPEC.palette || {}) };
  let SET = null;
  function build() {
    const scene = new THREE.Scene(); scene.environment = G.ENV;
    const cam = G.camera(26, 0.5, 600);
    G.keyLights(scene, { key: 2.4, rim: 1.5, fill: 0.7, keyPos: [-8, 14, 14], rimPos: [10, 6, -10] });
    const root = new THREE.Group(); scene.add(root);
    const parts = SPEC.parts.map((p) => {
      const g = new THREE.Group(); g.add(p.make(THREE, std, G)); g.position.set(...(p.pos || [0, 0, 0])); root.add(g);
      const a = new THREE.Object3D(); a.position.set(...(p.label?.anchor || [0, 0, 0])); g.add(a);
      return { ...p, g, a, home: new THREE.Vector3(...(p.pos || [0, 0, 0])), dir: new THREE.Vector3(...(p.dir || [0, 1, 0])).normalize() };
    });
    const roomMats = []; let room = null;
    if (SPEC.room) { room = new THREE.Group(); scene.add(room); SPEC.room(THREE, (c, o = {}) => { const m = std(c, { transparent: true, envMapIntensity: 0.25, ...o }); roomMats.push(m); return m; }, room, G); }
    const dir = new THREE.Vector3(...(SPEC.camDir || [1, 0.55, 1.1])).normalize();
    return { scene, cam, root, parts, room, roomMats, dir };
  }
  const darkAt = (u) => (SPEC.room ? clamp(prog(u, SPEC.dark[0], SPEC.dark[1]) - prog(u, SPEC.dark[2], SPEC.dark[3])) : 1);
  function update(t, u) {
    const S = SET, T = new THREE.Vector3();
    S.parts.forEach((p) => { const k = open(u, p.open, p.close); p.g.position.copy(p.home).addScaledVector(p.dir, (p.dist || 2) * k); if (p.animate) p.animate(p.g, u, k); });
    if (SPEC.animate) SPEC.animate(S.root, u, SET);
    const rv = 1 - darkAt(u);
    if (S.room) { S.roomMats.forEach((m) => { m.opacity = rv; m.transparent = rv < 0.999; }); S.room.visible = rv > 0.01; }
    S.root.updateMatrixWorld(true);
    const K = SPEC.cameraKeys; let a = K[0], b = K[K.length - 1];
    for (let i = 1; i < K.length; i++) if (u <= K[i][0]) { a = K[i - 1]; b = K[i]; break; }
    const q = u <= a[0] ? 0 : u >= b[0] ? 1 : E.inOutCubic((u - a[0]) / (b[0] - a[0]));
    let d = Math.exp(lerp(Math.log(a[1]), Math.log(b[1]), q)); const t3 = [2, 3, 4].map((i) => lerp(a[i], b[i], q));
    S.parts.forEach((p) => {
      if (!p.focus) return;
      const [f0, f1, fd] = p.focus, w = clamp(prog(u, f0, f0 + 2) - prog(u, f1 - 2, f1)); if (w <= 0) return;
      p.a.getWorldPosition(T); for (let i = 0; i < 3; i++) t3[i] = lerp(t3[i], [T.x, T.y, T.z][i], w * 0.85);
      d = Math.exp(lerp(Math.log(d), Math.log(fd), w));
    });
    const dd = d * (FORMAT.portrait ? 1.0 : 0.82);
    S.cam.position.set(t3[0] + S.dir.x * dd, t3[1] + S.dir.y * dd, t3[2] + S.dir.z * dd);
    S.cam.lookAt(...t3); S.cam.updateMatrixWorld(true); S.dist = d;
  }
  function background(ctx, u) {
    const d = darkAt(u), g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, lerpHex('#ecebe6', P.bg0, d)); g.addColorStop(1, lerpHex('#d8d4cb', P.bg1, d)); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    if (d > 0.01) { ctx.save(); ctx.globalAlpha = d * 0.9; ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 2; const step = 64, off = (u * 0.8) % step; ctx.beginPath();
      for (let x = -off; x < W; x += step) { ctx.moveTo(x, 0); ctx.lineTo(x, H); } for (let y = 0; y < H; y += step) { ctx.moveTo(0, y); ctx.lineTo(W, y); } ctx.stroke(); ctx.restore(); }
  }
  const proj = (o) => { const v = new THREE.Vector3(); o.getWorldPosition(v); v.project(SET.cam); return [(v.x * 0.5 + 0.5) * W, (-v.y * 0.5 + 0.5) * H]; };
  function label(ctx, p, i, u) {
    const L = p.label; if (!L) return;
    const pr = E.outCubic(prog(u, L.u0, L.u0 + 0.9)), al = pr * (1 - E.inCubic(prog(u, L.u1 - 0.6, L.u1))); if (al <= 0.01) return;
    const s = FORMAT.safe, [ax, ay] = proj(p.a), left = (L.side || (i % 2 ? 'R' : 'L')) === 'L';
    ctx.save(); ctx.globalAlpha = al; ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 10;
    const tf = `700 36px ${UI}`, df = `400 26px ${UI}`;
    ctx.letterSpacing = '4px'; ctx.font = tf; const tw = ctx.measureText(L.title).width;
    ctx.letterSpacing = '1px'; ctx.font = df; const dw = ctx.measureText(L.desc || '').width;
    const w = Math.max(tw, dw) + 4, x0 = left ? s.x : s.x + s.w - w, lo = s.y + 260, hi = s.y + s.h - 200;
    const ty = clamp(ay < (lo + hi) / 2 ? ay + 170 : ay - 230, lo, hi), ly = ty + 52;
    ctx.shadowBlur = 0; ctx.fillStyle = 'rgba(14,13,12,0.62)'; ctx.beginPath(); ctx.roundRect(x0 - 18, ty - 42, w + 36, 100, 14); ctx.fill(); ctx.shadowBlur = 10;
    ctx.textAlign = 'left'; const sl = (1 - pr) * (left ? -40 : 40);
    ctx.fillStyle = '#fff'; ctx.letterSpacing = '4px'; ctx.font = tf; ctx.fillText(L.title, x0 + sl, ty);
    ctx.fillStyle = 'rgba(255,255,255,0.62)'; ctx.letterSpacing = '1px'; ctx.font = df; ctx.fillText(L.desc || '', x0 + sl, ty + 34);
    ctx.shadowBlur = 0; ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.lineWidth = 3; ctx.lineJoin = 'round';
    const ex = left ? x0 + w : x0, pts = [[left ? x0 : x0 + w, ly], [ex, ly], [ax, ay]];
    const sg = [Math.hypot(pts[1][0] - pts[0][0], pts[1][1] - pts[0][1]), Math.hypot(pts[2][0] - pts[1][0], pts[2][1] - pts[1][1])];
    let rem = pr * (sg[0] + sg[1]); ctx.beginPath(); ctx.moveTo(...pts[0]);
    const a1 = Math.min(1, rem / sg[0]); ctx.lineTo(lerp(pts[0][0], pts[1][0], a1), lerp(pts[0][1], pts[1][1], a1)); rem -= sg[0];
    if (rem > 0) { const a2 = Math.min(1, rem / sg[1]); ctx.lineTo(lerp(pts[1][0], pts[2][0], a2), lerp(pts[1][1], pts[2][1], a2)); }
    ctx.stroke();
    const r = 11 * E.outBack(prog(u, L.u0 + 0.5, L.u0 + 1.1), 2), pulse = 1 + 0.25 * Math.sin(u * TAU * 0.5), col = L.color || (i % 2 ? P.c1 : P.c2);
    if (r > 0) { ctx.fillStyle = col; ctx.globalAlpha = al * 0.28; ctx.beginPath(); ctx.arc(ax, ay, r * 2.2 * pulse, 0, TAU); ctx.fill(); ctx.globalAlpha = al; ctx.beginPath(); ctx.arc(ax, ay, r, 0, TAU); ctx.fill(); }
    ctx.restore();
  }
  function hud(ctx, u) {
    const s = FORMAT.safe, d = darkAt(u); ctx.save();
    ctx.font = `700 28px ${UI}`; ctx.letterSpacing = '4px'; ctx.textAlign = 'left';
    if (d < 0.5 && SPEC.context) { ctx.globalAlpha = 1 - d * 2; ctx.fillStyle = '#8a867c'; ctx.fillText(SPEC.context, s.x, s.y + 24); }
    if (d >= 0.5) { ctx.globalAlpha = (d - 0.5) * 2; ctx.fillStyle = P.dim; const a = SPEC.title + ' › '; ctx.fillText(a, s.x, s.y + 24); ctx.fillStyle = P.accent; ctx.fillText(SPEC.crumb || 'DIBONGKAR', s.x + ctx.measureText(a).width, s.y + 24); }
    ctx.globalAlpha = 1; ctx.letterSpacing = '0px';
    const z = Math.max(1, Math.round((SPEC.zoomRef || 52) / SET.dist)), zt = '×' + z;
    ctx.fillStyle = d > 0.5 ? P.ink : '#2a2824'; ctx.font = `800 84px ${DISPLAY}`; ctx.fillText(zt, s.x, s.y + 112);
    const zw = ctx.measureText(zt).width; ctx.font = `400 28px ${UI}`; ctx.letterSpacing = '4px'; ctx.fillStyle = P.dim; ctx.fillText('ZOOM', s.x + zw + 16, s.y + 112);
    ctx.restore();
  }
  function subtitles(ctx, u) {
    const cue = SPEC.subs.find(([a, b]) => u >= a && u < b); if (!cue) return;
    const [a, b, text] = cue, s = FORMAT.safe, size = FORMAT.portrait ? 78 : 66;
    ctx.save(); ctx.font = `800 ${size}px ${DISPLAY}`; ctx.letterSpacing = '-1px'; ctx.textAlign = 'left'; ctx.lineJoin = 'round';
    const words = text.split(' '), lines = []; let cur = '';
    words.forEach((w) => { const t2 = cur ? cur + ' ' + w : w; if (ctx.measureText(t2).width > s.w && cur) { lines.push(cur); cur = w; } else cur = t2; }); lines.push(cur);
    const lh = size * 1.18, baseY = s.y + s.h - 24 - (lines.length - 1) * lh, out = E.inCubic(prog(u, b - 0.35, b)); let idx = 0;
    lines.forEach((ln, li) => { let x = s.x + (s.w - ctx.measureText(ln).width) / 2;
      ln.split(' ').forEach((w) => { const k = E.outBack(prog(u, a + idx * 0.22, a + idx * 0.22 + 0.5), 2); idx++;
        if (k > 0.01) { const y = baseY + li * lh + (1 - k) * 36 - out * 20; ctx.globalAlpha = Math.min(1, k) * (1 - out); ctx.strokeStyle = 'rgba(0,0,0,0.55)'; ctx.lineWidth = 14; ctx.strokeText(w, x, y); ctx.fillStyle = '#fff'; ctx.fillText(w, x, y); }
        x += ctx.measureText(w).width + ctx.measureText(' ').width; }); });
    ctx.restore();
  }
  const HITS = SPEC.hits || [[0, 'buka', 'tick'], ...SPEC.parts.flatMap((p) => [[p.open, p.id + ' terangkat', 'pop', { pitch: 'A4' }], ...(p.label ? [[p.label.u0, p.id + ' label', 'blip', { pitch: 'E6' }]] : [])]), [SPEC.endBeat, 'akhir', 'impact']];
  M.film({
    fonts: [font(100, 800, DISPLAY), font(40, 700, UI), font(40, 400, UI)], hits: HITS, samples: SPEC.samples || 4,
    async init() { await G.initGL({}); SET = build(); },
    draw(ctx, u, t) {
      update(t, u); background(ctx, u); G.renderSet(ctx, { scene: SET.scene, camera: SET.cam, bloom: 0, update() {} }, t, u);
      SET.parts.forEach((p, i) => label(ctx, p, i, u)); hud(ctx, u); subtitles(ctx, u);
    },
  });
}
