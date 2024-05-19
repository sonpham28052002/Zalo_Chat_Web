import React from "react";
import HeaderNavChat from "./../chatbox/headerNavChat";
import { VscFeedback } from "react-icons/vsc";

import { IoIosSearch } from "react-icons/io";
import { AiOutlinePieChart } from "react-icons/ai";
import AssignTaskModel from "./AssignTaskModel";

export default function Todo(props) {
  return (
    <div className="flex flex-row h-full ">
      <div className="flex flex-col w-2/12 border-r-2 border-gray-200 bg-gray-100">
        <HeaderNavChat isSelect={false} />
        <div className="flex flex-row w-full justify-between items-center p-2 ">
          <div className="flex flex-row justify-around w-[100px] items-center">
            <p className="font-semibold cursor-pointer">To-Do</p>
            <AssignTaskModel />
          </div>
          <div className="flex flex-row justify-around w-[90px] items-center">
            <VscFeedback
              className="w-6 h-6 m-1 cursor-pointer"
              title="Gửi góp ý và yêu cầu hỗ trợ"
            />
            <IoIosSearch
              className="w-6 h-6 m-1 cursor-pointer"
              title="Tìm kiếm"
            />
            <AiOutlinePieChart
              className="w-6 h-6 m-1 cursor-pointer"
              title="Thống kê công việc"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
