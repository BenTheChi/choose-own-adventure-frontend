import { createContext, useContext, useEffect, useState } from "react";
import { GameObject } from "../model/game_object";
import { GameState } from "../model/game_state";
import { io, Socket } from "socket.io-client";

const API_URL_DEV = import.meta.env.VITE_API_URL_DEV;
const PATH = { path: "/socket.io" };

interface ProviderProps {
  initial: GameObject;
  children: React.ReactNode;
}

interface GameContextType {
  gameObject: GameObject | null;
  gameState: GameState;
  setGameObject: (gameObject: GameObject) => void;
  setGameState: (gameState: GameState) => void;
  currUser: string;
  setCurrUser: (user: string) => void;
  socket: Socket | null;
}

const GameContext = createContext<GameContextType | null>(null);

export function Provider({ initial, children }: ProviderProps) {
  const [gameObject, setGameObject] = useState<GameObject | null>(initial);
  const [gameState, setGameState] = useState<GameState>(GameState.ENTRANCE);
  const [currUser, setCurrUser] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    setSocket(io(API_URL_DEV, PATH));
  }, []);

  return (
    <GameContext.Provider
      value={{
        gameObject,
        gameState,
        setGameObject,
        setGameState,
        currUser,
        setCurrUser,
        socket,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
