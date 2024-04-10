import React from "react";
import { HiOutlineUserAdd } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import CreateGroupModal from './CreateGroupModal';
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useState } from "react";

export default function HeaderNavChat({ showSearch }) {
  const [isOpenCreateGroupModal, setIsOpenCreateGroupModal] = useState(false);
  return (
    <div className="h-20 flex flex-col justify-between border-b  p-3">
      <div className="flex flex-row justify-evenly items-center">
        <div className="w-5/6 relative">
          <input
            type="text"
            placeholder="Tìm kiếm"
            maxLength={0}
            readOnly
            className=" w-full  h-8 border p-1 text-xs rounded pl-7 bg-[#eaedf0] focus:outline-none"
            onClick={() => {
              showSearch();
              console.log("con");
            }}
          />
          <IoIosSearch className="absolute top-1.5 left-1 text-xl text-slate-400" />
        </div>
        <div className="flex flex-row justify-evenly items-center ">
          <div className=" h-7 w-7 mx-1 px-1 hover:bg-[#eaedf0] rounded">
            <HiOutlineUserAdd className="text-xl " />
          </div>
          <div className=" h-7 w-7 px-1 hover:bg-[#eaedf0] rounded">
            <AiOutlineUsergroupAdd className="text-xl" title="Tạo nhóm" onClick={() => setIsOpenCreateGroupModal(true)} />
          </div>
        </div>
      </div>
      <div className="bg-red-400 flex flex-row justify-between items-end">
      </div>
      <CreateGroupModal
        key={"CreateGroupModal"}
        isOpen={isOpenCreateGroupModal}
        setIsOpen={setIsOpenCreateGroupModal}
      />
    </div>
  );
}
