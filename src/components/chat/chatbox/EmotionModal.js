import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
export default function EmotionModal({ isOpen, setIsOpen }) {
    useEffect(() => { }, []);
    const leftValue = `calc((100vw - 450px) / 2)`;
    let mapEmotion = new Map([
        ["LIKE", "👍"],
        ["HAPPY", "😄"],
        ["HEART", "❤️"],
        ["SAD", "😥"],//sad or crying?
        ["ANGRY", "😡"]
    ]);

    var listEmotion = [
        { user: { id: "1", name: "name 1" }, react: "SAD" },
        { user: { id: "1", name: "name 1" }, react: "LIKE" },
        { user: { id: "2", name: "name 2" }, react: "SAD" },
        { user: { id: "2", name: "name 2" }, react: "ANGRY" }
    ];

    function getUserNameById(id) {
        for (let i = 0; i < listEmotion.length; i++)
            if (listEmotion[i].user.id === id)
                return listEmotion[i].user.name;
    }

    function EmotionViewCol1() {
        var emotionCounts = new Map();
        // Map có key là emotion, value là số lần xuất hiện
        listEmotion.forEach(item => {
            var react = item.react;
            var count = emotionCounts.get(react) || 0;
            emotionCounts.set(react, count + 1);
        });
        console.log(emotionCounts);
        return (
            <div className="flex flex-col w-full bg-slate-100 p-3 h-full">
                Tất cả ({listEmotion.length})
                {Array.from(emotionCounts).map(([emotion, count]) => {
                    return (
                        <div className="flex flex-row justify-between w-full " key={emotion}>
                            <div className="w-8 h-8">{mapEmotion.get(emotion.toUpperCase())}</div>
                            <div>{count}</div>
                        </div>)
                })}
            </div>
        );
    }

    function EmotionViewCol2() {
        // key là id user, value là một mảng chứa các giá trị react
        var userEmotionMap = new Map();
        listEmotion.forEach(item => {
            var user = item.user;
            var react = item.react;
            var userEmotions = userEmotionMap.get(user.id) || [];
            userEmotions.push(react);
            userEmotionMap.set(user.id, userEmotions);
        });
        return (
            <div className="flex flex-col w-full p-3 h-ful">
                {Array.from(userEmotionMap).map(([id, emotion]) => {
                    return (
                        <div className="flex flex-row justify-between w-full items-center" key={id}>
                            <div className="flex flex-row items-center m-1 w-2/3">
                                <img
                                    className="rounded-full bg-cover bg-center mr-4 w-10 h-10"
                                    src='https://loremflickr.com/1234/2345/abstract'
                                    alt="."
                                ></img>
                                {getUserNameById(id)}
                            </div>
                            <div className="flex flex-row justify-end w-1/3">
                                {emotion.map((react) => {
                                    return <div className="w-5 h-5">{mapEmotion.get(react.toUpperCase())}</div>
                                })}
                            </div>
                        </div>)
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
