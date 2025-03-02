import { USER_ENTER_KEY } from "../constants/socket_keys";
import tailwindcss from "@tailwindcss/vite";
import { GameState } from "../model/game_state";

interface EntranceProps {
  setGameState: (gameState: GameState) => void;
}

export default function Entrance( {setGameState}: EntranceProps) {

  const handleNameSubmission = function () {
    // Code to handle button click that takes text from input field and sets it to USER_ENTER_KEY
    // USER_ENTER_KEY = 
    setGameState(GameState.LOBBY)
  }

  return (
    <>
      <text>Test</text>
      <input type="text">Input name here</input>
      <button onClick={ () => handleNameSubmission()}>
        Submit Name and Submit to Lobby
      </button>
    </>
  )
}