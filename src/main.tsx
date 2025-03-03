import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GameObject } from "./model/game_object";
import { Provider } from "./components/Provider";

const initialGameObject: GameObject = {
  title: "",
  content: "",
  choices: [],
  turnNumber: 0,
  maxTurns: 0,
  users: [],
  gameHistory: [],
  theme: "",
  setting: "",
  currTurn: 0,
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider initial={initialGameObject}>
    <App />
  </Provider>
);
