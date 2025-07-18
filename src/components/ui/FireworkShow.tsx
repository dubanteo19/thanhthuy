import { useState, useEffect } from "react";
import { FireworkExplosion } from "./FireworkExplosion"; // your updated firework
import * as THREE from "three";

interface FireworkData {
  id: number;
  origin: [number, number, number];
  color: string;
}

export function FireworkShow() {
  const [fireworks, setFireworks] = useState<FireworkData[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const count = Math.floor(Math.random() * 3) + 1; // 1 to 3 fireworks
      const newFireworks: FireworkData[] = [];

      for (let i = 0; i < count; i++) {
        newFireworks.push({
          id: counter + i,
          origin: [
            (Math.random() - 0.5) * 30, // x
            0,
            (Math.random() - 0.5) * 20, // z
          ],
          color: new THREE.Color(
            Math.random(),
            Math.random(),
            Math.random(),
          ).getStyle(),
        });
      }

      setFireworks((prev) => [...prev, ...newFireworks]);
      setCounter((prev) => prev + count);
    }, 2500); // launch every 1.5s randomly

    return () => clearInterval(interval);
  }, [counter]);

  const handleComplete = (id: number) => {
    setFireworks((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <>
      {fireworks.map((f) => (
        <FireworkExplosion
          key={f.id}
          origin={f.origin}
          color={f.color}
          onComplete={() => handleComplete(f.id)}
        />
      ))}
    </>
  );
}
