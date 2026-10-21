import {AbsoluteFill, interpolate} from 'remotion';
import {Background} from '../components/Background';
import {Camera, Grade, Layer} from '../cinematic/Camera';
import {Character} from '../cinematic/Character';
import {Chair, Monitor, NightRoom, SunsetOffice} from '../cinematic/Sets';
import {Abs, Coin, Panel, Pop, Txt, usePop, useSec} from '../pasar-hijau/lib';
import {C, FONT, useTheme} from '../theme';

type Line = {text: string; at: number; color?: string; size?: number};
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const fmt = (n: number, d = 0) => n.toLocaleString('id-ID', {minimumFractionDigits: d, maximumFractionDigits: d});

export const Lines: React.FC<{lines: Line[]; x?: number; y?: number; right?: boolean; center?: boolean}> = ({lines, x = 100, y = 70, right, center}) => (
  <div
    style={{
      position: 'absolute',
      [right ? 'right' : 'left']: center ? 0 : x,
      ...(center ? {right: 0} : {}),
      top: y,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      alignItems: center ? 'center' : right ? 'flex-end' : 'flex-start',
    }}
  >
    {lines.map((l) => (
      <Pop key={l.text} at={l.at} style={{transformOrigin: center ? 'center' : right ? 'right' : 'left'}}>
        <Txt text={l.text} size={l.size ?? 90} color={l.color} />
      </Pop>
    ))}
  </div>
);

// Denyut merah di tepi layar untuk membangun ketegangan.
export const Pulse: React.FC<{color?: string; speed?: number}> = ({color = 'rgba(255,40,40,0.45)', speed = 5}) => {
  const sec = useSec();
  const k = Math.pow(Math.max(0, Math.sin(sec * speed)), 6);
  return <AbsoluteFill style={{pointerEvents: 'none', boxShadow: `inset 0 0 ${120 + 120 * k}px ${color}`, opacity: 0.4 + 0.6 * k}} />;
};

// 0:00 — Hook: kamar, layar menunjukkan investor asing = 0.
export const HookRoom: React.FC = () => {
  const sec = useSec();
  const count = Math.round(interpolate(sec, [1.5, 6], [1284, 0], clamp));
  const shocked = sec > 5.5;
  return (
    <>
    <Camera zoom={[1, 1.15]} pan={[0, -80]} origin="70% 50%">
      <NightRoom
        screen={
          <div style={{padding: 26, fontFamily: FONT, fontWeight: 900, color: '#fff'}}>
            <div style={{fontSize: 22, color: '#9aa3b8'}}>INVESTOR ASING AKTIF</div>
            <div style={{fontSize: 110, color: count === 0 ? C.red : '#fff'}}>{fmt(count)}</div>
            <div style={{fontSize: 22, color: C.red}}>{count === 0 ? 'SEMUA SUDAH KELUAR' : 'menurun...'}</div>
          </div>
        }
      >
        <Chair x={845} y={525} />
        <div style={{position: 'absolute', left: 820, top: 300}}>
          <Character pose={shocked ? 'headInHands' : 'typing'} face={shocked ? 'kaget' : 'serius'} rim="#7fb2ff" height={620} />
        </div>
      </NightRoom>
      <Grade tint="rgba(120,60,200,0.25)" />
    </Camera>
    <Lines y={90} x={80} lines={[{text: 'SEMUA ASING', at: 4.2, size: 100, color: '#fff'}, {text: 'SUDAH PERGI.', at: 4.8, size: 100, color: C.red}]} />
    </>
  );
};

