import {interpolate, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';

// Gauge "tekanan jual" setengah lingkaran; jarum melewati batas lalu meledak.
export const Gauge: React.FC<{breakAt?: number; label?: string}> = ({breakAt = 60, label = 'JUAL'}) => {
  const frame = useCurrentFrame();
  const angle = interpolate(frame, [0, breakAt], [-80, 95], {
    extrapolateRight: 'clamp',
    easing: (x) => x * x,
  });
  const broken = frame >= breakAt;
  const jitter = broken ? Math.sin(frame * 3) * 6 : 0;
  const arc = (from: number, to: number) => {
    const r = 230;
    const a1 = ((from - 90) * Math.PI) / 180;
    const a2 = ((to - 90) * Math.PI) / 180;
    return `M${300 + r * Math.cos(a1)},${300 + r * Math.sin(a1)} A${r},${r} 0 0 1 ${300 + r * Math.cos(a2)},${300 + r * Math.sin(a2)}`;
  };
  const sparks = Array.from({length: 14}, (_, i) => {
    const a = (-60 + i * 9) * (Math.PI / 180);
    const len = interpolate(frame - breakAt, [0, 10], [0, 80 + (i % 4) * 40], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    const x = 300 + 230 * Math.cos(a);
    const y = 300 + 230 * Math.sin(a);
    return <line key={i} x1={x} y1={y} x2={x + len * Math.cos(a)} y2={y + len * Math.sin(a)} stroke={i % 2 ? C.yellow : '#fff'} strokeWidth={6} strokeLinecap="round" />;
  });

  return (
    <svg width={600} height={360} viewBox="0 0 600 360" style={{overflow: 'visible', transform: `translateX(${jitter}px)`}}>
      <path d="M40 320 A260 260 0 0 1 560 320 Z" fill="#f6efdd" stroke="#3a3f4f" strokeWidth={16} />
      <path d={arc(-85, -30)} stroke={C.green} strokeWidth={34} fill="none" />
      <path d={arc(-30, 30)} stroke={C.yellow} strokeWidth={34} fill="none" />
      <path d={arc(30, 85)} stroke={C.red} strokeWidth={34} fill="none" />
      <text x={300} y={250} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={60} fill="#222">{label}</text>
      <g transform={`rotate(${angle} 300 300)`}>
        <line x1={300} y1={300} x2={300} y2={broken ? 30 : 100} stroke={C.red} strokeWidth={18} strokeLinecap="round" />
      </g>
      <circle cx={300} cy={300} r={36} fill="#222" />
      {broken && sparks}
    </svg>
  );
};
