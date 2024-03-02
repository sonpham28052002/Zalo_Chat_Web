import { PiUserListFill } from "react-icons/pi";
import { MdOutlineMoreHoriz } from "react-icons/md";
import "./style.css";
import { IoSearch } from "react-icons/io5";
import { TbArrowsSort } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa6";
import { LuFilter } from "react-icons/lu";
import React, { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";

function ViewListFriend() {
  const [contacts, setContacts] = useState([
    { id: 1, name: "An", path: require("./asset/avatar1.png") },
    { id: 2, name: "Cường", path: require("./asset/avatar2.png") },
    { id: 3, name: "Nam", path: require("./asset/avatar3.png") },
    { id: 4, name: "Hoa ", path: require("./asset/avatar4.png") },
    { id: 5, name: "Lan", path: require("./asset/avatar5.png") },
    { id: 6, name: "Nho", path: require("./asset/avatar6.png") },
    { id: 7, name: "Thịnh ", path: require("./asset/avatar7.png") },
    { id: 8, name: "Kiên", path: require("./asset/avatar8.png") },
    { id: 9, name: "Phú Quý", path: require("./asset/avatar9.png") },
    { id: 10, name: "Phước", path: require("./asset/avatar10.png") },
    {
      id: 11,
      name: "Ân",
      path: "https://img.pikbest.com/origin/09/19/03/61zpIkbEsTGjk.jpg!w700wp",
    },
  ]);

  contacts.sort((a, b) => a.name.localeCompare(b.name));

  const [selectedOptionName, setSelectedOptionName] = useState("ins");
  const [selectedOptionLabel, setSelectedOptionLabel] = useState(0);
  const labels = [
    { id: 0, label: "Tất cả", value: "all" },
    { id: 1, label: "Khách hàng", value: "customer" },
    { id: 2, label: "Gia đình", value: "family" },
    { id: 3, label: "Công việc", value: "work" },
    { id: 4, label: "Bạn bè", value: "friends" },
    { id: 5, label: "Trả lời sau", value: "reply-later" },
    { id: 6, label: "Đồng nghiệp", value: "colleagues" },
  ];

  useEffect(() => {
    // const sortedContacts = [...contacts].sort((a, b) => {
    //     if (selectedOptionName === 'ins') {
    //         return a.name.localeCompare(b.name);
    //     } else {
    //         return b.name.localeCompare(a.name);
    //     }
    // });
    // setContacts(sortedContacts);
  }, [selectedOptionName]);

  function ListContact({ list }) {
    return (
      <div className="bg-white view-bg self-center p-4">
        <div className="flex flex-row w-full h-12 items-center flex-wrap mb-3">
          <div className="flex items-center border-[1px] rounded border-gray-300 h-8 w-full lg:w-1/3 lg:max-w-96 mr-2 ">
            <IoSearch className="w-4 h-4 m-1" color="gray" />
            <input
              type="text"
              placeholder="Tìm bạn"
              className="focus:outline-none w-full"
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
                    {selectedOptionName === "ins" ? "Tên (A-Z)" : "Tên (Z-A)"}
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
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={() => {
                          setSelectedOptionName("ins");

                          const sortedContacts = [...contacts].sort((a, b) =>
                            a.name.localeCompare(b.name)
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
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={() => {
                          setSelectedOptionName("des");
                          const sortedContacts = [...contacts].sort((b, a) =>
                            a.name.localeCompare(b.name)
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

            <Menu
              as="div"
              className="relative inline-block text-left w-1/2 mr-2 items-center"
            >
              <div>
                <Menu.Button className="flex items-center rounded bg-gray-200 h-8 w-full">
                  <LuFilter className="w-4 h-4 m-1" color="gray" />
                  <p className="text-xs font-semibold text-black">
                    {labels[selectedOptionLabel].label}
                  </p>
                  <FaChevronDown
                    className="w-4 h-4 m-1 ml-auto"
                    style={{ color: "gray" }}
                  />
                </Menu.Button>
              </div>
              <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-full">
                <div className="px-1 py-1">
                  {labels.map((option) => (
                    <Menu.Item key={option.id}>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          onClick={() => setSelectedOptionLabel(option.id)}
                        >
                          {option.label}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Menu>
          </div>
        </div>

        {list.map((item) => (
          <div
            className="flex flex-row w-full items-center blur-item-light"
            onClick={() => {
              alert("light");
            }}
            key={item.id}
          >
            <div
              className="img-avatar rounded-full bg-cover bg-center mr-4"
              style={{ backgroundImage: `url(${item.path})` }}
            ></div>
            <div className="w-full">
              <div className="flex flex-row items-center justify-between h-20">
                <p className="text-base font-semibold">{item.name}</p>
                <button
                  className="w-8 h-8 m-4 flex justify-center items-center blur-item-dark"
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
                              onClick={() => {}}
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
                              onClick={() => {}}
                            >
                              Xóa bạn
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Menu>
                </button>
              </div>
              <hr></hr>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div>
        <div className="flex flex-row h-16 items-center">
          <div className="w-16">
            <PiUserListFill className="w-7 h-7 mx-auto" />
          </div>
          <div className="font-semibold">Danh sách bạn bè</div>
        </div>
        <hr></hr>
        <div className="flex flex-1  bg-gray-100 scrollable-div flex-col">
          <div className="txt-contacts items-center ">
            <p className="text-sm font-semibold ">Bạn bè ({contacts.length})</p>
          </div>
          <ListContact list={contacts} />
        </div>
      </div>
    </div>
  );
}

export default ViewListFriend;
