import { motion, AnimatePresence } from "framer-motion";
import { IoLogoHtml5, IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Virtuoso } from "react-virtuoso";
import Loader from "../custom/loader";
import { FaFileCode, FaFileCsv, FaFileExcel, FaFileWord } from "react-icons/fa";
import { BiSolidFilePdf, BiSolidFileTxt } from "react-icons/bi";
import { AiFillFilePpt, AiFillFileZip } from "react-icons/ai";
import { LuFileJson } from "react-icons/lu";
import { stompClient } from "../../../socket/socket";
export default function ForwardMessage({
  setIsOpen,
  forwardMessage,
  isOpen,
  friend,
  allMember,
  chats,
}) {
  const [activeTab, setActiveTab] = useState("select");
  const [addSender, setAddSend] = useState([]);
  const [text, setText] = useState(forwardMessage?.content);

  var owner = useSelector((state) => state.data);

  var [isLoaded, setIsLoaded] = useState(false);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    setIsLoaded(false);
    setIsLoaded(true);
  }, []);

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

  function isItemExistInArray(item) {
    return addSender.some((element) => element.id === item.id);
  }
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
  function renderMessage(message) {
    switch (message.messageType) {
      case "Text":
        return (
          <div>
            <input
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              className="h-20 border w-full p-2"
            />
          </div>
        );
      case "STICKER":
        return <img alt="." className="h-20" src={message.url}></img>;
      case "PNG":
      case "JPEG":
      case "JPG":
      case "GIF":
        return <img alt="." className="h-20" src={message.url}></img>;
      case "RETRIEVE":
        return <></>;
      case "VIDEO":
        return (
          <video className="overflow-hidden rounded-md  h-20 w-40 " controls>
            <source src={message.url} type="video/mp4" />
          </video>
        );
      case "AUDIO":
        return (
          <audio controls>
            <source src={message.url} type="audio/mpeg" />
            <source src={message.url} type="audio/3gp" />
          </audio>
        );
      case "DOCX":
      case "DOC":
        return (
          <div className="flex flex-row justify-start shadow-md mt-1 p-2 border">
            <FaFileWord className="text-6xl  text-[#378ece]" />
            <div className="flex flex-col justify-evenly">
              <p>{message.titleFile}</p>
              <p>{formatFileSize(message.size)}</p>
            </div>
          </div>
        );
      case "PDF":
        return (
          <div className="flex flex-row justify-start shadow-md mt-1 p-2 border">
            <BiSolidFilePdf className="text-6xl  text-[#ff6350]" />
            <div className="flex flex-col justify-evenly">
              <p>{message.titleFile}</p>
              <p>{formatFileSize(message.size)}</p>
            </div>
          </div>
        );
      case "PPT":
      case "PPTX":
        return (
          <div className="flex flex-row justify-start shadow-md mt-1 p-2 border">
            <AiFillFilePpt className="text-6xl  text-[#ff7e5c]" />
            <div className="flex flex-col justify-evenly">
              <p>{message.titleFile}</p>
              <p>{formatFileSize(message.size)}</p>
            </div>
          </div>
        );
      case "TXT":
        return (
          <div className="flex flex-row justify-start shadow-md mt-1 p-2 border">
            <BiSolidFileTxt className="text-6xl  text-[#02c1f3]" />
            <div className="flex flex-col justify-evenly">
              <p>{message.titleFile}</p>
              <p>{formatFileSize(message.size)}</p>
            </div>
          </div>
        );
      case "RAR":
      case "ZIP":
        return (
          <div className="flex flex-row justify-start shadow-md mt-1 p-2 border">
            <AiFillFileZip className="text-6xl  text-[#cf81c8]" />
            <div className="flex flex-col justify-evenly">
              <p>{message.titleFile}</p>
              <p>{formatFileSize(message.size)}</p>
            </div>
          </div>
        );
      case "JSON":
        return (
          <div className="flex flex-row justify-start shadow-md mt-1 p-2 border">
            <LuFileJson className="text-6xl  text-[#bcd049]" />
            <div className="flex flex-col justify-evenly">
              <p>{message.titleFile}</p>
              <p>{formatFileSize(message.size)}</p>
            </div>
          </div>
        );
      case "CSV":
        return (
          <div className="flex flex-row justify-start shadow-md mt-1 p-2 border">
            <FaFileCsv className="text-6xl  text-[#02c1f3]" />
            <div className="flex flex-col justify-evenly">
              <p>{message.titleFile}</p>
              <p>{formatFileSize(message.size)}</p>
            </div>
          </div>
        );
      case "HTML":
        return (
          <div className="flex flex-row justify-start shadow-md mt-1 p-2 border">
            <IoLogoHtml5 className="text-6xl  text-[#d1ef29]" />
            <div className="flex flex-col justify-evenly">
              <p>{message.titleFile}</p>
              <p>{formatFileSize(message.size)}</p>
            </div>
          </div>
        );
      case "XLS":
      case "XLSX":
        return (
          <div className="flex flex-row justify-start shadow-md mt-1 p-2 border">
            <FaFileExcel className="text-6xl  text-[#40ad65]" />
            <div className="flex flex-col justify-evenly">
              <p>{message.titleFile}</p>
              <p>{formatFileSize(message.size)}</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-row justify-start shadow-md mt-1 p-2 border">
            <FaFileCode className="text-6xl  text-[rgb(33,125,148)]" />
            <div className="flex flex-col justify-evenly">
              <p>{message.titleFile}</p>
              <p>{formatFileSize(message.size)}</p>
            </div>
          </div>
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
            <div className="px-2 font-medium">{item.name}</div>
          </label>
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
                      activeTab === "select" ? "" : "hidden"
                    }`}
                    role="tabpanel"
                    aria-labelledby="chat-tab"
                  >
                    <Virtuoso
                      initialTopMostItemIndex={0}
                      className="w-full min-h-[425px] text-black "
                      totalCount={addSender.length}
                      data={addSender}
                      itemContent={(_, item) => itemRowchat(item)}
                    ></Virtuoso>
                  </div>
                  <div
                    className={`bg-gray-50 p-4 rounded-lg dark:bg-gray-800 ${
                      activeTab === "all" ? "" : "hidden"
                    }`}
                    role="tabpanel"
                    aria-labelledby="chat-tab"
                  >
                    <Virtuoso
                      initialTopMostItemIndex={0}
                      className="w-full min-h-[425px] text-black "
                      totalCount={allMember.length}
                      data={allMember}
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
              <div className=" w-full">{renderMessage(forwardMessage)}</div>
            </div>
            <div className="h-[8%] w-full border-t p-2 border-gray-500 flex flex-row justify-center items-center">
              <button
                className={` h-10 w-32 rounded-lg mx-5 font-medium bg-[#d2d9e9] hover:bg-[#004bb9]`}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Huỷ
              </button>
              <button
                disabled={addSender.length === 0}
                className={` ${
                  addSender.length === 0 ? "bg-[#d2d9e9]" : "bg-[#004bb9]"
                } hover:bg-[#6581c4] h-10 w-32 rounded-lg mx-5 font-medium text-white`}
                onClick={() => {
                  setIsLoaded(false);
                  let arrMess = [];
                  for (let i = 0; i < addSender.length; i++) {
                    let mess = { ...forwardMessage };
                    if (forwardMessage?.content) {
                      mess.content = text;
                    }
                    mess.receiver = { id: addSender[i].id };
                    mess.sender = { id: owner.id };
                    arrMess.push(mess);
                  }
                  stompClient.send(
                    "/app/forward-message",
                    {},
                    JSON.stringify(arrMess)
                  );
                  setIsLoaded(true);
                  setIsOpen(false);
                }}
              >
                {isLoaded ? "Chia sẻ" : <Loader />}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
