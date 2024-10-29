import Redis from 'ioredis';
import { Server } from "socket.io";

const host  = process.env.AIVEN_HOST
// const pub = new Redis({
//     host:process.env.AIVEN_HOST ?? "hello",
//     port:process.env.AIVEN_POST ?? 19150,
//     username:process.env.AIVEN_USER,
//     password:process.env.AIVEN_PASSWORD,
// });
// const sub = new Redis({
//     host:process.env.AIVEN_HOST,
//     port:process.env.AIVEN_POST,
//     username:process.env.AIVEN_USER,
//     password:process.env.AIVEN_PASSWORD,
// });

class SocketService{
    private _io:Server;
    constructor(){
        console.log("Init Socket Service...");
        this._io = new Server({
            cors:{
                allowedHeaders:["*"],
                origin:"*"
            }
        });
        console.log("host", process.env.AIVEN_HOST);
      //  sub.subscribe("MESSAGES");
    }

    get io(){
        return this._io;
    }

    public initEventListeners(){
        const io = this.io;
        io.on("connect", (socket)=>{
            console.log("New Socket Connected with Id: ", socket.id);
            socket.emit("connection_success", { socketId: socket.id });
            socket.on("event:message", async (message:any)=>{
               console.log("message", message);
                //publish messages on server
              //  await pub.publish("MESSAGES", JSON.stringify({message}));
            })
        })

        // sub.on("message", (channel: string, message: any)=>{
        //     if(channel === "MESSAGES")
        //     {
        //         io.emit("message",message);
        //     }
        // });
    }
}

export default SocketService;