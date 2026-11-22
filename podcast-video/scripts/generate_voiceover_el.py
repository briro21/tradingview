"""Voice-over with ElevenLabs (default voice: Brian), cached so a voice is paid for only once.

    python3 scripts/generate_voiceover_el.py --episode ep11 [--budget 8800] [--speed 0.9] [--dry]

Same outputs as generate_voiceover.py --episode (public/<ep>/S0X.mp3 + .srt, public/<ep>/full.srt,
src/episodes/<ep>/timing.json), so the rest of the pipeline is unchanged.

Cache: voice_cache/<ep>/<scene>.<key>.mp3 + .json (committed). The key is the scene's text + voice +
model only, so re-rendering visuals, or re-running this script, never spends characters again.
Only a scene whose TEXT changed is generated, and only after the character budget check passes.
The API key is injected by the session's network proxy (never stored here); the header below is
a placeholder the proxy replaces.
"""

import argparse
import base64
import hashlib
import json
import os
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from generate_voiceover import FPS, scene_timing, to_cues, write_srt  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
VOICES = {"brian": "nPczCjzI2devNBz1zQrb", "george": "JBFqnCBsd6RMkjVDRZzb", "sarah": "EXAVITQu4vr4xnSDxMaL"}
MODEL = "eleven_multilingual_v2"
CA = os.environ.get("SSL_CERT_FILE", "/root/.ccr/ca-bundle.crt")


def key_of(text: str, voice: str) -> str:
    return hashlib.sha256(f"{voice}|{MODEL}|{text}".encode()).hexdigest()[:12]


def call_api(text: str, voice: str, settings: dict) -> dict:
    body = json.dumps({"text": text, "model_id": MODEL, "voice_settings": settings})
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICES[voice]}/with-timestamps"
    r = subprocess.run(["curl", "-s", "--cacert", CA, "-H", "xi-api-key: proxy-injected", "-H", "Content-Type: application/json",
                        "-d", body, url], capture_output=True, text=True, check=True)
    d = json.loads(r.stdout)
    if "audio_base64" not in d:
        raise SystemExit(f"ElevenLabs error: {d}")
    return d


def words_from_alignment(al: dict) -> list[dict]:
    """Characters with times -> words (split on whitespace), keeping punctuation in the display text."""
    words, cur = [], None
    for ch, a, b in zip(al["characters"], al["character_start_times_seconds"], al["character_end_times_seconds"]):
        if ch.isspace():
            if cur:
                words.append(cur)
            cur = None
            continue
        if cur is None:
            cur = {"text": ch, "start": a, "end": b}
        else:
            cur["text"] += ch
            cur["end"] = b
    if cur:
        words.append(cur)
    return words


def duration_of(mp3: Path) -> float:
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(mp3)],
                         capture_output=True, text=True, check=True).stdout
    return float(out)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--episode", required=True)
    ap.add_argument("--voice", default="brian", choices=VOICES)
    ap.add_argument("--speed", type=float, default=0.9, help="ElevenLabs speed for newly generated scenes (0.7-1.2)")
    ap.add_argument("--budget", type=int, default=9000, help="max characters this run may spend")
    ap.add_argument("--dry", action="store_true", help="only report what would be generated")
    args = ap.parse_args()

    src, out = ROOT / "narration" / args.episode, ROOT / "public" / args.episode
    cache = ROOT / "voice_cache" / args.episode
    out.mkdir(parents=True, exist_ok=True)
    cache.mkdir(parents=True, exist_ok=True)
    scenes = [(f.stem, " ".join(f.read_text(encoding="utf-8").split())) for f in sorted(src.glob("S*.txt"))]

    todo = [(s, t) for s, t in scenes if not (cache / f"{s}.{key_of(t, args.voice)}.json").exists()]
    need = sum(len(t) for _, t in todo)
    for s, t in scenes:
        print(f"{s}: {len(t):5d} chars  {'GENERATE' if (s, t) in todo else 'cached'}")
    print(f"to generate: {need} chars (budget {args.budget})")
    if need > args.budget:
        raise SystemExit("over budget: shorten the narration or raise --budget")
    if args.dry:
        return

    settings = {"stability": 0.4, "similarity_boost": 0.75, "style": 0.3, "speed": args.speed}
    full, offset, timing = [], 0.0, {}
    for s, t in scenes:
        k = key_of(t, args.voice)
        meta, mp3 = cache / f"{s}.{k}.json", cache / f"{s}.{k}.mp3"
        if not meta.exists():
            d = call_api(t, args.voice, settings)
            mp3.write_bytes(base64.b64decode(d["audio_base64"]))
            meta.write_text(json.dumps({"text": t, "voice": args.voice, "model": MODEL, "settings": settings,
                                        "alignment": d["alignment"]}), encoding="utf-8")
            # drop older takes of this scene so the cache holds one voice per scene
            for old in cache.glob(f"{s}.*"):
                if k not in old.name:
                    old.unlink()
        al = json.loads(meta.read_text(encoding="utf-8"))["alignment"]
        (out / f"{s}.mp3").write_bytes(mp3.read_bytes())
        words = words_from_alignment(al)
        cues = to_cues(words)
        write_srt(out / f"{s}.srt", cues)
        dur = duration_of(mp3)
        full += [(a + offset, b + offset, x) for a, b, x in cues]
        timing[s] = scene_timing(dur, cues, words)
        offset += timing[s]["frames"] / FPS
        print(f"{s}: {dur:6.2f}s  {timing[s]['frames']} frames  {len(cues)} cues")
    write_srt(out / "full.srt", full)
    dest = ROOT / "src" / "episodes" / args.episode
    (dest / "timing.json").write_text(json.dumps(timing), encoding="utf-8")
    print(f"full.srt: {len(full)} cues, total {offset:.2f}s")


if __name__ == "__main__":
    main()
