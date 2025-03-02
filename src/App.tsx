import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { CHAT_MESSAGE_KEY, GAME_OBJECT_KEY } from "./constants/socket_keys";
import { GameObject, initializeGameObject } from "./model/game_object";
import Chat from "./components/Chat";
import Entrance from "./components/Entrance.tsx";
import Lobby from "./components/Lobby";
import { GameState } from "./model/game_state";
import LobbyScreen from "./components/lobbyScreen";

//PROD
const API_URL = "https://choose-own-adventure-backend.onrender.com";
const PATH = { path: "/socket.io" };

//DEV
// const API_URL = "http://localhost:4000";
// const PATH = {};

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [gameObject, setGameObject] = useState<GameObject | null>(null);
  const [gameState, setGameState] = useState<GameState>(GameState.ENTRANCE);

  useEffect(() => {
    const newSocket = io(API_URL, PATH); //Local Dev backend route
    setSocket(newSocket);

    newSocket.on("chat-message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  switch (gameState) {
    case GameState.ENTRANCE:
      return <Entrance setGameState={setGameState}/>
    case GameState.LOBBY:
      return (
        <>
          <Lobby gameObject={gameObject} setGameState={setGameState} />
          <Chat socket={socket} messages={messages} setMessages={setMessages} setGameState={setGameState} />
        </>
      )
    case GameState.STORY:
      return <div />;
    case GameState.FINISHED:
      return <div />;
  }
}
