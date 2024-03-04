import React from "react";
import HeaderNavChat from "./headerNavChat";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function NavChat({ indexSelect, setIndex }) {
  var data = useSelector((state) => state.data);

  return (
    <div className="h-full  w-2/12  border-r">
      <HeaderNavChat />
      <div className=" h-[860px] w-full py-1 select-none">
        {data.messages.map((item, index) => (
          <div
            key={index}
            className={`w-full h-[70px] hover:bg-slate-100 px-3 flex flex-row justify-start items-center ${
              indexSelect === index ? "bg-[#e5efff] hover:bg-[#e5efff] " : ""
            }`}
            onClick={() => {
              setIndex(index);
            }}
          >
            <img
              className="rounded-full h-auto w-1/6 bg-center bg-cover"
              src={item.avt}
              alt="#"
            />
            <div className="flex flex-col justify-center w-4/6  ml-2">
              <p className="font-medium text-nowrap max-w-44 overflow-hidden">
                {item.name.length > 15
                  ? item.name.substring(0, 15) + "..."
                  : item.name}
              </p>

              <span className="text-slate-400">
                {data.id ===
                item.conversation[item.conversation.length - 1].sender
                  ? "Bạn: "
                  : ""}
                {item.conversation[item.conversation.length - 1].message}
              </span>
            </div>
            <div className="flex flex-row justify-center items-center w-1/6">
              <div className=" flex flex-row justify-center items-center h-7 w-7 rounded-md hover:bg-slate-200">
                <BsThreeDots className="text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
