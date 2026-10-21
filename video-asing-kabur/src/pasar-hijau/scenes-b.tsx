import {AbsoluteFill, interpolate} from 'remotion';
import {Background} from '../components/Background';
import {Stickman} from '../components/Stickman';
import {C, FONT} from '../theme';
import {Abs, Panel, Pop, Txt, usePop, useSec} from './lib';

type Line = {text: string; at: number; color?: string; size?: number};
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const Labels: React.FC<{lines: Line[]; x?: number; y?: number; right?: boolean; max?: number}> = ({lines, x = 100, y = 60, right, max = 99}) => {
  const sec = useSec();
  const shown = lines.filter((l) => sec >= l.at).slice(-max);
  return (
  <div style={{position: 'absolute', [right ? 'right' : 'left']: x, top: y, display: 'flex', flexDirection: 'column', gap: 14, alignItems: right ? 'flex-end' : 'flex-start'}}>
    {shown.map((l) => (
      <Pop key={l.text} at={l.at} style={{transformOrigin: right ? 'right' : 'left'}}>
        <Txt text={l.text} size={l.size ?? 80} color={l.color} />
      </Pop>
    ))}
  </div>
  );
};

export const Footprints: React.FC<{lines: Line[]}> = ({lines}) => {
  const sec = useSec();
  return (
    <AbsoluteFill>
      <Background glow="rgba(59,123,224,0.3)" />
      {Array.from({length: 8}, (_, i) => {
        const appear = 175.8 + i * 0.6;
        return sec > appear ? (
          <Abs key={i} x={200 + i * 190} y={700 - (i % 2) * 70} style={{fontSize: 90, opacity: interpolate(sec - appear, [0, 0.3], [0, 1], clamp)}}>
            👣
          </Abs>
        ) : null;
      })}
      <Abs x={1500} y={250}>
        <Stickman mood="serius" size={330} shirt="#2a2f3d" />
      </Abs>
      <Labels lines={lines} />
    </AbsoluteFill>
  );
};

