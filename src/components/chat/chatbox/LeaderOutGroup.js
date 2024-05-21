import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { stompClient } from "../../../socket/socket";
import Loader from "../custom/loader";
import { useSubscription } from "react-stomp-hooks";

export default function LeaderOutGroup({ isOpen, setIsOpen, conversation }) {
  var owner = useSelector((state) => state.data);
  const [activeTab, setActiveTab] = useState("phonhom");
  const leftValue = `calc((100vw - 450px) / 2)`;
  var [userSelect, setUserSelect] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  function closeModal() {
    setIsOpen(false);
    setIsLoad(false);
    setUserSelect("");
  }
  var itemRowchat = (item, index) => {
    return (
      <div className=" shadow-md my-1 p-1" key={index}>
        <div className="flex flex-row items-center text-black">
          <input
            type="radio"
            name="deputy"
            checked={userSelect === item.member.id}
            className="text-2xl h-4 w-4 accent-blue-500"
            id={item.member.id}
            onChange={(e) => {
              console.log(item.member.id);
              setUserSelect(item.member.id);
            }}
          />
          <label
            className="flex flex-row items-center  w-full ml-2"
            htmlFor={item.member.id}
          >
            <img
              className="h-12 w-12 rounded-full m-1 border border-black shadow-2xl"
              src={item.member.avt}
              alt="#"
            />
            <div className="px-2 font-medium">{item.member.userName}</div>
          </label>
        </div>
      </div>
    );
  };
  var sendLeaveOutGroup = async () => {
    setIsLoad(true);
    const mess = {
      userId: owner.id,
      leaderNew: userSelect,
      idGroup: conversation.idGroup,
    };
    stompClient.send("/app/leaderOutGroup", {}, JSON.stringify(mess));
  };
  useSubscription("/user/" + owner.id + "/outGroup", (message) => {
    closeModal();
    setIsLoad(false);
  });
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
                  <p className="font-medium">
                    Rời nhóm và nhường quyền trưởng nhóm
                  </p>
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
                             activeTab === "phonhom"
                               ? "text-black border-gray-300 border-b-2"
                               : "text-gray-500"
                           } `}
                          onClick={() => {
                            setActiveTab("phonhom");
                          }}
                          id="profile-tab"
                          type="button"
                          role="tab"
                          aria-controls="chat"
                          aria-selected={activeTab === "phonhom"}
                        >
                          Phó nhóm
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div id="myTabContent">
                    <div
                      className={`bg-gray-50 p-4 rounded-lg dark:bg-gray-800 ${
                        activeTab === "phonhom" ? "" : "hidden"
                      }`}
                      role="tabpanel"
                      aria-labelledby="chat-tab"
                    >
                      {
                        // eslint-disable-next-line
                        conversation.members.slice().map((item, index) => {
                          if (item.memberType === "DEPUTY_LEADER") {
                            return itemRowchat(item, index);
                          }
                        })
                      }
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
                    className={`btn-request rounded  bg-gray-300`}
                    onClick={async () => {
                      await sendLeaveOutGroup();
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
