import {AbsoluteFill, interpolate} from 'remotion';
import {Background} from '../components/Background';
import {Camera, Grade} from '../cinematic/Camera';
import {Character} from '../cinematic/Character';
import {Abs, Coin, Panel, Pop, Txt, useSec} from '../pasar-hijau/lib';
import {Ink, Line, Lines, ramp} from '../rupiah/scenes';
import {C, FONT, useTheme} from '../theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// ───────── Danantara ─────────

// Atap (grafik) melengkung jatuh, lalu tiang raksasa naik menahannya.
export const Pillar: React.FC<{riseAt: number; label?: string; lines: Line[]}> = ({riseAt, label = 'DANANTARA', lines}) => {
  const sec = useSec();
  const rise = ramp(sec, riseAt, riseAt + 1.5);
  const sag = 220 * (1 - rise * 0.8) + Math.sin(sec * 3) * 4;
  return (
    <AbsoluteFill>
      <Background glow="rgba(62,207,107,0.22)" glowY="65%" />
      <svg width={1920} height={1080} style={{position: 'absolute'}}>
        <path d={`M200 330 Q960 ${330 + sag * 2} 1720 330`} stroke={C.ink} strokeWidth={34} fill="none" strokeLinecap="round" />
        <path d={`M200 330 Q960 ${330 + sag * 2} 1720 330`} stroke={rise > 0.5 ? C.green : C.red} strokeWidth={20} fill="none" strokeLinecap="round" />
        <rect x={180} y={330} width={40} height={600} fill="#6b5a48" stroke={C.ink} strokeWidth={8} />
        <rect x={1700} y={330} width={40} height={600} fill="#6b5a48" stroke={C.ink} strokeWidth={8} />
        <line x1={0} y1={930} x2={1920} y2={930} stroke={C.ink} strokeWidth={10} />
      </svg>
      <div style={{position: 'absolute', left: 880, top: 930 - (930 - (330 + sag)) * rise, width: 160, height: (930 - (330 + sag)) * rise, background: 'linear-gradient(90deg, #d9d3c4, #fffaf0, #d9d3c4)', border: rise > 0 ? `10px solid ${C.ink}` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
        <div style={{transform: 'rotate(-90deg)', whiteSpace: 'nowrap'}}>
          <Txt text={label} size={48} color={C.ink} style={{WebkitTextStroke: 0, textShadow: 'none'}} />
        </div>
      </div>
      <Abs x={150} y={340}>
        <Txt text="IHSG" size={44} color={useTheme().muted} />
      </Abs>
      <Lines lines={lines} align="center" y={50} />
    </AbsoluteFill>
  );
};

// Batang kepemilikan saham bergeser dari asing ke negara/lokal.
export const Ownership: React.FC<{at: number; from: number; to: number; lines: Line[]; leftLabel?: string; rightLabel?: string}> = ({at, from, to, lines, leftLabel = 'ASING', rightLabel = 'NEGARA & LOKAL'}) => {
  const sec = useSec();
  const v = interpolate(sec, [at, at + 3], [from, to], clamp);
  return (
    <AbsoluteFill>
      <Background glow="rgba(59,123,224,0.22)" />
      <div style={{position: 'absolute', left: 160, right: 160, top: 420, height: 200, border: `10px solid ${C.ink}`, borderRadius: 24, overflow: 'hidden', display: 'flex'}}>
        <div style={{width: `${v}%`, background: '#7b5cff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Txt text={`${leftLabel} ${Math.round(v)}%`} size={52} />
        </div>
        <div style={{flex: 1, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Txt text={`${rightLabel} ${100 - Math.round(v)}%`} size={52} />
        </div>
      </div>
      <Abs x={160} y={660}>
        <Txt text="(ilustrasi komposisi kepemilikan)" size={30} color={useTheme().muted} />
      </Abs>
      <Lines lines={lines} align="center" y={80} />
    </AbsoluteFill>
  );
};

// ───────── BI Rate ─────────

// Keran uang: dibuka (uang murah) atau diputar (uang mahal).
export const Faucet: React.FC<{openAt: number; closeAt: number; lines: Line[]}> = ({openAt, closeAt, lines}) => {
  const sec = useSec();
  const open = sec < closeAt ? ramp(sec, openAt, openAt + 1) : 1 - ramp(sec, closeAt, closeAt + 1) * 0.85;
  const rate = interpolate(open, [0.15, 1], [7, 3.5], clamp);
  return (
    <AbsoluteFill>
      <Background glow={open > 0.5 ? 'rgba(62,207,107,0.25)' : 'rgba(255,75,62,0.25)'} />
      <svg width={1920} height={1080} style={{position: 'absolute'}}>
        <rect x={200} y={300} width={600} height={80} rx={20} fill="#9aa3b8" stroke={C.ink} strokeWidth={10} />
        <rect x={760} y={300} width={90} height={220} rx={20} fill="#9aa3b8" stroke={C.ink} strokeWidth={10} />
        <g transform={`rotate(${open * 180} 805 260)`}>
          <rect x={705} y={240} width={200} height={40} rx={12} fill={C.red} stroke={C.ink} strokeWidth={8} />
        </g>
        <circle cx={805} cy={260} r={26} fill="#555" stroke={C.ink} strokeWidth={8} />
        {Array.from({length: Math.round(open * 9)}, (_, i) => {
          const t = (sec * 1.5 + i / 9) % 1;
          return <circle key={i} cx={805 + Math.sin(i) * 20 * open} cy={540 + t * 380} r={14 + open * 14} fill={C.yellow} stroke={C.ink} strokeWidth={4} />;
        })}
      </svg>
      <Abs x={1100} y={360}>
        <Panel style={{padding: '30px 50px'}}>
          <Ink t="SUKU BUNGA" s={40} c="#555" />
          <Ink t={`${rate.toFixed(2).replace('.', ',')}%`} s={110} c={open > 0.5 ? C.green : C.red} />
          <Ink t={open > 0.5 ? 'uang MURAH' : 'uang MAHAL'} s={48} c={open > 0.5 ? C.green : C.red} />
        </Panel>
      </Abs>
      <Lines lines={lines} />
    </AbsoluteFill>
  );
};

// ───────── Bank ─────────

// Pesan berantai WhatsApp di layar ponsel.
export const ChatHoax: React.FC<{msgs: {text: string; at: number; me?: boolean}[]; lines: Line[]; title?: string}> = ({msgs, lines, title = '👨‍👩‍👧 Keluarga Besar'}) => {
  const sec = useSec();
  return (
    <Camera zoom={[1, 1.08]} pan={[0, -10]}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #2a2347, #3a2f5e)'}} />
      <Abs x={1180} y={200}>
        <Character pose="stand" face={sec > msgs[msgs.length - 1].at ? 'kaget' : 'serius'} jacket={C.blue} rim="#7fb2ff" height={700} />
      </Abs>
      <Abs x={360} y={80}>
        <div style={{width: 600, height: 900, borderRadius: 60, background: '#0b141a', border: `14px solid ${C.ink}`, overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
          <div style={{background: '#1f2c33', padding: '26px 30px', fontFamily: FONT, fontWeight: 900, fontSize: 34, color: '#fff'}}>{title}</div>
          <div style={{flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 18}}>
            {msgs.map((m) =>
              sec > m.at ? (
                <Pop key={m.text} at={m.at} style={{alignSelf: m.me ? 'flex-end' : 'flex-start', transformOrigin: m.me ? 'right' : 'left'}}>
                  <div style={{maxWidth: 470, background: m.me ? '#005c4b' : '#202c33', color: '#e9edef', borderRadius: 18, padding: '16px 20px', fontFamily: FONT, fontWeight: 700, fontSize: 30, lineHeight: 1.3}}>{m.text}</div>
                </Pop>
              ) : null,
            )}
          </div>
        </div>
      </Abs>
      <Grade tint="rgba(120,60,200,0.2)" />
      <Lines lines={lines} align="right" x={80} color="#fff" />
    </Camera>
  );
};

// Brankas bank: sebagian besar uang dipinjamkan, hanya sedikit yang tersisa.
export const Vault: React.FC<{lendAt: number; lines: Line[]}> = ({lendAt, lines}) => {
  const sec = useSec();
  const lent = ramp(sec, lendAt, lendAt + 3);
  const coins = 12;
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,201,60,0.25)" />
      <Abs x={260} y={260}>
        <div style={{width: 560, height: 560, borderRadius: 40, background: '#8d8a9c', border: `14px solid ${C.ink}`, position: 'relative'}}>
          <div style={{position: 'absolute', inset: 50, borderRadius: '50%', border: `14px solid ${C.ink}`, background: '#b8b5c4'}} />
          <div style={{position: 'absolute', left: 140, right: 140, top: 160, display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center'}}>
            {Array.from({length: coins}, (_, i) => (
              <div key={i} style={{opacity: i < coins - Math.round(lent * 10) ? 1 : 0.1}}>
                <Coin size={66} />
              </div>
            ))}
          </div>
        </div>
      </Abs>
      {[
        {e: '🏠', t: 'KPR', y: 260},
        {e: '🚗', t: 'Kendaraan', y: 470},
        {e: '🏪', t: 'Modal usaha', y: 680},
      ].map((d, i) => (
        <Abs key={d.t} x={1180} y={d.y} style={{opacity: lent > i * 0.3 ? 1 : 0.2}}>
          <Panel style={{padding: '18px 34px', display: 'flex', alignItems: 'center', gap: 20}}>
            <span style={{fontSize: 80}}>{d.e}</span>
            <span style={{fontFamily: FONT, fontWeight: 900, fontSize: 50, color: C.ink}}>{d.t}</span>
          </Panel>
        </Abs>
      ))}
      <Lines lines={lines} align="center" y={60} />
    </AbsoluteFill>
  );
};

// Kantor bank yang ditutup, dengan stempel.
export const BankFront: React.FC<{closeAt: number; lines: Line[]; crowd?: number}> = ({closeAt, lines, crowd = 6}) => {
  const sec = useSec();
  const shut = ramp(sec, closeAt, closeAt + 1);
  return (
    <Camera zoom={[1, 1.06]} pan={[0, -20]}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #c9c3d8, #e9e4ef)'}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 860, bottom: 0, background: '#a9a3b5'}} />
      <div style={{position: 'absolute', left: 460, top: 160, width: 1000, height: 700, background: '#e8e2d4', border: `12px solid ${C.ink}`}}>
        <div style={{height: 120, background: C.blue, borderBottom: `10px solid ${C.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Txt text="BANK SEJAHTERA (fiktif)" size={56} />
        </div>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{position: 'absolute', top: 170, left: 60 + i * 230, width: 180, height: 200, background: '#bfe3ff', border: `8px solid ${C.ink}`}} />
        ))}
        <div style={{position: 'absolute', left: 380, top: 420, width: 240, height: 270, background: '#6b4a2b', border: `8px solid ${C.ink}`, overflow: 'hidden'}}>
          <div style={{height: `${shut * 100}%`, background: 'repeating-linear-gradient(180deg, #8d8d99 0 22px, #6f6f7a 22px 28px)'}} />
        </div>
      </div>
      {Array.from({length: crowd}, (_, i) => (
        <Abs key={i} x={120 + i * 290 - (i > 2 ? 0 : 0)} y={560 + (i % 2) * 20}>
          <Character pose={i % 3 === 0 ? 'armUp' : i % 3 === 1 ? 'headInHands' : 'point'} face={i % 2 ? 'kaget' : 'sedih'} jacket={[C.red, C.green, C.yellow, '#7b5cff', '#e8e4ee', C.blue][i % 6]} rim="#ffffff" height={380} flip={i > 2} />
        </Abs>
      ))}
      {shut > 0.9 && (
        <Pop at={closeAt + 1} style={{position: 'absolute', left: 620, top: 300, transform: 'rotate(-10deg)'}}>
          <div style={{border: `16px solid ${C.red}`, borderRadius: 20, padding: '10px 40px', background: 'rgba(255,255,255,0.85)'}}>
            <Txt text="IZIN DICABUT" size={110} color={C.red} />
          </div>
        </Pop>
      )}
      <Lines lines={lines} />
    </Camera>
  );
};
