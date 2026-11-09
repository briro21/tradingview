"""Shared Blender scene library for the Hira video (Cycles, CPU-friendly)."""
import bpy, bmesh, math, random, os, sys
from mathutils import Vector, Euler
A = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'assets')

def args():
    a = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
    return dict(out=a[0] if a else '/tmp/shot_', samples=int(a[1]) if len(a) > 1 else 16, res=float(a[2]) if len(a) > 2 else 0.5,
                start=int(a[3]) if len(a) > 3 else None, end=int(a[4]) if len(a) > 4 else None)

def reset(seed=7):
    random.seed(seed)
    bpy.ops.wm.read_factory_settings(use_empty=True)
    return bpy.context.scene

def img(name, nc=False):
    i = bpy.data.images.load(os.path.join(A, name), check_existing=True)
    if nc: i.colorspace_settings.name = 'Non-Color'
    return i

def pbr(name, tex, tint, scale, bump=0.4):
    m = bpy.data.materials.new(name); m.use_nodes = True; N = m.node_tree.nodes; L = m.node_tree.links; bsdf = N['Principled BSDF']
    tc = N.new('ShaderNodeTexCoord'); mp = N.new('ShaderNodeMapping'); mp.inputs['Scale'].default_value = (scale,) * 3
    L.new(tc.outputs['Object'], mp.inputs['Vector'])
    def t(sfx, nc):
        n = N.new('ShaderNodeTexImage'); n.image = img(f'{tex}_{sfx}_2k.jpg', nc); n.projection = 'BOX'; n.projection_blend = 0.3
        L.new(mp.outputs['Vector'], n.inputs['Vector']); return n
    d, r, h = t('diff', False), t('rough', True), t('disp', True)
    mix = N.new('ShaderNodeMix'); mix.data_type = 'RGBA'; mix.blend_type = 'MULTIPLY'; mix.inputs['Factor'].default_value = 1
    L.new(d.outputs['Color'], mix.inputs['A']); mix.inputs['B'].default_value = (*tint, 1)
    nz = N.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 0.6; nz.inputs['Detail'].default_value = 6
    L.new(tc.outputs['Object'], nz.inputs['Vector'])
    ramp = N.new('ShaderNodeValToRGB'); ramp.color_ramp.elements[0].color = (0.72, 0.6, 0.5, 1); ramp.color_ramp.elements[1].color = (1.08, 1.0, 0.92, 1)
    L.new(nz.outputs['Fac'], ramp.inputs['Fac'])
    mix2 = N.new('ShaderNodeMix'); mix2.data_type = 'RGBA'; mix2.blend_type = 'MULTIPLY'; mix2.inputs['Factor'].default_value = 1
    L.new(mix.outputs['Result'], mix2.inputs['A']); L.new(ramp.outputs['Color'], mix2.inputs['B']); L.new(mix2.outputs['Result'], bsdf.inputs['Base Color'])
    L.new(r.outputs['Color'], bsdf.inputs['Roughness'])
    b = N.new('ShaderNodeBump'); b.inputs['Strength'].default_value = bump; b.inputs['Distance'].default_value = 0.05
    L.new(h.outputs['Color'], b.inputs['Height']); L.new(b.outputs['Normal'], bsdf.inputs['Normal'])
    return m

def flat(name, col, rough=0.8, sheen=0.0, emit=None, emit_str=0):
    m = bpy.data.materials.new(name); m.use_nodes = True; p = m.node_tree.nodes['Principled BSDF']
    p.inputs['Base Color'].default_value = (*col, 1); p.inputs['Roughness'].default_value = rough
    if sheen: p.inputs['Sheen Weight'].default_value = sheen
    if emit: p.inputs['Emission Color'].default_value = (*emit, 1); p.inputs['Emission Strength'].default_value = emit_str
    return m

