import React, { useState } from "react";
// import { IoMdClose } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";
import { useSelector } from "react-redux";
import { stompClient } from "../../../socket/socket";
export default function NavIconInteract({ icon, setMessage, message, check }) {
  var [iconText, setIconText] = useState(icon);
  var owner = useSelector((state) => state.data);

  function sendREACT(react) {
    let text = { ...message };
    let textReact = {
      user: { id: owner.id },
      react: react,
    };
    text.react = [...text.react, textReact];
    stompClient.send("/app/react-message", {}, JSON.stringify(text));
    setIconText(react);
  }

  function getReact(react) {
    let mapEmotion = new Map([
      ["LIKE", "👍"],
      ["HAPPY", "😄"],
      ["HEART", "❤️"],
      ["SAD", "😥"],
      ["ANGRY", "😡"],
    ]);
    return mapEmotion.get(react);
  }
  return (
    <div
      className={`h-[25px] w-[25px] rounded-full bg-white select-none shadow-3xl -mt-5`}
    >
      <nav className="relative group h-full w-full rounded-full flex flex-row justify-center items-center">
        <div className="flex flex-col justify-center p-[1px] h-full w-full items-center rounded-full shadow-3xl">
          {getReact(iconText) || <AiOutlineLike />}
        </div>
        <div
          className={`absolute z-50 -top-[47px] p-2 ${
            check ? "right-2 flex-row-reverse" : "-left-10"
          } hidden group-hover:block bg-white p-1 rounded-lg shadow-md`}
        >
          <div
            className={`flex flex-row  justify-around items-center select-none ${
              check ? "flex-row-reverse" : ""
            }`}
          >
            {/* <IoMdClose
              className="p-1 rounded-md hover:bg-red-200 hover:text-white  text-3xl "
              role="img"
              aria-label="Biểu cảm"
              onClick={(e) => {
                sendREACT("");
              }}
            /> */}
            <span
              className="p-1 rounded-md hover:bg-slate-100 hover:text-xl hover:p-0"
              role="img"
              aria-label="Biểu cảm"
              onClick={(e) => {
                sendREACT("LIKE");
              }}
            >
              👍
            </span>
            <span
              className="p-1 rounded-md hover:bg-slate-100 hover:text-xl hover:p-0"
              role="img"
              aria-label="Biểu cảm"
              onClick={(e) => {
                sendREACT("HAPPY");
              }}
            >
              😄
            </span>
            <span
              className="p-1 rounded-md hover:bg-slate-100 hover:text-xl  hover:p-0"
              role="img"
              aria-label="Biểu cảm"
              onClick={(e) => {
                sendREACT("HEART");
              }}
            >
              ❤️
            </span>
            <span
              className="p-1 rounded-md hover:bg-slate-100 hover:text-xl hover:p-0"
              role="img"
              aria-label="Biểu cảm"
              onClick={(e) => {
                sendREACT("SAD");
              }}
            >
              😥
            </span>
            <span
              className="p-1 rounded-md hover:bg-slate-100 hover:text-xl hover:p-0"
              role="img"
              aria-label="Biểu cảm"
              onClick={(e) => {
                sendREACT("ANGRY");
              }}
            >
              😡
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}
