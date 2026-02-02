import { motion } from "framer-motion";

export default function VoiceOrb({ status }) {
  const isActive = status !== "Idle";

  return (
    <motion.div
      animate={{
        scale: status === "Speaking..." ? [1, 1.15, 1] : 1,
        boxShadow: isActive
          ? "0 0 60px rgba(99,102,241,0.8)"
          : "0 0 30px rgba(99,102,241,0.4)"
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="w-48 h-48 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center"
    >
      {/* <div className="text-center">
        <p className="text-xl font-semibold text-white">Krishnanu Nag</p>
        <p className="text-xs text-white/70">Voice Assistant</p>
      </div> */}
    </motion.div>
  );
}
