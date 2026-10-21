# What If Semua Investor Asing Kabur dari IHSG? (Remotion)

Motion graphic gaya "What If" (stickman siluet, latar biru gelap ber-grid, teks tebal ber-outline).

## Jalankan
```bash
npm install
npm run studio   # preview & edit di browser
npm run render   # hasil: out/asing-kabur.mp4
```

## Struktur
- `src/components/` — elemen yang bisa dipakai ulang: `Stickman`, `BigText`, `IhsgChart`, `Gauge`, `Background`, `Caption`
- `src/scenes/` — satu file per scene naskah (`Hook`, `Peringkat`, `Hari1`)
- `src/Video.tsx` — urutan dan durasi scene (30 fps)

Angka pada grafik `Hari1` adalah ilustrasi; cek data resmi BEI sebelum publikasi.
