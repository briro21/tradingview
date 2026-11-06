import bpy, math, random, os, sys
from mathutils import Vector
A = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'assets')
argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
OUT = argv[0] if argv else '/tmp/village.png'
SAMPLES = int(argv[1]) if len(argv) > 1 else 96
RES = float(argv[2]) if len(argv) > 2 else 1.0
random.seed(7)
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene

def img(name, non_color=False):
    i = bpy.data.images.load(os.path.join(A, name), check_existing=True)
    if non_color: i.colorspace_settings.name = 'Non-Color'
    return i

def pbr(name, tex, tint, scale, bump=0.6, rough_mul=1.0, wobble=True):
    m = bpy.data.materials.new(name); m.use_nodes = True
    nt = m.node_tree; N = nt.nodes; L = nt.links
    bsdf = N['Principled BSDF']
    tc = N.new('ShaderNodeTexCoord'); mp = N.new('ShaderNodeMapping'); mp.inputs['Scale'].default_value = (scale,)*3
    L.new(tc.outputs['Object'], mp.inputs['Vector'])
    def t(suffix, nc):
        n = N.new('ShaderNodeTexImage'); n.image = img(f'{tex}_{suffix}_2k.jpg', nc); n.projection = 'BOX'; n.projection_blend = 0.3
        L.new(mp.outputs['Vector'], n.inputs['Vector']); return n
    d, r, h = t('diff', False), t('rough', True), t('disp', True)
    mix = N.new('ShaderNodeMix'); mix.data_type = 'RGBA'; mix.blend_type = 'MULTIPLY'; mix.inputs['Factor'].default_value = 1.0
    L.new(d.outputs['Color'], mix.inputs['A']); mix.inputs['B'].default_value = (*tint, 1)
    # large-scale tonal variation (dirt, sun-bleach)
    nz = N.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 0.6; nz.inputs['Detail'].default_value = 6
    L.new(tc.outputs['Object'], nz.inputs['Vector'])
    ramp = N.new('ShaderNodeValToRGB'); ramp.color_ramp.elements[0].color = (0.72, 0.6, 0.5, 1); ramp.color_ramp.elements[1].color = (1.08, 1.0, 0.92, 1)
    L.new(nz.outputs['Fac'], ramp.inputs['Fac'])
    mix2 = N.new('ShaderNodeMix'); mix2.data_type = 'RGBA'; mix2.blend_type = 'MULTIPLY'; mix2.inputs['Factor'].default_value = 1
    L.new(mix.outputs['Result'], mix2.inputs['A']); L.new(ramp.outputs['Color'], mix2.inputs['B'])
    L.new(mix2.outputs['Result'], bsdf.inputs['Base Color'])
    mr = N.new('ShaderNodeMath'); mr.operation = 'MULTIPLY'; mr.inputs[1].default_value = rough_mul
    L.new(r.outputs['Color'], mr.inputs[0]); L.new(mr.outputs['Value'], bsdf.inputs['Roughness'])
    b = N.new('ShaderNodeBump'); b.inputs['Strength'].default_value = bump; b.inputs['Distance'].default_value = 0.05
    L.new(h.outputs['Color'], b.inputs['Height']); L.new(b.outputs['Normal'], bsdf.inputs['Normal'])
    return m

def flat(name, col, rough=0.8):
    m = bpy.data.materials.new(name); m.use_nodes = True
    p = m.node_tree.nodes['Principled BSDF']; p.inputs['Base Color'].default_value = (*col, 1); p.inputs['Roughness'].default_value = rough
    return m

def wood():
    m = bpy.data.materials.new('wood'); m.use_nodes = True; N = m.node_tree.nodes; L = m.node_tree.links
    w = N.new('ShaderNodeTexWave'); w.inputs['Scale'].default_value = 8; w.inputs['Distortion'].default_value = 6; w.inputs['Detail'].default_value = 4
    c = N.new('ShaderNodeValToRGB'); c.color_ramp.elements[0].color = (0.10, 0.05, 0.02, 1); c.color_ramp.elements[1].color = (0.32, 0.18, 0.08, 1)
    L.new(w.outputs['Fac'], c.inputs['Fac']); L.new(c.outputs['Color'], N['Principled BSDF'].inputs['Base Color'])
    N['Principled BSDF'].inputs['Roughness'].default_value = 0.85
    return m

