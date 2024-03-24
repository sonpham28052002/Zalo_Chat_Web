import React, { useState } from "react";
import { BiSolidFilePdf } from "react-icons/bi";
import NavIconInteract from "./NavIconInteract";
import {v4} from "uuid"
export default function Conversation({ conversation }) {
  console.log("messages");
  console.log(conversation);
  function ContentText({ message }) {
    console.log("message");
    console.log(message);
    let [messageLocal, setMessageLocal] = useState(message);
    return (
      <div
        className={`  h-fit w-full  flex flex-row ${
          conversation.id === message.sender ? "justify-start" : "justify-end"
        } items-star  my-5 `}
        key={message.id}
      >
        {conversation.id === message.sender && (
          <img
            src={conversation.avt}
            alt="#"
            className="h-12 w-12 rounded-full mr-3"
          />
        )}
        <div className=" relative h-full max-w-[50%] min-w-20 w-fit bg-[#e5efff] rounded-md flex flex-row justify-start items-center border  shadow-lg p-2">
          <div className=" h-fit flex flex-col items-start justify-around">
            <p className=" ">{messageLocal.content}</p>
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
          <NavIconInteract
            icon={message.interact}
            setMessage={setMessageLocal}
            message={messageLocal}
          />
        </div>
      </div>
    );
  }

  function ContentFile({ file }) {
    return (
      <div
        className="h-full w-fit bg-[#e5efff] rounded-md flex flex-row justify-evenly items-center border  shadow-lg"
        key={file.id}
      >
        <div className="h-fit flex flex-col items-center justify-end">
          <BiSolidFilePdf className="text-7xl text-[#ff5845]" />
          {/* <span className="text-[12px] text-gray-400">{`${message[0].createDateTime.getHours()}:${message[0].createDateTime.getMinutes()}`}</span> */}
        </div>
        <div className=" h-full w-48 py-2 ">
          <div className="">
            <p></p>
          </div>
        </div>
      </div>
    );
  }
  function ContentSticker({ sticker }) {
    return (
      <div
        className=" relative h-fit w-full  flex flex-col items-end my-3"
        key={sticker.id}
      >
        <div className="h-full max-w-[50%] w-fit  p-2">
          <div className=" h-fit flex flex-col items-start justify-around">
            <img src={sticker.url} alt="#" className="h-28 w-28" />
            
          </div>
        </div>
      </div>
    );
  }

  function ContentImage({ image }) {
    return (
      <div
        className=" relative h-fit w-full  flex flex-col items-end my-3 "
        key={image.id}
      >
        <div className="h-full max-w-[20%] w-fit border shadow-lg rounded-md">
          <div className=" h-fit flex flex-col items-start justify-around rounded-md">
            <img src={image.url} alt="#" className="" />
          </div>
        </div>
        <span className="text-[12px] px-4 text-gray-400">{`${
              new Date(image.senderDate).getHours() < 10
                ? "0" + new Date(image.senderDate).getHours()
                : new Date(image.senderDate).getHours()
            }:${
              new Date(image.senderDate).getMinutes() < 10
                ? "0" + new Date(image.senderDate).getMinutes()
                : new Date(image.senderDate).getMinutes()
            }`}</span>
      </div>
    );
  }

  return (
    <div className="p-5 h-fit">
      {conversation.messages.map((item) => {
        if (item.messageType === "Text") {
          return <ContentText key={item.id} message={item} />;
        } else if (item.messageType.startsWith("application/")) {
          return <ContentFile key={item.id} file={item} />;
        } else if (item.messageType === "PNG" || item.messageType === "JPEG" || item.messageType === "JPG" || item.messageType === "GIF"  ) {
          return <ContentImage key={item.id} image={item} />;
        }else if(item.messageType === "STICKER"){
          return <ContentSticker key={item.id} sticker={item} />;
        }
        return <div key={v4()}></div>;
      })}
    </div>
  );
}