// 0:10 — Tiga pertanyaan yang langsung menyentuh penonton.
export const Questions: React.FC = () => {
  const items = [
    {e: '💰', t: 'UANGMU?', at: 10.5},
    {e: '🍜', t: 'HARGA MI INSTAN?', at: 11.6},
    {e: '💼', t: 'PEKERJAANMU?', at: 13.2},
  ];
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,75,62,0.18)" />
      <div style={{position: 'absolute', left: 80, right: 80, top: 190, display: 'flex', gap: 50, justifyContent: 'center'}}>
        {items.map((it, i) => (
          <Pop key={it.t} at={it.at}>
            <Panel style={{width: 500, height: 520, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, transform: `rotate(${(i - 1) * 3}deg)`}}>
              <div style={{fontSize: 200}}>{it.e}</div>
              <Txt text={it.t} size={52} color={C.ink} style={{WebkitTextStroke: 0, textShadow: 'none', textAlign: 'center'}} />
            </Panel>
          </Pop>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// 0:14 — Fakta nyata (sumber: Kontan & Mediakeuangan, Okt 2026).
export const Facts: React.FC = () => {
  const sec = useSec();
  const ytd = interpolate(sec, [17.5, 20], [0, 40], clamp);
  const day = interpolate(sec, [25.5, 27.5], [0, 11.57], clamp);
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,75,62,0.22)" glowX="30%" />
      <Lines y={60} lines={[{text: 'BUKAN KHAYALAN.', at: 14.6, size: 80}]} />
      <div style={{position: 'absolute', left: 100, right: 100, top: 230, display: 'flex', gap: 40}}>
        <Pop at={17.2} style={{flex: 1}}>
          <Panel style={{padding: 36, height: 470}}>
            <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 34, color: '#555'}}>IHSG TAHUN INI</div>
            <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 150, color: C.red}}>-{fmt(ytd)}%</div>
            {sec > 21 && <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 40, color: C.ink}}>Peringkat 35 dari 35 bursa</div>}
          </Panel>
        </Pop>
        <Pop at={24.8} style={{flex: 1}}>
          <Panel style={{padding: 36, height: 470}}>
            <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 34, color: '#555'}}>16 OKTOBER · 1 HARI</div>
            <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 150, color: C.red}}>-{fmt(day, 2)}%</div>
            {sec > 30.7 && <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 40, color: C.ink}}>Asing terus jual: triliunan rupiah</div>}
          </Panel>
        </Pop>
      </div>
      <Abs x={100} y={760}>
        <Txt text="Sumber: Kontan, Mediakeuangan (Okt 2026)" size={28} color={useTheme().muted} />
      </Abs>
    </AbsoluteFill>
  );
};

// Kotak misteri: membuka "open loop" agar penonton bertahan sampai akhir.
export const MysteryBox: React.FC<{openAt?: number; size?: number}> = ({openAt = 1e9, size = 320}) => {
  const sec = useSec();
  const open = interpolate(sec, [openAt, openAt + 0.8], [0, 1], clamp);
  const shake = open === 0 ? Math.sin(sec * 30) * Math.max(0, Math.sin(sec * 1.5)) * 6 : 0;
  return (
    <div style={{position: 'relative', width: size, height: size, transform: `rotate(${shake}deg)`}}>
      {open > 0 && <div style={{position: 'absolute', left: -size, top: -size, width: size * 3, height: size * 3, background: `radial-gradient(circle, rgba(255,220,120,${0.8 * open}), transparent 60%)`}} />}
      <div style={{position: 'absolute', inset: 0, top: size * 0.25, background: '#c98a3a', border: `10px solid ${C.ink}`, borderRadius: 18}} />
      <div style={{position: 'absolute', left: -20, right: -20, top: size * 0.1, height: size * 0.22, background: '#e0a14c', border: `10px solid ${C.ink}`, borderRadius: 14, transform: `translateY(${-open * 120}px) rotate(${-open * 25}deg)`}} />
      <div style={{position: 'absolute', inset: 0, top: size * 0.3, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Txt text={open > 0.5 ? '!' : '?'} size={size * 0.5} />
      </div>
    </div>
  );
};

export const OpenLoop: React.FC = () => {
  const sec = useSec();
  const day = Math.min(365, Math.floor(interpolate(sec, [34, 38], [1, 365], clamp)));
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,201,60,0.3)" glowX="70%" />
      <Abs x={160} y={260}>
        <Panel style={{width: 420, height: 440, overflow: 'hidden', padding: 0}}>
          <div style={{background: C.red, height: 110, borderBottom: `8px solid ${C.ink}`, fontFamily: FONT, fontWeight: 900, fontSize: 56, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>HARI KE</div>
          <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 200, color: C.ink, textAlign: 'center', marginTop: 40}}>{day}</div>
        </Panel>
      </Abs>
      <Pop at={38.4} style={{position: 'absolute', left: 1180, top: 330}}>
        <MysteryBox />
      </Pop>
      <Lines y={60} lines={[{text: 'SKENARIO TERBURUK', at: 34.0, size: 80}, {text: 'HARI DEMI HARI', at: 35.6, size: 60, color: C.red}]} />
      <Lines y={820} x={1100} lines={[{text: '1 KEJADIAN ANEH', at: 39.8, size: 64, color: C.yellow}]} />
    </AbsoluteFill>
  );
};

