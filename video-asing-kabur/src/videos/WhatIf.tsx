import {AbsoluteFill, Audio, interpolate, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Captions} from '../pasar-hijau/Captions';
import {T0} from '../pasar-hijau/lib';
import {DEFAULT_THEME, ThemeCtx, ThemeName} from '../theme';

export type Seg = {start: number; el: React.ReactNode; sfx?: 'whoosh' | 'boom' | 'ding' | 'riser' | 'thump'};
export type Cue = {start: number; end: number; text: string};
export type LineT = {i: number; start: number; end: number; text: string};
export type Chapter = {start: number; title: string};

// Renderer generik untuk video "What If" dari storyboard + voice-over + subtitle.
export const WhatIf: React.FC<{timeline: Seg[]; captions: Cue[]; audio: string; duration: number; theme?: ThemeName; hideCaptions?: boolean; chapters?: Chapter[]}> = ({timeline, captions, audio, duration, theme = DEFAULT_THEME, hideCaptions, chapters}) => {
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
                <SceneIn dir={i % 2 ? 1 : -1} instant={i === 0}>{seg.el}</SceneIn>
              </T0.Provider>
            </Sequence>
          );
        })}
        {chapters && chapters.length > 1 && !hideCaptions ? <ChapterBar chapters={chapters} duration={duration} /> : null}
        {!hideCaptions && (
          <T0.Provider value={0}>
            <Captions data={captions} />
          </T0.Provider>
        )}
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
const SceneIn: React.FC<{children: React.ReactNode; dir: number; instant?: boolean}> = ({children, dir, instant}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const enter = instant ? 1 : interpolate(frame, [0, 9], [0, 1], {extrapolateRight: 'clamp', easing: (x) => 1 - Math.pow(1 - x, 3)});
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

// Penanda bab + progress bar tipis di atas layar (aktif setelah bab pertama/hook).
const ChapterBar: React.FC<{chapters: Chapter[]; duration: number}> = ({chapters, duration}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sec = frame / fps;
  let idx = 0;
  chapters.forEach((c, i) => {
    if (sec >= c.start) idx = i;
  });
  if (idx === 0) return null;
  const cur = chapters[idx];
  const fade = interpolate(sec - cur.start, [0, 0.5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 8, background: 'rgba(0,0,0,0.25)'}}>
        <div style={{width: `${(sec / duration) * 100}%`, height: '100%', background: '#ff4b3e'}} />
        {chapters.slice(1).map((c) => (
          <div key={c.start} style={{position: 'absolute', left: `${(c.start / duration) * 100}%`, top: 0, width: 4, height: 8, background: '#fff'}} />
        ))}
      </div>
      <div style={{position: 'absolute', right: 28, top: 22, opacity: fade, background: 'rgba(16,19,28,0.72)', color: '#fff', fontFamily: 'Montserrat', fontWeight: 900, fontSize: 26, padding: '8px 18px', borderRadius: 10, letterSpacing: 0.5}}>
        <span style={{color: '#ff4b3e'}}>{idx}/{chapters.length - 1}</span> · {cur.title}
      </div>
    </AbsoluteFill>
  );
};
