import { Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Group, PointLight } from "three";
import { FallingCandle } from "./FallingCandle";
import { ParticleRing } from "./ParticleRing";

export default function BirthdayCake3D() {
  const cakeRef = useRef<Group>(null);
  const flameRef = useRef<PointLight[]>([]);
  const [dropCandles, setDropCandles] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "m") {
        setDropCandles(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  useFrame(() => {
    if (cakeRef.current) {
      cakeRef.current.rotation.y += 0.003;
    }
    flameRef.current.forEach((flame, index) => {
      const flicker = 0.3 + Math.sin(performance.now() * 0.005 + index) * 0.1;
      flame.intensity = flicker;
    });
  });

  const candlePositions: [number, number, number][] = [];
  const radius = 3.2;
  const height = 6;
  const candleCount = 10;

  for (let i = 0; i < candleCount; i++) {
    const angle = (i / candleCount) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    candlePositions.push([x, height, z]);
  }

  return (
    <group ref={cakeRef} position={[0, -6, -20]}>
      {/* Cake Layers */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[6, 6, 2, 32]} />
        <meshStandardMaterial color="#ff9999" />
      </mesh>
      <mesh position={[0, 2.5, 0]}>
        <cylinderGeometry args={[5, 5, 1, 32]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      <mesh position={[0, 4, 0]}>
        <cylinderGeometry args={[4, 4, 2, 32]} />
        <meshStandardMaterial color="#ff9999" />
      </mesh>
      <mesh position={[0, 5.3, 0]}>
        <cylinderGeometry args={[3.5, 3.5, 0.5, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Candles Around Top Layer */}
      {candlePositions.map((pos, idx) => (
        <FallingCandle
          drop={dropCandles}
          key={idx}
          index={idx}
          position={pos}
          flameRef={flameRef}
        />
      ))}

      {/* "22" Candle in Center */}
      <group position={[0, 6.7, 0]}>
        <Text3D
          font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json" // ✅ make sure this path is correct
          size={1.5}
          height={0.3}
          position={[-1.5, -1, 0]}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelSegments={4}
        >
          2
          <meshStandardMaterial emissive="hotpink" emissiveIntensity={2} />
        </Text3D>
        <Text3D
          font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
          size={1.5}
          height={0.3}
          position={[0.5, -1, 0]}
          curveSegments={8}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelSegments={4}
        >
          2
          <meshStandardMaterial emissive="hotpink" emissiveIntensity={2} />
        </Text3D>

        {/* Optional Flame Lights */}
        <pointLight position={[-0.4, 1.2, 0]} intensity={1.5} color="orange" />
        <pointLight position={[0.4, 1.2, 0]} intensity={1.5} color="orange" />
      </group>

      <ParticleRing />
    </group>
  );
}
