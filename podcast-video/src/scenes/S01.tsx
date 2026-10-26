import React from "react";
import { interpolate } from "remotion";
import { theme } from "../theme";
import { useEnterExit } from "../components/anim";
import { AudioWaveform } from "../components/AudioWaveform";
import { Highlight } from "../components/Highlight";
import { SceneFrame } from "../components/SceneFrame";

// Hook: avatar host + waveform biru.
export const S01: React.FC = () => {
  const { enter, exit } = useEnterExit();
  const title = useEnterExit(25);
  return (
    <SceneFrame label="AI · THE LAST INVENTION">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 48 }}>
        <div
          style={{
            width: 320,
            height: 320,
            borderRadius: 160,
            border: `6px solid ${theme.blue}`,
            boxShadow: `0 0 60px ${theme.blue}88`,
            background: "linear-gradient(135deg, #1e293b, #0f172a)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 110,
            fontWeight: 800,
            color: theme.white,
            opacity: exit,
            transform: `scale(${enter})`,
          }}
        >
          {/* Ganti dengan foto host: <Img src={staticFile("host.png")} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} /> */}
          AI
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: theme.white,
            textAlign: "center",
            opacity: title.opacity,
            transform: `translateY(${interpolate(title.enter, [0, 1], [40, 0])}px)`,
          }}
        >
          Gambling <Highlight>8 Billion</Highlight> Lives
        </div>
        <AudioWaveform src="S01.mp3" />
      </div>
    </SceneFrame>
  );
};
