"use client";

import { useState, useRef } from "react";
import { useSocket } from "../../Hooks/useSocket";
import styles from "./page.module.css";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const { sendMessage, messages, userId } = useSocket();
  const focusRef = useRef<HTMLDivElement>();

  // Function to handle the send button click
  const handleSend = () => {
    sendMessage(inputValue);
    // Perform any action with inputValue, such as sending it to an API or server
    setInputValue(""); // Clear the input after sending
  };

  return (
    <div className={`px-32 py-10 ${styles.backgroundImg}`}>
      <div className="font-sans font-bold text-2xl text-slate-50">
        CUSTOM CHAT APP
      </div>

      <div className="mt-5 rounded-sm max-h-[35rem] h-[35rem] overflow-y-auto border-solid border-[0.5px] border-slate-500 bg-slate-900">
        <ul className="p-2">
          {messages.map((msg, ind) => (
            <li
              key={ind}
              className={`flex ${
                msg?.userId == userId ? "justify-end ml-auto" : "justify-start"
              } mb-4`}
            >
              <span className="bg-slate-500 text-white p-2 rounded-sm max-w-1/2">
                <span className="text-slate-900">
                  {msg?.userId == userId ? "ME" : "FRIEND"}:
                </span>{" "}
                {msg?.message}
              </span>
            </li>
          ))}
          {
            //@ts-ignore
            <span ref={focusRef}></span>
          }
        </ul>
      </div>
      <div className="mt-2 flex items-center w-full p-[0.2rem] rounded-sm bg-slate-400 shadow-sm border-solid border-[0.5px] border-slate-500">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 p-2.5 rounded-sm border-none bg-slate-900 text-base outline-none mr-1 text-slate-300"
          placeholder="Type your message..."
        />
        <button
          onClick={() => {
            handleSend();
          }}
          className="py-2.5 px-3.5 rounded-sm bg-slate-700 text-white text-base hover:bg-slate-500 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
