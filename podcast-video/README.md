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

## Animasi

Setiap scene adalah daftar **beat** (`src/scenes/S0X.tsx`). Satu beat muncul
tepat saat narator mengucapkan frasa `at`, memakai timing kata dari TTS
(`src/timing.json`), jadi visual berganti setiap ±3–7 detik mengikuti narasi:

```tsx
{ at: "eight billion people", v: <Counter to={8_000_000_000} label="LIVES AT STAKE" />, sfx: "impact" }
```

Visual yang tersedia (`src/components/visuals.tsx`): `Kinetic` (teks kinetik
per kata), `Counter`, `Chapter`, `Versus`, `StrikeList`, `Glitch`, `Orbit`,
`Timeline`, `Accelerate`, `CodeRain`, `BlackBox`, `PowerButton`, `GapChart`,
`SimGrid`, `Converge`, `Hero`, `Subscribe`, plus `MorphText` & `BulletPoints`.

Lapisan global: latar bergerak (orb, grid perspektif, partikel), kamera
push-in, caption karaoke, progress bar per bab, waveform mini, kilatan
transisi antar scene, dan SFX whoosh/impact (`public/sfx/`).

## Jalankan

```bash
npm install
npm start        # Remotion Studio
npm run build    # render ke out/video.mp4
```
