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

## Tema terang / gelap
Atur di `src/theme.ts`: `DEFAULT_THEME = 'light'` dipakai untuk video baru. Per video bisa dipaksa lewat prop `theme`
(lihat `src/Root.tsx`: `PasarHijau` = gelap, `PasarHijauLight` = terang).

## Video 3: What If Semua Investor Asing Kabur dari IHSG? (gaya sinematik + infografis)
SRT yang diterima tidak cocok dengan audionya, jadi waktu & teks diambil dari transkripsi Whisper atas
`public/vo_asing_keluar.mp3` (`input/vo_asing_keluar.whisper.json`).

```bash
npm run captions:asing-kabur   # transkrip -> src/asing-kabur/captions.json (koreksi teks di scripts/whisper_to_captions.py)
npm run render:asing-kabur     # hasil: out/what-if-asing-kabur.mp4
```
Adegan: `src/asing-kabur/scenes.tsx`; urutan & detik mulai: `src/asing-kabur/Video.tsx`.

## Video 4: What If Rupiah Tembus Rp20.000 per Dolar?
VO dibuat dari naskah dengan TTS (`scripts/tts_vo.py`), lalu waktu per kalimat diambil dari SRT-nya.

```bash
python3 scripts/tts_vo.py input/rupiah-20000/naskah.txt public/vo_rupiah_20000.mp3 input/rupiah-20000/vo_rupiah_20000.srt
python3 scripts/srt_lines.py input/rupiah-20000/naskah.txt input/rupiah-20000/vo_rupiah_20000.srt src/rupiah
scripts/make_sfx.sh                       # efek suara sintetis (whoosh, boom, ding, pad)
npx remotion render Rupiah20000 out/what-if-rupiah-20000.mp4
```
Adegan di `src/rupiah/Video.tsx` memakai `L(i)` = detik mulai kalimat ke-i, jadi tetap sinkron kalau VO dibuat ulang.
