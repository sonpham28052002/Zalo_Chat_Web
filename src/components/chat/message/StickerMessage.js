import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import HandleMessage from "./handleMessage";
import RetrieveMessages from "./RetrieveMessages";
import ReplyViewMessage from "../replyMessage/ReplyViewMessage";
import TotalReact from "../chatbox/TotalReact";
import NavIconInteract from "../chatbox/NavIconInteract";

export default function StickerMessage({
  avt,
  sticker,
  ownerID,
  setIsOpenForwardMessage,
  conversation,
  setReplyMessage,
  forcusMessage,
  isOpenEmotion,
}) {
  var owner = useSelector((state) => state.data);
  var refMessage = useRef(null);
  var [isRetrieve, setIsRetrieve] = useState(false);
  let [messageLocal, setMessageLocal] = useState(sticker);

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

  function getImageUserChat(userId, conversation) {
    if (conversation.conversationType === "group") {
      return conversation.members.filter((item) => item.member.id === userId)[0]
        .member.avt;
    } else {
      return avt;
    }
  }
  return (
    <div className="h-fit">
      {!isRetrieve ? (
        <div
          className={` pr-5  h-fit w-full  flex  flex-row items-end rotate-180 ${
            owner.id === sticker.sender.id
              ? "justify-end pr-5"
              : "justify-start pl-5"
          } items-star  my-5 `}
          key={sticker.id}
        >
          {owner.id !== sticker.sender.id && (
            <img
              src={getImageUserChat(sticker.sender.id, conversation)}
              alt="#"
              className="h-12 w-12 rounded-full mr-3"
            />
          )}
          <div className="mb-4">
            {owner.id === sticker.sender.id && (
              <HandleMessage
                refMessage={refMessage}
                message={sticker}
                setIsRetrieve={setIsRetrieve}
                setIsOpenForwardMessage={setIsOpenForwardMessage}
                conversation={conversation}
                setReplyMessage={setReplyMessage}
              />
            )}
          </div>
          <div className=" relative h-full w-fit max-w-[450%] p-2">
            <div
              className={` h-fit w-fit flex flex-col items-start justify-around rounded-md ${
                sticker.replyMessage && "p-2 bg-[#aabddb] "
              }`}
            >
              {sticker.replyMessage && (
                <ReplyViewMessage
                  replyMessage={sticker.replyMessage}
                  forcusMessage={forcusMessage}
                  conversation={conversation}
                />
              )}
              <div className="w-full flex flex-row justify-center ">
                <img src={sticker.url} alt="#" className="h-40  w-40" />
              </div>
            </div>
            <div className="flex w-full flex-row justify-between  items-center absolute pt-1">
              <span className=" text-[12px] px-4 text-gray-400 ">
                {addHoursAndFormatToHHMM(new Date(sticker.senderDate), 7)}
              </span>
              <div className="flex flex-row mt-3">
                {messageLocal.react.length !== 0 && (
                  <TotalReact
                    isOpenEmotion={isOpenEmotion}
                    messageSelect={messageLocal}
                  />
                )}
                <NavIconInteract
                  check={ownerID !== sticker.sender.id}
                  icon={sticker.ract}
                  setMessage={setMessageLocal}
                  message={messageLocal}
                />
              </div>
            </div>
          </div>
          {owner.id !== sticker.sender.id && (
            <HandleMessage
              refMessage={refMessage}
              message={sticker}
              setIsRetrieve={setIsRetrieve}
              setIsOpenForwardMessage={setIsOpenForwardMessage}
              conversation={conversation}
              setReplyMessage={setReplyMessage}
            />
          )}
        </div>
      ) : (
        <RetrieveMessages
          message={sticker}
          avt={getImageUserChat(sticker.sender.id, conversation)}
        />
      )}
    </div>
  );
}
