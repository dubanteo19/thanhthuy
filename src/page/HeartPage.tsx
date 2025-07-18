import { AtomicParticles } from "@/components/ui/AtomicParticles";
import BirthdayCake3D from "@/components/ui/BirthdayCake3D";
import FadingMessageSequence from "@/components/ui/FadingMessageSequence";
import { FireworkShow } from "@/components/ui/FireworkShow";
import { FloatingTextField } from "@/components/ui/FloatingTextField";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useEffect, useRef, useState } from "react";
import { Controls } from "./control";
import { FloatingImageField } from "@/components/ui/FloatingImageField";
export const HeartPage = () => {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const z = isMobile ? 10 : 8;
  const softAudioRef = useRef<HTMLAudioElement | null>(null);
  const birthdayAudioRef = useRef<HTMLAudioElement | null>(null);

  const [showMessages, setShowMessages] = useState(false);
  const [showfloatingMessages, setShowfloatingMessages] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "m") {
        softAudioRef.current?.pause();
        setShowMessages((prev) => !prev);
      }
      if (e.key.toLowerCase() === "l") {
        setShowMessages((prev) => !prev);
        softAudioRef.current!.currentTime = 10;
        softAudioRef.current?.play();
      }
      if (e.key.toLowerCase() === "n") {
        birthdayAudioRef.current?.play();
        setShowfloatingMessages(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  const messages = [
    " Happy Birthday, Thanh Thúy! ",
    " Chúc mừng sinh nhật Thanh Thúy ",
    " Sinh nhật dui dẻ nhaaa ",
    " Đàn em Hary chúc mừng sinh nhật nè!",
    " Chúc chị luôn xinh đẹp và hạnh phúc!",
    " Chúc chị gặp nhiều may mắn và thành công!",
    " Trăm năm hạnh phúc",
    " Trẻ mãi không già",
  ];
  const images = ["img1i.jpg", "img2i.jpg", "img3i.jpg", "img4i.jpg",
    "img5i.jpg",
    "img6i.jpg",
    "img7i.jpg",
    "img8i.jpg",
    "img9i.jpg",
    "img10i.jpg",
  ];
  return (
    <div className="bg-black h-screen w-screen p-5 overflow-hidden">
      <Canvas camera={{ position: [0, 0, z], fov: 50, rotation: [1, 0, 0] }}>
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

        {showfloatingMessages && <FloatingTextField phrases={messages} />}
        {showMessages && <FadingMessageSequence messages={messages} />}
        <FloatingImageField imageUrls={images} />
        <AtomicParticles count={500} />
        <BirthdayCake3D />
        <FireworkShow />
        <Controls />
      </Canvas>
      <audio ref={softAudioRef} src="/intro.mp3" preload="auto" />
      <audio ref={birthdayAudioRef} src="/main.mp3" preload="auto" />
    </div>
  );
};
