import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Background} from '../components/Background';
import {IhsgChart} from '../components/IhsgChart';
import {Mood, Stickman} from '../components/Stickman';
import {C, FONT} from '../theme';
import {Abs, Coin, Panel, Pop, Txt, usePop, useSec} from './lib';

type Line = {text: string; at: number; color?: string; size?: number};

// Stickman di kiri, baris teks muncul bergantian di kanan.
export const Statement: React.FC<{lines: Line[]; mood?: Mood | [number, Mood][]; glow?: string; shake?: boolean}> = ({
  lines,
  mood = 'netral',
  glow = 'rgba(255,178,107,0.3)',
  shake,
}) => {
  const sec = useSec();
  const m = Array.isArray(mood) ? [...mood].reverse().find(([t]) => sec >= t)?.[1] ?? 'netral' : mood;
  return (
    <AbsoluteFill>
      <Background glow={glow} glowX="22%" glowY="60%" />
      <Abs x={90} y={250}>
        <Stickman mood={m} size={460} shake={shake} />
      </Abs>
      <div style={{position: 'absolute', left: 720, right: 80, top: 140, display: 'flex', flexDirection: 'column', gap: 30}}>
        {lines.map((l) => (
          <Pop key={l.text} at={l.at} style={{transformOrigin: 'left center'}}>
            <Txt text={l.text} color={l.color} size={l.size ?? 100} />
          </Pop>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const PhoneRed: React.FC = () => {
  const frame = useCurrentFrame();
  const s = usePop(0.6, 12);
  const rows = ['BBCA', 'BBRI', 'BMRI', 'TLKM', 'ASII', 'ADRO'];
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,75,62,0.35)" glowX="70%" glowY="45%" />
      <Abs x={110} y={260}>
        <Stickman mood={frame > 150 ? 'kaget' : 'serius'} size={460} />
      </Abs>
      <Abs x={1150} y={90} style={{transform: `translateY(${(1 - s) * 800}px) rotate(5deg)`}}>
        <div style={{width: 470, height: 820, borderRadius: 56, background: '#1b1f2b', border: `12px solid ${C.ink}`, padding: 34, display: 'flex', flexDirection: 'column', gap: 22}}>
          <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 30, color: '#9aa3b8'}}>PORTOFOLIO</div>
          <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 58, color: C.red}}>-Rp 12.480.000</div>
          {rows.map((r, i) => (
            <div key={r} style={{display: 'flex', justifyContent: 'space-between', fontFamily: FONT, fontWeight: 900, fontSize: 40, color: '#fff', opacity: frame > 20 + i * 8 ? 1 : 0}}>
              <span>{r}</span>
              <span style={{color: C.red}}>▼ {(3.1 + i * 0.7).toFixed(1).replace('.', ',')}%</span>
            </div>
          ))}
        </div>
      </Abs>
      <Pop at={6.4} style={{position: 'absolute', left: 80, top: 70, transformOrigin: 'left'}}>
        <Txt text="LAUTAN MERAH." color={C.red} size={130} />
      </Pop>
    </AbsoluteFill>
  );
};

export const ChartScene: React.FC<{data: number[]; draw: number; title: Line; sub?: Line; label?: string}> = ({data, draw, title, sub, label}) => (
  <AbsoluteFill>
    <Background glow="rgba(255,75,62,0.3)" glowX="60%" glowY="60%" />
    <Abs x={120} y={360}>
      <IhsgChart data={data} width={1250} height={420} drawFrames={draw} label={label} />
    </Abs>
    <Pop at={title.at} style={{position: 'absolute', left: 100, top: 70, transformOrigin: 'left'}}>
      <Txt text={title.text} color={title.color} size={title.size ?? 110} />
    </Pop>
    {sub && (
      <Pop at={sub.at} style={{position: 'absolute', left: 100, top: 200, transformOrigin: 'left'}}>
        <Txt text={sub.text} color={sub.color} size={sub.size ?? 56} />
      </Pop>
    )}
  </AbsoluteFill>
);

