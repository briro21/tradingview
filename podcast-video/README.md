# Podcast Summary Video (Remotion)

Dark-mode tech podcast video, 1920×1080 @ 30 FPS.

## Pipeline

1. **Narasi** – `narration/S01.txt` … `S07.txt` (satu file per bagian naskah).
2. **Voice-over + SRT** – `scripts/generate_voiceover.py` membuat TTS (edge-tts,
   suara `en-US-AndrewNeural`) dan subtitle dari word timing TTS:
   - `public/S0X.mp3` – voice-over per scene
   - `public/S0X.srt` – subtitle per scene (dirender di video)
   - `public/full.srt` – subtitle seluruh video, siap upload ke YouTube
3. **Video** – Remotion membaca durasi mp3 dan SRT tersebut.

```bash
pip install edge-tts
python scripts/generate_voiceover.py                 # suara default
python scripts/generate_voiceover.py --voice en-US-GuyNeural
```

Ubah teks di `narration/`, jalankan ulang skrip, lalu render ulang video.

## Gaya: whiteboard (ala After Skool)

Kertas putih, doodle spidol warna-warni yang **digambar garis demi garis**
oleh tangan yang memegang spidol, dan kamera yang bergeser di atas satu papan
besar. Garis sedikit "bergetar" seperti animasi tangan.

Setiap scene adalah daftar **beat** (`src/scenes/S0X.ts`). Satu beat = satu
panel di papan; kamera pindah ke panel itu tepat saat narator mengucapkan
frasa `at` (timing kata dari `src/timing.json`). Item di dalam panel digambar
berurutan, dan bisa disinkronkan ke frasa sendiri:

```ts
{
  at: "Plumbers, builders, chefs",
  items: [
    I("wrench", 330, 380, 1.4),
    I("hammer", 800, 380, 1.4, { at: "builders" }),
    I("chef", 1270, 380, 1.4, { at: "chefs" }),
    T("ALL AUTOMATED", 800, 680, { size: 110, color: red, at: "all automated" }),
  ],
}
```

Helper (`src/board/dsl.ts`), koordinat panel 1600×900:
`T` judul spidol, `H` tulisan tangan, `I` ikon doodle, `N` angka berhitung,
`U` garis bawah, `S` coretan, `X` silang, `O` lingkaran, `A` panah.
Daftar ikon ada di `src/board/icons.ts` (robot, brain, globe, crowd, clock,
virus, bitcoin, box, alien, dog, god, iceberg, rocket, monitor, dll.).

SFX: whoosh saat kamera pindah.

## Jalankan

```bash
npm install
npm start        # Remotion Studio
npm run build    # render ke out/video.mp4
```
