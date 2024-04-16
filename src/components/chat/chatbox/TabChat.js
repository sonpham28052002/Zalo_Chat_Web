import React from "react";
import { useSelector } from "react-redux";
import NavChatOption from "./NavChatOption";

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

  if (conversation.lastMessage) {
    const lastMessage = conversation.lastMessage;
    if (lastMessage.messageType === "Text") {
      viewLastMessage = `${owner.id === lastMessage.sender.id ? "Bạn: " : ""} ${
        lastMessage.content.length > 10
          ? lastMessage.content.substring(0, 10) + "..."
          : lastMessage.content.substring(0, 15)
      }`;
    }
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
          {nameConversation.length < 25
            ? nameConversation
            : nameConversation.substring(0, 25) + "..."}
        </p>

        <span className="text-slate-400">{viewLastMessage}</span>
      </div>
      <div className="flex flex-row justify-center items-center w-1/6">
        <NavChatOption
          conversation={conversation}
          ownerId={owner.id}
        />
      </div>
    </div>
  );
}
