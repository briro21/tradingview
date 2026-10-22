import {AbsoluteFill, useCurrentFrame} from 'remotion';

// Latar hidup: gradasi berwarna yang bergerak + partikel melayang (pengganti layar hitam polos).
export const Ambient: React.FC<{color?: string; base?: string; particles?: number}> = ({color = '#7b5cff', base = '#141028', particles = 26}) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const bx = 50 + Math.sin(t * 0.5) * 22;
  const by = 50 + Math.cos(t * 0.4) * 18;
  return (
    <AbsoluteFill style={{background: base, overflow: 'hidden'}}>
      <AbsoluteFill style={{background: `radial-gradient(circle at ${bx}% ${by}%, ${color}66 0%, transparent 45%), radial-gradient(circle at ${100 - bx}% ${100 - by}%, #ff4b3e33 0%, transparent 40%)`}} />
      <Particles n={particles} color="#ffffff" opacity={0.35} />
    </AbsoluteFill>
  );
};

// Partikel/bokeh kecil yang melayang pelan ke atas.
export const Particles: React.FC<{n?: number; color?: string; opacity?: number}> = ({n = 18, color = '#ffffff', opacity = 0.25}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {Array.from({length: n}, (_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const x = (seed % 1920) + Math.sin(frame / 50 + i) * 30;
        const speed = 0.4 + (i % 5) * 0.25;
        const y = 1100 - ((frame * speed + (seed % 1100)) % 1200);
        const r = 3 + (i % 4) * 3;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: r * 2, height: r * 2, borderRadius: '50%', background: color, opacity: opacity * (0.4 + (i % 3) * 0.3), filter: r > 8 ? 'blur(2px)' : undefined}} />;
      })}
    </AbsoluteFill>
  );
};
