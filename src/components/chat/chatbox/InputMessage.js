import React, { useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { MdAttachFile, MdOutlineKeyboardVoice } from "react-icons/md";
import { FaRegFolder } from "react-icons/fa";
import Sticker from "../custom/Sticker";
import Emoji from "../custom/Emoji";
import { BsFillSendFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { updateMessage } from "../../../redux_Toolkit/slices";
import { v4 } from "uuid";
import { uploadFile } from "../../../services/Azure_Service";
import SockJS from "sockjs-client";
import { over } from "stompjs";
const socket = new SockJS("https://deploybackend-production.up.railway.app/ws");
const stompClient = over(socket);
stompClient.connect({}, () => {});
export default function InputMessage({ conversation, setIndex, receiver }) {
  var user = useSelector((state) => state.data);
  var dispatch = useDispatch();
  const sender = {
    id: user.id,
    userName: user.userName,
    avt: user.avt,
  };

  var [text, setText] = useState("");

  function sendMessage(message) {
    stompClient.send(
      "/app/private-single-message",
      {},
      JSON.stringify(message)
    );
  }

  return (
    <div className="flex flex-col h-28 border-t-2">
      <div className=" h-12 p-1 flex flex-row items-center justify-start border-b">
        <Sticker
          setIndex={setIndex}
          conversation={conversation}
          receiver={receiver}
          sender={sender}
        />
        <div className=" h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2">
          <label htmlFor="dropzone-image">
            <input
              id="dropzone-image"
              accept="image/*"
              className="hidden"
              type="file"
              onChange={async (e) => {
                if (e.target.files[0]) {
                  const fileSize = e.target.files[0].size;
                  const url = await uploadFile(e.target.files[0]);
                  const typeFileArr = e.target.files[0].type.split("/");
                  const type =
                    typeFileArr[typeFileArr.length - 1].toUpperCase();
                  const content = {
                    id: v4(),
                    messageType: type,
                    senderDate: new Date(),
                    sender: sender,
                    receiver: {
                      id: receiver.id,
                      userName: receiver.userName,
                      avt: receiver.avt,
                    },
                    seen: [
                      {
                        id: user.id,
                        userName: user.userName,
                        avt: user.avt,
                      },
                    ],
                    size: fileSize,
                    titleFile: e.target.files[0].name,
                    url: url,
                  };
                  let newMessage = { ...conversation };
                  newMessage.messages = [...conversation.messages, content];
                  dispatch(updateMessage(newMessage));
                  e.target.value = "";
                  setIndex(0);
                }
              }}
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
              onChange={async (e) => {
                if (e.target.files[0]) {
                  const fileSize = e.target.files[0].size;
                  if (fileSize >= 10485760) {
                    alert("Kích thước file không được quá 10MB");
                    e.target.value = "";
                    return;
                  }
                  console.log(e.target.files[0]);
                  const url = await uploadFile(e.target.files[0]);
                  const typeFileArr = e.target.files[0].type.split("/");
                  const type =
                    typeFileArr[typeFileArr.length - 1].toUpperCase();
                  const content = {
                    id: v4(),
                    messageType: type,
                    senderDate: new Date(),
                    sender: sender,
                    receiver: {
                      id: receiver.id,
                      userName: receiver.userName,
                      avt: receiver.avt,
                    },
                    seen: [
                      {
                        id: user.id,
                        userName: user.userName,
                        avt: user.avt,
                      },
                    ],
                    size: fileSize,
                    titleFile: e.target.files[0].name,
                    url: url,
                  };
                  let newMessage = { ...conversation };
                  newMessage.messages = [...conversation.messages, content];
                  dispatch(updateMessage(newMessage));
                  e.target.value = "";
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
                id: v4(),
                messageType: "Text",
                senderDate: new Date(),
                sender: sender,
                receiver: {
                  id: receiver.id,
                  userName: receiver.userName,
                  avt: receiver.avt,
                },
                seen: [
                  {
                    id: user.id,
                    userName: user.userName,
                    avt: user.avt,
                  },
                ],
                content: text,
              };
              e.preventDefault();
              sendMessage(content);
              let newMessage = { ...conversation };
              newMessage.messages = [...conversation.messages, content];
              dispatch(updateMessage(newMessage));
              setText(" ".trim());
              setIndex(0);
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
