import React, {useMemo} from 'react';
import * as THREE from 'three';
import {random} from 'remotion';
import {useThree} from '@react-three/fiber';

export const SAND = '#d9893f';
export const CLAY = '#d58a45';

export const CameraRig: React.FC<{pos: [number, number, number]; look: [number, number, number]; fov?: number}> = ({pos, look, fov = 40}) => {
  const {camera} = useThree();
  camera.position.set(...pos);
  (camera as THREE.PerspectiveCamera).fov = fov;
  camera.lookAt(...look);
  camera.updateProjectionMatrix();
  return null;
};

export const Lights: React.FC<{sun?: [number, number, number]; intensity?: number; tint?: string; fog?: string; near?: number; far?: number}> = ({sun = [30, 25, 10], intensity = 2.2, tint = '#ffd29a', fog = '#e0a060', near = 20, far = 140}) => (
  <>
    <fog attach="fog" args={[fog, near, far]} />
    <color attach="background" args={[fog]} />
    <hemisphereLight args={['#ffe2b0', '#a0552a', 0.9]} />
    <directionalLight position={sun} intensity={intensity} color={tint} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024}
      shadow-camera-left={-40} shadow-camera-right={40} shadow-camera-top={40} shadow-camera-bottom={-40} />
  </>
);

export const Terrain: React.FC<{size?: number; hills?: number}> = ({size = 400, hills = 1}) => {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(size, size, 160, 160);
    g.rotateX(-Math.PI / 2);
    const p = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), z = p.getZ(i);
      const r = Math.hypot(x, z);
      const ridge = Math.max(0, r - 45) * 0.22 * hills;
      const n = Math.sin(x * 0.08) * Math.cos(z * 0.07) * 1.5 + Math.sin(x * 0.21 + z * 0.13) * 0.6;
      p.setY(i, ridge * (1 + 0.5 * Math.sin(Math.atan2(z, x) * 5)) + n * Math.min(1, r / 40) - 0.05);
    }
    g.computeVertexNormals();
    return g;
  }, [size, hills]);
  return <mesh geometry={geo} receiveShadow><meshStandardMaterial color={SAND} roughness={1} flatShading /></mesh>;
};

const House: React.FC<{x: number; z: number; w: number; d: number; h: number; rot: number; seed: string}> = ({x, z, w, d, h, rot, seed}) => {
  const beams = Math.floor(w / 0.9);
  const two = random(seed + 't') > 0.6;
  return (
    <group position={[x, 0, z]} rotation={[0, rot, 0]}>
      <mesh position={[0, h / 2, 0]} castShadow receiveShadow><boxGeometry args={[w, h, d]} /><meshStandardMaterial color={CLAY} roughness={0.95} /></mesh>
      {/* parapet */}
      <mesh position={[0, h + 0.15, d / 2 - 0.1]} castShadow><boxGeometry args={[w, 0.3, 0.2]} /><meshStandardMaterial color={CLAY} /></mesh>
      <mesh position={[0, h + 0.15, -d / 2 + 0.1]} castShadow><boxGeometry args={[w, 0.3, 0.2]} /><meshStandardMaterial color={CLAY} /></mesh>
      {two && <mesh position={[-w * 0.2, h + 1.2, -d * 0.15]} castShadow receiveShadow><boxGeometry args={[w * 0.5, 2.4, d * 0.55]} /><meshStandardMaterial color={CLAY} /></mesh>}
      {/* protruding beams */}
      {new Array(beams).fill(0).map((_, i) => (
        <mesh key={i} position={[-w / 2 + 0.5 + i * 0.9, h - 0.45, d / 2 + 0.2]} castShadow><boxGeometry args={[0.14, 0.14, 0.6]} /><meshStandardMaterial color="#7a4a26" /></mesh>
      ))}
      {/* door + windows */}
      <mesh position={[w * 0.15, 0.9, d / 2 + 0.01]}><planeGeometry args={[0.9, 1.8]} /><meshStandardMaterial color="#5a3418" /></mesh>
      <mesh position={[-w * 0.25, h * 0.62, d / 2 + 0.01]}><planeGeometry args={[0.45, 0.6]} /><meshStandardMaterial color="#3a2010" /></mesh>
      <mesh position={[w * 0.35, h * 0.62, d / 2 + 0.01]}><planeGeometry args={[0.45, 0.6]} /><meshStandardMaterial color="#3a2010" /></mesh>
      {random(seed + 'a') > 0.5 && (
        <group position={[-w * 0.2, 0, d / 2 + 0.8]}>
          <mesh position={[0, 1.6, 0]} castShadow><boxGeometry args={[1.8, 0.08, 1.4]} /><meshStandardMaterial color="#8a5a30" /></mesh>
          {[-0.8, 0.8].map((px) => <mesh key={px} position={[px, 0.8, 0.6]}><cylinderGeometry args={[0.05, 0.05, 1.6]} /><meshStandardMaterial color="#6a4020" /></mesh>)}
        </group>
      )}
      {random(seed + 'p') > 0.5 && <mesh position={[w / 2 - 0.3, 0.35, d / 2 + 0.4]} castShadow><sphereGeometry args={[0.35, 10, 8]} /><meshStandardMaterial color="#b56a35" /></mesh>}
    </group>
  );
};

