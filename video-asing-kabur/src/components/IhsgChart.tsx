import {interpolate, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';

// Garis grafik yang tergambar progresif; nilai di ujung garis ikut berhitung.
export const IhsgChart: React.FC<{
  data: number[];
  width?: number;
  height?: number;
  drawFrames?: number;
  label?: string;
}> = ({data, width = 1100, height = 520, drawFrames = 90, label = 'IHSG'}) => {
  const frame = useCurrentFrame();
  const min = Math.min(...data) * 0.95;
  const max = Math.max(...data) * 1.03;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * width,
    height - ((v - min) / (max - min)) * height,
  ]);
  const progress = interpolate(frame, [0, drawFrames], [0, data.length - 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const idx = Math.floor(progress);
  const t = progress - idx;
  const visible = pts.slice(0, idx + 1);
  const next = pts[Math.min(idx + 1, pts.length - 1)];
  const cur = [visible[idx][0] + (next[0] - visible[idx][0]) * t, visible[idx][1] + (next[1] - visible[idx][1]) * t];
  const curVal = data[idx] + (data[Math.min(idx + 1, data.length - 1)] - data[idx]) * t;
  const d = [...visible, cur].map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ');
  const down = curVal < data[0];

  return (
    <svg width={width + 260} height={height + 60} style={{overflow: 'visible'}}>
      <path d={d} stroke={down ? C.red : C.green} strokeWidth={12} fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={cur[0]} cy={cur[1]} r={16} fill={down ? C.red : C.green} stroke={C.ink} strokeWidth={5} />
      <text x={cur[0] + 30} y={cur[1] + 18} fontFamily={FONT} fontWeight={900} fontSize={56} fill="#fff" stroke={C.ink} strokeWidth={8} paintOrder="stroke">
        {label} {Math.round(curVal).toLocaleString('id-ID')}
      </text>
    </svg>
  );
};
