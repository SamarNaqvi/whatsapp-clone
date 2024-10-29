import http from "http";
import SocketService from "./services/socket";

async function init(){
    const httpServer = http.createServer();
    const socketService = new SocketService();
    const PORT = process.env.SERVER_PORT ? process.env.SERVER_PORT : 8000;
    socketService.io.attach(httpServer);
    httpServer.listen(PORT, ()=>{
        console.log("Hello Server is listening to this PORT", PORT);
    })

    socketService.initEventListeners();
}

init();