import { IoSearch } from "react-icons/io5";
import { TbArrowsSort } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa6";
import { LuFilter } from "react-icons/lu";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import React, { useState } from "react";
import { Menu } from "@headlessui/react";
import { RiGroupLine } from "react-icons/ri";
import { removeAccents, filterList } from "./Function";
import { useSelector } from "react-redux";

function ViewListGroup() {
  var owner = useSelector((state) => state.data);

  const [groups, setGroups] = useState(
    owner.conversation.filter((item) => item.conversationType === "group")
  );
  const [textFilter, setTextFilter] = useState("");
  const [selectedOptionSortGroup, setSelectedOptionSortGroup] = useState(1);

  function ListGroup({ list }) {
    return (
      <div className="flex flex-col">
        {list.map((item, index) => (
          <div
            key={index}
            className="flex flex-row w-full items-center blur-item-light cursor-pointer pl-3"
            onClick={() => {
              alert("light");
            }}
          >
            <div
              className="img-avatar rounded-full bg-cover bg-center mr-4"
              style={{ backgroundImage: `url(${item.avtGroup})` }}
            ></div>
            <div className="w-full">
              <div className="flex flex-row items-center justify-between h-20">
                <div>
                  <div className="flex flex-row items-center">
                    <FaUserFriends className="w-4 h-4 m-1 " color="gray" />
                    <p className="text-xl font-semibold">{item.nameGroup}</p>
                  </div>
                  <button
                    className="text-sm text-gray-500 hover:text-blue-500 hover:underline transition duration-100 ease-in-out"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {item.members.length} thành viên
                  </button>
                </div>
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
                    <Menu.Items className="absolute z-10 right-0 mt-32 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-[150px]">
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
                              Phân loại
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
                              Rời cộng đồng
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Menu>
                </div>
              </div>

              {index !== groups.length - 1 && <hr></hr>}
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
            <RiGroupLine className="w-7 h-7 mx-auto" />
          </div>
          <div className="font-semibold">Danh sách nhóm</div>
        </div>
        <hr></hr>
        <div className="flex flex-1 bg-gray-100 scrollable-div flex-col min-h-[840px]">
          <div className="txt-contacts items-center ">
            <p className="text-sm font-semibold ">Nhóm ({groups.length})</p>
          </div>
          <div className="bg-white view-bg self-center p-4">
            <div className="flex flex-row w-full h-12 items-center flex-wrap mb-3">
              <div className="flex items-center border-[1px] rounded border-gray-300 h-8 w-full lg:w-1/3 lg:max-w-96 mr-2 ">
                <IoSearch className="w-4 h-4 m-1" color="gray" />
                <input
                  type="text"
                  id="search-group-name"
                  placeholder="Tìm kiếm..."
                  className="focus:outline-none w-full"
                  value={textFilter}
                  onChange={(event) => {
                    setTextFilter(event.target.value);
                    document.getElementById("search-group-name").focus();
                    let tmp = filterList(groups, event.target.value);
                    setGroups(tmp);
                  }}
                />
              </div>

              <div className="flex flex-row h-full justify-between items-center w-full lg:w-1/2">
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
                        {selectedOptionSortGroup === 1
                          ? "Tên (A-Z)"
                          : selectedOptionSortGroup === 2
                          ? "Tên (Z-A)"
                          : selectedOptionSortGroup === 3
                          ? "Hoạt động (mới - cũ)"
                          : "Hoạt động (cũ - mới)"}
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
                              setSelectedOptionSortGroup(1);
                              const sortedGroup = [...groups].sort((a, b) =>
                                a.name.localeCompare(b.name)
                              );
                              setGroups(sortedGroup);
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
                              setSelectedOptionSortGroup(2);
                              const sortedGroup = [...groups].sort((a, b) =>
                                b.name.localeCompare(a.name)
                              );
                              setGroups(sortedGroup);
                            }}
                          >
                            Tên (Z-A)
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
                              setSelectedOptionSortGroup(3);
                            }}
                          >
                            Hoạt động (mới - cũ)
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
                              setSelectedOptionSortGroup(4);
                            }}
                          >
                            Hoạt động (cũ - mới)
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Menu>
                <Menu
                  as="div"
                  className="relative inline-block text-left w-1/2"
                >
                  <div>
                    <Menu.Button className="flex items-center rounded bg-gray-200 h-8 w-full">
                      <LuFilter
                        className="w-4 h-4 m-1"
                        style={{ color: "#808080" }}
                      />
                      <p className="text-xs font-semibold text-black">Tất cả</p>
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
                              setGroups(groups);
                            }}
                          >
                            Tất cả
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
                              const sortedGroup = [...groups].filter((group) =>
                                removeAccents(group.name)
                                  .toLowerCase()
                                  .includes("group")
                              );
                              setGroups(sortedGroup);
                            }}
                          >
                            Group
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Menu>
              </div>
            </div>
            <ListGroup list={groups} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewListGroup;
