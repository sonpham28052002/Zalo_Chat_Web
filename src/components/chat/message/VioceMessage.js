import React, { useState, useRef } from "react";
import NavIconInteract from "../chatbox/NavIconInteract";
import { useSelector } from "react-redux";
import HandleMessage from "./handleMessage";
import RetrieveMessages from "./RetrieveMessages";
import ReplyViewMessage from "../replyMessage/ReplyViewMessage";
import TotalReact from "../chatbox/TotalReact";
import { useSubscription } from "react-stomp-hooks";

export default function VioceMessage({
  avt,
  vioce,
  ownerID,
  setIsOpenForwardMessage,
  conversation,
  setReplyMessage,
  forcusMessage,
  isOpenEmotion,
  updateMessage,
  seen,
}) {
  let [messageLocal, setMessageLocal] = useState(vioce);
  var owner = useSelector((state) => state.data);
  var [isRetrieve, setIsRetrieve] = useState(false);
  var refMessage = useRef(null);

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
  useSubscription("/user/" + messageLocal.id + "/react-message", (messages) => {
    let mess = JSON.parse(messages.body);
    updateMessage(mess);
  });

  function renderSeen(message) {
    const arrSeen = seen.filter((item) => item.indexMessage === message.id);
    return arrSeen.map((item, index) => (
      <img
        key={index}
        src={item.user.avt}
        alt=""
        className="h-4 w-4 rounded-full shadow-lg border-white border mx-[1px]"
      />
    ));
  }

  return (
    <div className="h-fit ">
      <div className=" rotate-180 flex flex-row justify-end px-2">
        {renderSeen(vioce)}
      </div>
      {!isRetrieve ? (
        <div
          ref={refMessage}
          className={` relative h-fit w-full  flex flex-row items-end my-3 bg-transparent py-5 rotate-180   ${
            owner.id === vioce.sender.id
              ? "justify-end pr-5"
              : "justify-start pl-5"
          }`}
          key={vioce.id}
        >
          {owner.id !== vioce.sender.id && (
            <img
              src={getImageUserChat(vioce.sender.id, conversation)}
              alt="#"
              className="h-12 w-12 rounded-full mr-3"
            />
          )}
          {owner.id === vioce.sender.id && (
            <HandleMessage
              refMessage={refMessage}
              message={vioce}
              setIsRetrieve={setIsRetrieve}
              setIsOpenForwardMessage={setIsOpenForwardMessage}
              conversation={conversation}
              setReplyMessage={setReplyMessage}
            />
          )}
          <div
            className={`relative h-full  max-w-[40%] w-fit  border-0  shadow-lg rounded-md ${
              vioce.replyMessage && "p-2 bg-[#aabddb] "
            }`}
          >
            {vioce.replyMessage && (
              <ReplyViewMessage
                replyMessage={vioce.replyMessage}
                forcusMessage={forcusMessage}
                conversation={conversation}
                message={vioce}
              />
            )}

            <div
              className={` h-fit flex flex-col items-center justify-around  ${
                vioce.replyMessage && "mt-1"
              } `}
            >
              {vioce.url && (
                <video className="h-14 w-60" controls>
                  <source src={vioce.url} type="audio/mp3" />
                  <source src={vioce.url} type="audio/mpeg" />
                  <source src={vioce.url} type="audio/3gp" />
                </video>
              )}
            </div>
            <div className="flex flex-row justify-between  items-center absolute w-full pt-1 ">
              <span className=" text-[12px] px-4  text-gray-400 ">
                {addHoursAndFormatToHHMM(new Date(vioce.senderDate), 7)}
              </span>
              <div
                className={`w-fit flex flex-row justify-center ${
                  vioce.replyMessage && "mt-5"
                }`}
              >
                {messageLocal.react.length !== 0 && (
                  <TotalReact
                    isOpenEmotion={isOpenEmotion}
                    messageSelect={messageLocal}
                  />
                )}
                <NavIconInteract
                  check={ownerID !== vioce.sender.id}
                  icon={vioce.ract}
                  setMessage={setMessageLocal}
                  message={messageLocal}
                />
              </div>
            </div>
          </div>
          {owner.id !== vioce.sender.id && (
            <HandleMessage
              refMessage={refMessage}
              message={vioce}
              setIsRetrieve={setIsRetrieve}
              setIsOpenForwardMessage={setIsOpenForwardMessage}
              conversation={conversation}
              setReplyMessage={setReplyMessage}
            />
          )}
        </div>
      ) : (
        <RetrieveMessages
          message={vioce}
          avt={getImageUserChat(vioce.sender.id, conversation)}
        />
      )}
    </div>
  );
}
