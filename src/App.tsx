import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { CHAT_MESSAGE_KEY, GAME_OBJECT_KEY } from "./constants/socket_keys";
import { GameObject, initializeGameObject } from "./model/game_object";
import { useNavigate } from "react-router-dom";

//PROD
const API_URL = "https://choose-own-adventure-backend.onrender.com";
const PATH = { path: "/socket.io" };
//DEV
// const API_URL = "http://localhost:4000";
// const PATH = {};

function App() {
  const navigate = useNavigate();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [gameObject, setGameObject] = useState<GameObject | null>(null);

  useEffect(() => {
    const newSocket = io(API_URL, PATH); //Local Dev backend route
    setSocket(newSocket);

    // On connect, listen for the Game object message
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
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (socket && message) {
      socket.emit(CHAT_MESSAGE_KEY, message);
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Simple Chatroom</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage} disabled={!socket}>
        Send
      </button>
      <button disabled={!socket || !gameObject} onClick={() => navigate("/lobby")}>
        Go to Lobby
      </button>
    </div>
  );
}

export default App;
