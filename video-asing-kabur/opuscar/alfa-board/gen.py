# Briefing board: the UMP formula and Jakarta's three alpha proposals (UMP 2027 video, lines 9–14; t = 0 at line 9).
import json, math
DUR = 42.75
EL = []
def ink(kind, **k): EL.append({'type': 'ink', 'kind': kind, **k})
def write(text, xy, size, t, d=None, color='graphite', **k): ink('write', text=text, xy=xy, size=size, color=color, t=t, d=d or max(.35, len(text) * .05), **k)
def line(points, t, d, lw=12, color='graphite', **k): ink('line', points=points, t=t, d=d, lw=lw, color=color, **k)

# formula
write('KENAIKAN = ( INFLASI + PERTUMBUHAN × α )', [380, 560], 108, .2, 3.6)
write('× UMP 2026', [1450, 760], 108, 7.2, .8)
ink('ring', c=[2530, 520], r=[95, 95], lw=11, color='red', t=10.4, d=.4)
write('jadi rebutan', [2660, 420], 70, 10.9, .6, color='red')

# number line 6,00 – 6,25 juta
X = lambda v: 600 + (v - 6.00) / .25 * 3200
Y = 1800
line([[X(6.0) - 60, Y], [X(6.25) + 60, Y]], 13.0, .8, lw=10)
for k in range(6):
    v = 6.0 + k * .05
    line([[X(v), Y - 30], [X(v), Y + 30]], 13.4 + k * .08, .1, lw=8)
    write(f'{v:.2f}'.replace('.', ','), [X(v), Y + 110], 62, 13.5 + k * .08, .25, align='center', color='grey')
write('juta rupiah', [X(6.25) + 100, Y + 110], 52, 14.1, .4, color='grey')
write('3 USULAN DI JAKARTA', [380, 1080], 96, 13.0, 1.4)

def proposal(i, who, alpha, rp, v, t, cx_off=0):
    x = X(v)
    EL.append({'type': 'card', 'id': f'c{i}', 'xy': [x + cx_off, 1420], 'w': 700, 'h': 300, 'rot': [-.8, .7, -.4][i], 'z': 7, 'magnetR': 20,
               'magnets': [[-310, -115, 'graphite'], [310, -115, 'graphite']], 'arrive': {'t': t, 'kind': 'drop', 'd': .3, 'lift': 160},
               'lines': [{'text': who, 'font': 'sans', 'weight': 700, 'size': 58, 'x': 46, 'y': -40, 'color': 'graphite'},
                         {'text': f'α {alpha}', 'font': 'mono', 'weight': 600, 'size': 46, 'x': 46, 'y': 30, 'color': 'blue'},
                         {'text': rp, 'font': 'sans', 'weight': 700, 'size': 56, 'x': 46, 'y': 105, 'color': 'graphite'}]})
    line([[x, 1585], [x, Y - 40]], t + .4, .3, lw=9, arrow=True)
    EL.append({'type': 'magnet', 'id': f'm{i}', 'xy': [x, Y], 'r': 30, 'color': 'red' if i == 2 else 'graphite', 'z': 14, 'arrive': {'t': t + .7, 'kind': 'snap', 'd': .3, 'lift': 80}})
proposal(0, 'PENGUSAHA', '0,5', 'Rp6.047.589', 6.047589, 15.95)
proposal(1, 'BURUH', '1,0', 'Rp6.210.040', 6.210040, 22.15)
proposal(2, 'PEMERINTAH', '0,775', 'Rp6.136.941', 6.136941, 27.6)
EL.append({'type': 'stamp', 'id': 'stamp', 'text': 'DITETAPKAN', 'xy': [X(6.136941) + 40, 1150], 'size': 110, 'rot': -6, 't': 32.3, 'seed': 5})
# the whole fight: about Rp163 thousand
ink('dim', id='dim', **{'from': [X(6.047589), Y + 230], 'to': [X(6.210040), Y + 230]}, lw=12, color='blue', t=36.4, d=.8, ea=1.2, eb=2.4)
write('± Rp163 ribu / bulan', [(X(6.047589) + X(6.210040)) / 2, Y + 380], 110, 38.8, 1.2, color='blue', align='center')

# camera
def L(a, b): return math.log(b / a)
moves = [
    {'t': 0, 'd': 3.8, 'a': 2, 'b': 2, 'dx': 0, 'dl': .05},
    {'t': 6.8, 'd': 1.2, 'a': 2, 'b': 2.4, 'dx': 250, 'dl': -.05},
    {'t': 12.6, 'd': 1.3, 'a': 2, 'b': 2.6, 'dx': 300, 'dy': 1050, 'dl': L(.72, .56)},
    {'t': 15.6, 'd': 1.0, 'a': 2, 'b': 2.6, 'dx': -600, 'dy': -100, 'dl': L(.56, .78)},
    {'t': 21.8, 'd': 1.0, 'a': 2, 'b': 2.6, 'dx': 1300, 'dr': -1},
    {'t': 27.2, 'd': 1.0, 'a': 2, 'b': 2.6, 'dx': -650, 'dr': 1},
    {'t': 35.8, 'd': 1.2, 'a': 1.6, 'b': 3, 'dx': -100, 'dy': 330, 'dl': L(.78, .55)},
]
scene = {
    'dur': DUR, 'board': {'w': 5000, 'h': 3000, 'seed': 31, 'texScale': .42, 'ghosts': 90},
    'hand': 1.0, 'sheen': .07, 'light': {'x': -1800, 'y': -2400, 'r': 15000, 'min': .8},
    'tray': [{'kind': 'marker', 'color': 'graphite', 'x': 1300, 'rot': -2}, {'kind': 'marker', 'color': 'blue', 'x': 1700, 'rot': 1.5},
             {'kind': 'marker', 'color': 'red', 'x': 2100, 'rot': -1}, {'kind': 'eraser', 'x': 3900, 'rot': .5}],
    'cam': {'x': 1500, 'y': 650, 'z': .72, 'roll': -.5, 'moves': moves, 'shakes': [{'t': 32.3, 'amp': 6, 'f': 9, 'k': 7}]},
    'elements': EL, 'subs': [], 'ev': [],
}
json.dump(scene, open('scenes/film.json', 'w'), indent=1)
print(len(EL), 'elements')
