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

## Video 2: IHSG Hijau Hari Ini — Pembalikan Arah Sejati atau Jebakan FOMO?
Dibuat dari voice-over `public/vo_pasar_hijau.mp3` + SRT per kata `input/vo_pasar_hijau.srt`.

```bash
npm run captions             # SRT -> src/pasar-hijau/captions.json (teks dikoreksi di scripts/srt_to_captions.py)
npm run render:pasar-hijau   # hasil: out/ihsg-hijau-fomo.mp4
```

- `src/pasar-hijau/timeline.tsx` — daftar segmen: detik mulai (dari SRT) + visualnya. Edit di sini untuk mengganti teks/visual.
- `src/pasar-hijau/scenes-a.tsx`, `scenes-b.tsx` — komponen scene (kolam likuiditas, magnet, order book, divergensi, Ichimoku, VWAP, Fibonacci, dll.).
