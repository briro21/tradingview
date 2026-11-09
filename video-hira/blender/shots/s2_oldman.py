# Blind old man (Waraqah): seated hooded figure, white beard, face hidden in shadow; candle flicker; smoke at floor. Slow push-in.
exec(open(__import__('os').path.join(__import__('os').path.dirname(__file__), '_common.py')).read())
reset(); materials()
F = 102
wall = pbr('wall', 'clay_plaster', (0.6, 0.38, 0.22), 0.6, bump=0.6)
box((0, 3, 2), (10, 0.4, 5), wall, bevel=0.1, wobble=0.08); box((-4, 0, 2), (0.4, 8, 5), wall, bevel=0.1, wobble=0.08)
bpy.ops.mesh.primitive_plane_add(size=20); bpy.context.object.data.materials.append(wall)
robe = cloth('robe', (0.16, 0.1, 0.06)); beard = flat('beard', (0.75, 0.72, 0.68), 1.0, sheen=1.0)
e = empty((0, 1, 0), name='old')
lib._meta('orobe', [((0, 0, 0.3), 1, (.7, .6, .32)), ((0, 0.05, 0.85), 1, (.34, .26, .42)), ((0, 0.05, 1.28), 1, (.36, .22, .16)),
                     ((0.3, -0.15, 0.95), 1, (.1, .12, .3)), ((-0.3, -0.1, 0.9), 1, (.1, .12, .3))], robe, e, k=1)
lib._meta('ohood', [((0, 0.06, 1.62), 1, (.19, .21, .23)), ((0, 0.14, 1.45), 1, (.24, .2, .18))], robe, e, k=1)
obj('sphere', (0, -0.1, 1.6), (0.12, 0.08, 0.15), M.DARK, parent=e)            # deep hood shadow, no face
lib._meta('beard', [((0, -0.17, 1.47), 1, (.09, .05, .08)), ((0, -0.2, 1.33), 1, (.07, .045, .12))], beard, e, res=0.015, k=1)
cyl((0.42, -0.3, 1.0), 0.035, 2.3, M.WOOD, parent=e)                              # staff
obj('sphere', (0.42, -0.33, 1.05), (0.07, 0.06, 0.08), flat('hand', (0.35, 0.2, 0.12), 0.7), parent=e)
for sx in (-1.6, 1.4):
    for i in range(3): cyl((sx + i * 0.25, 2.5, 0.25 + i * 0.03), 0.07, 0.6, flat('scroll', (0.75, 0.62, 0.42), 0.9), rot=(0, math.pi / 2, 0.2 * i))
# candle
cm = flat('wax', (0.9, 0.85, 0.72), 0.5); cyl((1.2, -0.3, 0.2), 0.06, 0.4, cm)
fm = flat('flame', (1, 0.6, 0.2), emit=(1.0, 0.55, 0.15), emit_str=40); fl = obj('sphere', (1.2, -0.3, 0.48), (0.03, 0.03, 0.07), fm)
bpy.ops.object.light_add(type='POINT', location=(1.2, -0.3, 0.55)); L1 = bpy.context.object; L1.data.color = (1.0, 0.5, 0.18); L1.data.shadow_soft_size = 0.05
drive(L1.data, 'energy', '120*(0.8+0.12*sin(frame*1.7)+0.08*sin(frame*3.1+1))')
drive(fl, 'scale', '0.07*(0.85+0.15*sin(frame*2.3))', 2)
bpy.ops.object.light_add(type='AREA', location=(-1.5, -2, 3)); f2 = bpy.context.object; f2.data.energy = 8; f2.data.color = (0.5, 0.35, 0.25); f2.data.size = 3
# low smoke
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0.35)); v = bpy.context.object; v.scale = (8, 8, 0.7)
vm = bpy.data.materials.new('smoke'); vm.use_nodes = True; vn = vm.node_tree.nodes; VL = vm.node_tree.links; vn.remove(vn['Principled BSDF'])
pv = vn.new('ShaderNodeVolumePrincipled'); pv.inputs['Color'].default_value = (0.8, 0.65, 0.5, 1)
nz = vn.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 1.5; nz.inputs['Detail'].default_value = 4
mp = vn.new('ShaderNodeMapping'); tc = vn.new('ShaderNodeTexCoord'); VL.new(tc.outputs['Object'], mp.inputs['Vector']); VL.new(mp.outputs['Vector'], nz.inputs['Vector'])
drive(mp.inputs['Location'], 'default_value', 'frame*0.006', 0)
ramp = vn.new('ShaderNodeMapRange'); ramp.inputs['From Min'].default_value = 0.45; ramp.inputs['To Max'].default_value = 0.6
VL.new(nz.outputs['Fac'], ramp.inputs['Value']); VL.new(ramp.outputs['Result'], pv.inputs['Density']); VL.new(pv.outputs['Volume'], vn['Material Output'].inputs['Volume'])
v.data.materials.append(vm)
world(color=(0.02, 0.012, 0.008), strength=1)
c = camera(lens=45, fstop=2.8, focus=4.5)
key_cam(c, [(1, (0.3, -4.2, 1.35), (0.1, 1, 1.25)), (F, (0.2, -3.3, 1.4), (0.05, 1, 1.35))])
go(F, mist=None, exposure=0.6, glare=0.6, vignette=0.6, cb_gain=(1.12, 0.98, 0.82))
