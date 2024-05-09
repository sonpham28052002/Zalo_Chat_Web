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
import EmotionModal from "./EmotionModal";
import ReplyMessage from "../replyMessage/replyMessage";
import { IoCallOutline } from "react-icons/io5";
import { v4 } from "uuid";
import {
  ZegoCloudCall,
  handleSendGroupCall,
  handleSendSingleCall,
} from "../../../ZegoCloudCall/ZegoCloudCall";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export default function ChatRoom({ idConversation, setIndex }) {
  var owner = useSelector((state) => state.data);

  // eslint-disable-next-line
  var [idConversationVirtuoso, setIdConversationVirtuoso] = useState(v4());
  var [avtMember, setAvtMember] = useState("");
  var [nameConversation, setNameConversation] = useState("");
  var [isOpenInforUser, setIsOpenInforUser] = useState(false);
  var [isLoad, setIsLoad] = useState(false);
  var [isLoading, setIsLoading] = useState(false);
  var [showGrantMember, setShowGrantMember] = useState(false);
  var [showAddMember, setShowAddMember] = useState(false);
  var [showSearchMessage, setShowSearchMessage] = useState(false);
  var [searchText, setSearchText] = useState("");
  var [isOpenEmotionModal, setOpenEmotionModal] = useState(true);
  var [replyMessage, setReplyMessage] = useState(undefined);
  var [listSearchMessage, setListSearchMessage] = useState([]);
  var [listIndexMessage, setListIndexMessage] = useState([]);

  var [listMember, setListMember] = useState([]);
  var [isExtent, setIsExtend] = useState(false);
  var [receiver, setReceiver] = useState(undefined);
  var [messages, setMessages] = useState([]);

  var [chats, setChats] = useState([]);
  var [friend, setFriend] = useState([]);
  var [allUser, setAllUser] = useState([]);
  var [messageSelect, setMessageSelect] = useState(undefined);
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
      if (
        mess.sender.id === idConversation ||
        mess.receiver.id === idConversation
      ) {
        getMessageByIdSenderAndIsReceiver(owner.id, idConversation, (data) => {
          console.log(data);
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
    console.log(mess);
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

  var isOpenEmotion = useCallback(
    (value, messageSelect) => {
      setMessageSelect(messageSelect);
      setOpenEmotionModal(value);
    },
    // eslint-disable-next-line
    [isOpenEmotionModal]
  );

  var updateMessage = useCallback(
    (message) => {
      const index = [...messages].findIndex((item) => item.id === message.id);
      messages[index].react = [...message.react];
      setMessages([...messages]);
    },
    // eslint-disable-next-line
    [messages]
  );

  useSubscription("/user/" + owner.id + "/disbandConversation", (message) => {
    let mess = JSON.parse(message.body);
    setConversation(mess);
    setIsExtend(false);
  });

  useSubscription("/user/" + owner.id + "/removeMemberInGroup", (messages) => {
    let mess = JSON.parse(messages.body);
    console.log(mess);
    // eslint-disable-next-line
    mess.members.map((item, index) => {
      listMember[index].memberType = item.memberType;
    });
    mess.members = [...listMember];
    setConversation(mess);
    setIsExtend(false);
  });

  useSubscription("/user/" + owner.id + "/outGroup", (messages) => {
    let mess = JSON.parse(messages.body);
    // eslint-disable-next-line
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

  useSubscription(
    "/user/" + owner.id + "/SeenMessageSingle",
    async (messages) => {
      const mess = JSON.parse(messages.body);
      setMessages([...mess.reverse()]);
    }
  );

  useSubscription(
    "/user/" + owner.id + "/SeenMessageGroup",
    async (messages) => {
      const mess = JSON.parse(messages.body);
      setMessages([...mess.reverse()]);
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
    if (text === "") {
      setListSearchMessage([]);
      setListIndexMessage([]);
      return;
    }
    var listSearchMessage = [];
    var listIndex = [];
    messages.forEach(function (obj, index) {
      if (
        obj.messageType === "Text" &&
        obj.content.toLowerCase().includes(text.toLowerCase())
      ) {
        listSearchMessage.push(obj);
        listIndex.push(index);
      }
    });
    setListSearchMessage(listSearchMessage);
    setListIndexMessage(listIndex);
  };

  var checkUserConversation = (id) => {
    for (let index = 0; index < owner.conversation.length; index++) {
      if (
        owner.conversation[index].conversationType === "single" &&
        owner.conversation[index].id === id
      ) {
        return null;
      }
    }
    var user = owner.friendList.filter((item) => item.user.id === id)[0];
    return user;
  };

  useEffect(() => {
    // eslint-disable-next-line
    setReplyMessage(undefined);
    setIsLoad(false);
    setIsExtend(false);
    setOpenEmotionModal(false);
    setSearchText("");
    setShowSearchMessage(false);
    setListSearchMessage([]);
    setListIndexMessage([]);
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
            setMessages([...mess.slice().reverse()]);
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
            check = true;
          }
        );
        return item;
      }
    });
    var check = checkUserConversation(idConversation);
    if (check) {
      const conver = {
        conversationType: "single",
        lastMessage: undefined,
        user: {
          id: check.user.id,
          avt: check.user.avt,
          userName: check.user.userName,
        },
      };
      console.log(conver);
      setConversation({ ...conver });
      setMessages([]);
      setAvtMember(check.user.avt);
      setNameConversation(check.user.userName);
      setReceiver({ id: check.user.id });
      setIsLoad(true);
    }

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

  var setReplyMessageConversation = useCallback(
    (message) => {
      setReplyMessage(message);
    },
    // eslint-disable-next-line
    [replyMessage]
  );

  var forcusIndexMessage = (message) => {
    var mess = [...messages];
    for (let index = 0; index < mess.length; index++) {
      if (mess[index].id === message.id) {
        scrollContainerRef.current?.scrollToIndex({
          index: index,
          align: "start",
          behavior: "auto",
        });
        break;
      }
    }
  };

  var forcusMessage = useCallback(
    forcusIndexMessage,
    // eslint-disable-next-line
    [messages]
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

  function SearchMessageView({ list }) {
    if (conversation.conversationType !== "single") {
      console.log(conversation);
    }
    function getUserNameById(id) {
      return conversation.members.filter((item) => item.member.id === id)[0]
        .member?.userName;
    }
    function getAVTById(id) {
      return conversation.members.filter((item) => item.member.id === id)[0]
        .member?.avt;
    }
    return (
      <div className="h-full">
        <div className="h-16 w-full flex flex-row items-center px-4 border-b">
          <p className="text-lg font-medium">Tìm kiếm tin nhắn</p>
        </div>
        {list.map((item, index) => (
          <div
            key={index}
            className="flex flex-row bg-white h-[70px] items-center cursor-pointer blur-item-light"
            onClick={() =>
              scrollContainerRef.current?.scrollToIndex({
                index: listIndexMessage[index],
                align: "start",
                behavior: "auto",
              })
            }
          >
            <img
              className="w-10 h-10 m-2 rounded-full"
              src={
                item.sender.id === owner.id
                  ? owner.avt
                  : conversation.conversationType === "single"
                  ? avtMember
                  : getAVTById(item.sender.id)
              }
              alt="."
            />
            <div className="flex flex-col">
              <div className="flex flex-row">
                <p className="w-[170px] text-base font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap ">
                  {/* {item.sender.id === owner.id ? owner.userName : nameConversation} */}
                  {item.sender.id === owner.id
                    ? owner.userName
                    : conversation.conversationType === "single"
                    ? nameConversation
                    : getUserNameById(item.sender.id)}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(item.senderDate).getDate() +
                    "/" +
                    (new Date(item.senderDate).getMonth() + 1) +
                    "/" +
                    new Date(item.senderDate).getFullYear()}
                </p>
              </div>

              <p className="w-[200px] text-base overflow-hidden overflow-ellipsis whitespace-nowrap ">
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  useSubscription(
    "/user/" + idConversationVirtuoso + "/checkUserResult",
    (data) => {
      const result = JSON.parse(data.body);
      console.log(result);
    }
  );
  function handleSendCall(callType) {
    console.log(ZegoCloudCall);
    // stompClient.send(
    //   "/app/checkUser",
    //   {},
    //   JSON.stringify({
    //     userId: owner.id,
    //     addressReceiver: idConversationVirtuoso,
    //   })
    // );
    handleSendSingleCall(callType, conversation.user, owner);
  }
  function handleSendCallGroup(callType) {
    console.log(ZegoCloudCall);
    // stompClient.send(
    //   "/app/checkUser",
    //   {},
    //   JSON.stringify({
    //     userId: owner.id,
    //     addressReceiver: idConversationVirtuoso,
    //   })
    // );
    var arrUserReceiver = [];
    for (let index = 0; index < conversation.members.length; index++) {
      const element = conversation.members[index];
      if (element.memberType !== "LEFT_MEMBER") {
        arrUserReceiver.push({
          userID: element.member.id,
          userName: element.member.userName,
        });
      }
    }

    handleSendGroupCall(callType, arrUserReceiver, conversation.idGroup, owner);
  }

  var [seenIndexes, setSeenIndexes] = useState([]);
  useEffect(() => {
    if (conversation?.conversationType === "single") {
      var arr = [];
      var mess = messages.slice();
      mess.reverse();
      for (let index = 0; index < mess.length; index++) {
        var user = { id: conversation.user.id, avt: conversation.user.avt };
        var ownerVir = { id: owner.id, avt: owner.avt };
        if (mess[index + 1]) {
          if (
            checkSeen(mess[index], user.id) &&
            !checkSeen(mess[index + 1], user.id)
          ) {
            arr.push({ indexMessage: mess[index].id, user: user });
          }
          if (
            checkSeen(mess[index], ownerVir.id) &&
            !checkSeen(mess[index + 1], ownerVir.id)
          ) {
            arr.push({ indexMessage: mess[index].id, user: ownerVir });
          }
        } else {
          if (checkSeen(mess[index], user.id)) {
            arr.push({ indexMessage: mess[index].id, user: user });
          }
          if (checkSeen(mess[index], ownerVir.id)) {
            arr.push({ indexMessage: mess[index].id, user: ownerVir });
          }
        }
      }
      setSeenIndexes(arr);
    } else {
      var arrSeenIndex = [];
      var messSeenIndex = messages.slice();
      messSeenIndex.reverse();
      for (let i = 0; i < listMember.length; i++) {
        var userGroup = {
          id: listMember[i].member.id,
          avt: listMember[i].member.avt,
        };
        for (let index = 0; index < messSeenIndex.length; index++) {
          if (messSeenIndex[index + 1]) {
            if (
              checkSeen(messSeenIndex[index], userGroup.id) &&
              !checkSeen(messSeenIndex[index + 1], userGroup.id)
            ) {
              arrSeenIndex.push({
                indexMessage: messSeenIndex[index].id,
                user: userGroup,
              });
            }
          } else {
            if (checkSeen(messSeenIndex[index], userGroup.id)) {
              arrSeenIndex.push({
                indexMessage: messSeenIndex[index].id,
                user: userGroup,
              });
            }
          }
        }
      }
      setSeenIndexes(arrSeenIndex);
    }
    // eslint-disable-next-line
  }, [messages, listMember]);

  function checkSeen(message, idUser) {
    for (let index = 0; index < message.seen.length; index++) {
      if (message.seen[index].id === idUser) {
        return true;
      }
    }
    return false;
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
          {showSearchMessage === true && (
            <div className="w-full flex flex-row p-2 justify-center items-center">
              <input
                type="text"
                placeholder="Tìm tin nhắn"
                spellCheck="false"
                className="w-3/4 bg-slate-100 h-8 border p-1 text-xs rounded pl-7 focus:outline-none"
                onChange={(e) => {
                  handleSearchText(e.target.value);
                }}
              ></input>
              <button
                className="w-[100px]"
                onClick={() => setShowSearchMessage(false)}
              >
                Đóng
              </button>
            </div>
          )}
          <div className="flex flex-row justify-center items-center">
            <div
              className=" h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2"
              onClick={() => {
                setShowSearchMessage(true);
                setIsExtend(false);
              }}
            >
              <IoIosSearch className="text-2xl " />
            </div>
            <div
              className=" h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2"
              onClick={() => {
                if (conversation.conversationType === "single") {
                  handleSendCall(ZegoUIKitPrebuilt.InvitationTypeVoiceCall);
                } else {
                  handleSendCallGroup(
                    ZegoUIKitPrebuilt.InvitationTypeVoiceCall
                  );
                }
              }}
            >
              <IoCallOutline className="text-xl " />
            </div>
            <div
              className=" h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2"
              onClick={() => {
                if (conversation.conversationType === "single") {
                  handleSendCall(ZegoUIKitPrebuilt.InvitationTypeVideoCall);
                } else {
                  handleSendCallGroup(
                    ZegoUIKitPrebuilt.InvitationTypeVoiceCall
                  );
                }
              }}
            >
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
                    className={`w-full ${
                      replyMessage ? "min-h-[700px]" : "min-h-[740px]"
                    }  scrollbar-container rotate-180`}
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
                          messageNext={messages[index + 1]}
                          setIsOpenForwardMessage={setIsOpenForwardMessageView}
                          setReplyMessage={setReplyMessageConversation}
                          forcusMessage={forcusMessage}
                          isOpenEmotion={isOpenEmotion}
                          updateMessage={updateMessage}
                          seen={seenIndexes}
                        />
                      );
                    }}
                  />
                  {replyMessage && (
                    <ReplyMessage
                      replyMessage={replyMessage}
                      setReplyMessage={setReplyMessage}
                    />
                  )}
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
                replyMessage={replyMessage}
                setReplyMessageConversation={setReplyMessageConversation}
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
      {showSearchMessage && (
        <div className="h-full w-[380px] border-l border-gray-200 select-none">
          <SearchMessageView list={listSearchMessage}></SearchMessageView>
        </div>
      )}
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
      {isOpenEmotionModal && messageSelect && (
        <EmotionModal
          isOpen={isOpenEmotionModal}
          setIsOpen={setOpenEmotionModal}
          conversation={conversation}
          messageSelect={messageSelect}
        />
      )}
    </div>
  );
}
