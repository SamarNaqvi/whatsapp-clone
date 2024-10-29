import { useContext } from "react"
import { SocketIoContext } from "../context/SocketContext"


export const useSocket = ()=>{
    const socket = useContext(SocketIoContext);
    if(!socket) throw new Error('No Socket Connection');

    return socket;
}