---
name: podcast-summary-video
description: Make a ~10-minute animated summary of a long podcast for the "Mindset Distiled" YouTube channel, end to end — topic research, narration from the transcript, scenes, TTS, the A/B opening hook, the motion (kinetic type) render, thumbnails, 4 Shorts and the YouTube copy. Use when the user sends a transcript or a podcast link and asks to "buat video seperti sebelumnya", asks for the next podcast idea to summarise, or asks to change the opening, thumbnails, Shorts or upload copy of an episode.
---

# Podcast summary video (Mindset Distiled)

Everything lives in `podcast-video/` (run commands from there). Work on the session's branch,
commit and push after each milestone; never open a PR unless asked. Reply to the user in
Indonesian; everything inside the video and the YouTube copy is English.

```
narration/epN/S00..S06.txt        narration (S00 = old hook, replaced by the opening)
narration/epN/opening/OPEN_A|B.txt opening variants (cold open + teaser + one-sentence intro)
narration/shorts/SHxx.txt          Shorts narration
src/episodes/epN/scenes.ts         beats (Beat DSL), timing.json (TTS), opening.json (+ .props.json)
src/scenes/EPNShorts.ts            Shorts beats (vertical panel 1000x1300, centre x=500)
src/opening/                       ColdOpen, Teaser, ShortIntro, BigCaptions, Opening, config.ts
src/board/icons.ts                 line-art icon library (reused by every episode)
src/ThumbnailsV3.tsx               thumbnails (V3EpNA/B/C)
epN-reel/                          motion film (canvas engine, template = ep9-reel/)
storybook/epN/                     narration + storybook + youtube.txt
public/thumbs/photo_<name>.png     licensed photo stickers
YOUTUBE.md                         titles, description, chapters, tags, Shorts copy per episode
```

## 0. Topic research (when asked "what next?")

Search long uploads (>40 min) from this week/month, sorted by views, then check competition:
```
yt-dlp --flat-playlist -J "https://www.youtube.com/results?search_query=AI+bubble&sp=CAMSAggD"   # this week, by views
yt-dlp --flat-playlist -J "https://www.youtube.com/results?search_query=...&sp=CAMSBAgEEAE"      # this month
yt-dlp --flat-playlist -J "https://www.youtube.com/results?search_query=GUEST+TOPIC&sp=EgIIBA%253D%253D"  # competitors
```
Then measure demand, the number that decides:
```
python3 scripts/topic_demand.py "Ed Zitron" "Mark Cuban market crash::The Diary Of A CEO"
```
It prints the MEDIAN views of third-party videos (summaries, commentary, explainers) this month.
Proven: Ed Zitron (median ~25k) -> our best video (6,000 views on a 5-subscriber channel);
Mark Cuban (median ~74) -> 5 views, although his own episode had 6M. Few/weak competitor
summaries usually mean NO demand, not an opportunity; a huge source episode is not enough.
Pick: third-party median in the thousands or more, inside the channel's proven niche (AI bubble /
AI money skeptics), credible guest + bold claim (fits "[Credential] WARNS:"), still rising. Avoid crowded news cycles and stories built on
unproven allegations about private people. yt-dlp cannot download video here; ask the user for
the transcript.

## 1. Narration (the expensive step: read the whole transcript once)

- 1,750-1,850 words total, ~170 wpm; the TTS voice runs ~10 min at ~1,800 words. **The video
  must be >= 10:00**; if TTS comes out short, add transcript-backed lines, never filler.
