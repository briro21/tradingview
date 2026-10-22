import {AbsoluteFill, interpolate} from 'remotion';
import {Ambient, Particles} from '../components/Ambient';
import {Background} from '../components/Background';
import {Camera, Grade} from '../cinematic/Camera';
import {Character, Face, Pose} from '../cinematic/Character';
import {Chair, NightRoom} from '../cinematic/Sets';
import {Abs, Coin, Panel, Pop, Txt, useSec} from '../pasar-hijau/lib';
import {fmt, Line, Lines, ramp} from '../rupiah/scenes';
import {C, FONT} from '../theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Warna jaket tetap per tokoh supaya penonton mudah mengenali.
export const CAST = {
  kamu: {jacket: '#3b7be0', rim: '#7fb2ff'},
  raka: {jacket: '#ff9f43', rim: '#ffd59e'},
  joko: {jacket: '#8a5a3c', rim: '#ffcf9e'},
  ana: {jacket: '#ff7aa8', rim: '#ffd1e3'},
  petugas: {jacket: '#4a4f5c', rim: '#c9d3e6'},
};
type Who = keyof typeof CAST;

// Kamar malam + layar harga; "penglihatan" 10 detik ke depan tampil sebagai angka hantu biru.
export const TradeRoom: React.FC<{price: number; future: number; seeAt: number; buyAt?: number; riseAt?: number; face?: Face; lines?: Line[]}> = ({price, future, seeAt, buyAt, riseAt, face = 'serius', lines = []}) => {
  const sec = useSec();
  const seeing = sec > seeAt;
  const risen = riseAt !== undefined && sec > riseAt;
  const v = risen ? interpolate(sec, [riseAt!, riseAt! + 1.2], [price, future], clamp) : price;
  const timer = riseAt !== undefined && seeing && !risen ? Math.max(0, Math.ceil(riseAt - sec)) : null;
  return (
    <>
      <Camera zoom={[1, 1.14]} pan={[0, -70]} origin="70% 45%">
        <NightRoom
          screen={
            <div style={{height: '100%', padding: 24, fontFamily: FONT, fontWeight: 900, color: '#fff', position: 'relative'}}>
              <div style={{fontSize: 22, color: '#9aa3b8'}}>SAHAM BANK · HARGA</div>
              <div style={{fontSize: 96, color: risen ? C.green : '#fff'}}>{fmt(Math.round(v))}</div>
              {seeing && !risen && (
                <div style={{position: 'absolute', right: 24, top: 70, fontSize: 60, color: '#6fe7ff', textShadow: '0 0 20px #6fe7ff', opacity: 0.6 + 0.4 * Math.sin(sec * 8)}}>
                  {fmt(future)}
                </div>
              )}
              {buyAt !== undefined && sec > buyAt && <div style={{display: 'inline-block', marginTop: 10, padding: '4px 16px', background: C.green, borderRadius: 8, fontSize: 32}}>✓ BELI</div>}
              {timer !== null && <div style={{position: 'absolute', right: 24, bottom: 20, fontSize: 34, color: '#6fe7ff'}}>⏱ {timer} dtk</div>}
            </div>
          }
        >
          <Chair x={845} y={525} />
          <div style={{position: 'absolute', left: 820, top: 300}}>
            <Character pose={buyAt !== undefined && sec > buyAt && !risen ? 'typing' : risen ? 'cheer' : 'typing'} face={risen ? 'senang' : face} jacket={CAST.kamu.jacket} rim={CAST.kamu.rim} height={620} glowEye={seeing} />
          </div>
        </NightRoom>
        <Grade tint="rgba(80,160,255,0.15)" />
      </Camera>
      <Lines lines={lines} color="#fff" />
    </>
  );
};

