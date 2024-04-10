import React, { useState, useRef } from "react";
import NavIconInteract from "../chatbox/NavIconInteract";
import { useSelector } from "react-redux";
import HandleMessage from "./handleMessage";
import RetrieveMessages from "./RetrieveMessages";

export default function ImageMessage({
  avt,
  image,
  ownerID,
  setIsOpenForwardMessage,
  conversation,
}) {
  let [messageLocal, setMessageLocal] = useState(image);
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

  return (
    <div className="h-fit">
      {!isRetrieve ? (
        <div
          ref={refMessage}
          className={` relative h-fit w-full  flex flex-row items-end my-3  py-5 rotate-180  ${
            owner.id === image.sender.id
              ? "justify-end pr-5"
              : "justify-start pl-5"
          }`}
          key={image.id}
        >
          {owner.id !== image.sender.id && (
            <img
              src={getImageUserChat(image.sender.id, conversation)}
              alt="#"
              className="h-12 w-12 rounded-full mr-3"
            />
          )}
          {owner.id === image.sender.id && (
            <HandleMessage
              refMessage={refMessage}
              message={image}
              setIsRetrieve={setIsRetrieve}
              setIsOpenForwardMessage={setIsOpenForwardMessage}
              conversation={conversation}

            />
          )}
          <div className="relative h-full max-w-[40%] w-fit border shadow-lg rounded-md ">
            <div className="  h-fit flex flex-col items-start justify-around rounded-md ">
              <img
                src={image.url}
                alt="#"
                className="overflow-hidden rounded-md min-w-60 h-52 w-auto "
              />
            </div>
            <div className="flex flex-row justify-between items-center absolute w-full pt-1 ">
              <span className=" text-[12px] px-4 text-gray-400 ">
                {addHoursAndFormatToHHMM(new Date(image.senderDate), 7)}
              </span>
              <NavIconInteract
                check={ownerID !== image.sender.id}
                icon={image.interact}
                setMessage={setMessageLocal}
                message={messageLocal}
              />
            </div>
          </div>
          {owner.id !== image.sender.id && (
            <HandleMessage
              refMessage={refMessage}
              message={image}
              setIsRetrieve={setIsRetrieve}
              setIsOpenForwardMessage={setIsOpenForwardMessage}
              conversation={conversation}

            />
          )}
        </div>
      ) : (
        <RetrieveMessages
          message={image}
          avt={getImageUserChat(image.sender.id, conversation)}
        />
      )}
    </div>
  );
}
