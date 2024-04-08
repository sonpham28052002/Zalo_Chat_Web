import React, { useEffect, useState, useCallback } from "react";

import NavChat from "./NavChat";
import ChatRoom from "./ChatRoom";
import IntroduceChatRoom from "../introduce/introduceChatRoom";
import SearchFriend from "./SearchFriend";

export default function ChatRom({ setIdConversation, idConversation }) {
  // id conversation group or user.id conversation single
  var [saveIndex, setSaveIndex] = useState(idConversation);
  var [isSearch, setisSearch] = useState(false);
  useEffect(() => {
    setIdConversation(saveIndex);
    // eslint-disable-next-line
  }, [saveIndex]);

  let select = useCallback(() => {
    setisSearch(!isSearch);
  }, [isSearch]);

  let changeIndex = useCallback(
    (id) => {
      setSaveIndex(id);
    },
    // eslint-disable-next-line
    [isSearch]
  );
  return (
    <div className="w-full h-full flex flex-row">
      {isSearch ? (
        <SearchFriend
          indexSelect={saveIndex}
          setIndex={changeIndex}
          showSearch={select}
        />
      ) : (
        <NavChat
          indexSelect={saveIndex}
          setIndex={setSaveIndex}
          showSearch={select}
        />
      )}
      {idConversation === -1 ? (
        <IntroduceChatRoom />
      ) : (
        <ChatRoom idConversation={saveIndex} setIndex={setSaveIndex} />
      )}
    </div>
  );
}
