import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";

export default function NavIconInteract({
  icon,
  setMessage,
  message,
}) {
  var [iconText, setIconText] = useState(icon);
  return (
    <div
      className={`h-[25px] w-[25px] rounded-full bg-white select-none shadow-3xl -mt-5`}
    >
      <nav className="relative group h-full w-full rounded-full flex flex-row justify-center items-center">
        <div className="flex flex-col justify-center p-[1px] h-full w-full items-center rounded-full shadow-3xl">
          {iconText || <AiOutlineLike />}
        </div>
        <div
          className={`absolute -top-[48px] -left-44 hidden group-hover:block bg-white p-2 rounded-lg shadow-md`}
        >
          <div className="flex flex-row justify-around items-center select-none	">
            <span
              className="p-1 rounded-md hover:bg-slate-100 hover:text-xl hover:p-0"
              role="img"
              aria-label="Biểu cảm"
              onClick={(e) => {
                let text = { ...message };
                text.interact = "👍";
                setMessage(text);
                setIconText(text.interact);
              }}
            >
              👍
            </span>
            <span
              className="p-1 rounded-md hover:bg-slate-100 hover:text-xl hover:text-xl hover:p-0"
              role="img"
              aria-label="Biểu cảm"
              onClick={(e) => {
                let text = { ...message };
                text.interact = "😄";
                setMessage(text);
                setIconText(text.interact);
              }}
            >
              😄
            </span>
            <span
              className="p-1 rounded-md hover:bg-slate-100 hover:text-xl hover:text-xl hover:p-0"
              role="img"
              aria-label="Biểu cảm"
              onClick={(e) => {
                let text = { ...message };
                text.interact = "❤️";
                setMessage(text);
                setIconText(text.interact);
              }}
            >
              ❤️
            </span>
            <span
              className="p-1 rounded-md hover:bg-slate-100 hover:text-xl hover:text-xl hover:p-0"
              role="img"
              aria-label="Biểu cảm"
              onClick={(e) => {
                let text = { ...message };
                text.interact = "😥";
                setMessage(text);
                setIconText(text.interact);
              }}
            >
              😥
            </span>
            <span
              className="p-1 rounded-md hover:bg-slate-100 hover:text-xl hover:text-xl hover:p-0"
              role="img"
              aria-label="Biểu cảm"
              onClick={(e) => {
                let text = { ...message };
                text.interact = "😡";
                setMessage(text);
                setIconText(text.interact);
              }}
            >
              😡
            </span>
            <IoMdClose
              className="p-1 rounded-md hover:bg-red-200 hover:text-white  text-3xl "
              role="img"
              aria-label="Biểu cảm"
              onClick={(e) => {
                let text = { ...message };
                text.interact = "";
                setMessage(text);
                setIconText("");
              }}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
