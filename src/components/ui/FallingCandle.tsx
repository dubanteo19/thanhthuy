import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Mesh, Group, PointLight } from "three";

export function FallingCandle({
  index,
  position,
  flameRef,
  drop,
  dropDelay = 1, // seconds between each drop
}: {
  index: number;
  position: [number, number, number];
  flameRef: React.MutableRefObject<PointLight[]>;
  dropDelay?: number;
    drop:boolean,
}) {
  const groupRef = useRef<Group>(null!);
  const velocity = useRef(0);
  const [dropped, setDropped] = useState(false);
  const [y, setY] = useState(50); // Start high above

  const groundY = position[1];

  useEffect(() => {
    if (drop && !dropped) {
      const timer = setTimeout(() => setDropped(true), index * dropDelay * 100); // Slight stagger
      return () => clearTimeout(timer);
    }
  }, [drop, dropped, index, dropDelay]);

  useFrame(() => {
    if (!dropped || !groupRef.current) return;

    if (y > groundY) {
      velocity.current += 0.005; // acceleration
      const newY = Math.max(y - velocity.current, groundY);
      setY(newY);
    }
  });

  return (
    <group ref={groupRef} position={[position[0], y, position[2]]}>
      {/* Candle body */}
      <mesh>
        <cylinderGeometry args={[0.1, 0.1, 1, 16]} />
        <meshStandardMaterial emissive="#87cefa" />
      </mesh>

      {/* Flame */}
      <Flame />

      {/* Glow */}
      <pointLight
        ref={(el) => (flameRef.current[index] = el!)}
        color="orange"
        intensity={0.5}
        distance={3}
        position={[0, 0.8, 0]}
      />
    </group>
  );
}

function Flame() {
  const flameRef = useRef<Mesh>(null!);

  useFrame(() => {
    if (flameRef.current) {
      const scaleY = 1 + Math.sin(performance.now() * 0.02) * 0.3;
      flameRef.current.scale.set(0.15, scaleY * 0.4, 0.15);
    }
  });

  return (
    <Float floatIntensity={0.5} speed={2}>
      <mesh ref={flameRef} position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color="orange"
          emissive="orange"
          emissiveIntensity={2}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}
