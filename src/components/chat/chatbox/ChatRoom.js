import React, { useEffect, useRef, useState } from "react";
import { BsCameraVideo } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { PiTagSimpleFill } from "react-icons/pi";
import { VscLayoutSidebarRightOff } from "react-icons/vsc";
import "../../../style/scrollBar.css";
import Conversation from "./Conversation";
import InputMessage from "./InputMessage";
import { useSelector } from "react-redux";
import UserInfoModal from "../infoUser/UserInfoModal";
import { getInfoUserById } from "../../../services/User_service";

export default function ChatRoom({ idConversation, setIndex }) {
  var data = useSelector((state) => state.data);
  console.log(data);
  var [avtMember, setAvtMember] = useState("");
  var [nameConversation, setNameConversation] = useState("");
  var [isOpenInforUser, setIsOpenInforUser] = useState(false);
  var [receiver, setReceiver] = useState(undefined);
  const scrollRef = useRef();

  var [conversation, setConversation] = useState(
    // eslint-disable-next-line
    data.conversation.filter((item) => {
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
    var conversation = data.conversation.filter((item) => {
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
      getInfoUserById(conversation.user.id, (data) => {
        setAvtMember(data.avt);
        setNameConversation(data.userName);
        setReceiver({ id: data.id });
      });
    }
    setConversation(conversation);
    scrollToButtom();
  }, [data.conversation, idConversation]);

  function scrollToButtom() {
    scrollRef.current.scrollIntoView({
      behavior: "auto",
      block: "end",
      inline: "end",
    });
    scrollRef.current.scrollTop = 10000000000;
  }
  useEffect(() => {
    scrollToButtom();
  }, [conversation])

  return (
    <div className=" h-full w-10/12 ">
      <div className="border-b flex  flex-row items-center justify-between px-4">
        <div className="flex flex-row w-1/5 py-2 ">
          <img
            className="rounded-full h-12  mr-1 border border-white "
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
          <div className=" h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2">
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
          <div className="absolute inset-0 opacity-65 bg-white"></div>
          <div
            ref={scrollRef}
            className="absolute  bottom-0 max-h-[764px] w-full flex flex-col overflow-scroll justify-items-end overflow-y-auto scrollbar-container "
          >
            {conversation.messages.map((item, indexMess) => (
              <Conversation
                ownerId={data.id}
                key={indexMess}
                avt={avtMember}
                conversation={conversation}
                item={item}
                index={indexMess}
              />
            ))}
          </div>
        </div>
        <InputMessage
          conversation={conversation}
          setIndex={setIndex}
          receiver={receiver}
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
  );
}
