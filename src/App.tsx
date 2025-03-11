import { useEffect } from "react";
import Entrance from "./components/Entrance";
import Lobby from "./components/Lobby";
import { GameState } from "./model/game_state";
import { useGameContext } from "./components/Provider";
import Chat from "./components/Chat";
import { PlayerList } from "./components/PlayerList";

// PROD
// const API_URL_PROD = "https://choose-own-adventure-backend.onrender.com";
// DEV: Imported from local environment .env
// const API_URL_DEV = import.meta.env.VITE_API_URL_DEV;

// const PATH = { path: "/socket.io" };

export default function App() {
  const { gameState, setGameObject, socket } = useGameContext();

  useEffect(() => {
    socket?.on("game-object", (gameObject) => {
      setGameObject(gameObject);
    });
  }, []);

  return (
    <div>
      {gameState === GameState.ENTRANCE ? (
        <Entrance />
      ) : (
        <div className="flex flex-row">
          {gameState === GameState.LOBBY && <Lobby />}
          {gameState === GameState.STORY && <div>Story Mode</div>}
          {gameState === GameState.FINISHED && <div>Game Over</div>}
          <div className="flex flex-col">
            <Chat />
            <PlayerList />
          </div>
        </div>
      )}
    </div>
  );
}
