import HeartParticles from "@/components/ui/thorn-heart";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";

export const HeartPage = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  return (
    <div className="bg-white h-screen w-screen p-5 overflow-hidden">
      <h2 className="text-center font-bold text-4xl mt-2">
        Em giữ trái tim này nhé
      </h2>
      <Canvas onClick={handleClick} camera={{ position: [0, 0, 5], fov: 50 }} className="cursor-pointer">
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} />
        <HeartParticles />
        <OrbitControls enableZoom={false} />
      </Canvas>
      <audio ref={audioRef} src="https://panbap.github.io/heart02/mt.mp3" />
    </div>
  );
};