// Lapak pasar tradisional sebagai analogi saham besar.
export const Stall: React.FC<{name: string; price: string; priceColor?: string}> = ({name, price, priceColor = C.ink}) => (
  <div style={{width: 440, position: 'relative'}}>
    <svg width={440} height={120} style={{display: 'block'}}>
      {Array.from({length: 8}, (_, i) => (
        <path key={i} d={`M${i * 55} 0 h55 v80 q-27.5 40 -55 0 Z`} fill={i % 2 ? '#fff6e6' : C.red} stroke={C.ink} strokeWidth={6} />
      ))}
    </svg>
    <div style={{height: 260, margin: '0 20px', background: '#b98455', border: `8px solid ${C.ink}`, borderTop: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}>
      <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 64, color: '#fff', WebkitTextStroke: `4px ${C.ink}`, paintOrder: 'stroke fill'}}>{name}</div>
      <div style={{background: '#fff6e6', border: `6px solid ${C.ink}`, borderRadius: 12, padding: '4px 18px', fontFamily: FONT, fontWeight: 900, fontSize: 40, color: priceColor}}>{price}</div>
    </div>
  </div>
);

export const Market: React.FC<{leaveAt: number}> = ({leaveAt}) => {
  const sec = useSec();
  const leave = interpolate(sec, [leaveAt, leaveAt + 3], [0, 1], clamp);
  const crash = interpolate(sec, [leaveAt + 1.5, leaveAt + 3.5], [0, 1], clamp);
  const stalls = [
    {n: 'BBCA', p: 8000},
    {n: 'BBRI', p: 4000},
    {n: 'TLKM', p: 3000},
  ];
  return (
    <Camera zoom={[1, 1.06]} pan={[0, 0]}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #ffd9a8 0%, #f5f0e6 60%, #e7dcc6 100%)'}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 820, bottom: 0, background: '#d8c7a6'}} />
      <div style={{position: 'absolute', left: 60, top: 260, display: 'flex', gap: 170}}>
        {stalls.map((s) => (
          <Pop key={s.n} at={50.5}>
            <Stall name={s.n} price={`Rp${fmt(Math.round(s.p * (1 - crash * 0.35)))}`} priceColor={crash > 0 ? C.red : C.ink} />
          </Pop>
        ))}
      </div>
      {/* pembeli lokal */}
      {[120, 760, 1400].map((x, i) => (
        <Abs key={`l${i}`} x={x} y={560}>
          <Character pose="stand" face={crash > 0.3 ? 'kaget' : 'netral'} jacket={C.blue} rim="#ffffff" height={380} />
        </Abs>
      ))}
      {/* pembeli asing: pergi */}
      {[330, 980, 1620].map((x, i) =>
        sec > 57 ? (
          <Abs key={`a${i}`} x={x + leave * 1400} y={540} style={{opacity: sec < 57.6 ? (sec - 57) / 0.6 : 1}}>
            <Character pose={leave > 0 ? 'walk' : 'stand'} face="serius" jacket="#7b5cff" rim="#ffffff" height={420} />
          </Abs>
        ) : null,
      )}
      <Lines y={60} x={80} lines={[{text: 'PASAR SAHAM = PASAR TRADISIONAL', at: 47.8, size: 64}, {text: 'Sebagian pembelinya: ASING', at: 57.8, size: 54, color: '#7b5cff'}]} />
      {sec > leaveAt + 1 && <Lines y={190} right x={80} lines={[{text: 'SIAPA YANG BAYAR?', at: leaveAt + 1, size: 70, color: C.red}]} />}
    </Camera>
  );
};

// Kartu bab: kalender + detak jantung (EKG).
export const Chapter: React.FC<{label: string; sub: string; at: number; color?: string}> = ({label, sub, at, color = C.red}) => {
  const sec = useSec();
  const t = sec - at;
  const ecg = Array.from({length: 120}, (_, i) => {
    const x = i * 16;
    const ph = (i + t * 40) % 40;
    const y = ph > 18 && ph < 20 ? -140 : ph >= 20 && ph < 22 ? 90 : ph > 16 && ph <= 18 ? 30 : 0;
    return `${i ? 'L' : 'M'}${x} ${y}`;
  }).join(' ');
  return (
    <AbsoluteFill style={{background: '#0d0d10', alignItems: 'center', justifyContent: 'center'}}>
      <svg width={1920} height={400} style={{position: 'absolute', top: 340, opacity: 0.5}}>
        <path d={ecg} transform="translate(0 200)" stroke={color} strokeWidth={6} fill="none" />
      </svg>
      <Pop at={at + 0.1} style={{zIndex: 1, textAlign: 'center'}}>
        <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 170, color: '#fff', letterSpacing: 6}}>{label}</div>
        <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 56, color}}>{sub}</div>
      </Pop>
      <Pulse color={`${color}88`} speed={4} />
    </AbsoluteFill>
  );
};

