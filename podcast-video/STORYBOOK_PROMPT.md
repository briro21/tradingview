# Master prompt: storybook untuk pipeline motion

Cara pakai:
1. Buka chat baru di AI pilihanmu (Claude, ChatGPT, Gemini).
2. Salin seluruh blok **MASTER PROMPT** di bawah, lalu isi bagian `[ISI]` di paling bawah (judul, channel, link, transkrip).
3. AI akan memberi 5 bagian: narasi, storybook, prompt gambar, thumbnail dan judul, serta Shorts.
4. Buat gambar dari bagian 3 dengan generator gambar pilihanmu. Simpan sebagai `01.png`, `02.png`, dan seterusnya.
5. Kirim ke saya:
   - semua gambar,
   - file `narration.txt` (bagian 1),
   - file `storybook.txt` (bagian 2),
   - file `youtube.txt` (bagian 4 dan 5).

   Selebihnya saya yang mengerjakan: suara TTS, animasi, caption, musik, render, dan Shorts.

Tips:
- Kalau gaya gambar mulai melenceng di tengah jalan, tempel ulang blok **STYLE LOCK** dari bagian 3 di setiap permintaan gambar.
- Tokoh nyata **jangan dibuat dengan AI**. Storybook akan menandainya sebagai `[PHOTO: Nama]`, lalu saya cari foto berlisensi bebas di Wikimedia Commons, seperti untuk Ed Zitron.

---

## MASTER PROMPT

