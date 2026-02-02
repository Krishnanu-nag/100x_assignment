import { motion } from "framer-motion";
import micIcon from "../assets/mic.png";

export default function MicButton({ onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      aria-label="Start voice input"
    >
      <img
        src={micIcon}
        alt="Microphone"
        className="mic-btn"
      />
    </motion.button>
  );
}
