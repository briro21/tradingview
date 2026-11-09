# Handheld macro through the bustling market: stalls, colourful cloth, robed traders, a camel, sheep; dust in hard sun.
exec(open(__import__('os').path.join(__import__('os').path.dirname(__file__), '_common.py')).read())
reset(seed=11); materials()
F = 132
ground(strength=0.6)
village(xr=(-5, 6), yr=(-1, 6), clear=lambda x, y: abs(y - 4) < 5 or (y < 0), detail=True)
for i in range(9):  # stall row on the far side of the street
    x = -16 + i * 4.0; e = empty((x, 7.2, 0), rz=math.pi + random.uniform(-.08, .08))
    clothm = random.choice(M.SILK + M.CLOTHS[:2])
    box((0, 0, 2.3), (3.0, 2.0, 0.06), clothm, bevel=0.02, wobble=0.06, parent=e, rot=(0.18, 0, 0))
    for px, py in [(-1.4, -0.9), (1.4, -0.9), (-1.4, 0.9), (1.4, 0.9)]: cyl((px, py, 1.15), 0.05, 2.3, M.WOOD, parent=e)
    box((0, -0.3, 0.45), (2.5, 1.0, 0.9), M.WOOD, bevel=0.03, wobble=0, parent=e)
    for k in range(5): obj('sphere', (-1 + k * 0.5, -0.3, 1.05), (0.2, 0.2, 0.22), random.choice([M.POT, M.CLOTHS[3], M.CAMEL]), parent=e)
    box((1.2, 0.95, 1.2), (0.6, 0.04, 1.6), random.choice(M.SILK), bevel=0.01, wobble=0.05, parent=e)  # hanging fabric
    person(x + random.uniform(-.6, .6), 6.0, math.pi, random.choice(M.CLOTHS), walk=None)
for i in range(22):  # crowd walking along the street
    dirn = 1 if i % 2 else -1; x0 = random.uniform(-18, 18); y0 = random.uniform(2.0, 5.0)
    p = person(x0, y0, dirn * math.pi / 2, random.choice(M.CLOTHS + [M.WHITE]), s=random.uniform(.95, 1.05), walk=(0.35, i))
    drive(p, 'location', f'{x0}+{dirn}*0.04*frame', 0)
cm = camel(-3, 3.2, 0, load=M.SILK[1], walk=(0.18, 0)); drive(cm, 'location', '-3+0.03*frame', 0)
for k in range(3): sheep(4 + k * 0.8, 2.4 + (k % 2) * 0.5, random.uniform(0, 6))
world(strength=0.5); sun(elev=50, azim=-30, energy=8, color=(1, 0.75, 0.5), angle=2)
c = camera(lens=32, fstop=2.8, focus=5)
t = key_cam(c, [(1, (-9, -1.5, 1.55), (-5, 6, 1.4)), (F, (-3, -1.2, 1.6), (1, 6, 1.4))])
drive(c, 'delta_location', '0.025*sin(frame*0.31)+0.012*sin(frame*0.83)', 0)
drive(c, 'delta_location', '0.02*sin(frame*0.43+1)', 2)
dm = flat('dust', (1, 1, 1), emit=(1, 0.85, 0.6), emit_str=0.25)
for i in range(80):
    o = obj('sphere', (random.uniform(-9, 2), random.uniform(0, 4), random.uniform(0.3, 3)), (0.01,) * 3, dm)
    drive(o, 'location', f'{o.location.z}+0.03*sin(frame*0.04+{i})', 2)
go(F, mist=(8, 70), mist_amt=0.6)
