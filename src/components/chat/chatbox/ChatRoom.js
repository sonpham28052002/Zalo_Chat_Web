import React, { useEffect, useRef, useState, useCallback } from "react";
import { BsCameraVideo } from "react-icons/bs";
import { IoIosSearch, IoLogoHtml5 } from "react-icons/io";
import { PiTagSimpleFill } from "react-icons/pi";
import { VscLayoutSidebarRightOff } from "react-icons/vsc";
import "../../../style/scrollBar.css";
import Conversation from "./Conversation";
import InputMessage from "./InputMessage";
import UserInfoModal from "../infoUser/UserInfoModal";
import {
  getMessageByIdSenderAndIsReceiver,
  getMemberByIdSenderAndIdGroup,
  getMessageAndMemberByIdSenderAndIdGroup,
} from "../../../services/Message_Service";
import { useSelector } from "react-redux";
import { Virtuoso } from "react-virtuoso";
import { useSubscription } from "react-stomp-hooks";
import Loader from "../custom/loader";
import ForwardMessage from "./ForwardMessage";
import { IoCaretDownOutline } from "react-icons/io5";
import { BiSolidFilePdf, BiSolidFileTxt } from "react-icons/bi";
import { FaFileCode, FaFileCsv, FaFileExcel, FaFileWord } from "react-icons/fa";
import { AiFillFilePpt, AiFillFileZip } from "react-icons/ai";
import { LuFileJson } from "react-icons/lu";

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
  var [chats, setChats] = useState([]);
  var [friend, setFriend] = useState([]);
  var [allUser, setAllUser] = useState([]);

  var [showImageVideo, setShowImageVideo] = useState(false);
  var [showFile, setShowFile] = useState(false);
  var [showTextLink, setTextLink] = useState(false);

  const scrollContainerRef = useRef(null);

  useSubscription("/user/" + owner.id + "/retrieveMessage", (message) => {
    let mess = JSON.parse(message.body);
    if (mess.messageType === "RETRIEVE") {
      const index = [...messages].findIndex((item) => item.id === mess.id);
      messages[index] = mess;
      setMessages([...messages]);
    }
  });
  useSubscription("/user/" + owner.id + "/singleChat", (message) => {
    let mess = JSON.parse(message.body);
    console.log(mess);
    if (conversation.conversationType === "single") {
      if (mess.receiver.id === idConversation) {
        getMessageByIdSenderAndIsReceiver(owner.id, idConversation, (data) => {
          setMessages(data.slice().reverse());
        });
      }
    }
  });

  useSubscription("/user/" + owner.id + "/groupChat", (message) => {
    let mess = JSON.parse(message.body);
    console.log(mess);
    if (conversation.conversationType === "group") {
      getMessageAndMemberByIdSenderAndIdGroup(
        owner.id,
        idConversation,
        (data) => {
          setMessages(data.slice().reverse());
        }
      );
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
    setIsLoad(false);
    var conversation = [];
    conversation = owner.conversation.filter(async (item) => {
      if (
        item.conversationType === "group" &&
        item.idGroup === idConversation
      ) {
        getInfo(item);
        console.log(item);
        await getMessageAndMemberByIdSenderAndIdGroup(
          owner.id,
          item.idGroup,
          async (mess) => {
            console.log(mess);
            scrollToButtom();
            let members = await getMemberByIdSenderAndIdGroup(
              owner.id,
              item.idGroup
            );

            console.log(members);
            setMessages(mess.slice().reverse());
            setConversation({ ...item, members: members });
            setIsLoad(true);
          }
        );
        return item;
      } else if (
        item.conversationType === "single" &&
        item.user.id === idConversation
      ) {
        getInfo(item);
        await getMessageByIdSenderAndIsReceiver(
          owner.id,
          item.user.id,
          (mess) => {
            console.log(mess);
            setMessages(mess.slice().reverse());
            setIsLoad(true);
            scrollToButtom();
            setConversation({...item});
          }
        );
        return item;
      }
    });

    // eslint-disable-next-line
  }, [idConversation]);

  function mergeArraysWithoutDuplicatesAndIds(arr1, arr2) {
    const map = new Map(arr1.map((item) => [item.id, item]));
    arr2.forEach((item) => {
      if (!map.has(item.id)) {
        map.set(item.id, item);
      }
    });
    const mergedArray = Array.from(map.values());
    return mergedArray;
  }

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

  function filterImageVideo(mess) {
    const allowedTypes = ["VIDEO", "GIF", "JPG", "JPEG", "PNG"];
    const filteredMessages = mess.filter((message) =>
      allowedTypes.includes(message.messageType)
    );
    return filteredMessages;
  }
  function filterFile(mess) {
    const allowedTypes = [
      "VIDEO",
      "GIF",
      "JPG",
      "JPEG",
      "PNG",
      "Text",
      "RETRIEVE",
      "AUDIO",
      "STICKER",
    ];
    const filteredMessages = mess.filter(
      (message) => !allowedTypes.includes(message.messageType)
    );
    console.log(filteredMessages);
    return filteredMessages;
  }
  function filterLink(mess) {
    const filteredMessages = mess.filter(
      (message) =>
        message.messageType === "Text" &&
        /^(ftp|http|https):\/\/[^ "]+$/.test(message.content)
    );
    console.log(filteredMessages);
    return filteredMessages;
  }
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

  useEffect(() => {
    let arrchat = [];
    for (let index = 0; index < owner.conversation.length; index++) {
      let user = {
        id: undefined,
        name: undefined,
        avt: undefined,
        type: undefined,
      };
      if (owner.conversation[index].conversationType === "group") {
        user.id = owner.conversation[index].idGroup + "";
        user.name = owner.conversation[index].nameGroup + "";
        user.avt = owner.conversation[index].avtGroup + "";
        user.type = "group";
        arrchat.push(user);
      } else {
        user.id = owner.conversation[index].user.id + "";
        user.name = owner.conversation[index].user.userName + "";
        user.avt = owner.conversation[index].user.avt + "";
        user.type = "single";
        arrchat.push(user);
      }
    }
    setChats(arrchat);

    let arrFriend = [];
    for (let index = 0; index < owner.friendList.length; index++) {
      arrFriend.push({
        id: owner.friendList[index].user.id,
        name: owner.friendList[index].user.userName,
        avt: owner.friendList[index].user.avt,
        type: "single",
      });
    }
    setFriend(arrFriend);
    setAllUser(mergeArraysWithoutDuplicatesAndIds(arrchat, arrFriend));
  }, [owner.conversation, owner.friendList]);

  function getInfo(conversation) {
    console.log(conversation)
    if (conversation?.conversationType === "group") {
      console.log(conversation.avtGroup);
      setAvtMember(conversation.avtGroup);
      setNameConversation(conversation.nameGroup);
      setReceiver({ id: conversation.idGroup });
    } else if (conversation?.conversationType === "single") {
      setAvtMember(conversation.user.avt);
      setNameConversation(conversation.user.userName);
      setReceiver({ id: conversation.user.id });
    }
  }

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

  var [isOpenForwardMessage, setIsOpenForwardMessage] = useState(false);
  var [forwardMessage, setForwardMessage] = useState(undefined);
  var setIsOpenForwardMessageView = useCallback(
    (message) => {
      if (message) {
        setForwardMessage(message);
      }
      setIsOpenForwardMessage(!isOpenForwardMessage);
    },
    [isOpenForwardMessage]
  );

  return (
    <div className="h-full w-10/12 flex flex-row relative">
      {isOpenForwardMessage && (
        <div className="absolute z-50 h-full w-full ">
          <ForwardMessage
            allMember={allUser}
            setIsOpen={setIsOpenForwardMessage}
            forwardMessage={forwardMessage}
            isOpen={isOpenForwardMessage}
            chats={chats}
            friend={friend}
          />
        </div>
      )}
      <div className={` h-full ${isExtent ? "w-9/12" : "w-full"} `}>
        <div className="border-b flex flex-row items-center justify-between px-4">
          <div className="flex flex-row w-2/5  py-2 ">
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
                  Đang hoạt động
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
            {isLoad ? (
              <div className="absolute bottom-0 max-h-[764px] w-full flex flex-col overflow-scroll justify-items-end overflow-y-auto overflow-x-hidden  py-2 my-2">
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
                        setIsOpenForwardMessage={setIsOpenForwardMessageView}
                      />
                    );
                  }}
                />
              </div>
            ) : (
              <Loader />
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
      {isExtent && (
        <div className="h-full w-3/12 border-l border-gray-200 bg-[#eef0f1] select-none	">
          <div className=" h-[5%] border-b border-gray-200 font-medium text-xl flex flex-row justify-center items-center bg-white">
            Thông tin hội thoại
          </div>
          <div className="max-h-[95%] h-[95%] overflow-y-auto overflow-x-hidden pb-20 scrollbar-container-v2 bg-white">
            <div className=" h-fit p-2 border-b border-gray-200 font-medium text-xl flex flex-col justify-center items-center bg-white">
              <img src={avtMember} alt="." className="h-16 w-16 rounded-full" />
              <p className="text-lg font-medium mt-2">{nameConversation}</p>
            </div>
            <div className=" h-fit  mt-2 border-b border-gray-200 font-medium flex flex-col justify-center items-center bg-white">
              <div
                className="h-7 w-full bg-gray-300 flex flex-row justify-between items-center px-2"
                onClick={() => {
                  setShowImageVideo(!showImageVideo);
                }}
              >
                <p>Ảnh/Video</p>
                <IoCaretDownOutline
                  className={`${showImageVideo && "-rotate-90"}`}
                />
              </div>
              {showImageVideo && (
                <div className="bg-slate-200 h-1000 flex flex-row flex-wrap">
                  {filterImageVideo(messages).map((item) => {
                    if (item.messageType === "VIDEO") {
                      return (
                        <video
                          className="overflow-hidden rounded-md  w-[32%] m-[2px]  "
                          controls
                        >
                          <source src={item.url} type="video/mp4" />
                        </video>
                      );
                    } else {
                      return (
                        <img
                          className=" m-[2px] w-[32%] rounded-md"
                          alt="."
                          src={item.url}
                        />
                      );
                    }
                  })}
                </div>
              )}
            </div>
            <div className=" h-fit  mt-2 border-b border-gray-200 font-medium flex flex-col justify-center items-center bg-white">
              <div
                className="h-7 w-full bg-gray-300 flex flex-row justify-between items-center px-2"
                onClick={() => {
                  setShowFile(!showFile);
                }}
              >
                <p>File</p>
                <IoCaretDownOutline className={`${showFile && "-rotate-90"}`} />
              </div>
              {showFile && (
                <div className="bg-white h-fit flex flex-col w-full items-center">
                  {filterFile(messages)
                    .slice(0, 5)
                    .map((item) => (
                      <div className="h-14 m-1 w-[95%] p-1 bg-slate-300 shadow-lg flex flex-row">
                        {renderIconFile(item.messageType)}
                        <div className="flex flex-col justify-around">
                          <p className="text-sm">{item.titleFile}</p>
                          <p className="text-sm">{formatFileSize(item.size)}</p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <div className=" h-fit  mt-2 border-b border-gray-200 font-medium flex flex-col justify-center items-center bg-white">
              <div
                className="h-7 w-full bg-gray-300 flex flex-row justify-between items-center px-2"
                onClick={() => {
                  setTextLink(!showTextLink);
                }}
              >
                <p>Link</p>
                <IoCaretDownOutline
                  className={`${showTextLink && "-rotate-90"}`}
                />
              </div>
              {showTextLink && (
                <div className="bg-white h-fit flex flex-col w-full items-center">
                  {filterLink(messages)
                    .slice(0, 5)
                    .map((item) => (
                      <div className="h-14 m-1 w-[95%] p-1  shadow-lg flex flex-row">
                        <div className="flex flex-col justify-around">
                          <a
                            href={item.content}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.content}
                          </a>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
