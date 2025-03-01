import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
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
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

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

  const handleSendMessage = () => {
    if (socket && message) {
      socket.emit("chat-message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <LobbyScreen></LobbyScreen>
    </div>
  );
}

export default App;
