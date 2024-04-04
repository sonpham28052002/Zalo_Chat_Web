import React, { useState, useRef } from "react";
import NavIconInteract from "../chatbox/NavIconInteract";
import { useSelector } from "react-redux";
import RetrieveMessage from "./RetrieveMessage";
import HandleMessage from "./handleMessage";

export default function ImageMessage({ avt, image, ownerID }) {
  let [messageLocal, setMessageLocal] = useState(image);
  var owner = useSelector((state) => state.data);
  var [isRetrieve, setIsRetrieve] = useState(false);
  var refMessage = useRef(null);

  return (
    <div
      ref={refMessage}
      className={` relative h-fit w-full  flex flex-row items-end my-3  py-5 rotate-180  ${
        owner.id === image.sender.id ? "justify-end pr-5" : "justify-start pl-5"
      }`}
      key={image.id}
    >
      {owner.id !== image.sender.id && (
        <img src={avt} alt="#" className="h-12 w-12 rounded-full mr-3" />
      )}
      {!isRetrieve ? (
        <>
          {owner.id === image.sender.id && (
            <HandleMessage
              refMessage={refMessage}
              message={image}
              setIsRetrieve={setIsRetrieve}
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
              <span className=" text-[12px] px-4 text-gray-400 ">{`${
                new Date(image.senderDate).getHours() < 10
                  ? "0" + new Date(image.senderDate).getHours()
                  : new Date(image.senderDate).getHours()
              }:${
                new Date(image.senderDate).getMinutes() < 10
                  ? "0" + new Date(image.senderDate).getMinutes()
                  : new Date(image.senderDate).getMinutes()
              }`}</span>
              <NavIconInteract
                check={ownerID === image.receiver.id}
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
            />
          )}
        </>
      ) : (
        <RetrieveMessage message={image} />
      )}
    </div>
  );
}
