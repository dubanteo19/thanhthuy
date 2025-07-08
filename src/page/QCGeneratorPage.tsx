import { Button } from "@/components/ui/button";
import { QRPreview } from "@/components/ui/QRPreview";
import { useState, type ChangeEvent } from "react";

export const QCGeneratorPage = () => {
  const [title, setTitle] = useState<string>("");
  const [messages, setMessages] = useState<string>(
    "Anh nhớ em\nEm là cả thế giới của anh",
  );
  const [music, setMusic] = useState<string>("music/phepmau.mp3");
  const [generatedUrl, setGeneratedUrl] = useState<string>("");
  const audioOptions = [
    { label: "Phép Màu", value: "music/phepmau.mp3" },
    { label: "Ánh Nắng Của Anh", value: "music/anhnangcuaanh.mp3" },
    { label: "Hơn Cả Yêu", value: "music/honcayeu.mp3" },
    { label: "Nơi Này Có Anh", value: "music/noinaycoanh.mp3" },
    { label: "Sau Tất Cả", value: "music/sautatca.mp3" },
    { label: "Em Gái Mưa", value: "music/emgaimua.mp3" },
    { label: "Anh sai rồi", value: "music/anhsairoi.mp3" },
    { label: "Về bên anh", value: "music/vebenanh.mp3" },
    { label: "Tháng Tư Là Lời Nói Dối Của Em", value: "music/thangtu.mp3" },
    { label: "Phút ban đầu", value: "music/phutbandau.mp3" },
  ];
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
          <p className=" text-pink-500">Mỗi dòng là một lời nhắn</p>
          <textarea
            value={messages}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setMessages(e.target.value)
            }
            placeholder="Nhập lời nhắn của bạn..."
            className="w-full h-42 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
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
            {audioOptions.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
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
          <div className="mt-10 p-6 bg-gray-50  border border-pink-200 rounded-xl shadow-inner text-center space-y-4">
            <p className="text-lg font-semibold text-gray-700">
              📲 Scan or share:
            </p>
            <QRPreview value={generatedUrl} />
          </div>
        )}
      </div>
    </div>
  );
};
