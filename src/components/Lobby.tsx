import { useEffect } from "react";
import { GameObject } from "../model/game_object";
import { GameState } from "../model/game_state";
import { Socket } from "socket.io-client";
import Chat from "./Chat";

interface LobbyProps {
  gameObject: GameObject | null;
  setGameState: (gameState: GameState) => void;
  socket: Socket | null;
  setGameObject: React.Dispatch<React.SetStateAction<GameObject | null>>;
  messages: string[];
}

export default function Lobby({ gameObject, setGameState, socket, messages, setGameObject }: LobbyProps) {
  useEffect(() => {
    socket?.on("game-object", (newGameObject) => {
      console.log("Received game object:", newGameObject);
      setGameObject(newGameObject);
    });

    return () => {
      socket?.off("game-object");
    };
  }, [socket]);

  return (
    <div>
      <h1>Lobby</h1>
      {gameObject ? (
        <div style={{ display: "flex", flexDirection: "row" }}>
          {/* Left Side */}
          <div className="lobbyMain" style={{ display: "flex", flexDirection: "column" }}>
            <div className="gameConfig" style={{ display: "flex", flexDirection: "row" }}>
              <div className="themeSection" style={{ display: "flex", flexDirection: "column" }}>
                <h1>Theme</h1>
                <div className="themeBttns" style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                  <button className="themeOption">Adventure</button>
                  <button className="themeOption">Action</button>
                  <button className="themeOption">Romance</button>
                  <button className="themeOption">Mystery</button>
                </div>
              </div>

              <div className="settingSection" style={{ display: "flex", flexDirection: "column" }}>
                <h1>World Setting</h1>
                <div className="settingBttns" style={{ display: "flex", flexDirection: "column" }}>
                  <button className="settingOption">Medieval</button>
                  <button className="settingOption">Fantasy</button>
                  <button className="settingOption">Sci-Fi</button>
                  <button className="settingOption">Horror</button>
                </div>
              </div>
            </div>

            <div className="turns">
              <h3>No. of Turns</h3>
            </div>

            <div className="bttnSection">
              <button className="startBttn" style={{ fontWeight: "bolder", padding: "30px" }}>START</button>
            </div>
          </div>

          {/* Right Side */}
          <div className="playerInfo" style={{ display: "flex", flexDirection: "column" }}>
            <div className="timer">
              <h3>Timer</h3>
            </div>

            <div className="playerList" style={{ display: "flex", flexDirection: "column" }}>
              <h3>Players List</h3>
              <ul>
                {gameObject.users.map((user) => (
                  <li key={user.name}>{user.name} {user.isHost ? "(Host)" : ""}</li>
                ))}
              </ul>
            </div>

            <div className="chat">
              <h3>Chat Box</h3>
              <Chat socket={socket} messages={messages}></Chat>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <button onClick={() => setGameState(GameState.ENTRANCE)}>Back to Entrance</button>
    </div>
  );
}
