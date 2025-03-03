import { useState } from "react";
import { Socket } from "socket.io-client";
import { CHAT_MESSAGE_KEY } from "../constants/socket_keys";

interface ChatProps {
  socket: Socket | null;
  messages: string[];
}

export default function Chat({ socket, messages }: ChatProps) {
  const [userSubmittedMessage, setUserSubmittedMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (socket && userSubmittedMessage) {
      socket.emit(CHAT_MESSAGE_KEY, userSubmittedMessage);
      setUserSubmittedMessage("");
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
        value={userSubmittedMessage}
        onChange={(e) => setUserSubmittedMessage(e.target.value)}
      />
      <button onClick={handleSendMessage} disabled={!socket}>
        Send
      </button>
    </div>
  );
}