// HARI 1: order book penuh antrean jual, auto reject.
export const SellQueue: React.FC = () => {
  const sec = useSec();
  const rows = [
    ['BBCA', 7800],
    ['BBRI', 3800],
    ['BMRI', 5600],
    ['TLKM', 2850],
    ['ASII', 4600],
  ] as const;
  const queue = interpolate(sec, [75, 80], [0.1, 1], clamp);
  return (
    <Camera zoom={[1.02, 1.12]} pan={[0, -20]}>
      <Layer blur={6}>
        <AbsoluteFill style={{background: 'linear-gradient(180deg, #2a2347, #3a2f5e)'}} />
      </Layer>
      <div style={{position: 'absolute', left: 340, top: 80}}>
        <Monitor w={1240} h={680} glow="#ff4b3e">
          <div style={{padding: '30px 50px', fontFamily: FONT, fontWeight: 900, color: '#fff'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 30, color: '#9aa3b8', marginBottom: 20}}>
              <span>SAHAM</span>
              <span>ANTREAN JUAL (LOT)</span>
              <span>STATUS</span>
            </div>
            {rows.map(([n, p], i) => {
              const ar = sec > 79.7 + i * 0.7;
              return (
                <div key={n} style={{display: 'flex', alignItems: 'center', gap: 30, fontSize: 44, padding: '14px 0', borderTop: '2px solid #2b2838'}}>
                  <span style={{width: 150}}>{n}</span>
                  <div style={{flex: 1, height: 40, background: '#2b2838', borderRadius: 8}}>
                    <div style={{height: '100%', width: `${Math.min(100, queue * (70 + i * 7))}%`, background: C.red, borderRadius: 8}} />
                  </div>
                  <span style={{width: 260, color: ar ? '#fff' : C.red, background: ar ? C.red : 'transparent', borderRadius: 8, textAlign: 'center', fontSize: ar ? 30 : 44}}>
                    {ar ? 'AUTO REJECT' : `▼ ${fmt(p * 0.93)}`}
                  </span>
                </div>
              );
            })}
          </div>
        </Monitor>
      </div>
      <Layer blur={12}>
        <div style={{position: 'absolute', left: -280, top: 460}}>
          <Character pose="stand" face="kaget" rim="#ff8a7a" height={1400} />
        </div>
      </Layer>
      <Grade tint="rgba(255,60,60,0.2)" />
      <Pulse />
    </Camera>
  );
};

