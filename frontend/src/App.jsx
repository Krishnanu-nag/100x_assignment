import { useState, useEffect } from "react";
import VoiceOrb from "./components/VoiceOrb";
import MicButton from "./components/MicButton";
import TranscriptPanel from "./components/TranscriptPanel";
import useSpeechRecognition from "./hooks/useSpeechRecognition";
import useSpeechSynthesis from "./hooks/useSpeechSynthesis";
import { askGemini } from "./services/geminiService";

export default function App() {
  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState("Tap to know me well");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const speak = useSpeechSynthesis(setStatus);

  /* --------------------------------
     Stop speech on refresh + mount
  ----------------------------------*/
  useEffect(() => {
    const stopSpeech = () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };

    stopSpeech(); // stop on mount
    window.addEventListener("beforeunload", stopSpeech);

    return () => {
      stopSpeech();
      window.removeEventListener("beforeunload", stopSpeech);
    };
  }, []);

  /* --------------------------------
     Handle voice input result
  ----------------------------------*/
  const onResult = async (text) => {
    setQuestion(text);
    setStatus("Thinking...");

    const reply = await askGemini(text);

    setAnswer(reply);
    speak(reply);
  };

  /* --------------------------------
     Reset before listening
  ----------------------------------*/
  const onStartListening = () => {
    window.speechSynthesis.cancel();
    setQuestion("");
    setAnswer("");
  };

  const { startListening } = useSpeechRecognition(
    onResult,
    setStatus,
    onStartListening
  );

  /* --------------------------------
     Preload voices (Chrome)
  ----------------------------------*/
  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  /* --------------------------------
     LANDING PAGE
  ----------------------------------*/
  if (!started) {
    return (
      <div className="app">
        <h1 className="text-3xl font-semibold mb-4">
          Hi, I am Krishnanu Nag's Voice Bot
        </h1>

        <p className="text-gray-400 mb-8">
          Ask me anything about Krishnanu Nag
        </p>

        <button
          onClick={() => setStarted(true)}
          className="px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg"
        >
          Let’s get started
        </button>
      </div>
    );
  }

  /* --------------------------------
     VOICE BOT PAGE
  ----------------------------------*/
  return (
    <div className="app">
      <VoiceOrb status={status} />
      <p className="status">{status}</p>
      <MicButton onClick={startListening} />
      <br/>
      <TranscriptPanel
        question={question}
        answer={answer}
      />
    </div>
  );
}
