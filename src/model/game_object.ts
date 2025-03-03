import { User } from "./user";

// Store state of the current game
export interface GameObject {
  title: string;
  content: string;
  choices: string[];
  turnNumber: number;
  maxTurns: number;
  users: User[];
  gameHistory: Turn[];
  theme: string;
  setting: string;
  currTurn: number;
}

// Define interface to track what happens each turn
export interface Turn {
  content: string;
  choice: string;
}
