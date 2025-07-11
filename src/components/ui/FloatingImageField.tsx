// FloatingImageField.tsx
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef, useState, useMemo, type FC } from "react";
import * as THREE from "three";
import { FloatingImage } from "./FloatingImage";

const TOTAL_IMAGES = 100;
const START_DELAY = 5; 
const SPAWN_DELAY = 0.1; 

export const FloatingImageField: FC<{ imageUrls: string[] }> = ({
  imageUrls,
}) => {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const [spawnedCount, setSpawnedCount] = useState(0);
  const startTime = useRef<number | null>(null);
  const lastSpawnTime = useRef(0);

  // Load all textures once
  const textures = useLoader(TextureLoader, imageUrls);

  // Prepare image data with stable props
  const imageData = useMemo(() => {
    return Array.from({ length: TOTAL_IMAGES }).map((_, i) => {
      const texture = textures[i % textures.length];
      const initialPosition = new THREE.Vector3(
        Math.random() * 20 - 10,
        -2 - Math.random() * 10,
        Math.random() * 20 - 10,
      );
      const speed = 0.1 + Math.random() * 0.5;
      const size = isMobile ? 0.8 : 2.2;
      return { texture, initialPosition, speed, size };
    });
  }, [textures, isMobile]);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    if (startTime.current === null) {
      startTime.current = elapsed;
      return;
    }

    const timeSinceStart = elapsed - startTime.current;

    if (timeSinceStart < START_DELAY) return;

    if (
      spawnedCount < TOTAL_IMAGES &&
      elapsed - lastSpawnTime.current > SPAWN_DELAY
    ) {
      lastSpawnTime.current = elapsed;
      setSpawnedCount((count) => count + 1);
    }
  });

  return (
    <>
      {imageData.slice(0, spawnedCount).map((data, i) => (
        <FloatingImage
          key={i}
          texture={data.texture}
          initialPosition={data.initialPosition}
          speed={data.speed}
          size={data.size}
        />
      ))}
    </>
  );
};
