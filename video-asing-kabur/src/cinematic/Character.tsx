import {useCurrentFrame} from 'remotion';
import {C} from '../theme';

export type Pose = 'stand' | 'sit' | 'armUp' | 'headInHands' | 'point' | 'typing' | 'walk' | 'cheer';
export type Face = 'netral' | 'kaget' | 'sedih' | 'serius' | 'senang';

// Sudut (derajat, 0 = ke bawah, positif = ke depan/kanan) untuk [lengan atas, lengan bawah] dan [paha, betis].
const POSES: Record<Pose, {armF: [number, number]; armB: [number, number]; legF: [number, number]; legB: [number, number]; lean: number}> = {
  stand: {armF: [8, 4], armB: [-8, -4], legF: [4, 0], legB: [-4, 0], lean: 0},
  sit: {armF: [40, 80], armB: [30, 75], legF: [90, -90], legB: [85, -85], lean: -8},
  typing: {armF: [45, 95], armB: [38, 90], legF: [90, -90], legB: [85, -85], lean: 6},
  armUp: {armF: [165, 175], armB: [-10, -5], legF: [6, 0], legB: [-6, 0], lean: -4},
  headInHands: {armF: [140, -95], armB: [130, -100], legF: [90, -90], legB: [85, -85], lean: 18},
  point: {armF: [95, 95], armB: [-8, -4], legF: [6, 0], legB: [-6, 0], lean: 3},
  walk: {armF: [0, 0], armB: [0, 0], legF: [0, 0], legB: [0, 0], lean: 4},
  cheer: {armF: [160, 10], armB: [-160, -10], legF: [8, 0], legB: [-8, 0], lean: 0},
};

const rad = (d: number) => (d * Math.PI) / 180;
const seg = (x: number, y: number, len: number, ang: number): [number, number] => [x + Math.sin(rad(ang)) * len, y + Math.cos(rad(ang)) * len];

// Karakter siluet full-body dengan rim light (outline berwarna) seperti animasi sinematik.
export const Character: React.FC<{
  pose?: Pose;
  face?: Face;
  jacket?: string;
  rim?: string;
  height?: number;
  flip?: boolean;
  glowEye?: boolean;
}> = ({pose = 'stand', face = 'netral', jacket = C.red, rim = '#ffb26b', height = 700, flip, glowEye}) => {
  const frame = useCurrentFrame();
  const sw = Math.sin(frame / 4);
  const p =
    pose === 'walk'
      ? {...POSES.walk, armF: [-sw * 30, 15] as [number, number], armB: [sw * 30, 15] as [number, number], legF: [sw * 28, -Math.max(0, sw) * 30] as [number, number], legB: [-sw * 28, -Math.max(0, -sw) * 30] as [number, number]}
      : POSES[pose];
  const breathe = Math.sin(frame / 18) * 2;
  const blink = frame % 100 > 95 ? 0.1 : 1;
  const sitting = pose === 'sit' || pose === 'typing' || pose === 'headInHands';
  const hip: [number, number] = [200, sitting ? 560 : 520];
  const shoulder: [number, number] = [200 + Math.sin(rad(p.lean)) * 200, hip[1] - 200 + breathe];
  const neck: [number, number] = [shoulder[0] + Math.sin(rad(p.lean)) * 30, shoulder[1] - 30];
  const head: [number, number] = [neck[0] + (pose === 'headInHands' ? 25 : 0), neck[1] - 95 + (pose === 'headInHands' ? 25 : 0)];

  const limb = (from: [number, number], [a, b]: [number, number], l1: number, l2: number, color: string, w: number, end?: string) => {
    const m = seg(from[0], from[1], l1, a);
    const e = seg(m[0], m[1], l2, a + b);
    const d = `M${from[0]} ${from[1]} L${m[0]} ${m[1]} L${e[0]} ${e[1]}`;
    return (
      <g>
        <path d={d} stroke={rim} strokeWidth={w + 10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d={d} stroke={color} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {end && <circle cx={e[0]} cy={e[1]} r={w * 0.55} fill={end} />}
      </g>
    );
  };

  const brows: Record<Face, [number, number]> = {netral: [0, 0], kaget: [-10, -10], sedih: [-9, 9], serius: [10, -10], senang: [-4, -4]};
  const [bl, br] = brows[face];
  const ex = head[0];
  const ey = head[1];

  return (
    <svg width={height * 0.75} height={height} viewBox="0 0 400 760" style={{overflow: 'visible', transform: flip ? 'scaleX(-1)' : undefined}}>
      {/* kaki & lengan belakang */}
      {limb(hip, p.legB, 130, 140, '#2a2533', 46, C.ink)}
      {limb(shoulder, p.armB, 105, 100, jacket, 36, C.ink)}
      {/* badan */}
      <path
        d={`M${shoulder[0] - 62} ${shoulder[1] + 6} Q${shoulder[0]} ${shoulder[1] - 22} ${shoulder[0] + 62} ${shoulder[1] + 6} L${hip[0] + 58} ${hip[1]} L${hip[0] - 58} ${hip[1]} Z`}
        fill={jacket}
        stroke={rim}
        strokeWidth={8}
        strokeLinejoin="round"
      />
      <line x1={shoulder[0] + 4} y1={shoulder[1] + 10} x2={hip[0] + 4} y2={hip[1] - 10} stroke="rgba(0,0,0,0.25)" strokeWidth={5} />
      {limb(hip, p.legF, 130, 140, '#2a2533', 46, C.ink)}
      {/* leher & kepala */}
      <line x1={shoulder[0]} y1={shoulder[1]} x2={neck[0]} y2={neck[1]} stroke={C.ink} strokeWidth={30} />
      <circle cx={head[0]} cy={head[1]} r={88} fill={C.ink} stroke={rim} strokeWidth={8} />
      <ellipse cx={ex + 18} cy={ey - 5} rx={13} ry={(face === 'kaget' ? 20 : 13) * blink} fill="#fff6e6" />
      <ellipse cx={ex + 58} cy={ey - 5} rx={13} ry={(face === 'kaget' ? 20 : 13) * blink} fill="#fff6e6" />
      {glowEye && <circle cx={ex + 58} cy={ey - 5} r={30} fill="rgba(255,240,200,0.7)" style={{filter: 'blur(8px)'}} />}
      <line x1={ex + 4} y1={ey - 30 + bl} x2={ex + 32} y2={ey - 30 - bl} stroke="#fff6e6" strokeWidth={7} strokeLinecap="round" />
      <line x1={ex + 44} y1={ey - 30 + br} x2={ex + 72} y2={ey - 30 - br} stroke="#fff6e6" strokeWidth={7} strokeLinecap="round" />
      {face === 'kaget' ? (
        <ellipse cx={ex + 40} cy={ey + 38} rx={11} ry={15} fill="#fff6e6" />
      ) : (
        <path
          d={face === 'sedih' ? `M${ex + 22} ${ey + 45} Q${ex + 40} ${ey + 30} ${ex + 58} ${ey + 45}` : face === 'senang' ? `M${ex + 22} ${ey + 32} Q${ex + 40} ${ey + 50} ${ex + 58} ${ey + 32}` : `M${ex + 24} ${ey + 40} L${ex + 58} ${ey + 40}`}
          stroke="#fff6e6"
          strokeWidth={7}
          strokeLinecap="round"
          fill="none"
        />
      )}
      {/* lengan depan */}
      {limb(shoulder, p.armF, 105, 100, jacket, 36, C.ink)}
    </svg>
  );
};
