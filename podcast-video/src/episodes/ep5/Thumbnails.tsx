import React from "react";
import { theme } from "../../theme";
import { Badge, Frame, Icon, Marker, PodcastStrip, RedBox } from "../../Thumbnails";

// Thumbnail video Joscha Bach (1280×720). Diupload sebagai episode ke-4 channel.
// Setiap thumbnail membawa strip "3-HR PODCAST → 10 MIN" agar langsung terbaca
// sebagai ringkasan podcast (pola yang mendatangkan trafik di episode 1).

/** M: sama dengan frame pertama video. */
export const ThumbM: React.FC = () => (
  <Frame>
    <Icon name="skullDark" x={1040} y={330} size={370} />
    <PodcastStrip hours="3-HR" />
    <div style={{ position: "absolute", left: 60, top: 175 }}>
      <Marker size={84}>YOU HAVE</Marker>
      <Marker size={84} style={{ marginTop: 12 }}>
        NEVER SEEN
      </Marker>
    </div>
    <div style={{ position: "absolute", left: 60, bottom: 60 }}>
      <RedBox size={104}>THE REAL WORLD</RedBox>
    </div>
    <Badge style={{ right: 40, top: 40 }}>Joscha Bach × Lex Fridman</Badge>
  </Frame>
);

/** N: kebahagiaan adalah kue. */
export const ThumbN: React.FC = () => (
  <Frame>
    <Icon name="cookie" x={1010} y={400} size={400} rotate={-8} />
    <Icon name="brain" x={1160} y={200} size={150} rotate={12} />
    <PodcastStrip hours="3-HR" />
    <div style={{ position: "absolute", left: 60, top: 175 }}>
      <Marker size={92}>HAPPINESS</Marker>
      <Marker size={92} style={{ marginTop: 12 }}>
        IS A
      </Marker>
    </div>
    <div style={{ position: "absolute", left: 60, bottom: 60 }}>
      <RedBox size={130}>COOKIE</RedBox>
    </div>
    <Badge style={{ right: 40, top: 40 }}>Joscha Bach × Lex Fridman</Badge>
  </Frame>
);

/** O: media sosial sebagai otak global yang kejang. */
export const ThumbO: React.FC = () => (
  <Frame>
    <Icon name="network" x={1010} y={360} size={350} />
    <Icon name="bird" x={1010} y={360} size={160} />
    <Icon name="lightning" x={1180} y={210} size={140} rotate={14} />
    <PodcastStrip hours="3-HR" />
    <div style={{ position: "absolute", left: 60, top: 175 }}>
      <Marker size={80}>THE GLOBAL BRAIN</Marker>
      <Marker size={80} style={{ marginTop: 12 }} color={theme.red}>
        IS SICK
      </Marker>
    </div>
    <div style={{ position: "absolute", left: 60, bottom: 60 }}>
      <RedBox size={96}>PERMANENT SEIZURE</RedBox>
    </div>
    <Badge style={{ right: 40, top: 40 }}>Joscha Bach × Lex Fridman</Badge>
  </Frame>
);
