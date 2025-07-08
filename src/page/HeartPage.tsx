import { AtomicParticles } from "@/components/ui/AtomicParticles";
import { FloatingTextField } from "@/components/ui/FloatingTextField";
import { HeartSpawner } from "@/components/ui/HeartSpawner";
import { useHeartData } from "@/hooks/useHeartData";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useRef } from "react";
import { Controls } from "./control";
export const HeartPage = () => {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const z = isMobile ? 10 : 3;
  const musicRef = useRef<HTMLAudioElement>(null);

  const { musicUrl, messages } = useHeartData();

  const play = () => {
    if (musicRef.current) {
      musicRef.current.play();
    }
  };

  return (
    <div
      className="bg-black h-screen w-screen p-5 overflow-hidden"
      onClick={play}
    >
      <Canvas camera={{ position: [0, 0, z], fov: 50 }}>
        <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
        <EffectComposer>
          <Bloom
            intensity={2.5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <FloatingTextField phrases={messages} />
        <HeartSpawner />
        <AtomicParticles count={200} />
        <Controls />
      </Canvas>
      <audio loop src={musicUrl} ref={musicRef} />
    </div>
  );
};
