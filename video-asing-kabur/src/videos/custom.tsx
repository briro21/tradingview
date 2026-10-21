import {AbsoluteFill, interpolate} from 'remotion';
import {Background} from '../components/Background';
import {Camera, Grade} from '../cinematic/Camera';
import {Character} from '../cinematic/Character';
import {Abs, Coin, Panel, Pop, Txt, useSec} from '../pasar-hijau/lib';
import {Card, fmt, Ink, Line, Lines, ramp} from '../rupiah/scenes';
import {C, FONT, useTheme} from '../theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// ───────── ARB ─────────

// Tangga harga harian: setiap hari turun maksimal ARB, antrean jual menumpuk.
export const ArbStairs: React.FC<{steps: {at: number; price: number}[]; lines: Line[]}> = ({steps, lines}) => {
  const sec = useSec();
  const shown = steps.filter((s) => sec >= s.at);
  const queue = shown.length * 9 + Math.floor((sec * 7) % 9);
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,75,62,0.22)" glowX="40%" glowY="60%" />
      <div style={{position: 'absolute', left: 120, top: 250, display: 'flex', alignItems: 'flex-start', gap: 18}}>
        {steps.map((s, i) => (
          <Pop key={s.price} at={s.at} style={{marginTop: i * 80}}>
            <div style={{width: 200, height: 120 + (steps.length - i) * 30, background: i === 0 ? C.blue : C.red, border: `8px solid ${C.ink}`, borderRadius: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <Txt text={fmt(s.price)} size={50} color="#fff" />
              <Txt text={i === 0 ? 'AWAL' : `HARI ${i}`} size={26} color="#fff" />
            </div>
          </Pop>
        ))}
      </div>
      <Abs x={1420} y={300}>
        <Card w={400} h={330}>
          <Ink t="ANTREAN JUAL" s={34} c="#555" />
          <Ink t={`${fmt(queue)}rb lot`} s={70} c={C.red} />
          <Ink t="Antrean beli: 0" s={34} c="#555" />
        </Card>
      </Abs>
      <Lines lines={lines} />
    </AbsoluteFill>
  );
};

// Lift turun pelan, pintu tidak mau terbuka.
export const Elevator: React.FC<{lines: Line[]; from: number}> = ({lines, from}) => {
  const sec = useSec();
  const floor = Math.max(1, 20 - Math.floor((sec - from) * 1.5));
  return (
    <Camera zoom={[1, 1.1]} pan={[0, 0]}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #3a3550, #1f1b2e)'}} />
      <Abs x={610} y={170}>
        <div style={{width: 700, height: 780, background: '#8d8a9c', border: `12px solid ${C.ink}`, position: 'relative'}}>
          <div style={{position: 'absolute', left: 250, top: -110, width: 200, height: 90, background: '#10141f', border: `8px solid ${C.ink}`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Txt text={`▼ ${floor}`} size={50} color={C.red} />
          </div>
          <div style={{position: 'absolute', left: 20, top: 20, bottom: 0, width: 320, background: '#b8b5c4', borderRight: `6px solid ${C.ink}`}} />
          <div style={{position: 'absolute', right: 20, top: 20, bottom: 0, width: 320, background: '#b8b5c4', borderLeft: `6px solid ${C.ink}`}} />
        </div>
      </Abs>
      <Abs x={1360} y={460}>
        <div style={{width: 90, height: 160, background: '#555', border: `6px solid ${C.ink}`, borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}}>
          <div style={{width: 50, height: 50, borderRadius: '50%', background: Math.floor(sec * 3) % 2 ? C.red : '#888', border: `5px solid ${C.ink}`}} />
          <Txt text="◀▶" size={30} />
        </div>
      </Abs>
      <Grade tint="rgba(80,60,160,0.25)" />
      <Lines lines={lines} color="#fff" />
    </Camera>
  );
};

// ARA vs ARB: batas naik vs batas turun.
export const Asymmetric: React.FC<{lines: Line[]; at: number; oldAt?: number}> = ({lines, at, oldAt}) => {
  const sec = useSec();
  const up = ramp(sec, at, at + 1.2);
  const dn = ramp(sec, at + 0.8, at + 2);
  const old = oldAt ? ramp(sec, oldAt, oldAt + 1) : 0;
  const H = 380;
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,201,60,0.22)" />
      <div style={{position: 'absolute', left: 0, top: 560, width: '100%', height: 8, background: useTheme().text}} />
      <div style={{position: 'absolute', left: 520, top: 560 - H * up, width: 300, height: H * up, background: C.green, border: `8px solid ${C.ink}`, borderRadius: '16px 16px 0 0'}} />
      <div style={{position: 'absolute', left: 1100, top: 560, width: 300, height: (H * 7 * dn) / 35, background: C.red, border: `8px solid ${C.ink}`, borderRadius: '0 0 16px 16px'}} />
      {old > 0 && <div style={{position: 'absolute', left: 1100, top: 560, width: 300, height: (H * 15 * old) / 35, border: `8px dashed ${C.red}`, borderRadius: '0 0 16px 16px', opacity: 0.7}} />}
      <Abs x={520} y={140}>
        <Txt text="ARA s/d +35%" size={56} color={C.green} />
      </Abs>
      <Abs x={1100} y={680}>
        <Txt text="ARB -7%" size={56} color={C.red} />
        {old > 0 && <Txt text="(dulu -15%)" size={40} color={useTheme().muted} />}
      </Abs>
      <Lines lines={lines} />
    </AbsoluteFill>
  );
};

