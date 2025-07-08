import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState, type FC, type RefObject } from "react";
import * as THREE from "three";

interface VideoPlaneProps {
  videoRef: RefObject<HTMLVideoElement>;
}
export const VideoPlane: FC<VideoPlaneProps> = ({ videoRef }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const { camera } = useThree();

  const [hasPlayed, setHasPlayed] = useState(false);

  const fadeStart = 8;
  const fadeEnd = 3;

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.loop = true;
    videoRef.current.crossOrigin = "anonymous";
    videoRef.current.muted = false;
    videoRef.current.playsInline = true;
  }, [videoRef]);

  const texture = videoRef.current
    ? new THREE.VideoTexture(videoRef.current)
    : null;

  useFrame(() => {
    if (!meshRef.current || !materialRef.current) return;

    const distance = meshRef.current.position.distanceTo(camera.position);

    const opacity = THREE.MathUtils.clamp(
      1 - (distance - fadeEnd) / (fadeStart - fadeEnd),
      0,
      1,
    );
    materialRef.current.opacity = opacity;

    if (distance < 10 && !hasPlayed && videoRef.current) {
      videoRef.current
        .play()
        .then(() => setHasPlayed(true))
        .catch(console.error);
    }
  });

  if (!texture) return null;
  return (
    <mesh ref={meshRef} position={[0, 0, -7]}>
      <planeGeometry args={[5, 6]} />
      <meshBasicMaterial
        ref={materialRef}
        map={texture}
        toneMapped={false}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};
