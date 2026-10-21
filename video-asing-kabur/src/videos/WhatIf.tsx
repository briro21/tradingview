import {AbsoluteFill, Audio, Loop, Sequence, staticFile, useVideoConfig} from 'remotion';
import {Captions} from '../pasar-hijau/Captions';
import {T0} from '../pasar-hijau/lib';
import {DEFAULT_THEME, ThemeCtx, ThemeName} from '../theme';

export type Seg = {start: number; el: React.ReactNode; sfx?: 'whoosh' | 'boom' | 'ding' | 'riser' | 'thump'};
export type Cue = {start: number; end: number; text: string};
export type LineT = {i: number; start: number; end: number; text: string};

// Renderer generik untuk video "What If" dari storyboard + voice-over + subtitle.
export const WhatIf: React.FC<{timeline: Seg[]; captions: Cue[]; audio: string; duration: number; theme?: ThemeName}> = ({timeline, captions, audio, duration, theme = DEFAULT_THEME}) => {
  const {fps} = useVideoConfig();
  return (
    <ThemeCtx.Provider value={theme}>
      <AbsoluteFill style={{background: '#000'}}>
        {timeline.map((seg, i) => {
          const from = Math.round(seg.start * fps);
          const end = Math.round((timeline[i + 1]?.start ?? duration) * fps);
          return (
            <Sequence key={`${seg.start}-${i}`} from={from} durationInFrames={Math.max(1, end - from)}>
              <T0.Provider value={seg.start}>{seg.el}</T0.Provider>
            </Sequence>
          );
        })}
        <T0.Provider value={0}>
          <Captions data={captions} />
        </T0.Provider>
        <Audio src={staticFile(audio)} />
        {timeline
          .filter((s) => s.sfx)
          .map((s, i) => (
            <Sequence key={`sfx${i}`} from={Math.max(0, Math.round(s.start * fps))} durationInFrames={Math.round(1.5 * fps)}>
              <Audio src={staticFile(`sfx/${s.sfx}.wav`)} volume={s.sfx === 'boom' ? 0.55 : 0.3} />
            </Sequence>
          ))}
        <Loop durationInFrames={60 * fps}>
          <Audio src={staticFile('sfx/pad.wav')} volume={0.07} />
        </Loop>
      </AbsoluteFill>
    </ThemeCtx.Provider>
  );
};

export const makeL = (lines: LineT[]) => (i: number, d = 0) => lines[i].start + d;
export const durationOf = (lines: LineT[]) => Math.ceil(lines[lines.length - 1].end + 2);
