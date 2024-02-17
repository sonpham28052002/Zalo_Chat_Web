import React from "react";
import { HiOutlineUserAdd } from "react-icons/hi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
// import { motion } from "framer-motion";
export default function ChatRom() {
  return (
    <div className="w-full h-full flex flex-row">
      <div className="h-full w-2/12 p-3">
        <div className="h-16 bg-slate-500 flex flex-col justify-between">
          <div className="flex flex-row justify-evenly items-center">
            <div className="w-5/6 relative">
              <input
                type="text"
                placeholder="Tìm kiếm"
                disabled
                className=" w-full  h-7 border p-1 text-xs rounded pl-7 bg-[#eaedf0] focus:outline-none"
                onClick={() => {
                  console.log("con");
                }}
              />
              <IoIosSearch className="absolute top-1 left-1 text-xl text-slate-400" />
            </div>
            <div className="flex flex-row justify-evenly items-center ">
              <button className=" h-7 w-7 mx-1 px-1 hover:bg-[#eaedf0] rounded">
                <HiOutlineUserAdd className="text-xl " />
              </button>
              <button className=" h-7 w-7 px-1 hover:bg-[#eaedf0] rounded">
                <AiOutlineUsergroupAdd className="text-xl " />
              </button>
            </div>
          </div>
          <div className="bg-red-400 flex flex-row justify-between items-end">
            <div>a</div>
            <div>b</div>
          </div>
        </div>
      </div>
      <div className="bg-yellow-400 h-full w-10/12"></div>
    </div>
  );
}
