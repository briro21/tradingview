# Builds scenes/film.json: "Tiga pertanyaan untuk Peraturan Pemerintah" (pesangon video, narration lines 45–48, t = 0 at line 45).
import json, math
DUR = 19.66
EL = []
def ink(kind, **k): EL.append({'type': 'ink', 'kind': kind, **k})
def write(text, xy, size, t, d=None, color='graphite', **k): ink('write', text=text, xy=xy, size=size, color=color, t=t, d=d or max(.35, len(text) * .055), **k)
def poly(points, t, d, lw=12, color='graphite', **k): ink('line', points=points, t=t, d=d, lw=lw, color=color, **k)
def rectline(x0, y0, x1, y1, t, d, **k): poly([[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0 - 2]], t, d, **k)

# ---- title zone
write('PERATURAN PEMERINTAH', [420, 470], 122, .2, 1.3)
EL.append({'type': 'tag', 'id': 'tag3', 'text': '3 PERTANYAAN', 'xy': [500, 690], 'size': 78, 'rot': -1.5, 'arrive': {'t': 1.85, 'kind': 'swing', 'd': .8, 'amp': 8}})
EL.append({'type': 'card', 'id': 'uu', 'xy': [1680, 690], 'w': 760, 'h': 190, 'rot': .8, 'z': 7, 'magnetR': 18,
           'magnets': [[-345, -70, 'graphite'], [345, -70, 'graphite']],
           'arrive': {'t': 2.55, 'kind': 'drop', 'd': .3, 'lift': 120},
           'lines': [{'text': 'UU 27/2026 · Pasal 253', 'font': 'mono', 'weight': 600, 'size': 44, 'x': 44, 'y': -6, 'color': 'graphite'},
                     {'text': 'aturan pelaksana: belum terbit', 'font': 'mono', 'weight': 500, 'size': 34, 'x': 44, 'y': 52, 'color': 'grey'}]})

COL = [1300, 2600, 3900]
QS = [('REKENING ATAS NAMAMU?', 'bisa cek saldo kapan saja?'),
      ('DIINVESTASIKAN DI MANA?', 'dan siapa yang mengawasi?'),
      ('KALAU RUGI,', 'SIAPA YANG MENANGGUNG?')]
T0 = [4.35, 10.9, 15.55]
for i, cx in enumerate(COL):
    t = T0[i]
    write(str(i + 1), [cx - 560, 1190], 230, t, .35, color='blue')
    a, b = QS[i]
    lines = [{'text': a, 'font': 'sans', 'weight': 700, 'size': 60, 'x': 46, 'y': -20, 'color': 'graphite'},
             {'text': b, 'font': 'sans' if i == 2 else 'mono', 'weight': 700 if i == 2 else 500, 'size': 60 if i == 2 else 38, 'x': 46, 'y': 62, 'color': 'graphite' if i == 2 else 'grey'}]
    EL.append({'type': 'card', 'id': f'q{i}', 'xy': [cx, 1100], 'w': 900, 'h': 240, 'rot': [-.8, .6, -.5][i], 'z': 7, 'magnetR': 20,
               'magnets': [[-405, -90, 'graphite'], [405, -90, 'graphite']], 'arrive': {'t': t + .2, 'kind': 'drop', 'd': .3, 'lift': 160}, 'lines': lines})

# ---- Q1: a passbook with the worker's own name, balance visible any time
cx, t = COL[0], T0[0]
rectline(cx - 320, 1330, cx + 300, 1720, t + 1.3, .9)
poly([[cx - 250, 1330], [cx - 250, 1720]], t + 2.15, .25, lw=8)
write('RAKA', [cx - 200, 1440], 96, 6.45, .5)
poly([[cx - 200, 1480], [cx + 250, 1480]], 6.95, .3, lw=6, color='grey')
write('SALDO: Rp ...', [cx - 200, 1600], 74, 8.45, .7, color='blue')
write('cek kapan saja', [cx - 200, 1690], 54, 9.2, .6, color='blue')
write('?', [cx + 380, 1700], 300, 9.7, .3, color='red')

