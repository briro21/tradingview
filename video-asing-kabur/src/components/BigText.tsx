import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT} from '../theme';

// Teks tebal ber-outline yang muncul dengan efek bounce.
export const BigText: React.FC<{
  text: string;
  color?: string;
  size?: number;
  delay?: number;
  style?: React.CSSProperties;
}> = ({text, color = C.white, size = 140, delay = 0, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - delay, fps, config: {damping: 9, mass: 0.6}});
  return (
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: size,
        color,
        lineHeight: 1.05,
        WebkitTextStroke: `${size / 22}px ${C.ink}`,
        paintOrder: 'stroke fill',
        textShadow: `0 ${size / 18}px 0 ${C.ink}`,
        transform: `scale(${s})`,
        opacity: s > 0.01 ? 1 : 0,
        ...style,
      }}
    >
      {text}
    </div>
  );
};