// HARI 1: papan saham berubah merah satu per satu, lalu trading halt.
export const RedBoard: React.FC<{haltAt: number}> = ({haltAt}) => {
  const sec = useSec();
  const names = ['BBCA', 'BBRI', 'BMRI', 'TLKM', 'ASII', 'ADRO', 'UNVR', 'ICBP', 'INDF', 'ANTM', 'PGAS', 'GOTO', 'KLBF', 'CPIN', 'MDKA', 'AMRT', 'BBNI', 'SMGR'];
  const halted = sec > haltAt;
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,75,62,0.25)" />
      <div style={{position: 'absolute', left: 120, right: 120, top: 120, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 22}}>
        {names.map((n, i) => {
          const red = sec > 82.8 + i * (i < 2 ? 0.9 : 0.18);
          return (
            <div key={n} style={{height: 170, borderRadius: 18, border: `7px solid ${C.ink}`, background: red ? C.red : '#e8e2d4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${red ? 1 : 0.96})`}}>
              <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 44, color: red ? '#fff' : C.ink}}>{n}</div>
              <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 30, color: red ? '#fff' : '#777'}}>{red ? '-6,9%' : '0,0%'}</div>
            </div>
          );
        })}
      </div>
      {halted && (
        <AbsoluteFill style={{background: 'rgba(0,0,0,0.65)', alignItems: 'center', justifyContent: 'center'}}>
          <Pop at={haltAt}>
            <div style={{border: `14px solid ${C.yellow}`, padding: '20px 60px', borderRadius: 24, transform: 'rotate(-4deg)'}}>
              <Txt text="TRADING HALT" size={170} color={C.yellow} />
            </div>
          </Pop>
          {sec > 89.7 && (
            <Abs x={0} y={760} style={{width: '100%', textAlign: 'center'}}>
              <Txt text="...ini baru pemanasan." size={64} color="#fff" />
            </Abs>
          )}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

// Asing membawa koper uang pergi.
export const Suitcase: React.FC = () => {
  const sec = useSec();
  const x = interpolate(sec, [91.8, 98.8], [300, 1500], clamp);
  return (
    <Camera zoom={[1, 1.05]} pan={[0, -40]}>
      <Layer blur={8}>
        <SunsetOffice />
      </Layer>
      <Abs x={x} y={220}>
        <Character pose="walk" face="serius" jacket="#7b5cff" rim="#ffb26b" height={720} />
      </Abs>
      <Abs x={x + 330} y={640}>
        <div style={{width: 200, height: 150, background: '#5a3b2a', border: `8px solid ${C.ink}`, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Coin size={80} />
        </div>
      </Abs>
      <Grade tint="rgba(255,140,60,0.2)" />
      <Lines y={70} x={80} lines={[{text: 'Uang hasil jual...', at: 92.2, size: 70, color: '#fff'}, {text: 'TIDAK DIAM DI SINI.', at: 93.6, size: 90, color: C.red}]} />
    </Camera>
  );
};

// MINGGU 1: rupiah ditukar ke dolar, nilai rupiah melemah.
export const Exchange: React.FC = () => {
  const sec = useSec();
  const rate = interpolate(sec, [107, 116], [16900, 19800], clamp);
  const shrink = interpolate(sec, [112, 116], [1, 0.55], clamp);
  return (
    <AbsoluteFill>
      <Background glow="rgba(59,123,224,0.25)" />
      <Abs x={140} y={260}>
        <div style={{transform: `scale(${shrink})`, transformOrigin: 'center'}}>
          <Coin size={360} label="Rp" />
        </div>
      </Abs>
      <Abs x={640} y={360}>
        <svg width={520} height={160}>
          <path d="M20 80 H440" stroke={C.ink} strokeWidth={20} strokeLinecap="round" strokeDasharray={`${(sec * 200) % 60} 30`} />
          <path d="M420 30 L500 80 L420 130 Z" fill={C.ink} />
        </svg>
      </Abs>
      <Abs x={1260} y={220}>
        <div style={{width: 440, height: 440, borderRadius: '50%', background: C.green, border: `14px solid ${C.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + (1 - shrink) * 0.4})`}}>
          <Txt text="$" size={260} />
        </div>
      </Abs>
      <Abs x={560} y={720}>
        <Panel style={{padding: '18px 40px'}}>
          <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 64, color: C.ink}}>
            USD/IDR <span style={{color: C.red}}>{fmt(Math.round(rate))}</span> <span style={{fontSize: 28, color: '#777'}}>(ilustrasi)</span>
          </div>
        </Panel>
      </Abs>
      <Lines y={60} x={80} lines={[{text: 'Rupiah → Dolar', at: 104, size: 70}, {text: 'RUPIAH MELEMAH', at: 112.5, size: 80, color: C.red}]} />
    </AbsoluteFill>
  );
};

// Bukan cuma investor: menyentuh dompet semua orang.
export const Wallet: React.FC = () => {
  const sec = useSec();
  const open = interpolate(sec, [121.5, 122.5], [0, 1], clamp);
  return (
    <Camera zoom={[1.0, 1.1]} pan={[0, 30]}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #ffe4c2, #f5f0e6)'}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 830, bottom: 0, background: '#cdb48f'}} />
      <div style={{position: 'absolute', left: 1100, top: 380, width: 300, height: 200, background: '#bfe3ff', border: `12px solid ${C.ink}`}} />
      <Abs x={300} y={170}>
        <Character pose="point" face={open > 0.5 ? 'sedih' : 'netral'} jacket={C.green} rim="#ffffff" height={760} />
      </Abs>
      <Abs x={760} y={560}>
        <div style={{width: 300, height: 200, background: '#6b4a2b', border: `10px solid ${C.ink}`, borderRadius: 20, transform: `perspective(600px) rotateX(${open * 50}deg)`, transformOrigin: 'bottom'}} />
        {open > 0.6 && <div style={{position: 'absolute', left: 120, top: -60 - ((sec * 60) % 120), fontSize: 70}}>🦋</div>}
      </Abs>
      <Lines y={60} right x={80} lines={[{text: 'Bukan cuma urusan', at: 117.8, size: 64}, {text: 'pemain saham.', at: 118.6, size: 64}, {text: 'DOMPET SEMUA ORANG', at: 121.8, size: 80, color: C.red}]} />
    </Camera>
  );
};

// BULAN 1: harga di warung naik.
export const Warung: React.FC = () => {
  const sec = useSec();
  const items = [
    {e: '⛽', n: 'BBM', p: 10000, at: 133.6},
    {e: '🌾', n: 'Gandum', p: 12000, at: 134.5},
    {e: '📱', n: 'Elektronik', p: 2500000, at: 135.4},
    {e: '🍜', n: 'Mi instan', p: 3500, at: 137.0},
  ];
  return (
    <Camera zoom={[1, 1.08]} pan={[0, -30]}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #ffe0b8, #f5f0e6)'}} />
      <div style={{position: 'absolute', left: 80, right: 80, top: 160, height: 560, background: '#a8774c', border: `10px solid ${C.ink}`, borderRadius: 16}} />
      <div style={{position: 'absolute', left: 120, right: 120, top: 200, display: 'flex', gap: 30}}>
        {items.map((it) => {
          const up = interpolate(sec, [it.at, it.at + 2], [0, 0.25], clamp);
          return (
            <Pop key={it.n} at={it.at - 1.5} style={{flex: 1}}>
              <Panel style={{height: 480, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16}}>
                <div style={{fontSize: 130}}>{it.e}</div>
                <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 40, color: C.ink}}>{it.n}</div>
                <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 40, color: up > 0 ? C.red : C.ink}}>
                  Rp{fmt(Math.round((it.p * (1 + up)) / 100) * 100)} {up > 0 ? '▲' : ''}
                </div>
              </Panel>
            </Pop>
          );
        })}
      </div>
      <Abs x={120} y={760}>
        <Txt text="(ilustrasi)" size={28} color={useTheme().muted} />
      </Abs>
      <Lines y={50} x={100} lines={[{text: 'BARANG IMPOR MAHAL', at: 130, size: 76, color: C.red}]} />
    </Camera>
  );
};

