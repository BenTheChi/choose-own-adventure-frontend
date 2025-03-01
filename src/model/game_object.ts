import { GameState } from "./game_state";
import { User } from "./user";

export interface GameObject {
    state: GameState,
    title: string,
    content: string,
    choices: string[],
    turnNumber: number,
    users: User[],
    timeLeft: number,
    chatHistory: string[]
}

export function initializeGameObject(): GameObject {
    return {
        state: GameState.ENTRANCE,
        title: "",
        content: "",
        choices: [],
        turnNumber: 0,
        // TODO: Initialize to empty array
        users: [{ name: "TestUser", isHost: true }],
        timeLeft: 0,
        chatHistory: []
    }
}