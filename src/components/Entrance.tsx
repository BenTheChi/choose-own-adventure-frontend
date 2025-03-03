import { GameState } from "../model/game_state";
import { useState } from "react";
import { useGameContext } from "./Provider";

export default function Entrance() {
  const [userName, setUserName] = useState("");
  const { setGameState, socket, setCurrUser } = useGameContext();

  const handleNameSubmission = () => {
    if (userName.trim() !== "") {
      setCurrUser(userName);
      socket?.emit("user-enter", { name: userName });
      setGameState(GameState.LOBBY);
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 h-screen">
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-10 font-bold">Choose Our Adventure</h1>
        <div className="flex flex-col justify-between gap-3 items-center p-5 border-1 bg-red-100 rounded-lg">
          <input
            className="border-1 p-2 rounded-lg"
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
          <button
            className="border-3 bg-blue-100"
            onClick={handleNameSubmission}
          >
            Join Lobby
          </button>
        </div>
      </div>
    </div>
  );
}
