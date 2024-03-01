import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";

export default function NavIconInteract({ icon, setMessage, message }) {
  var [iconText, setIconText] = useState(icon);
  return (
    <div className="absolute border h-[25px] w-[25px] rounded-full right-2 -bottom-2 flex flex-row justify-center items-center bg-white select-none shadow-3xl ">
      <nav className="">
        <div className="relative group">
          <span className="text-[16px]" role="img" aria-label="Biểu cảm">
            {iconText || <AiOutlineLike />}
          </span>
          <div className="absolute -top-10 -left-40 hidden group-hover:block bg-white p-2 rounded-lg shadow-md">
            <div className="flex flex-row justify-around items-center select-none	">
              <span
                className="p-1 rounded-md hover:bg-slate-100 hover:text-xl"
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
                className="p-1 rounded-md hover:bg-slate-100 hover:text-xl"
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
                className="p-1 rounded-md hover:bg-slate-100 hover:text-xl"
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
                className="p-1 rounded-md hover:bg-slate-100 hover:text-xl"
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
                className="p-1 rounded-md hover:bg-slate-100 hover:text-xl"
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
        </div>
      </nav>
    </div>
  );
}
