"""Prepare a motion film (<ep>-reel/) for an episode from the template ep9-reel/.

    python3 scripts/reel_prepare.py ep10 "Short film title"

Copies the engine (lib, fonts, index.html, film.js, build_data.py) if the folder is new, builds
audio/vo.wav from public/<ep>/S0*.mp3, trims the looped lofi bed to the episode length, writes
film.json + beats.json, exports the scenes and runs build_data.py. Re-run after any scene edit.
"""
import json
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ep, title = sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else sys.argv[1]
reel, tpl = ROOT / f"{ep}-reel", ROOT / "ep11-reel"   # template = newest engine (dossier look + rich scenes)
(reel / "audio").mkdir(parents=True, exist_ok=True)
(reel / "assets").mkdir(exist_ok=True)
if reel != tpl:
    for name in ["lib", "fonts", "index.html", "film.js", "build_data.py"]:
        src, dst = tpl / name, reel / name
        if not dst.exists():
            (shutil.copytree if src.is_dir() else shutil.copy)(src, dst)
for p in (ROOT / "public/thumbs").glob("photo_*.png"):
    shutil.copy(p, reel / "assets" / p.name)

t = json.loads((ROOT / f"src/episodes/{ep}/timing.json").read_text())
keys = sorted(t)
d = round(sum(v["frames"] for v in t.values()) / 30, 3)
import datetime
# keep per-episode settings (ctaAt, nexts, endscreen, endVideos...) already in film.json
fj = reel / "film.json"
cfg = json.loads(fj.read_text()) if fj.exists() else {}
cfg.update({"title": title, "formats": ["16x9"], "poster": 0, "case": int(ep[2:])})
cfg.setdefault("date", datetime.date.today().strftime("%b %Y"))
cfg.setdefault("endscreen", 20)   # seconds of end screen after the narration (YouTube end-screen elements go on top)
narr = d                          # narration end; the film runs on into the end screen
d = round(narr + cfg["endscreen"], 3)
cfg["duration"] = d
json.dump(cfg, open(fj, "w"), indent=1)
b = json.loads((ROOT / "ep8-reel/beats.json").read_text())
P, O = b["period"], b["offset"]
n = int((d - O) / P) + 1
b["beats"] = [round(O + i * P, 5) for i in range(n)]
b["downbeats"] = b["beats"][::4]
b["duration"] = d
b["sections"] = [{"name": "intro", "beat": 0}, {"name": "main", "beat": 16}, {"name": "end", "beat": n - 4}]
b["bar_energy"] = (b["bar_energy"] * 4)[: len(b["downbeats"])]
json.dump(b, open(reel / "beats.json", "w"), indent=1)

ins, fl = [], []
for i, k in enumerate(keys):
    ins += ["-i", str(ROOT / f"public/{ep}/{k}.mp3")]
    fl.append(f"[{i}:a]aresample=48000,apad,atrim=0:{t[k]['frames'] / 30:.4f},asetpts=N/SR/TB[a{i}]")
fl.append("".join(f"[a{i}]" for i in range(len(keys))) + f"concat=n={len(keys)}:v=0:a=1,pan=stereo|c0=c0|c1=c0[o]")
ff = lambda *a: subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *a], check=True)
ff(*ins, "-filter_complex", ";".join(fl) + ";[o]apad[p]", "-map", "[p]", "-t", f"{d}", "-c:a", "pcm_s16le", str(reel / "audio/vo.wav"))
ff("-i", str(ROOT / "ep8-reel/audio/music.wav"), "-af", f"aloop=loop=-1:size=2e9,atrim=0:{d},afade=t=out:st={d - 4}:d=4", "-c:a", "pcm_s16le", str(reel / "audio/music.wav"))

src = subprocess.run([str(ROOT / "scripts/export_scenes.sh"), ep], check=True, capture_output=True, text=True).stdout
tmp = reel / ".src.json"
tmp.write_text(src)
subprocess.run([sys.executable, str(reel / "build_data.py"), str(tmp)], check=True)
tmp.unlink()
print(f"{reel.name}: {d}s ready -> render with motion-reel render.mjs --film {reel.name}")