def cloth(name, col):
    """Woven fabric: base colour + fine noise + sheen."""
    m = flat(name, col, 0.9, sheen=0.15); N = m.node_tree.nodes; L = m.node_tree.links
    nz = N.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 40; nz.inputs['Detail'].default_value = 3
    b = N.new('ShaderNodeBump'); b.inputs['Strength'].default_value = 0.15; L.new(nz.outputs['Fac'], b.inputs['Height'])
    L.new(b.outputs['Normal'], N['Principled BSDF'].inputs['Normal'])
    return m

def wood():
    m = bpy.data.materials.new('wood'); m.use_nodes = True; N = m.node_tree.nodes; L = m.node_tree.links
    w = N.new('ShaderNodeTexWave'); w.inputs['Scale'].default_value = 8; w.inputs['Distortion'].default_value = 6; w.inputs['Detail'].default_value = 4
    c = N.new('ShaderNodeValToRGB'); c.color_ramp.elements[0].color = (0.10, 0.05, 0.02, 1); c.color_ramp.elements[1].color = (0.32, 0.18, 0.08, 1)
    L.new(w.outputs['Fac'], c.inputs['Fac']); L.new(c.outputs['Color'], N['Principled BSDF'].inputs['Base Color'])
    N['Principled BSDF'].inputs['Roughness'].default_value = 0.85
    return m

class M:  # material palette, built lazily per scene
    pass
def materials():
    M.CLAY = pbr('clay', 'clay_plaster', (1.0, 0.55, 0.25), 0.6, bump=0.35)
    M.SAND = pbr('sand', 'aerial_beach_01', (1.0, 0.5, 0.2), 0.08, bump=0.4)
    M.ROCK = pbr('rock', 'clay_plaster', (0.55, 0.38, 0.28), 0.25, bump=1.2)
    M.WOOD = wood(); M.DARK = flat('dark', (0.03, 0.015, 0.01), 1); M.POT = flat('pot', (0.45, 0.2, 0.08), 0.6)
    M.CAMEL = flat('camel', (0.42, 0.25, 0.12), 0.95, sheen=0.3)
    M.WOOL = flat('wool', (0.8, 0.72, 0.6), 1.0, sheen=1.0)
    M.CLOTHS = [cloth('c%d' % i, c) for i, c in enumerate([(0.18, 0.04, 0.025), (0.5, 0.35, 0.2), (0.15, 0.09, 0.06), (0.75, 0.66, 0.5), (0.3, 0.06, 0.12)])]
    M.WHITE = cloth('white', (0.85, 0.82, 0.75))
    M.SILK = [cloth('silk%d' % i, c) for i, c in enumerate([(0.6, 0.02, 0.05), (0.25, 0.03, 0.4), (0.7, 0.05, 0.25), (0.15, 0.02, 0.35)])]
    for s in M.SILK: s.node_tree.nodes['Principled BSDF'].inputs['Roughness'].default_value = 0.45
    return M

_mc = {}
def _mesh(kind):
    if kind in _mc: return _mc[kind]
    me = bpy.data.meshes.new(kind); bm = bmesh.new()
    if kind == 'cyl': bmesh.ops.create_cone(bm, cap_ends=True, segments=12, radius1=1, radius2=1, depth=1)
    elif kind == 'sphere': bmesh.ops.create_uvsphere(bm, u_segments=20, v_segments=12, radius=1)
    bm.to_mesh(me); bm.free()
    for p in me.polygons: p.use_smooth = True
    _mc[kind] = me; return me

def col(): return bpy.context.scene.collection

def obj(kind, loc, scale, mat, rot=(0, 0, 0), parent=None):
    o = bpy.data.objects.new(kind, _mesh(kind)); col().objects.link(o)
    o.location = loc; o.scale = scale; o.rotation_euler = rot
    if not o.data.materials: o.data.materials.append(None)
    o.material_slots[0].link = 'OBJECT'; o.material_slots[0].material = mat
    if parent: o.parent = parent
    return o

