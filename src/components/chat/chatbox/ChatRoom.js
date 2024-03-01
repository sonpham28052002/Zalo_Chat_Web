import React, { useEffect, useRef, useState } from "react";
import { BsCameraVideo } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { PiTagSimpleFill } from "react-icons/pi";
import { VscLayoutSidebarRightOff } from "react-icons/vsc";
import "../../../style/scrollBar.css";
import Conversation from "./Conversation";
import InputMessage from "./InputMessage";
import { v4 as uuidv4 } from "uuid";

export default function ChatRoom({ conversation }) {
  var data = {
    id: 1,
    name: "Trân",
    image:
      "https://s120-ava-talk.zadn.vn/c/b/f/1/8/120/fa77be6399bd4028983cfc723dda9494.jpg",
    tag: "bạn bè",
    message: {},
  };

  var [message, setMessage] = useState([
    {
      id: uuidv4(),
      type: "text/content",
      content:
        "You can let the app developer know that this app doesn't comply with one or more Google validation rules.Tìm hiểu thêm về lỗi này Nếu bạn là nhà phát triển của Nike, hãy xem",
      createDateTime: new Date(),
      sender: "son",
      interact: "👍",
    },
    {
      id: uuidv4(),
      type: "text/content",
      content:
        "You can let the app developer know that this app doesn't comply with one or more Google validation rules.Tìm hiểu thêm về lỗi này Nếu bạn là nhà phát triển của Nike, hãy xem",
      createDateTime: new Date(),
      interact: "👍",
      sender: "tran",
    },
  ]);
  const scrollContainerRef = useRef(null);

  const scrollToBottom = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [message]);

  return (
    <div className=" h-full w-10/12 ">
      <div className="border-b flex flex-row items-center justify-between px-4 ">
        <div className="flex flex-row w-1/5 py-2">
          <img
            className="rounded-full h-12  mr-1 border border-white "
            alt="#"
            src={data.image}
          ></img>
          <div>
            <h1 className="font-medium text-lg">{data.name}</h1>
            <div className="flex flex-row items-center">
              <p className="text-xs border-r pr-2 mr-2 font-medium text-gray-400">
                Truy cập 4 giờ trước
              </p>
              <div className="flex flex-row items-center">
                <PiTagSimpleFill className={`mr-1`} />
                <p className="text-sm">Bạn bè</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className=" h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2">
            <IoIosSearch className="text-2xl " />
          </div>
          <div className=" h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2">
            <BsCameraVideo className="text-xl " />
          </div>
          <div className=" h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2">
            <VscLayoutSidebarRightOff className="text-xl " />
          </div>
        </div>
      </div>
      <div className="h-[877px]">
        <div
          className="bg-image bg-cover bg-center relative h-[765px] w-full"
          style={{ backgroundImage: `url(${data.image})` }}
        >
          <div className="absolute inset-0 opacity-65 bg-white"></div>
          <div
            ref={scrollContainerRef}
            className="absolute  bottom-0 max-h-[752px] w-full flex flex-col justify-items-end overflow-y-auto scrollbar-container my-2 "
          >
            <Conversation messages={message} />
          </div>
        </div>
        <InputMessage message={message} setMessage={setMessage} />
      </div>
    </div>
  );
}
