import React, { useEffect, useRef, useState } from "react";
import { BsCameraVideo } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { PiTagSimpleFill } from "react-icons/pi";
import { VscLayoutSidebarRightOff } from "react-icons/vsc";
import "../../../style/scrollBar.css";
import Conversation from "./Conversation";
import InputMessage from "./InputMessage";
import UserInfoModal from "../infoUser/UserInfoModal";
import { getMessageByIdSenderAndIsReceiver } from "../../../services/Message_Service";
import { useSelector } from "react-redux";
import { Virtuoso } from "react-virtuoso";
import { useSubscription } from "react-stomp-hooks";
import Loader from "../custom/loader";

export default function ChatRoom({ idConversation, setIndex }) {
  var owner = useSelector((state) => state.data);
  var [avtMember, setAvtMember] = useState("");
  var [nameConversation, setNameConversation] = useState("");
  var [isOpenInforUser, setIsOpenInforUser] = useState(false);
  var [isLoad, setIsLoad] = useState(false);
  var [isLoading, setIsLoading] = useState(false);

  var [isExtent, setIsExtend] = useState(false);
  var [receiver, setReceiver] = useState(undefined);
  var [messages, setMessages] = useState([]);
  const scrollContainerRef = useRef(null);

  useSubscription("/user/" + owner.id + "/retrieveMessage", (message) => {
    let mess = JSON.parse(message.body);
    if (mess.messageType === "RETRIEVE") {
      const index = [...messages].findIndex((item) => item.id === mess.id);
      console.log(index);
      messages[index] = mess;
      setMessages([...messages]);
    }
  });
  useSubscription("/user/" + owner.id + "/deleteMessage", (message) => {
    let mess = JSON.parse(message.body);
    setMessages(messages.filter((item) => item.id !== mess.id));
  });

  var [conversation, setConversation] = useState(
    // eslint-disable-next-line
    owner.conversation.filter((item) => {
      if (
        item.conversationType === "group" &&
        item.idGroup === idConversation
      ) {
        return item;
      } else if (
        item.conversationType === "single" &&
        item.user.id === idConversation
      ) {
        return item;
      }
    })[0]
  );

  useEffect(() => {
    // eslint-disable-next-line
    var conversation = owner.conversation.filter((item) => {
      if (
        item.conversationType === "group" &&
        item.idGroup === idConversation
      ) {
        return item;
      } else if (
        item.conversationType === "single" &&
        item.user.id === idConversation
      ) {
        return item;
      }
    })[0];

    if (conversation?.conversationType === "group") {
    } else if (conversation?.conversationType === "single") {
      setAvtMember(conversation.user.avt);
      setNameConversation(conversation.user.userName);
      setReceiver({ id: conversation.user.id });
      getMessageByIdSenderAndIsReceiver(
        owner.id,
        conversation.user.id,
        (mess) => {
          setMessages(mess.slice().reverse());
          console.log(mess);
        }
      );
    }
    scrollToButtom();
    setConversation(conversation);
    setTimeout(() => {
      setIsLoad(true);
    }, 2000);

    // eslint-disable-next-line
  }, [owner.conversation, idConversation]);
  function scrollToButtom() {
    scrollContainerRef.current?.scrollToIndex({
      index: "FIRST", // Sử dụng index cuối cùng của mảng tin nhắn
      align: "start",
      behavior: "auto",
    });
  }

  useEffect(() => {
    scrollToButtom();
  }, [messages.length]);

  return (
    <div className="h-full w-10/12 flex flex-row">
      <div className={` h-full ${isExtent ? "w-9/12" : "w-full"} `}>
        <div className="border-b flex flex-row items-center justify-between px-4">
          <div className="flex flex-row w-1/5 py-2 ">
            <img
              className="rounded-full h-12 w-12 mr-1 border border-white "
              alt="#"
              src={avtMember}
              onClick={() => {
                setIsOpenInforUser(true);
              }}
            ></img>
            <div>
              <h1 className="font-medium text-lg">{nameConversation}</h1>
              <div className="flex flex-row items-center">
                <p className="text-xs border-r pr-2 mr-2 font-medium text-gray-400">
                  Truy cập 4 giờ trước
                </p>
                <div className="flex flex-row items-center">
                  <PiTagSimpleFill className={`mr-1`} />
                  <p className="text-sm">Bạn bè</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center">
            <div className=" h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2">
              <IoIosSearch className="text-2xl " />
            </div>
            <div className=" h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2">
              <BsCameraVideo className="text-xl " />
            </div>
            <div
              className=" h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2 "
              onClick={() => {
                setIsExtend(!isExtent);
              }}
            >
              <VscLayoutSidebarRightOff className="text-xl " />
            </div>
          </div>
        </div>
        <div className="h-[877px]">
          <div
            className="bg-image bg-cover bg-center relative h-[765px] w-full"
            style={{
              backgroundImage: `url(${avtMember})`,
            }}
          >
            <div className="absolute inset-0 opacity-65 bg-white "></div>
            {isLoad && (
              <div className="absolute bottom-0 max-h-[764px] w-full flex flex-col overflow-scroll justify-items-end overflow-y-auto overflow-x-hidden  py-2 ">
                <Virtuoso
                  ref={scrollContainerRef}
                  className="w-full min-h-[740px] scrollbar-container rotate-180"
                  totalCount={messages.length}
                  initialTopMostItemIndex={0}
                  itemContent={(index) => {
                    return (
                      <Conversation
                        ownerId={owner.id}
                        key={index}
                        avt={avtMember}
                        conversation={conversation}
                        item={messages[index]}
                        index={index}
                      />
                    );
                  }}
                />
              </div>
            )}
            {isLoading && (
              <div className="absolute bottom-0 w-full flex flex-row justify-center items-center pb-2 ">
                <Loader />
              </div>
            )}
          </div>
          <InputMessage
            conversation={conversation}
            setIndex={setIndex}
            receiver={receiver}
            setMessages={setMessages}
            messages={messages}
            setIsLoading={setIsLoading}
          />
        </div>
        {receiver && (
          <UserInfoModal
            isOpen={isOpenInforUser}
            setIsOpen={setIsOpenInforUser}
            userId={receiver.id}
          />
        )}
      </div>
      {isExtent && <div className="h-full w-3/12 ">a</div>}
    </div>
  );
}
