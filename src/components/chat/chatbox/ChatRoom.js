import React, { useEffect, useRef, useState, useCallback } from "react";
import { BsCameraVideo } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { PiTagSimpleFill, PiWarningCircleLight } from "react-icons/pi";
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
import OptionChat from "./OptionChat";
import GrantMember from "./GrantMember";
import AddMemberModal from "./AddMemberModal";

export default function ChatRoom({ idConversation, setIndex }) {
  var owner = useSelector((state) => state.data);
  var [avtMember, setAvtMember] = useState("");
  var [nameConversation, setNameConversation] = useState("");
  var [isOpenInforUser, setIsOpenInforUser] = useState(false);
  var [isLoad, setIsLoad] = useState(false);
  var [isLoading, setIsLoading] = useState(false);
  var [showGrantMember, setShowGrantMember] = useState(false);
  var [showAddMember, setShowAddMember] = useState(false);
  var [showSearchMessage, setShowSearchMessage] = useState(false);
  var [searchText, setSearchText] = useState("");

  var [listMember, setListMember] = useState([]);
  var [isExtent, setIsExtend] = useState(false);
  var [receiver, setReceiver] = useState(undefined);
  var [messages, setMessages] = useState([]);
  var [chats, setChats] = useState([]);
  var [friend, setFriend] = useState([]);
  var [allUser, setAllUser] = useState([]);
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
    if (conversation.conversationType === "single") {
      if (mess.receiver.id === idConversation) {
        getMessageByIdSenderAndIsReceiver(owner.id, idConversation, (data) => {
          setMessages(data.slice().reverse());
        });
      }
    }
  });

  useSubscription("/user/" + owner.id + "/grantRoleMember", (messages) => {
    let mess = JSON.parse(messages.body);
    console.log(mess);
    // eslint-disable-next-line
    mess.members.map((item, index) => {
      listMember[index].memberType = item.memberType;
    });
    mess.members = [...listMember];
    console.log(mess);

    setConversation(mess);
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

  useSubscription("/user/" + owner.id + "/retrieveMessage", (message) => {
    let mess = JSON.parse(message.body);
    if (mess.messageType === "RETRIEVE") {
      const index = [...messages].findIndex((item) => item.id === mess.id);
      messages[index] = mess;
      setMessages([...messages]);
    }
  });

  var showGrantMemberView = useCallback(
    (value) => {
      setShowGrantMember(value);
    },
    // eslint-disable-next-line
    [showGrantMember]
  );

  useSubscription("/user/" + owner.id + "/disbandConversation", (message) => {
    let mess = JSON.parse(message.body);
    setConversation(mess);
    setIsExtend(false);
  });

  useSubscription("/user/" + owner.id + "/removeMemberInGroup", (messages) => {
    let mess = JSON.parse(messages.body);
    console.log(mess);
    mess.members.map((item, index) => {
      listMember[index].memberType = item.memberType;
    });
    mess.members = [...listMember];
    setConversation(mess);
    setIsExtend(false);
  });

  useSubscription("/user/" + owner.id + "/outGroup", (messages) => {
    let mess = JSON.parse(messages.body);
    mess.members.map((item, index) => {
      listMember[index].memberType = item.memberType;
    });
    console.log(mess);
    mess.members = [...listMember];
    setConversation(mess);
    setIsExtend(false);
  });

  useSubscription("/user/" + owner.id + "/changeStatusGroup", (messages) => {
    let mess = JSON.parse(messages.body);
    mess.members = [...listMember];
    setConversation(mess);
  });

  useSubscription(
    "/user/" + owner.id + "/addMemberIntoGroup",
    async (messages) => {
      let mess = JSON.parse(messages.body);
      console.log("mess");
      setIsExtend(false);
      let members = await getMemberByIdSenderAndIdGroup(owner.id, mess.idGroup);
      setListMember(members);
      setConversation({ ...mess, members: members });
    }
  );
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

  const handleSearchText = (text) => {
    setSearchText(text);
    var indexes = [];
    messages.forEach(function (obj, index) {
      if (obj.messageType === "Text" && obj.content.toLowerCase().includes(text.toLowerCase())) {
        indexes.push(index);
      }
    });
    console.log(indexes);
  };


  useEffect(() => {
    // eslint-disable-next-line
    setIsLoad(false);
    setIsExtend(false);
    owner.conversation.filter(async (item) => {
      if (
        item.conversationType === "group" &&
        item.idGroup === idConversation
      ) {
        getInfo(item);
        await getMessageAndMemberByIdSenderAndIdGroup(
          owner.id,
          item.idGroup,
          async (mess) => {
            scrollToButtom();
            let members = await getMemberByIdSenderAndIdGroup(
              owner.id,
              item.idGroup
            );
            setMessages(mess.slice().reverse());
            setListMember(members);
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
            setMessages(mess.slice().reverse());
            setIsLoad(true);
            scrollToButtom();
            setConversation({ ...item });
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
    if (conversation?.conversationType === "group") {
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

  function checkInputConversation() {
    if (conversation.conversationType === "single") {
      return true;
    } else {
      const iam = conversation.members.filter(
        (item) => item.member.id === owner.id
      )[0];
      if (iam.memberType === "LEFT_MEMBER") {
        return false;
      }
      if (iam.memberType === "MEMBER" && conversation.status === "READ_ONLY") {
        return false;
      }
      if (
        iam.memberType === "MEMBER" &&
        conversation.status === "CHANGE_IMAGE_AND_NAME_ONLY"
      ) {
        return false;
      }
      if (
        iam.memberType === "GROUP_LEADER" &&
        conversation.status !== "DISBANDED"
      ) {
        return true;
      } else if (
        iam.memberType === "DEPUTY_LEADER" &&
        conversation.status !== "DISBANDED"
      ) {
        return true;
      } else if (
        (iam.memberType === "MEMBER" &&
          conversation.status === "MESSAGE_ONLY") ||
        conversation.status === "ACTIVE"
      ) {
        return true;
      } else {
        return false;
      }
    }
  }

  function checkNotificationInput() {
    const iam = conversation.members.filter(
      (item) => item.member.id === owner.id
    )[0];
    if (iam.memberType === "LEFT_MEMBER") {
      return "Bạn không còn là thành viên của nhóm này, bạn chỉ có thể đọc được tin nhắn trước đó.";
    }
    if (conversation?.status === "DISBANDED") {
      return "Nhóm đã giải tán";
    } else if (
      conversation?.status === "READ_ONLY" &&
      iam.memberType === "MEMBER"
    ) {
      return "Chỉ có trường nhóm và phó nhóm mới có thể gửi tin nhắn.";
    }
  }

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
                if (conversation.conversationType === "single") {
                  setIsOpenInforUser(true);
                }
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
          {showSearchMessage === true && <div className="w-full flex flex-row p-2 justify-center items-center">
          <input
            type="text" placeholder="Tìm tin nhắn" spellCheck="false"
            className="w-3/4 bg-slate-100 h-8 border p-1 text-xs rounded pl-7 focus:outline-none"
            onChange={(e) => {
              handleSearchText(e.target.value);
            }}
          ></input>
          <button className="w-[100px]" onClick={() => setShowSearchMessage(false)}>Đóng</button>
        </div>}
          <div className="flex flex-row justify-center items-center">
            <div className=" h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2"
              onClick={() => {
                setShowSearchMessage(true);
              }}>
              <IoIosSearch className="text-2xl " />
            </div>
            <div className=" h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2">
              <BsCameraVideo className="text-xl " />
            </div>
            <div
              className=" h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2 "
              onClick={() => {
                if (
                  conversation.conversationType === "group" &&
                  conversation.status !== "DISBANDED"
                ) {
                  setIsExtend(!isExtent);
                } else if (conversation.conversationType === "single") {
                  setIsExtend(!isExtent);
                }
              }}
            >
              <VscLayoutSidebarRightOff className="text-xl " />
            </div>
          </div>
        </div>
        {/* {showSearchMessage === true && <div className="w-full bg-slate-50 flex flex-row p-2 justify-center items-center">
          <input
            type="text" placeholder="Tìm tin nhắn" spellCheck="false"
            className="w-3/4 bg-slate-100 h-8 border p-1 text-xs rounded pl-7 focus:outline-none"
            onChange={(e) => {
              handleSearchText(e.target.value);
            }}
          ></input>
          <button className="w-[100px]" onClick={() => setShowSearchMessage(false)}>Đóng</button>
        </div>} */}
        {isLoad ? (
          <div className="h-[877px]">
            <div
              className="bg-image bg-cover bg-center relative h-[765px] w-full"
              style={{
                backgroundImage: `url(${avtMember})`,
              }}
            >
              <div className="absolute inset-0 opacity-50 bg-black "></div>
              <>
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
              </>

              {isLoading && (
                <div className="absolute bottom-0 w-full flex flex-row justify-center items-center pb-2 ">
                  <Loader />
                </div>
              )}
            </div>
            {checkInputConversation() && conversation.status !== "DISBANDED" ? (
              <InputMessage
                conversation={conversation}
                setIndex={setIndex}
                receiver={receiver}
                setMessages={setMessages}
                messages={messages}
                setIsLoading={setIsLoading}
              />
            ) : (
              <div className="flex flex-row justify-center items-center h-20 text-xl font-normal text-red-500">
                <PiWarningCircleLight className="text-2xl mr-2" />
                Không thể gửi tin nhắn
              </div>
            )}
          </div>
        ) : (
          <Loader />
        )}
        {receiver && conversation.conversationType !== "group" && (
          <UserInfoModal
            isOpen={isOpenInforUser}
            setIsOpen={setIsOpenInforUser}
            userId={receiver.id}
          />
        )}
      </div>
      {isExtent && (
        <OptionChat
          conversation={conversation}
          nameConversation={nameConversation}
          avtMember={avtMember}
          messages={messages}
          showGrantMemberView={showGrantMemberView}
          showAddMember={setShowAddMember}
        />
      )}
      {showGrantMember && (
        <GrantMember
          conversation={conversation}
          nameConversation={nameConversation}
          avtMember={avtMember}
          messages={messages}
          isOpen={showGrantMember}
          setIsOpen={showGrantMemberView}
        />
      )}
      {showAddMember && (
        <AddMemberModal
          conversation={conversation}
          nameConversation={nameConversation}
          avtMember={avtMember}
          messages={messages}
          isOpen={showAddMember}
          setIsOpen={setShowAddMember}
        />
      )}
    </div>
  );
}
