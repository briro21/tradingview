import {AbsoluteFill} from 'remotion';
import {C} from '../theme';

// Latar biru gelap + grid tipis + glow opsional di belakang objek utama.
export const Background: React.FC<{glow?: string; glowX?: string; glowY?: string}> = ({
  glow,
  glowX = '50%',
  glowY = '50%',
}) => (
  <AbsoluteFill
    style={{
      backgroundColor: C.bg,
      backgroundImage: [
        glow ? `radial-gradient(circle at ${glowX} ${glowY}, ${glow} 0%, transparent 35%)` : '',
        `linear-gradient(${C.grid} 2px, transparent 2px)`,
        `linear-gradient(90deg, ${C.grid} 2px, transparent 2px)`,
      ]
        .filter(Boolean)
        .join(','),
      backgroundSize: glow ? '100% 100%, 80px 80px, 80px 80px' : '80px 80px, 80px 80px',
    }}
  />
);
