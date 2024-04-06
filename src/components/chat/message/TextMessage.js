import React, { useRef, useState } from "react";
import NavIconInteract from "../chatbox/NavIconInteract";
import { useSelector } from "react-redux";

import HandleMessage from "./handleMessage";
import RetrieveMessages from "./RetrieveMessages";

export default function TextMessage({
  avt,
  message,
  conversation,
  setIsOpenForwardMessage,
}) {
  var owner = useSelector((state) => state.data);
  var refMessage = useRef(null);
  let [messageLocal, setMessageLocal] = useState(message);
  var [isRetrieve, setIsRetrieve] = useState(false);

  return (
    <div>
      {!isRetrieve ? (
        <div
          ref={refMessage}
          className={` pr-5  h-fit min-h-16 w-full  flex flex-row my-5 items-end rotate-180 ${
            owner.id === message.sender.id
              ? "justify-end pr-5"
              : "justify-start pl-5"
          } items-star  my-5 `}
          key={message.id}
        >
          {owner.id !== message.sender.id && (
            <img src={avt} alt="#" className="h-12 w-12 rounded-full mr-3" />
          )}

          {owner.id === message.sender.id && (
            <HandleMessage
              refMessage={refMessage}
              message={message}
              setIsRetrieve={setIsRetrieve}
              setIsOpenForwardMessage={setIsOpenForwardMessage}
            />
          )}
          <div className=" relative h-fit max-w-[50%] min-w-20 w-fit bg-[#e5efff] rounded-md flex flex-col justify-start items-center border  shadow-lg p-2">
            <div className=" h-fit max-w-full flex flex-col items-start justify-around text-wrap  ">
              {/^(ftp|http|https):\/\/[^ "]+$/.test(messageLocal.content) ? (
                <div className="w-96">
                  {/* <Embed url={messageLocal.content} /> */}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="whitespace-wrap break-words max-w-96"
                    href={messageLocal.content}
                  >
                    {messageLocal.content}
                  </a>
                </div>
              ) : (
                <p className="whitespace-wrap break-words max-w-96 ">
                  {messageLocal.content}
                </p>
              )}
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
                check={owner.id === message.sender.id}
                icon={message.interact}
                setMessage={setMessageLocal}
                message={messageLocal}
              />
            </div>
          </div>
          {owner.id !== message.sender.id && (
            <HandleMessage
              refMessage={refMessage}
              message={message}
              setIsRetrieve={setIsRetrieve}
              setIsOpenForwardMessage={setIsOpenForwardMessage}
            />
          )}
        </div>
      ) : (
        <RetrieveMessages avt={avt} message={message} />
      )}
    </div>
  );
}
