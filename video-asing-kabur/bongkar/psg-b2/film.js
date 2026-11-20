import { run } from './lib/explode.js';
import { grp, box, cyl, vault } from '../shared/parts.js';
// Bongkar #2: kenapa pesangon macet saat pailit (narasi L19–L22; urutan bayar sesuai Putusan MK 67/PUU-XI/2013).
run({ title: 'PABRIK PAILIT', crumb: 'DIBONGKAR', zoomRef: 60, endBeat: 37.2, camDir: [1, 0.5, 1.1], subs: [], palette: { accent: '#ff4b3e' },
  parts: [
    { id: 'kas', pos: [0, 2.3, 0], dir: [0, 1, 0], dist: 1.8, open: 1.0, close: 40, make: (T, std) => vault(T, std, '#5a1218'),
      animate: (g, u) => { g.children[0].children[1].rotation.y = Math.min(1, Math.max(0, (u - 5.8) / 1.2)) * -1.6; },
      label: { title: 'KAS PERUSAHAAN', desc: 'saat pailit: KOSONG', anchor: [0.9, 0.6, 0.8], u0: 1.2, u1: 10.2, side: 'R', color: '#ff4b3e' }, focus: [1.2, 10.2, 12] },
    { id: 'urutan', pos: [0, -2.6, 0], dir: [0, -1, 0], dist: 1.4, open: 10.5, close: 40,
      make: (T, std) => grp(T, box(T, std, 2.4, 0.35, 1.2, '#3ecf6b', {}, [0, 0.8, 0]), box(T, std, 2.4, 0.35, 1.2, '#3b7be0', {}, [0, 0.4, 0]), box(T, std, 2.4, 0.35, 1.2, '#ffc93c', {}, [0, 0, 0])),
      label: { title: 'URUTAN BAYAR', desc: 'upah dulu · pesangon setelah bank', anchor: [1.2, 0.4, 0.6], u0: 10.6, u1: 20.2, side: 'L' }, focus: [10.6, 20.2, 12] },
    { id: 'bangunan', pos: [0, 0.6, 0], dir: [-1, 0.25, 0], dist: 2.2, open: 20.4, close: 40,
      make: (T, std) => grp(T, box(T, std, 2.2, 1.2, 1.5, '#8a5a3c', { roughness: 0.7 }), box(T, std, 2.4, 0.15, 1.7, '#c96f4a', {}, [0, 0.68, 0])),
      label: { title: 'TANAH & BANGUNAN', desc: 'dijual kurator · butuh waktu lama', anchor: [-1.1, 0.4, 0.75], u0: 20.5, u1: 26.5, side: 'L' }, focus: [20.5, 26.5, 13] },
    { id: 'mesin', pos: [0, -0.7, 0], dir: [1, 0, 0.3], dist: 2.4, open: 24.2, close: 40,
      make: (T, std) => { const gear = new T.Mesh(new T.TorusGeometry(0.55, 0.18, 10, 12), std('#9aa3b8', { metalness: 0.8, roughness: 0.3 })); return grp(T, gear, cyl(T, std, 0.2, 0.5, '#6b6b70', { metalness: 0.8 }, [0, 0, 0])); },
      animate: (g, u) => { g.rotation.z = u * 0.9; },
      label: { title: 'MESIN', desc: 'dilelang satu per satu', anchor: [0.7, 0, 0], u0: 24.3, u1: 30, side: 'R' }, focus: [24.3, 30, 12] },
    { id: 'bank', pos: [0, -1.6, 0], dir: [0, -0.4, 1], dist: 1.6, open: 30.2, close: 40,
      make: (T, std) => { const lock = new T.Mesh(new T.TorusGeometry(0.4, 0.09, 10, 24, Math.PI), std('#b8bcc2', { metalness: 0.9, roughness: 0.25 })); lock.position.y = 0.55; return grp(T, box(T, std, 1.1, 0.8, 0.4, '#e8b85c', { metalness: 0.7, roughness: 0.3 }), lock); },
      label: { title: 'DIJAMINKAN KE BANK', desc: 'bank dibayar dulu dari jaminannya', anchor: [0.5, 0.3, 0.2], u0: 30.3, u1: 37.3, side: 'L', color: '#ff4b3e' }, focus: [30.3, 37.3, 11] },
  ],
  cameraKeys: [[0, 13, 0, 2.0, 0], [10, 18, 0, 0, 0], [20, 22, 0, 0, 0], [37.6, 24, 0, 0, 0]] });
