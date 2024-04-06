import React, { useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { MdAttachFile } from "react-icons/md";
import { FaRegFolder } from "react-icons/fa";
import Sticker from "../custom/Sticker";
import Emoji from "../custom/Emoji";
import { BsFillSendFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { uploadFile } from "../../../services/Azure_Service";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import InputVioce from "../custom/inputVioce";
const host = process.env.REACT_APP_HOST;
const sockjs = new SockJS(`${host}/ws`);
const stompClient = over(sockjs);
stompClient.connect({}, () => {
  console.log("run");
});

export default function InputMessage({
  conversation,
  setIndex,
  receiver,
  setMessages,
  messages,
  setIsLoading,
}) {
  var user = useSelector((state) => state.data);

  const sender = {
    id: user.id,
  };

  var [text, setText] = useState("");

  function sendMessage(message) {
    if (stompClient && stompClient.connected) {
      stompClient.send(
        "/app/private-single-message",
        {},
        JSON.stringify(message)
      );
      setMessages([message, ...messages]);
      setIsLoading(false);
    }
  }

  var mimeTypeMapping = {
    "image/png": "PNG",
    "image/jpeg": "JPEG",
    "image/jpg": "JPG",
    "image/gif": "GIF",
    "audio/mpeg": "MP3",
    "application/pdf": "PDF",
    "application/msword": "DOC",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "DOCX",
    "application/vnd.ms-powerpoint": "PPT",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      "PPTX",
    "application/vnd.rar": "RAR",
    "application/json": "JSON",
    "application/xml": "XML",
    "text/csv": "CSV",
    "text/html": "HTML",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "XLSX",
    "application/vnd.ms-excel": "XLS",
    "application/zip": "ZIP",
    "text/plain": "TXT",
  };
  function getFileTypeFromMimeType(mimeType) {
    console.log(mimeType);
    if (mimeType.startsWith("video/")) {
      return "VIDEO";
    } else if (mimeType.trim() === "") {
      return "RAR";
    }
    return mimeTypeMapping[mimeType] || "UNKNOWN";
  }
  return (
    <div className="flex flex-col h-28 border-t-2">
      <div className=" h-12 p-1 flex flex-row items-center justify-start border-b">
        <Sticker
          setIndex={setIndex}
          conversation={conversation}
          receiver={receiver}
          sender={sender}
          sendMessage={sendMessage}
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
                  setIsLoading(true);
                  const fileSize = e.target.files[0].size;
                  const url = await uploadFile(e.target.files[0]);
                  const typeFileArr = e.target.files[0].type.split("/");
                  const type =
                    typeFileArr[typeFileArr.length - 1].toUpperCase();
                  const content = {
                    id: v4(),
                    messageType: type,
                    sender: sender,
                    receiver: receiver,
                    seen: [
                      {
                        id: user.id,
                      },
                    ],
                    size: fileSize,
                    titleFile: e.target.files[0].name,
                    url: url,
                  };
                  sendMessage(content);
                  e.target.value = "";
                  setIndex(receiver.id);
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
                  const file = e.target.files[0];
                  const fileSize = file.size;
                  console.log("file");
                  if (fileSize >= 10485760) {
                    alert("Kích thước file không được quá 10MB");
                    console.log(file);
                    e.target.value = "";
                    return;
                  }
                  setIsLoading(true);
                  console.log(e.target.files[0]);
                  const url = await uploadFile(e.target.files[0]);
                  const type = getFileTypeFromMimeType(e.target.files[0].type);
                  const content = {
                    id: v4(),
                    messageType: type,
                    senderDate: new Date(),
                    sender: sender,
                    receiver: receiver,
                    seen: [
                      {
                        id: user.id,
                      },
                    ],
                    size: fileSize,
                    titleFile: e.target.files[0].name,
                    url: url,
                  };
                  console.log(content);
                  setIndex(receiver.id);
                  sendMessage(content);
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
                sender: sender,
                receiver: {
                  id: receiver.id,
                },
                seen: [
                  {
                    id: user.id,
                  },
                ],
                content: text,
              };
              e.preventDefault();
              sendMessage(content);
              setText(" ".trim());
              setIndex(receiver.id);
            }
          }}
          placeholder={`Nhập tin nhắn gửi tới đối phương`}
          type="text"
          className="h-full w-11/12 text-wrap resize-none focus:outline-none p-2"
        />
        <div className="flex flex-row justify-center items-start h-full pt-3 px-3">
          <div className=" h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2">
            <InputVioce
              setIndex={setIndex}
              conversation={conversation}
              receiver={receiver}
              sender={sender}
              sendMessage={sendMessage}
            />
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