// ───────── Emas ─────────

export const GoldBars: React.FC<{n?: number; size?: number}> = ({n = 6, size = 1}) => (
  <div style={{position: 'relative', width: 520 * size, height: 300 * size}}>
    {Array.from({length: n}, (_, i) => {
      const row = i < 3 ? 0 : i < 5 ? 1 : 2;
      const col = i < 3 ? i : i < 5 ? i - 3 + 0.5 : 1;
      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: col * 160 * size,
            top: (200 - row * 90) * size,
            width: 170 * size,
            height: 90 * size,
            background: 'linear-gradient(180deg, #ffe58a, #e0a52a)',
            border: `${7 * size}px solid ${C.ink}`,
            clipPath: 'polygon(12% 0, 88% 0, 100% 100%, 0 100%)',
          }}
        />
      );
    })}
  </div>
);

// Papan harga toko emas.
export const GoldBoard: React.FC<{price: number; to?: number; at?: number; buyback?: number; spreadAt?: number; lines: Line[]; caption?: string}> = ({price, to, at = 0, buyback, spreadAt, lines, caption}) => {
  const sec = useSec();
  const v = to ? interpolate(sec, [at, at + 2.5], [price, to], clamp) : price;
  const showSpread = spreadAt !== undefined && sec > spreadAt;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #3a2a1a, #6b4a2a)'}} />
      <AbsoluteFill style={{background: 'radial-gradient(circle at 70% 60%, rgba(255,215,120,0.45), transparent 45%)'}} />
      <Abs x={140} y={230}>
        <Panel style={{width: 860, padding: '30px 44px', background: '#10141f'}}>
          <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 34, color: '#ffd77a'}}>EMAS 1 GRAM</div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 16}}>
            <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 40, color: '#9aa3b8'}}>HARGA BELI</div>
            <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 64, color: to && sec > at ? C.red : '#fff'}}>Rp{fmt(Math.round(v / 1000) * 1000)}</div>
          </div>
          {buyback && (
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 10}}>
              <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 40, color: '#9aa3b8'}}>BUYBACK</div>
              <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 64, color: showSpread ? C.yellow : '#fff'}}>Rp{fmt(buyback)}</div>
            </div>
          )}
          {buyback && showSpread && (
            <Pop at={spreadAt!} style={{marginTop: 18, transformOrigin: 'left'}}>
              <div style={{background: C.red, border: `6px solid ${C.ink}`, borderRadius: 14, padding: '8px 20px', display: 'inline-block'}}>
                <Txt text={`SPREAD Rp${fmt(price - buyback)} (±${fmt(((price - buyback) / price) * 100)}%)`} size={42} />
              </div>
            </Pop>
          )}
        </Panel>
      </Abs>
      <Abs x={1180} y={420}>
        <GoldBars />
      </Abs>
      <Lines lines={lines} color="#fff" />
      {caption && (
        <Abs x={140} y={950}>
          <Txt text={caption} size={24} color="#d8c7a6" />
        </Abs>
      )}
    </AbsoluteFill>
  );
};

