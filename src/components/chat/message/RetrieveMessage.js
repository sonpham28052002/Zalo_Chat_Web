import React from "react";
export default function RetrieveMessage({ message }) {
  return (
    <div className=" relative h-fit max-w-[50%] min-w-20 w-fit bg-[#e5efff] rounded-md flex flex-col justify-start items-center border  shadow-lg p-2">
      <div className=" h-fit max-w-full flex flex-col items-start justify-around text-wrap  ">
        <p className="whitespace-wrap break-words max-w-96 text-gray-400">
          Tin nhắn đã bị thu hồi
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
      </div>
    </div>
  );
}
