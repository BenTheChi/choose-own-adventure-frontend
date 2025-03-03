import { GameState } from "./game_state";
import { User } from "./user";

// Store state of the current game
export interface GameObject {
  gameState: GameState;
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

export function initializeGameObject(): GameObject {
  return {
      gameState: GameState.ENTRANCE,
      title: "",
      content: "",
      choices: [],
      turnNumber: 0,
      maxTurns: 0,
      users: [],
      gameHistory: [],
      theme: "",
      setting: "",
      currTurn: 0
  }
}