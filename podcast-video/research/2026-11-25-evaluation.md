# Evaluation: Ed Zitron videos (data as of 2026-11-25, from YouTube Studio)

## Results
| | Ed #1 ($1 Trillion Con) | Ed #2 (One Man, Now Gone) | Ed #3 (Anthropic IPO) |
|---|---|---|---|
| Views | 6.1k (6 days) | 1.4k (1 day) | 6.0k (~33h, now flat) |
| CTR | 6.0% | 14% | 8.8% |
| Retention at 0:30 | 44.5% | n/a | 37.8% |
| Avg view duration | 2:40 (25%) | ~1:40 | ~1:37 (14%) |
| Length | 10:36 | 11:05 | 11:16 |

Ed #3 views stopped growing after YouTube's browse push ended (hourly views peaked
~340/h then fell near zero). Likely cause (my inference, not proven): viewers left
quickly, so YouTube stopped expanding it.

## Diagnosis
1. Titles/thumbnails work (CTR 6-14%). Do not change them.
2. Retention is the problem: ~62% leave in the first 30s, curve keeps falling to ~3%
   at the end. The hook gain seen in Ed #1 (36.7% -> 44.5%) did NOT carry into Ed #3.
3. Interaction is weak: Ed #3 got 6 likes, 1 comment, +1 subscriber.
4. Videos are 11+ minutes; retention declines steadily the whole way.
5. Topic matters: Ed/Anthropic content works, the Cuban video (same format, not tied
   to current news) got 6 views.

## Actions for the Remotion pipeline
1. HOOK: Compare the first 30s of Ed #1 vs Ed #3 (structure, teaser, scene changes,
   cold-open text) and list the differences. Restore whatever Ed #1 did better.
   Keep cold-open + teaser + hookVariant A/B.
2. LENGTH: Add targetDurationSeconds (default 480-540) and warn when a draft is over.
   Cut the weakest segments instead of compressing everything.
3. PROMISE CHECK: Add a checklist step before render: the claim shown in the
   thumbnail/title must be proven within the first 15 seconds of the video.
4. MID-VIDEO: Re-hook line every ~90 seconds, visual change every 4-6s, no repeated
   scene type twice in a row.
5. PRONUNCIATION: Update the dictionary (people reported "Zitron" mispronounced
   several times). Verify the correct pronunciation from his own show first.
6. SUBSCRIBE CTA: One concrete CTA around 1:30-2:00, not only at the end.
7. SHORTS: Cut 1-2 Shorts per episode with motion in the first frame and a link to the
   full video.
8. METADATA: Generate metadata.md per episode (3 title options, description with
   chapters, AI-narration disclosure, source credit, "not financial advice").

## Scheduled episode (Sat 2026-11-28, 04:00 WIB)
- Review its first 30 seconds against the points above before it goes live.
- Trim to ~8-9 minutes if it is over 10.
- Do not publish another long video before then.

## Corrections to remember
- Ed #2 title/description say Jensen Huang is "gone", but Nvidia reinstated him on
  Nov 23. Add an update line to the top of its description.

## Rules
- Keep the folder structure, rendering scripts, hook variants, and pronunciation
  dictionary format.
- Show a plan and the list of files to change; wait for my approval.
- Render a 60-second preview of the first minute for me to check.