// Balon percakapan.
export const Bubble: React.FC<{name: string; text: string; color: string; side?: 'left' | 'right'}> = ({name, text, color, side = 'left'}) => (
  <div style={{maxWidth: 760, position: 'relative'}}>
    <div style={{background: '#fffaf0', border: `8px solid ${C.ink}`, borderRadius: 30, padding: '20px 30px', boxShadow: `0 10px 0 ${C.ink}`}}>
      <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 30, color}}>{name}</div>
      <div style={{fontFamily: FONT, fontWeight: 800, fontSize: 44, color: C.ink, lineHeight: 1.2}}>{text}</div>
    </div>
    <div style={{position: 'absolute', bottom: -34, [side === 'left' ? 'left' : 'right']: 70, width: 0, height: 0, borderLeft: '22px solid transparent', borderRight: '22px solid transparent', borderTop: `36px solid ${C.ink}`}} />
  </div>
);

type SetName = 'room' | 'house' | 'white' | 'street';
const SetBg: React.FC<{set: SetName}> = ({set}) => {
  if (set === 'room')
    return (
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #2a2347 0%, #3a2f5e 70%, #1a1530 70%)'}}>
        <AbsoluteFill style={{background: 'radial-gradient(circle at 75% 40%, rgba(170,90,255,0.4), transparent 45%)'}} />
      </AbsoluteFill>
    );
  if (set === 'house')
    return (
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #ffe4c2 0%, #f5e1c8 72%, #c9a77c 72%)'}}>
        <div style={{position: 'absolute', left: 140, top: 160, width: 280, height: 220, background: '#bfe3ff', border: `10px solid ${C.ink}`}} />
        <div style={{position: 'absolute', right: 180, top: 140, width: 160, height: 220, background: '#c98a3a', border: `10px solid ${C.ink}`}} />
      </AbsoluteFill>
    );
  if (set === 'white')
    return (
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #eef1f6 0%, #dfe3ea 70%, #c4c9d3 70%)'}}>
        <div style={{position: 'absolute', left: 860, top: 0, width: 200, height: 120, background: '#ffffff', borderRadius: '0 0 100px 100px', boxShadow: '0 40px 120px rgba(255,255,220,0.9)'}} />
        <div style={{position: 'absolute', left: 360, right: 360, top: 700, height: 40, background: '#8d8a9c', border: `8px solid ${C.ink}`}} />
      </AbsoluteFill>
    );
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #ffd9a8, #f5f0e6 72%, #d8c7a6 72%)'}} />
  );
};

// Adegan dialog: dua (atau lebih) tokoh, balon bicara mengikuti siapa yang bicara.
export const Dialog: React.FC<{
  set: SetName;
  left: {who: Who; pose?: Pose; face?: Face}[];
  right: {who: Who; pose?: Pose; face?: Face}[];
  talks: {name: string; who: Who; text: string; at: number; side: 'left' | 'right'}[];
  lines?: Line[];
}> = ({set, left, right, talks, lines = []}) => {
  const sec = useSec();
  const cur = [...talks].reverse().find((t) => sec >= t.at);
  const dark = set === 'room';
  return (
    <Camera zoom={[1.02, 1.1]} pan={[0, -20]}>
      <SetBg set={set} />
      <Particles n={12} color={dark ? '#ffffff' : '#7b5cff'} opacity={0.15} />
      <div style={{position: 'absolute', left: 120, bottom: 40, display: 'flex', gap: -40, alignItems: 'flex-end'}}>
        {left.map((c, i) => (
          <div key={i} style={{marginLeft: i ? -80 : 0}}>
            <Character pose={c.pose ?? 'stand'} face={c.face ?? 'netral'} jacket={CAST[c.who].jacket} rim={CAST[c.who].rim} height={640 - i * 30} />
          </div>
        ))}
      </div>
      <div style={{position: 'absolute', right: 120, bottom: 40, display: 'flex', alignItems: 'flex-end'}}>
        {right.map((c, i) => (
          <div key={i} style={{marginLeft: i ? -80 : 0}}>
            <Character pose={c.pose ?? 'stand'} face={c.face ?? 'netral'} jacket={CAST[c.who].jacket} rim={CAST[c.who].rim} height={640 - i * 30} flip />
          </div>
        ))}
      </div>
      {cur && (
        <Pop key={cur.at} at={cur.at} style={{position: 'absolute', top: 110, [cur.side]: 160, transformOrigin: cur.side === 'left' ? 'bottom left' : 'bottom right'}}>
          <Bubble name={cur.name} text={cur.text} color={CAST[cur.who].jacket} side={cur.side} />
        </Pop>
      )}
      <Grade tint={dark ? 'rgba(120,60,200,0.2)' : 'rgba(255,170,90,0.1)'} />
      <Lines lines={lines} color={dark ? '#fff' : undefined} align="center" y={40} />
    </Camera>
  );
};

