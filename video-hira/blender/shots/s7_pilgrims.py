# Overhead high-angle timelapse: pilgrims circling the stone Kaaba; city around; slow rotating drone.
exec(open(__import__('os').path.join(__import__('os').path.dirname(__file__), '_common.py')).read())
reset(seed=3); materials()
F = 149
ground(strength=1.5)
bpy.ops.mesh.primitive_circle_add(radius=15, fill_type='NGON', location=(0, 0, 0.05)); court = bpy.context.object
court.data.materials.append(pbr('court', 'aerial_beach_01', (0.9, 0.7, 0.5), 0.15, 0.2))
village(xr=(-7, 8), yr=(-7, 8), clear=lambda x, y: math.hypot(x, y) < 20, detail=False)
kaaba()
for ring in range(6):  # rings rotate at different speeds = circumambulation timelapse
    R = 5.0 + ring * 1.3; rg = empty(name='ring'); drive(rg, 'rotation_euler', f'frame*{0.03 / (1 + ring * 0.25)}', 2)
    n = int(2 * math.pi * R / 0.75)
    for k in range(n):
        if random.random() < 0.25: continue
        a_ = k / n * math.tau + random.uniform(-.05, .05); r_ = R + random.uniform(-.3, .3)
        p = person(math.cos(a_) * r_, math.sin(a_) * r_, a_ + math.pi, M.WHITE if random.random() < 0.7 else random.choice(M.CLOTHS), s=0.95)
        p.parent = rg
world(); sun(elev=55, azim=-35, energy=7.5, color=(1, 0.72, 0.45))
c = camera(lens=30)
key_cam(c, [(1, (9, -22, 36), (0, 0, 0)), (F, (-9, -22, 30), (0, 0, 1))])
go(F, mist=(30, 150), mist_amt=0.55, motion_blur=True)
