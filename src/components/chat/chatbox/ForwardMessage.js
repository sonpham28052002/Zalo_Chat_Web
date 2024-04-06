import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Virtuoso } from "react-virtuoso";

export default function ForwardMessage({ setIsOpen, forwardMessage, isOpen }) {
  const [activeTab, setActiveTab] = useState("all");

  var owner = useSelector((state) => state.data);
  var [chats, setChats] = useState([]);
  var [friend, setFriend] = useState([]);
  var [allUser, setAllUser] = useState([]);

  function addToUniqueArray(arr, item) {
    if (arr.indexOf(item) === -1) {
      arr.push(item);
    }
    return arr;
  }

  useEffect(() => {
    let all = [];
    let arrchat = [];
    for (let index = 0; index < owner.conversation.length; index++) {
      let user = {
        id: undefined,
        name: undefined,
        avt: undefined,
      };
      if (owner.conversation[index].conversationType === "group") {
        user.id = owner.conversation[index].idGroup + "";
        user.name = owner.conversation[index].nameGroup + "";
        user.avt = owner.conversation[index].avtGroup + "";
        arrchat.push(user);
      } else {
        user.id = owner.conversation[index].user.id + "";
        user.name = owner.conversation[index].user.userName + "";
        user.avt = owner.conversation[index].user.avt + "";
        arrchat.push(user);
        all = [...addToUniqueArray(all, user)];
      }
    }
    setChats(arrchat);

    let arrFriend = [];
    for (let index = 0; index < owner.friendList.length; index++) {
      arrFriend.push({
        id: owner.friendList[index].user.id,
        name: owner.friendList[index].user.userName,
        avt: owner.friendList[index].user.avt,
      });
      all = [
        ...addToUniqueArray(all, {
          id: owner.friendList[index].user.id,
          name: owner.friendList[index].user.userName,
          avt: owner.friendList[index].user.avt,
        }),
      ];
    }
    setFriend(arrFriend);
    setAllUser(all);
  }, [owner.conversation, owner.friendList]);
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  var itemRowchat = (item) => {
    return (
      <div className=" shadow-md my-1 p-1">
        <div className="flex flex-row items-center text-black">
          <input type="checkbox" className="text-2xl h-4 w-4 accent-blue-500" />
          <img
            className="h-12 w-12 rounded-full m-1 border border-black shadow-2xl"
            src={item.avt}
            alt="#"
          />
          <div className="px-2 font-medium">{item.name}</div>
        </div>
      </div>
    );
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="relative  bg-slate-900/20 backdrop-blur h-full w-full p-8  inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, y: "-100vh" }}
            animate={{ scale: 1, y: "0" }}
            exit={{ scale: 0, y: "100vh" }}
            onClick={(e) => e.stopPropagation()}
            transition={{
              duration: 0.1,
              type: "spring",
              damping: 25,
              stiffness: 500,
            }}
            className="bg-gradient-to-br absolute  h-5/6 w-[600px] bg-white text-white p-3 rounded-lg max-w-lg shadow-xl cursor-default  overflow-hidden"
          >
            <div className="text-xl font-medium h-[5%] border-b p-2 text-black border-gray-500 flex flex-row justify-between items-center">
              <p>Chia sẻ</p>
              <div className="h-6 w-6 rounded-md flex flex-row justify-center items-center hover:bg-slate-400 hover:text-red-600">
                <IoMdClose
                  className=""
                  onClick={() => {
                    setIsOpen(false);
                  }}
                />
              </div>
            </div>
            <div className="h-[70%]  w-full">
              <div className="max-w-2xl mx-auto">
                <div className=" mb-4">
                  <ul className="flex flex-wrap -mb-px" role="tablist">
                    <li className="mr-2" role="presentation">
                      <button
                        className={`inline-block  ${
                          activeTab === "all"
                            ? "text-black border-gray-300 border-b-2"
                            : "text-gray-500"
                        } hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center ${
                          activeTab === "all" ? "" : "active"
                        }`}
                        id="profile-tab"
                        onClick={() => handleTabClick("all")}
                        type="button"
                        role="tab"
                        aria-controls="chat"
                        aria-selected={activeTab === "all"}
                      >
                        Tất cả
                      </button>
                    </li>
                    <li className="mr-2" role="presentation">
                      <button
                        className={`inline-block  ${
                          activeTab === "chat"
                            ? "text-black border-gray-300 border-b-2"
                            : "text-gray-500"
                        } hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center ${
                          activeTab === "chat" ? "" : "active"
                        }`}
                        id="profile-tab"
                        onClick={() => handleTabClick("chat")}
                        type="button"
                        role="tab"
                        aria-controls="chat"
                        aria-selected={activeTab === "chat"}
                      >
                        Trò chuyện
                      </button>
                    </li>
                    <li className="mr-2" role="presentation">
                      <button
                        className={`inline-block hover:text-gray-600 ${
                          activeTab === "friend"
                            ? "text-black border-gray-300   border-b-2 "
                            : "text-gray-500"
                        } hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center dark:text-gray-400 dark:hover:text-gray-300 ${
                          activeTab === "friend" ? "" : "active"
                        }`}
                        id="friend-tab"
                        onClick={() => handleTabClick("friend")}
                        type="button"
                        role="tab"
                        aria-controls="friend"
                        aria-selected={activeTab === "friend"}
                      >
                        Bạn bè
                      </button>
                    </li>
                    {/* Add similar buttons for other tabs */}
                  </ul>
                </div>
                <div id="myTabContent">
                  <div
                    className={`bg-gray-50 p-4 rounded-lg dark:bg-gray-800 ${
                      activeTab === "all" ? "" : "hidden"
                    }`}
                    role="tabpanel"
                    aria-labelledby="chat-tab"
                  >
                    <Virtuoso
                      className="w-full min-h-[425px] text-black"
                      totalCount={100}
                      data={allUser}
                      itemContent={(_, item) => itemRowchat(item)}
                    ></Virtuoso>
                  </div>
                  <div
                    className={`bg-gray-50 p-4 rounded-lg dark:bg-gray-800 ${
                      activeTab === "chat" ? "" : "hidden"
                    }`}
                    role="tabpanel"
                    aria-labelledby="chat-tab"
                  >
                    <Virtuoso
                      className="w-full min-h-[425px] text-black"
                      totalCount={100}
                      data={chats}
                      itemContent={(_, item) => itemRowchat(item)}
                    ></Virtuoso>
                  </div>
                  <div
                    className={`bg-gray-50 p-4 rounded-lg dark:bg-gray-800 ${
                      activeTab === "friend" ? "" : "hidden"
                    }`}
                    role="tabpanel"
                    aria-labelledby="friend-tab"
                  >
                    <Virtuoso
                      className="w-full min-h-[425px] text-black"
                      totalCount={chats.length}
                      data={friend}
                      itemContent={(_, item) => itemRowchat(item)}
                    ></Virtuoso>
                  </div>
                  {/* Add similar divs for other tab contents */}
                </div>
              </div>
            </div>
            <div className="h-[17%] w-full border-t p-2 border-gray-500 text-black">
              <p>Nội dung chia sẻ:</p>
              <div className=" w-full">a</div>
            </div>
            <div className="h-[8%] w-full border-t p-2 border-gray-500 flex flex-row justify-center items-center">
              <button
                className="bg-[#dfe2e7] hover:bg-[#d2d9e9] h-10 w-32 rounded-lg mx-5 font-medium hover:text-white"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Huỷ
              </button>
              <button
                className="bg-[#004bb9] hover:bg-[#d2d9e9] h-10 w-32 rounded-lg mx-5 font-medium text-white"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Chia sẻ
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
