import { run } from './lib/explode.js';
import { grp, box, coins } from '../shared/parts.js';
// Bongkar #3: slip gaji Raka (narasi L32–L34; ilustrasi tarif Austria 1,53%).
run({ title: 'SLIP GAJI RAKA', crumb: 'DIBONGKAR', zoomRef: 50, endBeat: 23.6, camDir: [0.9, 0.7, 1.1], subs: [], palette: { accent: '#3ecf6b' },
  parts: [
    { id: 'slip', pos: [0, -0.8, 0], dir: [0, -1, 0], dist: 0.6, open: 1.0, close: 30, make: (T, std) => grp(T, box(T, std, 2.6, 0.06, 3.2, '#f4f2ec', { roughness: 0.85 }), ...[0, 1, 2, 3, 4].map((i) => box(T, std, 1.6 + (i % 2) * 0.5, 0.07, 0.1, '#9aa3b8', {}, [-0.2, 0.01, -1.1 + i * 0.45]))),
      label: { title: 'SLIP GAJI RAKA', desc: 'ILUSTRASI · tarif Austria', anchor: [1.2, 0.05, 1.4], u0: 1.1, u1: 9.2, side: 'L' }, focus: [1.1, 9.2, 10] },
    { id: 'gaji', pos: [0, 0, 0], dir: [-1, 0.6, 0], dist: 1.6, open: 9.4, close: 30, make: (T, std) => box(T, std, 1.8, 0.7, 1.0, '#3ecf6b', { roughness: 0.4 }),
      label: { title: 'GAJI', desc: 'Rp5.000.000 / bulan', anchor: [-0.9, 0.35, 0.5], u0: 9.5, u1: 16.6, side: 'L', color: '#3ecf6b' }, focus: [9.5, 12.5, 11] },
    { id: 'setoran', pos: [0, 0.2, 0], dir: [1, 0.8, 0], dist: 2.0, open: 12.6, close: 30, make: (T, std) => box(T, std, 0.35, 0.7, 1.0, '#ffb04a', { emissive: '#ff8a1a', emissiveIntensity: 0.35 }),
      label: { title: 'SETORAN 1,53%', desc: 'Rp76.500 / bulan', anchor: [0.18, 0.35, 0.5], u0: 12.7, u1: 16.6, side: 'R', color: '#ffb04a' }, focus: [12.7, 16.6, 10] },
    { id: 'tabungan', pos: [2.4, 1.0, 0], dir: [0, 1, 0], dist: 0.8, open: 16.8, close: 30, make: (T, std) => coins(T, std, 14, 0.4, 0.11),
      animate: (g, u) => { const k = Math.min(1, Math.max(0.05, (u - 16.8) / 5)); g.scale.set(1, k, 1); g.rotation.y = u * 0.5; },
      label: { title: '84 BULAN', desc: '± Rp6,4 juta · belum termasuk hasil', anchor: [0.4, 1.0, 0], u0: 17.0, u1: 23.7, side: 'R', color: '#e8b85c' }, focus: [17.0, 23.7, 13] },
  ],
  cameraKeys: [[0, 11, 0, -0.6, 0], [9, 13, 0.4, 0.2, 0], [16.5, 15, 1.0, 0.8, 0], [24, 17, 1.2, 1.2, 0]] });
