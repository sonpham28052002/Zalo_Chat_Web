import React, { useEffect, useState } from "react";

import NavChat from "./NavChat";
import ChatRoom from "./ChatRoom";
import IntroduceChatRoom from "../introduce/introduceChatRoom";

export default function ChatRom({ setIdConversation, idConversation }) {
  // id conversation group or user.id conversation single
  var [saveIndex, setSaveIndex] = useState(idConversation);
  useEffect(() => {
    setIdConversation(saveIndex);
    // eslint-disable-next-line
  }, [saveIndex]);

  return (
    <div className="w-full h-full flex flex-row">
      <NavChat indexSelect={saveIndex} setIndex={setSaveIndex} />
      {idConversation === -1 ? (
        <IntroduceChatRoom />
      ) : (
        <ChatRoom idConversation={saveIndex} setIndex={setSaveIndex} />
      )}
    </div>
  );
}
