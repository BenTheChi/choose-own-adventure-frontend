// Create a lobby page for the game that includes the users, theme dropdown and start button
import { useEffect } from "react";
import { GameObject } from "../model/game_object";
import { sendMessage } from "../socket_handler/message_handler";
import { USER_READY_KEY } from "../constants/socket_keys";


const Lobby = (gameObject: GameObject | null) => {
    useEffect(() => {
        sendMessage(USER_READY_KEY, "false");
    }, []);

    return (
        <div>
            <h1>Lobby</h1>
            <p>Users: {gameObject!.users.map((user) => user.name)}</p>
            <p>Theme: </p>
            <button onClick={() => {sendMessage(USER_READY_KEY, "true")}}>Start</button>
        </div>
    );
};

export default Lobby;