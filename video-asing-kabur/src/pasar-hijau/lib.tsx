import {createContext, useContext} from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT, useTheme} from '../theme';

// Detik awal segmen; scene membandingkan waktu dengan detik absolut di file SRT.
export const T0 = createContext(0);

export const useSec = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return useContext(T0) + frame / fps;
};

// Spring 0→1 yang dimulai pada detik absolut `at`.
export const usePop = (at: number, damping = 10) => {
  const sec = useSec();
  const {fps} = useVideoConfig();
  return spring({frame: Math.round((sec - at) * fps), fps, config: {damping, mass: 0.6}});
};

export const Pop: React.FC<{at: number; children: React.ReactNode; style?: React.CSSProperties}> = ({at, children, style}) => {
  const s = usePop(at);
  if (useSec() < at) return null;
  return <div style={{transform: `scale(${s})`, ...style}}>{children}</div>;
};

export const Txt: React.FC<{text: string; size?: number; color?: string; style?: React.CSSProperties}> = ({
  text,
  size = 110,
  color,
  style,
}) => {
  const t = useTheme();
  const fill = color ?? t.text;
  const dark = (fill === t.text || fill === t.muted) && t.text !== '#ffffff';
  return (
  <div
    style={{
      fontFamily: FONT,
      fontWeight: 900,
      fontSize: size,
      color: fill,
      lineHeight: 1.08,
      WebkitTextStroke: dark ? undefined : `${Math.max(4, size / 20)}px ${C.ink}`,
      paintOrder: 'stroke fill',
      textShadow: dark ? undefined : `0 ${size / 18}px 0 ${C.ink}`,
      ...style,
    }}
  >
    {text}
  </div>
  );
};

export const Coin: React.FC<{size?: number; label?: string}> = ({size = 70, label = 'Rp'}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: C.yellow,
      border: `${size / 12}px solid ${C.ink}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT,
      fontWeight: 900,
      fontSize: size * 0.32,
      color: C.ink,
    }}
  >
    {label}
  </div>
);

export const Panel: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div style={{background: '#f6efdd', border: `8px solid ${C.ink}`, borderRadius: 28, boxShadow: `0 14px 0 ${C.ink}`, ...style}}>{children}</div>
);

export const Abs: React.FC<{x: number; y: number; children: React.ReactNode; style?: React.CSSProperties}> = ({x, y, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, ...style}}>{children}</div>
);