def box(loc, size, mat, bevel=0.12, wobble=0.04, parent=None, rot=(0, 0, 0)):
    me = bpy.data.meshes.new('box'); bm = bmesh.new(); bmesh.ops.create_cube(bm, size=1.0)
    bmesh.ops.scale(bm, vec=size, verts=bm.verts); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new('box', me); col().objects.link(o); o.location = loc; o.rotation_euler = rot; o.data.materials.append(mat)
    if parent: o.parent = parent
    if bevel:
        m = o.modifiers.new('bv', 'BEVEL'); m.width = bevel; m.segments = 3; m.use_clamp_overlap = True
        if wobble:
            s = o.modifiers.new('ss', 'SUBSURF'); s.levels = s.render_levels = 2; s.subdivision_type = 'SIMPLE'
            tx = bpy.data.textures.get('wob') or bpy.data.textures.new('wob', 'CLOUDS'); tx.noise_scale = 0.9
            d = o.modifiers.new('wb', 'DISPLACE'); d.texture = tx; d.strength = wobble; d.texture_coords = 'GLOBAL'
    return o

def cyl(loc, r, depth, mat, rot=(0, 0, 0), parent=None): return obj('cyl', loc, (r, r, depth), mat, rot, parent)

def empty(loc=(0, 0, 0), rz=0, parent=None, name='E'):
    e = bpy.data.objects.new(name, None); col().objects.link(e); e.location = loc; e.rotation_euler.z = rz
    if parent: e.parent = parent
    return e

def drive(o, path, expr, idx=-1):
    fc = o.driver_add(path, idx) if idx >= 0 else o.driver_add(path)
    fc.driver.expression = expr
    return fc

# ---------- buildings ----------
def house(x, y, w, d, h, rz=0, detail=True):
    e = empty((x, y, 0), rz, name='H'); P = dict(parent=e)
    box((0, 0, h / 2), (w, d, h), M.CLAY, wobble=0.07, **P)
    t = 0.24
    for (px, py, sx, sy) in [(0, d / 2 - t / 2, w, t), (0, -d / 2 + t / 2, w, t), (w / 2 - t / 2, 0, t, d), (-w / 2 + t / 2, 0, t, d)]:
        box((px, py, h + 0.22), (sx, sy, 0.5), M.CLAY, bevel=0.07, wobble=0.03, **P)
    if random.random() < 0.45:
        box(((random.random() - 0.5) * w * 0.3, (random.random() - 0.5) * d * 0.3, h + 1.1), (w * 0.5, d * 0.5, 2.2), M.CLAY, wobble=0.05, **P)
    for i in range(int(w / 0.8)):
        cyl((-w / 2 + 0.45 + i * 0.8, -d / 2 - 0.25, h - 0.35 + random.uniform(-0.05, 0.05)), 0.075, 0.7, M.WOOD, rot=(math.pi / 2 + random.uniform(-.06, .06), 0, 0), **P)
    for i in range(int(d / 0.8)):
        cyl((w / 2 + 0.25, -d / 2 + 0.45 + i * 0.8, h - 0.35), 0.075, 0.7, M.WOOD, rot=(0, math.pi / 2, 0), **P)
    # door: dark recess with wooden frame
    dx = random.uniform(-w * 0.25, w * 0.25)
    box((dx, -d / 2 - 0.02, 1.0), (1.05, 0.12, 2.1), M.WOOD, bevel=0.03, wobble=0, **P)
    box((dx, -d / 2 - 0.06, 0.95), (0.8, 0.08, 1.85), M.DARK, bevel=0.01, wobble=0, **P)
    for wx in (-w * 0.3, w * 0.3):
        if random.random() < 0.8: box((wx, -d / 2 - 0.02, h * 0.62), (0.45, 0.1, 0.6), M.DARK, bevel=0.03, wobble=0, **P)
    for wy in (-d * 0.2, d * 0.25):
        if random.random() < 0.6: box((w / 2 + 0.02, wy, h * 0.62), (0.1, 0.45, 0.6), M.DARK, bevel=0.03, wobble=0, **P)
    if detail and random.random() < 0.45:
        ax = -w * 0.2
        box((ax, -d / 2 - 0.85, 2.0), (2.0, 1.6, 0.07), M.WOOD, bevel=0.01, wobble=0, **P)
        for sx in (-0.9, 0.9): cyl((ax + sx, -d / 2 - 1.55, 1.0), 0.05, 2.0, M.WOOD, **P)
    if detail:
        for _ in range(random.randint(0, 3)):
            obj('sphere', (random.uniform(-w / 2, w / 2), -d / 2 - 0.4, 0.32), (0.28, 0.28, 0.36), M.POT, parent=e)
        if random.random() < 0.3:  # ladder to roof
            lx = w / 2 - 0.6
            for sx in (-0.22, 0.22): cyl((lx + sx, -d / 2 - 0.45, h / 2 + 0.3), 0.035, h + 0.8, M.WOOD, rot=(0.15, 0, 0), **P)
            for k in range(int(h / 0.4)): cyl((lx, -d / 2 - 0.4 - k * 0.05 + 0.2, 0.3 + k * 0.4), 0.025, 0.44, M.WOOD, rot=(0, math.pi / 2, 0), **P)
    return e

