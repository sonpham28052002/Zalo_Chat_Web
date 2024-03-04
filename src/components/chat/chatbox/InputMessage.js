import React, { useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { MdAttachFile, MdOutlineKeyboardVoice } from "react-icons/md";
import { FaRegFolder } from "react-icons/fa";
import Sticker from "../custom/Sticker";
import Emoji from "../custom/Emoji";
import { BsFillSendFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { updateMessage } from "../../../redux_Toolkit/slices";

export default function InputMessage({ message, setMessage,setIndex }) {
  var  user = useSelector(state => state.data)
  var dispatch = useDispatch()

  var [text, setText] = useState("");
  function formatFileSize(size) {
    if (size < 1024) {
      return size.toFixed(2) + "B";
    } else if (size < 1024 * 1024) {
      return (size / 1024).toFixed(2) + "KB";
    } else if (size < 1024 * 1024 * 1024) {
      return (size / (1024 * 1024)).toFixed(2) + "MB";
    } else {
      return (size / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    }
  }
  return (
    <div className="flex flex-col h-28 ">
      <div className=" h-12 p-1 flex flex-row items-center justify-start border-b">
        <Sticker setIndex={setIndex} message={message} />
        <div className=" h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2">
          <label htmlFor="dropzone-image">
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
          <label htmlFor="dropzone-file">
            <input
              id="dropzone-file"
              className="hidden"
              type="file"
              onChange={(e) => {
                if (e.target.files[0]) {
                  const fileSize = e.target.files[0].size;
                  console.log(e.target.files[0]);
                  console.log(formatFileSize(fileSize));
                }
              }}
            />
            <MdAttachFile className="text-2xl rotate-45" />
          </label>
        </div>
        <div className=" h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2">
          <label htmlFor="dropzone-folder">
            <input
              type="file"
              id="dropzone-folder"
              name="myfile"
              className="hidden"
              {...{ webkitdirectory: "", mozdirectory: "", directory: "" }}
              onChange={(e) => {
                console.log(e.target.files);
              }}
            />
            <FaRegFolder className="text-2xl" />
          </label>
        </div>
      </div>
      <div className="h-16 flex flex-row items-center">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13 && text.trim() === "") {
              e.preventDefault();
            } else if (e.key === "Enter" && text.trim() !== "") {
              let content = {
                id: uuidv4(),
                type: "text/content",
                message: text,
                createDateTime: new Date(),
                sender: user.id,
              };
              console.log(content)
              e.preventDefault();
              let newMessage = {...message}
              newMessage.conversation =[...message.conversation, content]
              dispatch(updateMessage(newMessage))
              setText(" ".trim());
              setIndex(0)
            }
          }}
          placeholder={`Nhập tin nhắn gửi tới đối phương`}
          type="text"
          className="h-full w-11/12 text-wrap resize-none focus:outline-none p-2"
        />
        <div className="flex flex-row justify-center items-start h-full pt-3 px-3">
          <div className=" h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2">
            <MdOutlineKeyboardVoice className="text-2xl" />
          </div>
          <Emoji setText={setText} text={text} />
          <div className=" h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2 hover:text-blue-600">
            <BsFillSendFill className="text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
