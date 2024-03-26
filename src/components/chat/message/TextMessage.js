import React, { useState } from "react";
import NavIconInteract from "../chatbox/NavIconInteract";
import { useSelector } from "react-redux";

export default function TextMessage({ message, conversation }) {
  var owner = useSelector((state) => state.data);
  let [messageLocal, setMessageLocal] = useState(message);
  return (
    <div
      className={` pr-5  h-fit w-full  flex flex-row my-12 ${
        owner.id === message.sender.id
          ? "justify-end pr-5"
          : "justify-start pl-5"
      } items-star  my-5 `}
      key={message.id}
    >
      {owner.id !== message.sender.id && (
        <img src={message.sender.avt} alt="#" className="h-12 w-12 rounded-full mr-3" />
      )}
      <div className=" relative h-fit max-w-[50%] min-w-20 w-fit bg-[#e5efff] rounded-md flex flex-col justify-start items-center border  shadow-lg p-2">
        <div className=" h-fit max-w-full flex flex-col items-start justify-around text-wrap  ">
          <p className="whitespace-wrap break-words max-w-96">
            {messageLocal.content}
          </p>
        </div>
        <div className="absolute -bottom-6  flex flex-row justify-between items-center  w-full pt-1 ">
          <span className="text-[12px] text-gray-400">{`${
            new Date(message.senderDate).getHours() < 10
              ? "0" + new Date(message.senderDate).getHours()
              : new Date(message.senderDate).getHours()
          }:${
            new Date(message.senderDate).getMinutes() < 10
              ? "0" + new Date(message.senderDate).getMinutes()
              : new Date(message.senderDate).getMinutes()
          }`}</span>
          <NavIconInteract
            check={owner.id === message.receiver.id}
            icon={message.interact}
            setMessage={setMessageLocal}
            message={messageLocal}
          />
        </div>
      </div>
    </div>
  );
}
