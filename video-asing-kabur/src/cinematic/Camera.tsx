import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

// Gerak kamera pelan (zoom + geser) agar adegan terasa hidup.
export const Camera: React.FC<{children: React.ReactNode; zoom?: [number, number]; pan?: [number, number]; origin?: string}> = ({
  children,
  zoom = [1, 1.08],
  pan = [0, -30],
  origin = '50% 50%',
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = interpolate(frame, [0, durationInFrames], [0, 1], {extrapolateRight: 'clamp'});
  const ease = t * t * (3 - 2 * t);
  const z = zoom[0] + (zoom[1] - zoom[0]) * ease;
  const x = pan[0] + (pan[1] - pan[0]) * ease;
  return <AbsoluteFill style={{transform: `translateX(${x}px) scale(${z})`, transformOrigin: origin}}>{children}</AbsoluteFill>;
};

// Lapisan dengan blur (efek depth of field).
export const Layer: React.FC<{blur?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({blur = 0, children, style}) => (
  <AbsoluteFill style={{filter: blur ? `blur(${blur}px)` : undefined, ...style}}>{children}</AbsoluteFill>
);

// Vignette + grain halus untuk nuansa sinematik.
export const Grade: React.FC<{tint?: string}> = ({tint = 'rgba(0,0,0,0)'}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <AbsoluteFill style={{background: tint, mixBlendMode: 'soft-light'}} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)'}} />
      <svg width="100%" height="100%" style={{position: 'absolute', opacity: 0.07}}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" seed={frame % 10} />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};
