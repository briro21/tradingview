import React from "react";
import { staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import { theme } from "../theme";
import { useEnterExit } from "./anim";

const BARS = 64;

export const AudioWaveform: React.FC<{ src: string; color?: string }> = ({
  src,
  color = theme.blue,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const audioData = useAudioData(staticFile(src));
  const { opacity } = useEnterExit(10);

  const values = audioData
    ? visualizeAudio({ fps, frame, audioData, numberOfSamples: BARS, smoothing: true })
    : new Array(BARS).fill(0);

  // Cerminkan agar simetris: frekuensi rendah di tengah.
  const half = values.slice(0, BARS / 2).reverse();
  const bars = [...half, ...values.slice(0, BARS / 2)];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, height: 200, opacity }}>
      {bars.map((v, i) => (
        <div
          key={i}
          style={{
            width: 14,
            height: Math.max(8, Math.min(1, v * 4) * 200),
            borderRadius: 7,
            backgroundColor: color,
            boxShadow: `0 0 18px ${color}`,
          }}
        />
      ))}
    </div>
  );
};
