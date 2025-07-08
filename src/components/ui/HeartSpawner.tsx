import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { FloatingHeart } from "./FLoatingHeart";

export function HeartSpawner() {
  const startTime = useRef<number | null>(null);
  const [spawnedCount, setSpawnedCount] = useState(0);
  const [positions] = useState(() =>
    [...Array(200)].map(
      () =>
        [
          Math.random() * 10 - 5,
          -1 + Math.random() * 2,
          Math.random() * -10,
        ] as [number, number, number],
    ),
  );

  const lastSpawnTime = useRef(0); // Time of the last spawn
  const spawnDelay = 0.1; // Delay between spawns in seconds (e.g., 0.1 = 100ms)

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    if (startTime.current === null) {
      startTime.current = elapsed;
      return;
    }

    const timeSinceStart = elapsed - startTime.current;

    if (timeSinceStart < 2) return;
    if (
      spawnedCount < positions.length &&
      elapsed - lastSpawnTime.current > spawnDelay
    ) {
      lastSpawnTime.current = elapsed;
      setSpawnedCount((count) => count + 1);
    }
  });

  return (
    <>
      {positions.slice(0, spawnedCount).map((pos, i) => (
        <FloatingHeart key={i} position={pos} />
      ))}
    </>
  );
}