def village(xr=(-6, 7), yr=(-3, 10), spacing=7.2, clear=None, detail=True, skip=0.15):
    for gx in range(*xr):
        for gy in range(*yr):
            if random.random() < skip: continue
            x = gx * spacing + random.uniform(-0.8, 0.8); y = gy * spacing + random.uniform(-0.8, 0.8)
            if clear and clear(x, y): continue
            house(x, y, random.uniform(3.6, 5.4), random.uniform(3.6, 5.2), random.uniform(2.8, 4.0), random.uniform(-0.12, 0.12), detail)

def ground(z=-1.25, strength=2.5, size=400, sub=300, mat=None):
    bpy.ops.mesh.primitive_grid_add(size=size, x_subdivisions=sub, y_subdivisions=sub); g = bpy.context.object
    g.data.materials.append(mat or M.SAND)
    tx = bpy.data.textures.new('dune', 'CLOUDS'); tx.noise_scale = 18
    dm = g.modifiers.new('d', 'DISPLACE'); dm.texture = tx; dm.strength = strength; dm.texture_coords = 'GLOBAL'
    g.location.z = z
    return g

def mountains(r=110, n=26, h=(18, 40)):
    for i in range(n):
        a = i / n * math.tau + random.uniform(-.1, .1); rr = r + random.uniform(-15, 25)
        bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=4, radius=1, location=(math.cos(a) * rr, math.sin(a) * rr, 0))
        o = bpy.context.object; hh = random.uniform(*h); o.scale = (random.uniform(18, 30), random.uniform(18, 30), hh)
        tx = bpy.data.textures.get('crag') or bpy.data.textures.new('crag', 'VORONOI'); tx.noise_scale = 0.5
        d = o.modifiers.new('d', 'DISPLACE'); d.texture = tx; d.strength = 0.25
        o.data.materials.append(M.ROCK); bpy.ops.object.shade_flat()

# ---------- figures (all faceless by design) ----------
_tpl = {}
def _meta(name, elems, mat, parent=None, res=0.035, loc=(0, 0, 0), k=1.15):
    """Organic shape: union of ellipsoids -> voxel remesh -> smooth, built once and instanced."""
    if name not in _tpl:
        bm = bmesh.new()
        for (co, r, sc) in elems:
            sz = [r * v * k for v in sc] if sc else [r * k * 0.6] * 3
            g = bmesh.ops.create_uvsphere(bm, u_segments=24, v_segments=14, radius=1)
            vs = g['verts']; bmesh.ops.scale(bm, vec=sz, verts=vs); bmesh.ops.translate(bm, vec=co, verts=vs)
        me0 = bpy.data.meshes.new('raw_' + name); bm.to_mesh(me0); bm.free()
        o = bpy.data.objects.new('raw_' + name, me0); col().objects.link(o)
        rm = o.modifiers.new('rm', 'REMESH'); rm.mode = 'VOXEL'; rm.voxel_size = res
        sm = o.modifiers.new('sm', 'SMOOTH'); sm.factor = 0.9; sm.iterations = 12
        bpy.context.view_layer.update()
        dg = bpy.context.evaluated_depsgraph_get(); me = bpy.data.meshes.new_from_object(o.evaluated_get(dg))
        for p in me.polygons: p.use_smooth = True
        col().objects.unlink(o); bpy.data.objects.remove(o); _tpl[name] = me
    o = bpy.data.objects.new(name, _tpl[name]); col().objects.link(o); o.location = loc
    if not o.data.materials: o.data.materials.append(None)
    o.material_slots[0].link = 'OBJECT'; o.material_slots[0].material = mat
    if parent: o.parent = parent
    return o

