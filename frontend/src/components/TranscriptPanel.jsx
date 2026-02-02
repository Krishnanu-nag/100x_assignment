import { motion, AnimatePresence } from "framer-motion";
import TypingText from "./TypingText";

export default function TranscriptPanel({ question, answer, typingSpeed }) {
  return (
    <div className="mt-8 w-full flex justify-center">
      <div className="transcript-wrapper space-y-6">

        {/* Question */}
        <AnimatePresence>
          {question && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="question-card"
            >
              <span className="question-label">You asked</span>
              <p className="question-text">{question}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <br/>

        {/* Answer */}
        <AnimatePresence>
          {answer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="answer-card"
            >
              <TypingText text={answer} speed={typingSpeed} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
