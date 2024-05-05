import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { stompClient } from "../../../socket/socket";
import { v4 } from "uuid";
import { useSubscription } from "react-stomp-hooks";
import { getAPI } from "../../../redux_Toolkit/slices";

export default function SearchFriend({ setIndex, showSearch }) {
  var owner = useSelector((state) => state.data);
  var [allUser, setAllUser] = useState([]);
  var dispatch = useDispatch();

  function mergeArraysWithoutDuplicatesAndIds(arr1, arr2) {
    const map = new Map(arr1.map((item) => [item.id, item]));
    arr2.forEach((item) => {
      if (!map.has(item.id)) {
        map.set(item.id, item);
      }
    });
    const mergedArray = Array.from(map.values());
    return mergedArray;
  }
  useSubscription("/user/" + owner.id + "/singleChat", (messages) => {
    dispatch(getAPI(owner.id));
  });
  useEffect(() => {
    let arrchat = [];
    for (let index = 0; index < owner.conversation.length; index++) {
      let user = {
        id: undefined,
        name: undefined,
        avt: undefined,
        type: undefined,
      };
      if (owner.conversation[index].conversationType === "group") {
        user.id = owner.conversation[index].idGroup + "";
        user.name = owner.conversation[index].nameGroup + "";
        user.avt = owner.conversation[index].avtGroup + "";
        user.type = "group";
        arrchat.push(user);
      } else {
        user.id = owner.conversation[index].user.id + "";
        user.name = owner.conversation[index].user.userName + "";
        user.avt = owner.conversation[index].user.avt + "";
        user.type = "single";
        arrchat.push(user);
      }
    }

    let arrFriend = [];
    for (let index = 0; index < owner.friendList.length; index++) {
      arrFriend.push({
        id: owner.friendList[index].user.id,
        name: owner.friendList[index].user.userName,
        avt: owner.friendList[index].user.avt,
      });
    }
    setAllUser(mergeArraysWithoutDuplicatesAndIds(arrchat, arrFriend));
  }, [owner.conversation, owner.friendList]);
  return (
    <div className="h-full  w-2/12  border-r">
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
            <button
              className=" h-8  mx-1 p-1 hover:bg-[#eaedf0] rounded"
              onClick={() => {
                showSearch();
                console.log("con");
              }}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
      <div className=" h-[860px] w-full py-1 select-none ">
        {allUser.map((item, index) => {
          return (
            <div
              key={index}
              className="h-fit p-2 hover:bg-slate-200 m-1 flex flex-row justify-start items-center shadow-sm"
              onClick={() => {
                console.log(item.id);
                setIndex(item.id);
              }}
            >
              <img
                src={item.avt}
                alt="."
                className="h-14 w-14 rounded-full mx-1"
              />
              <p className="font-medium">{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
