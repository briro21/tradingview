import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig, Easing} from 'remotion';

export const Vignette: React.FC<{strength?: number; color?: string}> = ({strength = 0.85, color = '0,0,0'}) => (
  <AbsoluteFill style={{background: `radial-gradient(ellipse at center, rgba(${color},0) 35%, rgba(${color},${strength}) 100%)`, pointerEvents: 'none'}} />
);

export const Grain: React.FC<{opacity?: number}> = ({opacity = 0.08}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{opacity, mixBlendMode: 'overlay'}}>
      <svg width="100%" height="100%">
        <filter id={`g${f % 4}`}><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={f % 50} /></filter>
        <rect width="100%" height="100%" filter={`url(#g${f % 4})`} />
      </svg>
    </AbsoluteFill>
  );
};

export const Dust: React.FC<{n?: number; color?: string; seed?: string; speed?: number; size?: number}> = ({n = 80, color = '255,240,210', seed = 'd', speed = 1, size = 3}) => {
  const f = useCurrentFrame();
  const {width, height} = useVideoConfig();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {new Array(n).fill(0).map((_, i) => {
        const x = (random(seed + 'x' + i) * width + f * speed * (random(seed + 'vx' + i) - 0.3) * 0.6) % width;
        const y = (random(seed + 'y' + i) * height - f * speed * random(seed + 'vy' + i) * 0.5 + height) % height;
        const s = size * (0.4 + random(seed + 's' + i));
        const a = 0.2 + 0.6 * Math.abs(Math.sin(f / 20 + i));
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: s, height: s, borderRadius: '50%', background: `rgba(${color},${a})`, filter: `blur(${s > size ? 1.5 : 0}px)`}} />;
      })}
    </AbsoluteFill>
  );
};

export const FadeIn: React.FC<{children: React.ReactNode; dur?: number; out?: number; total?: number}> = ({children, dur = 8, out, total}) => {
  const f = useCurrentFrame();
  let o = interpolate(f, [0, dur], [0, 1], {extrapolateRight: 'clamp'});
  if (out && total) o *= interpolate(f, [total - out, total], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{opacity: o}}>{children}</AbsoluteFill>;
};

export const LowerThird: React.FC<{title: string; sub?: string; at?: number}> = ({title, sub, at = 15}) => {
  const f = useCurrentFrame() - at;
  const w = interpolate(f, [0, 18], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return (
    <div style={{position: 'absolute', left: 120, bottom: 130, opacity: w}}>
      <div style={{height: 3, width: 420 * w, background: '#f2c46d', marginBottom: 14}} />
      <div style={{fontFamily: 'Georgia, serif', fontSize: 64, color: '#fff8ea', letterSpacing: 4, textShadow: '0 2px 20px rgba(0,0,0,.6)', transform: `translateX(${(1 - w) * -30}px)`}}>{title}</div>
      {sub && <div style={{fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 26, color: '#f2c46d', letterSpacing: 8, marginTop: 6}}>{sub}</div>}
    </div>
  );
};

export const Shake: React.FC<{children: React.ReactNode; amp?: number; seed?: string}> = ({children, amp = 4, seed = 'sh'}) => {
  const f = useCurrentFrame();
  const x = (random(seed + f) - 0.5) * amp, y = (random(seed + 'y' + f) - 0.5) * amp;
  return <AbsoluteFill style={{transform: `translate(${x}px,${y}px)`}}>{children}</AbsoluteFill>;
};
