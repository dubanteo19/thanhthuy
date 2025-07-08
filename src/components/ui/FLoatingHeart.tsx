import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, type FC } from "react";

interface FloatingHeartProps {
  position: [number, number, number];
  /** Optionally override speeds */
  riseMin?: number; // default 0.003–0.01
  riseMax?: number;
  spinMin?: number; // default 0.005–0.03
  spinMax?: number;
}

export const FloatingHeart: FC<FloatingHeartProps> = ({
  position,
  riseMin = 0.003,
  riseMax = 0.01,
  spinMin = 0.005,
  spinMax = 0.03,
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  /* ---------- random heart shape ---------- */
  const heartShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.25);
    s.bezierCurveTo(0, 0.5, -0.35, 0.5, -0.35, 0.25);
    s.bezierCurveTo(-0.35, 0, 0, -0.2, 0, -0.35);
    s.bezierCurveTo(0, -0.2, 0.35, 0, 0.35, 0.25);
    s.bezierCurveTo(0.35, 0.5, 0, 0.5, 0, 0.25);
    return s;
  }, []);

  const geometry = useMemo(
    () => new THREE.ShapeGeometry(heartShape),
    [heartShape],
  );

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "red",
        emissive: "red",
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      }),
    [],
  );

  /* ---------- per‑instance random speeds ---------- */
  const riseSpeed = useMemo(
    () => THREE.MathUtils.randFloat(riseMin, riseMax),
    [riseMin, riseMax],
  );
  const spinSpeed = useMemo(
    () => THREE.MathUtils.randFloat(spinMin, spinMax),
    [spinMin, spinMax],
  );

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.position.y += riseSpeed;
    meshRef.current.rotation.y += spinSpeed;
    if (meshRef.current.position.y > 10) {
      meshRef.current.position.y = -5 - Math.random() * 5;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={position}
      scale={[0.2, 0.2, 0.2]}
    />
  );
};
