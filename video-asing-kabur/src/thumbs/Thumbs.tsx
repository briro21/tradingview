import {AbsoluteFill, Sequence} from 'remotion';
import {Background} from '../components/Background';
import {Gauge} from '../components/Gauge';
import {Character} from '../cinematic/Character';
import {C, FONT, ThemeCtx} from '../theme';

// Thumbnail 1280x720: teks maksimal 3-4 kata, kontras tinggi, wajah ekspresif.
const T: React.FC<{text: string; size: number; color?: string; style?: React.CSSProperties}> = ({text, size, color = '#fff', style}) => (
  <div style={{fontFamily: FONT, fontWeight: 900, fontSize: size, color, lineHeight: 0.95, WebkitTextStroke: `${size / 14}px ${C.ink}`, paintOrder: 'stroke fill', textShadow: `0 ${size / 12}px 0 ${C.ink}`, ...style}}>
    {text}
  </div>
);

const Frame: React.FC<{children: React.ReactNode; glow: string; gx?: string; gy?: string}> = ({children, glow, gx, gy}) => (
  <ThemeCtx.Provider value="dark">
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Background glow={glow} glowX={gx} glowY={gy} />
      {children}
    </AbsoluteFill>
  </ThemeCtx.Provider>
);

const Arrow: React.FC<{w: number; color?: string}> = ({w, color = C.red}) => (
  <svg width={w} height={w * 0.9} viewBox="0 0 200 180" style={{overflow: 'visible'}}>
    <path d="M10 20 L80 80 L110 55 L170 130" stroke={C.ink} strokeWidth={34} fill="none" strokeLinejoin="round" strokeLinecap="round" />
    <path d="M10 20 L80 80 L110 55 L170 130" stroke={color} strokeWidth={20} fill="none" strokeLinejoin="round" strokeLinecap="round" />
    <path d="M190 150 L120 150 L185 85 Z" fill={color} stroke={C.ink} strokeWidth={8} strokeLinejoin="round" />
  </svg>
);

// Opsi A: asing pergi membawa koper, IHSG anjlok.
export const ThumbA: React.FC = () => (
  <Frame glow="rgba(255,75,62,0.45)" gx="72%" gy="55%">
    <div style={{position: 'absolute', left: -40, top: 170}}>
      <Character pose="headInHands" face="kaget" jacket={C.blue} rim="#ff8a7a" height={640} />
    </div>
    <div style={{position: 'absolute', left: 820, top: 230, opacity: 0.95}}>
      <Character pose="walk" face="serius" jacket="#7b5cff" rim="#ffb26b" height={520} />
    </div>
    <div style={{position: 'absolute', left: 1080, top: 520, width: 150, height: 110, background: '#5a3b2a', border: `7px solid ${C.ink}`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 40, color: C.yellow}}>
      Rp
    </div>
    <T text="ASING KABUR." size={150} style={{position: 'absolute', left: 40, top: 30}} />
    <div style={{position: 'absolute', left: 560, top: 230, background: C.red, border: `8px solid ${C.ink}`, borderRadius: 20, padding: '6px 22px', transform: 'rotate(-5deg)'}}>
      <T text="IHSG -40%" size={70} />
    </div>
  </Frame>
);

// Opsi B: gauge IHSG rusak (meniru gaya "test broke").
export const ThumbB: React.FC = () => (
  <Frame glow="rgba(255,120,60,0.5)" gx="70%" gy="60%">
    <div style={{position: 'absolute', left: -30, top: 160}}>
      <Character pose="stand" face="serius" jacket={C.blue} rim="#ffb26b" height={720} glowEye />
    </div>
    <div style={{position: 'absolute', left: 600, top: 200, transform: 'scale(1.05)', transformOrigin: 'top left'}}>
      {/* frame digeser agar jarum sudah patah */}
      <Sequence from={-20} layout="none">
        <Gauge breakAt={10} label="IHSG" />
      </Sequence>
    </div>
    <T text="WHAT IF" size={90} color={C.yellow} style={{position: 'absolute', left: 50, top: 30}} />
    <T text="ASING PERGI?" size={120} style={{position: 'absolute', left: 50, top: 120}} />
    <T text="PASAR RUSAK." size={100} color={C.red} style={{position: 'absolute', right: 40, bottom: 40}} />
  </Frame>
);

// Opsi C: rasa penasaran — kiamat atau kesempatan.
export const ThumbC: React.FC = () => (
  <Frame glow="rgba(62,207,107,0.35)" gx="78%" gy="50%">
    <div style={{position: 'absolute', left: 40, top: 230, width: 300, height: 430, background: C.red, border: `10px solid ${C.ink}`, borderRadius: '150px 150px 10px 10px', boxShadow: `0 0 70px ${C.red}`}} />
    <div style={{position: 'absolute', right: 40, top: 230, width: 300, height: 430, background: C.green, border: `10px solid ${C.ink}`, borderRadius: '150px 150px 10px 10px', boxShadow: `0 0 70px ${C.green}`}} />
    <div style={{position: 'absolute', left: 430, top: 200}}>
      <Character pose="stand" face="kaget" jacket={C.yellow} rim="#ffffff" height={560} />
    </div>
    <div style={{position: 'absolute', left: 70, top: 380}}>
      <Arrow w={240} color="#fff6e6" />
    </div>
    <T text="KIAMAT" size={78} color={C.red} style={{position: 'absolute', left: 30, top: 140}} />
    <T text="CUAN?" size={110} color={C.green} style={{position: 'absolute', right: 40, top: 110}} />
    <T text="ASING KABUR," size={96} style={{position: 'absolute', left: 0, right: 0, top: 20, textAlign: 'center'}} />
  </Frame>
);

