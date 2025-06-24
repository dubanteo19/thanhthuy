import { Button } from "@/components/ui/button";
import { MinusIcon } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
export const HomePage = () => {
  const item = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };
  const [showBoxes, setShowBoxes] = useState(false);
  const [boxes, setBoxes] = useState<{ id: number; x: number; y: number }[]>(
    [],
  );
  const [showFinal, setShowFinal] = useState(false);
  const BOX_WIDTH = 250;
  const BOX_HEIGHT = 50;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const handleClick = () => {
    setShowBoxes(true);
    setBoxes([]);
    setShowFinal(false);
    if (audioRef.current) {
      audioRef.current.play();
    }
    let count = 0;
    const interval = setInterval(() => {
      if (count >= 40) {
        clearInterval(interval);
        setShowFinal(true);
        return;
      }
      setBoxes((prev) => [
        ...prev,
        {
          id: count,
          x: Math.random() * (window.innerWidth - BOX_WIDTH),
          y: Math.random() * (window.innerHeight - BOX_HEIGHT),
        },
      ]);

      count++;
    }, 300);
  };

  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col space-y-2 items-center p-5 "
    >
      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-semibold text-4xl"
      >
        Anh có điều muốn <br /> nói
      </motion.h2>

      <motion.div variants={item} className="h-6 text-center text-sm">
        <Typewriter
          options={{
            strings: [
              "Điều mà anh giấu bấy lâu",
              "Em có biết không?",
              "Có lẽ em đã biết rồi",
              "Hoặc giả em chưa biết ",
            ],
            autoStart: true,
            loop: true,
            deleteSpeed: 30,
            delay: 45,
          }}
        />
      </motion.div>
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.2 }}
        className="h-[400px] flex justify-center items-center"
      >
        <Button
          variant={"default"}
          className="text-black cursor-pointer"
          onClick={handleClick}
        >
          Nhấn vào đây nè
        </Button>
      </motion.div>
      <audio ref={audioRef} src="https://panbap.github.io/tranbonho/TBN.mp3" />
      {showBoxes &&
        boxes.map((box) => (
          <motion.div
            key={box.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute bg-white   p-2  shadow-lg w-[220px] rounded-2xl"
            style={{
              top: box.y,
              left: box.x,
            }}
          >
            <div className="relative  ">
              <h3 className="text-1xl font-bold text-center">Tràn ngập bộ</h3>
              <span className="absolute top-0 right-2">
                <MinusIcon />
              </span>
            </div>
            <div className="bg-primary flex justify-center items-center h-[120px] rounded-2xl">
              Nhớ nhớ nhớ em
            </div>
          </motion.div>
        ))}

      {showFinal && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="">
            <motion.div
              variants={item}
              onClick={() => navigate("/heart")}
              className="h-6 text-center text-5xl font-bold text-red-500"
            >
              <Typewriter
                options={{
                  strings: ["Nhấn", "Vào", "Trái tim", "❤️"],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 1,
                  delay: 5,
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
