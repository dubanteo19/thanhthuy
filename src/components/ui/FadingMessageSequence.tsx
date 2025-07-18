import { Text } from "@react-three/drei";
import { useState, useEffect } from "react";

interface Props {
  messages: string[];
  duration?: number;
  position?: [number, number, number];
}

export default function FadingMessageSequence({
  messages,
  duration = 3,
  position = [0, 30, -20],
}: Props) {
  const [index, setIndex] = useState(0);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const fadeIn = setTimeout(() => setOpacity(1), 100);
    const fadeOut = setTimeout(() => setOpacity(0), duration * 1000 - 500);
    const next = setTimeout(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, duration * 1000);

    return () => {
      clearTimeout(fadeIn);
      clearTimeout(fadeOut);
      clearTimeout(next);
    };
  }, [index, messages, duration]);

  return (
    <Text
      position={position}
      rotation={[0.9, 0, 0]}
      fontSize={3.5}
      color="yellow"
      anchorX="center"
      anchorY="middle"
      fillOpacity={opacity}
    >
      {messages[index]}
    </Text>
  );
}
