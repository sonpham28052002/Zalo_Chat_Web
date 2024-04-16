import React, { useEffect, useState, useCallback } from "react";

import NavChat from "./NavChat";
import ChatRoom from "./ChatRoom";
import IntroduceChatRoom from "../introduce/introduceChatRoom";
import SearchFriend from "./SearchFriend";
import { useSubscription } from "react-stomp-hooks";
import { getAPI } from "../../../redux_Toolkit/slices";
import { useDispatch, useSelector } from "react-redux";

export default function ChatRom({ setIdConversation, idConversation }) {
  var data = useSelector((state) => state.data);
  var dispatch = useDispatch();
  // id conversation group or user.id conversation single
  var [saveIndex, setSaveIndex] = useState(idConversation);
  var [isSearch, setisSearch] = useState(false);
  useEffect(() => {
    setIdConversation(saveIndex);
    // eslint-disable-next-line
  }, [saveIndex]);

  useSubscription("/user/" + data.id + "/addMemberIntoGroup", (messages) => {
    dispatch(getAPI(data.id));
  });

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
