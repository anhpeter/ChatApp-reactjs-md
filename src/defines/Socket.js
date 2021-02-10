import { io } from "socket.io-client";

var connectionOptions = {
    "force new connection": true,
    "reconnectionAttempts": "Infinity",
    "timeout": 10000,
    "transports": ["websocket"]
};
const Socket = io('http://localhost:3000/', connectionOptions);
export default Socket;