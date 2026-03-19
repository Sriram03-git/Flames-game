import React, { useState, useEffect } from "react";
// @ts-ignore
import { motion } from "framer-motion";
import { ThemeType } from "../types/index";
import { getThemeConfig } from "../utils/flamesCalculator";

interface AnimatedBackgroundProps {
  theme: ThemeType;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  theme,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const themeConfig = getThemeConfig(theme);

  useEffect(() => {
    // Generate particles for animation
    const newParticles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 0.5,
    }));

    setParticles(newParticles);
  }, [theme]);

  const getParticleEmoji = (): string => {
    const emojiMap = {
      love: "❤️",
      marriage: "🌸",
      friends: "🎉",
      enemies: "💔",
      affection: "✨",
      siblings: "👫",
      default: "✨",
    };
    return emojiMap[theme] || emojiMap.default;
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`absolute inset-0 bg-gradient-to-br ${themeConfig.gradient}`}
      />

      {/* Animated Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute top-1/3 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: `${particle.x}%`,
            y: "100%",
            opacity: 0,
          }}
          animate={{
            y: "-100%",
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute text-3xl"
        >
          {theme === "enemies" ? (
            <span className="animate-shake inline-block">⚡</span>
          ) : (
            getParticleEmoji()
          )}
        </motion.div>
      ))}

      {/* Shine Effect */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 pointer-events-none"
      />
    </div>
  );
};