CLAY = pbr('clay', 'clay_plaster', (1.0, 0.55, 0.25), 0.6, bump=0.35)
SAND = pbr('sand', 'aerial_beach_01', (1.0, 0.5, 0.2), 0.08, bump=0.4)
WOOD = wood(); DARK = flat('dark', (0.04, 0.02, 0.01), 1); POT = flat('pot', (0.45, 0.2, 0.08), 0.7)
CLOTHS = [flat('c%d' % i, c, 0.9) for i, c in enumerate([(0.35, 0.08, 0.05), (0.5, 0.35, 0.2), (0.15, 0.09, 0.06), (0.75, 0.66, 0.5), (0.3, 0.06, 0.12)])]

import bmesh
_mesh_cache = {}
def _mesh(kind):
    if kind in _mesh_cache: return _mesh_cache[kind]
    me = bpy.data.meshes.new(kind); bm = bmesh.new()
    if kind == 'cube': bmesh.ops.create_cube(bm, size=1.0)
    elif kind == 'cyl': bmesh.ops.create_cone(bm, cap_ends=True, segments=10, radius1=1, radius2=1, depth=1)
    elif kind == 'sphere': bmesh.ops.create_uvsphere(bm, u_segments=16, v_segments=10, radius=1)
    elif kind == 'cone': bmesh.ops.create_cone(bm, cap_ends=True, segments=16, radius1=0.32, radius2=0.14, depth=1.45)
    bm.to_mesh(me); bm.free()
    if kind != 'cube':
        for p in me.polygons: p.use_smooth = True
    _mesh_cache[kind] = me; return me

COL = sc.collection
def _obj(kind, loc, scale, mat, rot=(0, 0, 0), parent=None, mods=None):
    o = bpy.data.objects.new(kind, _mesh(kind)); COL.objects.link(o)
    o.location = loc; o.scale = scale; o.rotation_euler = rot
    o.material_slots and None
    o.data.materials.clear() if False else None
    o.active_material = None
    if len(o.material_slots) == 0: o.data.materials.append(None)
    o.material_slots[0].link = 'OBJECT'; o.material_slots[0].material = mat
    if parent: o.parent = parent
    return o

def box(loc, size, mat, bevel=0.12, wobble=0.04, name='b', parent=None):
    me = bpy.data.meshes.new('box'); bm = bmesh.new(); bmesh.ops.create_cube(bm, size=1.0)
    bmesh.ops.scale(bm, vec=size, verts=bm.verts); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new('box', me); COL.objects.link(o); o.location = loc; o.data.materials.append(mat)
    if parent: o.parent = parent
    if bevel:
        m = o.modifiers.new('bv', 'BEVEL'); m.width = bevel; m.segments = 3; m.affect = 'EDGES'
        # scale is non-uniform; bevel uses local coords -> clamp by using absolute via 'harden'
        m.use_clamp_overlap = True
        if wobble:
            tx = bpy.data.textures.get('wob') or bpy.data.textures.new('wob', 'CLOUDS'); tx.noise_scale = 1.2
            d = o.modifiers.new('wb', 'DISPLACE'); d.texture = tx; d.strength = wobble; d.texture_coords = 'GLOBAL'
    return o

def cyl(loc, r, depth, mat, rot=(0, 0, 0), parent=None):
    return _obj('cyl', loc, (r, r, depth), mat, rot, parent)

