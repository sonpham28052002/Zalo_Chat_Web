import React, { useState, useRef } from "react";
import NavIconInteract from "../chatbox/NavIconInteract";
import { useSelector } from "react-redux";
import HandleMessage from "./handleMessage";
import RetrieveMessages from "./RetrieveMessages";

export default function VioceMessage({
  avt,
  vioce,
  ownerID,
  setIsOpenForwardMessage,
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
  return (
    <div className="h-fit">
      {!isRetrieve ? (
        <div
          ref={refMessage}
          className={` relative h-fit w-full  flex flex-row items-end my-3 bg-transparent py-5 rotate-180  ${
            owner.id === vioce.sender.id
              ? "justify-end pr-5"
              : "justify-start pl-5"
          }`}
          key={vioce.id}
        >
          {owner.id !== vioce.sender.id && (
            <img src={avt} alt="#" className="h-12 w-12 rounded-full mr-3" />
          )}
          {owner.id === vioce.sender.id && (
            <HandleMessage
              refMessage={refMessage}
              message={vioce}
              setIsRetrieve={setIsRetrieve}
              setIsOpenForwardMessage={setIsOpenForwardMessage}
            />
          )}
          <div className="relative h-full max-w-[40%] w-fit bg-transparent border-0  shadow-lg rounded-md ">
            <div className="  h-fit flex flex-col items-start justify-around rounded-md ">
              <audio controls>
                <source src={vioce.url} type="audio/mpeg" />
                <source src={vioce.url} type="audio/3gp" />
              </audio>
            </div>
            <div className="flex flex-row justify-between  items-center absolute w-full pt-1 ">
              <span className=" text-[12px] px-4 text-gray-400 ">
                {addHoursAndFormatToHHMM(new Date(vioce.senderDate), 7)}
              </span>
              <NavIconInteract
                check={ownerID === vioce.receiver.id}
                icon={vioce.ract}
                setMessage={setMessageLocal}
                message={messageLocal}
              />
            </div>
          </div>
          {owner.id !== vioce.sender.id && (
            <HandleMessage
              refMessage={refMessage}
              message={vioce}
              setIsRetrieve={setIsRetrieve}
              setIsOpenForwardMessage={setIsOpenForwardMessage}
            />
          )}
        </div>
      ) : (
        <RetrieveMessages message={vioce} avt={avt} />
      )}
    </div>
  );
}
