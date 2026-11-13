# Critique log

## Round 1
| hook | read | motion | variety | brand | sync | min |
|  8   |  6   |   6    |    6    |   8   |  7   |  6  |
1. Whips opened on an empty stage (the new shot's first element appeared after the cut). Fix: first element formed 0.7 s before the cut.
2. Several shots showed only a caption for seconds (first element bound to a later word). Fix: empty-stage mode, the narration as big kinetic words.
3. Content sat in the top 60% of the frame, bottom empty. Fix: per-shot vertical framing + up to 1.18x scale.

## Round 2
| hook | read | motion | variety | brand | sync | min |
|  8   |  6   |   8    |    8    |   8   |  7   |  6  |
1. Larger type collided with neighbours (domino labels) and ran off the frame edge. Fix: per-line auto-fit against frame edges (after camera scale) and same-row neighbours.
2. UI lines too small on the phone sheet. Fix: UI size x1.0 of the panel size (was 0.82).
3. Portrait cropped at the top on frame 0. Fix: anchored to the frame bottom like thumbnail A.

## Round 3
| hook | read | motion | variety | brand | sync | min |
|  8   |  8   |   8    |    8    |   8   |  8   |  8  |
Remaining: domino caption "SoftBank ~$100B stake" fits by shrinking (small on phones); sync.py puts
75/109 hits within 20 ms (the rest sit under narration, where onsets are masked; median 10 ms).
