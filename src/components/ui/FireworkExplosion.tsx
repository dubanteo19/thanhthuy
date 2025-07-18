import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

import * as THREE from "three";
import { Vector3 } from "three";

interface Props {
  origin: [number, number, number];
  color: string;
  onComplete?: () => void;
}

const NUM_PARTICLES = 400;
const FADE_DURATION = 4.5; // seconds

export function FireworkExplosion({ origin, color, onComplete }: Props) {
  const particles = useRef<THREE.Mesh[]>([]);
  const velocities = useRef<Vector3[]>([]);
  const [exploded, setExploded] = useState(false);
  const [launchY, setLaunchY] = useState(origin[1]);
  const fadeTimer = useRef(0);

  // Random explosion height per firework (8 - 13)
  const [explosionHeight] = useState(() => 5 + Math.random() * 5);

  useEffect(() => {
    velocities.current = Array.from({ length: NUM_PARTICLES }, () => {
      const dir = new Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
      );
      dir.normalize().multiplyScalar(Math.random() * 0.2 + 0.05);
      return dir;
    });
  }, []);

  useFrame((_, delta) => {
    if (!exploded) {
      setLaunchY((y) => {
        const newY = y + 15 * delta;
        if (newY >= explosionHeight) setExploded(true);
        return newY;
      });
    } else {
      fadeTimer.current += delta;

      particles.current.forEach((p, i) => {
        p.position.addScaledVector(velocities.current[i], delta * 10);
        const mat = p.material as THREE.MeshStandardMaterial;
        if (mat.opacity > 0) {
          mat.opacity = Math.max(0, mat.opacity - delta * 0.4);
        }
      });

      if (fadeTimer.current >= FADE_DURATION) {
        onComplete?.();
      }
    }
  });

  return (
    <>
      {/* Rocket flying up */}
      {!exploded && (
        <mesh position={[origin[0], launchY, origin[2]]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial
            emissive={color}
            emissiveIntensity={2}
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Light flash at explosion */}
      {exploded && fadeTimer.current < 0.3 && (
        <pointLight
          position={[origin[0], explosionHeight, origin[2]]}
          intensity={10}
          distance={5}
          decay={2}
          color={color}
        />
      )}

      {/* Explosion particles */}
      {exploded &&
        particles.current.length === 0 &&
        Array.from({ length: NUM_PARTICLES }, (_, i) => (
          <mesh
            key={i}
            ref={(el) => el && (particles.current[i] = el)}
            position={[origin[0], explosionHeight, origin[2]]}
          >
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial
              emissiveIntensity={2}
              emissive={color}
              transparent
              opacity={1}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
    </>
  );
}