# ---- Q2: where the fund goes, and who watches
cx, t = COL[1], T0[1]
rectline(cx - 440, 1400, cx - 170, 1580, 11.5, .6)
write('DANA', [cx - 410, 1515], 72, 11.9, .35)
for k, y in enumerate([1350, 1490, 1630]):
    poly([[cx - 160, 1490], [cx + 80, y]], 12.2 + k * .22, .25, lw=9, arrow=True)
    rectline(cx + 95, y - 55, cx + 255, y + 55, 12.35 + k * .22, .25, lw=8)
    write('?', [cx + 150, y + 28], 70, 12.55 + k * .22, .15)
ink('ring', c=[cx - 340, 1740], r=[62, 62], lw=11, color='graphite', t=13.45, d=.35)
poly([[cx - 296, 1784], [cx - 240, 1840]], 13.8, .15, lw=16)
write('PENGAWAS?', [cx - 210, 1770], 70, 14.0, .5)
write('?', [cx + 380, 1700], 300, 14.55, .3, color='red')

# ---- Q3: a loss — who carries it
cx, t = COL[2], T0[2]
poly([[cx - 430, 1360], [cx - 360, 1430], [cx - 300, 1400], [cx - 200, 1600]], 16.1, .55, lw=12, color='blue', arrow=True)
write('RUGI', [cx - 420, 1700], 84, 16.6, .35, color='blue')
for k, (txt, y) in enumerate([('PEKERJA?', 1390), ('NEGARA?', 1530), ('PENGELOLA?', 1670)]):
    EL.append({'type': 'tag', 'id': f'who{k}', 'text': txt, 'xy': [cx - 40, y], 'size': 54, 'rot': [-2, 1.5, -1][k],
               'arrive': {'t': 16.75 + k * .25, 'kind': 'swing', 'd': .7, 'amp': 9}})
write('?', [cx + 420, 1700], 300, 17.45, .3, color='red')

# ---- verdict, kept for the pull-back
EL.append({'type': 'stamp', 'id': 'stamp', 'text': 'BELUM DIJAWAB', 'xy': [3650, 560], 'size': 150, 'rot': -6, 't': 18.65, 'seed': 7})

# ---- camera: start on the title, ride to each question, then pull back to the whole wall
moves = [
    {'t': 0, 'd': 3.6, 'a': 2, 'b': 2, 'dl': .06, 'dx': -60},
    {'t': 3.65, 'd': .95, 'a': 2, 'b': 2.6, 'dx': 190, 'dy': 830, 'dl': -.06, 'dr': 1.0},
    {'t': 4.6, 'd': 5.6, 'a': 2, 'b': 2.2, 'dx': 40, 'dl': .05},
    {'t': 10.25, 'd': .85, 'a': 2, 'b': 2.6, 'dx': 1260, 'dl': -.05, 'dr': -1.6},
    {'t': 11.1, 'd': 4.0, 'a': 2, 'b': 2.2, 'dx': 40, 'dl': .05},
    {'t': 14.95, 'd': .85, 'a': 2, 'b': 2.6, 'dx': 1260, 'dl': -.05, 'dr': 1.2},
    {'t': 15.8, 'd': 1.95, 'a': 2, 'b': 2.2, 'dx': 30, 'dl': .05},
    {'t': 17.75, 'd': 1.1, 'a': 1.6, 'b': 3, 'dx': -1560, 'dy': -170, 'dl': math.log(.42 / 1.0), 'dr': -.6},
]
scene = {
    'dur': DUR, 'board': {'w': 5200, 'h': 2900, 'seed': 23, 'texScale': .42, 'ghosts': 90},
    'hand': 1.0, 'sheen': .07, 'light': {'x': -1800, 'y': -2400, 'r': 15000, 'min': .8},
    'tray': [{'kind': 'marker', 'color': 'graphite', 'x': 1300, 'rot': -2}, {'kind': 'marker', 'color': 'blue', 'x': 1700, 'rot': 1.5},
             {'kind': 'marker', 'color': 'red', 'x': 2100, 'rot': -1}, {'kind': 'eraser', 'x': 3900, 'rot': .5}],
    'cam': {'x': 1170, 'y': 600, 'z': 1.0, 'roll': -.6, 'moves': moves, 'shakes': [{'t': 18.65, 'amp': 6, 'f': 9, 'k': 7}]},
    'elements': EL, 'subs': [], 'ev': [],
}
json.dump(scene, open('scenes/film.json', 'w'), indent=1)
print(len(EL), 'elements')
