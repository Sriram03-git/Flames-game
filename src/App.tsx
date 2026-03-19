import React, { useMemo } from "react";
// @ts-ignore
import { motion, AnimatePresence } from "framer-motion";
import { useFlames } from "./hooks/useFlames";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { FlamesForm } from "./components/FlamesForm";
import { ResultDisplay } from "./components/ResultDisplay";
import { ThemeType } from "./types/index";

function App(): React.ReactElement {
  const {
    input,
    result,
    resultData,
    isCalculating,
    handleInputChange,
    calculate,
    reset,
  } = useFlames();

  // Determine the theme based on the result
  const currentTheme: ThemeType = useMemo(() => {
    if (!resultData) return "default";
    return resultData.theme as ThemeType;
  }, [resultData]);

  const hasResult = result !== null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground theme={currentTheme} />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center gap-8"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-4 mb-4"
          >
            <motion.h1
              className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨ FLAMES ✨
            </motion.h1>
            <p className="text-gray-300 text-lg sm:text-xl">
              Discover the meaning of your connection
            </p>
          </motion.div>

          {/* Form and Result Container */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-6 w-full"
          >
            <AnimatePresence mode="wait">
              {!hasResult ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <FlamesForm
                    name1={input.name1}
                    name2={input.name2}
                    onName1Change={(value) => handleInputChange("name1", value)}
                    onName2Change={(value) => handleInputChange("name2", value)}
                    onCalculate={calculate}
                    isCalculating={isCalculating}
                    hasResult={hasResult}
                    onReset={reset}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center gap-6 w-full"
                >
                  <ResultDisplay
                    resultData={resultData}
                    isAnimating={!isCalculating && hasResult}
                  />

                  {/* Reset Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={reset}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                  >
                    Try Again
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Footer Info */}
          <motion.div
            variants={itemVariants}
            className="text-center text-gray-400 text-sm mt-8"
          >
            <p>
              FLAMES - Friends, Love, Affection, Marriage, Enemies, Siblings
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
