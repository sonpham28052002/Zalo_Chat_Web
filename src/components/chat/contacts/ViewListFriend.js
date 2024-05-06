import { MdOutlineMoreHoriz } from "react-icons/md";
import "./style.css";
import { IoSearch } from "react-icons/io5";
import { TbArrowsSort } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import { Menu } from "@headlessui/react";
import { PiUserListLight } from "react-icons/pi";
import { removeAccents, filterList } from "./Function";
import UserInfoModal from "./../infoUser/UserInfoModal";
import { useSelector } from "react-redux";
import { stompClient } from "../../../socket/socket";
import { useSubscription } from "react-stomp-hooks";

function ViewListFriend() {
  var user = useSelector((state) => state.data);

  const [contacts, setContacts] = useState(
    user.friendList
      .slice()
      .sort((a, b) => a.user.userName.localeCompare(b.user.userName))
  );

  const [sortNameOption, setSortNameOption] = useState("ins");
  const [textFilter, setTextFilter] = useState("");
  const [isOpenUserInfoModal, setIsOpenUserInfoModal] = useState(false);
  const [idInfoFriend, setIdInfoFriend] = useState(undefined);

  function CharacterText({ text }) {
    return <div className="text-base font-semibold pl-5 pt-8">{text}</div>;
  }

  function unFriend(item) {
    var mess = { ownerId: user.id, userId: item.user.id };
    stompClient.send("/app/unfriend", {}, JSON.stringify(mess));
  }

  useEffect(() => {
    setContacts(
      user.friendList
        .slice()
        .sort((a, b) => a.user.userName.localeCompare(b.user.userName))
    );
  }, [user.friendList]);
  useSubscription("/user/" + user.id + "/unfriend", (messages) => {
    let mess = JSON.parse(messages.body);
    console.log(mess);
    setContacts(contacts.filter((item) => item.user.id !== mess.user.id));
  });
  function ListContact({ list }) {
    return list.map((item, index) => {
      return (
        <div key={index} className="flex flex-col">
          {(index === 0 ||
            removeAccents(item.user.userName[0]) !==
              removeAccents(list[index - 1].user.userName[0])) && (
            <CharacterText text={removeAccents(item.user.userName[0])} />
          )}
          <div className="flex flex-col">
            <div
              className="flex flex-row w-full items-center blur-item-light cursor-pointer pl-5"
              onClick={() => {
                alert("light");
              }}
            >
              <img
                className="img-avatar rounded-full bg-cover bg-center mr-4"
                src={item.user.avt}
                alt="."
              ></img>
              <div className="w-full">
                <div className="flex flex-row items-center justify-between h-20">
                  <p className="text-base font-semibold">
                    {item.user.userName}
                  </p>
                  <div
                    className="w-8 h-8 m-4 flex justify-center items-center cursor-pointer blur-item-dark"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Menu
                      as="div"
                      className="relative flex items-center justify-center"
                    >
                      <div>
                        <Menu.Button className="flex items-center justify-center">
                          <MdOutlineMoreHoriz color="gray" />
                        </Menu.Button>
                      </div>
                      <Menu.Items className="absolute z-10 right-0 mt-56 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-[150px]">
                        <div className="px-1 py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                onClick={() => {
                                  setIdInfoFriend(item.user.id);
                                  console.log(idInfoFriend);
                                  setIsOpenUserInfoModal(true);
                                }}
                              >
                                Xem thông tin
                              </button>
                            )}
                          </Menu.Item>
                          <hr></hr>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                onClick={() => {}}
                              >
                                Phân loại
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                onClick={() => {}}
                              >
                                Đặt tên gợi nhớ
                              </button>
                            )}
                          </Menu.Item>
                          <hr></hr>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm text-red-600`}
                                onClick={() => {}}
                              >
                                Chặn người này
                              </button>
                            )}
                          </Menu.Item>
                          <hr></hr>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                onClick={() => {
                                  unFriend(item);
                                }}
                              >
                                Xóa bạn
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Menu>
                  </div>
                </div>
                {index !== contacts.length - 1 && <hr></hr>}
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="flex flex-1 flex-col">
      <div>
        <div className="flex flex-row h-16 items-center">
          <div className="w-16">
            <PiUserListLight className="w-7 h-7 mx-auto" />
          </div>
          <div className="font-semibold">Danh sách bạn bè</div>
        </div>
        <hr></hr>
        <div className="flex flex-1 bg-gray-100 scrollable-div flex-col min-h-[840px]">
          <div className="txt-contacts items-center ">
            <p className="text-sm font-semibold ">Bạn bè ({contacts.length})</p>
          </div>
          <div className="bg-white view-bg self-center p-4">
            <div className="flex flex-row w-full h-12 items-center flex-wrap mb-3">
              <div className="flex items-center border-[1px] rounded border-gray-300 h-8 w-full lg:w-1/3 lg:max-w-96 mr-2 ">
                <IoSearch className="w-4 h-4 m-1" color="gray" />
                <input
                  type="text"
                  spellCheck="false"
                  id="search-input"
                  className="focus:outline-none w-full"
                  placeholder="Tìm bạn"
                  value={textFilter}
                  onChange={(event) => {
                    setTextFilter(event.target.value);
                    document.getElementById("search-input").focus();
                    var newlist = user.friendList.slice();
                    let tmp = filterList(
                      newlist,
                      event.target.value,
                      sortNameOption
                    );
                    setContacts(tmp);
                  }}
                />
              </div>
              <div className="flex flex-row h-full justify-between items-center w-full lg:w-1/2 ">
                <Menu
                  as="div"
                  className="relative inline-block text-left w-1/2 mr-2"
                >
                  <div>
                    <Menu.Button className="flex items-center rounded bg-gray-200 h-8 w-full mr-2">
                      <TbArrowsSort
                        className="w-4 h-4 m-1"
                        style={{ color: "#808080" }}
                      />
                      <p className="text-xs font-semibold text-black">
                        {sortNameOption === "ins" ? "Tên (A-Z)" : "Tên (Z-A)"}
                      </p>
                      <FaChevronDown
                        className="w-4 h-4 m-1 ml-auto"
                        style={{ color: "gray" }}
                      />
                    </Menu.Button>
                  </div>
                  <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-full">
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            onClick={() => {
                              setSortNameOption("ins");
                              const sortedContacts = [...contacts].sort(
                                (a, b) =>
                                  a.user.userName.localeCompare(b.user.userName)
                              );
                              setContacts(sortedContacts);
                            }}
                          >
                            Tên (A-Z)
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            onClick={() => {
                              setSortNameOption("des");
                              const sortedContacts = [...contacts].sort(
                                (b, a) =>
                                  a.user.userName.localeCompare(b.user.userName)
                              );
                              setContacts(sortedContacts);
                            }}
                          >
                            Tên (Z-A)
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Menu>
              </div>
            </div>
            <ListContact list={contacts}></ListContact>
            {isOpenUserInfoModal && (
              <UserInfoModal
                isOpen={isOpenUserInfoModal}
                setIsOpen={setIsOpenUserInfoModal}
                userId={idInfoFriend}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewListFriend;
