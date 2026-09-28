import { Server } from "socket.io";
let io;
export function initSocket(httpServer) {
    io = new Server(httpServer, {});

    console.log("socketIO server is running");

    io.on("connection", (socket) => {
        console.log("User is connected: " + socket.id);
    });
}