// Suku bunga naik → cicilan naik.
export const Rates: React.FC = () => {
  const sec = useSec();
  const bi = interpolate(sec, [141.5, 144], [0, 1], clamp);
  const loan = interpolate(sec, [145.5, 148], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,201,60,0.25)" />
      <div style={{position: 'absolute', left: 200, right: 200, top: 220, display: 'flex', gap: 120, justifyContent: 'center'}}>
        {[
          {t: 'SUKU BUNGA BI', v: bi, at: 140.9},
          {t: 'CICILAN KREDIT', v: loan, at: 145.1},
        ].map((b) => (
          <Pop key={b.t} at={b.at}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}>
              <div style={{height: 460, display: 'flex', alignItems: 'flex-end'}}>
                <div style={{width: 260, height: 160 + 280 * b.v, background: C.red, border: `8px solid ${C.ink}`, borderRadius: 16, display: 'flex', justifyContent: 'center', paddingTop: 20}}>
                  <Txt text="▲" size={110} />
                </div>
              </div>
              <Txt text={b.t} size={50} />
            </div>
          </Pop>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Jeda dramatis: "Belum."
export const NotYet: React.FC = () => (
  <AbsoluteFill style={{background: '#0d0d10', alignItems: 'center', justifyContent: 'center', gap: 30}}>
    <Pop at={149.3}>
      <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 60, color: '#888'}}>Kalau kamu pikir ini sudah paling buruk...</div>
    </Pop>
    <Pop at={152.5}>
      <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 220, color: C.red}}>BELUM.</div>
    </Pop>
  </AbsoluteFill>
);

// TAHUN 1: lampu kantor padam satu per satu.
export const OfficeLights: React.FC = () => {
  const sec = useSec();
  const cols = 8;
  const rows = 7;
  const off = interpolate(sec, [160, 171], [0, cols * rows], clamp);
  const order = Array.from({length: cols * rows}, (_, i) => (i * 37) % (cols * rows));
  return (
    <Camera zoom={[1, 1.1]} pan={[0, 0]} origin="50% 40%">
      <AbsoluteFill style={{background: `linear-gradient(180deg, #2b2547 0%, #6b4a6e ${60 - off / 2}%, #e48f62 100%)`}} />
      <div style={{position: 'absolute', left: 1000, top: 140, width: 760, height: 820, background: '#2e2a3d', border: `10px solid ${C.ink}`, display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 18, padding: 30}}>
        {order.map((o, i) => (
          <div key={i} style={{background: o < off ? '#1a1726' : '#ffd77a', boxShadow: o < off ? 'none' : '0 0 20px #ffd77a88', borderRadius: 4}} />
        ))}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 960, bottom: 0, background: '#1a1726'}} />
      <Grade tint="rgba(80,60,160,0.25)" />
      <Lines y={60} x={70} lines={[{text: 'Pintu modal tertutup', at: 156, size: 54, color: '#fff'}, {text: 'EKSPANSI BERHENTI', at: 160.8, size: 54, color: C.red}, {text: 'REKRUTMEN DIBEKUKAN', at: 162.4, size: 54, color: C.red}, {text: 'STARTUP KEHABISAN NAPAS', at: 164.1, size: 54, color: C.red}]} />
    </Camera>
  );
};

