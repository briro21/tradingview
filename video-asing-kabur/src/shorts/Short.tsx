import {AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {Ambient} from '../components/Ambient';
import {VIDEOS, WhatIfBySlug} from '../videos/registry';
import {C, FONT} from '../theme';
import shorts from './shorts.json';

export const SHORTS = shorts;
const W = 1080;
const VH = Math.round((W * 1080) / 1920);

const Outline: React.FC<{text: string; size: number; color?: string; style?: React.CSSProperties}> = ({text, size, color = '#fff', style}) => (
  <div style={{fontFamily: FONT, fontWeight: 900, fontSize: size, color, lineHeight: 1.05, whiteSpace: 'pre-line', textAlign: 'center', WebkitTextStroke: `${size / 12}px ${C.ink}`, paintOrder: 'stroke fill', textShadow: `0 ${size / 10}px 0 ${C.ink}`, ...style}}>
    {text}
  </div>
);

// Short vertikal 9:16: hook di atas, potongan video di tengah, subtitle besar di bawah.
export const Short: React.FC<{id: string}> = ({id}) => {
  const s = SHORTS.find((x) => x.id === id)!;
  const v = VIDEOS.find((x) => x.slug === s.slug)!;
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const sec = s.from + frame / fps;
  const cue = v.captions.find((c) => sec >= c.start && sec <= c.end + 0.25);
  const hookIn = interpolate(frame, [0, 10], [0.6, 1], {extrapolateRight: 'clamp'});
  const pulse = 1 + 0.03 * Math.sin(frame / 6);
  const left = (durationInFrames - frame) / fps;
  return (
    <AbsoluteFill>
      <Ambient color="#7b5cff" base="#100c20" particles={30} />
      <div style={{position: 'absolute', top: 120, left: 40, right: 40, transform: `scale(${hookIn * pulse})`}}>
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: 18}}>
          <div style={{background: C.yellow, border: `6px solid ${C.ink}`, borderRadius: 14, padding: '4px 22px', fontFamily: FONT, fontWeight: 900, fontSize: 44, color: C.ink}}>WHAT IF</div>
        </div>
        <Outline text={s.hook} size={84} />
      </div>
      <div style={{position: 'absolute', top: 560, left: 0, width: W, height: VH, overflow: 'hidden', borderTop: `8px solid ${C.ink}`, borderBottom: `8px solid ${C.ink}`, boxShadow: '0 0 80px rgba(123,92,255,0.6)'}}>
        <div style={{width: 1920, height: 1080, transform: `scale(${W / 1920})`, transformOrigin: 'top left'}}>
          <Sequence from={-Math.round(s.from * fps)}>
            <WhatIfBySlug slug={s.slug} hideCaptions />
          </Sequence>
        </div>
      </div>
      {cue && (
        <div style={{position: 'absolute', top: 1290, left: 50, right: 50, display: 'flex', justifyContent: 'center'}}>
          <Outline text={cue.text} size={74} color={cue.text.includes(':') ? C.yellow : '#fff'} />
        </div>
      )}
      <div style={{position: 'absolute', bottom: 160, left: 0, right: 0, textAlign: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 34, color: 'rgba(255,255,255,0.55)'}}>Seri What If · Ekonomi Indonesia</div>
      <div style={{position: 'absolute', bottom: 120, left: 60, right: 60, height: 14, background: 'rgba(255,255,255,0.2)', borderRadius: 7}}>
        <div style={{width: `${(frame / durationInFrames) * 100}%`, height: '100%', background: C.red, borderRadius: 7}} />
      </div>
      {left < 4.5 && (
        <div style={{position: 'absolute', bottom: 240, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
          <div style={{background: C.red, border: `8px solid ${C.ink}`, borderRadius: 24, padding: '16px 40px', transform: `scale(${1 + 0.05 * Math.sin(frame / 3)})`}}>
            <Outline text="▶ Versi lengkap di channel" size={52} />
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
