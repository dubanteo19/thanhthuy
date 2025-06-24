import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Points } from "three";

interface HeartParticlesProps {
  count?: number;
}

export default function HeartParticles({
  count = 100000,
}: HeartParticlesProps) {
  const pointsRef = useRef<Points>(null);

  const geometry = useMemo(() => {
    const positions: number[] = [];
    let attempts = 0;

    while (positions.length < count * 3 && attempts < count * 10) {
      const x = (Math.random() * 2 - 1) * 1.5;
      const y = (Math.random() * 2 - 1) * 1.5;
      const z = (Math.random() * 2 - 1) * 1.5;

      if (isInsideHeart(x, y, z)) {
        positions.push(x * 1.4, y * 1.4, z * 1.4);
      }

      attempts++;
    }

    const buffer = new Float32Array(positions);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(buffer, 3));

    geometry.rotateX(Math.PI / -2); // Make heart stand up

    return geometry;
  }, [count]);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      color: 0xff4d6d,
      size: 0.012,
      transparent: true,
      opacity: 0.9,
    });
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = 1 + 0.1 * Math.sin(t * 3);

    if (pointsRef.current) {
      pointsRef.current.rotation.set(0, t * 0.5, 0); // Y-axis rotation
      pointsRef.current.scale.set(pulse, pulse, pulse); // pulsing
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

function isInsideHeart(x: number, y: number, z: number): boolean {
  const a = x * x + (9 / 4) * y * y + z * z - 1;
  return a * a * a - x * x * z * z * z - (9 / 80) * y * y * z * z * z < 0;
}
