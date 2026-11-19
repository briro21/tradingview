"""List the proper nouns in narration files, with how the voice will say them.

    python scripts/list_proper_nouns.py narration/ep9/*.txt

generate_voiceover.py prints the same list before every TTS run. Add a respelling to
scripts/pronunciation.json for any name that comes out wrong, then regenerate.
"""
import json
import re
import sys
from collections import Counter
from pathlib import Path

STOP = set("A An And As At But By Even For From He His Her If In It Its Now Of On Or Our So The Then This That When With".split())
NUM = set("one two three four five six seven eight nine ten twenty thirty forty fifty".split())


def nouns(text: str) -> Counter:
    """Capitalised words/runs that are not just sentence-initial. A sentence-first word counts only
    if the same word is also capitalised mid-sentence somewhere in the text."""
    mid, first = Counter(), Counter()
    for sent in re.split(r"(?<=[.!?:])\s+|\n+", text):
        toks = [re.sub(r"'s$", "", t.rstrip(".'")) for t in re.findall(r"[A-Za-z][A-Za-z'.-]*", sent)]
        toks = [t for t in toks if t]
        run, run_first = [], False
        for i, t in enumerate(toks + [""]):
            cap = t[:1].isupper() and "'" not in t and t.lower().split("-")[0] not in NUM
            if cap:
                if not run:
                    run_first = i == 0
                run.append(t)
            elif run:
                if run_first and run[0] in STOP:
                    run = run[1:]
                if run and not (len(run) == 1 and len(run[0]) == 1):
                    (first if run_first and len(run) == 1 else mid)[" ".join(run)] += 1
                run = []
    words_mid = {w for k in mid for w in k.split()}
    for k, n in first.items():
        if k in words_mid or k.isupper():
            mid[k] += n
    return mid


def report(files, pron: dict) -> None:
    c = Counter()
    for f in files:
        c += nouns(Path(f).read_text(encoding="utf-8"))
    if not c:
        return
    print("Proper nouns (check pronunciation before rendering):")
    for name, n in sorted(c.items(), key=lambda kv: (-kv[1], kv[0])):
        hit = next((f"{k} -> {v}" for k, v in pron.items() if k.lower() in name.lower()), None)
        print(f"  {name:<28} x{n:<3} {'(dict: ' + hit + ')' if hit else ''}")
    print()


if __name__ == "__main__":
    p = Path(__file__).resolve().parent / "pronunciation.json"
    pron = {k: v for k, v in json.loads(p.read_text()).items() if not k.startswith("_")} if p.exists() else {}
    report(sys.argv[1:], pron)
