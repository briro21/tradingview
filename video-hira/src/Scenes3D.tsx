import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {CameraRig, Lights, Terrain, Village, Person, Camel, Sheep, Kaaba, Stall} from './World';
import {Dust, Grain, Vignette, LowerThird} from './fx';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const W = 1920, H = 1080;
const Canvas: React.FC<{children: React.ReactNode}> = ({children}) => (
  <ThreeCanvas width={W} height={H} shadows gl={{antialias: true}}>{children}</ThreeCanvas>
);
const Haze: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(255,200,130,.35), rgba(255,160,70,0) 45%, rgba(120,50,10,.25))', mixBlendMode: 'soft-light', transform: `translateY(${Math.sin(f / 6) * 1.5}px)`}} />;
};

const Townsfolk: React.FC<{n: number; r: number; seed: string; t: number}> = ({n, r, seed, t}) => (
  <>
    {new Array(n).fill(0).map((_, i) => {
      const a = random(seed + i) * Math.PI * 2, rr = 3 + random(seed + 'r' + i) * r;
      const sp = (random(seed + 's' + i) - 0.5) * 0.08;
      const x = Math.cos(a) * rr + Math.cos(a + 1.57) * t * sp * 30, z = Math.sin(a) * rr + Math.sin(a + 1.57) * t * sp * 30;
      return <Person key={i} x={x} z={z} rot={-a} walk={t * 6 + i} color={['#8a3a22', '#5a3a28', '#a8763e', '#3e2a20', '#c9b08a'][i % 5]} />;
    })}
  </>
);

// 4: drone descent into Mecca valley
export const Valley: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: D, fps} = useVideoConfig();
  const k = interpolate(f, [0, D], [0, 1], {easing: Easing.inOut(Easing.cubic)});
  const t = f / fps;
  return (
    <AbsoluteFill>
      <Canvas>
        <CameraRig pos={[60 - 35 * k, 70 - 52 * k, 90 - 55 * k]} look={[0, 2, 0]} fov={45} />
        <Lights sun={[40, 35, 20]} fog="#e8a560" near={40} far={220} />
        <Terrain hills={1.4} />
        <Village radius={42} clear={9} />
        <Kaaba />
        <Townsfolk n={30} r={10} seed="v4" t={t} />
        <Camel x={12} z={6} rot={0.5} walk={t * 4} load="#7a2a3a" />
        <Camel x={15} z={4} rot={0.5} walk={t * 4 + 1} />
      </Canvas>
      <Haze />
      <Dust n={60} color="255,220,160" seed="v" speed={0.5} size={4} />
      <Vignette strength={0.55} color="60,20,0" />
      <LowerThird title="Mecca" sub="610 AD" at={20} />
      <Grain opacity={0.07} />
    </AbsoluteFill>
  );
};

// 5: bustling market — low handheld camera
export const Market: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  const hx = Math.sin(t * 2.3) * 0.15 + Math.sin(t * 5.1) * 0.05, hy = Math.sin(t * 3.1) * 0.08;
  const cloths = ['#a8202e', '#5a2a7a', '#c86a1a', '#2a5a7a', '#b8902a'];
  return (
    <AbsoluteFill>
      <Canvas>
        <CameraRig pos={[-14 + t * 2.4 + hx, 1.6 + hy, 6]} look={[-8 + t * 2.4, 1.3, -6]} fov={50} />
        <Lights sun={[20, 40, 25]} intensity={2.8} tint="#ffe0b0" fog="#e9b070" near={10} far={70} />
        <Terrain hills={1.2} />
        <Village radius={40} clear={0} seed="m" />
        {new Array(8).fill(0).map((_, i) => <Stall key={i} x={-16 + i * 4.2} z={-4} cloth={cloths[i % 5]} />)}
        {new Array(16).fill(0).map((_, i) => {
          const x = -18 + ((i * 2.6 + t * (i % 2 ? 1.2 : -0.9)) % 36), z = -1 + (i % 4) * 0.9;
          return <Person key={i} x={x} z={z} rot={i % 2 ? -1.57 : 1.57} walk={t * 7 + i} color={['#8a3a22', '#5a3a28', '#a8763e', '#3e2a20'][i % 4]} />;
        })}
        <Camel x={-4 + t * 0.8} z={1.8} rot={0} walk={t * 4} load="#5a2a7a" />
        <Sheep x={2} z={0.8} rot={1} /><Sheep x={2.8} z={1.3} rot={0.4} />
      </Canvas>
      <Haze />
      <AbsoluteFill style={{background: 'linear-gradient(120deg, rgba(255,240,200,.25), transparent 40%)', mixBlendMode: 'screen'}} />
      <Dust n={110} color="255,230,180" seed="mk" speed={0.25} size={5} />
      <Vignette strength={0.6} color="50,20,0" />
      <Grain opacity={0.08} />
    </AbsoluteFill>
  );
};

