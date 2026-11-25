"""Write storybook/<ep>/metadata.md from storybook/<ep>/UPLOAD.txt and check it before upload.

    python3 scripts/make_metadata.py ep12

metadata.md = 3 title options, the description with chapters, tags, pinned comment, end screen,
cards. Checks (exit 1 if one fails): at least 3 titles, chapters start at 0:00 and are in order,
the AI-narration disclosure, the source credit and link, "not financial advice", the
independent-summary wording. The disclosure/credit text itself is never rewritten here.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def section(txt, name):
    m = re.search(rf"=== {re.escape(name)}[^\n]*===\n(.*?)(?=\n=== |\Z)", txt, re.S)
    return m.group(1).strip() if m else ""


def main():
    ep = sys.argv[1]
    up = (ROOT / "storybook" / ep / "UPLOAD.txt").read_text()
    titles = [l.strip() for l in section(up, "TITLE").splitlines() if l.strip() and not l.startswith("(")]
    desc = section(up, "DESCRIPTION")
    desc = "\n".join(l for l in desc.splitlines() if not l.startswith("----"))
    checks = {
        "3 title options": len(titles) >= 3,
        "chapters from 0:00, in order": bool(re.search(r"^0:00 ", desc, re.M)) and (
            lambda ts: ts == sorted(ts))([int(m) * 60 + int(s) for m, s in re.findall(r"^(\d+):(\d\d) ", desc, re.M)]),
        "AI-narration disclosure": "Narration is AI-generated" in desc,
        "source credit + link": "All credit for the original episode" in desc and "youtube.com/watch" in desc,
        "not financial advice": "not financial advice" in desc.lower(),
        "independent-summary wording": "independent animated summary" in desc,
    }
    out = [f"# {ep} metadata", "", "## Title options", *[f"{i + 1}. {t}" for i, t in enumerate(titles[:3])], "",
           "## Description (with chapters)", "```", desc, "```", ""]
    for name in ["TAGS", "PINNED COMMENT", "END SCREEN", "CARDS", "THUMBNAIL"]:
        body = section(up, name)
        if body:
            out += [f"## {name.title()}", "```", body, "```", ""]
    out += ["## Checks", *[f"- [{'x' if ok else ' '}] {k}" for k, ok in checks.items()], ""]
    (ROOT / "storybook" / ep / "metadata.md").write_text("\n".join(out))
    for k, ok in checks.items():
        print(("OK   " if ok else "FAIL ") + k)
    raise SystemExit(0 if all(checks.values()) else 1)


if __name__ == "__main__":
    main()
