import type { FC } from "react";
import { FloatingText } from "./FloatingText";

import * as THREE from "three";
export const FloatingTextField: FC<{ phrases: string[] }> = ({ phrases }) => {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const TOTAL_TEXTS = 400;
  const glowColors = ["#ff77ff", "#ffcc00", "#00ffff", "#ff6699"];

  return (
    <>
      {Array.from({ length: TOTAL_TEXTS }).map((_, i) => {
        const content = phrases[i % phrases.length]; // repeat phrases
        const glowColor =
          glowColors[Math.floor(Math.random() * glowColors.length)];

        const radius = 8 + Math.random() * 2; // distance from center
        const angle = Math.random() * Math.PI * 2;

        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius - 5;
        const y = 50 - Math.random() * 5;

        const initialPosition = new THREE.Vector3(x, y, z);

        const baseSize = isMobile ? 0.05 : 0.1;
        const size = baseSize + Math.random() * 0.1;
        const speed = 0.1 + Math.random() * 0.5;

        return (
          <FloatingText
            key={i}
            content={content}
            initialPosition={initialPosition}
            size={size}
            speed={speed}
            glowColor={glowColor}
          />
        );
      })}
    </>
  );
};
