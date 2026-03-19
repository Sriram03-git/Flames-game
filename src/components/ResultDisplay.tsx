import React from "react";
// @ts-ignore
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "./GlassCard";
import { FlamesResultData } from "../types/index";

interface ResultDisplayProps {
  resultData: FlamesResultData | null;
  isAnimating: boolean;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  resultData,
  isAnimating,
}) => {
  if (!resultData) return null;

  const letters = ["F", "L", "A", "M", "E", "S"];
  const resultChar = resultData.result;

  return (
    <AnimatePresence mode="wait">
      {resultData && (
        <motion.div
          key="result"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <GlassCard className="p-8 text-center space-y-6">
            {/* Slot Machine Animation */}
            <div className="space-y-4">
              <p className="text-gray-300 text-sm uppercase tracking-widest">
                Your Result
              </p>

              <div className="flex justify-center items-center gap-2 mb-6">
                {letters.map((letter, index) => (
                  <motion.div
                    key={letter}
                    animate={
                      isAnimating && letter === resultChar
                        ? {
                            y: [0, -20, 0],
                            scale: [1, 1.1, 1],
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.6,
                      delay: index * 0.05,
                      ease: "easeInOut",
                    }}
                    className={`text-lg font-bold px-3 py-2 rounded-lg transition-all duration-300 ${
                      letter === resultChar
                        ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white scale-110 shadow-lg shadow-pink-500/50"
                        : "bg-white/10 text-gray-400"
                    }`}
                  >
                    {letter}
                  </motion.div>
                ))}
              </div>

              {/* Result Emoji and Text */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-6xl mb-4"
              >
                {resultData.emoji}
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className={`text-4xl font-bold bg-gradient-to-r ${resultData.color} bg-clip-text text-transparent`}
              >
                {resultData.meaning}
              </motion.h2>
            </div>

            {/* Result Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white/5 rounded-lg p-4 border border-white/10"
            >
              <p className="text-gray-300 text-sm">
                {getResultMessage(resultData.result)}
              </p>
            </motion.div>

            {/* Heart Float Animation */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl"
            >
              {resultData.emoji}
            </motion.div>
          </GlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function getResultMessage(result: string | null): string {
  const messages = {
    F: "You're destined to be amazing friends! Build that friendship and cherish it. 🤝",
    L: "You have a special romantic connection! Love is in the air. ❤️",
    A: "There is genuine affection between you two! Treasure these feelings. 💜",
    M: "Marriage is written in the stars for you! A lifelong bond awaits. 💍",
    E: "It's complicated! But remember, anything can change with understanding. ⚡",
    S: "You're like siblings! A strong familial bond connects you. 👫",
  };

  return (
    messages[result as keyof typeof messages] ||
    "Try again to discover your connection!"
  );
}
