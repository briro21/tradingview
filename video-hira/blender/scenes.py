"""Still scenes for the full video. Usage: SCENE=name blender -b -P scenes.py -- OUT_PREFIX SAMPLES RES
Every human figure is faceless by design (hood shadow, back view or silhouette)."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import lib
from lib import *
a = lib.args()
NAME = os.environ['SCENE']
SC = {}
def scene(f): SC[f.__name__] = f; return f

def new(seed=3):
    global WDM
    reset(seed); materials(); WDM = flat('wdm', (0.2, 0.11, 0.06), 0.75)
def shoot(pos, tgt, lens=35, fstop=None, focus=None, **kw):
    c = camera(lens, fstop, focus); key_cam(c, [(1, pos, tgt)])
    kw.setdefault('motion_blur', False)
    finish(a, 1, **kw); return c
def skin(): return flat('skin', (0.28, 0.16, 0.09), 0.7)
def hand(loc, rot=(0, 0, 0), s=1.0, sleeve=None, parent=None):
    e = empty(loc, parent=parent, name='H'); e.rotation_euler = rot; e.scale = (s, s, s)
    obj('cyl', (0, 0, -0.17), (0.055, 0.055, 0.4), sleeve or M.CLOTHS[1], parent=e)
    obj('sphere', (0, 0, 0.05), (0.05, 0.035, 0.07), skin(), parent=e)
    for i in range(4): obj('sphere', (-0.03 + i * 0.02, 0, 0.12), (0.011, 0.012, 0.05), skin(), rot=(0, 0, (i - 1.5) * 0.12), parent=e)
    return e
def point(loc, color, energy, size=0.1):
    bpy.ops.object.light_add(type='POINT', location=loc); l = bpy.context.object; l.data.color = color; l.data.energy = energy; l.data.shadow_soft_size = size; return l
def area(loc, color, energy, size=2, rot=(0, 0, 0)):
    bpy.ops.object.light_add(type='AREA', location=loc, rotation=rot); l = bpy.context.object; l.data.color = color; l.data.energy = energy; l.data.size = size; return l
def spot(loc, tgt, color, energy, angle=40):
    bpy.ops.object.light_add(type='SPOT', location=loc); s = bpy.context.object; t = empty(tgt); c = s.constraints.new('TRACK_TO')
    c.target = t; c.track_axis = 'TRACK_NEGATIVE_Z'; c.up_axis = 'UP_Y'; s.data.energy = energy; s.data.color = color; s.data.spot_size = math.radians(angle); s.data.spot_blend = 0.5; return s
def fog(loc, size, dens, color=(0.8, 0.8, 0.9), aniso=0.4):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc); v = bpy.context.object; v.scale = size
    vm = bpy.data.materials.new('vol'); vm.use_nodes = True; vn = vm.node_tree.nodes; vn.remove(vn['Principled BSDF'])
    pv = vn.new('ShaderNodeVolumePrincipled'); pv.inputs['Density'].default_value = dens; pv.inputs['Color'].default_value = (*color, 1); pv.inputs['Anisotropy'].default_value = aniso
    vm.node_tree.links.new(pv.outputs['Volume'], vn['Material Output'].inputs['Volume']); v.data.materials.append(vm)
    bpy.context.scene.cycles.volume_step_rate = 3
def emit(name, col, s): return flat(name, col, 1, emit=col, emit_str=s)
GOLD = lambda: (lambda m: (m.node_tree.nodes['Principled BSDF'].inputs['Metallic'].__setattr__('default_value', 1.0), m)[1])(flat('gold', (1.0, 0.72, 0.25), 0.3))
def metal(name, col, rough=0.35):
    m = flat(name, col, rough); m.node_tree.nodes['Principled BSDF'].inputs['Metallic'].default_value = 1.0; return m
def sky_sun(disk_pos, col=(1, 0.6, 0.3), strength=60, r=5):
    return obj('sphere', disk_pos, (r, r, r), emit('sundisk', col, strength))
def rockwall(loc, rot, size=(14, 8), mat=None, amp=0.6, sub=(120, 80)):
    bpy.ops.mesh.primitive_grid_add(x_subdivisions=sub[0], y_subdivisions=sub[1], size=1, location=loc, rotation=rot); w = bpy.context.object
    w.scale = (size[0], size[1], 1); bpy.ops.object.transform_apply(scale=True); bpy.ops.object.shade_smooth()
    t1 = bpy.data.textures.get('cv') or bpy.data.textures.new('cv', 'VORONOI'); t1.noise_scale = 0.8
    t2 = bpy.data.textures.get('cv2') or bpy.data.textures.new('cv2', 'CLOUDS'); t2.noise_scale = 0.5
    for t, st in ((t1, amp), (t2, amp * .8)):
        d = w.modifiers.new('d', 'DISPLACE'); d.texture = t; d.strength = st; d.texture_coords = 'GLOBAL'
    w.data.materials.append(mat or ROCKM()); return w
def ROCKM(): return pbr('cave', 'clay_plaster', (0.55, 0.52, 0.5), 0.4, bump=2.0)
def starry(strength=1.0, band=1.0):
    w = bpy.data.worlds.new('W'); bpy.context.scene.world = w; w.use_nodes = True; N = w.node_tree.nodes; L = w.node_tree.links
    bg = N['Background']; tc = N.new('ShaderNodeTexCoord'); mp = N.new('ShaderNodeMapping'); mp.inputs['Rotation'].default_value = (0.5, 0.3, 0.2)
    L.new(tc.outputs['Generated'], mp.inputs['Vector'])
    st = N.new('ShaderNodeTexNoise'); st.inputs['Scale'].default_value = 500; st.inputs['Detail'].default_value = 0
    L.new(mp.outputs['Vector'], st.inputs['Vector'])
    r1 = N.new('ShaderNodeValToRGB'); r1.color_ramp.elements[0].position = 0.78; r1.color_ramp.elements[1].position = 0.80; r1.color_ramp.elements[1].color = (6, 6, 6, 1)
    L.new(st.outputs['Fac'], r1.inputs['Fac'])
    sep = N.new('ShaderNodeSeparateXYZ'); L.new(mp.outputs['Vector'], sep.inputs['Vector'])
    m1 = N.new('ShaderNodeMath'); m1.operation = 'MULTIPLY'; m1.inputs[1].default_value = 4; L.new(sep.outputs['Z'], m1.inputs[0])
    m2 = N.new('ShaderNodeMath'); m2.operation = 'MULTIPLY'; L.new(m1.outputs[0], m2.inputs[0]); L.new(m1.outputs[0], m2.inputs[1])
    m3 = N.new('ShaderNodeMath'); m3.operation = 'ADD'; m3.inputs[1].default_value = 1; L.new(m2.outputs[0], m3.inputs[0])
    m4 = N.new('ShaderNodeMath'); m4.operation = 'DIVIDE'; m4.inputs[0].default_value = 1; L.new(m3.outputs[0], m4.inputs[1])
    cl = N.new('ShaderNodeTexNoise'); cl.inputs['Scale'].default_value = 4; cl.inputs['Detail'].default_value = 8; L.new(mp.outputs['Vector'], cl.inputs['Vector'])
    m5 = N.new('ShaderNodeMath'); m5.operation = 'MULTIPLY'; L.new(m4.outputs[0], m5.inputs[0]); L.new(cl.outputs['Fac'], m5.inputs[1])
    m6 = N.new('ShaderNodeMath'); m6.operation = 'POWER'; m6.inputs[1].default_value = 3.0; L.new(m5.outputs[0], m6.inputs[0]); m5 = m6
    r2 = N.new('ShaderNodeValToRGB'); r2.color_ramp.elements[0].color = (0.004, 0.006, 0.02, 1); r2.color_ramp.elements[1].color = (0.5 * band, 0.42 * band, 0.36 * band, 1)
    r2.color_ramp.elements[0].position = 0.03; r2.color_ramp.elements[1].position = 0.35; L.new(m5.outputs[0], r2.inputs['Fac'])
    ad = N.new('ShaderNodeMix'); ad.data_type = 'RGBA'; ad.blend_type = 'ADD'; ad.inputs['Factor'].default_value = 1
    L.new(r2.outputs['Color'], ad.inputs['A']); L.new(r1.outputs['Color'], ad.inputs['B']); L.new(ad.outputs['Result'], bg.inputs['Color'])
    bg.inputs['Strength'].default_value = strength
def rocks_ground(z=0, strength=1.2, size=60, mat=None):
    g = ground(z=z, strength=strength, size=size, sub=200, mat=mat or pbr('rk', 'clay_plaster', (0.3, 0.27, 0.25), 0.3, bump=1.5)); return g
def robe(col): return cloth('r%d' % random.randint(0, 9999), col)
DARKC = lambda: cloth('dk', (0.04, 0.04, 0.05))
def seat(p, h=0.62): p.scale = (1, 1, h); return p

# ---------------- scenes ----------------
@scene
def kaaba_low():
    new(); ground(z=0, strength=0.2); K = kaaba(); K.scale = (1.0,) * 3
    world(color=(0.04, 0.12, 0.45), strength=1.6); sun(25, -35, 6, (1, 0.8, 0.55), 3)
    shoot((3, -12, 0.7), (0, 0, 6.5), 22, mist=None, exposure=0.2, cb_gain=(1.1, 1.0, 0.85))

def idol(x, y, rz, h, stone):
    e = empty((x, y, 0), rz, name='idol')
    box((0, 0, 0.2), (0.9, 0.9, 0.4), stone, bevel=0.04, wobble=0.05, parent=e)
    box((0, 0, 0.4 + h * 0.4), (0.55, 0.45, h * 0.8), stone, bevel=0.1, wobble=0.04, parent=e)
    obj('sphere', (0, 0, 0.4 + h * 0.85), (0.3, 0.26, 0.3), stone, parent=e)
    for k in range(3): box((0, -0.22, 0.6 + k * h * 0.2), (0.5, 0.04, 0.05), M.DARK, bevel=0.01, wobble=0, parent=e)
    return e
@scene
def idols():
    new(); ground(z=0, strength=0.3); st = pbr('idolstone', 'clay_plaster', (0.28, 0.25, 0.22), 0.5, bump=1.2)
    for i in range(13):
        a_ = (i - 6) * 0.3; idol(math.sin(a_) * 6, 4 + math.cos(a_) * -1.5 + abs(i - 6) * 0.1, a_, random.uniform(1.6, 2.6), st)
    for x in (-3, 3): point((x, 2, 1.2), (1, 0.45, 0.15), 600, 0.2)
    world(color=(0.01, 0.015, 0.04), strength=0.5); fog((0, 3, 1.5), (14, 10, 4), 0.05, (0.9, 0.7, 0.5))
    shoot((0, -3.5, 0.5), (0, 5, 1.5), 26, 2.8, 8, mist=(5, 40), mist_col=(0.5, 0.3, 0.2), mist_amt=0.5, exposure=0.6, vignette=0.6)
@scene
def altar():
    new(); st = pbr('al', 'clay_plaster', (0.3, 0.27, 0.25), 0.5, bump=1.2); red = flat('blood', (0.25, 0.01, 0.01), 0.35)
    ground(z=0, strength=0.1, mat=st); box((0, 2, 0.5), (3, 1.6, 1.0), st, 0.06, 0.05)
    box((0, 1.95, 1.02), (2.4, 1.2, 0.05), red, 0.02, 0.03)
    for k in range(7): obj('sphere', (random.uniform(-1.2, 1.2), 1.7 + random.uniform(-.2, .5), 1.04), (.15, .08, .02), red)
    idol(0, 3.3, 0, 3.0, M.DARK); idol(-2.2, 3.5, 0.2, 2.4, M.DARK); idol(2.2, 3.5, -0.2, 2.4, M.DARK)
    point((-1.5, 0.5, 1.6), (1, 0.4, 0.12), 500, 0.15); world(color=(0.01, 0.01, 0.02), strength=0.3); fog((0, 2, 1.5), (9, 8, 3), 0.06, (0.9, 0.6, 0.45))
    shoot((0.8, -2.6, 1.9), (0, 2.3, 1.0), 32, 2.4, 5.0, mist=None, exposure=0.7, vignette=0.7)
@scene
def scale():
    new(); wd = WDM; br = metal('brass', (0.85, 0.6, 0.2), 0.25)
    ground(z=0, strength=0.1); box((0, 1.2, 0.8), (3, 1, 0.1), wd, 0.02, 0.01)
    box((0, 1.2, 1.55), (0.04, 0.04, 1.4), br, 0, 0)
    beam = box((0, 1.2, 2.2), (1.7, 0.05, 0.05), br, 0, 0, rot=(0, 0.12, 0))
    for sx, dz in ((-0.85, 0.1), (0.85, -0.1)):
        obj('cyl', (sx, 1.2, 1.55 + dz), (0.35, 0.35, 0.03), br)
        for ang in (0, 1, 2): obj('cyl', (sx + math.cos(ang * 2.1) * 0.3, 1.2 + math.sin(ang * 2.1) * 0.3, 1.9 + dz), (0.006, 0.006, 0.7), br, rot=(0, 0, 0))
    for k in range(5): obj('sphere', (0.85 + random.uniform(-.15, .15), 1.2 + random.uniform(-.15, .15), 1.62 - 0.1), (.06,) * 3, flat('grain', (0.7, 0.55, 0.2), .5))
    person(0.3, 3.4, math.pi * 0.0, M.CLOTHS[2], s=1.15)
    sun(40, 40, 6, (1, 0.8, 0.55), 2); world(strength=0.35)
    shoot((0.0, -1.6, 1.9), (0.0, 1.2, 1.9), 45, 3.2, 2.8, mist=None, exposure=0.4)
@scene
def sunset_sand():
    new(); materials(); g = ground(z=0, strength=1.2); world(strength=0.5, hue=0.0); sun(4, 180, 9, (1, 0.35, 0.12), 3)
    sky_sun((0, 140, 9), (1, 0.4, 0.12), 80, 9)
    shoot((0, -8, 3.2), (0, 30, 1.2), 28, 4, 12, mist=(10, 120), mist_col=(1, 0.4, 0.15), mist_amt=0.8, exposure=0.1, glare=0.6)
@scene
def noble():
    new(); ground(z=0, strength=0.1); gd = metal('gold', (1.0, 0.72, 0.25), 0.3); fur = flat('fur', (0.2, 0.12, 0.07), 1, sheen=1)
    p = person(0, 2.5, 0, cloth('rich', (0.35, 0.03, 0.08)), s=1.15)
    for k in range(34):
        ang = random.uniform(-1.0, 1.0); obj('cyl', (math.sin(ang) * 0.34, 2.5 - 0.32 - random.uniform(0, .05), 0.7 + random.uniform(0, 0.8)), (0.07, 0.07, 0.012), gd, rot=(math.pi / 2, 0, 0))
    for sx in (-1, 1): obj('sphere', (sx * 0.34, 2.5, 1.5), (0.26, 0.2, 0.14), fur)
    sun(30, 200, 7, (1, 0.8, 0.55), 3); world(strength=0.5); area((0, -2, 3), (1, 0.8, 0.6), 80, 3)
    shoot((0.2, -0.3, 0.3), (0, 2.5, 1.6), 24, 3.5, 3.0, mist=(10, 60), exposure=0.3)
@scene
def rooftop():
    new(); mountains(r=90, n=18, h=(10, 25)); box((0, 0, -0.3), (12, 12, 0.6), M.CLAY, 0.08, 0.04)
    village(xr=(-7, 8), yr=(3, 12), detail=False); ground(z=-4, strength=1)
    person(0, 2.5, math.pi, cloth('rb', (0.08, 0.06, 0.05)), s=1.05, staff=False)
    world(strength=0.5); sun(8, 190, 9, (1, 0.45, 0.2), 3)
    shoot((0.6, -1.6, 1.5), (0, 10, 0.8), 30, 3.5, 3, mist=(8, 90), mist_col=(1, 0.45, 0.2), mist_amt=0.8, exposure=0.1)
@scene
def sandals():
    new(); mud = pbr('mud', 'clay_plaster', (0.55, 0.32, 0.18), 0.7, bump=0.9); ground(z=0, strength=0.05, mat=mud, size=20)
    lt = flat('leather', (0.28, 0.14, 0.07), 0.6)
    for sx, rz in ((-0.1, 0.2), (0.14, -0.4)):
        e = empty((sx, sx * 0.5, 0.02), rz); box((0, 0, 0.012), (0.1, 0.27, 0.02), lt, 0.008, 0, parent=e)
        for k in (-1, 1): box((k * 0.035, 0.03, 0.04), (0.012, 0.012, 0.05), lt, 0, 0, parent=e)
        box((0, 0.03, 0.062), (0.09, 0.014, 0.012), lt, 0, 0, parent=e)
    sun(20, 30, 7, (1, 0.7, 0.4), 4); world(strength=0.3)
    shoot((0.0, -0.9, 0.35), (0.0, 0.0, 0.02), 60, 2.8, 0.95, mist=None, exposure=0.3)
@scene
def elder_boy():
    new(); ground(z=0, strength=0.4); dk = cloth('sil', (0.03, 0.02, 0.02))
    e = person(-0.4, 3, math.pi, dk, s=1.2); k = person(0.2, 3, math.pi, dk, s=0.55)
    obj('sphere', (-0.1, 3, 0.95), (0.06, 0.06, 0.06), dk)
    world(strength=0.4, hue=0.0); sun(5, 180, 10, (1, 0.35, 0.1), 2); sky_sun((0, 120, 8), (1, 0.45, 0.15), 80, 8)
    shoot((0, -2.5, 0.5), (0, 3, 1.3), 35, 3, 5, mist=(5, 80), mist_col=(1, 0.4, 0.12), mist_amt=0.7, exposure=0.1)
@scene
def ledger():
    new(); wall = pbr('wall', 'clay_plaster', (0.7, 0.55, 0.38), 0.6, bump=0.6); box((0, 4, 2), (10, 0.4, 5), wall, 0.1, 0.05); ground(z=0, strength=0.05, mat=wall, size=20)
    box((0, 1.5, 0.75), (3.2, 1.4, 0.1), WDM, 0.02, 0.01)
    for i in range(6): box((-0.9 + i * 0.35, 1.45 + (i % 2) * 0.2, 0.84), (0.3, 0.02, 0.4), flat('pap', (0.8, 0.7, 0.5), 0.9), 0.003, 0, rot=(0, 0, 0.1 * i))
    for i in range(3): cyl((0.8 + i * 0.22, 1.7, 0.9), 0.06, 0.5, flat('scr', (0.75, 0.62, 0.42), 0.9), rot=(0, math.pi / 2, 0.2 * i))
    hand((-0.2, 0.7, 1.0), (math.pi / 2 - 0.1, 0, -0.3), 1.0, cloth('sl', (0.2, 0.08, 0.1)))
    hand((0.2, 0.8, 0.95), (math.pi / 2 - 0.2, 0, 0.5), 1.0, cloth('sl2', (0.2, 0.08, 0.1)))
    area((-2.5, 0, 3), (1, 0.75, 0.5), 250, 3, (0.6, -0.5, 0)); point((1.5, 1.2, 1.2), (1, 0.55, 0.2), 80, 0.05); world(strength=0.1)
    shoot((0, -0.8, 1.7), (0, 1.4, 0.85), 45, 2.8, 2.5, mist=None, exposure=0.5)
@scene
def street():
    new(); ground(z=0, strength=0.4); village(xr=(-5, 7), yr=(4, 16), clear=lambda x, y: abs(x) < 4, detail=True); village(xr=(-5, 7), yr=(-6, 2), clear=lambda x, y: abs(x) < 4, detail=False)
    for i in range(14):
        p = person(random.uniform(-2.6, 2.6), 3 + i * 1.3, random.choice([0, 0.15, -0.15]) + random.choice([0, 0, math.pi]), random.choice(M.CLOTHS + [M.WHITE]), s=random.uniform(.95, 1.06))
    world(strength=0.5); sun(45, -30, 8, (1, 0.8, 0.55), 2)
    shoot((0, -4, 1.6), (0, 14, 1.5), 32, 4, 6, mist=(10, 80), exposure=0.3)
@scene
def mountain_sil():
    new(); ground(z=0, strength=0.5); mountains(r=70, n=22, h=(15, 30)); mx = cloth('sil', (0.03, 0.02, 0.02))
    box((0, 3, 0.4), (3, 3, 1.0), M.ROCK, 0.3, 0.1); person(0, 3, math.pi, mx, s=1.0, staff=True); person(0, 3, math.pi, mx, s=1.0).location.z = 0.9
    world(strength=0.4, hue=0.0); sun(9, 180, 9, (1, 0.5, 0.2), 3)
    shoot((0, -3.2, 1.4), (0, 40, 7), 28, 4, 6, mist=(15, 110), mist_col=(1, 0.5, 0.25), mist_amt=0.8, exposure=0.1)
@scene
def bowl():
    new(); st = pbr('sh', 'clay_plaster', (0.4, 0.33, 0.28), 0.5, bump=1.0); ground(z=0, strength=0.05, mat=st, size=20); box((0, 3, 1.0), (4, 1.4, 2.0), st, 0.1, 0.05)
    box((0, 0.8, 0.7), (1.6, 1.0, 0.1), WDM, 0.02, 0.01)
    obj('sphere', (0, 0.8, 0.85), (0.38, 0.38, 0.2), WDM); obj('sphere', (0, 0.8, 0.95), (0.33, 0.33, 0.1), flat('ms', (0.35, 0.05, 0.04), 0.5))
    for k in range(7): obj('sphere', (random.uniform(-.2, .2), 0.8 + random.uniform(-.2, .2), 1.0), (.1, .08, .06), flat('meat', (0.4, 0.07, 0.05), 0.4))
    hand((-0.6, 0.55, 1.05), (math.pi / 2, 0, -1.2), 1.7, cloth('sl', (0.15, 0.1, 0.07)))
    sun(30, 30, 7, (1, 0.7, 0.45), 3); world(strength=0.3)
    shoot((0.2, -0.9, 1.5), (-0.1, 0.8, 0.9), 50, 2.4, 1.8, mist=None, exposure=0.3)
@scene
def milkyway():
    new(); starry(1.2); g = rocks_ground(z=-1, strength=2.2, size=80); area((0, -6, 10), (0.5, 0.6, 1), 400, 20, (0.3, 0, 0))
    for i in range(8): o = obj('sphere', (random.uniform(-8, 8), random.uniform(5, 25), -0.5), (random.uniform(1.5, 4), random.uniform(1.5, 3), random.uniform(1.5, 5)), M.ROCK)
    shoot((0, -6, 0.6), (0, 10, 9), 20, mist=None, exposure=1.2, glare=1.5, vignette=0.4, cb_gain=(0.95, 1.0, 1.1))
@scene
def gate():
    new(); ground(z=0, strength=0.15); wl = pbr('gw', 'clay_plaster', (0.7, 0.5, 0.35), 0.5, bump=0.8)
    box((-3.2, 0.5, 2.5), (3.0, 3.5, 5), wl, 0.1, 0.05); box((3.2, 0.5, 2.5), (3.0, 3.5, 5), wl, 0.1, 0.05); box((0, 0.5, 4.8), (3.4, 3.5, 1.2), wl, 0.1, 0.05)
    person(0, 3, math.pi, cloth('rb', (0.3, 0.2, 0.12)), s=1.0); mountains(r=100, n=18, h=(10, 25)); ground_far = None
    world(strength=0.6); sun(30, 190, 11, (1, 0.8, 0.55), 3)
    shoot((0, -4, 0.45), (0, 4, 0.7), 35, 3.5, 7, mist=(5, 60), exposure=0.0)
@scene
def climb():
    new(); lt = pbr('cl', 'clay_plaster', (0.7, 0.45, 0.3), 0.3, bump=2.5)
    rockwall((0, 3.5, 6), (math.pi / 2 - 0.35, 0, 0), (26, 22), lt, 1.0, (160, 140)); rockwall((0, 3, -2), (-0.35, 0, 0), (26, 12), lt, 0.7, (120, 90))
    world(strength=0.5); sun(25, 150, 9, (1, 0.7, 0.4), 3)
    shoot((0, -1.5, 3.0), (0.5, 6, 8), 24, mist=(6, 50), mist_amt=0.4, exposure=0.2)
@scene
def mist_hills():
    new(); ground(z=0, strength=0.2)
    for i in range(7):
        o = obj('sphere', (random.uniform(-40, 40), 20 + i * 18, 0), (random.uniform(25, 40), random.uniform(10, 16), random.uniform(5, 12) + i), M.ROCK)
    fog((0, 40, 2), (200, 160, 7), 0.02, (1, 0.8, 0.65), 0.2)
    world(strength=0.6, hue=0.02); sun(12, 170, 7, (1, 0.7, 0.45), 6)
    shoot((0, -10, 4), (0, 60, 5), 28, mist=(10, 160), mist_col=(1, 0.75, 0.6), mist_amt=1.0, exposure=0.3)
@scene
def sunburst():
    new(); ground(z=0, strength=0.1); mountains(r=60, n=26, h=(5, 11))
    world(color=(0.1, 0.12, 0.25), strength=0.7); sky_sun((0, 160, 16), (1, 0.75, 0.35), 500, 4)
    shoot((0, -5, 1.8), (0, 50, 7), 24, mist=(20, 160), mist_col=(1, 0.6, 0.3), mist_amt=0.5, exposure=0.0, glare=0.25, vignette=0.5)
@scene
def tiny_fig():
    new(); mt = pbr('tf', 'clay_plaster', (0.7, 0.5, 0.35), 0.15, bump=2.0)
    rockwall((0, 22, 14), (math.pi / 2, 0, 0), (110, 55), mt, 1.0, (200, 100)); ground(z=0, strength=0.5)
    person(-3, 12, math.pi, cloth('rb', (0.08, 0.06, 0.05)), s=1.3)
    world(strength=0.6); sun(35, 150, 9, (1, 0.75, 0.5), 3)
    shoot((-3, -4, 2.2), (-1, 22, 8), 24, 4, 16, mist=(10, 80), exposure=0.2)
@scene
def fissure():
    new(); m = ROCKM()
    for sx in (-1, 1): rockwall((sx * (2.2), 5, 4), (math.pi / 2, 0, math.pi / 2), (22, 9), m, 0.8)
    rockwall((0, 5, 6.5), (0, 0, 0), (5, 22), m, 0.6); rockwall((0, 5, 0), (0, 0, 0), (5, 22), m, 0.5)
    area((0, 14, 2.5), (1, 0.8, 0.55), 6000, 2.5, (math.pi / 2, 0, 0)); world(color=(0, 0, 0), strength=0); fog((0, 6, 3), (4, 20, 6), 0.04, (0.9, 0.8, 0.7))
    shoot((0, -4, 1.6), (0, 14, 2.2), 28, 3, 10, mist=None, exposure=0.8, vignette=0.6)

def cave_walls(m=None, back=True):
    m = m or ROCKM()
    for loc, rot in ((((0, 5, 3), (math.pi / 2, 0, 0)),) if back else ()) + (((-4.2, 0, 3), (math.pi / 2, 0, math.pi / 2)), ((4.2, 0, 3), (math.pi / 2, 0, math.pi / 2)), ((0, 0, 4.5), (0, 0, 0)), ((0, 0, 0), (0, 0, 0))):
        rockwall(loc, rot, (14, 9), m, 0.55, (90, 60))
def cave_light(mode):
    world(color=(0, 0, 0), strength=0)
    if mode == 'moon': spot((-2.6, -1.0, 3.2), (-0.2, 4.4, 1.2), (0.55, 0.7, 1.0), 9000, 40); area((3, -1, 2.5), (0.4, 0.55, 1), 60, 1, (0, math.radians(-70), 0)); fog((0, 1.5, 2), (7, 9, 4), 0.025, (0.8, 0.85, 1), 0.6)
    elif mode == 'gold': spot((-2.6, -1.0, 3.2), (-0.2, 4.4, 1.2), (1, 0.75, 0.35), 16000, 50); area((3, -1, 2.5), (1, 0.7, 0.3), 120, 1, (0, math.radians(-70), 0)); fog((0, 1.5, 2), (7, 9, 4), 0.03, (1, 0.8, 0.5), 0.6)
    else: spot((-2.6, -1.0, 3.2), (-0.2, 4.4, 1.2), (0.5, 0.6, 0.9), 5000, 40)
def cave(mode, fig=True, pos=(0.5, -3.6, 1.5), tgt=(0, 1.5, 0.8), lens=30, **kw):
    new(); cave_walls(); cave_light(mode)
    if fig: seat(person(0, 1.6, math.radians(-20), cloth('dk', (0.05, 0.05, 0.06))), 0.62)
    kw.setdefault('exposure', 1.0); kw.setdefault('vignette', 0.65); kw.setdefault('cb_gain', (0.95, 1.0, 1.1) if mode in ('moon', 'dark') else (1.1, 1.0, 0.85))
    shoot(pos, tgt, lens, 2.2, 5.2, mist=None, look='AgX - High Contrast', **kw)
@scene
def cave_moon(): cave('moon')
@scene
def cave_gold(): cave('gold')
@scene
def cave_dark(): cave('dark', fig=False)
@scene
def cave_bowed():
    cave('dark', fig=True, pos=(0.4, -3.0, 1.0), tgt=(0, 1.6, 0.4), lens=40)
@scene
def cave_view():
    new(); cave_walls(back=False); world(strength=1.0, hue=0.03); sun(35, 160, 9, (1, 0.8, 0.55), 3)
    g = ground(z=-18, strength=4, size=500); village(xr=(-3, 5), yr=(10, 22), spacing=9, detail=False)
    NOMTN = True
    for o in bpy.context.scene.objects:
        if o.name.startswith(('House', 'house', 'box')) and o.location.y > 40: pass
    for o in list(bpy.context.scene.objects):
        if o.type == 'MESH' and o.location.y > 40 and o.location.z < 5: o.location.z -= 20
    # cut an opening: push the front wall away
    shoot((0, -1.0, 1.2), (0, 40, -3), 26, mist=(30, 300), mist_col=(1, 0.7, 0.45), mist_amt=0.8, exposure=0.5, vignette=0.6)
@scene
def dates():
    new(); st = pbr('fl', 'clay_plaster', (0.5, 0.42, 0.34), 0.5, bump=1.0); ground(z=0, strength=0.05, mat=st, size=20); lt = flat('lth', (0.33, 0.17, 0.08), 0.5)
    obj('sphere', (-0.12, 0.3, 0.14), (0.15, 0.08, 0.17), lt, rot=(0, 0, 0.3)); obj('cyl', (-0.08, 0.3, 0.3), (0.025, 0.025, 0.1), lt)
    for i in range(10): obj('sphere', (0.12 + random.uniform(-.1, .12), 0.2 + random.uniform(-.12, .12), 0.03), (0.025, 0.014, 0.014), flat('date', (0.14, 0.05, 0.03), 0.3), rot=(0, 0, random.uniform(0, 3)))
    sun(20, 40, 6, (1, 0.75, 0.45), 3); world(strength=0.25)
    shoot((0.25, -0.9, 0.3), (0.12, 0.2, 0.04), 70, 2.0, 1.1, mist=None, exposure=0.3)
@scene
def pouch():
    new(); ground(z=0, strength=0.05, mat=M.CLAY, size=20); lt = flat('lth', (0.35, 0.19, 0.1), 0.6)
    obj('sphere', (0, 0.4, 0.12), (0.25, 0.18, 0.14), lt); obj('cyl', (0, 0.4, 0.28), (0.12, 0.12, 0.06), lt)
    for k in range(3): obj('cyl', (0.0 + k * 0.01, 0.4, 0.31), (0.012, 0.012, 0.3), flat('cord', (0.2, 0.1, 0.05), .7), rot=(0, math.pi / 2 + k * 0.5, k))
    hand((-0.35, 0.2, 0.35), (math.pi / 2 + 0.7, 0, 1.0), 1.4, cloth('sl', (0.1, 0.12, 0.1))); hand((0.35, 0.2, 0.35), (math.pi / 2 + 0.7, 0, -1.0), 1.4, cloth('sl', (0.1, 0.12, 0.1)))
    sun(35, 30, 6, (1, 0.8, 0.55), 3); world(strength=0.3)
    shoot((0, -0.7, 0.9), (0, 0.4, 0.2), 55, 2.0, 1.0, mist=None, exposure=0.4)
@scene
def rope():
    new(); lt = flat('rope', (0.55, 0.4, 0.22), 0.9); nz = lt.node_tree.nodes.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 90
    b = lt.node_tree.nodes.new('ShaderNodeBump'); lt.node_tree.links.new(nz.outputs['Fac'], b.inputs['Height']); lt.node_tree.links.new(b.outputs['Normal'], lt.node_tree.nodes['Principled BSDF'].inputs['Normal'])
    cyl((0, 1, 1.5), 0.05, 8, lt, rot=(0, math.pi / 2 - 0.1, 0)); obj('sphere', (-1.6, 1, 1.52), (0.12, 0.12, 0.1), lt)
    for k in range(8): obj('cyl', (-3 + k * 0.5, 1, 1.5), (0.055, 0.055, 0.03), flat('d', (0.25, 0.15, 0.08), 1), rot=(0, math.pi / 2 - 0.1, 0))
    spot((-3, -2, 3), (0, 1, 1.5), (1, 0.7, 0.4), 4000, 40); world(color=(0.01, 0.01, 0.015), strength=0.2)
    shoot((0, -1.2, 1.55), (0, 1, 1.5), 60, 1.8, 2.2, mist=None, exposure=0.5, vignette=0.7)
@scene
def hands_head():
    new(); cave_walls(); cave_light('gold'); sk = skin()
    for sx in (-1, 1): hand((sx * 0.5, -2.7, 1.6), (0.5, sx * 0.4, sx * 0.5), 1.3, cloth('sl', (0.05, 0.05, 0.06)))
    shoot((0, -3.3, 1.6), (0, 2, 1.5), 30, 2.2, 1.2, mist=None, exposure=1.0, vignette=0.7)
@scene
def cells():
    new(); em = flat('cell', (1, 0.8, 0.5), 0.2, emit=(1, 0.65, 0.3), emit_str=1.5); mb = flat('cell2', (0.8, 0.9, 1), 0.2, emit=(0.5, 0.7, 1), emit_str=1.0)
    for i in range(18):
        ph = random.uniform(0, 6.28); r = random.uniform(0.2, 0.6); obj('sphere', (math.cos(ph) * r * 1.2, 2 + random.uniform(-.3, .3), 1.5 + math.sin(ph) * r), (0.22, 0.22, 0.22), em if i % 3 else mb)
    obj('sphere', (1.6, 2.2, 1.0), (1.0, 1.0, 1.0), flat('wall', (0.5, 0.15, 0.1), 0.3, emit=(0.6, 0.15, 0.1), emit_str=0.3))
    world(color=(0.0, 0.0, 0.01), strength=0.1); point((0, 0, 2.5), (1, 0.8, 0.6), 300, 0.5)
    shoot((0, -3.5, 1.5), (0.2, 2, 1.5), 50, 2.4, 5.5, mist=None, exposure=0.5, glare=0.5)
@scene
def pen():
    new(); pp = flat('parch', (0.78, 0.65, 0.42), 0.9); ground(z=0, strength=0.02, mat=pp, size=10)
    obj('cyl', (0.15, 0.1, 0.09), (0.012, 0.012, 0.7), flat('reed', (0.45, 0.32, 0.12), .5), rot=(0.4, 1.0, 0.3))
    obj('sphere', (-0.01, 0.0, 0.003), (0.012, 0.018, 0.004), flat('ink', (0.02, 0.02, 0.03), 0.2))
    obj('sphere', (-0.01, 0.0, 0.003), (0.012, 0.018, 0.004), flat('ink', (0.02, 0.02, 0.03), 0.2))
    for k in range(9): obj('sphere', (-0.2 + k * 0.025, -0.07 + math.sin(k) * 0.02, 0.002), (0.012, 0.004, 0.002), flat('ink', (0.03, 0.03, 0.04), 0.3))
    point((-0.3, -0.3, 0.4), (1, 0.7, 0.4), 40, 0.05); world(strength=0.05)
    shoot((0.05, -0.35, 0.22), (0.0, 0.0, 0.0), 60, 5.6, 0.42, mist=None, exposure=0.6)
@scene
def match():
    new(); world(color=(0, 0, 0), strength=0)
    obj('cyl', (0, 0, 1.5), (0.025, 0.025, 1.0), flat('stick', (0.5, 0.32, 0.12), 0.7), rot=(0, 0.35, 0)); obj('sphere', (-0.17, 0, 1.97), (0.045, 0.045, 0.06), flat('head', (0.5, 0.05, 0.03), 0.4, emit=(1, .3, .1), emit_str=3))
    fl = obj('sphere', (-0.18, 0, 2.1), (0.06, 0.06, 0.17), emit('fl', (1, 0.6, 0.2), 60)); point((-0.18, 0, 2.1), (1, 0.55, 0.18), 200, 0.05)
    for k in range(40):
        ang = random.uniform(0, 6.28); r = random.uniform(0.05, 0.5); obj('sphere', (-0.18 + math.cos(ang) * r, math.sin(ang) * r * 0.4, 2.0 + random.uniform(0, 0.6)), (0.006,) * 3, emit('sp', (1, 0.55, 0.15), 80))
    shoot((0, -2.4, 1.9), (-0.1, 0, 2.0), 85, 2.0, 2.4, mist=None, exposure=0.2, glare=0.4, vignette=0.7)
@scene
def chest():
    new(); sh = cloth('rb', (0.1, 0.07, 0.05)); ground(z=0, strength=0.05, mat=pbr('fl', 'clay_plaster', (0.4, 0.3, 0.22), 0.5), size=10)
    person(0, 1.0, 0, sh, s=1.0); point((-1, -1, 2), (1, 0.6, 0.3), 700, 0.3); world(color=(0.01, 0.01, 0.02), strength=0.3)
    shoot((0, -0.45, 1.05), (0, 1.0, 1.05), 40, 2.0, 1.4, mist=None, exposure=0.4, vignette=0.7)
@scene
def door():
    new(); wl = pbr('dw', 'clay_plaster', (0.7, 0.5, 0.35), 0.5, bump=0.8); ground(z=0, strength=0.05, mat=wl, size=30)
    box((-2.4, 3, 1.6), (3.6, 0.4, 3.2), wl, 0.05, 0.03); box((2.4, 3, 1.6), (3.6, 0.4, 3.2), wl, 0.05, 0.03); box((0, 3, 2.6), (1.4, 0.4, 1.2), wl, 0.05, 0.03)
    dr = box((-0.55, 2.5, 1.0), (1.1, 0.08, 2.0), WDM, 0.02, 0.01, rot=(0, 0, 1.1)); world(strength=0.12)
    area((0, 9, 2), (1, 0.7, 0.4), 40000, 6, (math.pi / 2, 0, 0)); fog((0, 3, 1.5), (6, 8, 3), 0.04, (1, 0.8, 0.6))
    shoot((0.3, -0.5, 0.6), (0, 3, 1.4), 24, mist=None, exposure=0.2, glare=0.5)
@scene
def blanket():
    new(); ground(z=0, strength=0.05, mat=pbr('fl', 'clay_plaster', (0.4, 0.3, 0.22), 0.5), size=10)
    wr = cloth('thick', (0.4, 0.22, 0.12)); p = person(0, 2, 0, cloth('in', (0.12, 0.08, 0.06)))
    lib._meta('blk', [((0, 0, 0.55), 1, (.46, .4, .6)), ((0, 0, 1.1), 1, (.4, .32, .35)), ((0, 0, 1.55), 1, (.3, .26, .2))], wr, p, res=0.04, k=1)
    hand((0.6, 1.1, 0.9), (math.pi / 2 - 0.2, 0, 0.6), 1.7, cloth('sl', (0.2, 0.1, 0.1)))
    point((-1.5, -0.5, 1.4), (1, 0.55, 0.22), 150, 0.2); world(color=(0.01, 0.01, 0.02), strength=0.15)
    shoot((0.4, -2.0, 1.2), (0, 2, 1.1), 45, 2.2, 4, mist=None, exposure=0.4, vignette=0.6)
@scene
def fire_two():
    new(); ground(z=0, strength=0.05, mat=pbr('fl', 'clay_plaster', (0.4, 0.3, 0.22), 0.5), size=14); dk = cloth('sil', (0.04, 0.03, 0.03))
    seat(person(-1.1, 2.2, math.radians(-70), dk), 0.7); seat(person(1.1, 2.2, math.radians(70), dk), 0.7)
    fm = emit('fl', (1, 0.5, 0.15), 12); obj('sphere', (0, 2.2, 0.15), (0.07, 0.07, 0.16), fm); box((0, 2.2, 0.04), (0.5, 0.5, 0.08), M.DARK, 0.02, 0.01); point((0, 2.2, 0.35), (1, 0.5, 0.15), 300, 0.1)
    box((0, 6, 2), (10, 0.4, 4), pbr('wl', 'clay_plaster', (0.5, 0.35, 0.25), 0.6), 0.1, 0.05); world(color=(0.01, 0.01, 0.02), strength=0.1)
    shoot((0, -1.5, 1.0), (0, 2.2, 0.8), 35, 2.4, 3.7, mist=None, exposure=0.6, vignette=0.6)
@scene
def woman():
    new(); ground(z=0, strength=0.05, mat=pbr('fl', 'clay_plaster', (0.35, 0.28, 0.22), 0.5), size=14)
    p = person(0, 2.2, 0, cloth('abaya', (0.03, 0.06, 0.07)), s=1.0); box((0, 5.5, 2.5), (12, 0.4, 5), pbr('wl', 'clay_plaster', (0.3, 0.25, 0.2), 0.6), 0.1, 0.05)
    area((-2.2, -0.5, 2.6), (1, 0.75, 0.5), 300, 2, (1.1, 0, -0.6)); area((2.5, 4.5, 2.4), (0.6, 0.7, 1.0), 150, 2, (1.2, 0, 0.3)); world(color=(0.005, 0.01, 0.02), strength=0.2)
    shoot((0, -1.6, 0.45), (0, 2.2, 1.6), 50, 2.8, 3.8, mist=None, exposure=0.5, vignette=0.6)
@scene
def doorway():
    new(); wl = pbr('dw', 'clay_plaster', (0.6, 0.45, 0.3), 0.5, bump=0.8); ground(z=0, strength=0.05, mat=wl, size=30)
    box((-3.1, 3, 1.6), (4.5, 0.5, 3.2), wl, 0.05, 0.03); box((3.1, 3, 1.6), (4.5, 0.5, 3.2), wl, 0.05, 0.03); box((0, 3, 2.7), (1.8, 0.5, 1.0), wl, 0.05, 0.03)
    person(0, 3.7, 0, cloth('abaya', (0.04, 0.07, 0.08)), s=1.0); person(0, 9, math.pi, cloth('rb', (0.1, 0.07, 0.05)), s=1.05, staff=True); mountains(r=70, n=14, h=(10, 20))
    world(strength=0.7); sun(25, 195, 10, (1, 0.7, 0.4), 3)
    shoot((0, -1.5, 1.4), (0, 6, 1.3), 28, 3.5, 4, mist=(5, 80), exposure=0.3)
@scene
def clasp():
    new(); ground(z=0, strength=0.05, mat=pbr('fl', 'clay_plaster', (0.3, 0.24, 0.2), 0.5), size=10)
    hand((-0.12, 1, 0.9), (math.pi / 2, 0, -0.9), 2.0, cloth('s1', (0.5, 0.2, 0.2))); hand((0.12, 1.0, 0.92), (math.pi / 2, 0, 0.9), 2.0, cloth('s2', (0.1, 0.1, 0.1)))
    spot((-2, -1, 3), (0, 1, 0.9), (1, 0.7, 0.4), 3000, 40); world(color=(0.01, 0.01, 0.015), strength=0.1)
    shoot((0, -0.6, 1.1), (0, 1, 0.9), 55, 2.0, 1.6, mist=None, exposure=0.5, vignette=0.6)
@scene
def coins():
    new(); ground(z=0, strength=0.05, mat=pbr('fl', 'clay_plaster', (0.3, 0.24, 0.2), 0.5), size=10); gd = metal('gold', (1.0, 0.75, 0.3), 0.25)
    hand((-0.1, 1.0, 1.3), (2.4, 0, -0.3), 1.8, cloth('s1', (0.3, 0.2, 0.1))); hand((0.1, 1.05, 0.7), (math.pi / 2 - 0.6, 0, 0.3), 1.8, cloth('s2', (0.15, 0.1, 0.08)))
    for k in range(6): obj('cyl', (-0.1 + random.uniform(-.02, .02), 1.0, 1.15 - k * 0.07), (0.035, 0.035, 0.008), gd)
    spot((-2, -1, 3), (0, 1, 1.0), (1, 0.8, 0.5), 3500, 40); world(color=(0.01, 0.01, 0.015), strength=0.1)
    shoot((0, -0.8, 1.1), (0, 1, 1.0), 55, 1.8, 1.8, mist=None, exposure=0.5, vignette=0.6)
@scene
def bread_water():
    new(); ground(z=0, strength=0.05, mat=M.CLAY, size=10); ceram = flat('cer', (0.5, 0.25, 0.1), 0.4); br = flat('br', (0.65, 0.45, 0.2), 0.7)
    obj('sphere', (-0.2, 1, 1.0), (0.14, 0.14, 0.2), ceram, rot=(0.5, 0, 0)); obj('cyl', (-0.12, 1, 1.2), (0.04, 0.04, 0.12), ceram, rot=(0.5, 0, 0))
    obj('cyl', (0.0, 1, 0.95), (0.006, 0.006, 0.4), flat('wat', (0.6, 0.8, 1), 0.05), rot=(0, 0, 0))
    obj('cyl', (0.0, 1, 0.62), (0.1, 0.1, 0.12), ceram)
    for k in range(3): obj('cyl', (0.4 + k * 0.1, 1.0 + k * 0.05, 0.62), (0.17, 0.17, 0.035), br)
    box((0, 1, 0.5), (1.6, 1.0, 0.05), WDM, 0.02, 0.01); sun(40, 40, 6, (1, 0.8, 0.55), 3); world(strength=0.3)
    shoot((0, -0.9, 1.2), (0.1, 1, 0.8), 55, 2.0, 1.9, mist=None, exposure=0.3)
@scene
def embrace():
    new(); ground(z=0, strength=0.3); dk = cloth('sil', (0.05, 0.03, 0.03)); person(-0.28, 3, math.radians(-20), dk); person(0.28, 3, math.radians(20), cloth('sil2', (0.12, 0.06, 0.05)), s=0.95)
    world(strength=0.4, hue=0.0); sun(6, 180, 9, (1, 0.5, 0.2), 3); sky_sun((0, 120, 7), (1, 0.5, 0.2), 70, 7)
    shoot((0, -2.5, 1.2), (0, 3, 1.3), 38, 3.5, 5.5, mist=(5, 80), mist_col=(1, 0.45, 0.15), mist_amt=0.7, exposure=0.1)
@scene
def debris():
    new(); ground(z=0, strength=0.3, mat=M.CLAY)
    box((0, 3, 0.2), (2.6, 0.4, 0.4), WDM, 0.04, 0.03, rot=(0, 0, 0)); box((0.8, 3.1, 0.7), (2.4, 0.3, 0.3), WDM, 0.04, 0.03, rot=(0, 0.6, 0.2))
    for k in range(8): obj('sphere', (random.uniform(-1.5, 1.5), 3 + random.uniform(-.5, .5), 0.1), (.2, .15, .1), M.CLAY)
    p = person(-1.3, 2.4, 0.6, M.CLOTHS[2]); p.rotation_euler.x = 1.3
    person(0.9, 3.2, math.pi / 2, M.CLOTHS[3]); fog((0, 3, 1), (10, 8, 3), 0.03, (0.9, 0.75, 0.55))
    world(strength=0.5); sun(25, 40, 9, (1, 0.75, 0.5), 3)
    shoot((1.5, -2.5, 1.5), (0, 3, 0.7), 35, 3, 5, mist=(5, 60), exposure=0.2)
@scene
def balance():
    new(); ground(z=0, strength=0.5); gd = metal('gold', (1.0, 0.75, 0.3), 0.2)
    cyl((0, 6, 1.5), 0.06, 3, gd); box((0, 6, 3.0), (2.8, 0.08, 0.08), gd, 0.01, 0); obj('sphere', (0, 6, 3.1), (0.12, 0.12, 0.12), gd)
    for sx in (-1.4, 1.4):
        obj('cyl', (sx, 6, 2.0), (0.55, 0.55, 0.05), gd)
        for ang in (0, 2.1, 4.2): obj('cyl', (sx + math.cos(ang) * 0.5, 6 + math.sin(ang) * 0.5, 2.5), (0.01, 0.01, 1.0), gd, rot=(0, 0, 0))
    box((0, 6, 0.1), (1.0, 1.0, 0.2), gd, 0.03, 0)
    world(strength=0.5, hue=0.0); sky_sun((0, 90, 6), (1, 0.7, 0.35), 200, 6); sun(8, 180, 8, (1, 0.7, 0.4), 3)
    shoot((0, -3, 2.3), (0, 6, 2.4), 40, 5, 9, mist=(10, 100), mist_col=(1, 0.65, 0.3), mist_amt=0.6, exposure=0.1, glare=0.4)
@scene
def scrolls():
    new(); wall = pbr('wall', 'clay_plaster', (0.5, 0.38, 0.26), 0.6, bump=0.6); box((0, 3, 2), (10, 0.4, 5), wall, 0.1, 0.05); ground(z=0, strength=0.05, mat=wall, size=20)
    for r in range(4):
        box((0, 2.7, 0.6 + r * 0.6), (4, 0.4, 0.05), WDM, 0.01, 0)
        for i in range(10): cyl((-1.7 + i * 0.38, 2.7, 0.75 + r * 0.6), 0.07, 0.5, flat('s', (0.72 + 0.05 * (i % 2), 0.6, 0.4), 0.9), rot=(0, math.pi / 2, 0.1 * ((i * r) % 3)))
    point((1.2, 1.2, 1.4), (1, 0.55, 0.2), 120, 0.05); world(color=(0.01, 0.008, 0.01), strength=0.1)
    shoot((-0.4, -0.5, 1.4), (0.2, 2.7, 1.3), 40, 2.4, 3.2, mist=None, exposure=0.6)
@scene
def trace():
    new(); pp = flat('parch', (0.72, 0.6, 0.4), 0.9); ground(z=0, strength=0.02, mat=pp, size=10)
    for r in range(4):
        for k in range(12): box((-0.3 + k * 0.05, 0.1 + r * 0.04, 0.006), (0.03, 0.012, 0.012), flat('ink', (0.1, 0.07, 0.04), 0.5), 0.002, 0)
    hand((0.0, -0.1, 0.12), (1.9, 0, 0.0), 0.8, cloth('s', (0.12, 0.1, 0.1))); point((-0.2, -0.3, 0.5), (1, 0.6, 0.3), 25, 0.05); world(strength=0.03)
    shoot((0.0, -0.45, 0.3), (0.0, 0.1, 0.0), 60, 5.6, 0.55, mist=None, exposure=0.6)
@scene
def ring():
    new(); fl = pbr('fl', 'clay_plaster', (0.25, 0.2, 0.17), 0.5, bump=0.6); ground(z=0, strength=0.05, mat=fl, size=30); st = pbr('is', 'clay_plaster', (0.2, 0.18, 0.16), 0.5)
    seat(person(0, 0, 0.5, cloth('sit', (0.08, 0.06, 0.05))), 0.62)
    for i in range(12):
        an = i / 12 * math.tau; idol(math.cos(an) * 5, math.sin(an) * 5, an + math.pi / 2, 2.2, st)
    spot((0, 0, 8), (0, 0, 0), (1, 0.8, 0.55), 12000, 55); world(color=(0.0, 0.0, 0.0), strength=0)
    shoot((0, -0.5, 10), (0, 0, 0), 24, mist=None, exposure=0.8, vignette=0.7)
@scene
def mob():
    new(); ground(z=0, strength=0.3); tm = emit('torch', (1, 0.5, 0.15), 30)
    for i in range(26):
        x = random.uniform(-6, 6); y = random.uniform(3, 14); p = person(x, y, math.pi + random.uniform(-.3, .3), cloth('sil', (0.03, 0.02, 0.02)), s=random.uniform(.95, 1.05))
        if i % 3 == 0: obj('sphere', (x, y - 0.35, 2.0), (0.1, 0.1, 0.16), tm); point((x, y - 0.35, 2.0), (1, 0.5, 0.15), 120, 0.1)
        if i % 3 == 1: cyl((x + 0.3, y - 0.2, 1.4), 0.015, 2.4, WDM, rot=(0.1, 0, 0))
    world(color=(0.01, 0.015, 0.04), strength=0.4); fog((0, 8, 2), (20, 20, 5), 0.04, (0.9, 0.6, 0.45))
    shoot((0, -3, 1.2), (0, 10, 1.6), 28, 2.8, 8, mist=(8, 50), mist_col=(0.4, 0.2, 0.15), mist_amt=0.5, exposure=0.7, vignette=0.6)
@scene
def staff_grip():
    new(); ground(z=0, strength=0.05, size=10, mat=WDM)
    cyl((0, 1, 1.0), 0.03, 2.2, WDM)
    pale = flat('pale', (0.55, 0.42, 0.32), 0.6)
    for i in range(4): obj('sphere', (0.0, 0.97, 1.1 + i * 0.045), (0.05, 0.03, 0.02), pale)
    obj('sphere', (0.0, 0.98, 1.2), (0.045, 0.05, 0.12), pale)
    hand((0.02, 0.95, 0.6), (math.pi / 2 + 0.2, 0, 0), 1.2, cloth('s', (0.1, 0.06, 0.05)))
    point((-1, -0.3, 1.5), (1, 0.55, 0.22), 100, 0.1); world(color=(0.005, 0.005, 0.01), strength=0.1)
    shoot((0.1, -0.5, 1.3), (0, 1, 1.15), 70, 1.6, 1.5, mist=None, exposure=0.5, vignette=0.7)
@scene
def red_window():
    new(); wl = pbr('rw', 'clay_plaster', (0.3, 0.22, 0.18), 0.5, bump=0.8)
    box((-4.3, 1.2, 2), (5, 0.6, 4), wl, 0.05, 0.03); box((4.3, 1.2, 2), (5, 0.6, 4), wl, 0.05, 0.03); box((0, 1.2, 3.8), (4, 0.6, 1.3), wl, 0.05, 0.03); box((0, 1.2, 0.2), (4, 0.6, 0.5), wl, 0.05, 0.03)
    ground(z=-8, strength=1.5, size=300); village(xr=(-4, 5), yr=(6, 16), spacing=9, detail=False)
    for o in list(bpy.context.scene.objects):
        if o.type == 'MESH' and o.location.y > 15 and o.location.z < 3 and o.name.startswith('box'): pass
    mountains(r=100, n=16, h=(10, 25)); world(strength=0.6, hue=0.0); sun(5, 180, 12, (1, 0.25, 0.08), 3); sky_sun((0, 140, 8), (1, 0.25, 0.08), 80, 10)
    shoot((0, -3, 1.9), (0, 20, 0.6), 28, mist=(10, 150), mist_col=(1, 0.25, 0.1), mist_amt=1.0, exposure=-0.1, cb_gain=(1.15, 0.9, 0.8), vignette=0.65)
@scene
def summit():
    new(); starry(1.2); rocks_ground(z=-1, strength=2.0, size=60); mx = cloth('sil', (0.02, 0.02, 0.03))
    box((0, 6, -0.2), (4, 4, 1.4), M.ROCK, 0.4, 0.1); person(0, 6, math.pi, mx, s=1.0).location.z = 0.45
    area((0, -6, 8), (0.5, 0.6, 1), 200, 15, (0.3, 0, 0))
    shoot((0, -1.5, 1.0), (0, 8, 5), 22, mist=None, exposure=1.2, glare=1.4, vignette=0.4, cb_gain=(0.95, 1.0, 1.1))
@scene
def lamp(lit=True):
    new(); br = metal('brass', (0.85, 0.6, 0.2), 0.3); ground(z=0, strength=0.02, size=10, mat=M.CLAY)
    obj('sphere', (0, 1, 0.12), (0.18, 0.12, 0.06), br); obj('sphere', (0.2, 1, 0.14), (0.12, 0.04, 0.04), br, rot=(0, 0, 0)); obj('cyl', (0.0, 1, 0.1), (0.1, 0.1, 0.04), br)
    obj('cyl', (0.12, 1, 0.19), (0.01, 0.01, 0.06), flat('wick', (0.2, 0.1, 0.05), 1))
    if lit:
        obj('sphere', (0.12, 1, 0.26), (0.018, 0.018, 0.06), emit('fl', (1, 0.6, 0.2), 80)); point((0.12, 1, 0.26), (1, 0.55, 0.18), 20, 0.02)
    world(color=(0, 0, 0), strength=0)
    if not lit: point((0.5, -0.5, 0.5), (0.5, 0.6, 1.0), 3, 0.2)
    shoot((0, -0.35, 0.25), (0.08, 1, 0.2), 90, 1.4, 1.4, mist=None, exposure=0.4, vignette=0.7, glare=0.5)
@scene
def lamp_out(): lamp(False)
def cave_mouth(night):
    new(); m = ROCKM()
    for sx in (-1, 1): rockwall((sx * 2.6, 0, 2.5), (math.pi / 2, 0, math.pi / 2), (10, 6), m, 0.7, (80, 60))
    rockwall((0, 0, 4.8), (0, 0, 0), (6, 10), m, 0.6, (60, 80)); rockwall((0, 0, 0), (0, 0, 0), (6, 10), m, 0.5, (60, 80))
    g = ground(z=-6, strength=2, size=200); mountains(r=90, n=14, h=(10, 20))
    if night: starry(1.0); area((-4, -10, 8), (0.55, 0.65, 1), 600, 8, (0.8, 0, -0.4))
    else: world(strength=1.0, hue=0.03); sun(40, 160, 9, (1, 0.85, 0.6), 3)
    shoot((0.3, -3.0, 1.3), (0, 20, 1.5), 26, mist=(20, 200), exposure=0.6 if not night else 1.0, vignette=0.6, glare=0.8)
@scene
def cave_day(): cave_mouth(False)
@scene
def cave_night(): cave_mouth(True)
@scene
def pit():
    new(); m = ROCKM(); bpy.ops.mesh.primitive_cylinder_add(vertices=64, radius=2.2, depth=14, location=(0, 0, 6), end_fill_type='NOTHING'); o = bpy.context.object
    bpy.ops.object.shade_smooth()
    for nm, sc_, st in (('p1', 1.0, 0.5), ('p2', 0.5, 0.4)):
        t = bpy.data.textures.new(nm, 'VORONOI'); t.noise_scale = sc_; d = o.modifiers.new('d', 'DISPLACE'); d.texture = t; d.strength = st; d.texture_coords = 'GLOBAL'
    sd = o.modifiers.new('s', 'SUBSURF'); sd.levels = 2
    o.data.materials.append(m); bpy.ops.mesh.primitive_plane_add(size=40, location=(0, 0, 0)); bpy.context.object.data.materials.append(m)
    starry(0.6); area((0, 0, 14), (0.7, 0.8, 1), 6000, 3, (0, 0, 0))
    shoot((0.3, 0.2, 0.3), (0, 0, 12), 18, mist=None, exposure=0.9, vignette=0.7)
@scene
def cliff_storm():
    new(); st = pbr('cs', 'clay_plaster', (0.3, 0.27, 0.25), 0.2, bump=2.0); rocks_ground(z=-2, strength=2, size=60, mat=st)
    box((0, 5, -0.8), (6, 5, 2.2), M.ROCK, 0.5, 0.1); mx = cloth('sil', (0.02, 0.02, 0.03)); p = person(0, 5, math.pi, mx, s=1.0); p.location.z = 0.3
    lib._meta('cape', [((0, -0.35, 1.0), 1, (.5, .12, .75)), ((0, -0.7, 0.9), 1, (.4, .1, .6)), ((0.1, -1.0, 0.8), 1, (.25, .1, .4))], mx, p, res=0.04, k=1)
    world(color=(0.04, 0.05, 0.1), strength=0.8); area((0, 20, 8), (0.55, 0.65, 1.0), 40000, 14, (math.pi / 2 + 0.3, 0, 0)); spot((-6, 12, 6), (0, 5, 1.5), (0.6, 0.7, 1), 8000, 40)
    fog((0, 12, 4), (60, 40, 10), 0.015, (0.6, 0.65, 0.85), 0.3)
    shoot((0, -2.5, 0.6), (0, 6, 2.2), 24, 3, 8, mist=(10, 70), mist_col=(0.4, 0.45, 0.6), mist_amt=0.8, exposure=0.5, vignette=0.55, cb_gain=(0.9, 0.97, 1.15))

if __name__ == '__main__':
    if NAME == 'LIST': print(' '.join(SC)); sys.exit()
    SC[NAME]()
    lib.render(a, 1)
