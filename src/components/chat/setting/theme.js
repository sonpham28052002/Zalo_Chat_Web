import React, { useState } from "react";
import Toggle from "../custom/toggle";

export default function Theme() {
    var [isCheck,setIsCheck] = useState(true)
  return (
    <div className="w-[450px] max-h-[600px] ">
      <div className="px-4 border-b">
        <p className="font-medium text-xl">Cài đặt giao diện</p>
        <p className="text-sm text-slate-400 mb-5">chọn giao diện chat</p>
        <div className="h-28 w-40 mb-2 border-2 rounded-lg border-blue-500">
          <div className="h-1/2 w-full px-2 flex flex-row items-center justify-start">
            <div className="h-7 w-16 bg-blue-500 rounded-lg"></div>
          </div>
          <div className="h-1/2 w-full px-2  flex flex-row items-center justify-end">
            <div className="h-7 w-16 bg-slate-300 rounded-lg"></div>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <input type="checkbox" checked={isCheck} onChange={()=>{setIsCheck(!isCheck)}} className="accent-blue-600 h-4 w-10 " />
          <label>Mặc định</label>
        </div>
      </div>
      <div className="px-4 pt-2">
        <h1 className="font-medium">Hình nền chat</h1>
        <div className="flex flex-row justify-between items-center ">
          <p>Sử dụng Avatar làm hình nền</p>
          <Toggle turnOffColor="bg-[#eaedf0]" turnOnColor="bg-[#1a8dcd]" />
        </div>
      </div>
    </div>
  );
}