// Twist: kotak misteri terbuka.
export const Reveal: React.FC = () => (
  <AbsoluteFill>
    <Background glow="rgba(255,201,60,0.35)" />
    <Abs x={800} y={340}>
      <MysteryBox openAt={182.8} />
    </Abs>
    <Lines center y={90} lines={[{text: 'Ada yang tidak masuk akal...', at: 175.3, size: 70}, {text: 'INI DIA.', at: 182.9, size: 120, color: C.green}]} />
  </AbsoluteFill>
);

// 20 Oktober: asing jual Rp2,21 T, IHSG malah naik 5,65%.
export const Paradox: React.FC = () => {
  const sec = useSec();
  const sell = interpolate(sec, [184, 187], [0, 2.21], clamp);
  const up = interpolate(sec, [189.3, 191.5], [0, 5.65], clamp);
  return (
    <AbsoluteFill>
      <Background glow="rgba(62,207,107,0.25)" glowX="70%" />
      <Lines y={50} x={100} lines={[{text: '20 OKTOBER 2026', at: 183.9, size: 64}]} />
      <div style={{position: 'absolute', left: 120, right: 120, top: 200, display: 'flex', gap: 60}}>
        <Pop at={184} style={{width: 800}}>
          <Panel style={{padding: 40, height: 420}}>
            <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 40, color: '#555'}}>ASING JUAL BERSIH</div>
            <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 130, color: C.red}}>Rp{fmt(sell, 2)} T</div>
          </Panel>
        </Pop>
        <Pop at={189.3} style={{width: 800}}>
          <Panel style={{padding: 40, height: 420}}>
            <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 40, color: '#555'}}>IHSG HARI ITU</div>
            <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 130, color: C.green}}>+{fmt(up, 2)}%</div>
          </Panel>
        </Pop>
      </div>
      {sec > 193.3 && (
        <Abs x={0} y={680} style={{width: '100%', textAlign: 'center'}}>
          <Pop at={193.3}>
            <Txt text="KOK BISA?" size={120} color={C.yellow} />
          </Pop>
        </Abs>
      )}
      <Abs x={120} y={630}>
        <Txt text="Sumber: Mediakeuangan, Kontan (20/10/2026)" size={26} color={useTheme().muted} />
      </Abs>
    </AbsoluteFill>
  );
};

// Investor lokal beramai-ramai menahan grafik agar tidak jatuh.
export const Crowd: React.FC = () => {
  const sec = useSec();
  const lift = interpolate(sec, [196, 202], [0, 1], clamp);
  const n = Math.round(interpolate(sec, [195, 200], [2, 14], clamp));
  return (
    <AbsoluteFill>
      <Background glow="rgba(62,207,107,0.3)" glowY="70%" />
      <svg width={1920} height={600} style={{position: 'absolute', top: 160}}>
        <path d={`M0 ${200 + 220 * (1 - lift)} C500 ${260 + 200 * (1 - lift)} 1100 ${380 - 120 * lift} 1920 ${420 - 260 * lift}`} stroke={C.green} strokeWidth={22} fill="none" strokeLinecap="round" />
      </svg>
      {Array.from({length: n}, (_, i) => (
        <Abs key={i} x={60 + i * 132} y={560 - lift * 40}>
          <Character pose="cheer" face="senang" jacket={['#3b7be0', '#ff4b3e', '#3ecf6b', '#ffc93c'][i % 4]} rim="#ffffff" height={300} />
        </Abs>
      ))}
      <Lines center y={40} lines={[{text: 'INVESTOR LOKAL', at: 196.5, size: 90, color: C.green}, {text: 'Penahan yang sering kita lupakan', at: 207.3, size: 54}]} />
    </AbsoluteFill>
  );
};

