import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';

export type Mood = 'netral' | 'kaget' | 'sedih' | 'serius';

// Karakter siluet hitam: kepala bulat besar, mata putih, alis menentukan ekspresi.
export const Stickman: React.FC<{
  mood?: Mood;
  size?: number;
  shirt?: string;
  shake?: boolean;
}> = ({mood = 'netral', size = 500, shirt = C.blue, shake = false}) => {
  const frame = useCurrentFrame();
  // Kedip tiap ~3 detik.
  const blink = frame % 90 > 84 ? 0.1 : 1;
  const bob = Math.sin(frame / 12) * 4;
  const shakeX = shake ? Math.sin(frame * 2.3) * 8 : 0;

  const eyeH = mood === 'kaget' ? 34 : 22;
  const brow: Record<Mood, [number, number]> = {
    netral: [0, 0],
    kaget: [-14, -14],
    sedih: [-12, 12],
    serius: [14, -14],
  };
  const [bl, br] = brow[mood];
  const mouthOpen = mood === 'kaget' ? interpolate(Math.sin(frame / 5), [-1, 1], [18, 30]) : 0;

  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 400 560"
      style={{transform: `translate(${shakeX}px, ${bob}px)`, overflow: 'visible'}}
    >
      {/* badan */}
      <path d="M90 560 L110 330 Q200 300 290 330 L310 560 Z" fill={shirt} stroke={C.ink} strokeWidth={8} />
      <rect x={185} y={260} width={30} height={60} fill={C.ink} />
      {/* kepala */}
      <circle cx={200} cy={160} r={150} fill={C.ink} />
      {/* mata */}
      <ellipse cx={145} cy={160} rx={26} ry={eyeH * blink} fill="#fff6e6" />
      <ellipse cx={255} cy={160} rx={26} ry={eyeH * blink} fill="#fff6e6" />
      {/* alis */}
      <line x1={115} y1={120 + bl} x2={175} y2={120 - bl} stroke="#fff6e6" strokeWidth={12} strokeLinecap="round" />
      <line x1={225} y1={120 + br} x2={285} y2={120 - br} stroke="#fff6e6" strokeWidth={12} strokeLinecap="round" />
      {/* mulut */}
      {mood === 'kaget' ? (
        <ellipse cx={200} cy={235} rx={22} ry={mouthOpen} fill="#fff6e6" />
      ) : (
        <path
          d={mood === 'sedih' ? 'M165 245 Q200 220 235 245' : 'M165 235 L235 235'}
          stroke="#fff6e6"
          strokeWidth={12}
          strokeLinecap="round"
          fill="none"
        />
      )}
    </svg>
  );
};
