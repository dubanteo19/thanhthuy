import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Mesh, Points } from "three";
import { Text } from "@react-three/drei";
interface HeartParticlesProps {
  count?: number;
}

export default function HeartParticles({
  count = 100000,
}: HeartParticlesProps) {
  const pointsRef = useRef<Points>(null);
  const textRef = useRef<Mesh>(null); // Ref for animating text

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
    const texture = new THREE.TextureLoader().load("/heart.png");
    return new THREE.PointsMaterial({
      size: 0.05,
      map: texture,
      transparent: true,
      alphaTest: 0.5,
      depthWrite: false,
    });
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = 1 + 0.1 * Math.sin(t * 3);

    if (pointsRef.current) {
      pointsRef.current.rotation.set(0, t * 0.5, 0); // Y-axis rotation
      pointsRef.current.scale.set(pulse, pulse, pulse); // pulsing
    }
    if (textRef.current) {
      textRef.current.position.y = +t;
    }
  });

  return (
    <>
      <points ref={pointsRef} geometry={geometry} material={material} />
      <Text position={[0, 5, -10]} fontSize={2} color="yellow" ref={textRef}>
        Dbt19
      </Text>
    </>
  );
}

function isInsideHeart(x: number, y: number, z: number): boolean {
  const a = x * x + (9 / 4) * y * y + z * z - 1;
  return a * a * a - x * x * z * z * z - (9 / 80) * y * y * z * z * z < 0;
}
