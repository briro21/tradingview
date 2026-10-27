# Ringkasan proyek: channel YouTube "What If" ekonomi Indonesia

Tempel isi file ini sebagai pesan pertama di sesi baru.

## Konteks
- Saya membuat channel YouTube berbahasa Indonesia dengan format **"What If"** tentang saham, IHSG, dan ekonomi.
- Gaya visual: animasi stickman siluet (gaya channel referensi "What If… 500 IQ"), karakter full-body sinematik, infografis tema terang, subtitle, efek suara.
- Syarat: video panjang **≥ 8 menit** (monetisasi), 1080p, kualitas YouTube.
- Kode ada di repo GitHub **`briro21/tradingview`**, branch **`claude/inspiring-lamport-j6j7a7`**, folder **`video-asing-kabur/`** (Remotion + React/TypeScript). Panduan: `video-asing-kabur/README.md`.

## Alur produksi (sudah otomatis)
1. Naskah: `input/<slug>/naskah.txt`, satu kalimat per baris. Dialog tokoh pakai format `>> Nama: teks`.
2. Suara + SRT: `scripts/tts_vo.py` (edge-tts, suara `id-ID-ArdiNeural`/`GadisNeural`, `TTS_RATE=-8%`). Suara per tokoh diatur di `VOICES`.
3. Storyboard: `src/videos/<slug>/storyboard.tsx` (pakai `L(i)` = detik mulai baris ke-i) + `meta.json` (judul, deskripsi, bab, tag, teks thumbnail). Daftarkan di `src/videos/registry.tsx`.
4. Satu perintah: `scripts/batch.sh <slug…>` → suara, video, 3 thumbnail, SEO (`youtube/<slug>.md`), salinan ringan `-send.mp4`. Pakai `SKIP_TTS=1` bila suara sudah ada.
5. Shorts: atur klip di `scripts/shorts_plan.py`, lalu `scripts/shorts_render.sh` → `out/shorts/`.
6. Render memerlukan: `npm install`, browser `/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`, `SSL_CERT_FILE=/root/.ccr/ca-bundle.crt` untuk edge-tts lewat proxy.

## Pustaka adegan
- `src/rupiah/scenes.tsx`: kartu, grafik garis, timbangan, bar, layar gelap beranimasi, pelajaran, dua pintu, outro, ruang berita, antrean, dll.
- `src/videos/custom.tsx` & `custom2.tsx`: ARB, emas, MSCI (tangga kelas, robot ETF), Danantara (tiang), keran BI Rate, chat WhatsApp, brankas, kantor bank.
- `src/videos/story.tsx`: adegan cerita (kamar trading dengan "harga masa depan", dialog dengan balon bicara, saldo, mimpi buruk, hitung mundur, telepon, amplop).
- Perbaikan animasi sudah diterapkan: tidak ada layar hitam polos, transisi zoom/blur antar-adegan, kamera bergerak pelan, partikel, kerangka "?" sebelum kartu muncul.