export const Chips: React.FC<{chips: Line[]}> = ({chips}) => (
  <AbsoluteFill>
    <Background glow="rgba(255,75,62,0.3)" glowX="50%" glowY="55%" />
    <Abs x={720} y={260}>
      <Stickman mood="kaget" size={470} shake />
    </Abs>
    {chips.map((c, i) => (
      <Pop key={c.text} at={c.at} style={{position: 'absolute', left: [110, 1250, 160, 1220][i % 4], top: [140, 180, 480, 520][i % 4], transform: undefined}}>
        <div style={{padding: '18px 40px', background: c.color ?? C.red, border: `8px solid ${C.ink}`, borderRadius: 24, transform: `rotate(${i % 2 ? 4 : -4}deg)`}}>
          <Txt text={c.text} size={c.size ?? 80} />
        </div>
      </Pop>
    ))}
  </AbsoluteFill>
);

export const Breath: React.FC = () => {
  const sec = useSec();
  const k = 1 + 0.25 * Math.sin((sec - 42.6) * 2.2);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <Background glow="rgba(62,207,107,0.25)" />
      <div style={{position: 'absolute', width: 560, height: 560, borderRadius: '50%', border: `14px solid ${C.green}`, transform: `scale(${k})`, boxShadow: `0 0 80px ${C.green}`}} />
      <Txt text="TARIK NAPAS." size={120} />
    </AbsoluteFill>
  );
};

export const TitleCard: React.FC<{top: string; main: string[]; at: number}> = ({top, main, at}) => (
  <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 20}}>
    <Background glow="rgba(62,207,107,0.3)" glowY="40%" />
    <Pop at={at}>
      <div style={{padding: '14px 40px', background: C.green, border: `8px solid ${C.ink}`, borderRadius: 20}}>
        <Txt text={top} size={70} />
      </div>
    </Pop>
    {main.map((m, i) => (
      <Pop key={m} at={at + 0.6 + i * 0.5}>
        <Txt text={m} size={110} color={i === main.length - 1 ? C.yellow : C.white} style={{textAlign: 'center'}} />
      </Pop>
    ))}
  </AbsoluteFill>
);

