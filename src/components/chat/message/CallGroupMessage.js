import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { LuPhoneCall } from "react-icons/lu";
import { JoinRoom } from "../../../socket/socket";

export default function CallGroupMessage({ avt, file, conversation, seen }) {
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

  function getImageUserChat(userId, conversation) {
    if (conversation.conversationType === "group") {
      return conversation.members.filter((item) => item.member.id === userId)[0]
        .member.avt;
    }
    return "avt";
  }
  function getNameUserChat(userId, conversation) {
    if (conversation.conversationType === "group") {
      return conversation.members.filter((item) => item.member.id === userId)[0]
        .member.userName;
    }
    return "";
  }

  function renderSeen(message) {
    const arrSeen = seen.filter((item) => item.indexMessage === message.id);
    return arrSeen.map((item, index) => (
      <img
        key={index}
        src={item.user.avt}
        alt=""
        className="h-4 w-4 rounded-full shadow-lg border-white border mx-[1px]"
      />
    ));
  }

  return (
    <div className="h-44">
      <div className=" rotate-180 flex flex-row justify-end px-2">
        {renderSeen(file)}
      </div>
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
          <img
            src={getImageUserChat(file.sender.id, conversation)}
            alt="#"
            className="h-12 w-12 rounded-full mr-3"
          />
        )}

        <div className="relative h-full max-w-[40%] w-fit border shadow-lg rounded-md bg-[#e5efff]">
          <div className="">
            <div className="  h-full flex flex-row items-start justify-around rounded-md p-2">
              <div className={`flex flex-row justify-around  items-center`}>
                <div
                  className={`h-10 w-10 bg-gray-400 flex flex-row justify-center items-center rounded-full mr-1  `}
                >
                  <LuPhoneCall />
                </div>
                <p className="font-medium text-sm text-wrap w-44">
                  <span>
                    {owner.id === file.sender.id
                      ? "Bạn"
                      : getNameUserChat(file.sender.id, conversation)}
                  </span>{" "}
                  {file.titleFile}
                </p>
              </div>
            </div>
            <div className="w-full flex flex-row justify-center items-center ">
              {file.url && (
                <button
                  className="bg-blue-300 select-none active:bg-blue-500 p-1 w-1/2 text-center rounded-lg"
                  onClick={() => {
                    if (file.url) {
                      const roomID = file.url
                      JoinRoom(roomID, owner.id, conversation?.idGroup);
                      let path = window.location.pathname.split("/")[1];
                      var url =
                        window.location.protocol +
                        "//" +
                        window.location.host +
                        "/" +
                        path +
                        "/CallGroup" +
                        "?roomID=" +
                        roomID;
                      window.open(url);
                    }
                  }}
                >
                  Tham gia
                </button>
              )}
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
