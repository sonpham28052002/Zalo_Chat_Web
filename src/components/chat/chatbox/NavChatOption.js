import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { BsThreeDots } from "react-icons/bs";
import { stompClient } from "../../../socket/socket";
export default function NavChatOption({ conversation, ownerId }) {
  function deleteConversation(ownerId) {
    const con = { ownerId: ownerId, idUser: "", idGroup: "" };
    if (conversation.conversationType === "group") {
      con.idGroup = conversation.idGroup;
    } else {
      con.idUser = conversation.user.id;
    }
    stompClient.send("/app/deleteConversation", {}, JSON.stringify(con));
  }
  return (
    <Menu
      as="div"
      className="relative flex flex-col items-center justify-center text-left w-full h-16"
    >
      <div>
        <Menu.Button className="inline-flex w-full justify-center ">
          <div className=" flex flex-row justify-center items-center h-7 w-7 rounded-md hover:bg-slate-200">
            <BsThreeDots className="text-gray-400" />
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute p-1 top-9 -left-32 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            <div
              className=" hover:bg-slate-400 text-sm hover:text-white px-2 hover:font-medium"
              onClick={() => {
                deleteConversation(ownerId);
              }}
            >
              <p>Xoá Cuộc Trò chuyện</p>
            </div>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