def person(x, y, rz, mat, s=1.0, walk=None, staff=False, hood=None):
    """Robed, hooded figure. walk=(speed, phase) adds a bob driver."""
    e = empty((x, y, 0), rz, name='P'); e.scale = (s, s, s)
    hood = hood or mat
    _meta('robe', [((0, 0, 0.12), 1, (.36, .32, .14)), ((0, 0, 0.5), 1, (.32, .28, .5)), ((0, 0, 1.05), 1, (.26, .2, .35)), ((0, 0, 1.35), 1, (.3, .18, .12)),
                   ((0.2, -0.08, 1.0), 1, (.09, .09, .3)), ((-0.2, -0.08, 1.0), 1, (.09, .09, .3))], mat, e, k=1)
    _meta('hood', [((0, 0.02, 1.6), 1, (.15, .16, .17)), ((0, 0.08, 1.45), 1, (.18, .15, .14))], hood, e, k=1)
    obj('sphere', (0, -0.12, 1.55), (0.1, 0.06, 0.13), M.DARK, parent=e)  # shadowed hood opening (no face)
    if staff: cyl((0.35, -0.1, 0.9), 0.03, 1.9, M.WOOD, parent=e)
    if walk:
        sp, ph = walk
        drive(e, 'location', f'{abs(0.05 * s)}*abs(sin(frame*{sp}+{ph}))', 2)
    return e

def camel(x, y, rz, load=None, walk=None, s=1.0):
    e = empty((x, y, 0), rz, name='C'); e.scale = (s, s, s)
    _meta('cbody', [((0, 0, 1.55), 1, (.95, .42, .38)), ((0, 0, 1.4), 1, (.7, .36, .3)), ((-0.05, 0, 1.95), 1, (.42, .3, .32)),
                    ((.7, 0, 1.5), 1, (.35, .33, .35)), ((-.8, 0, 1.55), 1, (.3, .33, .33)), ((1.05, 0, 1.65), 1, (.24, .16, .26)),
                    ((1.25, 0, 1.88), 1, (.14, .13, .26)), ((1.38, 0, 2.15), 1, (.12, .12, .24)), ((1.55, 0, 2.35), 1, (.26, .13, .14)),
                    ((1.78, 0, 2.3), 1, (.13, .1, .1)), ((1.45, .09, 2.47), 1, (.05, .03, .06)), ((1.45, -.09, 2.47), 1, (.05, .03, .06))], M.CAMEL, e, res=0.03, k=1)
    legs = [(0.75, 0.22), (0.75, -0.22), (-0.75, 0.22), (-0.75, -0.22)]
    for i, (lx, ly) in enumerate(legs):
        hip = empty((lx, ly, 1.35), parent=e, name='hip')
        cyl((0, 0, -0.32), 0.12, 0.7, M.CAMEL, parent=hip)
        knee = empty((0, 0, -0.65), parent=hip, name='knee')
        cyl((0, 0, -0.32), 0.065, 0.65, M.CAMEL, parent=knee)
        obj('sphere', (0, 0, 0), (0.09, 0.09, 0.09), M.CAMEL, parent=knee); obj('sphere', (0.05, 0, -0.66), (0.14, 0.12, 0.05), M.CAMEL, parent=knee)
        if walk:
            sp, ph = walk; p = ph + (0 if i in (0, 3) else math.pi)
            drive(hip, 'rotation_euler', f'0.35*sin(frame*{sp}+{p})', 1)
            drive(knee, 'rotation_euler', f'max(0,-0.6*sin(frame*{sp}+{p}+1.2))', 1)
    if walk:
        sp, ph = walk; drive(e, 'location', f'0.04*abs(sin(frame*{sp}+{ph}))', 2)
    if load:
        box((0, 0, 2.15), (1.0, 1.4, 0.4), load, bevel=0.15, wobble=0.04, parent=e)
        for side in (-1, 1):
            box((0.05, side * 0.62, 1.7), (0.9, 0.12, 0.9), load, bevel=0.05, wobble=0.03, parent=e)
    return e

