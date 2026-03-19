export type FlamesResult = "F" | "L" | "A" | "M" | "E" | "S" | null;

export interface FlamesResultData {
  result: FlamesResult;
  meaning: string;
  emoji: string;
  color: string;
  theme: ThemeType;
}

export type ThemeType =
  | "love"
  | "marriage"
  | "friends"
  | "enemies"
  | "affection"
  | "siblings"
  | "default";

export interface ThemeConfig {
  gradient: string;
  primary: string;
  secondary: string;
  emoji: string;
  particleEmoji: string;
}

export interface InputValues {
  name1: string;
  name2: string;
}
