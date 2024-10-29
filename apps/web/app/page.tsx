"use client";
import React from "react";
import UserList from "@components/user-list";
import Chat from "@components/chat";

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="bg-purple-600 basis-1/4 text-white">
        <UserList
          users={[{ name: "Ali" }, { name: "Abdullah" }, { name: "Nofal" }]}
        />
      </div>
      <div className="bg-slate-200 basis-3/4">
        <Chat />
      </div>
    </div>
  );
}
