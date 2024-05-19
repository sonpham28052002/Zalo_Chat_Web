import React, { useEffect, useState } from "react";
import HeaderNavChat from "./headerNavChat";
import { useDispatch, useSelector } from "react-redux";
import { getAPI } from "../../../redux_Toolkit/slices";
import { useSubscription } from "react-stomp-hooks";
import TabChat from "./TabChat";
import { Virtuoso } from "react-virtuoso";
import "../../../style/scrollBar.css";
export default function NavChat({ indexSelect, setIndex, showSearch }) {
  var data = useSelector((state) => state.data);
  var dispatch = useDispatch();

  var [idConversation, setIdConversation] = useState(indexSelect);
  useSubscription("/user/" + data.id + "/singleChat", (messages) => {
    dispatch(getAPI(data.id));
  });
  useSubscription("/user/" + data.id + "/groupChat", (messages) => {
    dispatch(getAPI(data.id));
  });
  useSubscription("/user/" + data.id + "/createGroup", (messages) => {
    dispatch(getAPI(data.id));
  });

  useSubscription("/user/" + data.id + "/grantRoleMember", (messages) => {
    dispatch(getAPI(data.id));
  });

  useSubscription("/user/" + data.id + "/addMemberIntoGroup", (messages) => {
    dispatch(getAPI(data.id));
  });
  useSubscription("/user/" + data.id + "/deleteMessage", (messages) => {
    dispatch(getAPI(data.id));
  });

  useSubscription("/user/" + data.id + "/removeMemberInGroup", (messages) => {
    dispatch(getAPI(data.id));
  });

  useSubscription("/user/" + data.id + "/disbandConversation", (message) => {
    dispatch(getAPI(data.id));
    setIndex(-1);
  });

  useSubscription("/user/" + data.id + "/outGroup", (message) => {
    dispatch(getAPI(data.id));
  });

  useSubscription("/user/" + data.id + "/changeStatusGroup", (messages) => {
    dispatch(getAPI(data.id));
  });
  useSubscription(
    "/user/" + data.id + "/deleteConversation",
    async (messages) => {
      const mess = JSON.parse(messages.body);
      console.log(mess);
      if (!mess.conversationType) {
        alert("Xoá không thành công");
      } else {
        await dispatch(getAPI(data.id));
        setIndex(-1);
      }
    }
  );
  useEffect(() => {
    setIndex(idConversation);
    // eslint-disable-next-line
  }, [idConversation]);

  return (
    <div className="h-full  w-2/12  border-r">
      <HeaderNavChat showSearch={showSearch} isSelect={true} />
      <div className=" h-[860px] w-full py-1 select-none">
        <Virtuoso
          className="scrollbar-container-v2 h-full"
          totalCount={data.conversation.length}
          initialTopMostItemIndex={0}
          data={data.conversation.slice().reverse()}
          itemContent={(index, item) => {
            return (
              <TabChat
                key={index}
                conversation={item}
                indexSelect={idConversation}
                setIndex={setIdConversation}
              />
            );
          }}
        />
      </div>
    </div>
  );
}
