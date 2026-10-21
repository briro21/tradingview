import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {MysteryBox, Pulse} from '../asing-kabur/scenes';
import {Background} from '../components/Background';
import {Camera, Grade, Layer} from '../cinematic/Camera';
import {Character, Face, Pose} from '../cinematic/Character';
import {Chair, Monitor, NightRoom, SunsetOffice} from '../cinematic/Sets';
import {Abs, Coin, Panel, Pop, Txt, usePop, useSec} from '../pasar-hijau/lib';
import {C, FONT, useTheme} from '../theme';

export type Line = {text: string; at: number; color?: string; size?: number};
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const fmt = (n: number, d = 0) => n.toLocaleString('id-ID', {minimumFractionDigits: d, maximumFractionDigits: d});
const ease = (t: number) => t * t * (3 - 2 * t);
const ramp = (sec: number, a: number, b: number) => ease(interpolate(sec, [a, b], [0, 1], clamp));

const Lines: React.FC<{lines: Line[]; x?: number; y?: number; align?: 'left' | 'right' | 'center'; color?: string}> = ({lines, x = 90, y = 60, align = 'left', color}) => (
  <div
    style={{
      position: 'absolute',
      top: y,
      ...(align === 'center' ? {left: 0, right: 0} : {[align]: x}),
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      alignItems: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
      textAlign: align,
    }}
  >
    {lines.map((l) => (
      <Pop key={l.text} at={l.at} style={{transformOrigin: align === 'center' ? 'center' : align}}>
        <Txt text={l.text} size={l.size ?? 80} color={l.color ?? color} />
      </Pop>
    ))}
  </div>
);

const Card: React.FC<{children: React.ReactNode; w?: number; h?: number; style?: React.CSSProperties}> = ({children, w, h, style}) => (
  <Panel style={{width: w, height: h, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24, ...style}}>{children}</Panel>
);
const Ink: React.FC<{t: string; s?: number; c?: string}> = ({t, s = 40, c = C.ink}) => (
  <div style={{fontFamily: FONT, fontWeight: 900, fontSize: s, color: c, textAlign: 'center', lineHeight: 1.1, whiteSpace: 'pre-line'}}>{t}</div>
);

// ───────── Hook ─────────
export const NewsRoom: React.FC<{headlineAt: number; shockAt: number}> = ({headlineAt, shockAt}) => {
  const sec = useSec();
  const show = sec > headlineAt;
  const flash = show && Math.floor(sec * 3) % 2 === 0;
  return (
    <>
      <Camera zoom={[1, 1.18]} pan={[0, -90]} origin="70% 45%">
        <NightRoom
          screen={
            <div style={{height: '100%', background: show ? (flash ? '#b3121b' : '#7a0d13') : '#141225', padding: 24, fontFamily: FONT, fontWeight: 900, color: '#fff'}}>
              <div style={{fontSize: 24, background: '#fff', color: '#b3121b', display: 'inline-block', padding: '2px 10px'}}>BREAKING NEWS</div>
              {show && (
                <>
                  <div style={{fontSize: 46, marginTop: 18, lineHeight: 1.05}}>RUPIAH TEMBUS</div>
                  <div style={{fontSize: 66, color: C.yellow}}>Rp20.000/$</div>
                </>
              )}
            </div>
          }
        >
          <Chair x={845} y={525} />
          <div style={{position: 'absolute', left: 820, top: 300}}>
            <Character pose={sec > shockAt ? 'headInHands' : 'typing'} face={sec > shockAt ? 'kaget' : 'netral'} rim="#7fb2ff" height={620} />
          </div>
        </NightRoom>
        <Grade tint="rgba(120,60,200,0.25)" />
      </Camera>
      {show && <Pulse color="rgba(255,40,40,0.5)" speed={3} />}
    </>
  );
};

