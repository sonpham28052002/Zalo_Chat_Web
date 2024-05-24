import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavChatOption from "./NavChatOption";
import { useSubscription } from "react-stomp-hooks";
import { animateCss } from "../../notification/notification";
import { FaImage, FaPhotoVideo, FaRegFileAlt } from "react-icons/fa";
import { AiFillAudio } from "react-icons/ai";
import { MdOutlineWifiCalling3 } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { getAPI } from "../../../redux_Toolkit/slices";

export default function TabChat({ conversation, indexSelect, setIndex }) {
  var owner = useSelector((state) => state.data);
  var listUserOnline = useSelector((state) => state.listUserOnline);
  var dispatch = useDispatch();
  var [isSeen, setIsSeen] = useState(false);
  var nameConversation = "";
  var avtConversation = undefined;
  var idConversation = undefined;
  if (conversation.conversationType === "group") {
    avtConversation = conversation.avtGroup;
    nameConversation = conversation.nameGroup;
    idConversation = conversation.idGroup;
  } else if (conversation.conversationType === "single") {
    avtConversation = conversation.user.avt;
    nameConversation = conversation.user.userName;
    idConversation = conversation.user.id;
  }
  useEffect(() => {
    conversation?.lastMessage?.seen?.filter((item) => item.id === owner.id)[0]
      ? setIsSeen(false)
      : setIsSeen(true);
  }, [conversation?.lastMessage?.seen, owner.id]);
  function getLastMessage() {
    if (conversation.lastMessage) {
      const lastMessage = conversation.lastMessage;
      if (lastMessage.messageType === "Text") {
        var viewLastMessage = `${
          owner.id === lastMessage.sender.id ? "Bạn: " : ""
        } ${
          lastMessage?.content.length > 10
            ? lastMessage.content.substring(0, 10) + "..."
            : lastMessage.content.substring(0, 15)
        }`;
        return (
          <span
            className={` ${
              isSeen ? "text-black font-medium" : "text-slate-400"
            }`}
          >
            {viewLastMessage}
          </span>
        );
      } else if (
        lastMessage.messageType === "GIF" ||
        lastMessage.messageType === "JPG" ||
        lastMessage.messageType === "JPEG" ||
        lastMessage.messageType === "PNG"
      ) {
        return (
          <span
            className={` flex flex-row items-center  ${
              isSeen ? "text-black font-medium" : "text-slate-400"
            }`}
          >
            {`${owner.id === lastMessage.sender.id ? "Bạn: " : ""}`}
            <FaImage className="mx-1" /> {"hình ảnh"}
          </span>
        );
      } else if (lastMessage.messageType === "VIDEO") {
        return (
          <span
            className={` flex flex-row items-center  ${
              isSeen ? "text-black font-medium" : "text-slate-400"
            }`}
          >
            {`${owner.id === lastMessage.sender.id ? "Bạn: " : ""}`}
            <FaPhotoVideo className="mx-1" /> {"video"}
          </span>
        );
      } else if (lastMessage.messageType === "AUDIO") {
        return (
          <span
            className={` flex flex-row items-center  ${
              isSeen ? "text-black font-medium" : "text-slate-400"
            }`}
          >
            {`${owner.id === lastMessage.sender.id ? "Bạn: " : ""}`}
            <AiFillAudio className="mx-1" /> {"audio"}
          </span>
        );
      } else if (
        lastMessage.messageType === "DOCX" ||
        lastMessage.messageType === "DOC" ||
        lastMessage.messageType === "PDF" ||
        lastMessage.messageType === "PPT" ||
        lastMessage.messageType === "PPTX" ||
        lastMessage.messageType === "TXT" ||
        lastMessage.messageType === "RAR" ||
        lastMessage.messageType === "ZIP" ||
        lastMessage.messageType === "JSON" ||
        lastMessage.messageType === "CSV" ||
        lastMessage.messageType === "HTML" ||
        lastMessage.messageType === "XLS" ||
        lastMessage.messageType === "XLSX"
      ) {
        return (
          <span
            className={` flex flex-row items-center  ${
              isSeen ? "text-black font-medium" : "text-slate-400"
            }`}
          >
            {`${owner.id === lastMessage.sender.id ? "Bạn: " : ""}`}
            <FaRegFileAlt className="mx-1" /> {"file"}
          </span>
        );
      } else if (
        lastMessage.messageType === "CALLSINGLE" ||
        lastMessage.messageType === "CALLGROUP"
      ) {
        return (
          <span
            className={` flex flex-row items-center  ${
              isSeen ? "text-black font-medium" : "text-slate-400"
            }`}
          >
            {`${owner.id === lastMessage.sender.id ? "Bạn: " : ""}`}
            <MdOutlineWifiCalling3 className="mx-1" /> {"call"}
          </span>
        );
      } else if (lastMessage.messageType === "NOTIFICATION") {
        return (
          <span
            className={` flex flex-row items-center  ${
              isSeen ? "text-black font-medium" : "text-slate-400"
            }`}
          >
            {`${owner.id === lastMessage.sender.id ? "Bạn: " : ""}`}
            <IoMdNotifications className="mx-1" /> {"Thông báo"}
          </span>
        );
      }
    }
  }

  useSubscription("/user/" + owner.id + "/singleChat", (messages) => {
    let mess = JSON.parse(messages.body);
    if (
      owner.id === mess.receiver.id &&
      conversation.user.id === mess.sender.id &&
      indexSelect !== conversation.user.id
    ) {
      animateCss({
        type: "MESSAGE_SINGLE",
        image: conversation.user.avt,
        userName: conversation.user.userName,
      });
      setIsSeen(true);
    }
  });
  useSubscription(
    "/user/" + conversation?.idGroup + "/changeImageGroup",
    (messages) => {
      dispatch(getAPI(owner.id));
    }
  );
  useSubscription(
    "/user/" + conversation?.idGroup + "/changeNameGroup",
    (messages) => {
      dispatch(getAPI(owner.id));
    }
  );
  useSubscription("/user/" + owner.id + "/groupChat", (message) => {
    let mess = JSON.parse(message.body);
    if (
      "group_" + conversation.idGroup === mess.receiver.id &&
      mess.sender.id !== owner.id &&
      indexSelect !== conversation.idGroup
    ) {
      animateCss({
        type: "MESSAGE_SINGLE",
        image: conversation.avtGroup,
        userName: conversation.nameGroup,
      });
    }
  });
  return (
    <div
      className={`w-full h-[80px] border-red-100 hover:bg-slate-100 px-3 flex flex-row justify-start items-center ${
        indexSelect === idConversation ? "bg-[#e5efff] hover:bg-[#e5efff] " : ""
      }
      `}
      onClick={() => {
        setIndex(idConversation);
        setIsSeen(false);
      }}
    >
      <div className="relative h-fit w-fit ">
        <img
          className="rounded-full h-12 w-12 bg-center bg-cover border-white border"
          src={avtConversation}
          alt="#"
        />
        {conversation.conversationType === "single" &&
          listUserOnline.includes(conversation.user.id) && (
            <div className="bg-green-500 rounded-full h-2 w-2 absolute right-0 bottom-1"></div>
          )}
      </div>
      <div className="flex flex-col justify-center w-4/6  ml-2">
        <p className="font-medium text-nowrap max-w-44 overflow-hidden">
          {nameConversation.length < 25
            ? nameConversation
            : nameConversation.substring(0, 25) + "..."}
        </p>

        {getLastMessage()}
      </div>
      <div className="flex flex-row justify-center items-center w-1/6 relative">
        {isSeen && (
          <div className="h-2 w-2 bg-red-500 rounded-full absolute top-0 right-0"></div>
        )}
        <NavChatOption conversation={conversation} ownerId={owner.id} />
      </div>
    </div>
  );
}
