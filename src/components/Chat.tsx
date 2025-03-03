import { useEffect, useState } from "react";
import { CHAT_MESSAGE_KEY } from "../constants/socket_keys";
import { useGameContext } from "./Provider";

interface Message {
  user: string;
  message: string;
}

export default function Chat() {
  const { socket, currUser } = useGameContext();
  const [userSubmittedMessage, setUserSubmittedMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!socket) return;

    const messageHandler = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("chat-message", messageHandler);

    return () => {
      socket.off("chat-message", messageHandler);
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (socket && userSubmittedMessage) {
      socket.emit(CHAT_MESSAGE_KEY, {
        message: userSubmittedMessage,
        user: currUser,
      });
      setUserSubmittedMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 border-3 m-3 p-3 w-125">
      <h2 className="font-bold">Simple Chatroom</h2>
      <div className="w-100 h-100 border-3 overflow-y-scroll">
        {messages.map((msg, index) => (
          <div key={index}>
            <h4 className="font-bold">{msg.user}</h4>
            <div>{msg.message}</div>
          </div>
        ))}
      </div>
      <input
        className="border-3 p-2"
        type="text"
        placeholder="Enter your message"
        value={userSubmittedMessage}
        onChange={(e) => setUserSubmittedMessage(e.target.value)}
      />
      <button onClick={handleSendMessage} disabled={!socket}>
        Send
      </button>
    </div>
  );
}
