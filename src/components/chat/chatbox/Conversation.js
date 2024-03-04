import React, { useState } from "react";
import { BiSolidFilePdf } from "react-icons/bi";
import NavIconInteract from "./NavIconInteract";

export default function Conversation({ messages }) {
  function ContentText({ message }) {
    let [messageLocal, setMessageLocal] = useState(message);
    return (
      <div
        className=" relative h-fit w-full  flex flex-col items-end my-3"
        key={message.id}
      >
        <div className="h-full max-w-[50%] min-w-20 w-fit bg-[#e5efff] rounded-md flex flex-row justify-start items-center border  shadow-lg p-2">
          <div className=" h-fit flex flex-col items-start justify-around">
            <p className=" ">{messageLocal.message}</p>
            <span className="text-[12px] text-gray-400">{`${
              new Date(message.createDateTime).getHours() < 10
                ? "0" + new Date(message.createDateTime).getHours()
                : new Date(message.createDateTime).getHours()
            }:${
              new Date(message.createDateTime).getMinutes() < 10
                ? "0" + new Date(message.createDateTime).getMinutes()
                : new Date(message.createDateTime).getMinutes()
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
            <img src={sticker.src} alt="#" className="h-28 w-28" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="p-5 h-fit">
      {messages.conversation.map((item) => {
      

        if (item.type === "text/content") {
          return <ContentText key={item.id} message={item} />;
        } else if (item.type.startsWith("application/")) {
          return <ContentFile key={item.id} file={item} />;
        } else if (item.type === "image/Sticker") {
          return <ContentSticker key={item.id} sticker={item} />;
        }
        return <div key={"21212"}></div>;
      })}
    </div>
  );
}
