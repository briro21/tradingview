import React from 'react';
import {AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile, interpolate, spring, random, useCurrentFrame, useVideoConfig} from 'remotion';
import tl from './hook_timeline.json';
import {Rewind} from './Scenes2D';
import {Grain, Vignette, Dust, Shake} from './fx';
import {FPS} from './Root';

const fr = (s: number) => Math.round(s * FPS);
const Clip: React.FC<{src: string; from?: number; rate?: number; zoom?: [number, number]; pan?: number}> = ({src, from = 0, rate = 1, zoom = [1, 1.08], pan = 0}) => {
  const f = useCurrentFrame();
  const {durationInFrames: D} = useVideoConfig();
  const z = interpolate(f, [0, D], zoom);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${z}) translateX(${interpolate(f, [0, D], [0, pan])}px)`}}>
        <OffthreadVideo src={staticFile(src)} muted startFrom={from} playbackRate={rate} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
const Flash: React.FC<{color?: string; len?: number; a?: number}> = ({color = '#fff', len = 5, a = 0.9}) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{background: color, opacity: interpolate(f, [0, len], [a, 0], {extrapolateRight: 'clamp'})}} />;
};
const Slam: React.FC<{text: string; size?: number; color?: string; glow?: string; sub?: string}> = ({text, size = 230, color = '#fff', glow = 'rgba(255,60,40,.7)', sub}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 9, mass: 0.6}});
  const sh = (random('sl' + f) - 0.5) * 14 * Math.max(0, 1 - f / 14);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', transform: `translate(${sh}px,0)`}}>
      <div style={{fontFamily: 'Impact, "Arial Black", sans-serif', fontSize: size, color, letterSpacing: 8, textAlign: 'center', lineHeight: 1.05,
        transform: `scale(${interpolate(s, [0, 1], [3.2, 1])})`, opacity: Math.min(1, s * 2), textShadow: `0 0 50px ${glow}, 5px 0 rgba(255,0,0,.6), -5px 0 rgba(0,200,255,.5)`}}>{text}</div>
      {sub && <div style={{fontFamily: 'monospace', fontSize: 38, color: '#c9d4ff', letterSpacing: 16, marginTop: 24, opacity: Math.min(1, s * 2)}}>{sub}</div>}
    </AbsoluteFill>
  );
};
const Fade: React.FC<{a: number; b: number}> = ({a, b}) => { const f = useCurrentFrame(); return <AbsoluteFill style={{background: '#000', opacity: interpolate(f, [a, b], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}} />; };
const Strobe: React.FC = () => { const f = useCurrentFrame(); return <AbsoluteFill style={{background: '#fff', opacity: random('st' + f) > 0.72 ? 0.5 : 0, mixBlendMode: 'screen'}} />; };

const montage: [string, number, number][] = [
  ['shots/s5_market.mp4', 10, 1.0], ['shots/s6_caravan.mp4', 30, 1.2], ['shots/s7_pilgrims.mp4', 20, 1.3],
  ['shots/s4_valley.mp4', 40, 1.2], ['shots/s2_oldman.mp4', 30, 1.0], ['shots/s6_caravan.mp4', 90, 1.5], ['shots/s7_pilgrims.mp4', 100, 1.5],
];

export const HookFilm: React.FC = () => {
  const total = Math.ceil(tl.total * FPS);
  const [a0, a1, a2, a3] = tl.at;
  const caveLen = fr(a1 - a0 - 0.7);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {/* 0-2s black; breathing */}
      {/* cave */}
      <Sequence from={fr(a0)} durationInFrames={caveLen}>
        <Shake amp={3}><Clip src="shots/s0_hook.mp4" from={0} zoom={[1, 1.12]} /></Shake>
        <Dust n={40} color="170,200,255" seed="h" speed={0.4} size={2} />
        <Fade a={0} b={20} />
        <Sequence from={fr(4.0)} durationInFrames={fr(2.7)}><Strobe /></Sequence>
      </Sequence>
      {/* "It was not human" - strobing cave stutter + slam */}
      <Sequence from={fr(a1 - 0.05)} durationInFrames={fr(1.15)}>
        <Shake amp={22}><Clip src="shots/s0_hook.mp4" from={90} zoom={[1.2, 1.5]} /></Shake>
        <Flash len={8} />
        <Slam text="NOT HUMAN" size={250} glow="rgba(120,170,255,.8)" />
      </Sequence>
      {/* question card */}
      <Sequence from={fr(10.6)} durationInFrames={fr(1.0)}>
        <AbsoluteFill style={{background: '#000'}} />
        <Slam text="WHAT DID HE SEE?" size={170} sub="MECCA · 610 AD" />
        <Grain opacity={0.15} />
      </Sequence>
      {/* flash montage */}
      {montage.map(([src, from, rate], i) => (
        <Sequence key={i} from={fr(a2 - 0.05 + i * 0.4)} durationInFrames={fr(0.4)}>
          <Clip src={src} from={from} rate={rate} zoom={[1.05, 1.2]} pan={i % 2 ? -40 : 40} />
          <Flash len={4} a={0.7} />
          <Vignette strength={0.5} color="0,0,0" />
        </Sequence>
      ))}
      {/* old man + prophecy tease */}
      <Sequence from={fr(14.5)} durationInFrames={fr(2.6)}>
        <Clip src="shots/s2_oldman.mp4" zoom={[1, 1.15]} />
        <Flash color="#ffd9a0" len={9} a={0.8} />
        <Grain opacity={0.1} />
      </Sequence>
      <Sequence from={fr(17.1)} durationInFrames={fr(3.5)}>
        <Rewind><Clip src="shots/s2_oldman_rev.mp4" zoom={[1.05, 1.2]} /></Rewind>
      </Sequence>
      {/* end title */}
      <Sequence from={fr(20.6)} durationInFrames={total - fr(20.6)}>
        <AbsoluteFill style={{background: '#000'}} />
        <Slam text="THE NIGHT THAT CHANGED THE WORLD" size={96} color="#ffe2a8" glow="rgba(255,180,60,.6)" />
        <Grain opacity={0.1} />
      </Sequence>
      <Audio src={staticFile('hook.wav')} />
    </AbsoluteFill>
  );
};
