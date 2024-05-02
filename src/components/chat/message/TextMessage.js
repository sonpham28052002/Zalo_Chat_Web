import React, { useRef, useState } from "react";
import NavIconInteract from "../chatbox/NavIconInteract";
import { useSelector } from "react-redux";

import HandleMessage from "./handleMessage";
import RetrieveMessages from "./RetrieveMessages";
import ReplyViewMessage from "../replyMessage/ReplyViewMessage";

export default function TextMessage({
  avt,
  message,
  conversation,
  setIsOpenForwardMessage,
  setReplyMessage,
  forcusMessage,
}) {
  function getImageUserChat(userId, conversation) {
    if (conversation.conversationType === "group") {
      return conversation.members.filter((item) => item.member.id === userId)[0]
        .member.avt;
    }
    return avt;
  }
  var owner = useSelector((state) => state.data);
  var refMessage = useRef(null);
  let [messageLocal, setMessageLocal] = useState(message);
  var [isRetrieve, setIsRetrieve] = useState(false);

  function addHoursAndFormatToHHMM(date, hoursToAdd) {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + hoursToAdd);
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    if (formattedHours) {
      return `${formattedHours}:${formattedMinutes}`;
    } else {
      return "đang gửi...";
    }
  }

  return (
    <div className="min-h-5 py-1">
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
            <img
              src={getImageUserChat(message.sender.id, conversation)}
              alt="#"
              className="h-12 w-12 rounded-full mr-3"
            />
          )}
          {owner.id === message.sender.id && (
            <HandleMessage
              refMessage={refMessage}
              message={message}
              setIsRetrieve={setIsRetrieve}
              setIsOpenForwardMessage={setIsOpenForwardMessage}
              setReplyMessage={setReplyMessage}
              conversation={conversation}
            />
          )}
          <div className=" relative h-fit max-w-[50%] min-w-20 w-fit bg-[#e5efff] rounded-md flex flex-col justify-start items-start border shadow-lg p-2 ">
            {messageLocal.replyMessage && (
              <ReplyViewMessage
                replyMessage={messageLocal.replyMessage}
                forcusMessage={forcusMessage}
                conversation={conversation}
              />
            )}
            <div className=" h-fit min-w-20 max-w-full flex flex-col items-start justify-around text-wrap ">
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
              <span className="text-[12px] text-gray-400">
                {addHoursAndFormatToHHMM(new Date(message.senderDate), 7)}
              </span>
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
              conversation={conversation}
              setReplyMessage={setReplyMessage}
            />
          )}
        </div>
      ) : (
        <RetrieveMessages
          avt={getImageUserChat(message.sender.id, conversation)}
          message={message}
        />
      )}
    </div>
  );
}