// Dua mesin: harga emas dunia × kurs rupiah.
export const Engines: React.FC<{aAt: number; bAt: number; lines: Line[]}> = ({aAt, bAt, lines}) => {
  const sec = useSec();
  const gear = (on: boolean, color: string, label: string, sub: string) => (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}>
      <svg width={320} height={320} viewBox="-160 -160 320 320" style={{transform: `rotate(${on ? sec * 90 : 0}deg)`}}>
        {Array.from({length: 10}, (_, i) => (
          <rect key={i} x={-26} y={-158} width={52} height={60} rx={8} fill={on ? color : '#888'} stroke={C.ink} strokeWidth={8} transform={`rotate(${i * 36})`} />
        ))}
        <circle r={115} fill={on ? color : '#888'} stroke={C.ink} strokeWidth={10} />
        <circle r={40} fill="#f5f0e6" stroke={C.ink} strokeWidth={10} />
      </svg>
      <Txt text={label} size={52} />
      <Txt text={sub} size={32} color={useTheme().muted} />
    </div>
  );
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,201,60,0.3)" />
      <div style={{position: 'absolute', left: 0, right: 0, top: 260, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 80}}>
        {gear(sec > aAt, '#ffc93c', '① HARGA DUNIA', 'US$ per troy ounce')}
        <Txt text="×" size={120} />
        {gear(sec > bAt, '#3ecf6b', '② KURS RUPIAH', 'Rp per dolar')}
      </div>
      <Lines lines={lines} align="center" />
    </AbsoluteFill>
  );
};

// ───────── MSCI ─────────

