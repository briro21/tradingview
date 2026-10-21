import {AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig} from 'remotion';
import {DEFAULT_THEME, ThemeCtx, ThemeName} from '../theme';
import {T0} from './lib';
import {Captions} from './Captions';
import {TIMELINE} from './timeline';

export const DURATION_SEC = 498;

export const PasarHijau: React.FC<{theme?: ThemeName}> = ({theme = DEFAULT_THEME}) => {
  const {fps} = useVideoConfig();
  return (
    <ThemeCtx.Provider value={theme}>
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
    </ThemeCtx.Provider>
  );
};