export const Village: React.FC<{radius?: number; clear?: number; seed?: string}> = ({radius = 40, clear = 0, seed = 'v'}) => {
  const houses = useMemo(() => {
    const out: {x: number; z: number; w: number; d: number; h: number; rot: number; s: string}[] = [];
    for (let gx = -radius; gx <= radius; gx += 7.5) for (let gz = -radius; gz <= radius; gz += 7.5) {
      const s = seed + gx + '_' + gz;
      if (Math.hypot(gx, gz) < clear || Math.hypot(gx, gz) > radius || random(s) < 0.18) continue;
      out.push({x: gx + (random(s + 'x') - 0.5) * 2, z: gz + (random(s + 'z') - 0.5) * 2, w: 3.5 + random(s + 'w') * 2, d: 3.5 + random(s + 'd') * 2, h: 2.6 + random(s + 'h') * 1.6, rot: (random(s + 'r') - 0.5) * 0.25, s});
    }
    return out;
  }, [radius, clear, seed]);
  return <>{houses.map((h) => <House key={h.s} {...h} seed={h.s} />)}</>;
};

// Faceless hooded figure (no facial features by design)
export const Person: React.FC<{x: number; z: number; rot?: number; color?: string; walk?: number; scale?: number}> = ({x, z, rot = 0, color = '#8a4a2a', walk = 0, scale = 1}) => {
  const bob = Math.abs(Math.sin(walk)) * 0.06;
  return (
    <group position={[x, bob, z]} rotation={[0, rot, 0]} scale={scale}>
      <mesh position={[0, 0.75, 0]} castShadow><coneGeometry args={[0.38, 1.5, 10]} /><meshStandardMaterial color={color} roughness={1} /></mesh>
      <mesh position={[0, 1.62, 0]} castShadow><sphereGeometry args={[0.2, 10, 8]} /><meshStandardMaterial color="#e8d8bc" roughness={1} /></mesh>
    </group>
  );
};

export const Camel: React.FC<{x: number; z: number; rot?: number; walk?: number; load?: string}> = ({x, z, rot = 0, walk = 0, load}) => {
  const m = <meshStandardMaterial color="#c08a52" roughness={1} />;
  const legs: [number, number, number][] = [[0.55, 0, 0.25], [0.55, 0, -0.25], [-0.55, 0, 0.25], [-0.55, 0, -0.25]];
  return (
    <group position={[x, 0, z]} rotation={[0, rot, 0]}>
      <mesh position={[0, 1.45, 0]} scale={[1, 0.55, 0.5]} castShadow><sphereGeometry args={[0.8, 14, 10]} />{m}</mesh>
      <mesh position={[0, 1.85, 0]} scale={[0.7, 0.6, 0.6]} castShadow><sphereGeometry args={[0.5, 12, 8]} />{m}</mesh>
      <mesh position={[0.95, 1.85, 0]} rotation={[0, 0, -0.9]} castShadow><cylinderGeometry args={[0.1, 0.16, 0.9]} />{m}</mesh>
      <mesh position={[1.35, 2.2, 0]} scale={[1.6, 0.8, 0.8]} castShadow><sphereGeometry args={[0.16, 10, 8]} />{m}</mesh>
      {legs.map((l, i) => (
        <mesh key={i} position={[l[0] + Math.sin(walk + (i % 2 ? Math.PI : 0) + (i > 1 ? Math.PI / 2 : 0)) * 0.15, 0.6, l[2]]} castShadow><cylinderGeometry args={[0.07, 0.06, 1.2]} />{m}</mesh>
      ))}
      {load && <mesh position={[0, 1.95, 0]} castShadow><boxGeometry args={[0.9, 0.35, 1.3]} /><meshStandardMaterial color={load} roughness={0.8} /></mesh>}
    </group>
  );
};

export const Sheep: React.FC<{x: number; z: number; rot?: number}> = ({x, z, rot = 0}) => (
  <group position={[x, 0, z]} rotation={[0, rot, 0]}>
    <mesh position={[0, 0.5, 0]} scale={[1, 0.7, 0.7]} castShadow><sphereGeometry args={[0.4, 10, 8]} /><meshStandardMaterial color="#e9dcc4" roughness={1} /></mesh>
    <mesh position={[0.4, 0.6, 0]} castShadow><sphereGeometry args={[0.15, 8, 6]} /><meshStandardMaterial color="#c9b49a" /></mesh>
  </group>
);

export const Kaaba: React.FC = () => (
  <group>
    <mesh position={[0, 3, 0]} castShadow receiveShadow><boxGeometry args={[6, 6, 5]} /><meshStandardMaterial color="#6e5a48" roughness={1} flatShading /></mesh>
    {/* stone course lines */}
    {[1, 2, 3, 4, 5].map((y) => <mesh key={y} position={[0, y * 1.0, 0]}><boxGeometry args={[6.04, 0.05, 5.04]} /><meshStandardMaterial color="#4c3c2e" /></mesh>)}
  </group>
);

export const Stall: React.FC<{x: number; z: number; rot?: number; cloth: string}> = ({x, z, rot = 0, cloth}) => (
  <group position={[x, 0, z]} rotation={[0, rot, 0]}>
    <mesh position={[0, 2.2, 0]} rotation={[0.15, 0, 0]} castShadow><boxGeometry args={[2.6, 0.05, 2]} /><meshStandardMaterial color={cloth} roughness={0.7} /></mesh>
    {[[-1.2, -0.9], [1.2, -0.9], [-1.2, 0.9], [1.2, 0.9]].map(([a, b], i) => <mesh key={i} position={[a, 1.1, b]}><cylinderGeometry args={[0.05, 0.05, 2.2]} /><meshStandardMaterial color="#5a3a1c" /></mesh>)}
    <mesh position={[0, 0.5, 0.3]} castShadow><boxGeometry args={[2.2, 1, 1]} /><meshStandardMaterial color="#8a5a30" /></mesh>
    {[-0.6, 0, 0.6].map((px, i) => <mesh key={i} position={[px, 1.15, 0.3]} castShadow><sphereGeometry args={[0.25, 8, 6]} /><meshStandardMaterial color={['#c8a040', '#7a3a1a', '#d06a2a'][i]} /></mesh>)}
  </group>
);
