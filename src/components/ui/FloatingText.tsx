import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, type FC } from "react";
import * as THREE from "three";

interface FloatingTextProps {
  content: string;
  size: number;
  initialPosition: THREE.Vector3;
  speed: number;
  glowColor: string;
}

export const FloatingText: FC<FloatingTextProps> = ({
  content,
  size,
  speed,
  initialPosition,
  glowColor,
}) => {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.y += 0.05 * speed;

      // Reset when too high
      if (ref.current.position.y > 10) {
        ref.current.position.y = -5 - Math.random() * 5;
      }
    }
  });

  return (
    <Text
      fontSize={size}
      ref={ref}
      position={initialPosition.clone()}
      rotation={[0, 0.3, 0]}
      color={"#ffffff"}
      anchorX="center"
      anchorY="middle"
    >
      {content}
      <meshStandardMaterial
        color="#ffffff"
        emissive={glowColor}
        emissiveIntensity={2}
        toneMapped={false}
      />
    </Text>
  );
};
