import {AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig} from 'remotion';
import {T0} from './lib';
import {Captions} from './Captions';
import {TIMELINE} from './timeline';

export const DURATION_SEC = 498;

export const PasarHijau: React.FC = () => {
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      {TIMELINE.map((seg, i) => {
        const from = Math.round(seg.start * fps);
        const end = Math.round((TIMELINE[i + 1]?.start ?? DURATION_SEC) * fps);
        return (
          <Sequence key={seg.start} from={from} durationInFrames={end - from}>
            <T0.Provider value={seg.start}>{seg.el}</T0.Provider>
          </Sequence>
        );
      })}
      <Captions />
      <Audio src={staticFile('vo_pasar_hijau.mp3')} />
    </AbsoluteFill>
  );
};
