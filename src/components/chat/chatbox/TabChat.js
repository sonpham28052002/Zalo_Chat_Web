import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";
const host = process.env.REACT_APP_HOST;

export default function TabChat({ conversation, indexSelect, setIndex }) {
  var owner = useSelector((state) => state.data);
  var [nameSingle, setNameSingle] = useState(undefined);
  var [avtSingle, setAvtSingle] = useState(undefined);
  var [idSingle, setIdSingle] = useState(undefined);

  var nameConversation = undefined;
  var avtConversation = undefined;
  var idConversation = undefined;
  var viewLastMessage = undefined;
  if (conversation.conversationType === "group") {
    avtConversation = conversation.avtGroup;
    nameConversation = conversation.nameGroup;
    idConversation = conversation.idGroup;
  }

  useEffect(() => {
    if (conversation.conversationType === "single") {
      fetch(`${host}/users/getInfoUserById?id=${conversation.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setAvtSingle(data.avt);
          setNameSingle(data.userName);
          setIdSingle(data.id);
        });
    }
    // eslint-disable-next-line
  }, []);

  const lastMessage = conversation.messages[conversation.messages.length - 1];
  if (lastMessage.messageType === "Text") {
    viewLastMessage = `${owner.id === lastMessage.sender.id ? "Bạn: " : ""} ${
      lastMessage.content.length > 15
        ? lastMessage.content.substring(0, 15) + "..."
        : lastMessage.content.substring(0, 15)
    }`;
  }
  return (
    <div
      className={`w-full h-[80px] border-red-100 hover:bg-slate-100 px-3 flex flex-row justify-start items-center ${
        indexSelect === idConversation ? "bg-[#e5efff] hover:bg-[#e5efff] " : ""
      }${indexSelect === idSingle ? "bg-[#e5efff] hover:bg-[#e5efff] " : ""}
      `}
      onClick={() => {
        if (idSingle) {
          setIndex(idSingle);
        } else {
          setIndex(idConversation);
        }
      }}
    >
      <img
        className="rounded-full h-12 w-12 bg-center bg-cover"
        src={avtSingle ? avtSingle : avtConversation}
        alt="#"
      />
      <div className="flex flex-col justify-center w-4/6  ml-2">
        <p className="font-medium text-nowrap max-w-44 overflow-hidden">
          {nameSingle
            ? nameSingle
            : nameConversation > 10
            ? nameSingle
              ? nameSingle
              : nameConversation.substring(0, 10) + "..."
            : nameSingle
            ? nameSingle
            : nameConversation}
        </p>

        <span className="text-slate-400">{viewLastMessage}</span>
      </div>
      <div className="flex flex-row justify-center items-center w-1/6">
        <div className=" flex flex-row justify-center items-center h-7 w-7 rounded-md hover:bg-slate-200">
          <BsThreeDots className="text-gray-400" />
        </div>
      </div>
    </div>
  );
}
