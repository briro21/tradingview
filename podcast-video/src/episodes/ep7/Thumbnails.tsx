import React from "react";
import { theme } from "../../theme";
import { Badge, Frame, Icon, Marker, PodcastStrip, RedBox } from "../../Thumbnails";

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
