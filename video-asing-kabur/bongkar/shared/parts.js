// Bentuk-bentuk primitif bersama untuk adegan "bongkar" video pesangon.
export const grp = (T, ...m) => { const g = new T.Group(); m.forEach((x) => g.add(x)); return g; };
export const box = (T, std, w, h, d, c, o = {}, p = [0, 0, 0]) => { const m = new T.Mesh(new T.BoxGeometry(w, h, d), std(c, o)); m.position.set(...p); return m; };
export const cyl = (T, std, r, h, c, o = {}, p = [0, 0, 0], seg = 40) => { const m = new T.Mesh(new T.CylinderGeometry(r, r, h, seg), std(c, o)); m.position.set(...p); return m; };
export const coins = (T, std, n, r = 0.42, gap = 0.12, x = 0, z = 0) => grp(T, ...Array.from({ length: n }, (_, i) => cyl(T, std, r, 0.1, '#e8b85c', { metalness: 0.85, roughness: 0.28 }, [x, i * gap, z])));
export const factory = (T, std) => grp(T,
  box(T, std, 3.2, 1.1, 1.8, '#8a5a3c', { roughness: 0.7 }),
  ...[-1.05, 0, 1.05].map((x) => { const r = box(T, std, 1.15, 0.08, 1.8, '#c96f4a', { roughness: 0.6 }, [x, 0.78, 0]); r.rotation.z = 0.42; return r; }),
  cyl(T, std, 0.18, 1.4, '#6b6b70', { metalness: 0.4 }, [1.25, 1.2, -0.5], 24),
  ...[-1, 0, 1].map((x) => box(T, std, 0.5, 0.35, 0.02, '#ffd27a', { emissive: '#ffb84a', emissiveIntensity: 0.6 }, [x, 0.05, 0.91])));
export const vault = (T, std, color = '#3a4250') => { const door = cyl(T, std, 0.62, 0.12, '#b8bcc2', { metalness: 0.9, roughness: 0.25 }, [0, 0, 0.82]); door.rotation.x = Math.PI / 2;
  const wheel = new T.Mesh(new T.TorusGeometry(0.32, 0.05, 12, 32), std('#e8b85c', { metalness: 0.9, roughness: 0.2 })); wheel.position.set(0, 0, 0.92);
  return grp(T, box(T, std, 1.9, 1.7, 1.5, color, { metalness: 0.6, roughness: 0.35 }), door, wheel); };
export const doc = (T, std, stripe = '#ff4b3e') => grp(T, box(T, std, 2.6, 0.08, 1.9, '#f4f2ec', { roughness: 0.8 }),
  box(T, std, 2.6, 0.09, 0.32, stripe, { roughness: 0.6 }, [0, 0.005, -0.75]),
  ...[0, 1, 2, 3].map((i) => box(T, std, 1.9 - (i % 2) * 0.5, 0.09, 0.08, '#9aa3b8', {}, [-0.1, 0.006, -0.3 + i * 0.3])));
