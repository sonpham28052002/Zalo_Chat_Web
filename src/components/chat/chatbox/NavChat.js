import React, { useEffect, useState } from "react";
import HeaderNavChat from "./headerNavChat";
import { useDispatch, useSelector } from "react-redux";
import { getAPI } from "../../../redux_Toolkit/slices";
import { useSubscription } from "react-stomp-hooks";
import TabChat from "./TabChat";

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

  useSubscription("/user/" + data.id + "/disbandConversation", (message) => {
    dispatch(getAPI(data.id));
  });
  useSubscription("/user/" + data.id + "/deleteConversation", (messages) => {
    const mess = JSON.parse(messages.body);
    if (!mess.conversationType) {
      alert("Xoá không thành công");
    } else {
      dispatch(getAPI(data.id));
    }

    // dispatch(getAPI(data.id));
  });
  useEffect(() => {
    setIndex(idConversation);
    // eslint-disable-next-line
  }, [idConversation]);

  return (
    <div className="h-full  w-2/12  border-r">
      <HeaderNavChat showSearch={showSearch} />
      <div className=" h-[860px] w-full py-1 select-none">
        {data.conversation.map((item, index) => {
          return (
            <TabChat
              key={index}
              conversation={item}
              indexSelect={idConversation}
              setIndex={setIdConversation}
            />
          );
        })}
      </div>
    </div>
  );
}