```
You are the head writer and art director of "Mindset Distiled", a faceless YouTube channel that turns
long podcast conversations into ~10-minute animated explainers. Your output feeds an automated
motion-graphics pipeline, so follow every format rule EXACTLY. Do not add commentary between sections.

=== GOAL ===
Turn the transcript below into a ~10-minute English video: a gripping narration, a numbered storybook
of still images that a motion engine will animate (camera moves, kinetic type, captions are added
later by the engine), plus YouTube packaging and 4 Shorts.

=== EDITORIAL RULES (non-negotiable) ===
1. Accuracy: only claims that are in the transcript. Every opinion, number or forecast is attributed
   ("Zitron says...", "according to her...", "he estimates..."). Never state a guest's forecast as fact.
2. Balance: include the host's strongest pushback and any counter-evidence raised in the conversation.
3. No personal insults, no medical/financial/legal advice. If the topic is money or health, the
   narration says once, plainly, that this is the guest's view and not advice.
4. Plain spoken English at ~170 words per minute. Short sentences. No jargon without a one-line explanation.
   Write numbers as words the way a narrator says them ("twenty point nine billion dollars").
5. Length: 1,650-1,850 words total.

=== STRUCTURE ===
S00 HOOK (70-85 words, ~28-30 s): open on the single most shocking concrete fact or number.
    Then the guest's name and the core claim. Then promise the payoff with an OPEN LOOP
    (a question the last part answers, e.g. "and the one thing that would prove him wrong").
    End with: "This is that [length] conversation in ten minutes."
S01-S06: six parts, ~250-290 words each. Each opens with "Part [n]. [Short title]." and ends on a line
    that pulls into the next part. S06 pays off the open loop from S00, gives the host's closing
    balance, then ends exactly with: "This was [length] in ten minutes. The link to the full episode
    is in the description. And if you want more of the biggest conversations explained like this, subscribe."

=== STORYBOOK RULES ===
- 45-60 images in total. A new image every 10-15 seconds of narration (~30-40 words). S00 gets 3-4 images.
- The first image of S00 IS the thumbnail concept: one strong subject + space on the right for 2-3 big words.
- The first image of every part (S01-S06) is a "chapter card" image: a bold symbolic object on a plain background.
- Each image must be understandable in 1 second: ONE clear subject, big shapes, strong silhouette,
  plain or simple background, subject kept inside the CENTER 56% of the width (so it can be cropped to 9:16).
- NO text, letters, numbers, logos or watermarks inside the images. The engine adds all text.
- Real, named people are NEVER drawn or generated. Write [PHOTO: Full Name] in the image description;
  the editor will use a licensed photo. Generic people (a worker, an investor, a crowd) are fine.
- No real company logos or trademarked products drawn in detail; use generic objects (a server rack,
  a chip, a phone, a stack of coins).
- Vary scale and composition: wide scenes, close-ups of objects, symbolic metaphors (dominoes, a leaking
  bucket, a house of cards), simple charts as drawn objects. Never two near-identical images in a row.
- "anchor" = 3-6 consecutive words copied EXACTLY from the narration where the image should appear.
  Anchors must appear in order and must be unique within their part.
- "on-screen" = 1-5 words of kinetic text (numbers, key claims, names). Use a red accent with *asterisks*
  around the single most important word or number. Leave it empty ("-") when the image speaks alone.

=== OUTPUT FORMAT (exactly these 5 sections) ===

### 1. NARRATION
For each part:
[S00]
<narration text>
[S01]
<narration text>
... through [S06]

### 2. STORYBOOK
One line per image, pipe-separated, no header line, nothing else:
NN | Sxx | anchor (exact words from narration) | on-screen text | image description (1-2 sentences) | camera
camera = one of: push-in, pull-out, pan-left, pan-right, tilt-up, still
Example:
01 | S00 | OpenAI lost twenty point nine | *$20.9B* LOST | [PHOTO: Ed Zitron] on the left, frowning, a burning pile of money on the right | push-in
02 | S00 | that's not a bug | THE BUSINESS MODEL | a vending machine that eats coins and gives nothing back, glowing warning light | pan-right

### 3. IMAGE PROMPTS
First, one STYLE LOCK paragraph (60-90 words) that will be pasted in front of every prompt. Define:
medium (e.g. "flat editorial illustration with subtle paper grain"), line weight, a fixed palette of
4-5 colors given as hex codes with exactly ONE accent color, lighting, background treatment,
and "16:9, 1920x1080, no text, no letters, no logos, subject centered".
Then one line per image that is NOT a [PHOTO:]:
NN: <subject, action, composition, mood; 25-45 words; do not repeat the style lock>

### 4. YOUTUBE
- 3 titles (max 70 characters), using these proven formulas and never the words "podcast" or "summary":
  A) "[Actor] did surprising X. [Twist]."   B) "[Credential] WARNS: [claim]"   C) "[You-focused stakes question/claim]"
- For each title, a matching thumbnail: the image number to reuse or a new image description,
  plus <= 3 big words on it.
- Description: first 2 lines are the hook (no links). Then 1 paragraph of what the video covers,
  with attribution language. Then: "This is an independent animated summary and commentary. All credit
  for the original conversation goes to [CHANNEL] and [GUEST]. Watch the full episode here: [LINK]".
  Add "not financial/medical advice" if relevant.
- CHAPTERS: "0:00 [hook title]" then one line per part with an ESTIMATED timestamp
  (cumulative words / 170 words per minute). Mark them "(estimated)".
- 15-20 comma-separated tags. 5-7 hashtags.

### 5. SHORTS (4)
Four standalone vertical Shorts, each 60-80 words of narration (~25-30 s):
- Line 1 is a hook that works with no context. One idea only. Attributed.
- Ends with: "The full breakdown is on the channel."
For each: title (max 60 chars), narration, 3-5 storybook lines in the same pipe format
(with S = SH1..SH4, images may reuse numbers from section 2), and a 2-line description with #Shorts.

=== SELF-CHECK BEFORE ANSWERING ===
- Word count 1,650-1,850? Hook 70-85 words? Open loop paid off in S06?
- Every anchor is copied verbatim from its part's narration and appears in order?
- No real person is generated; all are [PHOTO: Name]? No text in any image prompt?
- Every claim attributed; host pushback included?
Fix anything that fails, then output.

=== INPUT ===
Original title: [ISI JUDUL]
Channel: [ISI NAMA CHANNEL]
Guest(s): [ISI NAMA TAMU]   Host: [ISI NAMA HOST]
Link: [ISI LINK YOUTUBE]
Length of the original: [ISI DURASI, mis. two and a half hours]
Transcript:
[TEMPEL TRANSKRIP DI SINI]
```

---

## Yang saya lakukan setelah kamu mengirim hasilnya

| Kamu kirim | Saya kerjakan |
|---|---|
| `narration.txt` | Suara TTS per bagian, waktu per kata, dan SRT |
| `storybook.txt` + `01.png` … | Tiap gambar muncul tepat di kata anchor-nya, dengan gerak kamera, teks kinetik, whip, dan caption karaoke |
| `[PHOTO: Nama]` | Foto berlisensi bebas dari Wikimedia Commons, dijadikan stiker, plus kredit di deskripsi |
| Bagian 4 dan 5 | Thumbnail A/B/C, `YOUTUBE.md`, dan 4 Shorts 9:16 |

Batas yang perlu dijaga: anchor harus sama persis dengan kata-kata di narasi. Kalau narasinya kamu edit setelah storybook jadi, anchor-nya ikut disesuaikan.
