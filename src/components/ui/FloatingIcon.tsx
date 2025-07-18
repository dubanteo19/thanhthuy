import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
export function FloatingIcon({
  position,
  icon = "🎈",
}: {
  position: [number, number, number];
  icon?: string;
}) {
  const ref = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y += 0.01;
      ref.current.rotation.y = Math.sin(t + ref.current.position.x) * 0.3;
    }
  });

  return (
    <group ref={ref} position={position}>
      <Html center>
        <span style={{ fontSize: "32px" }}>{icon}</span>
      </Html>
    </group>
  );
}
