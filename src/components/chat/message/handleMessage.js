import React from "react";
import { IoIosShareAlt } from "react-icons/io";
import { BiMessageRoundedX } from "react-icons/bi";
import { SlReload } from "react-icons/sl";
import { useSelector } from "react-redux";
import { stompClient } from "../../../socket/socket";
import { useSubscription } from "react-stomp-hooks";
import { MdQuickreply } from "react-icons/md";

export default function HandleMessage({
  message,
  setIsRetrieve,
  setIsOpenForwardMessage,
  conversation,
  setReplyMessage,
}) {
  var owner = useSelector((state) => state.data);

  function isOver24Hours(dateInput) {
    const date = new Date(dateInput);
    date.setHours(date.getHours() + 7);

    const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000; // 24 giờ trong mili giây
    const currentTime = new Date(); // Thời gian hiện tại
    const timeDifference = currentTime - date; // Sự khác biệt giữa thời gian hiện tại và thời gian của đối tượng date
    return timeDifference > twentyFourHoursInMilliseconds;
  }

  useSubscription("/user/" + message.id + "/retrieveMessage", (messages) => {
    let mess = JSON.parse(messages.body);
    if (mess.messageType === "RETRIEVE") {
      setIsRetrieve(true);
    }
  });

  var handleDeleteMessage = async () => {
    if (conversation.conversationType === "group") {
      const idGroup = conversation.idGroup;
      const ownerId = owner.id;
      const text = { ...message, idGroup, ownerId };
      stompClient.send("/app/delete-message", {}, JSON.stringify(text));
    } else {
      const idGroup = "";
      const ownerId = owner.id;
      const text = { ...message, idGroup, ownerId };
      stompClient.send("/app/delete-message", {}, JSON.stringify(text));
    }
  };
  function handleRetrieveMessage() {
    if (conversation.conversationType === "group") {
      message.receiver = { id: "group_" + conversation.idGroup };
      stompClient.send("/app/retrieve-message", {}, JSON.stringify(message));
      setIsRetrieve(true);
    } else {
      setIsRetrieve(true);
      stompClient.send("/app/retrieve-message", {}, JSON.stringify(message));
    }

    if (isOver24Hours(message.senderDate)) {
      alert("Tin nhắn đã quá 24h. bạn không thể xoá được.");
    } else {
      setIsRetrieve(true);
      stompClient.send("/app/retrieve-message", {}, JSON.stringify(message));
    }
  }
  function handleShareMessage() {
    setIsOpenForwardMessage(message);
  }

  return (
    <div className="flex flex-row mx-5 text-gray-400">
      {message.messageType !== "RETRIEVE" && (
        <>
          <div
            className="relative flex flex-col items-center group hover:text-white mx-[2px] hover:bg-slate-400 rounded-sm p-[2px]"
            onClick={() => {
              console.log(message);
              setReplyMessage(message);
            }}
          >
            <MdQuickreply />
            <div className="absolute bottom-0 w-60 flex-col items-center hidden mb-6 group-hover:flex">
              <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">
                trả lời
              </span>
              <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600"></div>
            </div>
          </div>
          <div
            className="relative flex flex-col items-center group hover:text-white mx-[2px] hover:bg-slate-400 rounded-sm p-[2px]"
            onClick={() => {
              handleShareMessage();
            }}
          >
            <IoIosShareAlt />
            <div className="absolute bottom-0 w-60 flex-col items-center hidden mb-6 group-hover:flex">
              <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">
                chuyển tiếp
              </span>
              <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600"></div>
            </div>
          </div>
        </>
      )}
      {owner.id === message.sender.id && message.messageType !== "RETRIEVE" && (
        <div
          className="relative flex flex-col items-center group hover:text-white mx-[2px] hover:bg-slate-400 rounded-sm p-[2px]"
          onClick={() => {
            handleRetrieveMessage();
          }}
        >
          <SlReload />
          <div className="absolute bottom-0 w-60 flex-col items-center hidden mb-6 group-hover:flex">
            <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">
              thu hồi tin nhắn
            </span>
            <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600"></div>
          </div>
        </div>
      )}
      <div
        className="relative flex flex-col items-center group hover:text-white mx-[2px] hover:bg-slate-400 rounded-sm p-[2px]"
        onClick={() => {
          handleDeleteMessage();
        }}
      >
        <BiMessageRoundedX />
        <div className="absolute bottom-0 w-60 flex-col items-center hidden mb-6 group-hover:flex">
          <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">
            Xoá tin nhắn ở phía bạn
          </span>
          <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600"></div>
        </div>
      </div>
    </div>
  );
}
