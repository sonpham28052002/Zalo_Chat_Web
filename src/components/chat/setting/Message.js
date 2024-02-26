import React, { useState } from "react";
import Toggle from "../custom/toggle";

export default function Message() {
    var [isCheck,setIsCheck] = useState(0)

  return (
    <div className="w-[450px] max-h-[600px] overflow-y-auto">
    <div className="">
      <div className="px-4 border-b">
        <div className="flex flex-row justify-between items-center">
          <p className="font-medium text-lg">Tin nhắn nhanh</p>
          <Toggle turnOffColor="bg-[#eaedf0]" turnOnColor="bg-[#1a8dcd]" />
        </div>
        <p className="text-sm text-slate-400 mb-3 pr-14">
          Tạo, chỉnh sửa và quản lý phím tắt cho những tin nhắn thường sử dụng
          trong hội thoại
        </p>
      </div>
      <div className="px-4 pt-2 border-b">
        <h1 className="font-medium text-lg">Thiết lập ẩn trò chuyện</h1>
        <div className="flex flex-col mb-4">
          <p className="text-sm text-slate-400 mb-3 ">
            Đặt mã PIN cho các cuộc trò chuyện riêng tư để tránh người khác nhìn
            thấy trên máy tính của bạn
          </p>
          <button className="bg-slate-200 hover:bg-blue-100 w-40 h-10 rounded-md text-blue-700 font-medium ">
            Cài đặt mã PIN
          </button>
        </div>
      </div>
      <div className="px-4 border-b">
        <div className="flex flex-row justify-between items-center">
          <p className="font-medium text-lg">Chia mục ưu tiên và khác</p>
          <Toggle turnOffColor="bg-[#eaedf0]" turnOnColor="bg-[#1a8dcd]" />
        </div>
        <p className="text-sm text-slate-400 mb-3 pr-10">
          Tách riêng trò chuyện không ưu tiên và chuyển sang mục khác để tập
          trung hơn
        </p>
      </div>
      <div className="px-4 border-b">
        <div className="flex flex-row justify-between items-center">
          <p className="font-medium text-lg">Hiển thị nội dung file Excel</p>
        </div>
        <p className="text-sm text-slate-400 mb-3 pr-10">
          Định dạng khi sao chép file Excel sau đó dán vào Zalo
        </p>
        <div className="flex flex-row justify-between items-center mb-3">
          <p>Dạng hình</p>
          <input checked={isCheck===0} onChange={()=>{setIsCheck(0)}} type="radio" name="dd"  className="accent-blue-700 h-4 w-4" />
        </div>
        <div className="flex flex-row justify-between items-center mb-3">
          <p>Dạng chữ</p>
          <input checked={isCheck===1} onChange={()=>{setIsCheck(1)}} type="radio" name="dd" className="accent-blue-700 h-4 w-4" />
        </div>
        <div className="flex flex-row justify-between items-center mb-3">
          <p>Luôn hỏi</p>
          <input checked={isCheck===2} onChange={()=>{setIsCheck(2)}} type="radio" name="dd" className="accent-blue-700 h-4 w-4" />
        </div>
      </div>
      <div className="px-4 pt-2 border-b">
        <h1 className="font-medium text-lg">Cài đặt khác</h1>
        <div className="flex flex-col mb-4">
          <div className="flex flex-row justify-between items-center mb-3">
            <p className="text-base">Bấm đúp vào vùng cạnh tin nhắn để trả lời</p>
            <Toggle turnOffColor="bg-[#eaedf0]" turnOnColor="bg-[#1a8dcd]" />
          </div>
          <div className="flex flex-row justify-between items-center mb-3">
            <p className="text-sm">Hiển thị hình thu nhỏ (Thumbnai) của File</p>
            <Toggle turnOffColor="bg-[#eaedf0]" turnOnColor="bg-[#1a8dcd]" />
          </div>
          <div className="flex flex-row justify-between items-center mb-3">
            <p className="text-base">Bạn sẽ thấy bạn bè đang soạn tin nhắn</p>
            <Toggle turnOffColor="bg-[#eaedf0]" turnOnColor="bg-[#1a8dcd]" />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