// Order book: kolom offer menebal menjadi "tembok", lalu bid menyerap diam-diam.
export const OrderBook: React.FC<{wallAt: number; absorbAt: number; lines: Line[]}> = ({wallAt, absorbAt, lines}) => {
  const sec = useSec();
  const wall = interpolate(sec, [wallAt - 6, wallAt], [0.4, 1], clamp);
  const absorb = interpolate(sec, [absorbAt, absorbAt + 6], [0, 1], clamp);
  const prices = [9025, 9000, 8975, 8950, 8925];
  const bids = [1200, 980, 1500, 2100, 1800].map((v, i) => Math.round(v * (1 + absorb * (3 + i))));
  const offers = [52000, 61000, 48000, 75000, 58000].map((v) => Math.round(v * wall));
  const cell: React.CSSProperties = {fontFamily: FONT, fontWeight: 900, fontSize: 40, padding: '14px 26px', textAlign: 'right'};
  return (
    <AbsoluteFill>
      <Background glow={absorb > 0 ? 'rgba(62,207,107,0.3)' : 'rgba(255,75,62,0.3)'} glowX="35%" glowY="55%" />
      <Abs x={100} y={230}>
        <Panel style={{padding: 20, background: '#141a2b'}}>
          <table style={{borderCollapse: 'collapse', color: '#fff'}}>
            <thead>
              <tr>
                {['LOT BID', 'BID', 'OFFER', 'LOT OFFER'].map((h) => (
                  <th key={h} style={{...cell, fontSize: 30, color: '#9aa3b8'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {prices.map((p, i) => (
                <tr key={p}>
                  <td style={{...cell, color: C.green, background: `rgba(62,207,107,${absorb * 0.35})`}}>{bids[i].toLocaleString('id-ID')}</td>
                  <td style={{...cell, color: C.green}}>{p.toLocaleString('id-ID')}</td>
                  <td style={{...cell, color: C.red}}>{(p + 25).toLocaleString('id-ID')}</td>
                  <td style={{...cell, color: C.red, background: `rgba(255,75,62,${wall * 0.45})`, width: 220}}>{offers[i].toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </Abs>
      <Labels lines={lines} right x={70} y={230} max={2} />
    </AbsoluteFill>
  );
};

export const Knife: React.FC<{lines: Line[]}> = ({lines}) => {
  const sec = useSec();
  const y = ((sec * 520) % 1100) - 300;
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,75,62,0.35)" glowX="65%" />
      <Abs x={1180} y={y} style={{transform: `rotate(${sec * 200}deg)`, fontSize: 220}}>
        🔪
      </Abs>
      <Abs x={1050} y={430}>
        <Stickman mood="kaget" size={330} />
      </Abs>
      <Labels lines={lines} />
    </AbsoluteFill>
  );
};

type Candle = [number, number]; // [open, close]
const CandleChart: React.FC<{candles: Candle[]; visible: number; w?: number; h?: number; min: number; max: number}> = ({candles, visible, w = 1100, h = 520, min, max}) => {
  const step = w / candles.length;
  const y = (v: number) => h - ((v - min) / (max - min)) * h;
  return (
    <svg width={w} height={h} style={{overflow: 'visible'}}>
      {candles.slice(0, Math.floor(visible)).map(([o, c], i) => {
        const up = c >= o;
        const top = y(Math.max(o, c));
        return (
          <g key={i}>
            <line x1={i * step + step / 2} x2={i * step + step / 2} y1={top - 25} y2={y(Math.min(o, c)) + 25} stroke={C.ink} strokeWidth={6} />
            <rect x={i * step + step * 0.18} y={top} width={step * 0.64} height={Math.max(8, Math.abs(y(o) - y(c)))} fill={up ? C.green : C.red} stroke={C.ink} strokeWidth={6} rx={4} />
          </g>
        );
      })}
    </svg>
  );
};

export const DeadCat: React.FC<{bounceAt: number; trapAt: number; lines: Line[]}> = ({bounceAt, trapAt, lines}) => {
  const sec = useSec();
  const candles: Candle[] = [[100, 94], [94, 89], [89, 85], [85, 80], [80, 76], [76, 77], [77, 70], [70, 63], [63, 58]];
  const visible = sec < bounceAt ? interpolate(sec, [bounceAt - 5, bounceAt - 0.5], [1, 5], clamp) : sec < trapAt ? 6 : interpolate(sec, [trapAt, trapAt + 3], [6, 9], clamp);
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,75,62,0.3)" glowX="45%" glowY="60%" />
      <Abs x={110} y={260}>
        <CandleChart candles={candles} visible={visible} min={52} max={104} />
      </Abs>
      {sec > bounceAt && (
        <Pop at={bounceAt} style={{position: 'absolute', left: 640, top: 370}}>
          <Txt text="+1% REVERSAL?!" size={56} color={C.green} />
        </Pop>
      )}
      {sec > trapAt + 2 && (
        <Pop at={trapAt + 2} style={{position: 'absolute', left: 560, top: 520, transform: 'rotate(-10deg)'}}>
          <div style={{border: `12px solid ${C.red}`, borderRadius: 20, padding: '10px 30px'}}>
            <Txt text="BULL TRAP" size={110} color={C.red} />
          </div>
        </Pop>
      )}
      <Labels lines={lines} right x={70} y={70} />
    </AbsoluteFill>
  );
};

// Harga membuat lower low, MACD membuat higher low.
export const Divergence: React.FC<{priceAt: number; macdAt: number; lines: Line[]}> = ({priceAt, macdAt, lines}) => {
  const sec = useSec();
  const draw = (at: number) => interpolate(sec, [at, at + 2.5], [0, 1], clamp);
  const price = 'M0 60 L150 200 L260 140 L420 330 L560 240 L720 400';
  const macd = 'M0 120 L150 160 L260 60 L420 230 L560 110 L720 170';
  return (
    <AbsoluteFill>
      <Background glow="rgba(62,207,107,0.3)" glowX="40%" />
      <Abs x={120} y={190}>
        <Panel style={{padding: 30, background: '#141a2b'}}>
          <svg width={760} height={620} style={{overflow: 'visible'}}>
            <text x={0} y={-4} fontFamily={FONT} fontWeight={900} fontSize={30} fill="#9aa3b8">HARGA</text>
            <path d={price} stroke="#fff" strokeWidth={8} fill="none" />
            <line x1={420} y1={330} x2={720} y2={400} stroke={C.red} strokeWidth={10} strokeDasharray="20 12" pathLength={1} strokeDashoffset={0} opacity={draw(priceAt)} />
            <g transform="translate(0 420)">
              <text x={0} y={-10} fontFamily={FONT} fontWeight={900} fontSize={30} fill="#9aa3b8">MACD</text>
              <path d={macd} transform="scale(1 0.8)" stroke={C.yellow} strokeWidth={8} fill="none" />
              <line x1={420} y1={184} x2={720} y2={136} stroke={C.green} strokeWidth={10} strokeDasharray="20 12" opacity={draw(macdAt)} />
            </g>
          </svg>
        </Panel>
      </Abs>
      <Labels lines={lines} right x={70} y={150} />
    </AbsoluteFill>
  );
};

export const Ichimoku: React.FC<{breakAt: number; lines: Line[]}> = ({breakAt, lines}) => {
  const sec = useSec();
  const n = 14;
  const brk = interpolate(sec, [breakAt, breakAt + 3], [0, 1], clamp);
  const candles: Candle[] = Array.from({length: n}, (_, i) => {
    const base = 32 - i * 1.2 + Math.sin(i) * 4 + (i > 10 ? brk * (i - 10) * 14 : 0);
    return i % 3 === 1 ? [base - 4, base + 2] : [base + 3, base - 3];
  });
  return (
    <AbsoluteFill>
      <Background glow="rgba(123,92,255,0.3)" glowX="40%" />
      <Abs x={110} y={240}>
        <svg width={1100} height={520} style={{position: 'absolute', overflow: 'visible'}}>
          <path d="M0 40 C300 80 600 60 1100 150 L1100 330 C600 250 300 260 0 220 Z" fill="rgba(123,92,255,0.45)" stroke="#7b5cff" strokeWidth={6} />
          <text x={760} y={170} fontFamily={FONT} fontWeight={900} fontSize={44} fill="#fff">AWAN KUMO</text>
        </svg>
        <CandleChart candles={candles} visible={interpolate(sec, [306.2, 310], [1, n], clamp)} min={0} max={100} />
      </Abs>
      <Labels lines={lines} right x={70} y={70} />
    </AbsoluteFill>
  );
};

export const Vwap: React.FC<{lines: Line[]}> = ({lines}) => {
  const sec = useSec();
  const pts = Array.from({length: 60}, (_, i) => {
    const x = i * 20;
    const y = 300 + Math.sin(i / 3) * 70 + (i > 25 ? 40 : 0) + Math.sin(i * 1.7) * 18;
    return `${i ? 'L' : 'M'}${x} ${Math.max(y, 250)}`;
  });
  const shown = interpolate(sec, [327.8, 334], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,201,60,0.25)" glowX="40%" />
      <Abs x={110} y={300}>
        <svg width={1200} height={500} style={{overflow: 'visible'}}>
          <line x1={0} y1={230} x2={1200} y2={230} stroke={C.yellow} strokeWidth={10} strokeDasharray="30 14" />
          <text x={1000} y={210} fontFamily={FONT} fontWeight={900} fontSize={44} fill={C.yellow}>VWAP</text>
          <path d={pts.join(' ')} stroke="#fff" strokeWidth={8} fill="none" pathLength={1} strokeDasharray={`${shown} 1`} />
        </svg>
      </Abs>
      <Labels lines={lines} />
    </AbsoluteFill>
  );
};

const CODE = [
  'import pandas as pd',
  '',
  "df = pd.read_csv('ihsg_crash_history.csv')",
  'df = df.dropna()',
  '',
  "pulih = df.groupby('sektor')['hari_pulih']",
  'print(pulih.mean().sort_values())',
];

export const Code: React.FC<{start: number; resultAt: number; lines: Line[]}> = ({start, resultAt, lines}) => {
  const sec = useSec();
  const chars = Math.floor((sec - start - 1) * 22);
  let left = chars;
  const res = interpolate(sec, [resultAt, resultAt + 2], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <Background glow="rgba(59,123,224,0.3)" glowX="35%" />
      <Abs x={90} y={200}>
        <div style={{width: 1000, background: '#10141f', border: `8px solid ${C.ink}`, borderRadius: 24, padding: 36, fontFamily: 'monospace', fontSize: 34, color: '#d6e2ff', lineHeight: 1.5, minHeight: 440}}>
          {CODE.map((l, i) => {
            const t = l.slice(0, Math.max(0, left));
            left -= l.length + 1;
            return <div key={i} style={{minHeight: 51}}>{t}</div>;
          })}
        </div>
      </Abs>
      {res > 0 && (
        <Abs x={1180} y={260}>
          {[['ENERGI', 0.55], ['PERBANKAN', 0.75], ['KONSUMER', 0.9]].map(([s, v]) => (
            <div key={s as string} style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 26}}>
              <div style={{width: 230}}>
                <Txt text={s as string} size={40} />
              </div>
              <div style={{height: 50, width: 360 * (v as number) * res, background: C.green, border: `6px solid ${C.ink}`, borderRadius: 10}} />
            </div>
          ))}
          <Txt text="(ilustrasi)" size={28} color="#9aa3b8" />
        </Abs>
      )}
      <Labels lines={lines} y={50} />
    </AbsoluteFill>
  );
};

export const Screener: React.FC<{items: Line[]; title: Line}> = ({items, title}) => (
  <AbsoluteFill>
    <Background glow="rgba(62,207,107,0.25)" glowX="70%" />
    <Pop at={title.at} style={{position: 'absolute', left: 100, top: 60, transformOrigin: 'left'}}>
      <Txt text={title.text} size={100} />
    </Pop>
    <Abs x={110} y={240}>
      <Panel style={{padding: '30px 44px', width: 1100}}>
        {items.map((it) => (
          <Pop key={it.text} at={it.at} style={{transformOrigin: 'left', display: 'flex', gap: 24, alignItems: 'center', padding: '14px 0'}}>
            <div style={{width: 60, height: 60, borderRadius: 14, background: it.color ?? C.green, border: `6px solid ${C.ink}`}} />
            <span style={{fontFamily: FONT, fontWeight: 900, fontSize: 50, color: C.ink}}>{it.text}</span>
          </Pop>
        ))}
      </Panel>
    </Abs>
  </AbsoluteFill>
);

export const Fibonacci: React.FC<{goldenAt: number; lines: Line[]}> = ({goldenAt, lines}) => {
  const sec = useSec();
  const levels = [0, 23.6, 38.2, 50, 61.8, 78.6, 100];
  const t = interpolate(sec, [384, 392], [0, 1], clamp);
  const priceY = 40 + t * 0.618 * 520;
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,201,60,0.3)" glowX="40%" glowY="65%" />
      <Abs x={110} y={230}>
        <svg width={1150} height={560} style={{overflow: 'visible'}}>
          {levels.map((l) => {
            const y = 40 + (l / 100) * 520;
            const gold = l === 61.8;
            return (
              <g key={l} opacity={gold || sec < goldenAt ? 1 : 0.35}>
                <line x1={0} x2={1150} y1={y} y2={y} stroke={gold ? C.yellow : '#9fb3e0'} strokeWidth={gold ? 10 : 4} />
                <text x={1160} y={y + 14} fontFamily={FONT} fontWeight={900} fontSize={gold ? 44 : 32} fill={gold ? C.yellow : '#9fb3e0'}>{`${l}%`.replace('.', ',')}</text>
              </g>
            );
          })}
          <path d={`M0 40 L${300 + t * 500} ${priceY}`} stroke="#fff" strokeWidth={10} />
          <circle cx={300 + t * 500} cy={priceY} r={18} fill={C.red} stroke={C.ink} strokeWidth={5} />
        </svg>
      </Abs>
      <Labels lines={lines} y={40} />
    </AbsoluteFill>
  );
};