## Video yang sudah jadi
| No | Slug | Judul | Durasi |
|---|---|---|---|
| 01 | arb-7 | What If ARB 7% Berlaku Selamanya? | 9:07 |
| 02 | msci-standalone | What If MSCI Benar-benar Turunkan Status Pasar Saham Indonesia? | 9:02 |
| 03 | danantara | What If Danantara Borong Saham Saat IHSG Jatuh? | 8:36 |
| 04 | bi-rate-7 | What If BI Rate Naik ke 7%? | 8:16 |
| 05 | bank-bangkrut | What If Bank Tempat Kamu Menabung Bangkrut? | 8:17 |
| 06 | emas-3-juta | What If Harga Emas Tembus Rp3 Juta per Gram? | 8:27 |
| 07 | lihat-10-detik | What If Kamu Bisa Melihat Harga Saham 10 Detik Lebih Awal? (gaya cerita, tokoh Pak Joko & Bu Ana, teman Raka) | 8:44 |
| 08 | kembali-1998 | What If Kamu Bangun di Tahun 1998 dengan Ingatan Tahun 2026? (episode 2, tokoh baru Pak Harso & Joko muda) | 8:07 |
| 09 | uang-dua-kali | What If Setiap Rupiah yang Kamu Belanjakan Kembali Dua Kali Lipat? (inflasi, tokoh Bu Sri) | 8:31 |
| 10 | gubernur-24-jam | What If Kamu Jadi Gubernur Bank Indonesia Selama 24 Jam? | 8:39 |
| 11 | tabung-saham-2000 | What If Kamu Menabung Saham Rp100 Ribu Setiap Bulan Sejak Tahun 2000? (data IHSG historis, ilustrasi) | 9:17 |
| 12 | warisan-10-miliar | What If Kamu Tiba-tiba Punya Rp10 Miliar Besok Pagi? (tokoh Om Darto, notaris, sales robot trading) | 8:18 |
| 13 | dirimu-10-tahun | What If Kamu Bertemu Dirimu Sendiri 10 Tahun dari Sekarang? (penutup seri Pak Harso, adegan FutureSelf) | 8:29 |
| 14 | pikiran-bandar | What If Kamu Bisa Mendengar Isi Pikiran Bandar Saham? (musim 2, tokoh Laras, adegan Whisper) | 9:09 |
| 15 | terkaya-7-hari | What If Kamu Jadi Orang Terkaya di Indonesia Selama 7 Hari? | 8:30 |
| 16 | tanpa-belanja-30-hari | What If Semua Orang Indonesia Berhenti Belanja Selama 30 Hari? (paradoks hemat) | 8:43 |

Seri lama (gaya awal): Asing Kabur (4:20), Rupiah Rp20.000 (9:03), IHSG Hijau/FOMO (8:18, belum ada thumbnail/SEO).

Plus **32 Shorts** (2 per video seri baru) dengan jadwal unggah 1 per hari di `youtube/shorts.md`.

## Status unggah & performa
- Sudah diunggah 3 video, terakhir **ARB 7%**. Baru ±1 penonton setelah 3 hari (channel baru).
- Rencana: jangan buat ulang video; unggah Shorts 1/hari + video panjang 2–3/minggu, sebarkan manual ke komunitas saham, evaluasi setelah 1–2 minggu (tayangan, CTR, durasi tonton).

## Gaya konten ke depan
Mengikuti analisis video referensi yang ditonton jutaan kali: sudut pandang **"kamu"**, hook berupa adegan, satu aturan sederhana, eskalasi bertingkat, harga yang harus dibayar, **dilema moral** di klimaks, cliffhanger, dialog antar-tokoh. Contoh pertama: video 07 "Lihat 10 Detik" (ending amplop 1998 "Kamu bukan yang pertama" → bisa jadi episode 2).

## Catatan penting
- Folder `out/` (semua MP4) **tidak** ada di GitHub (terlalu besar). File siap unggah ada di `out/siap-upload/` pada sesi lama; di sesi baru harus dirender ulang dengan `scripts/batch.sh` dan `scripts/shorts_render.sh`.
- Hak pakai komersial suara TTS edge-tts belum pasti; alternatif: Azure Speech, ElevenLabs, atau rekam suara sendiri.
- Beberapa klaim sejarah di naskah perlu diverifikasi (mis. ARB 7% saat pandemi 2020, contoh MSCI Argentina/Pakistan, BI Rate 12,75% di 2005, penutupan 16 bank 1997).

## Jadwal unggah
Lihat `out/siap-upload/jadwal-unggah.md` (sesi lama): video 08–16 tayang 31 Okt – 24 Nov pukul 19.00 WIB, Shorts 1/hari pukul 12.00 WIB sampai 27 Nov. Video 01–07 sudah diunggah/terjadwal sendiri oleh pemilik channel.
