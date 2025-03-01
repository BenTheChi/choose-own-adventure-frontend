import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const newSocket = io("http://localhost:4000"); //Local Dev backend route
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
    </div>
  );
}

export default App;
