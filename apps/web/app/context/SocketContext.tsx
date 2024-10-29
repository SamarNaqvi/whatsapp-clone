"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketIOProviderProps {
  children?: React.ReactNode;
}

interface Message {
  message: string;
  userId: string;
}

export type SocketIOContextProps = {
  sendMessage: (msg: string) => any;
  messages: Message[];
  userId: string;
};

export const SocketIoContext = createContext<SocketIOContextProps | null>(null);

export const SocketIOProvider: React.FC<SocketIOProviderProps> = ({
  children,
}) => {
  const [myId, setMyId] = useState("");
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<Message[]>([]);
  const sendMessage: SocketIOContextProps["sendMessage"] = useCallback(
    (msg) => {
      const msgObj = { message: msg, userId: myId };
      console.log("msgObj", msgObj);
      socket?.emit("event:message", msgObj);
    },
    [socket, myId]
  );

  const recvMessage: SocketIOContextProps["sendMessage"] = useCallback(
    (msg) => {
      const { message } = JSON.parse(msg);
      setMessages((prev) => [...prev, message]);
    },
    [socket, myId]
  );

  useEffect(() => {
    console.log("myId", myId);
  }, [myId]);

  useEffect(() => {
    const _socket = io("http://localhost:8000");
    setSocket(_socket);
    _socket.on("connection_success", (data) => {
      console.log("Connected with Socket ID: ", data.socketId);
      setMyId(data.socketId);
    });
    _socket.on("message", recvMessage);

    return () => {
      _socket.off("message");
      _socket.disconnect();
    };
  }, []);

  return (
    <SocketIoContext.Provider value={{ sendMessage, messages, userId: myId }}>
      {children}
    </SocketIoContext.Provider>
  );
};
