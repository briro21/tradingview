# Tracking shot alongside a camel caravan; hooves kick up dust; tilt up to red/purple silk loads swaying.
exec(open(__import__('os').path.join(__import__('os').path.dirname(__file__), '_common.py')).read())
reset(seed=5); materials()
F = 134
ground(strength=3.5); mountains(r=140, n=18, h=(10, 25))
V = 0.075  # metres per frame
for i in range(6):
    x0 = 2 - i * 4.2
    cm = camel(x0, 0, 0, load=M.SILK[i % 4], walk=(0.17, i * 0.9)); drive(cm, 'location', f'{x0}+{V}*frame', 0)
    # silk drape swaying
    sw = empty((0, -0.7, 2.0), parent=cm, name='sw'); drive(sw, 'rotation_euler', f'0.18*sin(frame*0.17+{i})', 0)
    box((0, 0, -0.45), (0.9, 0.04, 0.9), M.SILK[(i + 1) % 4], bevel=0.01, wobble=0.05, parent=sw)
    if i < 5: cyl((x0 + 2.0, 0, 2.3), 0.012, 2.4, M.WOOD, rot=(0, math.pi / 2, 0))  # lead rope (static, near)
lead = person(5.2, 0.1, 0, M.CLOTHS[2], walk=(0.35, 0), staff=True); drive(lead, 'location', f'5.2+{V}*frame', 0)
world(); sun(elev=14, azim=-120, energy=6, color=(1, 0.58, 0.3))
c = camera(lens=40, fstop=2.2, focus=7)
key_cam(c, [(1, (-1, -7, 0.6), (-1, 0, 0.7)), (int(F * 0.45), (2.4, -7, 0.7), (2.4, 0, 0.9)), (F, (7.0, -6.2, 2.4), (7.5, 0, 2.3))])
go(F, mist=(20, 130), mist_amt=0.7)
