import React, { useState } from "react";

import NavChat from "./NavChat";
import ChatRoom from "./ChatRoom";

export default function ChatRom() {
  var [index, setIndex] = useState(0);
  return (
    <div className="w-full h-full flex flex-row">
      <NavChat indexSelect={index} setIndex={setIndex} />
      <ChatRoom index={index} setIndex={setIndex} />
    </div>
  );
}