// Tangga klasifikasi pasar, penanda negara turun kelas.
export const ClassLadder: React.FC<{levels: {t: string; ex: string; at: number}[]; markerAt?: number; dropAt?: number; lines: Line[]}> = ({levels, markerAt = 0, dropAt, lines}) => {
  const sec = useSec();
  const from = 1;
  const to = levels.length - 1;
  const pos = dropAt ? interpolate(sec, [dropAt, dropAt + 1.5], [from, to], clamp) : from;
  return (
    <AbsoluteFill>
      <Background glow="rgba(59,123,224,0.25)" />
      <div style={{position: 'absolute', left: 520, top: 210, display: 'flex', flexDirection: 'column', gap: 26}}>
        {levels.map((l, i) => (
          <Pop key={l.t} at={l.at} style={{transformOrigin: 'left'}}>
            <div style={{width: 880, height: 140, background: ['#3b7be0', '#3ecf6b', '#ffc93c', '#ff4b3e'][i], border: `8px solid ${C.ink}`, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 36px'}}>
              <Txt text={l.t} size={54} />
              <span style={{fontFamily: FONT, fontWeight: 900, fontSize: 30, color: C.ink}}>{l.ex}</span>
            </div>
          </Pop>
        ))}
      </div>
      {sec > markerAt && (
        <Abs x={280} y={210 + pos * 166 + 10}>
          <div style={{background: '#fff', border: `8px solid ${C.ink}`, borderRadius: 999, padding: '14px 28px', fontFamily: FONT, fontWeight: 900, fontSize: 44, boxShadow: `0 0 40px ${C.red}`}}>🇮🇩 →</div>
        </Abs>
      )}
      <Lines lines={lines} />
    </AbsoluteFill>
  );
};

// Robot dana pasif: membawa daftar, mencoret Indonesia, lalu menjual.
export const Robot: React.FC<{strikeAt: number; sellAt?: number; lines: Line[]}> = ({strikeAt, sellAt, lines}) => {
  const sec = useSec();
  const struck = ramp(sec, strikeAt, strikeAt + 0.6);
  const bob = Math.sin(sec * 4) * 6;
  const list = ['India', 'Brasil', 'Indonesia', 'Thailand', 'Meksiko'];
  return (
    <AbsoluteFill>
      <Background glow="rgba(123,92,255,0.25)" />
      <Abs x={200} y={260 + bob}>
        <svg width={380} height={520} viewBox="0 0 380 520">
          <rect x={90} y={10} width={200} height={160} rx={30} fill="#c9d3e6" stroke={C.ink} strokeWidth={10} />
          <circle cx={150} cy={90} r={22} fill={sec > strikeAt ? C.red : '#5aa0ff'} stroke={C.ink} strokeWidth={6} />
          <circle cx={230} cy={90} r={22} fill={sec > strikeAt ? C.red : '#5aa0ff'} stroke={C.ink} strokeWidth={6} />
          <line x1={190} y1={10} x2={190} y2={-30} stroke={C.ink} strokeWidth={8} />
          <rect x={60} y={190} width={260} height={230} rx={24} fill="#aab6cc" stroke={C.ink} strokeWidth={10} />
          <text x={190} y={320} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={54} fill={C.ink}>ETF</text>
          <rect x={100} y={420} width={50} height={90} fill="#8894aa" stroke={C.ink} strokeWidth={8} />
          <rect x={230} y={420} width={50} height={90} fill="#8894aa" stroke={C.ink} strokeWidth={8} />
        </svg>
      </Abs>
      <Abs x={700} y={250}>
        <Panel style={{width: 520, padding: '24px 40px'}}>
          <Ink t="DAFTAR MSCI EM" s={36} c="#555" />
          {list.map((n) => (
            <div key={n} style={{position: 'relative', fontFamily: FONT, fontWeight: 900, fontSize: 52, color: C.ink, padding: '6px 0'}}>
              ✓ {n}
              {n === 'Indonesia' && struck > 0 && <div style={{position: 'absolute', left: 0, top: '50%', height: 12, width: `${struck * 100}%`, background: C.red}} />}
            </div>
          ))}
        </Panel>
      </Abs>
      {sellAt !== undefined &&
        sec > sellAt &&
        Array.from({length: 6}, (_, i) => {
          const t = ((sec - sellAt) * 0.9 + i / 6) % 1;
          return (
            <Abs key={i} x={1300 + t * 520} y={420 + Math.sin(t * 6) * 40 + i * 30}>
              <Coin size={70} label="🇮🇩" />
            </Abs>
          );
        })}
      <Lines lines={lines} />
    </AbsoluteFill>
  );
};

// Surat peninjauan keanggotaan klub.
export const Letter: React.FC<{openAt: number; lines: Line[]}> = ({openAt, lines}) => {
  const sec = useSec();
  const open = ramp(sec, openAt, openAt + 1);
  return (
    <Camera zoom={[1, 1.1]} pan={[0, -20]}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #1d1a2e, #3a2f5e)'}} />
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 55%, rgba(255,215,120,0.35), transparent 50%)'}} />
      <Abs x={560} y={300}>
        <div style={{position: 'relative', width: 800, height: 520}}>
          <div style={{position: 'absolute', left: 60, right: 60, top: 40 - open * 260, height: 460, background: '#fffaf0', border: `8px solid ${C.ink}`, padding: 40}}>
            <Ink t="KLUB EMERGING MARKET" s={36} c="#555" />
            <Ink t="Keanggotaan Indonesia" s={50} />
            <Ink t="SEDANG DITINJAU" s={62} c={C.red} />
          </div>
          <div style={{position: 'absolute', inset: 0, top: 180, background: '#d9b778', border: `8px solid ${C.ink}`}} />
          <div style={{position: 'absolute', left: 0, right: 0, top: 180, height: 0, borderLeft: '400px solid transparent', borderRight: '400px solid transparent', borderTop: `${200 * (1 - open)}px solid #c9a564`}} />
        </div>
      </Abs>
      <Grade tint="rgba(120,60,200,0.2)" />
      <Lines lines={lines} color="#fff" />
    </Camera>
  );
};

// Tiga jenis pemain yang ditinggal/terpengaruh: kartu dengan karakter.
export const People: React.FC<{items: {t: string; face: 'senang' | 'sedih' | 'kaget' | 'serius'; jacket: string; at: number}[]; lines: Line[]}> = ({items, lines}) => (
  <AbsoluteFill>
    <Background glow="rgba(255,201,60,0.25)" />
    <div style={{position: 'absolute', left: 100, right: 100, top: 260, display: 'flex', justifyContent: 'space-around'}}>
      {items.map((p) => (
        <Pop key={p.t} at={p.at}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
            <Character pose={p.face === 'senang' ? 'cheer' : p.face === 'sedih' ? 'headInHands' : 'stand'} face={p.face} jacket={p.jacket} rim="#ffffff" height={480} />
            <Txt text={p.t} size={44} />
          </div>
        </Pop>
      ))}
    </div>
    <Lines lines={lines} align="center" />
  </AbsoluteFill>
);
