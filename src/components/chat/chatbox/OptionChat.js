import React, { useState, useEffect, useRef } from "react";
import {
  AiFillFilePpt,
  AiFillFileZip,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { BiEdit, BiSolidFilePdf, BiSolidFileTxt } from "react-icons/bi";
import {
  FaFileCode,
  FaFileCsv,
  FaFileExcel,
  FaFileWord,
} from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";

import {
  IoCaretDownOutline,
  IoChevronBack,
  IoLogoHtml5,
  IoPersonRemoveOutline,
} from "react-icons/io5";
import { LuFileJson } from "react-icons/lu";
import { useSelector } from "react-redux";
import { GrResources } from "react-icons/gr";
import { stompClient } from "../../../socket/socket";
export default function OptionChat({
  conversation,
  nameConversation,
  avtMember,
  messages,
  showGrantMemberView,
  showAddMember,
  setLeaderOutGroup,
}) {
  var owner = useSelector((state) => state.data);
  var [showImageVideo, setShowImageVideo] = useState(false);
  var [showFile, setShowFile] = useState(false);
  var [showTextLink, setTextLink] = useState(false);
  var [showManageGroup, setShowManageGroup] = useState(false);
  var [status, setStatus] = useState(conversation.status);

  var [showMember, setShowMember] = useState(false);
  var [isEdit, setIsEdit] = useState(false);

  var sendMessRef = useRef(undefined);
  var changeRef = useRef(undefined);

  var [members, setMembers] = useState([]);

  useEffect(() => {
    if (conversation.conversationType === "group") {
      setMembers(
        conversation.members.filter((item) => item.memberType !== "LEFT_MEMBER")
      );
    } // eslint-disable-next-line
  }, [conversation?.members]);

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
      (message) => !allowedTypes.includes(message?.messageType)
    );
    return filteredMessages;
  }
  function filterLink(mess) {
    const filteredMessages = mess.filter(
      (message) =>
        message?.messageType === "Text" &&
        /^(ftp|http|https):\/\/[^ "]+$/.test(message.content)
    );
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

  function deleteMemberGroup(user) {
    const iam = conversation.members.filter(
      (item) => item.member.id === owner.id
    )[0];
    if (
      iam.memberType === "GROUP_LEADER" &&
      user.memberType !== "GROUP_LEADER"
    ) {
      return (
        <div
          className="h-7 w-7 hover:bg-slate-100 flex flex-row justify-center items-center rounded-md"
          onClick={() => {
            removeMemberInGroup(user.member.id);
          }}
        >
          <IoPersonRemoveOutline />
        </div>
      );
    } else if (
      iam.memberType === "DEPUTY_LEADER" &&
      user.memberType === "MEMBER"
    ) {
      return (
        <div
          className="h-7 w-7 hover:bg-slate-100 flex flex-row justify-center items-center rounded-md"
          onClick={() => {
            removeMemberInGroup(user.member.id);
          }}
        >
          <IoPersonRemoveOutline />
        </div>
      );
    }
  }

  function checkRole(role) {
    const mb = conversation.members.filter(
      (item) => item.member.id === owner.id
    )[0];
    if (mb.memberType === role) {
      return true;
    } else {
      return false;
    }
  }

  function disbandGroup() {
    stompClient.send(
      "/app/disbandConversation",
      {},
      JSON.stringify(conversation)
    );
  }
  function handleOutGroup() {
    stompClient.send(
      "/app/outGroup",
      {},
      JSON.stringify({ userId: owner.id, idGroup: conversation.idGroup })
    );
  }
  function handleLeaderOutGroup() {
    setLeaderOutGroup(true);
  }
  var removeMemberInGroup = async (userId) => {
    if (
      conversation.members.filter((item) => item.memberType !== "LEFT_MEMBER")
        .length <= 3
    ) {
      alert("chỉ còn 3 thành viên. bạn chỉ có thể giải tán nhóm.");
      return;
    } else {
      stompClient.send(
        "/app/removeMemberInGroup",
        {},
        JSON.stringify({
          userId: userId,
          idGroup: conversation.idGroup,
          ownerId: owner.id,
        })
      );
    }
  };

  var updateStatus = async () => {
    const con = {
      idGroup: conversation.idGroup,
      ownerId: owner.id,
      status: status,
    };
    stompClient.send("/app/changeStatusGroup", {}, JSON.stringify(con));
  };

  function settingStatus() {
    const change = changeRef.current.checked;
    const send = sendMessRef.current.checked;
    if (send && change) {
      setStatus("ACTIVE");
    } else if (send) {
      setStatus("MESSAGE_ONLY");
    } else if (change) {
      setStatus("CHANGE_IMAGE_AND_NAME_ONLY");
    } else {
      setStatus("READ_ONLY");
    }
  }
  return (
    <>
      {showManageGroup && conversation.conversationType !== "single" ? (
        <div className="h-full w-3/12 border-l border-gray-200 bg-[#eef0f1] select-none">
          <div className=" h-[5%] border-b border-gray-200 font-medium text-xl flex flex-row  px-2 justify-start items-center bg-white">
            <div
              className="mr-10 h-7 w-7 justify-center items-center flex flex-row rounded-md hover:bg-slate-300"
              onClick={() => {
                setShowManageGroup(false);
                setStatus(conversation.status);
                setIsEdit(false);
              }}
            >
              <IoChevronBack className="text-xl " />
            </div>
            Quản lý nhóm
          </div>
          <div className="max-h-[95%] h-[95%] pt-3 overflow-y-auto overflow-x-hidden pb-20 scrollbar-container-v2 bg-white">
            <div className="pb-2">
              <div className="px-1 border-b text-sm border-gray-200 flex flex-row justify-between items-center">
                Chỉ cho phép thành viên trong nhóm thực hiện
                <BiEdit
                  className="text-xl hover:text-green-500"
                  onClick={() => {
                    setIsEdit(true);
                  }}
                />
              </div>
              <div
                className="flex flex-row justify-between font-medium
               items-center px-4 h-10 hover:bg-slate-200"
              >
                <label
                  htmlFor="1"
                  className="h-full w-full flex flex-row items-center"
                  onClick={() => {
                    if (isEdit) {
                      sendMessRef.current.checked =
                        !sendMessRef.current.checked;
                      settingStatus();
                    }
                  }}
                >
                  Gửi tin nhắn
                </label>
                <input
                  ref={sendMessRef}
                  checked={status === "ACTIVE" || status === "MESSAGE_ONLY"}
                  disabled={!isEdit}
                  id="1"
                  type="checkbox"
                />
              </div>
              <div
                className="flex flex-row justify-between font-medium
               items-center px-4 h-10 hover:bg-slate-200"
              >
                <label
                  htmlFor="2"
                  disabled={!isEdit}
                  className="h-full w-full flex flex-row items-center"
                  onClick={() => {
                    if (isEdit) {
                      changeRef.current.checked = !changeRef.current.checked;
                      settingStatus();
                    }
                  }}
                >
                  Thay đổi ảnh và tên nhóm
                </label>
                <input
                  checked={
                    status === "ACTIVE" ||
                    status === "CHANGE_IMAGE_AND_NAME_ONLY"
                  }
                  disabled={!isEdit}
                  ref={changeRef}
                  id="2"
                  type="checkbox"
                />
              </div>
              {isEdit && (
                <div className="h-12  w-full flex flex-row justify-evenly items-center">
                  <button
                    className="h-9 w-1/4 bg-gray-300 rounded-md"
                    onClick={() => {
                      setStatus(conversation.status);
                      setIsEdit(false);
                    }}
                  >
                    Huỷ
                  </button>
                  <button
                    className="h-9 w-1/4 bg-gray-300 rounded-md"
                    onClick={() => {
                      updateStatus();
                      setIsEdit(false);
                    }}
                  >
                    Lưu
                  </button>
                </div>
              )}
            </div>
            <div className="border-t border-gray-400 p-3 ">
              <div
                className="w-full bg-[#dfe2e7] hover:bg-slate-300 h-10 text-lg flex flex-row justify-center items-center font-medium  mb-5"
                onClick={() => {
                  console.log("soibn");
                  showGrantMemberView(true);
                }}
              >
                Phân quyền
              </div>
              <div
                className="w-full text-red-600 bg-[#f4dfdf] hover:bg-[#f9cdcd] h-10 text-lg flex flex-row justify-center items-center font-medium  mb-5"
                onClick={() => {
                  disbandGroup();
                }}
              >
                Giải tán nhóm
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full w-3/12 border-l border-gray-200 bg-[#eef0f1] select-none">
          <div className=" h-[5%] border-b border-gray-200 font-medium text-xl flex flex-row justify-center items-center bg-white">
            Thông tin hội thoại
          </div>
          <div className="max-h-[95%] h-[95%] overflow-y-auto overflow-x-hidden pb-20 scrollbar-container-v2 bg-white">
            <div className=" h-fit p-2 border-b border-gray-200 font-medium text-xl flex flex-col justify-center items-center bg-white">
              <img src={avtMember} alt="." className="h-16 w-16 rounded-full" />
              <p className="text-lg font-medium mt-2">{nameConversation}</p>
              {conversation.conversationType !== "single" && (
                <div className="h-20 w-full flex pt-2 flex-row justify-evenly items-start">
                  <div className="h-full w-20 flex flex-col justify-start items-center">
                    <div
                      className="h-9 w-9 mb-1 rounded-full bg-slate-100 hover:bg-slate-300 flex flex-row justify-center items-center"
                      onClick={() => {
                        setShowMember(false);
                      }}
                    >
                      <GrResources />
                    </div>
                    <p className="text-xs text-center">Tài nguyên</p>
                  </div>
                  <div className="h-full w-20 flex flex-col justify-start items-center">
                    <div
                      className="h-9 w-9 mb-1 rounded-full bg-slate-100 hover:bg-slate-300 flex flex-row justify-center items-center"
                      onClick={() => {
                        console.log("clclclc");
                        showAddMember(true);
                      }}
                    >
                      <AiOutlineUsergroupAdd />
                    </div>
                    <p className="text-xs text-center">Thêm thành viên mới</p>
                  </div>
                  <div className="h-full w-20 flex flex-col justify-start items-center">
                    <div
                      className="h-9 w-9 mb-1 rounded-full bg-slate-100 hover:bg-slate-300 flex flex-row justify-center items-center"
                      onClick={() => {
                        setShowMember(true);
                      }}
                    >
                      <HiUserGroup />
                    </div>
                    <p className="text-xs text-center">Thành viên nhóm</p>
                  </div>
                  {checkRole("GROUP_LEADER") && (
                    <div className="h-full w-20 flex flex-col justify-start items-center">
                      <div
                        className="h-9 w-9 mb-1 rounded-full bg-slate-100 hover:bg-slate-300 flex flex-row justify-center items-center"
                        onClick={() => {
                          setShowManageGroup(true);
                        }}
                      >
                        <AiOutlineUsergroupAdd />
                      </div>
                      <p className="text-xs text-center">Quản lý nhóm</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            {showMember ? (
              <div className=" h-fit w-full">
                {members.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="w-full h-16 text-sm flex flex-row items-center justify-between px-2 hover:bg-slate-200"
                    >
                      <div className="w-4/5 flex flex-row items-center">
                        <img
                          src={item.member.avt}
                          alt="."
                          className="h-10 w-10 mx-2 rounded-full"
                        />
                        <div>
                          <p className="font-medium">{item.member.userName}</p>
                          {item.memberType === "GROUP_LEADER" && (
                            <p className="text-xs text-gray-500">Trưởng nhóm</p>
                          )}
                          {item.memberType === "DEPUTY_LEADER" && (
                            <p className="text-xs text-gray-500">Phó nhóm</p>
                          )}
                          {item.memberType === "MEMBER" && (
                            <p className="text-xs text-gray-500">Thành viên</p>
                          )}
                        </div>
                      </div>
                      {deleteMemberGroup(item)}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>
                <div className="  h-fit  mt-2 border-b border-gray-200 font-medium flex flex-col justify-center items-center ">
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
                    <IoCaretDownOutline
                      className={`${showFile && "-rotate-90"}`}
                    />
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
                              <p className="text-sm">
                                {formatFileSize(item.size)}
                              </p>
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
                {conversation.conversationType === "group" &&
                  conversation?.members.filter(
                    (item) => item.member.id === owner.id
                  )[0].memberType !== "GROUP_LEADER" && (
                    <div className="h-10 w-full p-2">
                      <div
                        className="flex flex-row justify-center items-center w-full h-10 rounded-md bg-red-300"
                        onClick={async () => {
                          await handleOutGroup();
                        }}
                      >
                        <CiLogout className="font-medium mr-1" /> rời nhóm
                      </div>
                    </div>
                  )}
                {conversation.conversationType === "group" &&
                  conversation?.members.filter(
                    (item) => item.member.id === owner.id
                  )[0].memberType === "GROUP_LEADER" && (
                    <div className="h-10 w-full p-2">
                      <div
                        className="flex flex-row justify-center items-center w-full h-10 rounded-md bg-red-300"
                        onClick={async () => {
                          await handleLeaderOutGroup();
                        }}
                      >
                        <CiLogout className="font-medium mr-1" /> rời nhóm
                      </div>
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
