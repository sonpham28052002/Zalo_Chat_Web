import React from "react";
import { useSelector } from "react-redux";

export default function StickerMessage({ sticker }) {
  var owner = useSelector((state) => state.data);

  return (
    <div
      className={` pr-5  h-fit w-full  flex flex-row ${
        owner.id === sticker.sender.id
          ? "justify-end pr-5"
          : "justify-start pl-5"
      } items-star  my-5 `}
      key={sticker.id}
    >
      {owner.id !== sticker.sender.id && (
        <img
          src={sticker.sender.avt}
          alt="#"
          className="h-12 w-12 rounded-full mr-3"
        />
      )}
      {owner.id !== sticker.sender.id && (
        <img
          src={sticker.sender.avt}
          alt="#"
          className="h-12 w-12 rounded-full mr-3"
        />
      )}
        <div className="h-full w-fit max-w-[50%] p-2">
          <div className=" h-fit w-fit flex flex-col items-start justify-around">
            <img src={sticker.url} alt="#" className="h-28 w-28" />
            <span className="text-[12px] px-4 text-gray-400">{`${
              new Date(sticker.senderDate).getHours() < 10
                ? "0" + new Date(sticker.senderDate).getHours()
                : new Date(sticker.senderDate).getHours()
            }:${
              new Date(sticker.senderDate).getMinutes() < 10
                ? "0" + new Date(sticker.senderDate).getMinutes()
                : new Date(sticker.senderDate).getMinutes()
            }`}</span>
          </div>
      </div>
    </div>
  );
}
