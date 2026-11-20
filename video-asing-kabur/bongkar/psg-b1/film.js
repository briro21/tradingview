import { run } from './lib/explode.js';
import { grp, box, coins, factory, vault, doc } from '../shared/parts.js';
// Bongkar #1: dasar hukum dana cadangan pesangon (narasi L8–L10 video pesangon; 1 ketukan = 1 detik).
run({ title: 'DANA PESANGON', crumb: 'DIBONGKAR', zoomRef: 60, endBeat: 23.3, camDir: [1, 0.55, 1.15], subs: [],
  parts: [
    { id: 'uu', pos: [0, -1.4, 0], dir: [0, -1, 0], dist: 1.0, open: 1.2, close: 30, make: (T, std) => doc(T, std),
      label: { title: 'UU 27/2026', desc: 'Pelindungan Ketenagakerjaan', anchor: [1.2, 0.05, 0.8], u0: 1.3, u1: 8.4, side: 'L' }, focus: [1.3, 8.4, 11] },
    { id: 'pabrik', pos: [0, 0, 0], dir: [0, 0.4, 0], dist: 0.3, open: 8.7, close: 30, make: (T, std) => factory(T, std),
      label: { title: 'PERUSAHAAN', desc: 'Pasal 253: wajib dana cadangan', anchor: [-1.5, 0.4, 0.9], u0: 8.8, u1: 17.4, side: 'L' }, focus: [8.8, 13, 14] },
    { id: 'koin', pos: [0, 1.0, 0], dir: [0, 1, 0], dist: 1.0, open: 11.0, close: 30, make: (T, std) => coins(T, std, 8),
      animate: (g, u, k) => { g.rotation.y = u * 0.6; },
      label: { title: 'DANA CADANGAN', desc: 'sumber bayar pesangon saat PHK', anchor: [0.45, 0.5, 0], u0: 12.4, u1: 17.4, side: 'R' }, focus: [12.4, 17.4, 13] },
    { id: 'lembaga', pos: [0, 3.9, 0], dir: [0, 1, 0], dist: 1.6, open: 17.8, close: 30, make: (T, std) => vault(T, std),
      label: { title: 'LEMBAGA PEMERINTAH', desc: 'belum ditunjuk · tenggat Okt 2027', anchor: [0.9, 0.6, 0.8], u0: 18.2, u1: 23.4, side: 'L' }, focus: [18.2, 23.4, 15] },
  ],
  cameraKeys: [[0, 12, 0, -1.2, 0], [8, 15, 0, -0.4, 0], [12, 20, 0, 0.8, 0], [17.5, 28, 0, 2.0, 0], [23.6, 34, 0, 1.6, 0]] });
