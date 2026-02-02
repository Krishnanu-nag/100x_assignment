export default function useSpeechSynthesis(setStatus) {
  const speak = (text) => {
    if (!window.speechSynthesis) return;

    // 🔇 stop any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // ✅ Calm, natural settings
    utterance.rate = 1;   // slower = more natural
    utterance.pitch = 1.0;  // flat pitch
    utterance.volume = 1;

    // ✅ Prefer a simple English voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find(v =>
        v.lang === "en-US" &&
        (v.name.includes("Google") || v.name.includes("Male"))
      ) || voices.find(v => v.lang === "en-US");

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setStatus("Speaking...");
    utterance.onend = () => setStatus("Tap to know me well");
    utterance.onerror = () => setStatus("Tap to know me well");

    window.speechSynthesis.speak(utterance);
  };

  return speak;
}