// Saldo yang terus bertambah, koin berjatuhan.
export const Balance: React.FC<{steps: {at: number; v: number}[]; lines: Line[]}> = ({steps, lines}) => {
  const sec = useSec();
  let v = steps[0].v;
  for (let i = 1; i < steps.length; i++) v = sec < steps[i].at ? v : interpolate(sec, [steps[i].at, steps[i].at + 1.2], [steps[i - 1].v, steps[i].v], clamp);
  return (
    <AbsoluteFill>
      <Background glow="rgba(62,207,107,0.3)" />
      {Array.from({length: 10}, (_, i) => {
        const t = ((sec * 0.6 + i / 10) % 1);
        return (
          <Abs key={i} x={120 + ((i * 173) % 1680)} y={-100 + t * 1200}>
            <Coin size={60 + (i % 3) * 14} />
          </Abs>
        );
      })}
      <Abs x={610} y={190}>
        <div style={{width: 700, height: 760, borderRadius: 60, background: '#10141f', border: `14px solid ${C.ink}`, padding: 50, display: 'flex', flexDirection: 'column', gap: 20}}>
          <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 36, color: '#9aa3b8'}}>SALDO PORTOFOLIO</div>
          <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 92, color: C.green}}>Rp{fmt(Math.round(v))}</div>
          <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 34, color: C.green}}>▲ tanpa satu pun rugi</div>
          <svg width={600} height={300}>
            <path d={`M0 280 ${Array.from({length: 12}, (_, i) => `L${(i + 1) * 50} ${280 - Math.min(1, v / steps[steps.length - 1].v) * (i + 1) * 22 - Math.sin(i) * 8}`).join(' ')}`} stroke={C.green} strokeWidth={10} fill="none" />
          </svg>
        </div>
      </Abs>
      <Lines lines={lines} />
    </AbsoluteFill>
  );
};

// Tidur gelisah: angka hijau-merah melayang.
export const Insomnia: React.FC<{lines: Line[]}> = ({lines}) => {
  const sec = useSec();
  return (
    <Camera zoom={[1, 1.1]} pan={[0, 0]}>
      <Ambient color="#3b7be0" base="#0d0b1c" particles={10} />
      {Array.from({length: 16}, (_, i) => {
        const up = (i % 2 === 0) === (Math.floor(sec * 1.5 + i) % 2 === 0);
        const y = 900 - ((sec * 60 + i * 70) % 900);
        return (
          <Abs key={i} x={100 + ((i * 211) % 1700)} y={y} style={{opacity: 0.5}}>
            <span style={{fontFamily: FONT, fontWeight: 900, fontSize: 40 + (i % 3) * 16, color: up ? C.green : C.red}}>{up ? '▲' : '▼'} {fmt(900 + ((i * 37) % 300))}</span>
          </Abs>
        );
      })}
      <div style={{position: 'absolute', left: 560, top: 620, width: 800, height: 140, background: '#3b3550', border: `10px solid ${C.ink}`, borderRadius: 20}} />
      <Abs x={700} y={420}>
        <div style={{transform: 'rotate(-80deg)'}}>
          <Character pose="stand" face="sedih" jacket={CAST.kamu.jacket} rim={CAST.kamu.rim} height={420} />
        </div>
      </Abs>
      <Grade tint="rgba(60,60,160,0.3)" />
      <Lines lines={lines} color="#fff" />
    </Camera>
  );
};

