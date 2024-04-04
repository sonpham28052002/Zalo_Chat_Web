import React from "react";
import { IoIosShareAlt } from "react-icons/io";
import { BiMessageRoundedX } from "react-icons/bi";
import { SlReload } from "react-icons/sl";
import { useSelector } from "react-redux";

export default function HandleMessage({ message, refMessage, setIsRetrieve }) {
  var owner = useSelector((state) => state.data);

  function handleDeleteMessage() {
    // refMessage.current.style.display = "none";
    refMessage.current.innerHTML = "";
    refMessage.current.style.height = "0px";
    refMessage.current.style.minHeight = '0px'

    // gửi lên server đồng bộ
  }
  function handleRetrieveMessage() {
    setIsRetrieve(true);
    // gửi lên server đồng bộ
  }
  function handleShareMessage(message) {
    refMessage.current.style.display = "none";
    // gửi lên server đồng bộ
  }
  return (
    <div className="flex flex-row mx-5 text-gray-400">
      <div className="relative flex flex-col items-center group hover:text-white mx-[2px] hover:bg-slate-400 rounded-sm p-[2px]">
        <IoIosShareAlt />
        <div className="absolute bottom-0 w-60 flex-col items-center hidden mb-6 group-hover:flex">
          <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">
            chuyển tiếp
          </span>
          <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600"></div>
        </div>
      </div>
      {owner.id === message.sender.id && (
        <div
          className="relative flex flex-col items-center group hover:text-white mx-[2px] hover:bg-slate-400 rounded-sm p-[2px]"
          onClick={() => {
            handleRetrieveMessage();
          }}
        >
          <SlReload />
          <div className="absolute bottom-0 w-60 flex-col items-center hidden mb-6 group-hover:flex">
            <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">
              thu hồi tin nhắn
            </span>
            <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600"></div>
          </div>
        </div>
      )}
      <div
        className="relative flex flex-col items-center group hover:text-white mx-[2px] hover:bg-slate-400 rounded-sm p-[2px]"
        onClick={() => {
          handleDeleteMessage();
        }}
      >
        <BiMessageRoundedX />
        <div className="absolute bottom-0 w-60 flex-col items-center hidden mb-6 group-hover:flex">
          <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">
            Xoá tin nhắn ở phía bạn
          </span>
          <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600"></div>
        </div>
      </div>
    </div>
  );
}
