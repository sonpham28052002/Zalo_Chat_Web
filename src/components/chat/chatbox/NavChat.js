import React, { useEffect, useState } from "react";
import HeaderNavChat from "./headerNavChat";
import { useDispatch, useSelector } from "react-redux";
import { getAPI } from "../../../redux_Toolkit/slices";
import { useSubscription } from "react-stomp-hooks";
import TabChat from "./TabChat";

export default function NavChat({ indexSelect, setIndex }) {
  var data = useSelector((state) => state.data);
  var [idConversation, setIdConversation] = useState(indexSelect);
  useSubscription("/user/" + data.id + "/singleChat", () => {
    dispatch(getAPI(data.id));
  });
  useEffect(() => {
    setIndex(idConversation)
  }, [idConversation])

  var dispatch = useDispatch();
  return (
    <div className="h-full  w-2/12  border-r">
      <HeaderNavChat />
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
