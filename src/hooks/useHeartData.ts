import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useHeartData() {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("Untitled");
  const [musicUrl, setMusicUrl] = useState("music/phepmau.mp3");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const query = new URLSearchParams(search);
    const titleFromQuery = query.get("title");
    const musicFromQuery = query.get("music");
    const messagesFromQuery = query.get("messages");
    let didUpdate = false;

    if (titleFromQuery) {
      setTitle(titleFromQuery);
      localStorage.setItem("heart_title", titleFromQuery);
      didUpdate = true;
    }

    if (musicFromQuery) {
      setMusicUrl(musicFromQuery);
      localStorage.setItem("heart_music", musicFromQuery);
      didUpdate = true;
    }

    if (messagesFromQuery) {
      const splitMessages = messagesFromQuery.split("|");
      setMessages(splitMessages);
      localStorage.setItem("heart_messages", JSON.stringify(splitMessages));
      didUpdate = true;
    }

    if (didUpdate) {
      navigate(pathname, { replace: true });
    } else {
      const savedTitle = localStorage.getItem("heart_title");
      const savedMusic = localStorage.getItem("heart_music");
      const savedMessages = localStorage.getItem("heart_messages");

      if (savedTitle) setTitle(savedTitle);
      if (savedMusic) setMusicUrl(savedMusic);
      if (savedMessages) setMessages(JSON.parse(savedMessages));
    }
  }, [search, pathname, navigate]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return { musicUrl, messages };
}