def sheep(x, y, rz):
    e = empty((x, y, 0), rz, name='S')
    _meta('sh', [((0, 0, 0.55), 0.45, (0.9, 0.6, 0.55)), ((0.48, 0, 0.68), 0.22, (0.7, 0.45, 0.5))], M.WOOL, e, res=0.03)
    for lx, ly in [(0.25, 0.12), (0.25, -0.12), (-0.25, 0.12), (-0.25, -0.12)]: cyl((lx, ly, 0.18), 0.04, 0.36, M.DARK, parent=e)
    return e

def kaaba(mat=None):
    e = empty(name='K')
    stone = mat or pbr('kstone', 'clay_plaster', (0.32, 0.27, 0.23), 0.5, bump=1.0)
    for i in range(10):  # stacked stone courses
        box((0, 0, 0.3 + i * 0.6), (6.0 - (i % 2) * 0.04, 5.0 - (i % 2) * 0.04, 0.58), stone, bevel=0.05, wobble=0.04, parent=e)
    box((0, 0, 6.1), (6.1, 5.1, 0.2), stone, bevel=0.03, wobble=0.0, parent=e)
    return e

# ---------- lighting / render ----------
def world(hdr='qwantani_dusk_2_puresky_2k.hdr', strength=0.45, hue=0.08, sat=0.6, color=None):
    sc = bpy.context.scene; w = bpy.data.worlds.new('W'); sc.world = w; w.use_nodes = True; N = w.node_tree.nodes; L = w.node_tree.links
    if color:
        N['Background'].inputs['Color'].default_value = (*color, 1)
    else:
        env = N.new('ShaderNodeTexEnvironment'); env.image = img(hdr)
        hs = N.new('ShaderNodeHueSaturation'); hs.inputs['Hue'].default_value = 0.5 + hue - 0.5; hs.inputs['Saturation'].default_value = sat
        L.new(env.outputs['Color'], hs.inputs['Color']); L.new(hs.outputs['Color'], N['Background'].inputs['Color'])
    N['Background'].inputs['Strength'].default_value = strength
    return w

def sun(elev=32, azim=-50, energy=7, color=(1.0, 0.66, 0.36), angle=4):
    bpy.ops.object.light_add(type='SUN', rotation=(math.radians(90 - elev), 0, math.radians(azim)))
    l = bpy.context.object.data; l.energy = energy; l.color = color; l.angle = math.radians(angle)
    return bpy.context.object

def camera(lens=35, fstop=None, focus=None):
    bpy.ops.object.camera_add(); c = bpy.context.object; bpy.context.scene.camera = c; c.data.lens = lens; c.data.clip_end = 1000
    if fstop: c.data.dof.use_dof = True; c.data.dof.aperture_fstop = fstop; c.data.dof.focus_distance = focus or 10
    return c

def key_cam(c, keys, target_keys=None):
    """keys: [(frame, (x,y,z), (tx,ty,tz))] -> location + look-at via track-to empty."""
    t = empty(name='target'); con = c.constraints.new('TRACK_TO'); con.target = t; con.track_axis = 'TRACK_NEGATIVE_Z'; con.up_axis = 'UP_Y'
    for f, p, tg in keys:
        c.location = p; c.keyframe_insert('location', frame=f)
        t.location = tg; t.keyframe_insert('location', frame=f)
    for o in (c, t):
        for fc in o.animation_data.action.fcurves:
            for k in fc.keyframe_points: k.interpolation = 'BEZIER'; k.easing = 'EASE_IN_OUT'
    return t

