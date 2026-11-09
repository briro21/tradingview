# HOOK: pitch-black cave, cold blue side light through a fissure, hunched faceless silhouette, dust in the beam. Slow dolly in.
exec(open(__import__('os').path.join(__import__('os').path.dirname(__file__), '_common.py')).read())
reset(); materials()
F = 176
rockm = pbr('cave', 'clay_plaster', (0.55, 0.52, 0.5), 0.4, bump=2.0)
def rockwall(loc, rot, size=(14, 8)):
    bpy.ops.mesh.primitive_grid_add(x_subdivisions=120, y_subdivisions=80, size=1, location=loc, rotation=rot); w = bpy.context.object
    w.scale = (size[0], size[1], 1); bpy.ops.object.transform_apply(scale=True); bpy.ops.object.shade_smooth()
    t1 = bpy.data.textures.get('cv') or bpy.data.textures.new('cv', 'VORONOI'); t1.noise_scale = 0.8
    t2 = bpy.data.textures.get('cv2') or bpy.data.textures.new('cv2', 'CLOUDS'); t2.noise_scale = 0.5
    for t, st in ((t1, 0.6), (t2, 0.5)):
        d = w.modifiers.new('d', 'DISPLACE'); d.texture = t; d.strength = st; d.texture_coords = 'GLOBAL'
    w.data.materials.append(rockm); return w
rockwall((0, 4.5, 3), (math.pi / 2, 0, 0))                # back wall
rockwall((-3.8, 0, 3), (math.pi / 2, 0, math.pi / 2))     # left wall
rockwall((3.8, 0, 3), (math.pi / 2, 0, math.pi / 2))      # right wall
rockwall((0, 0, 4.2), (0, 0, 0))                          # ceiling
# figure: hunched, kneeling, hands at chest, faceless
dark = cloth('robe_dark', (0.05, 0.05, 0.06))
p = empty((0, 1.5, -0.35), rz=math.radians(-25), name='fig')
fig = person(0, 0, 0, dark); fig.parent = p; fig.rotation_euler.x = 0.45   # hunched forward, kneeling (lowered)
for sx in (-1, 1):  # arms clutching chest/throat
    obj('sphere', (sx * 0.17, -0.32, 1.25), (0.07, 0.07, 0.22), dark, rot=(0.9, 0, -sx * 0.5), parent=p)
drive(p, 'scale', '1+0.03*sin(frame*1.1)', 2)
drive(p, 'rotation_euler', '0.04*sin(frame*0.55)', 1)
# cold light through a crack, upper left
bpy.ops.object.light_add(type='SPOT', location=(-2.6, -1.0, 3.2)); spo = bpy.context.object
wt = empty((-0.2, 4.4, 1.2), name='walltarget'); tt = spo.constraints.new('TRACK_TO'); tt.target = wt; tt.track_axis = 'TRACK_NEGATIVE_Z'; tt.up_axis = 'UP_Y'
sp = spo.data; sp.energy = 9000; sp.color = (0.5, 0.68, 1.0); sp.spot_size = math.radians(40); sp.spot_blend = 0.6; sp.shadow_soft_size = 0.15
drive(sp, 'energy', '9000*(0.85+0.15*sin(frame*0.13))')
bpy.ops.object.light_add(type='AREA', location=(3, -1, 2.5)); rim = bpy.context.object; rim.data.energy = 60; rim.data.color = (0.4, 0.55, 1); rim.data.size = 1
rim.rotation_euler = (0, math.radians(-70), 0)
# volume haze in cave
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 2)); v = bpy.context.object; v.scale = (7, 9, 4)
vm = bpy.data.materials.new('vol'); vm.use_nodes = True; vn = vm.node_tree.nodes; vn.remove(vn['Principled BSDF'])
pv = vn.new('ShaderNodeVolumePrincipled'); pv.inputs['Density'].default_value = 0.025; pv.inputs['Color'].default_value = (0.8, 0.85, 1, 1); pv.inputs['Anisotropy'].default_value = 0.6
vm.node_tree.links.new(pv.outputs['Volume'], vn['Material Output'].inputs['Volume']); v.data.materials.append(vm)
# dust motes drifting in the beam
dm = flat('dust', (1, 1, 1), emit=(0.7, 0.8, 1.0), emit_str=0.4)
for i in range(60):
    o = obj('sphere', (random.uniform(-3, 1.5), random.uniform(-1, 3), random.uniform(0.5, 4)), (0.012,) * 3, dm)
    drive(o, 'location', f'{o.location.z}+0.002*frame+0.03*sin(frame*0.05+{i})', 2)
    drive(o, 'location', f'{o.location.x}+0.04*sin(frame*0.03+{i*1.7})', 0)
world(color=(0.0, 0.0, 0.0), strength=0)
c = camera(lens=50, fstop=2.0, focus=4.2)
key_cam(c, [(1, (0.5, -4.0, 1.3), (-0.1, 1.5, 1.0)), (F, (0.3, -2.3, 1.2), (-0.1, 1.5, 1.05))])
c.data.dof.focus_object = p
bpy.context.scene.cycles.volume_step_rate = 4
go(F, mist=None, exposure=0.8, look='AgX - High Contrast', glare=0.5, vignette=0.7, cb_gain=(0.9, 0.97, 1.12))
