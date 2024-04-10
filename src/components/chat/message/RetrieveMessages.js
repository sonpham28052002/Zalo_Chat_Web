import React, { useRef } from "react";
import { useSelector } from "react-redux";
import HandleMessage from "./handleMessage";

export default function RetrieveMessages({ avt, message, conversation }) {
  var owner = useSelector((state) => state.data);
  var refMessage = useRef(null);

  function addHoursAndFormatToHHMM(date, hoursToAdd) {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + hoursToAdd);
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedHours}:${formattedMinutes}`;
  }

  function getImageUserChat(userId, conversation) {
    if (conversation.conversationType === "group") {
      return conversation.members.filter((item) => item.member.id === userId)[0]
        .member.avt;
    } else {
      return avt;
    }
  }

  return (
    <div
      ref={refMessage}
      className={` pr-5  h-fit min-h-16 w-full  flex flex-row my-12 items-end rotate-180 ${
        owner.id === message.sender.id
          ? "justify-end pr-5"
          : "justify-start pl-5"
      } items-star  my-5 `}
      key={message.id}
    >
      {owner.id === message.sender.id && (
        <HandleMessage message={message} refMessage={refMessage} />
      )}
      {owner.id !== message.sender.id && (
        <img src={getImageUserChat(message.sender.id, conversation)} alt="#" className="h-12 w-12 rounded-full mr-3" />
      )}

      <div className=" relative h-fit max-w-[50%] min-w-20 w-fit bg-[#e5efff] rounded-md flex flex-col justify-start items-center border  shadow-lg p-2 ">
        <div className=" h-fit max-w-full flex flex-col items-start justify-around text-wrap  ">
          <p className="whitespace-wrap break-words max-w-96 text-gray-400">
            Tin nhắn đã bị thu hồi
          </p>
        </div>
        <div className="absolute -bottom-6  flex flex-row justify-between items-center  w-full pt-1 ">
          <span className="text-[12px] text-gray-400">
            {addHoursAndFormatToHHMM(new Date(message.senderDate), 7)}
          </span>
        </div>
      </div>
      {owner.id !== message.sender.id && (
        <HandleMessage message={message} refMessage={refMessage} conversation={conversation} />
      )}
    </div>
  );
}
