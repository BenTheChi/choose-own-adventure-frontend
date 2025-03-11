import { useEffect } from "react";
import { GameState } from "../model/game_state";
import { GAME_OBJECT } from "../constants/socket_keys";
import { useGameContext } from "./Provider";
import RadioButton from "./RadioButton";

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

  return (
    <div className="w-full h-full text-center">
      {gameObject ? (
        <div className="border-2">
          <h1 className="p-4">Lobby</h1>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div className="flex flex-row p-4 gap-3 w-full justify-center">
                <div className="flex flex-col gap-1">
                  <h2 className="font-bold text-2xl">Theme</h2>
                  <RadioButton name="theme" value="Adventure" />
                  <RadioButton name="theme" value="Mystery" />
                  <RadioButton name="theme" value="Romance" />
                  <RadioButton name="theme" value="Comedy" />
                  <RadioButton name="theme" value="Horror" />
                  <RadioButton name="theme" value="Sci-Fi" />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="font-bold text-2xl">World</h2>
                  <RadioButton name="world" value="Castle" />
                  <RadioButton name="world" value="Forest" />
                  <RadioButton name="world" value="Space" />
                  <RadioButton name="world" value="City" />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="font-bold text-2xl">Max Turns</h2>
                  <select className="border-2 rounded-md p-2">
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="bttnSection border-2 p-5">
            <button className="startBttn font-bold p-8">START</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
