import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { FloatingIcon } from "./FloatingIcon";

const ICONS = ["🎈", "🎂", "🎁", "🎉", "❤️", "🥳"];

export function BirthdaySpawner() {
  const startTime = useRef<number | null>(null);
  const [spawnedCount, setSpawnedCount] = useState(0);

  // Predefine positions + icons for consistent spawning
  const [items] = useState(() =>
    [...Array(200)].map(() => ({
      position: [
        Math.random() * 10 - 5,
        -2 + Math.random() * 2,
        Math.random() * -3,
      ] as [number, number, number],
      icon: ICONS[Math.floor(Math.random() * ICONS.length)],
    })),
  );

  const lastSpawnTime = useRef(0);
  const spawnDelay = 0.1;

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    if (startTime.current === null) {
      startTime.current = elapsed;
      return;
    }

    const timeSinceStart = elapsed - startTime.current;

    if (timeSinceStart < 2) return;
    if (
      spawnedCount < items.length &&
      elapsed - lastSpawnTime.current > spawnDelay
    ) {
      lastSpawnTime.current = elapsed;
      setSpawnedCount((count) => count + 1);
    }
  });

  return (
    <>
      {items.slice(0, spawnedCount).map((item, i) => (
        <FloatingIcon key={i} position={item.position} icon={item.icon} />
      ))}
    </>
  );
}
