import { useRef } from "react";

export default function useSpeechRecognition(onResult, setStatus, onStart) {
  const recognitionRef = useRef(null);

  const startListening = () => {
    // 🔇 stop speech + 🧹 clear UI
    if (onStart) onStart();

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported");
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;

      recognition.onstart = () => {
        setStatus("Listening...");
      };

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        onResult(text);
      };

      recognition.onend = () => {};

      recognitionRef.current = recognition;
    }

    recognitionRef.current.start();
  };

  return { startListening };
}
