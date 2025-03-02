import { GameState } from "../model/game_state";
import { useState } from "react";
import { Socket } from "socket.io-client";
import { USER_ENTER_KEY } from "../constants/socket_keys";

interface EntranceProps {
  setGameState: (gameState: GameState) => void;
  socket: Socket | null;
}

export default function Entrance({ setGameState, socket }: EntranceProps) {
  const [userName, setUserName] = useState("");

  const handleNameSubmission = () => {
    if (userName.trim() !== "") {
      socket?.emit(USER_ENTER_KEY, { name: userName, isHost: false });
      setGameState(GameState.LOBBY);
    }
  };

  return (
    <div>
      <h1>Welcome</h1>
      <p>Enter your name to join the game:</p>
      <input
        type="text"
        placeholder="Enter your name"
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
      />
      <button onClick={handleNameSubmission}>Join Lobby</button>
    </div>
  );
}
