import React from "react";
import { BsCameraVideo, BsFillSendFill } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { PiTagSimpleFill } from "react-icons/pi";
import { VscLayoutSidebarRightOff } from "react-icons/vsc";
import { LuSticker } from "react-icons/lu";
import { IoImageOutline } from "react-icons/io5";
import {
  MdAttachFile,
  MdOutlineEmojiEmotions,
  MdOutlineKeyboardVoice,
} from "react-icons/md";
import { FaRegFolder } from "react-icons/fa";
import Sticker from "../custom/Sticker";
import Emoji from "../custom/Emoji";

export default function ChatRoom(props) {
  var data = {
    id: 1,
    name: "Trân",
    image:
      "https://s120-ava-talk.zadn.vn/c/b/f/1/8/120/fa77be6399bd4028983cfc723dda9494.jpg",
    tag: "bạn bè",
    message: {},
  };

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
          class="bg-image bg-cover bg-center relative h-[765px] w-full"
          style={{ backgroundImage: `url(${data.image})` }}
        >
          <div class="absolute inset-0 opacity-65 bg-white flex flex-col justify-end p-10">a</div>
        </div>
        <div className="flex flex-col h-28 ">
          <div className=" h-12 p-1 flex flex-row items-center justify-start border-b">
            <Sticker />
            <div className=" h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2">
              <label for="dropzone-image">
                <input
                  id="dropzone-image"
                  accept="image/jpeg, image/png"
                  className="hidden"
                  type="file"
                />
                <IoImageOutline className="text-2xl" />
              </label>
            </div>
            <div className=" h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2">
              <label for="dropzone-file">
                <input id="dropzone-file" className="hidden" type="file" />
                <MdAttachFile className="text-2xl rotate-45" />
              </label>
            </div>
            <div className=" h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2">
              <label for="dropzone-folder">
                <input
                  type="file"
                  id="dropzone-folder"
                  name="myfile"
                  className="hidden"
                  {...{ webkitdirectory: "", mozdirectory: "", directory: "" }}
                />
                <FaRegFolder className="text-2xl" />
              </label>
            </div>
          </div>
          <div className="h-16 flex flex-row items-center">
            <textarea
              placeholder={`Nhập tin nhắn gửi tới ${data.name}`}
              type="text"
              className="h-full w-11/12 text-wrap resize-none focus:outline-none p-2"
            />
            <div className="flex flex-row justify-center items-start h-full pt-3 px-3">
              <div className=" h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2">
                <MdOutlineKeyboardVoice className="text-2xl" />
              </div>
              <Emoji />
              <div className=" h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2 hover:text-blue-600">
                <BsFillSendFill className="text-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
