import { AtomicParticles } from "@/components/ui/AtomicParticles";
import { FloatingTextField } from "@/components/ui/FloatingTextField";
import { HeartSpawner } from "@/components/ui/HeartSpawner";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Controls } from "./control";
export const HeartPage = () => {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const z = isMobile ? 10 : 1;
  const musicRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [musicUrl, setMusicUrl] = useState("music/phepmau.mp3");
  const [messages, setMessages] = useState<string[]>([]);

  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("Untitled");
  useEffect(() => {
    const query = new URLSearchParams(search);
    const titleFromQuery = query.get("title");
    const musicFromQuery = query.get("music");
    const messagesFromQuery = query.get("messages");
    let didUpdate = false;
    if (titleFromQuery) {
      setTitle(titleFromQuery);
      localStorage.setItem("heart_title", titleFromQuery);
      didUpdate = true;
    }
    if (musicFromQuery) {
      setMusicUrl(musicFromQuery);
      localStorage.setItem("heart_music", musicFromQuery);
      didUpdate = true;
    }
    if (messagesFromQuery) {
      const splitMessages = messagesFromQuery.split("|");
      setMessages(splitMessages);
      localStorage.setItem("heart_messages", JSON.stringify(splitMessages));
      didUpdate = true;
    }

    if (didUpdate) {
      navigate(pathname, { replace: true });
    } else {
      const savedTitle = localStorage.getItem("heart_title");
      const savedMusic = localStorage.getItem("heart_music");
      const savedMessages = localStorage.getItem("heart_messages");

      if (savedTitle) setTitle(savedTitle);
      if (savedMusic) setMusicUrl(savedMusic);
      if (savedMessages) setMessages(JSON.parse(savedMessages));
    }
  }, [search, pathname, navigate]);

  useEffect(() => {
    document.title = title;
  }, [title]);

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
      <video
        ref={videoRef}
        src="video/video1.mp4"
        style={{ display: "none" }}
      />
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
      <audio src={musicUrl} ref={musicRef} />
    </div>
  );
};
