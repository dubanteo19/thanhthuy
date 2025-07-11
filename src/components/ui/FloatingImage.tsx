// FloatingImage.tsx
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export const FloatingImage = ({
  texture,
  initialPosition,
  speed,
  size,
}: {
  texture: THREE.Texture;
  initialPosition: THREE.Vector3;
  speed: number;
  size: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const position = useRef<THREE.Vector3>(initialPosition.clone());

  useFrame(() => {
    position.current.y += speed * 0.01;
    if (position.current.y > 10) {
      position.current.y = -10 - Math.random() * 5;
    }

    if (meshRef.current) {
      meshRef.current.position.copy(position.current);
    }
  });

  return (
    <mesh ref={meshRef} position={position.current}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
};
