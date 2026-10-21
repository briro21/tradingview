import {AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {IhsgChart} from '../components/IhsgChart';
import {Captions} from '../pasar-hijau/Captions';
import {T0} from '../pasar-hijau/lib';
import {C, FONT} from '../theme';
import {Camera, Grade, Layer} from './Camera';
import {Character} from './Character';
import {Chair, Monitor, NightRoom, SunsetOffice} from './Sets';

const CRASH = [7200, 7150, 7240, 7100, 6900, 6950, 6600, 6300, 6100, 5700, 5300];

const Portfolio: React.FC = () => (
  <div style={{padding: 22, fontFamily: FONT, fontWeight: 900, color: '#fff'}}>
    <div style={{fontSize: 18, color: '#9aa3b8'}}>PORTOFOLIO</div>
    <div style={{fontSize: 40, color: C.red}}>-Rp 12.480.000</div>
    {['BBCA', 'BBRI', 'BMRI', 'TLKM'].map((s, i) => (
      <div key={s} style={{display: 'flex', justifyContent: 'space-between', fontSize: 26, marginTop: 8}}>
        <span>{s}</span>
        <span style={{color: C.red}}>▼ {(3.1 + i * 0.9).toFixed(1).replace('.', ',')}%</span>
      </div>
    ))}
  </div>
);

// Adegan 1: kamar malam, karakter duduk melihat portofolio merah.
const RoomScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Camera zoom={[1, 1.12]} pan={[0, -60]} origin="65% 55%">
      <NightRoom screen={<Portfolio />}>
        <Chair x={845} y={525} />
        <div style={{position: 'absolute', left: 820, top: 300}}>
          <Character pose={frame > 150 ? 'headInHands' : 'typing'} face={frame > 150 ? 'sedih' : 'serius'} rim="#7fb2ff" height={620} />
        </div>
      </NightRoom>
      <Grade tint="rgba(120,60,200,0.25)" />
    </Camera>
  );
};

// Adegan 2: close-up monitor, kepala karakter blur di depan (depth of field).
const MonitorClose: React.FC = () => (
  <Camera zoom={[1.02, 1.1]} pan={[0, 20]}>
    <Layer blur={6}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #2a2347, #3a2f5e)'}} />
    </Layer>
    <div style={{position: 'absolute', left: 420, top: 110}}>
      <Monitor w={1240} h={680}>
        <div style={{padding: '90px 40px'}}>
          <IhsgChart data={CRASH} width={880} height={460} drawFrames={200} label="IHSG" />
        </div>
      </Monitor>
    </div>
    <Layer blur={14}>
      <div style={{position: 'absolute', left: -260, top: 420}}>
        <Character pose="stand" face="netral" rim="#7fb2ff" height={1500} />
      </div>
    </Layer>
    <Grade tint="rgba(120,60,200,0.2)" />
  </Camera>
);

// Adegan 3: kantor senja, karakter berdiri; latar diblur.
const OfficeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const up = interpolate(frame, [60, 75], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Camera zoom={[1.05, 1.0]} pan={[-20, 20]}>
      <Layer blur={10}>
        <SunsetOffice />
      </Layer>
      <div style={{position: 'absolute', left: 560, top: 90}}>
        <Character pose="stand" face={up ? 'serius' : 'sedih'} jacket={C.red} rim="#ffb26b" height={760} glowEye={up > 0} />
      </div>
      <Layer blur={12}>
        <div style={{position: 'absolute', left: 1180, top: 260}}>
          <Character pose={up ? 'armUp' : 'stand'} face="netral" jacket="#e8e4ee" rim="#ffb26b" height={1000} flip />
        </div>
      </Layer>
      <Grade tint="rgba(255,140,60,0.2)" />
    </Camera>
  );
};

// Demo 30 detik pertama voice-over "IHSG Hijau" dengan gaya sinematik.
export const CinematicDemo: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <Sequence durationInFrames={9 * 30}>
      <RoomScene />
    </Sequence>
    <Sequence from={9 * 30} durationInFrames={9 * 30}>
      <MonitorClose />
    </Sequence>
    <Sequence from={18 * 30} durationInFrames={12 * 30}>
      <OfficeScene />
    </Sequence>
    <T0.Provider value={0}>
      <Captions />
    </T0.Provider>
    <Audio src={staticFile('vo_pasar_hijau.mp3')} endAt={30 * 30} />
  </AbsoluteFill>
);
