import React from "react";
import { theme } from "../../theme";
import { Badge, Bold, DarkFrame, Frame, Icon, Marker, MiniStrip, PodcastStrip, RedBox, SmallBadge } from "../../Thumbnails";

// Thumbnail Robert Pape × The Diary of a CEO (1280×720).

/** S: sama dengan frame pertama video (kalender + "MOST DANGEROUS WEEKS"). */
export const ThumbS: React.FC = () => (
  <Frame>
    <Icon name="calendarBlank" x={1040} y={420} size={360} />
    <div style={{ position: "absolute", left: 940, top: 400, width: 200, textAlign: "center" }}>
      <Marker size={170} color={theme.red}>8</Marker>
    </div>
    <PodcastStrip hours="90-MIN" />
    <div style={{ position: "absolute", left: 60, top: 175 }}>
      <Marker size={84}>THE MOST</Marker>
      <Marker size={110} color={theme.red} style={{ marginTop: 6 }}>
        DANGEROUS
      </Marker>
    </div>
    <div style={{ position: "absolute", left: 60, bottom: 60 }}>
      <RedBox size={84}>WEEKS OF OUR LIVES</RedBox>
    </div>
    <Badge style={{ right: 40, top: 118 }}>Robert Pape × Diary of a CEO</Badge>
  </Frame>
);

/** T: jebakan eskalasi, roulette. */
export const ThumbT: React.FC = () => (
  <Frame>
    <Icon name="roulette" x={1040} y={410} size={360} />
    <PodcastStrip hours="90-MIN" />
    <div style={{ position: "absolute", left: 60, top: 175 }}>
      <Marker size={88}>IRAN WAR IS</Marker>
      <Marker size={88} color={theme.red} style={{ marginTop: 10 }}>
        ROULETTE
      </Marker>
    </div>
    <div style={{ position: "absolute", left: 60, bottom: 60 }}>
      <RedBox size={96}>ESCALATION TRAP</RedBox>
    </div>
    <Badge style={{ right: 40, top: 118 }}>Robert Pape × Diary of a CEO</Badge>
  </Frame>
);

/** U: jalan menuju perang dunia ketiga, dan cara menghentikannya. */
export const ThumbU: React.FC = () => (
  <Frame>
    <Icon name="globe" x={1040} y={430} size={330} />
    <Icon name="fire" x={1160} y={250} size={170} />
    <PodcastStrip hours="90-MIN" />
    <div style={{ position: "absolute", left: 60, top: 175 }}>
      <Marker size={88}>THE ROAD TO</Marker>
      <Marker size={130} color={theme.red} style={{ marginTop: 6 }}>
        WW3?
      </Marker>
    </div>
    <div style={{ position: "absolute", left: 60, bottom: 60 }}>
      <RedBox size={96}>3 WAYS TO STOP IT</RedBox>
    </div>
    <Badge style={{ right: 40, top: 118 }}>Robert Pape × Diary of a CEO</Badge>
  </Frame>
);

// ---------- Versi 2 (gaya baru): ≤4 kata, latar gelap, satu objek besar + wajah emosi. ----------

const STRIP = "90-MIN PODCAST → 10 MIN";
const CREDIT = "Robert Pape · The Diary of a CEO";

/** S2: kalender raksasa "8" + wajah kaget. */
export const ThumbS2: React.FC = () => (
  <DarkFrame glowX={930} glowY={370}>
    <Icon name="calendarBlank" x={1000} y={400} size={480} />
    <div style={{ position: "absolute", left: 860, top: 320, width: 280, textAlign: "center" }}>
      <Bold size={300} color={theme.red}>8</Bold>
    </div>
    <Icon name="faceShock" x={1190} y={590} size={210} rotate={8} />
    <MiniStrip text={STRIP} />
    <div style={{ position: "absolute", left: 50, top: 170 }}>
      <Bold size={96}>MOST DANGEROUS</Bold>
      <Bold size={150} color={theme.yellow} style={{ marginTop: 14 }}>
        WEEKS
      </Bold>
    </div>
    <SmallBadge>{CREDIT}</SmallBadge>
  </DarkFrame>
);

/** T2: roda roulette raksasa dengan bom. */
export const ThumbT2: React.FC = () => (
  <DarkFrame glowX={940} glowY={380}>
    <Icon name="roulette" x={990} y={380} size={540} rotate={-12} />
    <Icon name="bomb" x={1160} y={570} size={230} rotate={-10} />
    <MiniStrip text={STRIP} />
    <div style={{ position: "absolute", left: 50, top: 190 }}>
      <Bold size={120}>WAR IS</Bold>
      <Bold size={116} color={theme.red} style={{ marginTop: 14 }}>
        ROULETTE
      </Bold>
    </div>
    <SmallBadge>{CREDIT}</SmallBadge>
  </DarkFrame>
);

/** U2: bumi terbakar + wajah kaget. */
export const ThumbU2: React.FC = () => (
  <DarkFrame glow={theme.orange} glowX={930} glowY={400}>
    <Icon name="globe" x={930} y={420} size={460} />
    <Icon name="fire" x={820} y={190} size={230} rotate={-8} />
    <Icon name="fire" x={1080} y={230} size={190} rotate={10} />
    <Icon name="faceShock" x={1170} y={580} size={200} rotate={-6} />
    <MiniStrip text={STRIP} />
    <div style={{ position: "absolute", left: 50, top: 190 }}>
      <Bold size={120}>ROAD TO</Bold>
      <Bold size={190} color={theme.yellow} style={{ marginTop: 10 }}>
        WW3?
      </Bold>
    </div>
    <SmallBadge>{CREDIT}</SmallBadge>
  </DarkFrame>
);
