"""Pastikan setiap frasa `at:` di file beat ada di timing narasi.

Usage: python scripts/check_phrases.py src/episodes/ep2/scenes.ts src/episodes/ep2/timing.json
"""

import json
import re
import sys

scenes_path, timing_path = sys.argv[1], sys.argv[2]
T = json.load(open(timing_path))
src = open(scenes_path).read()
norm = lambda s: re.sub(r"[^a-z0-9]", "", s.lower())


def find(words, ph, f):
    t = norm(ph)
    for i in range(f, len(words)):
        j, x = i, ""
        while j < len(words) and len(x) < len(t):
            x += norm(words[j][0])
            j += 1
        if x == t:
            return i
    return -1


bad = 0
# Bagian per scene: "const S01: Beat[] = [" ... sampai scene berikutnya.
for sid, body in re.findall(r"const (S\d+): Beat\[\] = \[(.*?)\n\];", src, re.S):
    words, idx = T[sid]["words"], 0
    for blk in re.split(r"\n  \{\n?\s*at: |\n  \{ at: ", body)[1:]:
        ph = re.match(r'"([^"]+)"', blk).group(1)
        i = find(words, ph, idx)
        if i < 0:
            print("MISSING beat", sid, ph)
            bad += 1
            continue
        idx = i + 1
        for q in re.findall(r'at: "([^"]+)"', blk[len(ph) + 2 :]):
            if find(words, q, i) < 0:
                print("MISSING item", sid, ph, "->", q)
                bad += 1
print("checked beats:", sum(len(re.findall(r"\n  \{\n?\s*at: |\n  \{ at: ", b)) for _, b in re.findall(r"const (S\d+): Beat\[\] = \[(.*?)\n\];", src, re.S)), "missing:", bad)
sys.exit(1 if bad else 0)
