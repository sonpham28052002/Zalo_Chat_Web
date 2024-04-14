import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Virtuoso } from "react-virtuoso";
import { stompClient } from "../../../socket/socket";
import Loader from "../custom/loader";
export default function AddMemberModal({ conversation, isOpen, setIsOpen }) {
  var owner = useSelector((state) => state.data);
  const leftValue = `calc((100vw - 450px) / 2)`;

  const [activeTab, setActiveTab] = useState("selected");
  var [listFriend, setListFriend] = useState([]);
  var [listSelect, setListSelect] = useState([]);

  const [isLoad, setIsLoad] = useState(false);

  function closeModal() {
    setIsOpen(false);
    setListFriend([]);
    setListSelect([]);
  }

  function isItemExistInArray(item) {
    return listSelect.some((element) => element.user.id === item.user.id);
  }

  function checAddMemberNotExist(user) {
    var members = conversation.members.slice();
    for (let index = 0; index < members.length; index++) {
      const element = members[index];
      if (element.member.id === user.user.id) {
        if (element.memberType === "LEFT_MEMBER") {
          console.log("true");
          return true;
        } else {
          console.log("false");
          return false;
        }
      }
    }
    return true;
  }

  var handleAddMember = async () => {
    let arr = [];
    // eslint-disable-next-line
    listSelect.slice().map((item) => {
      let member = {
        member: { id: item.user.id },
      };
      arr.push(member);
    });
    let con = {
      idGroup: conversation.idGroup,
      ownerID: owner.id,
      members: arr,
    };
  };

  useEffect(() => {
    var arr = [];
    owner.friendList.map((item) => {
      if (checAddMemberNotExist(item)) {
        arr.push(item);
      }
    });
    setListFriend([...arr]);
  }, [owner.friendLis]);

  function addToUniqueArray(newItem, actionType) {
    if (actionType === "add") {
      const exists = listSelect.some(
        (item) => item.user.id === newItem.user.id
      );
      if (!exists) {
        setListSelect([...listSelect, newItem]);
      }
    } else if (actionType === "remove") {
      setListSelect(
        listSelect.filter((item) => item.user.id !== newItem.user.id)
      );
    }
  }

  var itemRowchat = (item) => {
    return (
      <div className=" shadow-md my-1 p-1">
        <div className="flex flex-row items-center text-black">
          <input
            type="checkbox"
            checked={isItemExistInArray(item)}
            className="text-2xl h-4 w-4 accent-blue-500"
            id={item.user.id}
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
            htmlFor={item.user.id}
          >
            <img
              className="h-12 w-12 rounded-full m-1 border border-black shadow-2xl"
              src={item.user.avt}
              alt="#"
            />
            <div className="px-2 font-medium">{item.user.userName}</div>
          </label>
        </div>
      </div>
    );
  };

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
                  <p className="font-medium">Thêm phó nhóm</p>
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
                          className={`inline-block justify-center items-center text-center text-black border-gray-300 
                                   hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium
                                   ${
                                     activeTab === "selected"
                                       ? "text-black border-gray-300 border-b-2"
                                       : "text-gray-500"
                                   } `}
                          onClick={() => {
                            setActiveTab("selected");
                          }}
                          id="profile-tab"
                          type="button"
                          role="tab"
                          aria-controls="chat"
                          aria-selected={activeTab === "selected"}
                        >
                          Đã chọn
                        </button>
                      </li>
                      <li
                        className="w-1/2 justify-center items-center text-center"
                        role="presentation"
                      >
                        <button
                          className={`inline-block justify-center items-center text-center text-black border-gray-300 
                                   hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium  ${
                                     activeTab === "friend"
                                       ? "text-black border-gray-300 border-b-2"
                                       : "text-gray-500"
                                   } `}
                          id="profile-tab"
                          onClick={() => {
                            setActiveTab("friend");
                          }}
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
                        activeTab === "selected" ? "" : "hidden"
                      }`}
                      role="tabpanel"
                      aria-labelledby="chat-tab"
                    >
                      <Virtuoso
                        initialTopMostItemIndex={0}
                        className="w-full min-h-[370px] text-black "
                        totalCount={listSelect.length}
                        data={listSelect}
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
                        initialTopMostItemIndex={0}
                        className="w-full min-h-[370px] text-black "
                        totalCount={listFriend.length}
                        data={listFriend}
                        itemContent={(_, item) => itemRowchat(item)}
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
                    disabled={listSelect.length === 0}
                    className={`btn-request rounded  ${
                      listSelect.length === 0 ? "bg-gray-300" : "btn-blur-blue"
                    }`}
                    onClick={async () => {
                      await handleAddMember();
                      closeModal();
                    }}
                  >
                    {isLoad ? (
                      <Loader />
                    ) : (
                      <p className="font-semibold text-white">Lưu</p>
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
