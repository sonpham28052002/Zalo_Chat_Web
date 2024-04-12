import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { uploadFile } from "../../../services/Azure_Service";
import { useRef } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { Virtuoso } from "react-virtuoso";
import { v4 } from "uuid";
import { stompClient } from "../../../socket/socket";
import Loader from "../custom/loader";
export default function CreateGroupModal({ isOpen, setIsOpen }) {
  var user = useSelector((state) => state.data);
  const [selectedFile, setSelectedFile] = useState(undefined);
  var nameRef = useRef(undefined);
  const [activeTab, setActiveTab] = useState("select");
  const [addSender, setAddSend] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  function closeModal() {
    setIsOpen(false);
    setSelectedFile(null);
    setAddSend([]);
  }

  useEffect(() => {}, []);

  var createGroup = async () => {
    setIsLoad(true);
    let url = undefined;
    if (selectedFile) {
      url = await uploadFile(selectedFile);
    }
    var array = [];
    for (var i = 0; i < addSender.length; i++) {
      const member = {
        member: { id: addSender[i].id },
        memberType: "MEMBER",
      };
      array.push(member);
    }
    const member = {
      member: { id: user.id },
      memberType: "GROUP_LEADER",
    };
    array.push(member);
    var group = {
      conversationType: "group",
      idGroup: v4(),
      members: array,
      avtGroup: url,
      nameGroup: nameRef.current.value,
      status: "READ_ONLY",
    };
    stompClient.send("/app/createGroup", {}, JSON.stringify(group));
    setIsLoad(false);
  };

  function addToUniqueArray(newItem, actionType) {
    if (actionType === "add") {
      const exists = addSender.some((item) => item.id === newItem.id);
      if (!exists) {
        setAddSend([...addSender, newItem]);
      }
    } else if (actionType === "remove") {
      setAddSend(addSender.filter((item) => item.id !== newItem.id));
    }
  }

  function isItemExistInArray(item) {
    return addSender.some((element) => element.id === item.id);
  }

  var itemRowchat = (item) => {
    return (
      <div className=" shadow-md my-1 p-1">
        <div className="flex flex-row items-center text-black">
          <input
            type="checkbox"
            checked={isItemExistInArray(item)}
            className="text-2xl h-4 w-4 accent-blue-500"
            id={item.id}
            onChange={(e) => {
              if (e.target.checked) {
                addToUniqueArray(item, "add");
              } else {
                addToUniqueArray(item, "remove");
              }
            }}
          />
          <label
            className="flex flex-row items-center  w-full ml-2"
            htmlFor={item.id}
          >
            <img
              className="h-12 w-12 rounded-full m-1 border border-black shadow-2xl"
              src={item.avt}
              alt="#"
            />
            <div className="px-2 font-medium">{item.userName}</div>
          </label>
        </div>
      </div>
    );
  };

  const leftValue = `calc((100vw - 450px) / 2)`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-black z-50 "
            onClick={() => closeModal()}
          />
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            style={{
              position: "fixed",
              top: "12%",
              left: leftValue,
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "1em",
              borderRadius: "10px",
              zIndex: 1000,
            }}
          >
            <div className="flex flex-col h-[710px] w-[450px] select-none">
              <div className="flex flex-col items-center">
                <div className="pl-6 bg-white w-full flex flex-row justify-between mb-2 border-b">
                  <p className="font-medium">Tạo nhóm</p>
                  <div
                    className=" flex text-xl font-medium mr-2  justify-center items-center h-7 w-7 btn-close"
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    <IoMdClose />
                  </div>
                </div>
                <div className="bg-gray-300 h-[1px]"></div>
                <div className=" h-16 w-full  flex flex-row px-5 justify-center items-center">
                  <label
                    htmlFor="avtGroup"
                    className="rounded-full h-14 w-14 flex flex-row justify-center items-center bg-slate-400 mr-2  hover:text-white"
                  >
                    {selectedFile === undefined ? (
                      <IoCameraOutline className=" text-2xl " />
                    ) : (
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        className="w-full h-full rounded-full"
                        alt="."
                      />
                    )}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="avtGroup"
                    onChange={async (e) => {
                      if (e.target.files[0]) {
                        if (e.target.files[0].size > 10 * 1024 * 1024) {
                          alert("File quá lớn, vui lòng chọn file <10MB");
                          return;
                        }
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                  />
                  <input
                    ref={nameRef}
                    type="text"
                    required
                    className="w-10/12 h-8 left-10 outline-none border-b px-2 text-sm border-gray-700 focus:border-blue-500"
                    placeholder="Nhập tên nhóm"
                    spellCheck="false"
                  ></input>
                </div>
                <input
                  className="w-11/12 h-8 border my-4 mx-5 rounded-full text-sm px-2 "
                  placeholder="Nhập tên muốn tìm..."
                />
                <div className="h-fit w-full ">
                  <div className="max-w-2xl mx-auto">
                    <ul className="flex flex-wrap -mb-px" role="tablist">
                      <li
                        className="w-1/2 justify-center items-center text-center"
                        role="presentation"
                      >
                        <button
                          className={`inline-block justify-center items-center text-center  ${
                            activeTab === "select"
                              ? "text-black border-gray-300 border-b-2"
                              : "text-gray-500"
                          } hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center ${
                            activeTab === "select" ? "" : "active"
                          }`}
                          id="profile-tab"
                          onClick={() => handleTabClick("select")}
                          type="button"
                          role="tab"
                          aria-controls="chat"
                          aria-selected={activeTab === "select"}
                        >
                          Đã chọn
                        </button>
                      </li>
                      <li
                        className="w-1/2 justify-center items-center text-center"
                        role="presentation"
                      >
                        <button
                          className={`inline-block w-1/2 justify-center items-center text-center  ${
                            activeTab === "friend"
                              ? "text-black border-gray-300 border-b-2"
                              : "text-gray-500"
                          } hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center ${
                            activeTab === "all" ? "" : "active"
                          }`}
                          id="profile-tab"
                          onClick={() => handleTabClick("friend")}
                          type="button"
                          role="tab"
                          aria-controls="chat"
                          aria-selected={activeTab === "friend"}
                        >
                          Bạn bè
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div id="myTabContent">
                    <div
                      className={`bg-gray-50 p-4 rounded-lg dark:bg-gray-800 ${
                        activeTab === "select" ? "" : "hidden"
                      }`}
                      role="tabpanel"
                      aria-labelledby="chat-tab"
                    >
                      <Virtuoso
                        initialTopMostItemIndex={0}
                        className="w-full min-h-[370px] text-black "
                        totalCount={addSender.length}
                        data={addSender}
                        itemContent={(_, item) => itemRowchat(item)}
                      ></Virtuoso>
                    </div>
                    <div
                      className={`bg-gray-50 p-4 rounded-lg dark:bg-gray-800 ${
                        activeTab === "friend" ? "" : "hidden"
                      }`}
                      role="tabpanel"
                      aria-labelledby="chat-tab"
                    >
                      <Virtuoso
                        className="w-full min-h-[370px] text-black"
                        totalCount={user.friendList.length}
                        data={user.friendList}
                        itemContent={(_, item) => itemRowchat(item.user)}
                      ></Virtuoso>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row justify-end h-10 w-full mt-10">
                  <button
                    className="btn-request btn-blur-gray rounded mr-5 text-center items-center justify-between"
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    <p className="font-semibold ">Hủy</p>
                  </button>
                  <button
                    className="btn-request btn-blur-blue rounded"
                    onClick={async () => {
                      if (addSender.length < 2) {
                        alert("Nhóm phải có ít nhất 3 người");
                        return;
                      }
                      if (nameRef.current.value === "") {
                        alert("Tên nhóm không được để trống");
                        return;
                      }
                      await createGroup();
                      closeModal();
                    }}
                  >
                    {isLoad ? (
                      <Loader />
                    ) : (
                      <p className="font-semibold text-white">Tạo nhóm</p>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
