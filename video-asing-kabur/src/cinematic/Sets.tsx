import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';

// Monitor dengan layar yang bisa diisi konten apa pun (grafik, order book, dll.).
export const Monitor: React.FC<{w: number; h: number; children?: React.ReactNode; glow?: string}> = ({w, h, children, glow = '#a35bff'}) => (
  <div style={{position: 'relative', width: w, height: h + h * 0.28}}>
    <div style={{position: 'absolute', left: w / 2 - w * 0.05, top: h, width: w * 0.1, height: h * 0.2, background: '#2b2838'}} />
    <div style={{position: 'absolute', left: w / 2 - w * 0.18, top: h + h * 0.18, width: w * 0.36, height: h * 0.06, borderRadius: 8, background: '#2b2838'}} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        height: h,
        borderRadius: 14,
        background: '#141225',
        border: '14px solid #2b2838',
        boxShadow: `0 0 120px 20px ${glow}55`,
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  </div>
);

const Clock: React.FC<{x: number; y: number; r: number}> = ({x, y, r}) => {
  const frame = useCurrentFrame();
  return (
    <svg style={{position: 'absolute', left: x, top: y, overflow: 'visible'}} width={r * 2} height={r * 2}>
      <circle cx={r} cy={r} r={r} fill="#e9e4f2" stroke="#2b2838" strokeWidth={10} />
      <line x1={r} y1={r} x2={r} y2={r * 0.35} stroke="#2b2838" strokeWidth={8} strokeLinecap="round" transform={`rotate(${300 + frame * 0.05} ${r} ${r})`} />
      <line x1={r} y1={r} x2={r} y2={r * 0.2} stroke={C.red} strokeWidth={4} transform={`rotate(${frame * 6} ${r} ${r})`} />
    </svg>
  );
};

// Kamar malam bernuansa ungu: dinding, poster, jam, meja, PC.
export const NightRoom: React.FC<{screen?: React.ReactNode; children?: React.ReactNode}> = ({screen, children}) => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg, #2a2347 0%, #3a2f5e 60%, #231d3a 100%)'}}>
    <AbsoluteFill style={{background: 'radial-gradient(circle at 78% 55%, rgba(170,90,255,0.45), transparent 45%)'}} />
    <div style={{position: 'absolute', left: 0, right: 0, top: 860, bottom: 0, background: '#1a1530'}} />
    {/* poster */}
    <div style={{position: 'absolute', left: 300, top: 150, width: 230, height: 320, background: '#121a3a', border: '10px solid #2b2838', boxShadow: '0 0 40px rgba(80,120,255,0.3)'}}>
      <svg width="100%" height="100%" viewBox="0 0 230 320">
        <path d="M20 250 L70 200 L110 220 L160 120 L210 90" stroke={C.green} strokeWidth={8} fill="none" />
        <circle cx={115} cy={150} r={70} stroke="#5aa0ff" strokeWidth={4} fill="none" />
      </svg>
    </div>
    <div style={{position: 'absolute', left: 60, top: 220, width: 190, height: 250, background: '#c9583a', border: '10px solid #2b2838'}} />
    <Clock x={640} y={140} r={60} />
    {/* meja & PC */}
    <div style={{position: 'absolute', left: 1050, top: 690, width: 820, height: 26, background: '#3b3550', border: '6px solid #1a1530'}} />
    <div style={{position: 'absolute', left: 1090, top: 716, width: 18, height: 160, background: '#2b2838'}} />
    <div style={{position: 'absolute', left: 1810, top: 716, width: 18, height: 160, background: '#2b2838'}} />
    <div style={{position: 'absolute', left: 1600, top: 740, width: 170, height: 230, background: '#1e1a2c', border: '6px solid #0e0b18', boxShadow: 'inset -6px 0 0 #b46bff'}} />
    <div style={{position: 'absolute', left: 1240, top: 300}}>
      <Monitor w={520} h={320}>{screen}</Monitor>
    </div>
    {/* mic */}
    <div style={{position: 'absolute', left: 1140, top: 520, width: 50, height: 110, borderRadius: 25, background: '#55506a', border: '6px solid #1a1530'}} />
    <div style={{position: 'absolute', left: 1160, top: 625, width: 10, height: 66, background: '#55506a'}} />
    {children}
  </AbsoluteFill>
);

// Kantor dengan jendela kota saat senja (latar diblur oleh pemanggil).
// Kursi kantor (dilihat dari samping), digambar di belakang karakter.
export const Chair: React.FC<{x: number; y: number}> = ({x, y}) => (
  <svg style={{position: 'absolute', left: x, top: y, overflow: 'visible'}} width={260} height={420}>
    <rect x={10} y={0} width={60} height={250} rx={24} fill="#3b3550" stroke="#1a1530" strokeWidth={8} transform="rotate(-12 40 250)" />
    <rect x={30} y={235} width={220} height={36} rx={14} fill="#3b3550" stroke="#1a1530" strokeWidth={8} />
    <rect x={128} y={271} width={20} height={100} fill="#2b2838" />
    <path d="M50 400 L138 370 L226 400" stroke="#2b2838" strokeWidth={16} fill="none" strokeLinecap="round" />
  </svg>
);

export const SunsetOffice: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg, #f2b27a 0%, #e48f62 40%, #8a5a6e 70%, #3b2a3a 100%)'}}>
    <AbsoluteFill style={{background: 'radial-gradient(circle at 60% 45%, rgba(255,230,170,0.8), transparent 30%)'}} />
    <svg width="1920" height="1080" style={{position: 'absolute'}}>
      {Array.from({length: 26}, (_, i) => {
        const w = 50 + ((i * 37) % 60);
        const h = 160 + ((i * 53) % 260);
        return <rect key={i} x={i * 76 - 20} y={700 - h} width={w} height={h + 40} fill="#6b4a5c" opacity={0.85} />;
      })}
    </svg>
    {/* bingkai jendela */}
    {[0, 640, 1280].map((x) => (
      <div key={x} style={{position: 'absolute', left: x, top: 0, width: 40, height: 760, background: '#3a2a35'}} />
    ))}
    <div style={{position: 'absolute', left: 0, right: 0, top: 740, bottom: 0, background: '#4a3540'}} />
    <div style={{position: 'absolute', left: 0, right: 0, top: 740, height: 30, background: '#5e4450'}} />
  </AbsoluteFill>
);
