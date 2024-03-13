import React, { useEffect, useState } from "react";

import NavChat from "./NavChat";
import ChatRoom from "./ChatRoom";

export default function ChatRom({ setIndex, index }) {
  var [saveIndex, setSaveIndex] = useState(index);

  useEffect(() => {
    setIndex(saveIndex);
    // eslint-disable-next-line
  }, [saveIndex]);
  return (
    <div className="w-full h-full flex flex-row">
      <NavChat indexSelect={saveIndex} setIndex={setSaveIndex} />
      <ChatRoom index={saveIndex} setIndex={setSaveIndex} />
    </div>
  );
}
