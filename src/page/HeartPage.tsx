import HeartParticles from "@/components/ui/heart";
import { PointerLockControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
const Controls = () => {
  const { camera } = useThree();

  const keys = useRef<Record<string, boolean>>({
    KeyW: false,
    KeyA: false,
    KeyS: false,
    KeyD: false,
    Space: false,
    ShiftLeft: false,
    ShiftRight: false,
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code in keys.current) keys.current[e.code] = true;
    };
    const up = (e: KeyboardEvent) => {
      if (e.code in keys.current) keys.current[e.code] = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);
  useFrame((_, delta) => {
    const speed = 3;
    const move = new THREE.Vector3();

    /* camera‑local forward vector (y projected out) */
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    /* camera‑local right vector — rotate forward 90° around Y */
    const right = new THREE.Vector3(-forward.z, 0, forward.x);

    const k = keys.current;

    if (k.KeyW) move.add(forward);
    if (k.KeyS) move.sub(forward);
    if (k.KeyD) move.add(right); // guaranteed right
    if (k.KeyA) move.sub(right); // guaranteed left
    if (k.Space) move.y += 1;
    if (k.ShiftLeft || k.ShiftRight) move.y -= 1;

    if (move.lengthSq() !== 0) {
      move.normalize().multiplyScalar(speed * delta);
      camera.position.add(move);
    }
  });

  return <PointerLockControls />;
};
export const HeartPage = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="bg-white h-screen w-screen p-5 overflow-hidden">
      <Canvas
        onClick={handleClick}
        camera={{ position: [0, 0, 1], fov: 50 }}
        className="cursor-pointer"
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} />
        <HeartParticles />
        <Controls />
      </Canvas>
      <audio ref={audioRef} src="/my-love/music/piano.mp3" />
    </div>
  );
};