// 6: caravan — tracking camels, pan up to waving fabrics
export const Caravan: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: D, fps} = useVideoConfig();
  const t = f / fps;
  const up = interpolate(f, [D * 0.45, D * 0.8], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const cx = t * 2.2;
  return (
    <AbsoluteFill>
      <Canvas>
        <CameraRig pos={[cx - 2, 0.6 + up * 1.8, 10 - up * 3.5]} look={[cx - 1, 0.6 + up * 1.6, 0]} fov={40} />
        <Lights sun={[-20, 18, 15]} intensity={2.6} tint="#ffc988" fog="#e39a55" near={8} far={60} />
        <Terrain hills={2} />
        {[0, 1, 2, 3, 4].map((i) => <Camel key={i} x={cx + 1.2 - i * 3.2} z={0} walk={t * 5 + i} load={['#a8202e', '#5a2a7a', '#b02a5a', '#6a2a8a', '#a8202e'][i]} />)}
        {[0, 1, 2, 3].map((i) => (
          <group key={'cl' + i} position={[cx + 0.4 - i * 3.2, 2.1, 0.7]} rotation={[Math.sin(t * 4 + i) * 0.25, 0, Math.sin(t * 3 + i) * 0.15]}>
            <mesh position={[0, -0.5, 0]}><planeGeometry args={[1.2, 1, 6, 6]} /><meshStandardMaterial color={['#c4122a', '#7a1fa8', '#d01a6a', '#5a1a9a'][i]} side={2} roughness={0.5} /></mesh>
          </group>
        ))}
        <Person x={cx + 3.2} z={0.4} rot={0} walk={t * 6} color="#3e2a20" />
      </Canvas>
      {/* kicked-up dust near ground */}
      <AbsoluteFill style={{top: 700}}>
        {new Array(14).fill(0).map((_, i) => (
          <div key={i} style={{position: 'absolute', left: ((random('cd' + i) * 2400 - f * 6) % 2400 + 2400) % 2400 - 200, top: random('ct' + i) * 300, width: 300, height: 140, borderRadius: '50%', background: 'rgba(230,170,100,.18)', filter: 'blur(30px)'}} />
        ))}
      </AbsoluteFill>
      <AbsoluteFill style={{backdropFilter: 'saturate(.85)'}} />
      <Vignette strength={0.6} color="50,20,0" />
      <Grain opacity={0.08} />
    </AbsoluteFill>
  );
};

// 7: overhead timelapse — pilgrims circling the Kaaba
export const Pilgrims: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: D, fps} = useVideoConfig();
  const t = f / fps;
  const rot = interpolate(f, [0, D], [0, 0.5]);
  const N = 140;
  return (
    <AbsoluteFill>
      <Canvas>
        <CameraRig pos={[Math.sin(rot) * 14, 34 - t * 0.6, Math.cos(rot) * 14]} look={[0, 0, 0]} fov={40} />
        <Lights sun={[25, 50, 15]} intensity={2.4} tint="#ffe2b8" fog="#e2a668" near={30} far={140} />
        <Terrain hills={1.2} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.45, 0]} receiveShadow><circleGeometry args={[14, 48]} /><meshStandardMaterial color="#cfa070" roughness={1} /></mesh>
        <Village radius={44} clear={18} seed="p" />
        <Kaaba />
        {new Array(N).fill(0).map((_, i) => {
          const ring = 5.5 + (i % 6) * 1.2 + random('pr' + i) * 0.5;
          const a = (i / N) * Math.PI * 2 * 3 + random('pa' + i) - t * (2.4 / ring) * 1.6; // counter-clockwise, timelapse speed
          const x = Math.cos(a) * ring, z = Math.sin(a) * ring;
          return <Person key={i} x={x} z={z} rot={-a} walk={t * 10 + i} scale={0.9} color={random('pc' + i) > 0.35 ? '#efe6d6' : '#7a4a2a'} />;
        })}
      </Canvas>
      <Haze />
      <Vignette strength={0.6} color="50,20,0" />
      <Grain opacity={0.07} />
    </AbsoluteFill>
  );
};
