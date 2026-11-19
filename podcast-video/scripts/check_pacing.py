"""Pacing check for the opening: the picture must change at least every maxStaticSeconds,
and the context intro must stay under introMaxSeconds (values from src/opening/config.ts).

    python3 scripts/check_pacing.py ep9      (checks src/episodes/<ep>/opening.props.json)
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CFG = (ROOT / "src/opening/config.ts").read_text()
MAX_STATIC = float(re.search(r"maxStaticSeconds:\s*([\d.]+)", CFG).group(1))
INTRO_MAX = float(re.search(r"introMaxSeconds:\s*([\d.]+)", CFG).group(1))


def check(name: str, p: dict) -> bool:
    end = p["durationInFrames"] / 30
    pts = sorted(set(p["changes"] + [end]))
    gaps = [(b - a, a) for a, b in zip(pts, pts[1:])]
    worst = max(gaps)
    intro = p["intro"]["audioEnd"] - p["intro"]["audioStart"]
    ok = worst[0] <= MAX_STATIC and intro <= INTRO_MAX
    print(f"hook {name}: {end:.1f}s, {len(pts) - 1} visual changes, longest hold {worst[0]:.1f}s at {worst[1]:.1f}s"
          f" (max {MAX_STATIC:g}), intro {intro:.1f}s (max {INTRO_MAX:g}) {'OK' if ok else 'FAIL'}")
    return ok


if __name__ == "__main__":
    props = json.loads((ROOT / "src/episodes" / sys.argv[1] / "opening.props.json").read_text())
    sys.exit(0 if all([check(k, v) for k, v in props.items()]) else 1)