export const CorpAction: React.FC<{floorAt: number; lines: Line[]}> = ({floorAt, lines}) => {
  const sec = useSec();
  const t = interpolate(sec, [399, 410], [0, 1], clamp);
  const idx = Array.from({length: 40}, (_, i) => `${i ? 'L' : 'M'}${i * 28} ${80 + (i / 39) * 380 * t + Math.sin(i) * 14}`).join(' ');
  const stock = Array.from({length: 40}, (_, i) => `${i ? 'L' : 'M'}${i * 28} ${200 + Math.sin(i * 0.9) * 22}`).join(' ');
  return (
    <AbsoluteFill>
      <Background glow="rgba(62,207,107,0.25)" glowX="40%" glowY="55%" />
      <Abs x={110} y={300}>
        <svg width={1100} height={500} style={{overflow: 'visible'}}>
          <path d={idx} stroke={C.red} strokeWidth={8} fill="none" />
          <path d={stock} stroke={C.green} strokeWidth={10} fill="none" />
          <text x={1110} y={90 + 380 * t} fontFamily={FONT} fontWeight={900} fontSize={36} fill={C.red}>INDEKS</text>
          <text x={1110} y={210} fontFamily={FONT} fontWeight={900} fontSize={36} fill={C.green}>SAHAM TO</text>
          {sec > floorAt && (
            <>
              <rect x={0} y={232} width={1100 * interpolate(sec - floorAt, [0, 1], [0, 1], clamp)} height={22} fill={C.yellow} stroke={C.ink} strokeWidth={5} />
              <text x={20} y={300} fontFamily={FONT} fontWeight={900} fontSize={40} fill={C.yellow}>HARGA LANTAI 🛡️</text>
            </>
          )}
        </svg>
      </Abs>
      <Labels lines={lines} y={50} />
    </AbsoluteFill>
  );
};

