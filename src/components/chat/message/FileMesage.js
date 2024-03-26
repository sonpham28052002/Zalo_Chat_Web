import React from "react";
import { AiFillFilePpt, AiFillFileZip } from "react-icons/ai";
import { FaFileWord } from "react-icons/fa";

export default function FileMessage({ file, conversation }) {
  let [messageLocal, setMessageLocal] = useState(image);
  console.log(image.sender);
  console.log(conversation);

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
      return <BiSolidFilePdf />;
    } else if (type === "DOC" || type === "DOCX") {
      return <FaFileWord />;
    } else if (type === "RAR" || type === "ZIP") {
      return <AiFillFileZip />;
    } else if (type === "PPT" || type === "PPTX") {
      return <AiFillFilePpt />;
    }
  }

  return (
    <div
      className={` relative h-fit w-full  flex flex-row items-end my-3  py-5 ${
        conversation.id === file.sender
          ? "justify-start pl-5"
          : "justify-end pr-5"
      }`}
      key={file.id}
    >
      <div className="relative h-full max-w-[20%] w-fit border shadow-lg rounded-md ">
        <div className="  h-fit flex flex-col items-start justify-around rounded-md">
          {renderIconFile("DOCX")}
        </div>
        <div className="flex flex-row justify-between items-center absolute w-full pt-1">
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
            check={conversation.id === file.sender}
            icon={file.interact}
            setMessage={setMessageLocal}
            message={messageLocal}
          />
        </div>
      </div>
    </div>
  );
}
