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

| Scene | File      | Narasi        | Visual                                         |
|-------|-----------|---------------|------------------------------------------------|
| S01   | `S01.mp3` | Hook          | Avatar host (spring) + `<AudioWaveform/>` biru |
| S02   | `S02.mp3` | Insight 1     | "A NEW TOOL?" (cyan) → "A NEW INVENTOR" (putih) + 2027 / 2030 |
| S03   | `S03.mp3` | Transition 1  | `<BulletPoints/>`: World Without Work → Symptom → No Control |
| S04   | `S04.mp3` | Insight 2     | Grafik jurang Capability vs Safety             |
| S05   | `S05.mp3` | Transition 2  | "What Is Real?"                                |
| S06   | `S06.mp3` | Insight 3     | Grid simulasi + counter "1 in 1,000,000,000"   |
| S07   | `S07.mp3` | Outro         | "Liberation or Erasure?" + tombol Subscribe    |

`durationInFrames` tiap `<Sequence>` dihitung otomatis dari panjang mp3
(`calculateMetadata` di `src/Root.tsx`, dibulatkan ke atas pada 30 FPS).
Angka di `src/timeline.ts` hanya fallback — isi dengan angka frame presisi jika ingin hardcode.

## Jalankan

```bash
npm install
npm start        # Remotion Studio
npm run build    # render ke out/video.mp4
```
