import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { AiFillFilePpt, AiFillFileZip } from "react-icons/ai";
import { FaFileCode, FaFileCsv, FaFileExcel, FaFileWord } from "react-icons/fa";
import { BiSolidFilePdf, BiSolidFileTxt } from "react-icons/bi";
import { IoLogoHtml5 } from "react-icons/io";
import { LuFileJson } from "react-icons/lu";

export default function ReplyMessage({ replyMessage, setReplyMessage }) {
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

  function TextMessage({ replyMessage, setReplyMessage }) {
    return (
      <div className="w-full h-52 px-2 -mb-2 relative">
        <div
          className="absolute h-5 w-5 flex flex-row justify-center items-center right-3 top-1 hover:text-red-600"
          onClick={() => {
            setReplyMessage(undefined);
          }}
        >
          <IoMdCloseCircleOutline />
        </div>
        <div className="w-full bg-gray-400 h-full py-1 flex flex-row justify-start">
          <div className="h-full w-[2px] bg-blue-500 ml-3 py-1"></div>
          <div className="mx-2 flex flex-col justify-between">
            <p className="">Trả lời tin nhắn</p>
            <p className="font-medium">{replyMessage?.content}</p>
          </div>
        </div>
      </div>
    );
  }

  function StickerMessage({ replyMessage, setReplyMessage }) {
    return (
      <div className="w-full h-52 px-2 -mb-2 relative">
        <div
          className="absolute h-5 w-5 flex flex-row justify-center items-center right-3 top-1 hover:text-red-600"
          onClick={() => {
            setReplyMessage(undefined);
          }}
        >
          <IoMdCloseCircleOutline />
        </div>
        <div className="w-full bg-gray-400 h-full py-1 flex flex-row justify-start">
          <div className="h-full w-[2px] bg-blue-500 ml-3 py-1"></div>
          <img alt="." src={replyMessage.url} className="h-12 w-12" />
          <div className="flex flex-col justify-between ml-2 text-sm">
            <p className="">Trả lời tin nhắn</p>
            <p className="font-medium">[Sticker]</p>
          </div>
        </div>
      </div>
    );
  }

  function FileMessage({ replyMessage, setReplyMessage }) {
    return (
      <div className="w-full h-52 px-2 -mb-2 relative">
        <div
          className="absolute h-5 w-5 flex flex-row justify-center items-center right-3 top-1 hover:text-red-600"
          onClick={() => {
            setReplyMessage(undefined);
          }}
        >
          <IoMdCloseCircleOutline />
        </div>
        <div className="w-full bg-gray-400 h-full py-1 flex flex-row justify-start">
          <div className="h-full w-[2px] bg-blue-500 ml-3 py-1"></div>
          <div className="mx-2 flex flex-row ">
            {renderIconFile(replyMessage.messageType)}
            <div className="flex flex-col justify-between ml-2 text-sm">
              <p className="">Trả lời tin nhắn</p>
              <p className="font-medium">[file {replyMessage.titleFile}]</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  function ImageMessage({ replyMessage, setReplyMessage }) {
    return (
      <div className="w-full h-52 px-2 -mb-2 relative">
        <div
          className="absolute h-5 w-5 flex flex-row justify-center items-center right-3 top-1 hover:text-red-600"
          onClick={() => {
            setReplyMessage(undefined);
          }}
        >
          <IoMdCloseCircleOutline />
        </div>
        <div className="w-full bg-gray-400 h-full py-1 flex flex-row justify-start">
          <div className="h-full w-[2px] bg-blue-500 ml-3 py-1"></div>
          <div className="mx-2 flex flex-row ">
            <img alt="." src={replyMessage.url} className="h-12 w-12" />
            <div className="flex flex-col justify-between ml-2 text-sm">
              <p className="">Trả lời tin nhắn</p>
              <p className="font-medium">[Hình ảnh ]</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  function VideoMessage({ replyMessage, setReplyMessage }) {
    return (
      <div className="w-full h-52 px-2 -mb-2 relative">
        <div
          className="absolute h-5 w-5 flex flex-row justify-center items-center right-3 top-1 hover:text-red-600"
          onClick={() => {
            setReplyMessage(undefined);
          }}
        >
          <IoMdCloseCircleOutline />
        </div>
        <div className="w-full bg-gray-400 h-full py-1 flex flex-row justify-start">
          <div className="h-full w-[2px] bg-blue-500 ml-3 py-1"></div>
          <div className="mx-2 flex flex-row justify-between">
            <video className="overflow-hidden rounded-md w-12 h-12 ">
              <source src={replyMessage.url} type="video/mp4" />
            </video>
            <div className="flex flex-col justify-between ml-2 text-sm">
              <p className="">Trả lời tin nhắn</p>
              <p className="font-medium">[Video]</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  function VioceMessage({ replyMessage, setReplyMessage }) {
    return (
      <div className="w-full h-52 px-2 -mb-2 relative">
        <div
          className="absolute h-5 w-5 flex flex-row justify-center items-center right-3 top-1 hover:text-red-600"
          onClick={() => {
            setReplyMessage(undefined);
          }}
        >
          <IoMdCloseCircleOutline />
        </div>
        <div className="w-full bg-gray-400 h-full py-1 flex flex-row justify-start">
          <div className="h-full w-[2px] bg-blue-500 ml-3 py-1"></div>
          <div className="mx-2 flex flex-row justify-between items-center">
            <audio controls className="h-10 w-36">
              <source src={replyMessage.url} type="audio/mpeg" />
              <source src={replyMessage.url} type="audio/3gp" />
            </audio>
            <div className="flex flex-col justify-between ml-2 text-sm">
              <p className="">Trả lời tin nhắn</p>
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
          setReplyMessage={setReplyMessage}
        />
      );
    case "STICKER":
      return (
        <StickerMessage
          replyMessage={replyMessage}
          setReplyMessage={setReplyMessage}
        />
      );
    case "PNG":
    case "JPEG":
    case "JPG":
    case "GIF":
      return (
        <ImageMessage
          replyMessage={replyMessage}
          setReplyMessage={setReplyMessage}
        />
      );
    case "VIDEO":
      return (
        <VideoMessage
          replyMessage={replyMessage}
          setReplyMessage={setReplyMessage}
        />
      );
    case "AUDIO":
      return (
        <VioceMessage
          replyMessage={replyMessage}
          setReplyMessage={setReplyMessage}
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
          setReplyMessage={setReplyMessage}
        />
      );
    default:
      return (
        <FileMessage
          replyMessage={replyMessage}
          setReplyMessage={setReplyMessage}
        />
      );
  }
}
