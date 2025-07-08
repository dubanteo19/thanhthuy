import { Button } from "@/components/ui/button";
import { useState, type ChangeEvent } from "react";
import QRCode from "react-qr-code";

export const QCGeneratorPage = () => {
  const [title, setTitle] = useState<string>("");
  const [messages, setMessages] = useState<string>("");
  const [music, setMusic] = useState<string>("music/phepmau.mp3");
  const [generatedUrl, setGeneratedUrl] = useState<string>("");

  const handleGenerate = () => {
    const params = new URLSearchParams();
    if (title) params.append("title", title);
    if (messages) params.append("messages", messages.split("\n").join("|"));
    if (music) params.append("music", music);

    const url = `${window.location.origin}/love?${params.toString()}`;
    setGeneratedUrl(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-pink-600">
          🎁 Thay lời muốn nói
        </h2>

        <div className="space-y-2">
          <label className="text-gray-700 font-medium">💌 Tiêu đề</label>
          <input
            type="text"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            placeholder="Ví dụ: I love you"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
          />
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 font-medium">📝 Lời nhắn</label>
          <p className=" text-pink-500">Mỗi dòng là một lời nhắn, ví dụ:</p>
          <p className="text-sm text-gray-400">
            Mình thích bạn vì bạn rất dễ thương 💖
            <br />
            Cảm ơn bạn đã luôn bên mình
            <br />
            Chúc bạn một ngày vui vẻ!
          </p>
          <textarea
            value={messages}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setMessages(e.target.value)
            }
            placeholder="Nhập lời nhắn của bạn..."
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
          />
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 font-medium">🎵 Chọn nhạc</label>
          <select
            value={music}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setMusic(e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
          >
            <option value="music/phepmau.mp3">Phép Màu</option>
            <option value="music/love.mp3">Love</option>
            <option value="music/dream.mp3">Dream</option>
          </select>
        </div>

        <div className="text-center">
          <Button
            disabled={!title || !messages}
            onClick={handleGenerate}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            📦 Generate QR
          </Button>
        </div>

        {generatedUrl && (
          <div className="mt-10 p-6 bg-gray-50 border border-pink-200 rounded-xl shadow-inner text-center space-y-4">
            <p className="text-lg font-semibold text-gray-700">
              📲 Scan or share:
            </p>
            <div className="inline-block bg-white p-4 rounded-xl shadow-md">
              <QRCode value={generatedUrl} size={200} />
            </div>
            <p className="text-sm text-gray-500 break-words">{generatedUrl}</p>
          </div>
        )}
      </div>
    </div>
  );
};
