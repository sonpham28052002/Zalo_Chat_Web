import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

export default function InfoUser() {
  var user = {
    id: 1,
    name: "Phạm Thanh Sơn",
  };
  return (
    <Menu
      as="div"
      className="relative flex flex-col items-center justify-center text-left w-full h-16"
    >
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ">
          <img
            className="rounded-full h-12 mb-4 border border-white"
            alt="#"
            src="https://s120-ava-talk.zadn.vn/c/b/f/1/8/120/fa77be6399bd4028983cfc723dda9494.jpg"
          ></img>
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
        <Menu.Items className="absolute p-3 top-9 left-12 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            <div className="py-1 border-b">
              <h1 className="font-bold mb-2 px-2">{user.name}</h1>
            </div>
          </Menu.Item>
          <Menu.Item>
            <div className="py-1 hover:bg-slate-400 hover:text-white px-2 hover:font-medium">
              <p>Hồ sơ của bạn</p>
            </div>
          </Menu.Item>
          <Menu.Item>
            <div className="py-1 hover:bg-slate-400 hover:text-white px-2 hover:font-medium">
              <p>cài đặt</p>
            </div>
          </Menu.Item>
          <Menu.Item className="">
            <div className="py-1 border-t hover:bg-red-600 text-red-600 hover:text-white hover:font-medium">
              <p className="text-center ">Đăng xuất</p>
            </div>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
