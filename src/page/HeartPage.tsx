import { AtomicParticles } from "@/components/ui/AtomicParticles";
import { FloatingImageField } from "@/components/ui/FloatingImageField";
import { FloatingTextField } from "@/components/ui/FloatingTextField";
import { HeartSpawner } from "@/components/ui/HeartSpawner";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useRef } from "react";
import { Controls } from "./control";
export const HeartPage = () => {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const z = isMobile ? 10 : 3;
  const musicRef = useRef<HTMLAudioElement>(null);

  const messages = [
    "Tốt nghiệp dui dẻ!",
    "Đàn em Hary chúc mừng tốt nghiệp nè!",
    "Happy graduation!",
    "Chúc mừng ra trường nhé!",
    "Cuối cùng cũng xong rồi, giỏi quá!",
    "Bay màu đại học rồi đó!",
    "Học xong rồi, giờ tới công chuyện!",
    "Congrats, cử nhân mới!",
    "Chào tạm biệt deadline nhé!",
    "Tốt nghiệp thành công mỹ mãn!",
    "Bạn đã làm được, tuyệt vời lắm!",
    "Mặc áo cử nhân là auto đẹp!",
    "Bằng cấp đã về tay!",
    "Một hành trình khép lại, một cánh cửa mở ra!",
  ];

  const musicUrl = "music/song1.mp3";
  const play = () => {
    if (musicRef.current) {

      musicRef.current.currentTime  = 92;
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
        <FloatingImageField
          imageUrls={[
            "/img1i.jpg",
            "/img2i.jpg",
            "/img3i.jpg",
            "/img3i.jpg",
            "/img4i.jpg",
            "/img5i.jpg",
            "/img6i.jpg",
            "/img7i.jpg",
            "/img8i.jpg",
            "/img9i.jpg",
            "/img10i.jpg",
          ]}
        />
        <HeartSpawner />
        <AtomicParticles count={200} />
        <Controls />
      </Canvas>
      <audio loop src={musicUrl} ref={musicRef} />
    </div>
  );
};