// Uang Rp100.000 yang daya belinya menyusut.
export const Banknote: React.FC<{shrinkAt: number; lines: Line[]}> = ({shrinkAt, lines}) => {
  const sec = useSec();
  const k = ramp(sec, shrinkAt, shrinkAt + 3);
  const items = ['🍚', '🥚', '🥛', '🍞', '🧴'];
  const keep = Math.round(5 - k * 1.6);
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,75,62,0.2)" />
      <Abs x={160} y={250}>
        <div style={{width: 760, height: 360, borderRadius: 24, border: `10px solid ${C.ink}`, background: `linear-gradient(135deg, #ff8a8a, #e4505a)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', filter: `saturate(${1 - k * 0.7})`, opacity: 1 - k * 0.35, boxShadow: '0 14px 0 #050505'}}>
          <div style={{position: 'absolute', inset: 22, border: '4px dashed rgba(255,255,255,0.6)', borderRadius: 14}} />
          <Txt text="100.000" size={140} color="#fff" />
          <div style={{position: 'absolute', left: 40, top: 26, fontFamily: FONT, fontWeight: 900, fontSize: 40, color: '#fff'}}>RUPIAH</div>
        </div>
      </Abs>
      <div style={{position: 'absolute', left: 1040, top: 260, width: 720, display: 'flex', flexWrap: 'wrap', gap: 24}}>
        {items.map((e, i) => (
          <div key={e} style={{fontSize: 130, opacity: i < keep ? 1 : 0.12, transform: `scale(${i < keep ? 1 : 0.8})`, filter: i < keep ? undefined : 'grayscale(1)'}}>
            {e}
          </div>
        ))}
      </div>
      <Lines lines={lines} />
    </AbsoluteFill>
  );
};

// ───────── Grafik garis generik (kurs, sejarah 1998) ─────────
export const LineChart: React.FC<{
  data: number[];
  labels?: [number, string][];
  from: number;
  to: number;
  target?: {v: number; label: string; at: number};
  marker?: string;
  min: number;
  max: number;
  color?: string;
  lines: Line[];
  caption?: string;
  gap?: {at: number; text: string};
}> = ({data, labels = [], from, to, target, marker, min, max, color = C.red, lines, caption, gap}) => {
  const sec = useSec();
  const th = useTheme();
  const W = 1300;
  const H = 520;
  const p = ramp(sec, from, to) * (data.length - 1);
  const y = (v: number) => H - ((v - min) / (max - min)) * H;
  const x = (i: number) => (i / (data.length - 1)) * W;
  const idx = Math.floor(p);
  const f = p - idx;
  const pts = data.slice(0, idx + 1).map((v, i) => [x(i), y(v)]);
  const nv = data[Math.min(idx + 1, data.length - 1)];
  const cv = data[idx] + (nv - data[idx]) * f;
  pts.push([x(p), y(cv)]);
  const d = pts.map((q, i) => `${i ? 'L' : 'M'}${q[0]} ${q[1]}`).join(' ');
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,75,62,0.18)" glowX="70%" />
      <Abs x={140} y={300}>
        <svg width={W + 300} height={H + 80} style={{overflow: 'visible'}}>
          <line x1={0} y1={H} x2={W} y2={H} stroke={th.muted} strokeWidth={4} />
          {labels.map(([i, t]) => (
            <text key={t} x={x(i)} y={H + 50} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={30} fill={th.muted}>
              {t}
            </text>
          ))}
          {target && sec > target.at && (
            <g opacity={ramp(sec, target.at, target.at + 0.6)}>
              <line x1={0} y1={y(target.v)} x2={W} y2={y(target.v)} stroke={C.red} strokeWidth={8} strokeDasharray="26 16" />
              <text x={W + 16} y={y(target.v) + 14} fontFamily={FONT} fontWeight={900} fontSize={44} fill={C.red}>
                {target.label}
              </text>
            </g>
          )}
          {gap && target && sec > gap.at && (
            <g opacity={ramp(sec, gap.at, gap.at + 0.5)}>
              <line x1={W - 40} y1={y(data[data.length - 1])} x2={W - 40} y2={y(target.v)} stroke={C.yellow} strokeWidth={10} />
              <text x={W - 70} y={(y(data[data.length - 1]) + y(target.v)) / 2 + 18} textAnchor="end" fontFamily={FONT} fontWeight={900} fontSize={56} fill={C.yellow} stroke={C.ink} strokeWidth={8} paintOrder="stroke">
                {gap.text}
              </text>
            </g>
          )}
          <path d={d} stroke={C.ink} strokeWidth={20} fill="none" strokeLinejoin="round" strokeLinecap="round" />
          <path d={d} stroke={color} strokeWidth={11} fill="none" strokeLinejoin="round" strokeLinecap="round" />
          <circle cx={x(p)} cy={y(cv)} r={18} fill={color} stroke={C.ink} strokeWidth={6} />
          <text x={x(p) + 28} y={y(cv) - 20} fontFamily={FONT} fontWeight={900} fontSize={54} fill="#fff" stroke={C.ink} strokeWidth={10} paintOrder="stroke">
            {marker ? `${marker}${fmt(Math.round(cv))}` : fmt(Math.round(cv))}
          </text>
        </svg>
      </Abs>
      <Lines lines={lines} />
      {caption && (
        <Abs x={140} y={960}>
          <Txt text={caption} size={24} color={th.muted} />
        </Abs>
      )}
    </AbsoluteFill>
  );
};

export const Roadmap: React.FC<{items: Line[]; lines: Line[]}> = ({items, lines}) => (
  <AbsoluteFill>
    <Background glow="rgba(59,123,224,0.2)" />
    <div style={{position: 'absolute', left: 100, right: 100, top: 360, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}>
      {items.map((it, i) => (
        <div key={it.text} style={{display: 'flex', alignItems: 'center', gap: 20}}>
          <Pop at={it.at}>
            <div style={{background: [C.yellow, '#ff9f43', C.red, '#b3121b'][i % 4], border: `8px solid ${C.ink}`, borderRadius: 999, padding: '22px 40px'}}>
              <Txt text={it.text} size={54} />
            </div>
          </Pop>
          {i < items.length - 1 && <Txt text="→" size={70} />}
        </div>
      ))}
    </div>
    <Lines lines={lines} align="center" y={600} />
  </AbsoluteFill>
);

export const Mystery: React.FC<{openAt?: number; lines: Line[]; reveal?: Line}> = ({openAt, lines, reveal}) => (
  <AbsoluteFill>
    <Background glow="rgba(255,201,60,0.35)" />
    <Abs x={800} y={360}>
      <MysteryBox openAt={openAt} />
    </Abs>
    <Lines lines={lines} align="center" y={70} />
    {reveal && <Lines lines={[reveal]} align="center" y={790} />}
  </AbsoluteFill>
);

// ───────── Timbangan Rp vs $ ─────────
export const Scale: React.FC<{tiltAt: number; lines: Line[]; dollars?: number}> = ({tiltAt, lines, dollars = 5}) => {
  const sec = useSec();
  const tilt = ramp(sec, tiltAt, tiltAt + 2.5) * 16 + Math.sin(sec * 2) * 1.2;
  const n = Math.round(interpolate(sec, [tiltAt, tiltAt + 2.5], [1, dollars], clamp));
  return (
    <AbsoluteFill>
      <Background glow="rgba(62,207,107,0.2)" glowX="50%" glowY="60%" />
      <Abs x={960 - 30} y={360}>
        <div style={{width: 60, height: 520, background: '#6b5a48', border: `8px solid ${C.ink}`}} />
      </Abs>
      <Abs x={760} y={860}>
        <div style={{width: 400, height: 50, background: '#6b5a48', border: `8px solid ${C.ink}`, borderRadius: 10}} />
      </Abs>
      <div style={{position: 'absolute', left: 360, top: 340, width: 1200, transform: `rotate(${-tilt}deg)`, transformOrigin: '600px 30px'}}>
        <div style={{height: 34, background: '#8a7560', border: `8px solid ${C.ink}`, borderRadius: 10}} />
        {[
          {x: 0, label: '$', color: C.green, count: n},
          {x: 900, label: 'Rp', color: C.yellow, count: 2},
        ].map((side) => (
          <div key={side.label} style={{position: 'absolute', left: side.x, top: 30, width: 300, transform: `rotate(${tilt}deg)`, transformOrigin: '150px 0'}}>
            <div style={{width: 6, height: 120, background: C.ink, margin: '0 auto'}} />
            <div style={{display: 'flex', flexWrap: 'wrap-reverse', justifyContent: 'center', gap: 4, minHeight: 90, alignItems: 'flex-end'}}>
              {Array.from({length: side.count}, (_, i) => (
                <Coin key={i} size={86} label={side.label} />
              ))}
            </div>
            <div style={{height: 26, background: '#8a7560', border: `7px solid ${C.ink}`, borderRadius: '0 0 60px 60px'}} />
          </div>
        ))}
      </div>
      <Lines lines={lines} align="center" y={50} />
    </AbsoluteFill>
  );
};

// Kartu-kartu yang muncul bergantian; yang terbaru disorot.
export const Cards: React.FC<{title?: Line; cards: {e: string; t: string; sub?: string; at: number; color?: string}[]; flow?: 'out' | 'in'}> = ({title, cards, flow}) => {
  const sec = useSec();
  const active = [...cards].reverse().find((c) => sec >= c.at);
  return (
    <AbsoluteFill>
      <Background glow={flow === 'in' ? 'rgba(62,207,107,0.25)' : 'rgba(255,75,62,0.2)'} />
      <div style={{position: 'absolute', left: 80, right: 80, top: title ? 240 : 160, display: 'flex', gap: 30, justifyContent: 'center'}}>
        {cards.map((c) => {
          const on = c === active;
          return (
            <Pop key={c.t} at={c.at}>
              <Card w={400} h={520} style={{transform: `translateY(${on ? -20 : 0}px)`, background: on ? '#fffaf0' : '#d9d3c4', boxShadow: on ? `0 14px 0 ${C.ink}, 0 0 60px ${c.color ?? (flow === 'in' ? C.green : C.red)}` : `0 14px 0 ${C.ink}`}}>
                <div style={{fontSize: 140}}>{c.e}</div>
                <Ink t={c.t} s={42} />
                {c.sub && <Ink t={c.sub} s={28} c="#555" />}
                {flow && <Ink t={flow === 'out' ? '$ keluar ↗' : '$ masuk ↙'} s={30} c={flow === 'out' ? C.red : C.green} />}
              </Card>
            </Pop>
          );
        })}
      </div>
      {title && <Lines lines={[title]} align="center" y={60} />}
    </AbsoluteFill>
  );
};

// Tangki cadangan dolar: masuk vs keluar.
export const Tank: React.FC<{lines: Line[]; drainAt: number}> = ({lines, drainAt}) => {
  const sec = useSec();
  const level = 0.75 - ramp(sec, drainAt, drainAt + 4) * 0.45 + Math.sin(sec * 3) * 0.01;
  const flowOut = sec > drainAt;
  return (
    <AbsoluteFill>
      <Background glow="rgba(59,123,224,0.25)" />
      <Abs x={710} y={260}>
        <div style={{width: 500, height: 560, border: `12px solid ${C.ink}`, borderRadius: 30, background: '#e8e2d4', position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: `${level * 100}%`, background: C.green}} />
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Txt text="$" size={200} />
          </div>
        </div>
      </Abs>
      {/* pipa masuk & keluar */}
      <Abs x={260} y={330}>
        <div style={{width: 450, height: 50, background: C.green, border: `8px solid ${C.ink}`}} />
      </Abs>
      <Abs x={1210} y={720}>
        <div style={{width: 450, height: 50, background: flowOut ? C.red : '#999', border: `8px solid ${C.ink}`}} />
      </Abs>
      {[0, 1, 2].map((i) => {
        const t = ((sec * 0.8 + i / 3) % 1);
        return (
          <Abs key={`i${i}`} x={260 + t * 420} y={300}>
            <Coin size={70} label="$" />
          </Abs>
        );
      })}
      {Array.from({length: flowOut ? 5 : 2}, (_, i) => {
        const t = ((sec * 1.1 + i / 5) % 1);
        return (
          <Abs key={`o${i}`} x={1220 + t * 420} y={690}>
            <Coin size={70} label="$" />
          </Abs>
        );
      })}
      <Abs x={200} y={410}>
        <Ink t={'MASUK:\nekspor, turis,\ninvestasi'} s={34} c={C.green} />
      </Abs>
      <Abs x={1260} y={800}>
        <Ink t={'KELUAR:\njual aset, utang, impor'} s={34} c={C.red} />
      </Abs>
      <Lines lines={lines} align="center" y={50} />
    </AbsoluteFill>
  );
};

export const Bars: React.FC<{bars: {t: string; v: number; at: number; color?: string; value?: string}[]; lines: Line[]; stamp?: Line}> = ({bars, lines, stamp}) => {
  const sec = useSec();
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,201,60,0.2)" />
      <div style={{position: 'absolute', left: 200, right: 200, bottom: 190, display: 'flex', gap: 120, justifyContent: 'center', alignItems: 'flex-end'}}>
        {bars.map((b) => (
          <div key={b.t} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
            {b.value && sec > b.at + 1 && <Txt text={b.value} size={64} color={b.color ?? C.red} />}
            <div style={{width: 260, height: 20 + 480 * b.v * ramp(sec, b.at, b.at + 1.5), background: b.color ?? C.red, border: `8px solid ${C.ink}`, borderRadius: 16}} />
            <Txt text={b.t} size={48} />
          </div>
        ))}
      </div>
      <Lines lines={lines} align="center" y={50} />
      {stamp && sec > stamp.at && (
        <Pop at={stamp.at} style={{position: 'absolute', left: 0, right: 0, top: 360, display: 'flex', justifyContent: 'center'}}>
          <div style={{border: `14px solid ${stamp.color ?? C.green}`, borderRadius: 24, padding: '10px 40px', transform: 'rotate(-6deg)', background: 'rgba(255,255,255,0.85)'}}>
            <Txt text={stamp.text} size={stamp.size ?? 90} color={stamp.color ?? C.green} />
          </div>
        </Pop>
      )}
    </AbsoluteFill>
  );
};

// Layar hitam dramatis.
export const Dark: React.FC<{lines: Line[]}> = ({lines}) => (
  <AbsoluteFill style={{background: '#0d0d10'}}>
    <Lines lines={lines} align="center" y={380} color="#fff" />
  </AbsoluteFill>
);

// ───────── Hari 1 ─────────
export const Queue: React.FC<{lines: Line[]; growAt: number}> = ({lines, growAt}) => {
  const sec = useSec();
  const n = Math.round(interpolate(sec, [growAt, growAt + 4], [3, 9], clamp));
  return (
    <Camera zoom={[1.05, 1]} pan={[30, -30]}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #ffd9a8, #f5f0e6)'}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 860, bottom: 0, background: '#d8c7a6'}} />
      <Abs x={1380} y={180}>
        <div style={{width: 470, height: 680, background: '#3b7be0', border: `10px solid ${C.ink}`, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 30, gap: 20}}>
          <Txt text="MONEY CHANGER" size={44} color="#fff" />
          <div style={{background: '#10141f', border: `6px solid ${C.ink}`, borderRadius: 10, padding: '14px 26px', fontFamily: FONT, fontWeight: 900, color: '#fff', fontSize: 34}}>
            USD JUAL <span style={{color: C.red}}>20.150</span>
          </div>
          <div style={{width: 300, height: 300, background: '#bfe3ff', border: `8px solid ${C.ink}`, marginTop: 20}} />
        </div>
      </Abs>
      {Array.from({length: n}, (_, i) => (
        <Abs key={i} x={1180 - i * 135} y={520 - (i % 2) * 10}>
          <Character pose={i % 3 === 0 ? 'point' : 'stand'} face={i % 2 ? 'kaget' : 'serius'} jacket={[C.red, C.blue, C.green, C.yellow, '#7b5cff'][i % 5]} rim="#ffffff" height={380} flip />
        </Abs>
      ))}
      <Lines lines={lines} />
    </Camera>
  );
};

// Bank Indonesia seperti pemadam: menyiram dengan cadangan dolar.
export const FireHose: React.FC<{lines: Line[]; sprayAt: number}> = ({lines, sprayAt}) => {
  const sec = useSec();
  const spraying = sec > sprayAt;
  const tank = 1 - ramp(sec, sprayAt, sprayAt + 10) * 0.55;
  const flame = 1 - (spraying ? ramp(sec, sprayAt + 1, sprayAt + 6) * 0.5 : 0);
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,120,60,0.3)" glowX="72%" glowY="60%" />
      <Abs x={160} y={330}>
        <div style={{width: 360, height: 460, background: '#e8e2d4', border: `10px solid ${C.ink}`, position: 'relative'}}>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: `${tank * 100}%`, background: C.green}} />
          <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Txt text="BI" size={120} />
            <Txt text="cadangan $" size={36} />
          </div>
        </div>
      </Abs>
      {spraying && (
        <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
          {Array.from({length: 18}, (_, i) => {
            const t = (sec * 1.4 + i / 18) % 1;
            const x = 520 + t * 900;
            const y = 420 - Math.sin(t * Math.PI) * 220 + t * 260;
            return <circle key={i} cx={x} cy={y} r={16} fill="#5aa0ff" stroke={C.ink} strokeWidth={3} />;
          })}
        </svg>
      )}
      <Abs x={1360} y={420}>
        <div style={{fontSize: 300 * flame, lineHeight: 1, transform: `scale(${1 + Math.sin(sec * 9) * 0.04})`, transformOrigin: 'bottom'}}>🔥</div>
        <Ink t="PANIK PASAR" s={40} c={C.red} />
      </Abs>
      <Lines lines={lines} />
    </AbsoluteFill>
  );
};

// Nilai dalam dolar yang ikut menyusut.
export const Shrink: React.FC<{lines: Line[]; at: number}> = ({lines, at}) => {
  const sec = useSec();
  const rate = interpolate(sec, [at, at + 6], [18000, 20000], clamp);
  const usd = 1e12 / rate / 1e6;
  return (
    <AbsoluteFill>
      <Background glow="rgba(123,92,255,0.25)" />
      <Abs x={140} y={250}>
        <Character pose="headInHands" face="sedih" jacket="#7b5cff" rim="#ffffff" height={640} />
      </Abs>
      <Abs x={800} y={300}>
        <Card w={900} h={420}>
          <Ink t="Portofolio Rp1 triliun, dalam dolar:" s={36} c="#555" />
          <Ink t={`$${fmt(usd, 1)} juta`} s={110} c={C.red} />
          <Ink t={`kurs ${fmt(Math.round(rate))}`} s={36} />
        </Card>
      </Abs>
      <Lines lines={lines} />
    </AbsoluteFill>
  );
};

// ───────── Minggu 1: kalkulator utang ─────────
export const DebtCalc: React.FC<{rate1At: number; rate2At: number; extraAt: number; lines: Line[]}> = ({rate1At, rate2At, extraAt, lines}) => {
  const sec = useSec();
  const rate = sec < rate2At ? 18000 : interpolate(sec, [rate2At, rate2At + 2], [18000, 20000], clamp);
  const rp = (100e6 * rate) / 1e12;
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,75,62,0.2)" glowX="65%" />
      <Abs x={140} y={220}>
        <Panel style={{width: 1100, padding: '40px 60px', background: '#10141f'}}>
          <div style={{fontFamily: 'monospace', fontWeight: 700, fontSize: 64, color: '#d6e2ff', lineHeight: 1.6}}>
            <div>Utang&nbsp;&nbsp;= $100.000.000</div>
            {sec > rate1At && (
              <div>
                Kurs&nbsp;&nbsp;&nbsp;× <span style={{color: rate > 18000 ? C.red : '#fff'}}>{fmt(Math.round(rate))}</span>
              </div>
            )}
            {sec > rate1At + 1 && <div style={{borderTop: '4px solid #555'}}>Total = <span style={{color: rate > 18000 ? C.red : C.yellow}}>Rp{fmt(rp, 2)} T</span></div>}
          </div>
        </Panel>
      </Abs>
      {sec > extraAt && (
        <Pop at={extraAt} style={{position: 'absolute', left: 1080, top: 700}}>
          <div style={{background: C.red, border: `10px solid ${C.ink}`, borderRadius: 20, padding: '14px 36px', transform: 'rotate(-5deg)'}}>
            <Txt text="+Rp200 MILIAR" size={86} />
          </div>
        </Pop>
      )}
      <Lines lines={lines} />
    </AbsoluteFill>
  );
};

export const ProfitSqueeze: React.FC<{lines: Line[]; at: number}> = ({lines, at}) => {
  const sec = useSec();
  const k = ramp(sec, at, at + 3);
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,75,62,0.2)" />
      <div style={{position: 'absolute', left: 400, right: 400, top: 300, display: 'flex', gap: 60, alignItems: 'flex-end', height: 500}}>
        {[
          {t: 'PENDAPATAN (Rp)', h: 1, c: C.blue},
          {t: 'BIAYA UTANG ($)', h: 0.45 + k * 0.3, c: C.red},
          {t: 'LABA', h: 0.55 - k * 0.4, c: C.green},
        ].map((b) => (
          <div key={b.t} style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
            <div style={{width: '100%', height: 420 * b.h, background: b.c, border: `8px solid ${C.ink}`, borderRadius: 14}} />
            <Ink t={b.t} s={30} c={useTheme().text} />
          </div>
        ))}
      </div>
      <Lines lines={lines} />
    </AbsoluteFill>
  );
};

// Karyawan keluar kantor membawa kardus.
export const Layoff: React.FC<{lines: Line[]}> = ({lines}) => {
  const sec = useSec();
  return (
    <Camera zoom={[1, 1.06]} pan={[0, -20]}>
      <Layer blur={8}>
        <SunsetOffice />
      </Layer>
      {[0, 1, 2].map((i) => {
        const x = interpolate(sec - i * 1.8, [261.5, 271.5], [200, 1700], clamp);
        return (
          <Abs key={i} x={x} y={300 + i * 30}>
            <Character pose="walk" face="sedih" jacket={[C.blue, C.green, '#e8e4ee'][i]} rim="#ffb26b" height={600 - i * 40} />
            <div style={{position: 'absolute', left: 230, top: 330, width: 130, height: 90, background: '#b98455', border: `6px solid ${C.ink}`}} />
          </Abs>
        );
      })}
      <Grade tint="rgba(255,140,60,0.2)" />
      <Lines lines={lines} color="#fff" />
    </Camera>
  );
};

// ───────── Bulan 1: harga ─────────
export const PriceGrid: React.FC<{items: {e: string; n: string; p: number; at: number; pct?: number}[]; lines: Line[]; note?: string}> = ({items, lines, note}) => {
  const sec = useSec();
  return (
    <Camera zoom={[1, 1.06]} pan={[0, -20]}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #ffe0b8, #f5f0e6)'}} />
      <div style={{position: 'absolute', left: 80, right: 80, top: 230, display: 'flex', gap: 28}}>
        {items.map((it) => {
          const up = ramp(sec, it.at, it.at + 1.5) * (it.pct ?? 0.11);
          return (
            <Pop key={it.n} at={it.at - 0.8} style={{flex: 1}}>
              <Card h={520}>
                <div style={{fontSize: 140}}>{it.e}</div>
                <Ink t={it.n} s={38} />
                <Ink t={`Rp${fmt(Math.round((it.p * (1 + up)) / 1000) * 1000)}`} s={40} c={up > 0 ? C.red : C.ink} />
                {up > 0 && <Ink t={`▲ ${fmt(up * 100)}%`} s={34} c={C.red} />}
              </Card>
            </Pop>
          );
        })}
      </div>
      <Lines lines={lines} />
      {note && (
        <Abs x={90} y={790}>
          <Txt text={note} size={26} color={useTheme().muted} />
        </Abs>
      )}
    </Camera>
  );
};

export const BigPrice: React.FC<{e: string; label: string; from: number; to: number; at: number; delta: string; lines: Line[]}> = ({e, label, from, to, at, delta, lines}) => {
  const sec = useSec();
  const v = interpolate(sec, [at, at + 2.5], [from, to], clamp);
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,75,62,0.25)" glowX="35%" />
      <Abs x={170} y={220}>
        <div style={{fontSize: 420, lineHeight: 1, transform: `rotate(${Math.sin(sec * 2) * 3}deg)`}}>{e}</div>
      </Abs>
      <Abs x={820} y={300}>
        <Card w={960} h={380}>
          <Ink t={label} s={40} c="#555" />
          <Ink t={`Rp${fmt(Math.round(v / 1000) * 1000)}`} s={96} c={sec > at ? C.red : C.ink} />
        </Card>
      </Abs>
      {sec > at + 2.5 && (
        <Pop at={at + 2.5} style={{position: 'absolute', left: 1200, top: 720}}>
          <div style={{background: C.red, border: `10px solid ${C.ink}`, borderRadius: 20, padding: '10px 34px', transform: 'rotate(-5deg)'}}>
            <Txt text={delta} size={76} />
          </div>
        </Pop>
      )}
      <Lines lines={lines} />
    </AbsoluteFill>
  );
};

// Efek domino: BBM → ongkos kirim → harga pangan.
export const Domino: React.FC<{items: {e: string; t: string}[]; startAt: number; lines: Line[]}> = ({items, startAt, lines}) => {
  const sec = useSec();
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,201,60,0.25)" />
      <div style={{position: 'absolute', left: 150, right: 150, top: 380, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
        {items.map((it, i) => {
          const fall = ramp(sec, startAt + i * 1.6, startAt + i * 1.6 + 0.5) * 32;
          return (
            <div key={it.t} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}>
              <div style={{width: 200, height: 380, background: fall > 1 ? C.red : '#fffaf0', border: `10px solid ${C.ink}`, borderRadius: 18, transform: `rotate(${fall}deg)`, transformOrigin: 'bottom right', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 110}}>
                {it.e}
              </div>
              <Txt text={it.t} size={40} />
            </div>
          );
        })}
      </div>
      <Lines lines={lines} />
    </AbsoluteFill>
  );
};

// ───────── Tahun 1 ─────────
export const QuietStreet: React.FC<{lines: Line[]; closeAt: number}> = ({lines, closeAt}) => {
  const sec = useSec();
  return (
    <Camera zoom={[1, 1.08]} pan={[0, -20]}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #c9c3d8, #e9e4ef)'}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 820, bottom: 0, background: '#a9a3b5'}} />
      <div style={{position: 'absolute', left: 80, right: 80, top: 260, display: 'flex', gap: 30}}>
        {['TOKO', 'WARUNG', 'KAFE', 'BENGKEL'].map((n, i) => {
          const shut = ramp(sec, closeAt + i * 1.2, closeAt + i * 1.2 + 0.8);
          return (
            <div key={n} style={{flex: 1, height: 560, background: '#d6b48a', border: `10px solid ${C.ink}`, position: 'relative', overflow: 'hidden'}}>
              <div style={{background: [C.red, C.blue, C.green, C.yellow][i], borderBottom: `8px solid ${C.ink}`, padding: 14, textAlign: 'center'}}>
                <Txt text={n} size={44} />
              </div>
              <div style={{position: 'absolute', left: 0, right: 0, top: 90, height: `${shut * 80}%`, background: 'repeating-linear-gradient(180deg, #8d8d99 0 26px, #6f6f7a 26px 32px)'}} />
            </div>
          );
        })}
      </div>
      <Abs x={1500 - ((sec * 60) % 1700)} y={540}>
        <Character pose="walk" face="sedih" jacket="#8a8f9c" rim="#ffffff" height={380} flip />
      </Abs>
      <Lines lines={lines} />
    </Camera>
  );
};

export const JobHunt: React.FC<{lines: Line[]}> = ({lines}) => (
  <AbsoluteFill>
    <Background glow="rgba(59,123,224,0.25)" />
    <Abs x={1360} y={170}>
      <Card w={420} h={300}>
        <Ink t="LOWONGAN" s={46} c={C.red} />
        <Ink t="1 posisi" s={70} />
      </Card>
    </Abs>
    {Array.from({length: 11}, (_, i) => (
      <Abs key={i} x={80 + i * 112} y={520 - (i % 3) * 12}>
        <Character pose={i % 4 === 0 ? 'armUp' : 'stand'} face={i % 2 ? 'serius' : 'sedih'} jacket={['#e8e4ee', C.blue, '#8a8f9c'][i % 3]} rim="#ffffff" height={340} />
      </Abs>
    ))}
    <Lines lines={lines} />
  </AbsoluteFill>
);

// ───────── Twist: pemenang ─────────
export const Ship: React.FC<{lines: Line[]}> = ({lines}) => {
  const sec = useSec();
  const x = interpolate(sec, [383, 400], [-200, 700], clamp);
  return (
    <Camera zoom={[1, 1.06]} pan={[0, -20]}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #8fd0ff 0%, #d6efff 55%, #2f7fc1 55%, #1f5f99 100%)'}} />
      <Abs x={x} y={330 + Math.sin(sec * 1.5) * 8}>
        <svg width={1000} height={400} style={{overflow: 'visible'}}>
          {['SAWIT', 'BATU BARA', 'TEKSTIL', 'FURNITUR'].map((t, i) => (
            <g key={t}>
              <rect x={140 + i * 180} y={70} width={170} height={110} fill={[C.green, '#444', C.blue, '#b98455'][i]} stroke={C.ink} strokeWidth={8} />
              <text x={225 + i * 180} y={138} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={26} fill="#fff">
                {t}
              </text>
            </g>
          ))}
          <path d="M60 180 H940 L860 330 H150 Z" fill="#c94a3a" stroke={C.ink} strokeWidth={10} />
          <rect x={860} y={0} width={70} height={180} fill="#e8e4ee" stroke={C.ink} strokeWidth={8} />
        </svg>
      </Abs>
      <Lines lines={lines} />
      <Lines lines={[{text: '$ masuk ke Indonesia', at: 392, size: 60, color: C.green}]} align="right" y={820} />
    </Camera>
  );
};

export const Revenue: React.FC<{at: number; lines: Line[]}> = ({at, lines}) => {
  const sec = useSec();
  const rate = interpolate(sec, [at, at + 3], [18000, 20000], clamp);
  return (
    <AbsoluteFill>
      <Background glow="rgba(62,207,107,0.3)" />
      <div style={{position: 'absolute', left: 120, right: 120, top: 260, display: 'flex', gap: 50, alignItems: 'center', justifyContent: 'center'}}>
        <Card w={480} h={380}>
          <Ink t="Penjualan" s={40} c="#555" />
          <Ink t="$1.000" s={110} c={C.green} />
        </Card>
        <Txt text="×" size={120} />
        <Card w={420} h={380}>
          <Ink t="Kurs" s={40} c="#555" />
          <Ink t={fmt(Math.round(rate))} s={96} />
        </Card>
        <Txt text="=" size={120} />
        <Card w={560} h={380} style={{boxShadow: `0 14px 0 ${C.ink}, 0 0 70px ${C.green}`}}>
          <Ink t="Diterima" s={40} c="#555" />
          <Ink t={`Rp${fmt(Math.round(rate / 1000))} juta`} s={96} c={C.green} />
        </Card>
      </div>
      <Lines lines={lines} align="center" />
    </AbsoluteFill>
  );
};

export const RemoteWorker: React.FC<{paidAt: number; lines: Line[]}> = ({paidAt, lines}) => {
  const sec = useSec();
  const paid = sec > paidAt;
  return (
    <>
      <Camera zoom={[1, 1.12]} pan={[0, -60]} origin="65% 50%">
        <NightRoom
          screen={
            <div style={{height: '100%', background: paid ? '#0f3d23' : '#141225', padding: 26, fontFamily: FONT, fontWeight: 900, color: '#fff'}}>
              <div style={{fontSize: 24, color: '#9aa3b8'}}>INVOICE #0427</div>
              <div style={{fontSize: 74, color: C.green}}>$1.500</div>
              <div style={{fontSize: 34, color: paid ? C.green : C.yellow}}>{paid ? '✓ PAID' : 'pending...'}</div>
            </div>
          }
        >
          <Chair x={845} y={525} />
          <div style={{position: 'absolute', left: 820, top: 300}}>
            <Character pose={paid ? 'cheer' : 'typing'} face={paid ? 'senang' : 'serius'} jacket={C.green} rim="#7fb2ff" height={620} />
          </div>
        </NightRoom>
        <Grade tint="rgba(60,200,120,0.15)" />
      </Camera>
      <Lines lines={lines} color="#fff" />
    </>
  );
};

export const Beach: React.FC<{lines: Line[]}> = ({lines}) => {
  const sec = useSec();
  return (
    <Camera zoom={[1, 1.08]} pan={[0, -30]}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #ffb27a 0%, #ffd59e 45%, #3d8fc9 55%, #2a6c9e 75%, #f1d6a0 75%)'}} />
      <AbsoluteFill style={{background: 'radial-gradient(circle at 55% 52%, rgba(255,240,180,0.95) 0 90px, transparent 260px)'}} />
      <svg width={1920} height={1080} style={{position: 'absolute'}}>
        {[160, 1720].map((x) => (
          <g key={x}>
            <path d={`M${x} 820 Q${x + 30} 600 ${x - 10} 380`} stroke="#3a2a35" strokeWidth={28} fill="none" />
            {[-60, -20, 20, 60, 100].map((a) => (
              <path key={a} d={`M${x - 10} 380 q${Math.cos((a * Math.PI) / 180) * 160} ${Math.sin((a * Math.PI) / 180) * 60 - 40} ${Math.cos((a * Math.PI) / 180) * 240} ${Math.sin((a * Math.PI) / 180) * 120}`} stroke="#3a2a35" strokeWidth={22} fill="none" strokeLinecap="round" />
            ))}
          </g>
        ))}
      </svg>
      {[520, 820, 1120].map((x, i) => (
        <Abs key={x} x={x} y={500}>
          <Character pose={Math.floor(sec + i) % 2 ? 'cheer' : 'stand'} face="senang" jacket={['#ffffff', '#ff7aa8', '#5ad1ff'][i]} rim="#ffb26b" height={420} />
        </Abs>
      ))}
      <Grade tint="rgba(255,140,60,0.15)" />
      <Lines lines={lines} color="#fff" />
    </Camera>
  );
};

export const Split: React.FC<{lines: Line[]; at: number}> = ({lines, at}) => {
  const sec = useSec();
  const k = ramp(sec, at, at + 0.8);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(90deg, #ffd6d2 0 50%, #d4f5df 50% 100%)'}} />
      <div style={{position: 'absolute', left: 955, top: 0, bottom: 0, width: 10, background: C.ink}} />
      <Abs x={260} y={230} style={{transform: `translateX(${(1 - k) * -400}px)`}}>
        <Character pose="headInHands" face="sedih" jacket={C.red} rim="#ffffff" height={560} />
      </Abs>
      <Abs x={1240} y={230} style={{transform: `translateX(${(1 - k) * 400}px)`}}>
        <Character pose="cheer" face="senang" jacket={C.green} rim="#ffffff" height={560} />
      </Abs>
      <Abs x={140} y={250}>
        <Txt text="PECUNDANG" size={70} color={C.red} />
      </Abs>
      <Abs x={1300} y={250}>
        <Txt text="PEMENANG" size={70} color={C.green} />
      </Abs>
      <Lines lines={lines} align="center" />
    </AbsoluteFill>
  );
};

export const Lessons: React.FC<{items: {t: string; sub: string; e: string; at: number}[]}> = ({items}) => {
  const sec = useSec();
  return (
    <AbsoluteFill>
      <Background glow="rgba(62,207,107,0.25)" />
      <Abs x={90} y={50}>
        <Txt text="4 PELAJARAN" size={90} color={C.yellow} />
      </Abs>
      <div style={{position: 'absolute', left: 80, right: 80, top: 220, display: 'flex', gap: 28}}>
        {items.map((r, i) => {
          const active = sec >= r.at && (i === items.length - 1 || sec < items[i + 1].at);
          return (
            <Pop key={r.t} at={r.at} style={{flex: 1}}>
              <Panel style={{padding: 30, minHeight: 540, background: active ? '#fffaf0' : '#a9a493', transform: `translateY(${active ? -18 : 0}px)`}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 100, color: active ? C.green : '#555'}}>{i + 1}</div>
                  <div style={{fontSize: 90}}>{r.e}</div>
                </div>
                <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 46, color: C.ink, lineHeight: 1.1}}>{r.t}</div>
                <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 28, color: '#555', marginTop: 18}}>{r.sub}</div>
              </Panel>
            </Pop>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const TwoDoors: React.FC<{a: Line; b: Line; lines: Line[]; comment?: Line}> = ({a, b, lines, comment}) => {
  const pa = usePop(a.at);
  const pb = usePop(b.at);
  const sec = useSec();
  return (
    <AbsoluteFill>
      <Background glow="rgba(59,123,224,0.25)" />
      <div style={{position: 'absolute', left: 260, right: 260, top: 260, display: 'flex', justifyContent: 'space-between'}}>
        {[
          {l: a, s: pa, c: C.red},
          {l: b, s: pb, c: C.green},
        ].map((d) => (
          <div key={d.l.text} style={{transform: `scale(${sec < d.l.at ? 0 : d.s})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}>
            <div style={{width: 360, height: 480, background: d.c, border: `12px solid ${C.ink}`, borderRadius: '180px 180px 12px 12px', boxShadow: `0 0 80px ${d.c}`}} />
            <Txt text={d.l.text} size={70} color={d.c} />
          </div>
        ))}
      </div>
      <Abs x={830} y={440}>
        <Character pose="stand" face="netral" jacket={C.blue} rim="#ffffff" height={420} />
      </Abs>
      <Lines lines={lines} align="center" y={60} />
      {comment && sec > comment.at && (
        <Abs x={0} y={160} style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          <Pop at={comment.at}>
            <Panel style={{padding: '14px 34px'}}>
              <span style={{fontFamily: FONT, fontWeight: 900, fontSize: 46, color: C.ink}}>💬 {comment.text}</span>
            </Panel>
          </Pop>
        </Abs>
      )}
    </AbsoluteFill>
  );
};

