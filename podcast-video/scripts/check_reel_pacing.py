"""Retention checks on a built motion film (run after reel_prepare.py, before rendering).

    python3 scripts/check_reel_pacing.py ep12 [--max-static 6]

Reads <ep>-reel/data.js + film.json and warns when:
  - the picture holds longer than --max-static seconds (a new shot, item, chart row or note counts;
    an empty stage counts as moving, because the narration runs as big kinetic words there)
  - two body shots in a row share a scene kind (claim card, photo, counter, bars, line, sheet,
    flow, timeline, list)
  - a "NEXT" teaser gap is longer than 100 s, or there are none
  - there is no subscribe moment between 1:30 and 2:00 (on-screen ctaAt or the spoken word)
  - the first part card lands before 0:30 (a title card inside the first 30 s)
  - the narration is longer than targetDurationSeconds (film.json, default 510)
Exit code 1 if anything was flagged.
"""
import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RICH = {"bars", "line", "sheet", "flow", "timeline"}


def load(ep):
    reel = ROOT / f"{ep}-reel"
    s = (reel / "data.js").read_text()
    data = json.JSONDecoder().raw_decode(s[s.index("{"):])[0]
    cfg = json.loads((reel / "film.json").read_text())
    return data, cfg


def kind(shot):
    ks = [i["k"] for i in shot["items"]]
    for k in ks:
        if k in RICH:
            return k
    if "image" in ks:
        return "photo"
    if "count" in ks:
        return "counter"
    if "icon" in ks:
        return "claim"
    texts = [i for i in shot["items"] if i["k"] == "text"]
    return "list" if len(texts) >= 4 else "text"


def mmss(t):
    return f"{int(t // 60)}:{int(t % 60):02d}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("ep")
    ap.add_argument("--max-static", type=float, default=6.0)
    a = ap.parse_args()
    data, cfg = load(a.ep)
    shots, end = data["shots"], data["duration"]
    flags = []

    # 1) static holds
    for i, s in enumerate(shots):
        t1 = shots[i + 1]["t0"] if i + 1 < len(shots) else end
        ev = [s["t0"]]
        for it in s["items"]:
            ev.append(it["t"])
            ev += [r["rt"] for r in it.get("rows", [])]
            if it.get("nt") is not None:
                ev.append(it["nt"])
        first = min(it["t"] for it in s["items"]) if s["items"] else t1
        ev = sorted(e for e in ev if s["t0"] <= e < t1)
        ev = [max(e, first) for e in ev] + [t1]       # kinetic words fill the empty stage before `first`
        for x, y in zip(ev, ev[1:]):
            if y - x > a.max_static:
                flags.append(f"STATIC {mmss(x)}-{mmss(y)} ({y - x:.1f}s) in {s['id']} [{kind(s)}]")

    # 2) repeated scene kinds (body shots, part cards excluded)
    body = [s for s in shots if not s["part"] and not s["id"].startswith("S00")]
    for p, q in zip(body, body[1:]):
        if kind(p) == kind(q):
            flags.append(f"REPEAT {kind(q)}: {p['id']} -> {q['id']} at {mmss(q['t0'])}")

    # 3) NEXT teasers
    nexts = sorted(n[0] for n in cfg.get("nexts", []))
    if not nexts:
        flags.append("NEXT: no teasers in film.json")
    marks = [30.0] + nexts + [end]
    for x, y in zip(marks, marks[1:]):
        if y - x > 100:
            flags.append(f"NEXT gap {mmss(x)}-{mmss(y)} ({y - x:.0f}s)")

    # 4) subscribe moment 1:30-2:00
    spoken = [w for w in data["words"] if re.sub(r"[^a-z]", "", w[0].lower()).startswith("subscrib") and 85 <= w[1] <= 125]
    cta = cfg.get("ctaAt")
    if not spoken and not (cta is not None and 85 <= cta <= 125):
        flags.append("CTA: no subscribe moment between 1:30 and 2:00")

    # 5) title card in the first 30 s
    parts = [s for s in shots if s["part"]]
    if parts and parts[0]["t0"] < 30:
        flags.append(f"OPEN: first part card at {parts[0]['t0']:.1f}s (inside the first 30 s)")

    # 6) length
    target = cfg.get("targetDurationSeconds", 510)
    if end > target:
        flags.append(f"LENGTH: narration {mmss(end)} > target {mmss(target)}: cut the weakest segment")

    print(f"{a.ep}: {len(shots)} shots, narration {mmss(end)}, {len(nexts)} teasers")
    for f in flags:
        print("  -", f)
    print("OK" if not flags else f"{len(flags)} flag(s)")
    raise SystemExit(1 if flags else 0)


if __name__ == "__main__":
    main()
