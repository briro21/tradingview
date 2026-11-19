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
reel, tpl = ROOT / f"{ep}-reel", ROOT / "ep9-reel"
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
json.dump({"title": title, "duration": d, "formats": ["16x9"], "poster": 0}, open(reel / "film.json", "w"), indent=1)
b = json.loads((tpl / "beats.json").read_text()) if (tpl / "beats.json").exists() else json.loads((ROOT / "ep8-reel/beats.json").read_text())
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
ff(*ins, "-filter_complex", ";".join(fl), "-map", "[o]", "-c:a", "pcm_s16le", str(reel / "audio/vo.wav"))
ff("-i", str(ROOT / "ep8-reel/audio/music.wav"), "-af", f"atrim=0:{d},afade=t=out:st={d - 3}:d=3", "-c:a", "pcm_s16le", str(reel / "audio/music.wav"))

src = subprocess.run([str(ROOT / "scripts/export_scenes.sh"), ep], check=True, capture_output=True, text=True).stdout
tmp = reel / ".src.json"
tmp.write_text(src)
subprocess.run([sys.executable, str(reel / "build_data.py"), str(tmp)], check=True)
tmp.unlink()
print(f"{reel.name}: {d}s ready -> render with motion-reel render.mjs --film {reel.name}")
