"""Generate voice-over (TTS) + SRT subtitles for every scene in narration/.

Outputs, per scene, into public/:
  S0X.mp3  - voice-over
  S0X.srt  - subtitles relative to the scene (read by the video)
and public/full.srt - all cues on the final video timeline (upload to YouTube).

Usage: pip install edge-tts && python scripts/generate_voiceover.py [--voice en-US-AndrewNeural]
"""

import argparse
import asyncio
import math
import os
import re
from pathlib import Path

# Honour a custom CA bundle (e.g. behind a TLS-inspecting proxy); must run
# before edge_tts is imported because it builds its SSL context at import.
if os.environ.get("SSL_CERT_FILE"):
    import certifi

    certifi.where = lambda: os.environ["SSL_CERT_FILE"]

import edge_tts  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
NARRATION = ROOT / "narration"
PUBLIC = ROOT / "public"
FPS = 30
MAX_WORDS = 8  # maksimal kata per baris subtitle
# edge-tts mp3: 24 kHz, 48 kbit/s CBR
MP3_BYTES_PER_SEC = 48_000 / 8


def fmt(t: float) -> str:
    ms = round(t * 1000)
    h, ms = divmod(ms, 3_600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"


def to_cues(words: list[dict]) -> list[tuple[float, float, str]]:
    """Group word boundaries into cues, breaking on punctuation or MAX_WORDS."""
    cues, cur = [], []
    for i, w in enumerate(words):
        cur.append(w)
        nxt = words[i + 1] if i + 1 < len(words) else None
        ends_clause = bool(re.search(r"[.?!,;:—]$", w["text"]))
        gap = nxt and nxt["start"] - w["end"] > 0.35
        if not nxt or len(cur) >= MAX_WORDS or (ends_clause and len(cur) >= 3) or gap:
            cues.append((cur[0]["start"], cur[-1]["end"], " ".join(x["text"] for x in cur)))
            cur = []
    return cues


def attach_punctuation(words: list[dict], text: str) -> None:
    """WordBoundary drops punctuation; restore it from the source text."""
    pos = 0
    for w in words:
        idx = text.find(w["text"], pos)
        if idx < 0:
            continue
        end = idx + len(w["text"])
        m = re.match(r"[^\w\s\"'“”‘’(]+", text[end:])
        if m:
            w["text"] += m.group(0)
            end += len(m.group(0))
        pos = end


def write_srt(path: Path, cues: list[tuple[float, float, str]]) -> None:
    lines = []
    for i, (a, b, t) in enumerate(cues, 1):
        lines += [str(i), f"{fmt(a)} --> {fmt(b)}", t, ""]
    path.write_text("\n".join(lines), encoding="utf-8")


async def synth(scene: str, text: str, voice: str) -> tuple[float, list]:
    com = edge_tts.Communicate(text, voice, boundary="WordBoundary")
    audio = bytearray()
    words = []
    async for ch in com.stream():
        if ch["type"] == "audio":
            audio += ch["data"]
        elif ch["type"] == "WordBoundary":
            start = ch["offset"] / 1e7
            words.append({"text": ch["text"], "start": start, "end": start + ch["duration"] / 1e7})
    (PUBLIC / f"{scene}.mp3").write_bytes(audio)
    attach_punctuation(words, text)
    cues = to_cues(words)
    write_srt(PUBLIC / f"{scene}.srt", cues)
    return len(audio) / MP3_BYTES_PER_SEC, cues


async def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--voice", default="en-US-AndrewNeural")
    args = ap.parse_args()

    PUBLIC.mkdir(exist_ok=True)
    full, offset = [], 0.0
    for f in sorted(NARRATION.glob("S*.txt")):
        text = " ".join(f.read_text(encoding="utf-8").split())
        duration, cues = await synth(f.stem, text, args.voice)
        full += [(a + offset, b + offset, t) for a, b, t in cues]
        # Sama dengan pembulatan di Root.tsx agar full.srt sinkron dengan video.
        frames = math.ceil(duration * FPS)
        offset += frames / FPS
        print(f"{f.stem}: {duration:6.2f}s  {frames} frames  {len(cues)} cues")
    write_srt(PUBLIC / "full.srt", full)
    print(f"full.srt: {len(full)} cues, total {offset:.2f}s")


if __name__ == "__main__":
    asyncio.run(main())
