import React from "react";
// @ts-ignore
import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";

interface FlamesFormProps {
  name1: string;
  name2: string;
  onName1Change: (value: string) => void;
  onName2Change: (value: string) => void;
  onCalculate: () => void;
  isCalculating: boolean;
  hasResult: boolean;
  onReset: () => void;
}

export const FlamesForm: React.FC<FlamesFormProps> = ({
  name1,
  name2,
  onName1Change,
  onName2Change,
  onCalculate,
  isCalculating,
  hasResult,
  onReset,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <GlassCard className="p-8 w-full max-w-md">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
        >
          FLAMES
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-center text-gray-300 text-sm"
        >
          Discover your relationship status ✨
        </motion.p>

        <motion.div variants={itemVariants} className="space-y-4">
          {/* Name 1 Input */}
          <div className="relative group">
            <input
              type="text"
              value={name1}
              onChange={(e) => onName1Change(e.target.value)}
              placeholder="Your name"
              disabled={isCalculating}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-white/60 focus:ring-2 focus:ring-pink-400/50 transition-all duration-300 disabled:opacity-50"
            />
            <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r from-pink-500/10 to-purple-500/10" />
          </div>

          {/* Name 2 Input */}
          <div className="relative group">
            <input
              type="text"
              value={name2}
              onChange={(e) => onName2Change(e.target.value)}
              placeholder="Their name"
              disabled={isCalculating}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-white/60 focus:ring-2 focus:ring-purple-400/50 transition-all duration-300 disabled:opacity-50"
            />
            <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r from-purple-500/10 to-blue-500/10" />
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div variants={itemVariants} className="flex gap-3 pt-4">
          {!hasResult ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCalculate}
              disabled={isCalculating}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCalculating ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  Calculating...
                </span>
              ) : (
                "Calculate"
              )}
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReset}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
            >
              Try Again
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </GlassCard>
  );
};
