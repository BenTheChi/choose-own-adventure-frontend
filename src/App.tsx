import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { GameObject } from "./model/game_object";
import Entrance from "./components/Entrance";
import Lobby from "./components/Lobby";
import { GameState } from "./model/game_state";
import { CHAT_MESSAGE_KEY, GAME_OBJECT_KEY } from "./constants/socket_keys";

// PROD
// const API_URL_PROD = "https://choose-own-adventure-backend.onrender.com";
// DEV: Imported from local environment .env
const API_URL_DEV = import.meta.env.BACKEND_URL;

const PATH = { path: "/socket.io" };


export default function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [gameObject, setGameObject] = useState<GameObject | null>(null);
  const [gameState, setGameState] = useState<GameState>(GameState.ENTRANCE);

  useEffect(() => {
    // Currently configured to use Dev
    const newSocket = io(API_URL_DEV, PATH);
    console.log(`Connecting to ${API_URL_DEV}`);
    setSocket(newSocket);

    newSocket.on(CHAT_MESSAGE_KEY, (message) => {
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
          <Lobby gameObject={gameObject} setGameState={setGameState} socket={socket} messages={messages} setGameObject={setGameObject} />
        </>
      )}
      {gameState === GameState.STORY && <div>Story Mode</div>}
      {gameState === GameState.FINISHED && <div>Game Over</div>}
    </div>
  );
}
