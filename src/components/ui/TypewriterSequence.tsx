import { Text } from "@react-three/drei";
import { useEffect, useState } from "react";

interface Props {
  messages: string[];
  speed?: number; // speed of typing
  pause?: number; // pause between messages
  position?: [number, number, number];
}

export default function TypewriterSequence({
  messages,
  speed = 100,
  pause = 1000,
  position = [0, 1, -5],
}: Props) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (currentMessageIndex >= messages.length) return;

    const currentMessage = messages[currentMessageIndex];

    if (charIndex < currentMessage.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentMessage[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      // Wait then move to the next message
      const timeout = setTimeout(() => {
        setCurrentMessageIndex((prev) => prev + 1);
        setDisplayedText("");
        setCharIndex(0);
      }, pause);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, currentMessageIndex, messages, speed, pause]);

  return (
    <Text
      position={position}
      fontSize={0.5}
      color="yellow"
      anchorX="center"
      anchorY="middle"
    >
      {displayedText}
    </Text>
  );
}
