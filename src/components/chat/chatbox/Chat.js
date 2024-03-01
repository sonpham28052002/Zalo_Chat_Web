import React from "react";

import NavChat from "./NavChat";
import ChatRoom from "./ChatRoom";
export default function ChatRom() {
  return (
    <div className="w-full h-full flex flex-row">
      <NavChat />
      <ChatRoom conversation={""} />
    </div>
  );
}
