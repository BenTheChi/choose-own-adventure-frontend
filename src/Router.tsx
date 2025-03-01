import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Lobby from "./pages/lobby";
import { GameObject, initializeGameObject } from "./model/game_object";

export default function Router() {
    const gameObject: GameObject = initializeGameObject();
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/lobby" element={<Lobby {...gameObject} />} />
            </Routes>
        </BrowserRouter>
    );
}