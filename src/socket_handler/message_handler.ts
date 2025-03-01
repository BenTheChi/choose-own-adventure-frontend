import { io } from "socket.io-client";

//PROD
const API_URL = "https://choose-own-adventure-backend.onrender.com";
const PATH = { path: "/socket.io" };

export const createSocket = () => {
    const newSocket = io(API_URL, PATH); //Local Dev backend route
    return newSocket;
}

const socket = createSocket();

export const sendMessage = (key: string, value: string) => {
    socket.emit(key, value);
}

export const onMessage = (key: string, callback: (value: string) => void) => {
    socket.on(key, callback);
}