def house(w, d, h, emp):
    P = dict(parent=emp)
    box((0, 0, h / 2), (w, d, h), CLAY, **P)
    t = 0.22
    for (px, py, sx, sy) in [(0, d / 2 - t / 2, w, t), (0, -d / 2 + t / 2, w, t), (w / 2 - t / 2, 0, t, d), (-w / 2 + t / 2, 0, t, d)]:
        box((px, py, h + 0.22), (sx, sy, 0.5), CLAY, bevel=0.06, wobble=0.02, **P)
    if random.random() < 0.45:
        box(((random.random() - 0.5) * w * 0.3, (random.random() - 0.5) * d * 0.3, h + 1.1), (w * 0.5, d * 0.5, 2.2), CLAY, **P)
    for i in range(int(w / 0.8)):
        cyl((-w / 2 + 0.45 + i * 0.8, -d / 2 - 0.25, h - 0.35 + random.uniform(-0.04, 0.04)), 0.075, 0.7, WOOD, rot=(math.pi / 2, 0, 0), **P)
    for i in range(int(d / 0.8)):
        cyl((w / 2 + 0.25, -d / 2 + 0.45 + i * 0.8, h - 0.35), 0.075, 0.7, WOOD, rot=(0, math.pi / 2, 0), **P)
    box((random.uniform(-w * 0.25, w * 0.25), -d / 2 + 0.05, 0.95), (0.85, 0.25, 1.9), WOOD, bevel=0.02, wobble=0, **P)
    for wx in (-w * 0.3, w * 0.3):
        if random.random() < 0.8: box((wx, -d / 2 + 0.03, h * 0.62), (0.42, 0.2, 0.55), DARK, bevel=0.03, wobble=0, **P)
    for wy in (-d * 0.2, d * 0.25):
        if random.random() < 0.6: box((w / 2 - 0.03, wy, h * 0.62), (0.2, 0.42, 0.55), DARK, bevel=0.03, wobble=0, **P)
    if random.random() < 0.4:
        ax = -w * 0.2
        box((ax, -d / 2 - 0.8, 1.9), (1.8, 1.5, 0.08), WOOD, bevel=0.01, wobble=0, **P)
        for sx in (-0.8, 0.8): cyl((ax + sx, -d / 2 - 1.45, 0.95), 0.05, 1.9, WOOD, **P)
    for _ in range(random.randint(0, 3)):
        _obj('sphere', (random.uniform(-w / 2, w / 2), -d / 2 - 0.35, 0.3), (0.28, 0.28, 0.34), POT, parent=emp)

def place_house(x, y, w, d, h, rz):
    emp = bpy.data.objects.new('H', None); COL.objects.link(emp)
    emp.location = (x, y, 0); emp.rotation_euler.z = rz
    house(w, d, h, emp)

def person(x, y, rz, cloth, s=1.0):
    emp = bpy.data.objects.new('P', None); COL.objects.link(emp); emp.location = (x, y, 0); emp.rotation_euler.z = rz; emp.scale = (s, s, s)
    _obj('cone', (0, 0, 0.72), (1, 1, 1), cloth, parent=emp)
    _obj('sphere', (0, 0, 1.55), (0.13, 0.13, 0.13), cloth, parent=emp)   # hooded head, no face
    _obj('sphere', (0, 0, 1.33), (0.26, 0.16, 0.1), cloth, parent=emp)

# ground with dunes
bpy.ops.mesh.primitive_grid_add(size=400, x_subdivisions=300, y_subdivisions=300); g = bpy.context.object; g.data.materials.append(SAND)
tx = bpy.data.textures.new('dune', 'CLOUDS'); tx.noise_scale = 18
dm = g.modifiers.new('d', 'DISPLACE'); dm.texture = tx; dm.strength = 2.5; dm.texture_coords = 'GLOBAL'
g.location.z = -1.25

# village grid
for gx in range(-6, 7):
    for gy in range(-3, 10):
        if random.random() < 0.15: continue
        x = gx * 7.2 + random.uniform(-0.8, 0.8); y = gy * 7.2 + random.uniform(-0.8, 0.8)
        if abs(x) < 3.5 and y < 10 and y > -3: continue  # open square in the foreground
        place_house(x, y, random.uniform(3.6, 5.4), random.uniform(3.6, 5.2), random.uniform(2.8, 4.0), random.uniform(-0.12, 0.12))

# townsfolk (faceless, robed)
for i in range(18):
    person(random.uniform(-12, 12), random.uniform(-2, 30), random.uniform(0, 6.28), random.choice(CLOTHS), random.uniform(0.95, 1.05))

# world: dusk HDRI + warm sun + volumetric haze
w = bpy.data.worlds.new('W'); sc.world = w; w.use_nodes = True; N = w.node_tree.nodes; L = w.node_tree.links
env = N.new('ShaderNodeTexEnvironment'); env.image = img('qwantani_dusk_2_puresky_2k.hdr')
L.new(env.outputs['Color'], N['Background'].inputs['Color']); N['Background'].inputs['Strength'].default_value = 0.45
hs = N.new('ShaderNodeHueSaturation'); hs.inputs['Hue'].default_value = 0.08; hs.inputs['Saturation'].default_value = 0.6
L.new(env.outputs['Color'], hs.inputs['Color']); L.new(hs.outputs['Color'], N['Background'].inputs['Color'])
bpy.ops.object.light_add(type='SUN', rotation=(math.radians(58), 0, math.radians(-50)))
sun = bpy.context.object.data; sun.energy = 7.0; sun.color = (1.0, 0.66, 0.36); sun.angle = math.radians(4)
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 20, 15)); v = bpy.context.object; v.scale = (180, 180, 40)
vm = bpy.data.materials.new('haze'); vm.use_nodes = True; vn = vm.node_tree.nodes; vn.remove(vn['Principled BSDF'])
pv = vn.new('ShaderNodeVolumePrincipled'); pv.inputs['Color'].default_value = (1.0, 0.6, 0.3, 1); pv.inputs['Density'].default_value = 0.0025; pv.inputs['Anisotropy'].default_value = 0.5
vm.node_tree.links.new(pv.outputs['Volume'], vn['Material Output'].inputs['Volume']); v.data.materials.append(vm)
v.hide_render = True  # replaced by mist-pass haze in compositor

