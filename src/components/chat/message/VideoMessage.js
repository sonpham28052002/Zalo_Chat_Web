import React, { useState, useRef } from "react";
import NavIconInteract from "../chatbox/NavIconInteract";
import { useSelector } from "react-redux";
import HandleMessage from "./handleMessage";
import RetrieveMessages from "./RetrieveMessages";

export default function VideoMessage({ avt, video, ownerID }) {
  let [messageLocal, setMessageLocal] = useState(video);
  var owner = useSelector((state) => state.data);
  var [isRetrieve, setIsRetrieve] = useState(false);
  var refMessage = useRef(null);
  return (
    <>
      {!isRetrieve ? (
        <div
          ref={refMessage}
          className={` relative h-fit w-full  flex flex-row items-end my-3  py-5 rotate-180  ${
            owner.id === video.sender.id
              ? "justify-end pr-5"
              : "justify-start pl-5"
          }`}
          key={video.id}
        >
          {owner.id !== video.sender.id && (
            <img src={avt} alt="#" className="h-12 w-12 rounded-full mr-3" />
          )}
          {owner.id === video.sender.id && (
            <HandleMessage
              refMessage={refMessage}
              message={video}
              setIsRetrieve={setIsRetrieve}
            />
          )}
          <div className="relative h-full max-w-[40%] w-fit border shadow-lg rounded-md ">
            <div className="  h-fit flex flex-col items-start justify-around rounded-md ">
              <img alt="#" />
              <video
                className="overflow-hidden rounded-md min-w-60 h-52 w-auto "
                controls
              >
                <source src={video.url} type="video/mp4" />
              </video>
            </div>
            <div className="flex flex-row justify-between items-center absolute w-full pt-1 ">
              <span className=" text-[12px] px-4 text-gray-400 ">{`${
                new Date(video.senderDate).getHours() < 10
                  ? "0" + new Date(video.senderDate).getHours()
                  : new Date(video.senderDate).getHours()
              }:${
                new Date(video.senderDate).getMinutes() < 10
                  ? "0" + new Date(video.senderDate).getMinutes()
                  : new Date(video.senderDate).getMinutes()
              }`}</span>
              <NavIconInteract
                check={ownerID === video.receiver.id}
                icon={video.ract}
                setMessage={setMessageLocal}
                message={messageLocal}
              />
            </div>
          </div>
          {owner.id !== video.sender.id && (
            <HandleMessage
              refMessage={refMessage}
              message={video}
              setIsRetrieve={setIsRetrieve}
            />
          )}
        </div>
      ) : (
        <RetrieveMessages message={video} avt={avt} />
      )}
    </>
  );
}
