import {AbsoluteFill, Audio, interpolate, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
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
              <T0.Provider value={seg.start}>
                <SceneIn dir={i % 2 ? 1 : -1}>{seg.el}</SceneIn>
              </T0.Provider>
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

// Masuk adegan: zoom + blur singkat (±0,3 dtk), lalu kamera bergerak pelan selama adegan.
const SceneIn: React.FC<{children: React.ReactNode; dir: number}> = ({children, dir}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const enter = interpolate(frame, [0, 9], [0, 1], {extrapolateRight: 'clamp', easing: (x) => 1 - Math.pow(1 - x, 3)});
  const drift = interpolate(frame, [0, Math.max(durationInFrames, 30)], [0, 1]);
  const scale = (1.12 - 0.12 * enter) * (1 + 0.045 * drift);
  const x = (1 - enter) * 60 * dir + drift * 18 * dir;
  return (
    <AbsoluteFill style={{transform: `translateX(${x}px) scale(${scale})`, filter: enter < 1 ? `blur(${(1 - enter) * 12}px)` : undefined, opacity: 0.4 + 0.6 * enter}}>
      {children}
    </AbsoluteFill>
  );
};

export const makeL = (lines: LineT[]) => (i: number, d = 0) => lines[i].start + d;
export const durationOf = (lines: LineT[]) => Math.ceil(lines[lines.length - 1].end + 2);
