import React, { useState } from "react";
import Toggle from "../custom/toggle";

export default function Notification() {
  var [isCheckTheme, setIsCheckTheme] = useState(true);
  return (
    <div className="w-[450px] max-h-[600px] ">
      <div className="px-4 border-b">
        <p className="font-medium text-xl">Hiển thị thông báo</p>
        <p className="text-sm text-slate-400 mb-5">
          Popup thông báo mỗi khi có tin nhắn mới
        </p>
        <div className="flex flex-row mb-3">
          <div className="w-fit flex flex-col items-center mr-5">
            <div
              className={`h-24 w-32  border-2 rounded-t-lg ${
                isCheckTheme ? "border-blue-500" : ""
              }`}
            >
              <div className="h-1/2 w-full px-2 flex flex-row items-center justify-end">
                <div
                  className={`h-7 w-16 ${
                    isCheckTheme ? "bg-blue-500" : "bg-slate-300"
                  } rounded-md px-1`}
                >
                  <div className="h-2 m-1 w-5  bg-slate-200 rounded-sm"></div>
                  <div className="h-2 m-1 w-10  bg-slate-200 rounded-sm"></div>
                </div>
              </div>
            </div>
            <div
              className={`h-3 w-36 border-2 rounded-b-lg ${
                isCheckTheme ? "border-blue-500" : ""
              } mb-2`}
            ></div>
            <div className="flex flex-row items-center">
              <input
                type="radio"
                checked={isCheckTheme}
                name="checkTheme"
                className="accent-blue-600 h-4 w-10"
                onChange={() => {
                  setIsCheckTheme(true);
                }}
              />
              <label>Bật</label>
            </div>
          </div>
          <div className="w-fit flex flex-col items-center">
            <div
              className={`h-24 w-32  border-2 rounded-t-lg ${
                !isCheckTheme ? "border-blue-500" : ""
              }`}
            ></div>
            <div
              className={`h-3 w-36 border-2 rounded-b-lg ${
                !isCheckTheme ? "border-blue-500" : ""
              } mb-2`}
            ></div>
            <div className="flex flex-row items-center">
              <input
                type="radio"
                name="checkTheme"
                checked={!isCheckTheme}
                className="accent-blue-600 h-4 w-10"
                onChange={() => {
                  setIsCheckTheme(false);
                }}
              />
              <label>Tắt</label>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 pt-2">
        <h1 className="font-medium">Âm thanh thông báo</h1>
        <div className="flex flex-row justify-between items-center mt-2">
          <p className="text-sm">Phát âm thanh khi có tin nhắn & thông báo mới</p>
          <Toggle turnOffColor="bg-[#eaedf0]" turnOnColor="bg-[#1a8dcd]" />
        </div>
      </div>
    </div>
  );
}
