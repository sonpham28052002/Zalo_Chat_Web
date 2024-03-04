import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import UserInfoModal from "./UserInfoModal";
import { useSelector } from "react-redux";
import ModalSetting from "../setting/ModalSetting";
import { useNavigate } from "react-router-dom";
import { handleSetValueCookie } from "../../../services/Cookie_Service";
export default function InfoUser() {
  var user = useSelector((state) => state.data);
  const [isOpenInforUser, setIsOpenInforUser] = useState(false);
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  var history = useNavigate();
  return (
    <>
      <Menu
        as="div"
        className="relative flex flex-col items-center justify-center text-left w-full h-16"
      >
        <div>
          <Menu.Button className="inline-flex w-full justify-center ">
            <img
              className="rounded-full h-12 mb-4 border border-white"
              alt="#"
              src={user.avt}
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
              <div
                className="py-1 hover:bg-slate-400 hover:text-white px-2 hover:font-medium"
                onClick={() => setIsOpenInforUser(true)}
              >
                <p>Hồ sơ của bạn</p>
              </div>
            </Menu.Item>
            <Menu.Item>
              <div
                className="py-1 hover:bg-slate-400 hover:text-white px-2 hover:font-medium"
                onClick={() => setIsOpenSetting(true)}
              >
                <p>cài đặt</p>
              </div>
            </Menu.Item>
            <Menu.Item className="">
              <div
                className="py-1 border-t hover:bg-red-600 text-red-600 hover:text-white hover:font-medium"
                onClick={() => {
                  handleSetValueCookie("appchat", {});
                  history("/");
                }}
              >
                <p className="text-center ">Đăng xuất</p>
              </div>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
      <UserInfoModal
        isOpen={isOpenInforUser}
        setIsOpen={setIsOpenInforUser}
        user={user}
      />
      <ModalSetting setIsOpen={setIsOpenSetting} isOpen={isOpenSetting} />
    </>
  );
}
