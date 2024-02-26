import React, { useState } from "react";

export default function GeneralSetting() {
  var [isCheck, setIsCheck] = useState(true);
  return (
    <div className="w-[450px] max-h-[600px]">
      <div className="px-4 border-b">
        <p className="font-medium text-xl">Danh bạ</p>
        <p className="text-sm text-slate-400 mb-5">
          Danh sách bạn bè được hiển thị trong danh bạ
        </p>
        <div className="flex flex-row justify-between items-center mb-2">
          <p className="text-sm">Hiển thị danh sách bạn bè</p>
          <input
            checked={isCheck}
            type="radio"
            name="check"
            className="accent-blue-700 h-4 w-10"
            onChange={() => {setIsCheck(true)}}
          />
        </div>
        <div className="flex flex-row justify-between items-center mb-5">
          <p className="text-sm">Chỉ hiển thị bạn bè đang sử dụng App</p>
          <input
            checked={!isCheck}
            type="radio"
            name="check"
            className="accent-blue-700 h-4 w-10"
            onChange={() => {setIsCheck(false)}}
          />
        </div>
      </div>
      <div className="px-4 pt-2">
        <h1 className="font-medium">Ngôn ngữ (Language)</h1>
        <div className="flex flex-row justify-between items-center ">
          <p>Thay đổi ngôn ngữ</p>
          <select
            name="cars"
            id="language"
            className="border focus:outline-none h-10 w-36 px-2"
          >
            <option value="vn" className="p-96">
              Tiếng Việt
            </option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </div>
  );
}
