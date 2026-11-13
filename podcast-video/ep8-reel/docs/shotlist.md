# OpenAI Lost $20.9 Billion: motion remake, shot list
635.3 s · narration-clocked (lofi bed D minor 92 bpm under it) · 50 shots · format 16x9 · 30 fps

The clock is the existing Ep8 narration (public/ep8/S00-S06.mp3, word timings in
src/episodes/ep8/timing.json). Each of the 50 whiteboard beats in src/episodes/ep8/scenes.ts becomes
one shot with the same content and the same narration phrase; `build_data.py` writes the timed
shots to data.js, so picture cannot drift from the voice.

| shots | look | what changes vs. the whiteboard |
|---|---|---|
| S00.0 (frame 0) | paper | Thumbnail A, already on screen: Ed sticker anchored to the bottom, "$20.9B" red, "LOST". Breathing sticker + slow push. |
| S00.1-S00.3 | paper | Hook. Each element lands on its word; red slams with camera shake. |
| Part cards (S01.0 ... S06.0) | red slab | Giant outlined part number drifting behind, title rises out of a mask per glyph, impact SFX. |
| Content shots | dark (every 5th paper) | Display lines rise per glyph on springs; UI lines wipe on behind an accent edge; icons draw stroke by stroke then pop; counters roll with a ticker bar; red slams + shake. |
| Every cut | | Whip pan: old shot out, new shot in, both on screen, accent slab rides the seam, motion blur. The first element is already formed as the shot lands. |
| Empty stage | | Until a shot's first element arrives, the narration itself fills the frame as big kinetic words (active word in red). |
| Always | | Karaoke captions, word-locked, active word on a red chip. Camera: log-space push per shot + lean toward the newest element. Seeded grain. |

Sound: whoosh on every whip, thud on each slam / portrait, pop on icons, bell when a counter lands,
impact on part cards (109 hits, all from data.js HITS). Music ducks under the voice; master -14 LUFS.
