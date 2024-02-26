import { IoSearch } from "react-icons/io5";
import { TbArrowsSort } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa6";
import { LuFilter } from "react-icons/lu";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import React, {useState } from "react";
import { Menu } from '@headlessui/react'

function ViewListGroup() {
    const groups = [
        { id: 1, name: 'Group 1', path: require('./asset/avatar1.png'), countMember: 12 },
        { id: 2, name: 'Group 2', path: require('./asset/avatar2.png'), countMember: 12 },
        { id: 3, name: 'Group 3', path: require('./asset/avatar3.png'), countMember: 12 },
        { id: 4, name: 'Group 4 ', path: require('./asset/avatar4.png'), countMember: 12 },
        { id: 5, name: 'Group 5', path: require('./asset/avatar5.png'), countMember: 12 },
        { id: 6, name: 'Group 6', path: require('./asset/avatar6.png'), countMember: 12 },
        { id: 7, name: 'Group 7 ', path: require('./asset/avatar7.png'), countMember: 12 },
        { id: 8, name: 'Group 8', path: require('./asset/avatar8.png'), countMember: 12 },
        { id: 9, name: 'Group 9', path: require('./asset/avatar9.png'), countMember: 12 },
        { id: 10, name: 'Group 10', path: require('./asset/avatar10.png'), countMember: 12 }
    ];

    const [selectedOptionSortGroup, setSelectedOptionSortGroup] = useState(3);

    function ListGroup({ list }) {
        return (
            <div className="bg-white view-bg self-center p-4">
                <div className="flex flex-row w-full h-12 items-center flex-wrap mb-3">
                    <div className="flex items-center border-[1px] rounded border-gray-300 h-8 w-full lg:w-1/3 lg:max-w-96 mr-2 ">
                        <IoSearch className="w-4 h-4 m-1" color="gray" />
                        <input type="text" placeholder="Tìm kiếm..." className="focus:outline-none w-full" />

                    </div>

                    <div className="flex flex-row h-full justify-between items-center w-full lg:w-1/2">
                        <Menu as="div" className="relative inline-block text-left w-1/2 mr-2">
                            <div>
                                <Menu.Button className="flex items-center rounded bg-gray-200 h-8 w-full mr-2">
                                    <TbArrowsSort className="w-4 h-4 m-1" style={{ color: '#808080' }} />
                                    <p className="text-xs font-semibold text-black">{selectedOptionSortGroup === 1 ? 'Hoạt động (mới - cũ)' : 'Hoạt động (cũ - mới)'}</p>
                                    <FaChevronDown className="w-4 h-4 m-1 ml-auto" style={{ color: 'gray' }} />
                                </Menu.Button>
                            </div>
                            <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-full">
                                <div className="px-1 py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                onClick={() => {
                                                    setSelectedOptionSortGroup(1)
                                                }}
                                            >
                                                Tên (A-Z)
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                onClick={() => {
                                                    setSelectedOptionSortGroup(2)
                                                }}
                                            >
                                                Tên (Z-A)
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                onClick={() => {
                                                    setSelectedOptionSortGroup(3)
                                                }}
                                            >
                                                Hoạt động (mới - cũ)
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                onClick={() => {
                                                    setSelectedOptionSortGroup(3)
                                                }}
                                            >
                                                Hoạt động (cũ - mới)
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Menu>       


                                         

                        <button className="flex items-center rounded bg-gray-200 h-8 w-1/2">
                            <LuFilter className="w-4 h-4 m-1" color="gray" />
                            <p className="text-xs font-semibold " >Tất cả</p>
                            <FaChevronDown className="w-4 h-4 m-1 ml-auto" color="gray" />
                        </button>
                    </div>
                </div>

                {list.map(item => (
                    <button className="flex flex-row w-full items-center blur-item-light" onClick={() => {
                        alert('light');
                    }}>
                        <div className="img-avatar rounded-full bg-cover bg-center mr-4" style={{ backgroundImage: `url(${item.path})` }}></div>
                        <div key={item.id} className="w-full" >
                            <div className="flex flex-row items-center justify-between h-20">
                                <div>
                                    <div className="flex flex-row items-center">
                                        <FaUserFriends className="w-4 h-4 m-1 " color="gray" />
                                        <p className="text-xl font-semibold">{item.name}</p>
                                    </div>


                                    <button className="text-sm text-gray-500 hover:text-blue-500 hover:underline transition duration-100 ease-in-out"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                    >{item.countMember} thành viên</button>
                                </div>

                                <button className="w-8 h-8 m-4 flex justify-center items-center blur-item-dark"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    <MdOutlineMoreHoriz className="w-5 h-5" color="gray" />
                                </button>
                            </div>
                            <hr></hr>
                        </div>
                    </button>
                ))}
            </div>
        )
    }

    return (
        <div className="flex flex-1 flex-col">
            <div className="flex flex-row h-16 items-center">
                <div className="w-16">
                    <FaUserFriends className="w-7 h-7 mx-auto" />
                </div>
                <div className="font-semibold">
                    Danh sách nhóm
                </div>
            </div>
            <hr></hr>
            <div className="flex flex-1  bg-gray-100 scrollable-div flex-col" >
                <div className="txt-contacts items-center " >
                    <p className="text-sm font-semibold ">Nhóm ({groups.length})</p>
                </div>
                <ListGroup list={groups} />
            </div>
        </div>
    )
}

export default ViewListGroup;