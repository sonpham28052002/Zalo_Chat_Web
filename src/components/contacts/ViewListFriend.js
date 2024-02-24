import { PiUserListFill } from "react-icons/pi";
import { MdOutlineMoreHoriz } from "react-icons/md";
import './style.css';
import { IoSearch } from "react-icons/io5";
import { TbArrowsSort } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa6";
import { LuFilter } from "react-icons/lu";
import React from "react";

function ViewListFriend() {
    const contacts = [
        { id: 1, name: 'An', path: require('./asset/avatar1.png') },
        { id: 2, name: 'Cường', path: require('./asset/avatar2.png') },
        { id: 3, name: 'Nam', path: require('./asset/avatar3.png') },
        { id: 4, name: 'Hoa ', path: require('./asset/avatar4.png') },
        { id: 5, name: 'Lan', path: require('./asset/avatar5.png') },
        { id: 6, name: 'Nho', path: require('./asset/avatar6.png') },
        { id: 7, name: 'Thịnh ', path: require('./asset/avatar7.png') },
        { id: 8, name: 'Kiên', path: require('./asset/avatar8.png') },
        { id: 9, name: 'Phú Quý', path: require('./asset/avatar9.png') },
        { id: 10, name: 'Phước', path: require('./asset/avatar10.png') },
        { id: 11, name: 'Ân', path: 'https://img.pikbest.com/origin/09/19/03/61zpIkbEsTGjk.jpg!w700wp' }
    ];
    contacts.sort((a, b) => a.name.localeCompare(b.name));


    function ListContact({ list }) {
        return (
            <div className="bg-white view-bg self-center p-4">
                <div className="flex flex-row w-full h-12 items-center flex-wrap">
                    <div className="flex items-center border-[1px] rounded border-gray-300 h-8 w-full lg:w-1/3 lg:max-w-96 mr-2 ">
                        <IoSearch className="w-4 h-4 m-1" color="gray" />
                        <input type="text" placeholder="Tìm bạn" className="focus:outline-none w-full" />

                    </div>

                    <div className="flex flex-row h-full justify-between items-center w-full lg:w-1/2 ">
                        <button className="flex items-center rounded bg-gray-200 h-8 w-1/2 mr-2">
                            <TbArrowsSort className="w-4 h-4 m-1"  style={{ color: '#808080' }}/>
                            <p className="text-xs font-semibold text-black-00">Tên (A-Z)</p>
                            <FaChevronDown className="w-4 h-4 m-1 ml-auto" color="gray" />
                        </button>

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
                                <p className="text-lg font-semibold">{item.name}</p>
                                <button className="w-8 h-8 m-4 flex justify-center items-center blur-item-dark"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // alert('dark');
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
            <div>
                <div className="flex flex-row h-16 items-center">
                    <div className="w-16">
                        <PiUserListFill className="w-7 h-7 mx-auto" />
                    </div>
                    <div className="font-semibold">
                        Danh sách bạn bè
                    </div>
                </div>
                <hr></hr>
                <div className="flex flex-1  bg-gray-100 scrollable-div flex-col" >
                    <div className="txt-contacts items-center " >
                        <p className="text-base font-semibold ">Bạn bè ({contacts.length})</p>
                    </div>
                    <ListContact list={contacts} />
                </div>
            </div>
        </div>
    )
}

export default ViewListFriend;