// Hitung mundur 10 detik: dua tombol, JUAL atau PANGGIL.
export const Countdown: React.FC<{ticks: {at: number; n: number}[]; callAt: number; redAt: number; lines?: Line[]}> = ({ticks, callAt, redAt, lines = []}) => {
  const sec = useSec();
  const n = [...ticks].reverse().find((t) => sec >= t.at)?.n ?? ticks[0].n;
  const red = sec > redAt;
  const called = sec > callAt;
  const shake = Math.sin(sec * 40) * (red ? 10 : 2);
  return (
    <AbsoluteFill style={{transform: `translateX(${shake}px)`}}>
      <Ambient color={red ? '#ff2a2a' : '#ff4b3e'} base={red ? '#2a0606' : '#160a14'} />
      <Abs x={0} y={190} style={{width: '100%', textAlign: 'center'}}>
        <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 340, color: red ? C.red : '#fff', lineHeight: 1, textShadow: `0 0 60px ${C.red}`, transform: `scale(${1 + 0.06 * Math.max(0, Math.sin(sec * 6))})`}}>{red ? '0' : n}</div>
        <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 50, color: '#ffb3b3'}}>DETIK</div>
      </Abs>
      <div style={{position: 'absolute', left: 280, right: 280, top: 720, display: 'flex', justifyContent: 'space-between'}}>
        {[
          {t: 'JUAL SEMUA', c: C.red, on: false},
          {t: '📞 PANGGIL AYAH', c: C.green, on: called},
        ].map((b) => (
          <div key={b.t} style={{padding: '30px 50px', borderRadius: 26, background: b.on ? b.c : '#2b2838', border: `10px solid ${b.on ? C.ink : b.c}`, boxShadow: b.on ? `0 0 70px ${b.c}` : 'none', transform: `scale(${b.on ? 1.12 : 1})`}}>
            <Txt text={b.t} size={56} color={b.on ? '#fff' : b.c} />
          </div>
        ))}
      </div>
      <Lines lines={lines} align="center" y={40} color="#fff" />
    </AbsoluteFill>
  );
};

// Telepon: layar terbelah, kamu dan Pak Joko.
export const PhoneCall: React.FC<{talks: {name: string; who: Who; text: string; at: number; side: 'left' | 'right'}[]}> = ({talks}) => {
  const sec = useSec();
  const cur = [...talks].reverse().find((t) => sec >= t.at);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(90deg, #2a2347 0 50%, #f5e1c8 50% 100%)'}} />
      <div style={{position: 'absolute', left: 955, top: 0, bottom: 0, width: 10, background: C.ink}} />
      <Abs x={260} y={330}>
        <Character pose="point" face="kaget" jacket={CAST.kamu.jacket} rim={CAST.kamu.rim} height={640} />
      </Abs>
      <Abs x={1240} y={330}>
        <Character pose="point" face={sec > talks[talks.length - 1].at + 1 ? 'serius' : 'kaget'} jacket={CAST.joko.jacket} rim={CAST.joko.rim} height={640} flip />
      </Abs>
      {cur && (
        <Pop key={cur.at} at={cur.at} style={{position: 'absolute', top: 80, [cur.side]: 120, transformOrigin: cur.side === 'left' ? 'bottom left' : 'bottom right'}}>
          <Bubble name={cur.name} text={cur.text} color={CAST[cur.who].jacket} side={cur.side} />
        </Pop>
      )}
    </AbsoluteFill>
  );
};

