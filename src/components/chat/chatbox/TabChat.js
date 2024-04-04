import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function TabChat({ conversation, indexSelect, setIndex }) {
  var owner = useSelector((state) => state.data);
  var nameConversation = "";
  var avtConversation = undefined;
  var idConversation = undefined;
  var viewLastMessage = undefined;
  if (conversation.conversationType === "group") {
    avtConversation = conversation.avtGroup;
    nameConversation = conversation.nameGroup;
    idConversation = conversation.idGroup;
  } else if (conversation.conversationType === "single") {
    avtConversation = conversation.user.avt;
    nameConversation = conversation.user.userName;
    idConversation = conversation.user.id;
  }

  const lastMessage = conversation.lastMessage;
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
      }
      `}
      onClick={() => {
        setIndex(idConversation);
      }}
    >
      <img
        className="rounded-full h-12 w-12 bg-center bg-cover"
        src={avtConversation}
        alt="#"
      />
      <div className="flex flex-col justify-center w-4/6  ml-2">
        <p className="font-medium text-nowrap max-w-44 overflow-hidden">
          {nameConversation < 10
            ? nameConversation
            : nameConversation.substring(0, 10) + "..."}
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
