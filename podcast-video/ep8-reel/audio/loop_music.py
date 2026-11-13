"""Loop the 64-bar synth bed (beats.py --synth --flavor lofi --mode minor --tonic D --bpm 92
--duration 166.957, renamed to loop.wav) to the full 635.3 s and extend beats.json to match.
A single 635 s synth run does not fit in memory, so the main section is looped on bar lines.

    uv run --with soundfile --with numpy python ep8-reel/audio/loop_music.py   (run from ep8-reel/audio)
"""
import json

import numpy as np
import soundfile as sf

x, sr = sf.read("loop.wav")
P, O = 0.652174, 0.00155
a, b = int(round((O + 16 * P) * sr)), int(round((O + 252 * P) * sr))
intro, body = x[:a], x[a:b]
N = int(635.3 * sr)
out, L = [intro], len(intro)
while L < N + sr:
    out.append(body)
    L += len(body)
y = np.concatenate(out)[:N].copy()
f = int(3 * sr)
y[-f:] *= np.linspace(1, 0, f)[:, None]
sf.write("music.wav", y, sr, subtype="PCM_16")
bj = json.load(open("../beats.json"))
n = int((635.3 - O) / P) + 1
bj["beats"] = [round(O + i * P, 5) for i in range(n)]
bj["downbeats"] = bj["beats"][::4]
bj["duration"] = 635.3
bj["sections"] = [{"name": "intro", "beat": 0}, {"name": "main", "beat": 16}, {"name": "end", "beat": n - 4}]
bj["bar_energy"] = (bj["bar_energy"][4:60] * 20)[: len(bj["downbeats"])]
bj["source"] += " (main section looped to 635.3 s)"
json.dump(bj, open("../beats.json", "w"), indent=1)