export const Rules: React.FC<{rules: (Line & {sub: string})[]}> = ({rules}) => {
  const sec = useSec();
  return (
    <AbsoluteFill>
      <Background glow="rgba(62,207,107,0.25)" />
      <Abs x={100} y={50}>
        <Txt text="3 ATURAN SURVIVAL" size={90} color={C.yellow} />
      </Abs>
      <div style={{position: 'absolute', left: 100, right: 100, top: 220, display: 'flex', gap: 40}}>
        {rules.map((r, i) => {
          const active = sec >= r.at && (i === rules.length - 1 || sec < rules[i + 1].at);
          return (
            <Pop key={r.text} at={r.at} style={{flex: 1}}>
              <Panel style={{padding: 34, minHeight: 470, background: active ? '#f6efdd' : '#8b8778', transform: `translateY(${active ? -16 : 0}px)`}}>
                <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 120, color: active ? C.green : '#555'}}>{i + 1}</div>
                <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 54, color: C.ink, lineHeight: 1.1}}>{r.text}</div>
                <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 32, color: '#555', marginTop: 20}}>{r.sub}</div>
              </Panel>
            </Pop>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const Outro: React.FC<{at: number}> = ({at}) => {
  const sec = useSec();
  const click = sec > at + 3 && sec < at + 3.4;
  const subscribed = sec > at + 3.2;
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <Background glow="rgba(255,75,62,0.3)" />
      <Abs x={160} y={300}>
        <Stickman mood="netral" size={400} />
      </Abs>
      <Pop at={at + 1} style={{position: 'absolute', left: 820, top: 330}}>
        <div style={{padding: '30px 70px', borderRadius: 24, background: subscribed ? '#555' : '#e62117', border: `10px solid ${C.ink}`, transform: `scale(${click ? 0.9 : 1})`}}>
          <Txt text={subscribed ? 'SUBSCRIBED ✓' : 'SUBSCRIBE'} size={90} />
        </div>
      </Pop>
      <Abs x={820} y={150}>
        <Txt text="TERIMA KASIH!" size={90} color={C.yellow} />
      </Abs>
      <Abs x={820} y={580}>
        <Txt text="Bukan ajakan jual/beli saham. Lakukan riset sendiri." size={34} color="#c9cfdb" />
      </Abs>
    </AbsoluteFill>
  );
};
