import React, { useEffect, useState } from "react";

import NavChat from "./NavChat";
import ChatRoom from "./ChatRoom";
import IntroduceChatRoom from "../introduce/introduceChatRoom";

export default function ChatRom({ setIndex, index }) {
  var [saveIndex, setSaveIndex] = useState(index);

  

  useEffect(() => {
    setIndex(saveIndex);
    // eslint-disable-next-line
  }, [saveIndex]);
  return (
    <div className="w-full h-full flex flex-row">
      <NavChat indexSelect={saveIndex} setIndex={setSaveIndex} />
      {index === -1 ? (
        <IntroduceChatRoom/>
      ) : (
        <ChatRoom index={saveIndex} setIndex={setSaveIndex} />
      )}
    </div>
  );
}