# camera: elevated cinematic view like reference
bpy.ops.object.camera_add(location=(2, -14, 9.5)); cam = bpy.context.object; sc.camera = cam
cam.data.lens = 35
d = Vector((0, 12, 1.5)) - cam.location; cam.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()
cam.data.dof.use_dof = True; cam.data.dof.focus_distance = 18; cam.data.dof.aperture_fstop = 4

r = sc.render; r.engine = 'CYCLES'; sc.cycles.device = 'CPU'; sc.cycles.samples = SAMPLES; sc.cycles.use_denoising = True
sc.cycles.volume_step_rate = 4; sc.cycles.max_bounces = 4
r.resolution_x, r.resolution_y = int(1920 * RES), int(1080 * RES); r.filepath = OUT
sc.view_settings.view_transform = 'AgX'; sc.view_settings.look = 'AgX - Medium High Contrast'
sc.view_settings.exposure = 0.3
# compositor: glare
sc.use_nodes = True; cn = sc.node_tree.nodes; rl = cn['Render Layers']; comp = cn['Composite']
gl = cn.new('CompositorNodeGlare'); gl.glare_type = 'FOG_GLOW'; gl.threshold = 0.8; gl.mix = -0.7
sc.view_layers[0].use_pass_mist = True; w.mist_settings.start = 12; w.mist_settings.depth = 110; w.mist_settings.falloff = 'QUADRATIC'
TL = sc.node_tree.links
mx = cn.new('CompositorNodeMixRGB'); mx.inputs[2].default_value = (1.0, 0.62, 0.32, 1)
mf = cn.new('CompositorNodeMath'); mf.operation = 'MULTIPLY'; mf.inputs[1].default_value = 0.8
TL.new(rl.outputs['Mist'], mf.inputs[0]); TL.new(mf.outputs[0], mx.inputs[0]); TL.new(rl.outputs['Image'], mx.inputs[1])
TL.new(mx.outputs[0], gl.inputs['Image'])
cb = cn.new('CompositorNodeColorBalance'); cb.correction_method = 'LIFT_GAMMA_GAIN'; cb.lift = (1.02, 0.98, 0.92); cb.gain = (1.08, 1.0, 0.88)
TL.new(gl.outputs['Image'], cb.inputs['Image'])
el = cn.new('CompositorNodeEllipseMask'); el.width = 0.95; el.height = 0.95
bl = cn.new('CompositorNodeBlur'); bl.size_x = bl.size_y = 200; bl.use_relative = False
TL.new(el.outputs['Mask'], bl.inputs['Image'])
vg = cn.new('CompositorNodeMixRGB'); vg.blend_type = 'MULTIPLY'
TL.new(cb.outputs['Image'], vg.inputs[1]); TL.new(cb.outputs['Image'], vg.inputs[2])
mm = cn.new('CompositorNodeMixRGB'); mm.inputs[1].default_value = (0.25, 0.1, 0.03, 1)
TL.new(bl.outputs['Image'], mm.inputs[0]); TL.new(mm.inputs[1].links[0].from_socket if mm.inputs[1].links else cb.outputs['Image'], mm.inputs[2]) if False else None
mm2 = cn.new('CompositorNodeMixRGB'); mm2.blend_type = 'MULTIPLY'; mm2.inputs[0].default_value = 1
inv = cn.new('CompositorNodeMath'); inv.operation = 'MULTIPLY_ADD'; inv.inputs[1].default_value = 0.45; inv.inputs[2].default_value = 0.55
TL.new(bl.outputs['Image'], inv.inputs[0])
TL.new(cb.outputs['Image'], mm2.inputs[1]); TL.new(inv.outputs[0], mm2.inputs[2])
TL.new(mm2.outputs['Image'], comp.inputs['Image'])
bpy.ops.wm.save_as_mainfile(filepath=OUT.rsplit('.', 1)[0] + '.blend')
bpy.ops.render.render(write_still=True)
