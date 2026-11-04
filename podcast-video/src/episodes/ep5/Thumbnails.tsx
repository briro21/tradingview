import React from "react";
import { theme } from "../../theme";
import { Badge, Frame, Icon, Marker, RedBox } from "../../Thumbnails";

// Thumbnail Episode 5 (1280×720).

/** M: sama dengan frame pertama video. */
export const ThumbM: React.FC = () => (
  <Frame>
    <Icon name="skullDark" x={1020} y={330} size={460} />
    <div style={{ position: "absolute", left: 60, top: 70 }}>
      <Marker size={84}>YOU HAVE</Marker>
      <Marker size={84} style={{ marginTop: 12 }}>
        NEVER SEEN
      </Marker>
    </div>
    <div style={{ position: "absolute", left: 60, bottom: 60 }}>
      <RedBox size={104}>THE REAL WORLD</RedBox>
    </div>
    <Badge style={{ right: 40, top: 30 }}>Joscha Bach × Lex Fridman</Badge>
  </Frame>
);

/** N: kebahagiaan adalah kue. */
export const ThumbN: React.FC = () => (
  <Frame>
    <Icon name="cookie" x={1000} y={330} size={440} rotate={-8} />
    <Icon name="brain" x={1140} y={130} size={170} rotate={12} />
    <div style={{ position: "absolute", left: 60, top: 70 }}>
      <Marker size={92}>HAPPINESS</Marker>
      <Marker size={92} style={{ marginTop: 12 }}>
        IS A
      </Marker>
    </div>
    <div style={{ position: "absolute", left: 60, bottom: 60 }}>
      <RedBox size={130}>COOKIE</RedBox>
    </div>
    <Badge style={{ right: 40, bottom: 40 }}>Joscha Bach</Badge>
  </Frame>
);

/** O: media sosial sebagai otak global yang kejang. */
export const ThumbO: React.FC = () => (
  <Frame>
    <Icon name="network" x={1000} y={320} size={440} />
    <Icon name="bird" x={1000} y={320} size={200} />
    <Icon name="lightning" x={1170} y={120} size={160} rotate={14} />
    <div style={{ position: "absolute", left: 60, top: 70 }}>
      <Marker size={80}>THE GLOBAL BRAIN</Marker>
      <Marker size={80} style={{ marginTop: 12 }} color={theme.red}>
        IS SICK
      </Marker>
    </div>
    <div style={{ position: "absolute", left: 60, bottom: 60 }}>
      <RedBox size={96}>PERMANENT SEIZURE</RedBox>
    </div>
  </Frame>
);
