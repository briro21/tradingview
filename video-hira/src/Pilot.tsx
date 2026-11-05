import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, interpolate, useCurrentFrame} from 'remotion';
import tl from './timeline.json';
import {Hook, GlobeNodes, OldMan, Rewind} from './Scenes2D';
import {Valley, Market, Caravan, Pilgrims} from './Scenes3D';
import {FPS} from './Root';

const Flash: React.FC<{color?: string; len?: number}> = ({color = '#fff', len = 6}) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{background: color, opacity: interpolate(f, [0, len], [0.9, 0], {extrapolateRight: 'clamp'})}} />;
};
const Fade: React.FC<{len: number; total: number}> = ({len, total}) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{background: '#000', opacity: Math.max(interpolate(f, [0, len], [1, 0], {extrapolateRight: 'clamp'}), interpolate(f, [total - len, total], [0, 1], {extrapolateLeft: 'clamp'}))}} />;
};

const scenes = [Hook, GlobeNodes, OldMan, null, Valley, Market, Caravan, Pilgrims];

export const Pilot: React.FC = () => {
  const fr = (s: number) => Math.round(s * FPS);
  const total = fr(tl.total);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {tl.starts.map((s, i) => {
        const from = fr(s);
        const dur = (i === tl.starts.length - 1 ? total : fr(tl.starts[i + 1] ?? tl.total)) - from;
        const S = scenes[i];
        return (
          <Sequence key={i} from={from} durationInFrames={dur}>
            {S ? <S /> : <Rewind><OldMan /></Rewind>}
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
