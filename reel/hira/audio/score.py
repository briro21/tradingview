# /// script
# requires-python = ">=3.10"
# dependencies = ["librosa>=0.10", "numpy", "scipy", "soundfile"]
# ///
# Dark ambient score on the 80 bpm grid -> audio/music.wav + beats.json (run: MOTION_REEL_SKILL=<skill> uv run score.py)
import os, sys, json
from pathlib import Path
sys.path.insert(0, os.environ['MOTION_REEL_SKILL'] + '/scripts')
import numpy as np, soundfile as sf
from dsp import *
HERE = Path(__file__).resolve().parent.parent
T = json.load(open(HERE / 'timeline.json')); BPM = T['bpm']; P = T['period']; NB = T['total_beats']; DUR = T['total']
bus = Bus(DUR + 2, BPM)
seed(610)
by = {e['key']: e for e in T['items']}
def beat_of(k): return by[k]['beat']
# intensity per section (0..1), by beat
tl = np.full(NB + 8, 0.25)
def sec(a, b, v):
    tl[beat_of(str(a)) : beat_of(str(b)) + by[str(b)]['nb']] = v
sec(4, 43, 0.3); sec(44, 58, 0.75); sec(59, 66, 0.6); sec(67, 73, 0.7); sec(74, 85, 0.4)
sec(86, 95, 0.4); sec(96, 102, 0.7); sec(103, 109, 0.3); sec(110, 111, 0.85); sec(112, 112, 0.35)
tl[: beat_of('h0')] = 0.15
tl[beat_of('h0') : beat_of('4')] = 0.65
tl[beat_of('title') : beat_of('4')] = 0.5
# harmony: 1 chord / 2 bars (8 beats). A minor world: Am - F - Dm - E
CH = [('A2', 'm'), ('F2', ''), ('D2', 'm'), ('E2', '')]
def chord(rootn, q):
    r = midi(rootn); third = 3 if q == 'm' else 4
    return [note_name(r + 12), note_name(r + 19), note_name(r + 24 + third), note_name(r + 31)]
nbar = NB // 8 + 1
for b in range(nbar):
    beat = b * 8; r, q = CH[b % 4]; lev = float(tl[min(beat + 4, NB)])
    pc = pad_chord(chord(r, q), 8 * P + 1.2, 500 + 1800 * lev, attack=1.6, release=1.8, voices=5, detune=0.15)
    bus.add(pc, beat, 0.10 + 0.14 * lev, pan=0)
    bus.add(bass_note(r, 8 * P + 0.5, 220), beat, 0.16 + 0.12 * lev)
    # sparse plucked figure that thins in calm parts
    if lev > 0.35:
        for i, n in enumerate(chord(r, q)[1:] * 2):
            if (i + b) % 2 == 0:
                bus.add(ks_pluck(hz(n), 1.4, 0.35, 0.2), beat + 1 + i, 0.05 + 0.05 * lev, pan=(-1) ** i * 0.4)
# heartbeat under tension
def thump(f=55, L=0.22):
    t = tvec(int(L * SR)); return np.sin(2 * np.pi * (f + 40 * np.exp(-t * 30)) * t) * np.exp(-t * 14)
for b in range(NB):
    if tl[b] >= 0.65 and b % 2 == 0:
        bus.add(thump(52) * 0.9, b, 0.22); bus.add(thump(46) * 0.6, b + 0.38, 0.16)
# section hits: sub drop at each calm->tense change
for k in ['h0', 'h2', 'title', '44', '47', '58', '64', '67', '96', '104', '108', '110', '112']:
    if k in by: bus.add(sub_drop(1.8), beat_of(k), 0.5)
for k in ['h1', '46', '52', '63', '69', '98', '103']:
    if k in by: bus.add(riser(2.2), beat_of(k) - 3, 0.28)
x = bus.x[:, : int(DUR * SR)]
x = reverb(x, wet=0.22)
# fade tail
f = int(2.5 * SR); x[:, -f:] *= np.linspace(1, 0, f)
x = x / np.abs(x).max() * 0.7
sf.write(HERE / 'audio' / 'music.wav', x.T, SR, subtype='PCM_16')
beats = [round(i * P, 5) for i in range(NB + 1)]
bar = P * 4; be = [round(float(np.sqrt(np.mean(x[:, int(i * bar * SR): int((i + 1) * bar * SR)] ** 2) + 1e-12)), 4) for i in range(int(DUR / bar))]
json.dump(dict(bpm=BPM, offset=0.0, period=P, beats=beats, downbeats=beats[::4], sections=[{'name': 'hook', 'beat': 0}, {'name': 'main', 'beat': beat_of('4')}, {'name': 'end', 'beat': beat_of('112')}], bar_energy=be), open(HERE / 'beats.json', 'w'), indent=1)
print('score ok', DUR)
