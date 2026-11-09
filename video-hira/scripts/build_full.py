# Body timeline (beats 4..112): per-beat VO + synthesized SFX bed -> public/full.wav, src/full.json
import json, sys, wave
import numpy as np
sys.path.insert(0, __file__.rsplit('/', 1)[0])
import beatspec
src = open(__file__.replace('build_full.py', 'audio.py')).read().split('# timeline from VO')[0]
exec(src)
L = json.load(open(D + '/voice/full_lines.json'))
B = list(range(4, 113))
vo = {i: rd(f'{D}/voice/f{i:03d}.wav') for i in B}
LEAD, TAIL = 0.25, 0.5
MIN = {'card': 2.6, 'multi': 3.0, 'split': 3.0, 'black': 2.0}
extra = {48: 0.9, 44: 0.6, 104: 0.8, 105: 0.4, 108: 1.0, 110: 0.4, 112: 3.0, 19: 0.6, 78: 0.4, 53: 0.3}
dur = {}
for i in B:
    k = beatspec.S[i]['k']; d = LEAD + len(vo[i]) / SR + TAIL + extra.get(i, 0)
    dur[i] = max(d, MIN.get(k, 2.2))
start = {}; t0 = 0.0
for i in B: start[i] = t0; t0 += dur[i]
T = t0 + 0.5
M = np.zeros(int(T * SR)); V = np.zeros_like(M)
def add(buf, x, at, g=1.):
    k = int(at * SR)
    if k >= len(buf) or k < 0: return
    x = x[:len(buf) - k]; buf[k:k + len(x)] += x * g
for i in B: add(V, vo[i], start[i] + LEAD)
def span(a, b): return start[a], start[b] + dur[b] - start[a]
def bed(a, b, fn, g):
    s0, d = span(a, b); add(M, fn(d) * np.minimum(1, np.minimum(t(d) / 1.5, (d - t(d)) / 1.5)), s0, g)
bed(4, 7, crowd, .55); bed(4, 7, wind, .25)
bed(8, 13, lambda d: pad(d, [110, 138.6, 165]), .5); bed(8, 13, wind, .3)
bed(14, 25, wind, .4); bed(14, 25, lambda d: pad(d, [98, 146.8, 185]), .35)
bed(26, 29, lambda d: pad(d, [392, 523, 659, 784]), .3); bed(26, 29, wind, .3)
bed(30, 43, wind, .45); bed(30, 43, lambda d: cello(d, (55, 82.4, 110)), .35)
bed(38, 43, lambda d: heartbeat(d, 62), .45)
bed(45, 57, lambda d: heartbeat(d, 125), .7); bed(45, 57, lambda d: lp(noise(d), 110) * .6, .5); bed(45, 57, lambda d: cello(d, (55, 58, 82.4)), .3)
bed(58, 63, lambda d: pad(d, [196, 246.9, 293.7, 392, 587]), .7); bed(58, 63, wind, .15)
bed(64, 66, lambda d: pad(d, [130.8, 196, 261.6]), .4)
bed(67, 70, lambda d: heartbeat(d, 150), .8); bed(67, 70, lambda d: lp(noise(d), 100) * .5, .5)
bed(71, 85, lambda d: pad(d, [174.6, 220, 261.6, 349]), .45); bed(86, 99, lambda d: cello(d, (65.4, 69.3, 98, 103.8)), .45); bed(86, 99, wind, .2)
bed(100, 106, lambda d: cello(d, (55, 58.3, 87.3)), .5); bed(100, 103, lambda d: heartbeat(d, 95), .5)
bed(107, 111, wind, .5); bed(109, 111, lambda d: hum(d), .4)
bed(112, 112, lambda d: pad(d, [130.8, 196, 261.6, 392]), .5)
def hit(i, fn, g=1., off=0.): add(M, fn, start[i] + off, g)
for i, kind in {9: 'glitch', 12: 'sub', 19: 'sub', 46: 'sub', 47: 'whipsub', 50: 'sub', 53: 'glitch', 55: 'sub', 56: 'sub', 58: 'swell', 63: 'burst', 65: 'strike', 69: 'door', 78: 'sub', 84: 'chime',
                94: 'whips', 96: 'sub', 100: 'whips', 105: 'puff', 108: 'sub', 110: 'thunder', 112: 'riser', 104: 'cut', 44: 'sub', 52: 'whipsub', 35: 'whips', 75: 'glitch', 8: 'sub'}.items():
    if kind == 'sub': hit(i, subdrop(2.5), 1.0)
    elif kind == 'whipsub': hit(i, whip(), 1.0); hit(i, subdrop(2.2), .9)
    elif kind == 'glitch': hit(i, glitch(.6), .6)
    elif kind == 'swell': hit(i, riser(2.4), .6)
    elif kind == 'burst': hit(i, whip() * 1.3, 1); hit(i, subdrop(2), .7)
    elif kind == 'strike': hit(i, hp(noise(.5), 1500) * np.exp(-t(.5) * 9), 1.0); hit(i, riser(1.6), .5, 0)
    elif kind == 'door': hit(i, thump(45, .5) * 2.0, 1.0); hit(i, lp(noise(.5), 800) * np.exp(-t(.5) * 12), .9)
    elif kind == 'chime': hit(i, clink(), .8)
    elif kind == 'whips':
        for k in range(5): hit(i, whip(), .6, k * 0.5)
    elif kind == 'puff': hit(i, lp(noise(.7), 600) * np.exp(-t(.7) * 5), .8, dur[i] * .45)
    elif kind == 'thunder': hit(i, lp(noise(3), 180) * np.exp(-t(3) * 1.2) * 2, 1.0); hit(i, subdrop(3), 1.0)
    elif kind == 'riser': hit(i, riser(3.0), .8, dur[i] - 3.4); hit(i, subdrop(3), 1.0, dur[i] - .35)
    elif kind == 'cut': M[int((start[i]) * SR): int((start[i] + dur[i]) * SR)] *= .3
for i in (44, 48, 104): M[int(start[i] * SR): int((start[i] + dur[i]) * SR)] *= .25
M = lp(M, 9000)
duck = np.ones_like(M)
for i in B:
    k = int((start[i] + LEAD - .12) * SR); n = len(vo[i]) + int(.25 * SR); duck[k:k + n] = .5
M *= duck
mix = M / np.max(np.abs(M)) * .6 + V / np.max(np.abs(V)) * .9
mix /= max(1, np.max(np.abs(mix)) / .97)
w = wave.open(D + '/public/full.wav', 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((mix * 32767).astype(np.int16).tobytes()); w.close()
beats = [dict(i=i, start=round(start[i], 3), dur=round(dur[i], 3), vo=L[i], spec=beatspec.S[i]) for i in B]
json.dump(dict(total=round(T, 3), beats=beats), open(D + '/src/full.json', 'w'))
print('total', T, T / 60)
