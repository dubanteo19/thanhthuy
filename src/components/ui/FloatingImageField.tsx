import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef, useState, useMemo, useEffect, type FC } from "react";
import * as THREE from "three";
import { FloatingImage } from "./FloatingImage";

const TOTAL_IMAGES = 100;
const START_DELAY = 40;
const SPAWN_DELAY = 0.1;

export const FloatingImageField: FC<{ imageUrls: string[] }> = ({
  imageUrls,
}) => {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const [spawnedCount, setSpawnedCount] = useState(0);
  const [mode, setMode] = useState<"float" | "heart">("float");
  const center = useMemo(() => new THREE.Vector3(0, 0, -20), []);
  const startTime = useRef<number | null>(null);
  const lastSpawnTime = useRef(0);

  const textures = useLoader(TextureLoader, imageUrls);
  const imageRefs = useRef<(THREE.Mesh | null)[]>([]);
  const anglesRef = useRef<number[]>([]);

  const imageData = useMemo(() => {
    return Array.from({ length: TOTAL_IMAGES }).map((_, i) => {
      const texture = textures[i % textures.length];

      const angle = Math.random() * Math.PI * 2;
      const radius = 18 + Math.random() * 1;
      const y = isMobile ? -3 + Math.random() * 1 : -1 + Math.random() * 2;

      const initialPosition = new THREE.Vector3(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius,
      );

      const speed = 0.1 + Math.random() * 0.5;
      const size = isMobile ? 0.8 : 2.2;

      return {
        texture,
        angle,
        radius,
        y,
        speed,
        size,
        initialPosition, // ✅ Add this line
      };
    });
  }, [textures, isMobile]);

  // Sync angles once textures are loaded
  useEffect(() => {
    anglesRef.current = imageData.map((d) => d.angle);
  }, [imageData]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "i") {
        setMode("heart");

        const heartPositions = Array.from({ length: spawnedCount }).map(
          (_, i) => {
            const t = (i / spawnedCount) * Math.PI * 2;
            const x = 8 * Math.sin(t) ** 3;
            const y =
              8 * Math.cos(t) -
              4 * Math.cos(2 * t) -
              2 * Math.cos(3 * t) -
              Math.cos(4 * t);
            return new THREE.Vector3(x, y * 0.5 + 2, 0);
          },
        );

        imageRefs.current.forEach((mesh, i) => {
          if (mesh && heartPositions[i]) {
            mesh.userData.target = heartPositions[i];
          }
        });
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [spawnedCount]);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    if (startTime.current === null) {
      startTime.current = elapsed;
      return;
    }

    const timeSinceStart = elapsed - startTime.current;
    if (timeSinceStart < START_DELAY) return;

    // Spawn new images with delay
    if (
      spawnedCount < TOTAL_IMAGES &&
      elapsed - lastSpawnTime.current > SPAWN_DELAY
    ) {
      lastSpawnTime.current = elapsed;
      setSpawnedCount((count) => count + 1);
    }

    if (mode === "heart") {
      imageRefs.current.forEach((mesh) => {
        if (mesh && mesh.userData.target) {
          mesh.position.lerp(mesh.userData.target, 0.02);
        }
      });
    } else {
      // Orbiting motion
      imageRefs.current.forEach((mesh, i) => {
        const data = imageData[i];
        if (!mesh || !data) return;

        anglesRef.current[i] += 0.005; // control orbit speed
        const angle = anglesRef.current[i];

        mesh.position.x = center.x + Math.cos(angle) * data.radius;
        mesh.position.z = center.z + Math.sin(angle) * data.radius;
        mesh.position.y = data.y;
      });
    }
  });

  return (
    <>
      {imageData.slice(0, spawnedCount).map((data, i) => (
        <FloatingImage
          key={i}
          ref={(el) => {
            imageRefs.current[i] = el;
          }}
          texture={data.texture}
          angle={data.angle}
          radius={data.radius}
          y={data.y}
          speed={data.speed}
          size={data.size}
          mode={mode}
        />
      ))}
    </>
  );
};