// Duduk di lantai, lalu pesan dari Pak Joko masuk.
export const FloorMessage: React.FC<{msgAt: number; lines?: Line[]}> = ({msgAt, lines = []}) => {
  const sec = useSec();
  const msg = sec > msgAt;
  return (
    <Camera zoom={[1, 1.12]} pan={[0, -20]}>
      <Ambient color={msg ? '#ffcf6b' : '#3b3550'} base="#141022" particles={14} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 820, bottom: 0, background: '#1a1530'}} />
      <Abs x={360} y={320}>
        <Character pose="headInHands" face={msg ? 'senang' : 'sedih'} jacket={CAST.kamu.jacket} rim={msg ? '#ffcf6b' : CAST.kamu.rim} height={560} />
      </Abs>
      {msg && (
        <Pop at={msgAt} style={{position: 'absolute', left: 900, top: 240}}>
          <Panel style={{width: 820, padding: '24px 34px', background: '#10141f'}}>
            <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 30, color: '#ffcf9e'}}>💬 Pak Joko</div>
            <div style={{fontFamily: FONT, fontWeight: 800, fontSize: 40, color: '#e9edef', lineHeight: 1.3}}>Nak, Ayah tidak tahu bagaimana kamu bisa tahu. Tapi terima kasih. ❤️</div>
          </Panel>
        </Pop>
      )}
      <Lines lines={lines} color="#fff" />
    </Camera>
  );
};

// Amplop misterius: foto layar 1998 + catatan.
export const Envelope: React.FC<{openAt: number; noteAt: number; addrAt: number; lines?: Line[]}> = ({openAt, noteAt, addrAt, lines = []}) => {
  const sec = useSec();
  const open = ramp(sec, openAt, openAt + 1.2);
  const flip = ramp(sec, noteAt - 0.3, noteAt + 0.5);
  return (
    <Camera zoom={[1, 1.15]} pan={[0, -20]}>
      <Ambient color="#ffb26b" base="#1a120c" particles={16} />
      <Abs x={460} y={420}>
        <div style={{position: 'relative', width: 1000, height: 560}}>
          <div style={{position: 'absolute', left: 100, top: 60 - open * 300, width: 800, height: 470, transform: `perspective(1200px) rotateY(${flip * 180}deg)`, transformStyle: 'preserve-3d'}}>
            <div style={{position: 'absolute', inset: 0, background: '#111', border: '14px solid #f2ead8', backfaceVisibility: 'hidden', padding: 24}}>
              <div style={{fontFamily: 'monospace', fontSize: 30, color: '#ff6b6b', lineHeight: 1.5}}>
                {['▼ 7.000  -12,5%', '▼ 4.150  -18,0%', '▼ 2.900  -20,0%', '▼ 1.775  -25,0%'].map((r) => (
                  <div key={r}>{r}</div>
                ))}
              </div>
              <div style={{position: 'absolute', right: 20, bottom: 14, fontFamily: 'monospace', fontSize: 30, color: '#f2ead8'}}>1998</div>
            </div>
            <div style={{position: 'absolute', inset: 0, background: '#f2ead8', border: `8px solid ${C.ink}`, transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30}}>
              <div style={{fontFamily: '"Comic Sans MS", cursive', fontSize: 64, color: '#2a2a2a', transform: 'rotate(-3deg)'}}>Kamu bukan yang pertama.</div>
              {sec > addrAt && <div style={{fontFamily: FONT, fontWeight: 800, fontSize: 32, color: '#6b4a2b'}}>📍 Toko Jam Tua · Jakarta</div>}
            </div>
          </div>
          <div style={{position: 'absolute', inset: 0, top: 200, background: '#c99a5b', border: `10px solid ${C.ink}`}} />
          <div style={{position: 'absolute', left: 0, right: 0, top: 200, height: 0, borderLeft: '500px solid transparent', borderRight: '500px solid transparent', borderTop: `${220 * (1 - open)}px solid #b5874a`}} />
        </div>
      </Abs>
      <Grade tint="rgba(255,150,60,0.2)" />
      <Lines lines={lines} color="#fff" />
    </Camera>
  );
};
