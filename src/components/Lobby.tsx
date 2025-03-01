import { GameObject } from "../model/game_object";
import { sendMessage } from "../socket_handler/message_handler";
import { USER_READY_KEY } from "../constants/socket_keys";
import { GameState } from "../model/game_state";

interface LobbyProps {
  gameObject: GameObject | null;
  setGameState: (gameState: GameState) => void;
}

export default function Lobby({ gameObject, setGameState }: LobbyProps) {
  return (
    <div>
      <h1>Lobby</h1>
      {gameObject ? (
        <>
          <p>Users: {gameObject.users.map((user) => user.name).join(", ")}</p>
          <p>Theme: </p>
          <button onClick={() => sendMessage(USER_READY_KEY, "true")}>
            Start Game
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={() => setGameState(GameState.ENTRANCE)}>Back to Entrance</button>
    </div>
  );
}
