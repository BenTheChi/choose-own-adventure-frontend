import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { CHAT_MESSAGE_KEY, GAME_OBJECT_KEY } from "./constants/socket_keys";
import { GameObject, initializeGameObject } from "./model/game_object";
import Chat from "./components/Chat";
import Lobby from "./components/Lobby";
import { GameState } from "./model/game_state";

//PROD
const API_URL = "https://choose-own-adventure-backend.onrender.com";
const PATH = { path: "/socket.io" };
//DEV
// const API_URL = "http://localhost:4000";
// const PATH = {};

export default function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [gameObject, setGameObject] = useState<GameObject | null>(null);
  const [gameState, setGameState] = useState<GameState>(GameState.ENTRANCE);

  useEffect(() => {
    const newSocket = io(API_URL, PATH);
    setSocket(newSocket);

    newSocket.on(GAME_OBJECT_KEY, (gameObject) => {
      console.log("Received game object:", gameObject);
      setGameObject(gameObject);
    });

    // TODO REMOVE AND GET THIS FROM SERVER
    setGameObject(initializeGameObject());

    newSocket.on(CHAT_MESSAGE_KEY, (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  switch (gameState) {
    case GameState.ENTRANCE:
      return <Chat socket={socket} messages={messages} setMessages={setMessages} setGameState={setGameState} />
    case GameState.LOBBY:
      return <Lobby gameObject={gameObject} setGameState={setGameState} />;
    case GameState.STORY:
      return <div />;
    case GameState.FINISHED:
      return <div />;
  }
}
