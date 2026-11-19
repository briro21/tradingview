"""Resolve an episode's opening (src/episodes/<ep>/opening.json) into Remotion props.

    python3 scripts/build_opening.py ep9

Reads the opening TTS timing (generate_voiceover.py --opening <ep>), turns every anchor phrase
into audioStart/audioEnd seconds, writes src/episodes/<ep>/opening.props.json, then runs the
pacing check (scripts/check_pacing.py). Exit code 1 if an anchor is missing or pacing fails.
"""
import json
import math
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(Path(__file__).resolve().parent))
from check_pacing import check  # noqa: E402

FPS = 30
TAIL = 0.35
norm = lambda s: re.sub(r"[^a-z0-9]", "", s.lower())


def find(words, phrase, start=0):
    t = norm(phrase)
    for i in range(start, len(words)):
        j, x = i, ""
        while j < len(words) and len(x) < len(t):
            x += norm(words[j][0])
            j += 1
        if x == t:
            return i, j - 1
    raise SystemExit(f"anchor not found in narration: {phrase!r}")


def span(words, a, b, start=0):
    i, _ = find(words, a, start)
    _, j = find(words, b, i)
    return round(max(0.0, words[i][1] - 0.08), 3), round(words[j][2] + 0.05, 3), j


def main(ep: str) -> None:
    cfg = json.loads((ROOT / "src/episodes" / ep / "opening.json").read_text())
    timing = json.loads((ROOT / "src/episodes" / ep / "opening_timing.json").read_text())
    out, ok = {}, True
    for v, c in cfg["variants"].items():
        t = timing[c["audio"]]
        w = t["words"]
        audio = f"{ep}/opening/{c['audio']}.mp3"
        a0, a1, k = span(w, c["coldOpen"]["from"], c["coldOpen"]["to"])
        cold = {"quoteText": c["coldOpen"]["quoteText"], "audioSrc": audio, "audioStart": 0.0, "audioEnd": a1, "photo": cfg.get("photo")}
        items = []
        for it in c["teaser"]:
            s0, s1, k = span(w, it["from"], it["to"], k)
            items.append({"text": it["text"], "icon": it.get("icon"), "audioStart": s0, "audioEnd": s1})
        items[0]["audioStart"] = a1
        i0, i1, _ = span(w, c["intro"]["from"], c["intro"]["to"], k)
        i0 = items[-1]["audioEnd"]
        beats = []
        for b in c["intro"]["beats"]:
            bi, _ = find(w, b["at"], k)
            beats.append({"t": round(w[bi][1] - 0.08, 3), "text": b["text"], "icon": b.get("icon")})
        intro = {"text": c["intro"]["text"], "audioStart": i0, "audioEnd": i1, "beats": beats, "photo": cfg.get("photo"), "audioSrc": audio}
        dur = max(t["frames"] / FPS, i1) + TAIL
        changes = [0.0, round(a1 / 2, 3)]  # cold open: full claim on frame 0, underline draws at half
        changes += [x["audioStart"] for x in items] + [i0] + [b["t"] for b in beats]
        out[v] = {"audioSrc": audio, "durationInFrames": math.ceil(dur * FPS), "coldOpen": cold, "teaser": {"items": items, "audioSrc": audio},
                  "intro": intro, "words": w, "changes": sorted(changes)}
        ok &= check(v, out[v])
    (ROOT / "src/episodes" / ep / "opening.props.json").write_text(json.dumps(out, indent=1))
    print(f"-> src/episodes/{ep}/opening.props.json")
    if not ok:
        sys.exit(1)


if __name__ == "__main__":
    main(sys.argv[1])
