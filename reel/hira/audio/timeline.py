# Place the narration on the beat grid -> timeline.json, audio/vo.wav, film.json duration.
# Every line starts on a beat; the picture cuts on that beat and the voice follows 0.12 s later.
import json, math, wave, numpy as np
from scipy.signal import resample_poly
from pathlib import Path
HERE = Path(__file__).resolve().parent.parent
SRC = Path('/home/user/tradingview/video-hira/voice')
BPM = 80.0; P = 60 / BPM; SR = 48000
LEAD, TAIL = 0.12, 0.28
hook_txt = [l.strip() for l in open(SRC / 'hook_lines.txt') if l.strip()]
body_txt = json.load(open(SRC / 'full_lines.json'))
def rd(p):
    w = wave.open(str(p)); n = w.getnframes(); x = np.frombuffer(w.readframes(n), np.int16).astype(np.float32) / 32768
    return resample_poly(x, 320, 147)  # 22050 -> 48000
ents = [('h%d' % i, hook_txt[i], SRC / f'hk{i}.wav') for i in range(4)]
ents += [(str(i), body_txt[i], SRC / f'f{i:03d}.wav') for i in range(4, 113)]
extra = {'h0': 1, 'h1': 2, 'h2': 1, 'h3': 2, '44': 2, '48': 1, '104': 2, '112': 4, '19': 1, '59': 1}
beat = 3                      # beats 0-2: black, breathing
T = []; segs = []
for k, txt, wav in ents:
    x = rd(wav); dur = len(x) / SR
    nb = math.ceil((LEAD + dur + TAIL) / P - 1e-9) + extra.get(k, 0)
    if k == '112': nb = max(nb, 11)
    T.append(dict(key=k, text=txt, beat=beat, nb=nb, vo_t=beat * P + LEAD, vo_dur=round(dur, 3)))
    segs.append((beat * P + LEAD, x))
    beat += nb
    if k == 'h3':                       # title card
        T.append(dict(key='title', text='', beat=beat, nb=6, vo_t=None, vo_dur=0)); beat += 6
total_beats = beat
total = total_beats * P
vo = np.zeros(int((total + 2) * SR), np.float32)
for t0, x in segs:
    i = int(t0 * SR); vo[i:i + len(x)] += x
vo = vo / max(1e-6, np.abs(vo).max()) * 0.9
(HERE / 'audio').mkdir(exist_ok=True)
w = wave.open(str(HERE / 'audio' / 'vo.wav'), 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((vo[: int(total * SR)] * 32767).astype(np.int16).tobytes()); w.close()
json.dump(dict(bpm=BPM, period=P, total_beats=total_beats, total=round(total, 3), items=T), open(HERE / 'timeline.json', 'w'), indent=1)
fj = json.load(open(HERE / 'film.json')); fj['duration'] = round(total, 3); fj['poster'] = round((T[0]['beat'] + 1) * P, 2)
json.dump(fj, open(HERE / 'film.json', 'w'), indent=1)
print('beats', total_beats, 'total', round(total, 2), 's =', round(total / 60, 2), 'min')
