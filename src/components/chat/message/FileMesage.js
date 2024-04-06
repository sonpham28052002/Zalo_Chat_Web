import React, { useState, useRef } from "react";
import NavIconInteract from "../chatbox/NavIconInteract";
import { useSelector } from "react-redux";
import HandleMessage from "./handleMessage";
import RetrieveMessages from "./RetrieveMessages";
import { AiFillFilePpt, AiFillFileZip } from "react-icons/ai";
import { FaFileCode, FaFileCsv, FaFileExcel, FaFileWord } from "react-icons/fa";
import { BiSolidFilePdf, BiSolidFileTxt } from "react-icons/bi";
import { BsDownload } from "react-icons/bs";
import { IoLogoHtml5 } from "react-icons/io";
import { LuFileJson } from "react-icons/lu";

export default function FileMessage({ avt, file, setIsOpenForwardMessage }) {
  let [messageLocal, setMessageLocal] = useState(file);
  var owner = useSelector((state) => state.data);
  var [isRetrieve, setIsRetrieve] = useState(false);
  var refMessage = useRef(null);

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
  function renderIconFile(type) {
    if (type === "PDF") {
      return <BiSolidFilePdf className="text-8xl  text-[#ff6350] " />;
    } else if (type === "DOC" || type === "DOCX") {
      return <FaFileWord className="text-8xl  text-[#378ece]" />;
    } else if (type === "RAR" || type === "ZIP") {
      return <AiFillFileZip className="text-8xl text-[#cf81c8]" />;
    } else if (type === "PPT" || type === "PPTX") {
      return <AiFillFilePpt className="text-8xl text-[#ff7e5c]" />;
    } else if (type === "HTML") {
      return <IoLogoHtml5 className="text-8xl text-[#d1ef29]" />;
    } else if (type === "TXT") {
      return <BiSolidFileTxt className="text-8xl text-[#02c1f3]" />;
    } else if (type === "JSON") {
      return <LuFileJson className="text-8xl text-[#7f8e25]" />;
    } else if (type === "CSV") {
      return <FaFileCsv className="text-8xl text-[#02c1f3]" />;
    } else if (type === "XLS" || type === "XLSX") {
      return <FaFileExcel className="text-8xl text-[#40ad65]" />;
    } else {
      return <FaFileCode className="text-8xl text-[rgb(33,125,148)]" />;
    }
  }

  return (
    <div className="h-fit">
      {!isRetrieve ? (
        <div
          ref={refMessage}
          className={` relative h-fit w-full flex flex-row items-end my-3  py-5 rotate-180  ${
            owner.id === file.sender.id
              ? "justify-end pr-5"
              : "justify-start pl-5"
          }`}
          key={file.id}
        >
          {owner.id !== file.sender.id && (
            <img src={avt} alt="#" className="h-12 w-12 rounded-full mr-3" />
          )}
          {owner.id === file.sender.id && (
            <HandleMessage
              refMessage={refMessage}
              message={file}
              setIsRetrieve={setIsRetrieve}
              setIsOpenForwardMessage={setIsOpenForwardMessage}
            />
          )}
          <div className="relative h-full max-w-[40%] w-fit border shadow-lg rounded-md bg-[#e5efff]">
            <div className="  h-full flex flex-row items-start justify-around rounded-md p-2">
              {renderIconFile(file.messageType)}
              <div className="flex flex-col justify-around  h-24 w-72">
                <p className="font-medium text-base">
                  {file.titleFile &&
                  file.titleFile +
                    "".substring(0, file.titleFile.lastIndexOf(".")).length >
                    29
                    ? file.titleFile.substring(0, 29) +
                      "..." +
                      file.titleFile.substring(
                        file.titleFile.lastIndexOf("."),
                        file.titleFile.length
                      )
                    : file.titleFile}
                </p>
                {formatFileSize(file.size)}
              </div>
              <div className="h-20  flex flex-col justify-end">
                <div className="rounded-md hover:bg-slate-400 p-1 hover:text-white  ">
                  <a href={file.url} download>
                    <BsDownload className="text-xl font-medium " />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center absolute w-full pt-1 ">
              <span className=" text-[12px] px-4 text-gray-400 ">{`${
                new Date(file.senderDate).getHours() < 10
                  ? "0" + new Date(file.senderDate).getHours()
                  : new Date(file.senderDate).getHours()
              }:${
                new Date(file.senderDate).getMinutes() < 10
                  ? "0" + new Date(file.senderDate).getMinutes()
                  : new Date(file.senderDate).getMinutes()
              }`}</span>
              <NavIconInteract
                check={owner.id === file.receiver.id}
                icon={file.ract}
                setMessage={setMessageLocal}
                message={messageLocal}
              />
            </div>
          </div>
          {owner.id !== file.sender.id && (
            <HandleMessage
              refMessage={refMessage}
              message={file}
              setIsRetrieve={setIsRetrieve}
              setIsOpenForwardMessage={setIsOpenForwardMessage}
            />
          )}
        </div>
      ) : (
        <RetrieveMessages message={file} avt={avt} />
      )}
    </div>
  );
}
