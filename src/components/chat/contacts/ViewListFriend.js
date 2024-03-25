import { MdOutlineMoreHoriz } from "react-icons/md";
import './style.css';
import { IoSearch } from "react-icons/io5";
import { TbArrowsSort } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa6";
import { LuFilter } from "react-icons/lu";
import React, { useEffect, useState } from "react";
import { Menu } from '@headlessui/react'
import { PiUserListLight } from "react-icons/pi";
import { removeAccents, filterList } from "./Function";
import UserInfoModal from './../infoUser/UserInfoModal';
import { MdLabel } from "react-icons/md";


const allContact = [
    { id: 1, name: 'An', path: require('./asset/avatar1.png') },
    { id: 2, name: 'Cường', path: require('./asset/avatar2.png') },
    { id: 3, name: 'Nam', path: require('./asset/avatar3.png') },
    { id: 4, name: 'Em Hoa ', path: require('./asset/avatar4.png') },
    { id: 5, name: 'Lan', path: require('./asset/avatar5.png') },
    { id: 6, name: 'Nho', path: require('./asset/avatar6.png') },
    { id: 7, name: 'Én ', path: require('./asset/avatar7.png') },
    { id: 8, name: 'Kiên', path: require('./asset/avatar8.png') },
    { id: 9, name: 'Phú Quý', path: require('./asset/avatar9.png') },
    { id: 10, name: 'Phước', path: require('./asset/avatar10.png') },
    { id: 11, name: 'Ánh', path: 'https://img.pikbest.com/origin/09/19/03/61zpIkbEsTGjk.jpg!w700wp' }
];
allContact.sort((a, b) => a.name.localeCompare(b.name));

var alpha = [];
for (var i = 65; i <= 90; i++) {
    alpha.push(String.fromCharCode(i));
}

