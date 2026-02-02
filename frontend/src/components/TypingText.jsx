import { useEffect, useState } from "react";

export default function TypingText({ text }) {
  const [out, setOut] = useState("");

  useEffect(() => {
    if (!text) {
      setOut("");
      return;
    }

    const words = text.split(" ");
    let i = 0;
    setOut("");

    const interval = setInterval(() => {
      if (i >= words.length) {
        clearInterval(interval);
        return;
      }
      setOut(prev => prev + (i === 0 ? "" : " ") + words[i]);
      i++;
    }, 150);

    return () => clearInterval(interval);
  }, [text]);

  return <div className="typing-text">{out}</div>;
}
