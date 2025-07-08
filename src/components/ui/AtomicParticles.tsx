import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type Particle = {
  velocity: THREE.Vector3;
};

export function AtomicParticles({ count = 300 }: { count?: number }) {
  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const particles = useMemo<Particle[]>(() => [], []);

  useMemo(() => {
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.12,
        (Math.random() - 0.5) * 0.12,
        (Math.random() - 0.5) * 0.12,
      );
      particles.push({ velocity });
    }
  }, [count, positions, particles]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.05,
        color: new THREE.Color(1, 1, 1),
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  const pointsRef = useRef<THREE.Points>(null!);

  useFrame(() => {
    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;

    for (let i = 0; i < count; i++) {
      let x = posAttr.getX(i);
      let y = posAttr.getY(i);
      let z = posAttr.getZ(i);

      const vel = particles[i].velocity;

      x += vel.x;
      y += vel.y;
      z += vel.z;

      const boundary = 20;
      if (x > boundary || x < -boundary) vel.x *= -1;
      if (y > boundary || y < -boundary) vel.y *= -1;
      if (z > boundary || z < -boundary) vel.z *= -1;

      posAttr.setXYZ(i, x, y, z);
    }

    posAttr.needsUpdate = true;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
