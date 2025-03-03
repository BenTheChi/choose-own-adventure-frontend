import { useGameContext } from "./Provider";

export function PlayerList() {
  const { gameObject } = useGameContext();

  return (
    <div className="flex flex-col border-3 m-3 p-3 w-125">
      <h3 className="font-bold">Players List</h3>
      <ul>
        {gameObject?.users.map((user) => (
          <li key={user.name}>
            {user.name} {user.isHost ? "(Host)" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