export const Outro: React.FC<{shareAt: number; subAt: number; byeAt: number}> = ({shareAt, subAt, byeAt}) => {
  const sec = useSec();
  const subscribed = sec > subAt + 2.2;
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,75,62,0.25)" />
      <Abs x={160} y={300}>
        <Character pose={sec > byeAt ? 'armUp' : 'point'} face="senang" jacket={C.red} rim="#ffffff" height={600} />
      </Abs>
      <div style={{position: 'absolute', left: 780, top: 220, display: 'flex', flexDirection: 'column', gap: 40}}>
        <Pop at={shareAt} style={{transformOrigin: 'left'}}>
          <Panel style={{padding: '20px 40px', display: 'inline-block'}}>
            <span style={{fontFamily: FONT, fontWeight: 900, fontSize: 56, color: C.ink}}>↗ BAGIKAN ke 1 orang</span>
          </Panel>
        </Pop>
        <Pop at={subAt} style={{transformOrigin: 'left'}}>
          <div style={{display: 'inline-block', padding: '24px 60px', borderRadius: 24, background: subscribed ? '#555' : '#e62117', border: `10px solid ${C.ink}`, transform: `scale(${sec > subAt + 2 && sec < subAt + 2.3 ? 0.9 : 1})`}}>
            <Txt text={subscribed ? 'SUBSCRIBED ✓' : 'SUBSCRIBE'} size={86} />
          </div>
        </Pop>
        <Pop at={byeAt - 6} style={{transformOrigin: 'left'}}>
          <Txt text="Bukan ajakan membeli/menjual aset. Lakukan riset sendiri." size={32} color={useTheme().muted} />
        </Pop>
      </div>
      {sec > byeAt && <Lines lines={[{text: 'SAMPAI JUMPA!', at: byeAt, size: 110, color: C.yellow}]} align="center" y={800} />}
      <div style={{display: 'none'}}>{frame}</div>
    </AbsoluteFill>
  );
};

export type {Face, Pose};
