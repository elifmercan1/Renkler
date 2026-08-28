export type ColorType = 'primary' | 'secondary';

export interface ColorItem {
  id: string;
  name: string; // e.g. "Kırmızı"
  englishName: string;
  hex: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  type: ColorType;
  typeLabel: string; // "Ana Renk" or "Ara Renk"
  description: string;
  formula?: {
    color1: string; // e.g. "Sarı"
    color2: string; // e.g. "Mavi"
    color1Hex: string;
    color2Hex: string;
  };
  symbols: Array<{
    name: string;
    emoji: string;
    iconName: string;
    fact: string;
  }>;
}

export type GameMode = 'learn' | 'lab' | 'duel' | 'matching' | 'quest';

export interface PlayerState {
  id: string;
  name: string;
  avatar: string;
  color: string;
  score: number;
  stars: number;
  streak: number;
}

export interface Question {
  id: number;
  prompt: string;
  category: 'mix' | 'identify' | 'symbol' | 'type';
  targetColor?: string;
  options: Array<{
    text: string;
    hex?: string;
    emoji?: string;
    isCorrect: boolean;
    explanation: string;
  }>;
  hint: string;
  soundCue?: string;
}

export interface Trophy {
  id: string;
  title: string;
  description: string;
  icon: string;
  requiredStars: number;
  unlocked: boolean;
  type: 'bronze' | 'silver' | 'gold' | 'diamond';
}
