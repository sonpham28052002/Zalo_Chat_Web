import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { HiPhoneMissedCall } from "react-icons/hi";
import { HiMiniVideoCamera, HiVideoCameraSlash } from "react-icons/hi2";
import { IoMdCall } from "react-icons/io";

export default function CallSingle({ avt, file, conversation }) {
  var owner = useSelector((state) => state.data);
  var refMessage = useRef(null);

  function addHoursAndFormatToHHMM(date, hoursToAdd) {
    if (date) {
      const newDate = new Date(date);
      newDate.setHours(newDate.getHours() + hoursToAdd);
      const hours = newDate.getHours();
      const minutes = newDate.getMinutes();
      const formattedHours = hours < 10 ? "0" + hours : hours;
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
      if (formattedHours) {
        return `${formattedHours}:${formattedMinutes}`;
      } else {
        return "đang gửi...";
      }
    }
    return "đang gửi...";
  }

  function renderIcon(message) {
    if (message.titleFile.includes("video")) {
      if (message.size) {
        return <HiMiniVideoCamera />;
      } else {
        return <HiVideoCameraSlash />;
      }
    } else if (message.titleFile.includes("thoại")) {
      if (message.size) {
        return <IoMdCall />;
      } else {
        return <HiPhoneMissedCall />;
      }
    }
  }

  return (
    <div className="h-32">
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

        <div className="relative h-full max-w-[40%] w-fit border shadow-lg rounded-md bg-[#e5efff]">
          <div className="  h-full flex flex-row items-start justify-around rounded-md p-2">
            <div
              className={`flex flex-row justify-around  items-center ${
                !file.size ? "text-red-500" : ""
              }`}
            >
              <div
                className={`h-10 w-10 bg-gray-400 flex flex-row justify-center items-center rounded-full mr-1  `}
              >
                {renderIcon(file)}
              </div>
              <p className="font-medium text-sm text-wrap w-44">
                {file.sender.id === owner.id
                  ? conversation.user.userName + " "
                  : "Bạn "}
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
                {file.sender.id !== owner.id
                  ? conversation.user.userName + " "
                  : owner.userName}
              </p>
            </div>
          </div>
          <span className=" text-[12px] px-4 text-gray-400 ">
            {addHoursAndFormatToHHMM(new Date(file.senderDate), 7)}
          </span>
        </div>
      </div>
    </div>
  );
}
