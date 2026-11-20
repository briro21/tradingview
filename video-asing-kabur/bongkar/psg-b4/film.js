import { run } from './lib/explode.js';
import { grp, box, cyl, vault } from '../shared/parts.js';
// Bongkar #4: "brankas" pengelola dan 3 pertanyaan yang belum dijawab PP (narasi L45–L48).
run({ title: 'LEMBAGA PENGELOLA', crumb: 'BELUM DIATUR', zoomRef: 50, endBeat: 19.6, camDir: [1, 0.5, 1.1], subs: [], palette: { accent: '#ff4b3e' },
  parts: [
    { id: 'brankas', pos: [0, 0, 0], dir: [0, 0.3, -1], dist: 0.6, open: 0.8, close: 30, make: (T, std) => vault(T, std),
      label: { title: '3 PERTANYAAN', desc: 'yang harus dijawab PP', anchor: [-0.9, 0.7, 0.8], u0: 0.9, u1: 4.2, side: 'L' }, focus: [0.9, 4.2, 10] },
    { id: 'rekening', pos: [0, 1.0, 0], dir: [0, 1, 0], dist: 1.6, open: 4.3, close: 30,
      make: (T, std) => grp(T, ...[0, 1, 2].map((i) => box(T, std, 1.4, 0.05, 0.9, ['#3b7be0', '#4aa3ff', '#9fc8ff'][i], { metalness: 0.3 }, [i * 0.08, i * 0.08, i * 0.05]))),
      label: { title: 'REKENING ATAS NAMA?', desc: 'saldo bisa dicek kapan saja?', anchor: [0.7, 0.1, 0.45], u0: 4.4, u1: 10.8, side: 'R', color: '#ff4b3e' }, focus: [4.4, 10.8, 10] },
    { id: 'investasi', pos: [0, -1.1, 0], dir: [0, -1, 0], dist: 1.6, open: 10.9, close: 30,
      make: (T, std) => grp(T, ...[0, 1, 2, 3].map((i) => box(T, std, 0.3, 0.3 + i * 0.25, 0.3, '#ffc93c', {}, [-0.6 + i * 0.4, (0.3 + i * 0.25) / 2, 0]))),
      label: { title: 'INVESTASI DI MANA?', desc: '& siapa pengawasnya?', anchor: [0.6, 0.6, 0], u0: 11.0, u1: 15.4, side: 'L', color: '#ff4b3e' }, focus: [11.0, 15.4, 10] },
    { id: 'rugi', pos: [1.3, 0, 0], dir: [1, 0, 0.2], dist: 2.0, open: 15.6, close: 30,
      make: (T, std) => { const s = new T.Mesh(new T.SphereGeometry(0.6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), std('#ff4b3e', { side: 2, roughness: 0.5 })); return grp(T, s, cyl(T, std, 0.04, 1.1, '#6b6b70', {}, [0, -0.5, 0], 12)); },
      label: { title: 'KALAU RUGI?', desc: 'siapa yang menanggung?', anchor: [0, 0.6, 0], u0: 15.7, u1: 19.7, side: 'R', color: '#ff4b3e' }, focus: [15.7, 19.7, 10] },
  ],
  cameraKeys: [[0, 10, 0, 0.2, 0], [4, 13, 0, 0.5, 0], [10.5, 14, 0, 0, 0], [15.5, 15, 0.8, 0, 0], [20, 16, 0.8, 0, 0]] });
