import { forwardRef } from "react";
import * as THREE from "three";

export const FloatingImage = forwardRef<
  THREE.Mesh,
  {
    texture: THREE.Texture;
    angle: number;
    radius: number;
    y: number;
    speed: number;
    size: number;
    mode: "float" | "heart";
  }
>(({ texture, size }, ref) => {
  return (
    <mesh ref={ref}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
});