function ViewListFriend() {
    const [contacts, setContacts] = useState(allContact);
    const [sortNameOption, setSortNameOption] = useState('ins');
    const [selectedOptionLabel, setSelectedOptionLabel] = useState(0);
    const [textFilter, setTextFilter] = useState('');
    const [isOpenUserInfoModal, setIsOpenUserInfoModal] = useState(false);

    const labels = [
        { id: 0, label: 'Tất cả', value: 'all', color: 'gray' },
        { id: 1, label: 'Khách hàng', value: 'customer', color: 'red' },
        { id: 2, label: 'Gia đình', value: 'family', color: 'blue' },
        { id: 3, label: 'Công việc', value: 'work', color: 'green' },
        { id: 4, label: 'Bạn bè', value: 'friends', color: 'yellow' },
        { id: 5, label: 'Trả lời sau', value: 'reply-later', color: 'purple' },
        { id: 6, label: 'Đồng nghiệp', value: 'colleagues', color: 'orange' }
    ];
    useEffect(() => {
    }, []);

    function CharacterText({ text }) {
        return (
            <div className="text-base font-semibold pl-5 pt-8">{text}</div>
        )
    }

    function ListContact({ list }) {
        return list.map((item, index) => {
            return (
                <div key={item.id} className="flex flex-col" >
                    {(index === 0 || removeAccents(item.name[0]) !== removeAccents(list[index - 1].name[0])) && <CharacterText text={removeAccents(item.name[0])} />}
                    <div className="flex flex-col" >
                        <div className="flex flex-row w-full items-center blur-item-light cursor-pointer pl-5" onClick={() => {
                            alert('light');
                        }}>
                            <div className="img-avatar rounded-full bg-cover bg-center mr-4" style={{ backgroundImage: `url(${item.path})` }}></div>
                            <div className="w-full" >
                                <div className="flex flex-row items-center justify-between h-20">
                                    <p className="text-base font-semibold">{item.name}</p>
                                    <div className="w-8 h-8 m-4 flex justify-center items-center cursor-pointer blur-item-dark"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        <Menu as="div" className="relative flex items-center justify-center">
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
                                                                className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                                onClick={() => { setIsOpenUserInfoModal(true) }}
                                                            >
                                                                Xem thông tin
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                    <hr></hr>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                                onClick={() => { }}
                                                            >
                                                                Phân loại
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                                onClick={() => { }}
                                                            >
                                                                Đặt tên gợi nhớ
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                    <hr></hr>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm text-red-600`}
                                                                onClick={() => { }}
                                                            >
                                                                Chặn người này
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                    <hr></hr>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                                onClick={() => { }}
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
        }
        )
    }

    return (
        <div className="flex flex-1 flex-col">
            <div>
                <div className="flex flex-row h-16 items-center">
                    <div className="w-16">
                        <PiUserListLight className="w-7 h-7 mx-auto" />
                    </div>
                    <div className="font-semibold">
                        Danh sách bạn bè
                    </div>
                </div>
                <hr></hr>
                <div className="flex flex-1 bg-gray-100 scrollable-div flex-col min-h-[840px]" >
                    <div className="txt-contacts items-center " >
                        <p className="text-sm font-semibold ">Bạn bè ({contacts.length})</p>
                    </div>
                    <div className="bg-white view-bg self-center p-4">
                        <div className="flex flex-row w-full h-12 items-center flex-wrap mb-3">
                            <div className="flex items-center border-[1px] rounded border-gray-300 h-8 w-full lg:w-1/3 lg:max-w-96 mr-2 ">
                                <IoSearch className="w-4 h-4 m-1" color="gray" />
                                <input type="text" id="search-input" className="focus:outline-none w-full" placeholder="Tìm bạn" value={textFilter} onChange={(event) => {
                                    setTextFilter(event.target.value);
                                    document.getElementById('search-input').focus();
                                    let tmp = filterList(allContact, event.target.value);
                                    setContacts(tmp);
                                }} />
                            </div>
                            <div className="flex flex-row h-full justify-between items-center w-full lg:w-1/2 ">
                                <Menu as="div" className="relative inline-block text-left w-1/2 mr-2">
                                    <div>
                                        <Menu.Button className="flex items-center rounded bg-gray-200 h-8 w-full mr-2">
                                            <TbArrowsSort className="w-4 h-4 m-1" style={{ color: '#808080' }} />
                                            <p className="text-xs font-semibold text-black">{sortNameOption === 'ins' ? 'Tên (A-Z)' : 'Tên (Z-A)'}</p>
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
                                                            setSortNameOption('ins')
                                                            const sortedContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));
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
                                                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                        onClick={() => {
                                                            setSortNameOption('des')
                                                            const sortedContacts = [...contacts].sort((b, a) => a.name.localeCompare(b.name));
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
                                <Menu as="div" className="relative inline-block text-left w-1/2 mr-2 items-center">
                                    <div>
                                        <Menu.Button className="flex items-center rounded bg-gray-200 h-8 w-full">
                                            <LuFilter className="w-4 h-4 m-1" color="gray" />
                                            <p className="text-xs font-semibold text-black">{labels[selectedOptionLabel].label}</p>
                                            <FaChevronDown className="w-4 h-4 m-1 ml-auto" style={{ color: 'gray' }} />
                                        </Menu.Button>
                                    </div>
                                    <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-full">
                                        <div className="px-1 py-1">
                                            {labels.map(option => (
                                                <Menu.Item key={option.id}>
                                                    {({ active }) => (
                                                        <button
                                                            className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                            onClick={() => setSelectedOptionLabel(option.id)}
                                                        >
                                                            {/* {option.label} */}
                                                            <div className="flex flex-row items-center">
                                                                <div className="w-10">
                                                                    <MdLabel className="w-7 h-5" color={`${option.color}`} />
                                                                </div>
                                                                {option.label}
                                                            </div>
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Menu>
                            </div>
                        </div>
                        <ListContact list={contacts}></ListContact>
                        <UserInfoModal isOpen={isOpenUserInfoModal} setIsOpen={setIsOpenUserInfoModal} ></UserInfoModal>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ViewListFriend;