def finish(a, frames, fps=24, mist=(12, 110), mist_col=(1.0, 0.62, 0.32), mist_amt=0.8, exposure=0.3, look='AgX - Medium High Contrast', glare=0.8, vignette=0.45, cb_gain=(1.08, 1.0, 0.88), motion_blur=True):
    sc = bpy.context.scene; r = sc.render
    sc.frame_start = a['start'] if a['start'] is not None else 1
    sc.frame_end = a['end'] if a['end'] is not None else frames
    r.fps = fps; r.engine = 'CYCLES'; sc.cycles.device = 'CPU'; sc.cycles.samples = a['samples']; sc.cycles.use_denoising = True
    sc.cycles.denoiser = 'OPENIMAGEDENOISE'; sc.cycles.max_bounces = 4; sc.cycles.use_adaptive_sampling = True
    sc.render.use_persistent_data = True
    r.use_motion_blur = motion_blur; r.motion_blur_shutter = 0.5
    r.resolution_x, r.resolution_y = int(1920 * a['res']), int(1080 * a['res'])
    r.image_settings.file_format = 'PNG'; r.filepath = a['out']
    sc.view_settings.view_transform = 'AgX'; sc.view_settings.look = look; sc.view_settings.exposure = exposure
    sc.use_nodes = True; cn = sc.node_tree.nodes; TL = sc.node_tree.links; rl = cn['Render Layers']; comp = cn['Composite']
    src = rl.outputs['Image']
    if mist:
        sc.view_layers[0].use_pass_mist = True; w = sc.world; w.mist_settings.start, w.mist_settings.depth = mist; w.mist_settings.falloff = 'QUADRATIC'
        mx = cn.new('CompositorNodeMixRGB'); mx.inputs[2].default_value = (*mist_col, 1)
        mf = cn.new('CompositorNodeMath'); mf.operation = 'MULTIPLY'; mf.inputs[1].default_value = mist_amt
        TL.new(rl.outputs['Mist'], mf.inputs[0]); TL.new(mf.outputs[0], mx.inputs[0]); TL.new(src, mx.inputs[1]); src = mx.outputs[0]
    gl = cn.new('CompositorNodeGlare'); gl.glare_type = 'FOG_GLOW'; gl.threshold = glare; gl.mix = -0.6
    TL.new(src, gl.inputs['Image']); src = gl.outputs['Image']
    cb = cn.new('CompositorNodeColorBalance'); cb.correction_method = 'LIFT_GAMMA_GAIN'; cb.gain = cb_gain
    TL.new(src, cb.inputs['Image']); src = cb.outputs['Image']
    if vignette:
        el = cn.new('CompositorNodeEllipseMask'); el.width = 0.95; el.height = 0.95
        bl = cn.new('CompositorNodeBlur'); bl.size_x = bl.size_y = int(200 * a['res']); TL.new(el.outputs['Mask'], bl.inputs['Image'])
        inv = cn.new('CompositorNodeMath'); inv.operation = 'MULTIPLY_ADD'; inv.inputs[1].default_value = vignette; inv.inputs[2].default_value = 1 - vignette
        TL.new(bl.outputs['Image'], inv.inputs[0])
        mm = cn.new('CompositorNodeMixRGB'); mm.blend_type = 'MULTIPLY'; mm.inputs[0].default_value = 1
        TL.new(src, mm.inputs[1]); TL.new(inv.outputs[0], mm.inputs[2]); src = mm.outputs['Image']
    TL.new(src, comp.inputs['Image'])

def render(a, still_frame=None):
    if still_frame is not None:
        bpy.context.scene.frame_set(still_frame); bpy.context.scene.render.filepath = a['out'] + f'{still_frame:04d}.png'
        bpy.ops.render.render(write_still=True)
    else:
        bpy.ops.render.render(animation=True)
