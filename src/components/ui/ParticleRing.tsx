// ParticleRing.tsx
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Points } from "three";

export function ParticleRing({
  radius = 8,
  count = 500,
  color = "#ffe066",
  spread = 0.3,
  rotationSpeed = 0.002,
}) {
  const pointsRef = useRef<Points>(null);

  const positions = useMemo(() => {
    const posArray: number[] = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = radius + (Math.random() - 0.5) * spread;
      const x = Math.cos(angle) * r;
      const y = -5 - (Math.random() - 0.5) * 0.5; // slight vertical randomness
      const z = Math.sin(angle) * r;
      posArray.push(x, y + 5.5, z); // y adjusted to float around top layer
    }
    return new Float32Array(posArray);
  }, [radius, count, spread]);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.1} sizeAttenuation />
    </points>
  );
}
