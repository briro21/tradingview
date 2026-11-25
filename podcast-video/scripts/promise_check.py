"""Promise check: what the title (and thumbnail) claim must be said or shown in the first 15 s.

    python3 scripts/promise_check.py ep12 [--thumb "BOOM OR BUST?"] [--seconds 15] [--title "..."]

Takes the title from storybook/<ep>/UPLOAD.txt (first line under === TITLE ===) unless --title is
given, pulls its key terms (names, numbers, capitalised words that aren't filler), and checks each
against the first N seconds: the narration words (timing.json) and the on-screen text of the shots
that start in that window (<ep>-reel/data.js). Exit code 1 if a term is missing.
"""
import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FILLER = {"the", "a", "an", "of", "on", "in", "to", "for", "and", "or", "vs", "is", "was", "why", "how",
          "what", "who", "this", "that", "it", "its", "with", "after", "says", "warns", "explained",
          "minutes", "animated", "summary", "podcast", "episode"}
norm = lambda s: re.sub(r"[^a-z0-9.$%]", "", s.lower())


def title_of(ep):
    txt = (ROOT / "storybook" / ep / "UPLOAD.txt").read_text()
    after = txt.split("=== TITLE ===", 1)[1].strip().splitlines()
    return after[0].strip()


def terms(text):
    out = []
    for tok in re.findall(r"\$?[\w.'-]+%?", text):
        t = tok.strip("'.").rstrip("'s") if tok.endswith("'s") else tok.strip("'.")
        if norm(t) in FILLER or len(norm(t)) < 2:
            continue
        if re.search(r"\d", t) or t[:1].isupper():
            out.append(t)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("ep")
    ap.add_argument("--title")
    ap.add_argument("--thumb", default="")
    ap.add_argument("--seconds", type=float, default=15)
    a = ap.parse_args()
    title = a.title or title_of(a.ep)
    want = terms(title) + terms(a.thumb.title())
    timing = json.loads((ROOT / "src" / "episodes" / a.ep / "timing.json").read_text())
    said = " ".join(norm(w[0]) for w in timing["S00"]["words"] if w[1] <= a.seconds)
    s = (ROOT / f"{a.ep}-reel" / "data.js").read_text()
    data = json.JSONDecoder().raw_decode(s[s.index("{"):])[0]
    shown = " ".join(norm(it.get("text", "")) + " " + norm(it.get("title", "") or "")
                     for sh in data["shots"] if sh["t0"] <= a.seconds for it in sh["items"])
    print(f'{a.ep}: "{title}"' + (f' + thumbnail "{a.thumb}"' if a.thumb else "") + f" -> first {a.seconds:.0f}s")
    missing = []
    for t in dict.fromkeys(want):
        n = norm(t)
        hit = ("said" if n in said else "") + ("+shown" if n in shown else "")
        print(f"  {'OK ' if hit else 'MISSING'} {t:16s} {hit}")
        if not hit:
            missing.append(t)
    print("PASS" if not missing else f"FAIL: {', '.join(missing)} not in the first {a.seconds:.0f}s")
    raise SystemExit(1 if missing else 0)


if __name__ == "__main__":
    main()
