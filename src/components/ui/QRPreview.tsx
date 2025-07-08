import { QRCodeCanvas } from "qrcode.react";
import { useRef, useState } from "react";
import domtoimage from "dom-to-image-more";
import { Button } from "./button";
export const QRPreview = ({ value }: { value: string }) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState("#ec4899"); // pink

  const handleDownload = async () => {
    if (!frameRef.current) return;
    try {
      const dataUrl = await domtoimage.toPng(frameRef.current);
      const link = document.createElement("a");
      link.download = "qr-code.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return (
    <div className="text-center space-y-4 flex-col flex items-center">
      <div className="flex flex-col justify-center items-center">
        <label>Chọn màu nè</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-10 h-10 rounded-full border"
        />
      </div>

      <div
        ref={frameRef}
        className="inline-block bg-pink-100 p-4 pt-6 rounded-3xl shadow-lg relative border-4 border-dashed border-pink-300"
      >
        {/* Bow or decoration */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xl">
          🎀
        </div>

        <QRCodeCanvas
          value={value}
          size={200}
          bgColor="#ffffff"
          fgColor={color}
          level="H"
        />

        {/* Label below QR code */}
        <div className="mt-2 text-sm text-pink-800 font-medium">
          💖 Quét ở đây nè 💖
        </div>
      </div>

      <Button
        onClick={handleDownload}
        className="bg-pink-500 hover:bg-pink-600 text-white  shadow"
      >
        Tải xuống QR nè
      </Button>
    </div>
  );
};
