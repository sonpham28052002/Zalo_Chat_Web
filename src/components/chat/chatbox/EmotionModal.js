import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function EmotionModal({
  isOpen,
  setIsOpen,
  messageSelect,
  conversation,
}) {
  var owner = useSelector((state) => state.data);
  var [listReact, setListReact] = useState(messageSelect.react);
  useEffect(() => {}, []);
  const leftValue = `calc((100vw - 450px) / 2)`;
  let mapEmotion = new Map([
    ["LIKE", "👍"],
    ["HAPPY", "😄"],
    ["HEART", "❤️"],
    ["SAD", "😥"],
    ["ANGRY", "😡"],
  ]);

  function getUserNameById(id) {
    if (conversation.conversationType === "single") {
      if (owner.id === id) {
        return owner.userName;
      } else {
        return conversation.user.userName;
      }
    } 
    if (conversation.conversationType === "group") {
      console.log(
        conversation.members.filter((item) => item.member.id === id)[0]
      );
      return conversation.members.filter((item) => item.member.id === id)[0]
        .member?.userName;
    }
  }

  function getAVTById(id) {
    if (conversation.conversationType === "single") {
      if (owner.id === id) {
        return owner.avt;
      } else {
        return conversation.user.avt;
      }
    }
    if (conversation.conversationType === "group") {
      console.log(
        conversation.members.filter((item) => item.member.id === id)[0]
      );
      return conversation.members.filter((item) => item.member.id === id)[0]
        .member?.avt;
    }
  }

  function handleSelectEmotion(emotion) {
    var filterReact = messageSelect.react.filter((item) => item.react === emotion);
    setListReact(filterReact);
  }

  function EmotionViewCol1() {
    var emotionCounts = new Map();
    // Map có key là emotion, value là số lần xuất hiện
    messageSelect?.react.forEach((item) => {
      var react = item.react;
      var count = emotionCounts.get(react) || 0;
      emotionCounts.set(react, count + 1);
    });
    return (
      <div className="flex flex-col w-full bg-[#eaedf0] p-3 h-full">
        <div className="w-full h-8 cursor-pointer btn-blur-gray"
          onClick={() => {setListReact(messageSelect?.react)}}        
        >Tất cả ({messageSelect?.react.length})</div>        
        {Array.from(emotionCounts).map(([emotion, count]) => {
          return (
            <div
              className="flex flex-row justify-between w-full cursor-pointer btn-blur-gray"
              key={emotion}
              onClick={() => {handleSelectEmotion(emotion)}}

            >
              <div className="w-8 h-8">
                {mapEmotion.get(emotion.toUpperCase())}
              </div>
              <div>{count}</div>
            </div>
          );
        })}
      </div>
    );
  }

  function EmotionViewCol2() {
    function getUserEmotions(listEmotion) {
      let userEmotionMap = new Map();
      listEmotion.forEach((item) => {
        let userId = item.user.id;
        let react = item.react;
        if (!userEmotionMap.has(userId)) {
          userEmotionMap.set(userId, { user: { id: userId }, reacts: [] });        }

        if (!userEmotionMap.get(userId).reacts.includes(react)) {
          userEmotionMap.get(userId).reacts.push(react);
        }
      });
      return Array.from(userEmotionMap.values());
    }
    return (
      <div className="flex flex-col w-full p-3 h-ful">
        {Array.from(getUserEmotions(listReact)).map((item) => {
          return (
            <div
              className="flex flex-row justify-between w-full items-center"
              key={item.user.id}
            >
              <div className="flex flex-row items-center m-1 w-2/3">
                <img
                  className="rounded-full bg-cover bg-center mr-4 w-10 h-10"
                  src={getAVTById(item.user.id)}
                  alt="."
                ></img>
                <p className="max-w-36 whitespace-nowrap overflow-hidden text-ellipsis">
                  {getUserNameById(item.user.id)}
                </p>
              </div>
              <div className="flex flex-row justify-end w-1/3">
                {item.reacts.map((react, index) => {
                  return (
                    <p className="text-sm" key={index}>
                      {mapEmotion.get(react.toUpperCase())}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-black z-50 "
            onClick={() => {
              setIsOpen(false);
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            style={{
              position: "fixed",
              top: "25%",
              left: leftValue,
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "1em",
              borderRadius: "10px",
              zIndex: 1000,
            }}
          >
            <div className="flex flex-col h-[350px] w-[450px] select-none">
              <div className="flex flex-col items-center h-full">
                <div className="pl-6 bg-white w-full flex flex-row justify-between mb-2 border-b">
                  <p className="font-medium">Biểu cảm</p>
                  <div
                    className=" flex text-xl font-medium mr-2  justify-center items-center h-7 w-7 btn-close"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <IoMdClose />
                  </div>
                </div>
                <div className="bg-gray-300 h-[1px]"></div>

                <div className="w-full h-full flex flex-row">
                  <div className="flex flex-col w-1/3 justify-between items-start bg-slate-100">
                    <EmotionViewCol1></EmotionViewCol1>
                  </div>
                  <div className="flex flex-row w-2/3">
                    <EmotionViewCol2></EmotionViewCol2>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
