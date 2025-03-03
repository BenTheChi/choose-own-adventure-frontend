import { useEffect } from "react";
import { GameState } from "../model/game_state";
import { GAME_OBJECT } from "../constants/socket_keys";
import { useGameContext } from "./Provider";

export default function Lobby() {
  const { gameObject, setGameObject, setGameState, socket } = useGameContext();

  useEffect(() => {
    socket?.on(GAME_OBJECT, (newGameObject) => {
      console.log("Received game object:", newGameObject);
      setGameObject(newGameObject);
    });

    return () => {
      socket?.off(GAME_OBJECT);
    };
  }, [socket]);

  // return () => {
  //   socket?.off(GAME_OBJECT);
  // };

  return (
    <div>
      <h1>Lobby</h1>
      {gameObject ? (
        <div style={{ display: "flex", flexDirection: "row" }}>
          {/* Left Side */}
          <div
            className="lobbyMain"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div
              className="gameConfig"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div
                className="themeSection"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h1>Theme</h1>
                <div
                  className="themeBttns"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                  }}
                >
                  <button className="themeOption">Adventure</button>
                  <button className="themeOption">Action</button>
                  <button className="themeOption">Romance</button>
                  <button className="themeOption">Mystery</button>
                </div>
              </div>

              <div
                className="settingSection"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h1>World Setting</h1>
                <div
                  className="settingBttns"
                  style={{ display: "flex", flexDirection: "column" }}
                >
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
              <button
                className="startBttn"
                style={{ fontWeight: "bolder", padding: "30px" }}
              >
                START
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div
            className="playerInfo"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className="timer">
              <h3>Timer</h3>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <button onClick={() => setGameState(GameState.ENTRANCE)}>
        Back to Entrance
      </button>
    </div>
  );
}