// ───────── Thumbnail: What If Rupiah Tembus Rp20.000 ─────────
const Note: React.FC<{w: number; faded?: boolean}> = ({w, faded}) => (
  <div style={{width: w, height: w * 0.47, borderRadius: 18, border: `9px solid ${C.ink}`, background: 'linear-gradient(135deg, #ff8a8a, #e4505a)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', filter: faded ? 'saturate(0.35)' : undefined, opacity: faded ? 0.8 : 1}}>
    <div style={{position: 'absolute', inset: 14, border: '4px dashed rgba(255,255,255,0.6)', borderRadius: 10}} />
    <T text="100.000" size={w * 0.17} />
  </div>
);

// Opsi A: uang menyusut + angka besar.
export const ThumbR1: React.FC = () => (
  <Frame glow="rgba(255,75,62,0.5)" gx="72%" gy="55%">
    <div style={{position: 'absolute', left: -20, top: 200}}>
      <Character pose="headInHands" face="kaget" jacket={C.blue} rim="#ff8a7a" height={600} />
    </div>
    <div style={{position: 'absolute', left: 520, top: 330, transform: 'rotate(-8deg)'}}>
      <Note w={420} />
    </div>
    <div style={{position: 'absolute', left: 1040, top: 400, transform: 'rotate(6deg) scale(0.55)', transformOrigin: 'top left'}}>
      <Note w={420} faded />
    </div>
    <div style={{position: 'absolute', left: 960, top: 400}}>
      <T text="→" size={110} color={C.yellow} />
    </div>
    <T text="RUPIAH" size={120} style={{position: 'absolute', left: 40, top: 20}} />
    <T text="Rp20.000/$?" size={150} color={C.red} style={{position: 'absolute', left: 40, top: 130}} />
  </Frame>
);

// Opsi B: timbangan berat sebelah, gaya "what if".
export const ThumbR2: React.FC = () => (
  <Frame glow="rgba(62,207,107,0.4)" gx="68%" gy="55%">
    <div style={{position: 'absolute', left: -40, top: 150}}>
      <Character pose="stand" face="serius" jacket={C.blue} rim="#ffb26b" height={720} glowEye />
    </div>
    <div style={{position: 'absolute', left: 520, top: 420, width: 700, transform: 'rotate(-14deg)', transformOrigin: '350px 20px'}}>
      <div style={{height: 26, background: '#8a7560', border: `7px solid ${C.ink}`, borderRadius: 8}} />
      <div style={{position: 'absolute', left: -30, top: 20, display: 'flex', flexWrap: 'wrap-reverse', width: 260, gap: 4, transform: 'rotate(14deg)'}}>
        {Array.from({length: 6}, (_, i) => (
          <div key={i} style={{width: 80, height: 80, borderRadius: '50%', background: C.green, border: `7px solid ${C.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 40, color: '#fff'}}>$</div>
        ))}
      </div>
      <div style={{position: 'absolute', right: -10, top: -70, transform: 'rotate(14deg)'}}>
        <div style={{width: 80, height: 80, borderRadius: '50%', background: C.yellow, border: `7px solid ${C.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 30, color: C.ink}}>Rp</div>
      </div>
    </div>
    <div style={{position: 'absolute', left: 845, top: 430, width: 30, height: 290, background: '#6b5a48', border: `7px solid ${C.ink}`}} />
    <T text="WHAT IF" size={84} color={C.yellow} style={{position: 'absolute', right: 40, top: 30}} />
    <T text="DOLAR Rp20.000?" size={104} style={{position: 'absolute', right: 40, top: 120}} />
  </Frame>
);

// Opsi C: siapa untung, siapa buntung.
export const ThumbR3: React.FC = () => (
  <ThemeCtx.Provider value="dark">
    <AbsoluteFill style={{background: 'linear-gradient(90deg, #5a1218 0 50%, #0f4d2a 50% 100%)'}}>
      <div style={{position: 'absolute', left: 636, top: 0, bottom: 0, width: 8, background: C.ink}} />
      <div style={{position: 'absolute', left: 140, top: 260}}>
        <Character pose="headInHands" face="sedih" jacket={C.red} rim="#ff8a7a" height={500} />
      </div>
      <div style={{position: 'absolute', left: 800, top: 260}}>
        <Character pose="cheer" face="senang" jacket={C.green} rim="#9effc0" height={500} />
      </div>
      <div style={{position: 'absolute', left: 1050, top: 420, fontSize: 120}}>💵</div>
      <T text="RUGI" size={110} color={C.red} style={{position: 'absolute', left: 170, top: 130}} />
      <T text="UNTUNG" size={100} color={C.green} style={{position: 'absolute', left: 740, top: 140}} />
      <T text="RUPIAH Rp20.000:" size={86} style={{position: 'absolute', left: 0, right: 0, top: 24, textAlign: 'center'}} />
    </AbsoluteFill>
  </ThemeCtx.Provider>
);
