import app from "./src/app.js";
import "dotenv/config";
import {createServer} from "http"
import { initSocket } from "./src/sockets/server.sockets.js";
import { connectToDB } from "./src/config/db.js";

connectToDB();

const httpServer = createServer(app)

initSocket(httpServer)

httpServer.listen(process.env.PORT, (err) => {
    if (err) {
        console.log("Listen Error:", err);
        return;
    }

    console.log(`Server running on port ${process.env.PORT}`);
}); 