// Siapa yang untung? Diskon besar vs jebakan.
export const WhoWins: React.FC = () => {
  const sec = useSec();
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,201,60,0.3)" />
      <Abs x={140} y={250}>
        <Character pose={sec > 220 ? 'cheer' : 'stand'} face="senang" jacket={C.green} rim="#ffffff" height={620} />
      </Abs>
      <div style={{position: 'absolute', left: 760, top: 260, display: 'flex', flexDirection: 'column', gap: 30}}>
        {['BBCA', 'BBRI', 'TLKM'].map((n, i) => (
          <Pop key={n} at={218 + i * 0.5} style={{transformOrigin: 'left'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
              <Panel style={{padding: '14px 30px'}}>
                <span style={{fontFamily: FONT, fontWeight: 900, fontSize: 56, color: C.ink}}>{n}</span>
              </Panel>
              <div style={{background: C.red, border: `7px solid ${C.ink}`, borderRadius: 14, padding: '10px 26px', transform: 'rotate(-6deg)'}}>
                <Txt text="DISKON?" size={48} />
              </div>
            </div>
          </Pop>
        ))}
      </div>
      <Lines y={50} x={100} lines={[{text: 'SIAPA YANG UNTUNG?', at: 216.5, size: 90, color: C.yellow}]} />
      <Lines y={820} x={760} lines={[{text: 'Punya cash + sabar', at: 220.5, size: 56, color: C.green}]} />
    </AbsoluteFill>
  );
};

export const Trap: React.FC = () => {
  const sec = useSec();
  const snap = sec > 230.2;
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,75,62,0.3)" />
      <Abs x={560} y={280} style={{transform: 'scale(1.3)', transformOrigin: 'top center'}}>
        <svg width={720} height={420} style={{overflow: 'visible'}}>
          <rect x={0} y={330} width={720} height={60} rx={12} fill="#a8774c" stroke={C.ink} strokeWidth={8} />
          <g transform={`rotate(${snap ? 0 : -70} 120 330)`}>
            <path d="M120 330 V120 H600 V330" stroke="#888" strokeWidth={20} fill="none" />
          </g>
          <rect x={250} y={210} width={220} height={110} rx={12} fill={C.yellow} stroke={C.ink} strokeWidth={8} />
          <text x={360} y={285} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={54} fill={C.ink}>MURAH!</text>
        </svg>
      </Abs>
      <Lines center y={60} lines={[{text: 'Harga murah ≠ kesempatan', at: 226.3, size: 76}, {text: 'KADANG ITU JEBAKAN', at: 230.1, size: 90, color: C.red}]} />
      <Lines center y={800} lines={[{text: 'Investor vs Penjudi 📊🎲', at: 235.8, size: 64, color: C.yellow}]} />
    </AbsoluteFill>
  );
};

// Penutup: dua pintu + ajakan komentar + disclaimer.
export const Doors: React.FC = () => {
  const sec = useSec();
  const pickA = usePop(239.6);
  const pickB = usePop(240.6);
  return (
    <AbsoluteFill>
      <Background glow="rgba(59,123,224,0.25)" />
      <div style={{position: 'absolute', left: 260, right: 260, top: 200, display: 'flex', justifyContent: 'space-between'}}>
        {[
          {t: 'KIAMAT', c: C.red, s: pickA},
          {t: 'KESEMPATAN', c: C.green, s: pickB},
        ].map((d) => (
          <div key={d.t} style={{transform: `scale(${d.s})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}>
            <div style={{width: 380, height: 520, background: d.c, border: `12px solid ${C.ink}`, borderRadius: '190px 190px 12px 12px', boxShadow: `0 0 80px ${d.c}`}} />
            <Txt text={d.t} size={70} color={d.c} />
          </div>
        ))}
      </div>
      <Abs x={830} y={420}>
        <Character pose="stand" face="netral" jacket={C.blue} rim="#ffffff" height={420} />
      </Abs>
      {sec > 243.5 && (
        <Abs x={760} y={90}>
          <Pop at={243.5}>
            <Panel style={{padding: '16px 34px'}}>
              <span style={{fontFamily: FONT, fontWeight: 900, fontSize: 46, color: C.ink}}>💬 Tulis jawabanmu di komentar</span>
            </Panel>
          </Pop>
        </Abs>
      )}
    </AbsoluteFill>
  );
};

export const EndCard: React.FC = () => (
  <AbsoluteFill>
    <Background glow="rgba(255,75,62,0.25)" />
    <Abs x={160} y={180}>
      <Panel style={{width: 960, height: 540, background: '#1b1f2b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20}}>
        <Txt text="WHAT IF" size={60} color={C.yellow} />
        <Txt text="RUPIAH TEMBUS" size={100} color="#fff" />
        <Txt text="Rp20.000 / $?" size={120} color={C.red} />
      </Panel>
    </Abs>
    <Abs x={1220} y={300}>
      <Character pose="point" face="senang" jacket={C.red} rim="#ffffff" height={560} flip />
    </Abs>
    <Abs x={160} y={760}>
      <Txt text="Video ini bukan ajakan membeli atau menjual saham." size={34} color={useTheme().muted} />
    </Abs>
  </AbsoluteFill>
);
