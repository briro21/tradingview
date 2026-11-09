import React from 'react';
import {AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile, interpolate, useCurrentFrame} from 'remotion';
import tl from './timeline.json';
import {GlobeNodes, Rewind, NotHuman} from './Scenes2D';
import {Grain, Vignette, LowerThird, Dust} from './fx';
import {FPS} from './Root';

const Clip: React.FC<{src: string}> = ({src}) => (
  <AbsoluteFill><OffthreadVideo src={staticFile(src)} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} /></AbsoluteFill>
);
const Flash: React.FC<{color?: string; len?: number}> = ({color = '#fff', len = 6}) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{background: color, opacity: interpolate(f, [0, len], [0.9, 0], {extrapolateRight: 'clamp'})}} />;
};
const Fade: React.FC<{len: number; total: number}> = ({len, total}) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{background: '#000', opacity: Math.max(interpolate(f, [0, len], [1, 0], {extrapolateRight: 'clamp'}), interpolate(f, [total - len, total], [0, 1], {extrapolateLeft: 'clamp'}))}} />;
};
const Heat: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(255,190,120,.18), transparent 50%)', mixBlendMode: 'screen', transform: `translateY(${Math.sin(f / 5) * 1.2}px)`}} />;
};

const scenes: React.FC[] = [
  () => (<><Clip src="shots/s0_hook.mp4" /><Dust n={40} color="170,200,255" seed="h" speed={0.4} size={2} /><NotHuman /><Grain opacity={0.1} /></>),
  () => (<GlobeNodes />),
  () => (<><Clip src="shots/s2_oldman.mp4" /><Grain opacity={0.1} /></>),
  () => (<Rewind><Clip src="shots/s2_oldman_rev.mp4" /></Rewind>),
  () => (<><Clip src="shots/s4_valley.mp4" /><Heat /><LowerThird title="Mecca" sub="610 AD" at={20} /><Grain opacity={0.06} /></>),
  () => (<><Clip src="shots/s5_market.mp4" /><Dust n={50} color="255,230,180" seed="mk" speed={0.25} size={3} /><Grain opacity={0.06} /></>),
  () => (<><Clip src="shots/s6_caravan.mp4" /><Grain opacity={0.06} /></>),
  () => (<><Clip src="shots/s7_pilgrims.mp4" /><Heat /><Grain opacity={0.06} /></>),
];

export const Film: React.FC = () => {
  const fr = (s: number) => Math.round(s * FPS);
  const total = fr(tl.total);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {tl.starts.map((s, i) => {
        const from = fr(s);
        const dur = (i === tl.starts.length - 1 ? total : fr(tl.starts[i + 1])) - from;
        const S = scenes[i];
        return (
          <Sequence key={i} from={from} durationInFrames={dur}>
            <S />
            {i === 1 && <Flash color="#fff" len={5} />}
            {i === 4 && <Flash color="#fff3d6" len={10} />}
            {i >= 5 && <Flash color="#000" len={6} />}
          </Sequence>
        );
      })}
      <Sequence from={0} durationInFrames={total}><Fade len={8} total={total} /></Sequence>
      <Audio src={staticFile('pilot.wav')} />
    </AbsoluteFill>
  );
};
