import React from "react";
import { AiFillFilePpt, AiFillFileZip } from "react-icons/ai";
import { FaFileCode, FaFileCsv, FaFileExcel, FaFileWord } from "react-icons/fa";
import { BiSolidFilePdf, BiSolidFileTxt } from "react-icons/bi";
import { IoLogoHtml5 } from "react-icons/io";
import { LuFileJson } from "react-icons/lu";
import { useSelector } from "react-redux";

export default function ReplyViewMessage({
  replyMessage,
  forcusMessage,
  conversation,
}) {
  var owner = useSelector((state) => state.data);
  var findName = () => {
    if (conversation?.conversationType === "single") {
      if (replyMessage?.sender.id === owner.id) {
        return owner.userName;
      } else {
        return conversation.user.userName;
      }
    }
  };

  function renderIconFile(type) {
    if (type === "PDF") {
      return <BiSolidFilePdf className="text-5xl  text-[#ff6350] " />;
    } else if (type === "DOC" || type === "DOCX") {
      return <FaFileWord className="text-5xl  text-[#378ece]" />;
    } else if (type === "RAR" || type === "ZIP") {
      return <AiFillFileZip className="text-5xl text-[#cf81c8]" />;
    } else if (type === "PPT" || type === "PPTX") {
      return <AiFillFilePpt className="text-5xl text-[#ff7e5c]" />;
    } else if (type === "HTML") {
      return <IoLogoHtml5 className="text-5xl text-[#d1ef29]" />;
    } else if (type === "TXT") {
      return <BiSolidFileTxt className="text-5xl text-[#02c1f3]" />;
    } else if (type === "JSON") {
      return <LuFileJson className="text-5xl text-[#bcd049]" />;
    } else if (type === "CSV") {
      return <FaFileCsv className="text-5xl text-[#02c1f3]" />;
    } else if (type === "XLS" || type === "XLSX") {
      return <FaFileExcel className="text-5xl text-[#40ad65]" />;
    } else {
      return <FaFileCode className="text-5xl text-[rgb(33,125,148)]" />;
    }
  }

  function TextMessage({ replyMessage, forcusMessage }) {
    return (
      <div
        className="   h-fit min-w-full max-w-full flex flex-col items-start justify-around text-wrap bg-[#c7e0ff] p-2  border-l-2 border-blue-500"
        onClick={() => {
          forcusMessage(replyMessage);
        }}
      >
        <p className="font-medium text-sm">{findName()}</p>

        {/^(ftp|http|https):\/\/[^ "]+$/.test(replyMessage.content) ? (
          <div className="w-96">
            {/* <Embed url={messageLocal.content} /> */}
            <a
              target="_blank"
              rel="noreferrer"
              className="whitespace-wrap break-words max-w-96 text-xs"
              href={replyMessage?.content}
            >
              {replyMessage?.content}
            </a>
          </div>
        ) : (
          <p className="whitespace-wrap break-words max-w-96 text-xs">
            {replyMessage?.content}
          </p>
        )}
      </div>
    );
  }

  function StickerMessage({ replyMessage, forcusMessage }) {
    return (
      <div
        className="w-full min-w-44 h-16  relative"
        onClick={() => {
          forcusMessage(replyMessage);
        }}
      >
        <div className="w-full bg-[#c7e0ff] h-full py-1 flex flex-row justify-start px-2">
          <div className="h-full w-[2px] bg-blue-500 ml-3 py-1"></div>
          <img alt="." src={replyMessage.url} className="h-12 w-12" />
          <div className="flex flex-col justify-between ml-2 text-sm">
            <p className="">
              Trả lời <span className="font-medium">{findName()}</span>
            </p>{" "}
            <p className="">
              Trả lời <span className="font-medium">{findName()}</span>
            </p>
            <p className="font-medium">[Sticker]</p>
          </div>
        </div>
      </div>
    );
  }

  function FileMessage({ replyMessage, forcusMessage }) {
    return (
      <div
        className="w-full h-16 relative"
        onClick={() => {
          forcusMessage(replyMessage);
        }}
      >
        <div className="w-full bg-[#c7e0ff] h-full py-1 flex flex-row justify-start">
          <div className="h-full w-[2px] bg-blue-500 ml-3 py-1"></div>
          <div className="mx-2 flex flex-row ">
            {renderIconFile(replyMessage.messageType)}
            <div className="flex flex-col justify-between ml-2 text-sm">
              <p className="">
                Trả lời <span className="font-medium">{findName()}</span>
              </p>
              <p className="font-medium">[file {replyMessage.titleFile}]</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  function ImageMessage({ replyMessage, forcusMessage }) {
    return (
      <div
        className="w-full h-16  rounded-md relative"
        onClick={() => {
          forcusMessage(replyMessage);
        }}
      >
        <div className="w-full bg-[#c7e0ff] h-full py-1 flex flex-row justify-start">
          <div className="h-full w-[2px] bg-blue-500 ml-3 py-1"></div>
          <div className="mx-2 flex flex-row ">
            <img alt="." src={replyMessage.url} className="h-12 w-12" />
            <div className="h-12 flex flex-col justify-between ml-2 text-sm">
              <p className="">
                Trả lời <span className="font-medium">{findName()}</span>
              </p>
              <p className="font-medium">[Hình ảnh ]</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  function VideoMessage({ replyMessage, forcusMessage }) {
    return (
      <div
        className="w-full h-16  relative"
        onClick={() => {
          forcusMessage(replyMessage);
        }}
      >
        <div className="w-full bg-[#c7e0ff] h-full py-1 flex flex-row justify-start">
          <div className="h-full w-[2px] bg-blue-500 ml-3 py-1"></div>
          <div className="mx-2 flex flex-row justify-between">
            <video className="overflow-hidden rounded-md w-12 h-12 ">
              <source src={replyMessage.url} type="video/mp4" />
            </video>
            <div className="h-12 flex flex-col justify-between ml-2 text-sm">
              <p className="">
                Trả lời <span className="font-medium">{findName()}</span>
              </p>
              <p className="font-medium">[Video]</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  function VioceMessage({ replyMessage, forcusMessage }) {
    return (
      <div
        className="w-full h-16 relative"
        onClick={() => {
          forcusMessage(replyMessage);
        }}
      >
        <div className="w-full bg-[#c7e0ff] h-full py-1 flex flex-row justify-start">
          <div className="h-full w-[2px] bg-blue-500 ml-3 py-1"></div>
          <div className="mx-2 flex flex-row items-center justify-between">
            <audio controls className="h-10 w-36">
              <source src={replyMessage.url} type="audio/mpeg" />
              <source src={replyMessage.url} type="audio/3gp" />
            </audio>
            <div className="flex flex-col justify-between ml-2 text-sm">
              <p className="">
                Trả lời <span className="font-medium">{findName()}</span>
              </p>
              <p className="font-medium">[Vioce]</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  switch (replyMessage.messageType) {
    case "Text":
      return (
        <TextMessage
          replyMessage={replyMessage}
          forcusMessage={forcusMessage}
        />
      );
    case "STICKER":
      return (
        <StickerMessage
          replyMessage={replyMessage}
          forcusMessage={forcusMessage}
        />
      );
    case "PNG":
    case "JPEG":
    case "JPG":
    case "GIF":
      return (
        <ImageMessage
          replyMessage={replyMessage}
          forcusMessage={forcusMessage}
        />
      );
    case "VIDEO":
      return (
        <VideoMessage
          replyMessage={replyMessage}
          forcusMessage={forcusMessage}
        />  
      );
    case "AUDIO":
      return (
        <VioceMessage
          replyMessage={replyMessage}
          forcusMessage={forcusMessage}
        />
      );
    case "DOCX":
    case "DOC":
    case "PDF":
    case "PPT":
    case "PPTX":
    case "TXT":
    case "RAR":
    case "ZIP":
    case "JSON":
    case "CSV":
    case "HTML":
    case "XLS":
    case "XLSX":
      return (
        <FileMessage
          replyMessage={replyMessage}
          forcusMessage={forcusMessage}
        />
      );
    default:
      return (
        <FileMessage
          replyMessage={replyMessage}
          forcusMessage={forcusMessage}
        />
      );
  }
}