export const Checklist: React.FC<{title: string; items: Line[]}> = ({title, items}) => (
  <AbsoluteFill>
    <Background glow="rgba(59,123,224,0.35)" glowX="75%" glowY="50%" />
    <Abs x={100} y={70}>
      <Txt text={title} size={90} />
    </Abs>
    <div style={{position: 'absolute', left: 120, top: 240, display: 'flex', flexDirection: 'column', gap: 34}}>
      {items.map((it) => (
        <Pop key={it.text} at={it.at} style={{transformOrigin: 'left', display: 'flex', alignItems: 'center', gap: 34}}>
          <div style={{width: 84, height: 84, borderRadius: 18, background: C.green, border: `7px solid ${C.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Txt text="✓" size={64} />
          </div>
          <Txt text={it.text} size={78} />
        </Pop>
      ))}
    </div>
    <Abs x={1450} y={330}>
      <Stickman mood="serius" size={330} />
    </Abs>
  </AbsoluteFill>
);

// Koin terbang berulang dari kiri ke kanan.
export const CoinStream: React.FC<{from: [number, number]; to: [number, number]; start: number; count?: number; label?: string}> = ({from, to, start, count = 6, label}) => {
  const sec = useSec();
  return (
    <>
      {Array.from({length: count}, (_, i) => {
        const t = ((sec - start - i * 0.35) % 2.1) / 1.6;
        if (sec < start + i * 0.35 || t < 0 || t > 1) return null;
        const x = from[0] + (to[0] - from[0]) * t;
        const y = from[1] + (to[1] - from[1]) * t - Math.sin(t * Math.PI) * 160;
        return (
          <Abs key={i} x={x} y={y}>
            <Coin label={label} />
          </Abs>
        );
      })}
    </>
  );
};

export const MoneyFlow: React.FC<{left: string; right: string; at: number; leftMood?: Mood; rightMood?: Mood; title?: Line}> = ({
  left,
  right,
  at,
  leftMood = 'sedih',
  rightMood = 'serius',
  title,
}) => (
  <AbsoluteFill>
    <Background glow="rgba(255,201,60,0.25)" />
    <Abs x={140} y={330}>
      <Stickman mood={leftMood} size={360} shirt="#8a8f9c" />
    </Abs>
    <Abs x={1400} y={330}>
      <Stickman mood={rightMood} size={360} shirt={C.green} />
    </Abs>
    <CoinStream from={[420, 420]} to={[1500, 420]} start={at} />
    <Pop at={at} style={{position: 'absolute', left: 90, top: 210}}>
      <Txt text={left} size={60} color={C.red} />
    </Pop>
    <Pop at={at + 1.5} style={{position: 'absolute', right: 90, top: 210, textAlign: 'right'}}>
      <Txt text={right} size={60} color={C.green} />
    </Pop>
    {title && (
      <Pop at={title.at} style={{position: 'absolute', left: 0, right: 0, top: 60, textAlign: 'center'}}>
        <Txt text={title.text} size={title.size ?? 90} color={title.color} />
      </Pop>
    )}
  </AbsoluteFill>
);

export const SectionCard: React.FC<{num: string; title: string; sub?: string; at: number}> = ({num, title, sub, at}) => {
  const sec = useSec();
  const w = interpolate(sec - at, [0, 0.6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <Background glow="rgba(255,201,60,0.25)" />
      <div style={{position: 'absolute', top: 470, left: 0, height: 16, width: `${w * 100}%`, background: C.yellow}} />
      <Pop at={at} style={{position: 'absolute', top: 230}}>
        <Txt text={num} size={70} color={C.yellow} />
      </Pop>
      <Pop at={at + 0.3} style={{position: 'absolute', top: 520, textAlign: 'center', padding: '0 80px'}}>
        <Txt text={title} size={110} />
        {sub && <Txt text={sub} size={60} color="#9fb3e0" style={{marginTop: 20}} />}
      </Pop>
    </AbsoluteFill>
  );
};

// Kolam likuiditas: tinggi air mengikuti titik-titik [detik, 0..1].
export const Pool: React.FC<{levels: [number, number][]; foreignAt?: number; labels: (Line & {x: number; y: number})[]; whale?: boolean}> = ({
  levels,
  foreignAt,
  labels,
  whale,
}) => {
  const sec = useSec();
  const level = interpolate(sec, levels.map((l) => l[0]), levels.map((l) => l[1]), {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const fw = foreignAt === undefined ? 0 : interpolate(sec - foreignAt, [0, 1], [0, 0.68], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const W = 1100;
  const H = 480;
  const wave = Math.sin(sec * 3) * 8;
  const wy = H - level * H;
  return (
    <AbsoluteFill>
      <Background glow="rgba(59,123,224,0.35)" glowY="65%" />
      <Abs x={410} y={330}>
        <svg width={W} height={H + 20} style={{overflow: 'visible'}}>
          <defs>
            <clipPath id="pool">
              <rect x={0} y={0} width={W} height={H} rx={30} />
            </clipPath>
          </defs>
          <g clipPath="url(#pool)">
            <rect x={0} y={0} width={W} height={H} fill="#13234a" />
            <path d={`M0 ${wy} Q${W / 4} ${wy - wave} ${W / 2} ${wy} T${W} ${wy} V${H} H0 Z`} fill="#3aa0ff" />
            {fw > 0 && <rect x={W * (1 - fw)} y={wy} width={W * fw} height={H} fill="#7b5cff" opacity={0.85} />}
          </g>
          <rect x={0} y={0} width={W} height={H} rx={30} fill="none" stroke={C.ink} strokeWidth={14} />
          {whale && level > 0.5 && (
            <g transform={`translate(${200 + ((sec * 80) % 600)}, ${wy + 120})`}>
              <ellipse cx={0} cy={0} rx={130} ry={60} fill="#1d2b55" stroke={C.ink} strokeWidth={8} />
              <path d="M120 0 L190 -50 L190 50 Z" fill="#1d2b55" stroke={C.ink} strokeWidth={8} />
              <circle cx={-70} cy={-15} r={10} fill="#fff" />
            </g>
          )}
        </svg>
      </Abs>
      {labels.map((l) => (
        <Pop key={l.text} at={l.at} style={{position: 'absolute', left: l.x, top: l.y}}>
          <Txt text={l.text} size={l.size ?? 80} color={l.color} />
        </Pop>
      ))}
    </AbsoluteFill>
  );
};

export const Magnet: React.FC<{onAt: number; pullAt: number; labels: Line[]}> = ({onAt, pullAt, labels}) => {
  const sec = useSec();
  const on = sec >= onAt;
  const pulse = on ? 0.6 + 0.4 * Math.sin(sec * 8) : 0;
  return (
    <AbsoluteFill>
      <Background glow={on ? 'rgba(255,75,62,0.4)' : 'rgba(59,123,224,0.25)'} glowX="25%" glowY="55%" />
      <Abs x={170} y={260}>
        <svg width={420} height={460} viewBox="0 0 420 460" style={{overflow: 'visible', filter: on ? `drop-shadow(0 0 ${40 * pulse}px ${C.red})` : undefined}}>
          <path d="M60 40 V260 A150 150 0 0 0 360 260 V40 H260 V260 A50 50 0 0 1 160 260 V40 Z" fill={C.red} stroke={C.ink} strokeWidth={14} />
          <rect x={60} y={20} width={100} height={70} fill="#d9d9d9" stroke={C.ink} strokeWidth={12} />
          <rect x={260} y={20} width={100} height={70} fill="#d9d9d9" stroke={C.ink} strokeWidth={12} />
        </svg>
        <Txt text="SUKU BUNGA GLOBAL" size={40} style={{marginTop: 20}} />
      </Abs>
      <Abs x={1450} y={640}>
        <Panel style={{padding: '30px 40px'}}>
          <Txt text="🇮🇩 IHSG" size={60} color={C.ink} style={{WebkitTextStroke: 0, textShadow: 'none'}} />
        </Panel>
      </Abs>
      <CoinStream from={[1480, 640]} to={[380, 380]} start={pullAt} count={7} label="$" />
      <div style={{position: 'absolute', left: 700, right: 60, top: 70, display: 'flex', flexDirection: 'column', gap: 18}}>
        {labels.map((l) => (
          <Pop key={l.text} at={l.at} style={{transformOrigin: 'left'}}>
            <Txt text={l.text} size={l.size ?? 70} color={l.color} />
          </Pop>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const Reasons: React.FC<{items: (Line & {ok: boolean})[]; title: Line}> = ({items, title}) => (
  <AbsoluteFill>
    <Background glow="rgba(255,201,60,0.25)" glowX="75%" />
    <Pop at={title.at} style={{position: 'absolute', left: 110, top: 60, transformOrigin: 'left'}}>
      <Txt text={title.text} size={130} color={C.yellow} />
    </Pop>
    <div style={{position: 'absolute', left: 120, top: 270, display: 'flex', flexDirection: 'column', gap: 40}}>
      {items.map((it) => (
        <Pop key={it.text} at={it.at} style={{transformOrigin: 'left', display: 'flex', alignItems: 'center', gap: 34}}>
          <div style={{width: 96, height: 96, borderRadius: 20, background: it.ok ? C.green : C.red, border: `7px solid ${C.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Txt text={it.ok ? '✓' : '✕'} size={70} />
          </div>
          <Txt text={it.text} size={84} color={it.ok ? C.green : '#c9cfdb'} style={it.ok ? undefined : {textDecoration: 'line-through'}} />
        </Pop>
      ))}
    </div>
    <Abs x={1450} y={330}>
      <Stickman mood="serius" size={330} />
    </Abs>
  </AbsoluteFill>
);

export const SupplyDemand: React.FC<{at: number; lawAt: number}> = ({at, lawAt}) => {
  const sell = usePop(at, 16);
  const buy = usePop(at + 2.5, 16);
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,75,62,0.3)" glowX="40%" glowY="70%" />
      <div style={{position: 'absolute', left: 260, bottom: 200, display: 'flex', gap: 160, alignItems: 'flex-end'}}>
        {[
          {v: sell, h: 560, c: C.red, t: 'JUAL ASING'},
          {v: buy, h: 170, c: C.green, t: 'BELI LOKAL'},
        ].map((b) => (
          <div key={b.t} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}>
            <div style={{width: 260, height: b.h * b.v, background: b.c, border: `8px solid ${C.ink}`, borderRadius: 16}} />
            <Txt text={b.t} size={52} />
          </div>
        ))}
      </div>
      <Pop at={lawAt} style={{position: 'absolute', right: 90, top: 260, textAlign: 'right'}}>
        <Txt text="SUPPLY" size={110} color={C.red} />
        <Txt text="> DEMAND" size={110} color={C.green} />
        <Txt text="= HARGA TURUN" size={80} style={{marginTop: 20}} />
      </Pop>
    </AbsoluteFill>
  );
};
