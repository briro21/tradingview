import React from "react";
import { AbsoluteFill } from "remotion";
import { theme } from "../theme";
import { useEnterExit } from "./anim";

export const SceneFrame: React.FC<{ label?: string; children: React.ReactNode }> = ({
  label,
  children,
}) => {
  const { opacity } = useEnterExit();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        background: `radial-gradient(circle at 50% 40%, #1c2333 0%, ${theme.bg} 65%)`,
        color: theme.text,
        fontFamily: theme.font,
        justifyContent: "center",
        alignItems: "center",
        padding: 120,
      }}
    >
      {label ? (
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 80,
            fontSize: 28,
            letterSpacing: 6,
            fontWeight: 600,
            color: theme.blue,
            opacity,
          }}
        >
          {label}
        </div>
      ) : null}
      {children}
    </AbsoluteFill>
  );
};
