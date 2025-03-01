import { useState } from "react";
import { Socket } from "socket.io-client";
import { CHAT_MESSAGE_KEY } from "../constants/socket_keys";
import { GameState } from "../model/game_state";

interface ChatProps {
  socket: Socket | null;
  messages: string[];
  setMessages: React.Dispatch<React.SetStateAction<string[]>>;
  setGameState: (gameState: GameState) => void;
}

export default function Chat({ socket, messages, setGameState }: ChatProps) {
  const [message, setMessage] = useState("");

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
      <button disabled={!socket} onClick={ () => setGameState(GameState.LOBBY)}>
        Go to Lobby
      </button>
    </div>
  );
}
