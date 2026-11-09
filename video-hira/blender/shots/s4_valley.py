# Ultra-wide drone descent into the sun-drenched valley of Mecca, ringed by mountains.
exec(open(__import__('os').path.join(__import__('os').path.dirname(__file__), '_common.py')).read())
reset(); materials()
F = 131
ground(); mountains()
village(xr=(-7, 8), yr=(-6, 9), clear=lambda x, y: abs(x) < 9 and abs(y) < 9, detail=False)
kaaba()
for i in range(40):
    a_ = random.uniform(0, math.tau); r_ = random.uniform(5, 8.5)
    person(math.cos(a_) * r_, math.sin(a_) * r_, a_ + 1.57, random.choice([M.WHITE] + M.CLOTHS), walk=(0.5, i))
world(); sun(elev=38, azim=-40, energy=7.5)
c = camera(lens=24, fstop=None)
key_cam(c, [(1, (-30, -75, 55), (0, 5, 0)), (F, (-12, -40, 20), (0, 3, 2))])
go(F, mist=(25, 160), mist_amt=0.75)
