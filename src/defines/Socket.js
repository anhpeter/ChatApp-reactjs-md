import { io } from "socket.io-client";
import { API_ADDRESS } from "./Config";

var connectionOptions = {
    "force new connection": true,
    "reconnectionAttempts": "Infinity",
    "timeout": 10000,
    "transports": ["websocket"]
};
const Socket = io(API_ADDRESS, connectionOptions);
export default Socket;