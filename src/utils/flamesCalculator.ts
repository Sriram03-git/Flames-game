import { FlamesResult, FlamesResultData, ThemeType } from "../types/index";

/**
 * Calculate FLAMES result based on two names using the correct algorithm
 * @param name1 - First name
 * @param name2 - Second name
 * @returns FLAMES result letter
 */
export function calculateFlames(name1: string, name2: string): FlamesResult {
  // Step 1: Preprocessing - convert to lowercase and remove spaces
  const chars1 = name1.toLowerCase().replace(/\s+/g, "").split("");
  const chars2 = name2.toLowerCase().replace(/\s+/g, "").split("");

  // Step 2: Remove common characters (one occurrence from each)
  // This is the CRITICAL step - must handle duplicates correctly
  let arr1 = [...chars1];
  let arr2 = [...chars2];

  for (let i = 0; i < arr1.length; i++) {
    const currentChar = arr1[i];
    const foundIndex = arr2.indexOf(currentChar);

    if (foundIndex !== -1) {
      // Character found in arr2: remove one occurrence from each array
      arr1.splice(i, 1);
      arr2.splice(foundIndex, 1);
      i--; // Adjust index after removal
    }
  }

  // Step 3: Count remaining characters
  const remainingCount = arr1.length + arr2.length;

  // No remaining characters means no relationship type
  if (remainingCount === 0) {
    return null;
  }

  // Step 4: FLAMES Elimination using circular elimination algorithm
  // Formula: index = (currentIndex + remainingCount - 1) % length
  const flames: FlamesResult[] = ["F", "L", "A", "M", "E", "S"];
  let index = 0;

  while (flames.length > 1) {
    // Calculate the position to eliminate
    // Subtract 1 because we're counting from current position
    index = (index + remainingCount - 1) % flames.length;

    // Remove the element at the calculated index
    flames.splice(index, 1);

    // If index is now at or beyond the array length, wrap to beginning
    // This handles the case where removal puts us out of bounds
    if (index >= flames.length && flames.length > 0) {
      index = 0;
    }
  }

  // Step 5: Return the final remaining letter
  return flames[0];
}

/**
 * Get detailed result information based on FLAMES result
 * @param result - FLAMES result letter
 * @returns Detailed result data
 */
export function getResultData(result: FlamesResult): FlamesResultData {
  const defaultResult: FlamesResultData = {
    result: null,
    meaning: "Try Again",
    emoji: "🤔",
    color: "from-gray-500 to-gray-700",
    theme: "default",
  };

  if (result === null) return defaultResult;

  const resultMap: Record<Exclude<FlamesResult, null>, FlamesResultData> = {
    F: {
      result: "F",
      meaning: "Friends",
      emoji: "🤝",
      color: "from-yellow-500 to-orange-500",
      theme: "friends",
    },
    L: {
      result: "L",
      meaning: "Love",
      emoji: "❤️",
      color: "from-pink-500 to-red-500",
      theme: "love",
    },
    A: {
      result: "A",
      meaning: "Affection",
      emoji: "💜",
      color: "from-purple-500 to-pink-500",
      theme: "affection",
    },
    M: {
      result: "M",
      meaning: "Marriage",
      emoji: "💍",
      color: "from-green-500 to-emerald-500",
      theme: "marriage",
    },
    E: {
      result: "E",
      meaning: "Enemies",
      emoji: "⚡",
      color: "from-gray-700 to-black",
      theme: "enemies",
    },
    S: {
      result: "S",
      meaning: "Siblings",
      emoji: "👫",
      color: "from-blue-500 to-cyan-500",
      theme: "siblings",
    },
  };

  return resultMap[result];
}

/**
 * Get theme configuration for a specific result
 * @param theme - Theme type
 * @returns Theme configuration
 */
export function getThemeConfig(theme: ThemeType) {
  const themeConfigs = {
    love: {
      gradient: "from-pink-500 via-red-400 to-pink-600",
      primary: "pink",
      secondary: "rose",
      emoji: "❤️",
      particleEmoji: "❤️",
    },
    marriage: {
      gradient: "from-green-500 via-emerald-400 to-green-600",
      primary: "green",
      secondary: "emerald",
      emoji: "💍",
      particleEmoji: "🌸",
    },
    friends: {
      gradient: "from-yellow-400 via-amber-300 to-orange-500",
      primary: "yellow",
      secondary: "amber",
      emoji: "🤝",
      particleEmoji: "🎉",
    },
    enemies: {
      gradient: "from-gray-700 via-slate-800 to-black",
      primary: "gray",
      secondary: "slate",
      emoji: "⚡",
      particleEmoji: "💔",
    },
    affection: {
      gradient: "from-purple-500 via-violet-400 to-purple-600",
      primary: "purple",
      secondary: "violet",
      emoji: "💜",
      particleEmoji: "✨",
    },
    siblings: {
      gradient: "from-blue-500 via-cyan-400 to-blue-600",
      primary: "blue",
      secondary: "cyan",
      emoji: "👫",
      particleEmoji: "👫",
    },
    default: {
      gradient: "from-purple-900 via-blue-900 to-black",
      primary: "purple",
      secondary: "blue",
      emoji: "🤔",
      particleEmoji: "✨",
    },
  };

  return themeConfigs[theme];
}