- `S00` hook 70-85 words: most shocking concrete fact, guest + claim, an OPEN LOOP that S06 pays off.
- `S01`-`S06`: "Part n. Title." then ~250-290 words; each ends on a line pulling into the next.
- Retention writing: every number gets a comparison the viewer already knows ("$600B a year,
  nearly twice Microsoft"); one image per part ("a rocket running out of fuel"); a mid-part
  re-hook question every ~60 s; vary attribution (not "Zitron says" every line); the subscribe
  ask sits mid-video (end of S04), framed as a benefit.
- `S06` ends exactly: "This was [length] in ten minutes. The link to the full episode is in the
  description. And if you want more of the biggest conversations explained like this, subscribe."
- Every opinion/number/forecast attributed ("Cuban says…"). Include the host's strongest pushback.
  Money or health → say once "his view, not financial advice". No insults, no invented facts.
  Numbers written as spoken words.
- Optional cheaper path: the user runs `STORYBOOK_PROMPT.md` in another AI and sends the output.

## 2. Voice-over

```
python3 scripts/list_proper_nouns.py narration/epN/*.txt        # show the user; fix scripts/pronunciation.json
SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python3 scripts/generate_voiceover.py --episode epN
SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python3 scripts/generate_voiceover.py --shorts --only SHxx
SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python3 scripts/generate_voiceover.py --opening epN
```
The pronunciation dictionary only changes what the voice hears; captions keep the display spelling.
Long runs: put them in the background (the output file stays empty until the script exits).

## 3. Scenes (`src/episodes/epN/scenes.ts`)

Beat DSL (`src/board/dsl.ts`): `T` display text, `H` hand/UI text, `I(icon,x,y,s)`, `N` counter,
`U/S/X/O/A` underline/strike/cross/circle/arrow, `P(src,x,y,w,h)` photo. Panel 1600x900.
Typical beat: `I(icon, 400, 430, 2)` left, `T(...)` at x=1100 right, `H(...)` lines below.
**Rotate scene kinds — never two of the same look in a row, and never more than ~40% claim cards.**
Rich scenes (`src/board/charts.ts`, after Lemo-Opuscar styles; drawn only by the motion engine):
`BARS(title, rows, {note, noteAt})` paper bar chart, `LINE` points over time, `SHEET(title, rows,
{formula})` spreadsheet with cells filling (row `color`: red/amber/lime/blue), `FLOW(center, rows,
{amount})` money flowing into a centre or `{dir:"loop"}` a cycle, `TIMELINE` dated stops.
Each row `{label, value?, text?, at?, hi?}` lands on its own `at` word (must be inside the beat);
`hi` = the red record with a pencil ring. Use them for every comparison, trend, money flow,
deadline. Other kinds: `N` counter for one big number, `P` photo + quote, list beats.
Keep a shot <= ~22 s: split long ones on a natural sentence.
- `at`: 3-6 exact narration words where the beat starts; item `at` for staggered reveals.
- First beat of S00 `drawn: true` with the guest photo + the hook number. Thumbnail A is a separate
  `V3EpNA` still (a film frame carries burned captions).
- Avoid glyphs the fonts lack: no `≈ ≠`; `→` is drawn by the engine; `AIs` becomes "AIS" in caps.
- New icons go at the end of `ICONS` in `src/board/icons.ts` (100x100 box, `fill: red` = accent).
- Validate (both must report 0):
```
python3 scripts/check_phrases.py src/episodes/epN/scenes.ts src/episodes/epN/timing.json
python3 scripts/check_items.py   src/episodes/epN/scenes.ts src/episodes/epN/timing.json
node_modules/.bin/tsc --noEmit -p .
```

## 4. Real people = licensed photos only

Never generate or cartoonise a real person, never crop another channel's thumbnail.
Wikimedia Commons (send a generic User-Agent, request `iiurlwidth=1280` — other sizes get 429):
```
https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=NAME&gsrnamespace=6&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=1280&format=json
python3 scripts/photo_sticker.py photo.jpg public/thumbs/photo_<name>.png x0 y0 x1 y1
```
Record author + licence; add PHOTO CREDITS to the description and a credit line to each Short.
In `epN-reel/film.js` add the face to `FACES` (sticker pixels of the face centre/radius) and the
name to `WHO`; name labels in build_data.py `NAMES` get face badges automatically.

## 5. Motion film (the look that performs)

Dark stage, warm white Anton type, one red accent, paper/red shots for variety, drifting keyword
watermark + chart motif, whip cuts, word-by-word captions, photo sticker when a person is named.
```
python3 scripts/reel_prepare.py epN "Title"     # copies ep9-reel engine, builds vo/music/data.js
SK=$(ls -d /root/.claude/plugins/synced/*/*/skills/motion-reel)
node $SK/scripts/render.mjs --film epN-reel --contact --every 8 --workers 3   # look at phone_p*.png
node $SK/scripts/render.mjs --film epN-reel --hits && node $SK/scripts/sfx.mjs epN-reel
node $SK/scripts/render.mjs --film epN-reel --format 16x9 --video-only --fps 30 --workers 4   # ~50 min, background
node $SK/scripts/mix.mjs epN-reel --music-db -4 --sfx-db -2 --vo-db 2                       # -14 LUFS, final.mp4
```
Critique the contact sheets before the full render: text clipped or colliding, a shot that is
only caption for seconds, tiny text on phone pages. Fix in scenes.ts, re-run reel_prepare.

## 6. Opening (first 30 s) — A/B hooks

Analytics showed 63 % of viewers leaving before 0:30 when the opening did not deliver the
thumbnail's claim. Structure: cold open (<= 5 s, the thumbnail claim on frame 0, no title card) →
teaser (2-3 hard-cut hits) → one-sentence intro (<= `introMaxSeconds`) → body from "Part one".
1. Write `narration/epN/opening/OPEN_A.txt` (claim first, = thumbnail A) and `OPEN_B.txt` (number first).
2. TTS with `--opening epN`, then fill `src/episodes/epN/opening.json` (texts, icons, anchors).
3. Register the episode in `src/opening/registry.ts` and add `EpNOpening/EpNColdOpen/EpNTeaser`
   compositions to `src/Root.tsx` (copy the Ep9 block).
4. `python3 scripts/build_opening.py epN` resolves anchors → `audioStart/audioEnd` props and runs
   the pacing check (picture change every <= `maxStaticSeconds`, intro <= `introMaxSeconds`).
5. `scripts/assemble_opening.sh epN A` → 30 s previews (`out/epN-preview30-hookA.mp4`); show the user.
6. `scripts/assemble_opening.sh epN A --full` → `out/epN-final-hookA.mp4` + `.srt`, and prints the
   shifted chapter times — update them in YOUTUBE.md.

## 7. Thumbnails, Shorts, copy

- Thumbnails v3: `V3EpNA/B/C` in `src/ThumbnailsV3.tsx` (`<Guest src="thumbs/photo_<name>.png">`,
  Anton, <= 3 words, plain light/dark background), `<Still>` in Root, render with
  `node_modules/.bin/remotion still EpNThumbA out/epN-thumbnail-A.png --ignore-certificate-errors`.
  Check the headline does not touch the head.
- Shorts: 4 x 60-80 words, line 1 works without context, ends "The full breakdown is on the
  channel."; `src/scenes/EPNShorts.ts` (first beat `drawn` with the photo), label in
  `ShortsVideo.tsx`, id in `timeline.ts`, compositions `EpNShort1..4` in Root; render with
  `remotion render EpNShortK out/epN-shortK.mp4 --ignore-certificate-errors --crf=24 --log=error`.
- Titles without "podcast"/"summary": "[Actor] did surprising X. [Twist]." /
  "[Credential] WARNS: …" / a you-focused stake. Description: 2-line hook, what it covers with
  attribution, independent-commentary disclaimer + source link, CHAPTERS, PHOTO CREDITS, tags.
  Shorts: put the main video in "Related video".

## Deliver

Send the final MP4, SRT, thumbnails and Shorts with SendUserFile; pull a frame from each encoded
file and ffprobe it (duration >= 10:00, video + audio) before saying it is done. Summarise in
Indonesian: titles ↔ thumbnails, chapters, credits to keep, what was not verified by watching.
