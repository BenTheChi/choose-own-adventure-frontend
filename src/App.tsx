import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { GameObject } from "./model/game_object";
import Entrance from "./components/Entrance";
import Lobby from "./components/Lobby";
import { GameState } from "./model/game_state";
import { GAME_OBJECT_KEY } from "./constants/socket_keys";

// PROD
const API_URL = "https://choose-own-adventure-backend.onrender.com";
const PATH = { path: "/socket.io" };

export default function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [gameObject, setGameObject] = useState<GameObject | null>(null);
  const [gameState, setGameState] = useState<GameState>(GameState.ENTRANCE);

  useEffect(() => {
    const newSocket = io(API_URL, PATH);
    setSocket(newSocket);

    newSocket.on("chat-message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on(GAME_OBJECT_KEY, (gameObject) => {
      setGameObject(gameObject);
    });
  }, []);

  return (
    <div>
      {gameState === GameState.ENTRANCE && (
        <Entrance setGameState={setGameState} socket={socket} />
      )}
      {gameState === GameState.LOBBY && (
        <>
          <Lobby gameObject={gameObject} setGameState={setGameState} socket={socket} setGameObject={setGameObject} />
        </>
      )}
      {gameState === GameState.STORY && <div>Story Mode</div>}
      {gameState === GameState.FINISHED && <div>Game Over</div>}
    </div>
  );
}
