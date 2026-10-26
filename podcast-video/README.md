# Podcast Summary Video (Remotion)

Dark-mode tech podcast video, 1920×1080 @ 30 FPS.

## Audio

Taruh voice-over di `public/` dengan nama berikut (satu file per bagian narasi):

| Scene | File      | Narasi        | Visual                                         |
|-------|-----------|---------------|------------------------------------------------|
| S01   | `S01.mp3` | Hook          | Avatar host (spring) + `<AudioWaveform/>` biru |
| S02   | `S02.mp3` | Insight 1     | "KIAMAT TEKNOLOGI?" (cyan) → "HARAPAN" (putih) |
| S03   | `S03.mp3` | Transition 1  | `<BulletPoints/>` muncul satu per satu         |
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
