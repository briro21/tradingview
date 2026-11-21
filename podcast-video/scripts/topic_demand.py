"""Topic demand: how well THIRD-PARTY videos about a topic did this month (summaries, commentary,
explainers), excluding the source channels. Median views is the number that predicts a summary's
reach: Ed Zitron (median ~25k) -> our 6,000-view video; Mark Cuban (median ~74) -> 5 views.

    python3 scripts/topic_demand.py "Ed Zitron" "Mark Cuban market crash::The Diary Of A CEO"

Each argument is a search query, optionally "::" followed by comma-separated channels to exclude.
"""
import json
import subprocess
import sys
import urllib.parse

topics = {}
for a in sys.argv[1:]:
    q, _, own = a.partition("::")
    topics[q] = (q, [c.strip() for c in own.split(",") if c.strip()])
for name, (q, own) in topics.items():
    url = "https://www.youtube.com/results?search_query=" + urllib.parse.quote_plus(q) + "&sp=EgIIBA%253D%253D"
    out = subprocess.run(["yt-dlp", "--flat-playlist", "-J", url], capture_output=True, text=True).stdout
    try:
        es = json.loads(out).get("entries", [])
    except Exception:
        print(name, "fetch failed"); continue
    third = [e for e in es if (e.get("channel") or "") not in own and (e.get("duration") or 0) > 240]
    v = sorted((e.get("view_count") or 0 for e in third), reverse=True)
    top = max(third, key=lambda e: e.get("view_count") or 0) if third else {}
    print(f"{name:<28} 3rd-party>4min: n={len(third):>2} top3={sum(v[:3]):>10,} median={v[len(v)//2] if v else 0:>8,} | best: {(top.get('channel') or '')[:22]} {top.get('view_count') or 0:,} {(top.get('title') or '')[:55]}")
