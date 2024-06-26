import React, { useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { CiSettings, CiUser } from "react-icons/ci";
import { GoDatabase } from "react-icons/go";
import { HiOutlineWrench } from "react-icons/hi2";
import { TbWorld, TbExclamationCircle } from "react-icons/tb";
import UserInfoModal from "../infoUser/UserInfoModal";
import ModalSetting from "./ModalSetting";
import { useSelector } from "react-redux";
import { handleSetValueCookie } from "../../../services/Cookie_Service";
import { useNavigate } from "react-router-dom";

export default function NavMenuSetting() {
  var user = useSelector((state) => state.data);
  const [isOpenUserInfoModal, setIsOpenUserInfoModal] = useState(false);
  const [isOpenSettingModal, setIsOpenSettingModal] = useState(false);
  var history = useNavigate();

  var dataNav = [
    {
      id: 1,
      title: "Thông tin tài khoản",
      icon: <CiUser className="text-2xl" />,
      idEml: "user-info",
      onclick: () => setIsOpenUserInfoModal(true),
    },
    {
      id: 2,
      title: "Cài đặt",
      icon: <CiSettings className="text-2xl" />,
      idEml: "setting",
      onclick: () => setIsOpenSettingModal(true),
    },
    {
      id: 3,
      title: "Quản lý dữ liệu",
      icon: <GoDatabase className="text-2xl" />,
      idEml: "database",
    },
    {
      id: 4,
      title: "Công cụ",
      icon: <HiOutlineWrench className="text-2xl" />,
      idEml: "tools",
    },
    {
      id: 5,
      title: "Ngôn ngữ",
      icon: <TbWorld className="text-2xl " />,
      idEml: "language",
    },
    {
      id: 6,
      title: "Giới thiệu",
      icon: <TbExclamationCircle className="text-2xl hover:text-white" />,
      idEml: "introApp",
    },
  ];
  return (
    <>
      <Menu
        as="div"
        className="relative flex flex-col items-center justify-center text-left w-full h-16 hover:bg-[#1a8dcd] "
      >
        <Menu.Button className="inline-flex w-full h-16 items-center justify-center">
          <CiSettings className="text-white text-3xl" />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute bottom-16 left-5 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-1">
              {dataNav.map((item, index) => (
                <Menu.Item id={item.idEml} key={item.id}>
                  <div
                    className={`flex flex-row justify-start px-2 py-2 items-center hover:bg-slate-400 hover:text-white hover:font-medium ${
                      index === 0 ? "rounded-t-md" : ""
                    }`}
                    onClick={item?.onclick}
                  >
                    {item.icon}
                    <p className="block text-sm ml-2 ">{item.title}</p>
                  </div>
                </Menu.Item>
              ))}
              <Menu.Item>
                <div
                  className="py-2 border-t hover:bg-red-600 text-red-600 hover:font-medium hover:text-white rounded-b-md "
                  onClick={() => {
                    handleSetValueCookie("appchat", {});
                    history("/");
                  }}
                >
                  <p className="text-center ">Đăng xuất</p>
                </div>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <UserInfoModal
        isOpen={isOpenUserInfoModal}
        setIsOpen={setIsOpenUserInfoModal}
        userId={user.id}
      />
      <ModalSetting
        isOpen={isOpenSettingModal}
        setIsOpen={setIsOpenSettingModal}
      />
    </>
  );
}
