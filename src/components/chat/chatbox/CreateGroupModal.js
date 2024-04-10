import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdClose } from "react-icons/io";
import { CiCamera } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { uploadFile } from "../../../services/Azure_Service";
import { useRef } from 'react';

export default function CreateGroupModal({ isOpen, setIsOpen }) {
    var user = useSelector((state) => state.data);
    var list = user.friendList;
    const [img, setImg] = useState(undefined);
    const [selectedFile, setSelectedFile] = useState(undefined);
    var nameRef = useRef(undefined);
    const [activeTab, setActiveTab] = useState("select");
    const [addSender, setAddSend] = useState([]);
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    function closeModal() {
        setIsOpen(false);
        // setImg(null);
        // setSelectedFile(null);
    }

    // function addToUniqueArray(newItem, actionType) {
    //     if (actionType === "add") {
    //         const exists = addSender.some((item) => item.user.id === newItem.user.id);
    //         if (!exists) {
    //             setAddSend([...addSender, newItem]);
    //         }
    //     } else if (actionType === "remove") {
    //         setAddSend(addSender.filter((item) => item.user.id !== newItem.user.id));
    //     }
    // }

    function FriendList({ list }) {
        return list.map((item, index) => {
            return (
                <div key={item.user.id} className="flex flex-col w-full blur-item-light cursor-pointer pl-5 h-10 justify-between">
                    <div className="flex flex-row items-center">
                        <input type="checkbox" name="type" value={item.user.id} className='m-3'
                            // onChange={(e) => {
                            //     if (e.target.checked) {
                            //         addToUniqueArray(item, "add");
                            //     } else {
                            //         addToUniqueArray(item, "remove");
                            //     }
                            // }}
                        />
                        <img className='rounded-full bg-cover w-8 h-8 mr-4' alt="User avatar" src={item.user.avt} onError={(e) => { e.target.onerror = null; e.target.src = "https://robohash.org/hnrgrjtx.png" }}></img>
                        <div>{item.user.userName}</div>
                    </div>
                </div>
            );
        });
    }

    const leftValue = `calc((100vw - 450px) / 2)`;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 right-0 bottom-0 bg-black z-50"
                        onClick={() => closeModal()}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        style={{
                            position: 'fixed',
                            top: '12%',
                            left: leftValue,
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'white',
                            padding: '1em',
                            borderRadius: '10px',
                            zIndex: 1000,
                        }}
                    >
                        <div className='flex flex-col h-[710px] w-[450px]'>
                            <div className='flex flex-col'>
                                <div className="pl-6 bg-white flex flex-row justify-between mb-2">
                                    <p className="font-medium">Tạo nhóm</p>

                                    <div className=" flex text-xl font-medium mr-2 justify-center items-center h-7 w-7 btn-close" onClick={() => {
                                        closeModal();
                                    }}>
                                        <IoMdClose />
                                    </div>
                                </div>
                                <div className='bg-gray-300 h-[1px]'></div>
                                <div className='flex flex-row pb-36 h-14 w-full justify-center items-center'>
                                    <div className="absolute top-16 w-28 h-28 border flex flex-row justify-center items-center rounded-full bg-slate-300 hover:bg-slate-400">
                                        <input
                                            type="file" accept=".jpg,.png"
                                            className="opacity-0 absolute inset-0 z-50 "
                                            onChange={async (e) => {
                                                if (e.target.files[0]) {
                                                    if (e.target.files[0].size > 10 * 1024 * 1024) {
                                                        alert("File quá lớn, vui lòng chọn file <10MB");
                                                        return;
                                                    }
                                                    setSelectedFile(e.target.files[0]);
                                                    let value = URL.createObjectURL(e.target.files[0]);
                                                    setImg(value);
                                                }
                                            }}
                                        />
                                        {img === null ? (
                                            <CiCamera className=" text-xl w-24 h-24 text-black" />
                                        ) : (
                                            <img src={img} className="w-28 h-28 rounded-full" alt="Your description" />
                                        )}
                                    </div>
                                </div>
                                <input ref={nameRef} type='text' className='w-full left-10 outline-none border-b border-gray-700 focus:border-blue-500' placeholder='Nhập tên nhóm' spellCheck="false"></input>

                                <div className="h-[100]  w-full">
                                    <div className="max-w-2xl mx-auto">
                                        <ul className="flex flex-wrap -mb-px" role="tablist">
                                            <li className="w-1/2 justify-center items-center text-center" role="presentation">
                                                <button
                                                    className={`inline-block justify-center items-center text-center  ${activeTab === "select"
                                                        ? "text-black border-gray-300 border-b-2"
                                                        : "text-gray-500"
                                                        } hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center ${activeTab === "select" ? "" : "active"
                                                        }`}
                                                    id="profile-tab"
                                                    onClick={() => handleTabClick("select")}
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="chat"
                                                    aria-selected={activeTab === "select"}
                                                >
                                                    Đã chọn
                                                </button>
                                            </li>
                                            <li className="w-1/2 justify-center items-center text-center" role="presentation">
                                                <button
                                                    className={`inline-block w-1/2 justify-center items-center text-center  ${activeTab === "friend"
                                                        ? "text-black border-gray-300 border-b-2"
                                                        : "text-gray-500"
                                                        } hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center ${activeTab === "all" ? "" : "active"
                                                        }`}
                                                    id="profile-tab"
                                                    onClick={() => handleTabClick("friend")}
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="chat"
                                                    aria-selected={activeTab === "friend"}
                                                >
                                                    Bạn bè
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* {activeTab==="select" ? (
                                    <FriendList className="scrollable-div h-[80px] overflow-auto" list={addSender} />
                                ) : (
                                    <FriendList className="scrollable-div h-[80px] overflow-auto" list={list} />
                                )} */}
                                <FriendList className="scrollable-div h-[80px] overflow-auto" list={addSender} />
                                

                                
                                <div className="flex flex-row justify-end h-10 w-full mt-10">
                                    <button className="btn-request btn-blur-gray rounded mr-5 text-center items-center justify-between" onClick={() => { closeModal() }}>
                                        <p className="font-semibold ">Hủy</p>
                                    </button>
                                    <button className="btn-request btn-blur-blue rounded" onClick={async () => {
                                        var array = []
                                        var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
                                        if (checkboxes.length < 2) {
                                            alert("Nhóm phải có ít nhất 3 người")
                                            return
                                        }
                                        if (nameRef.current.value === "") {
                                            alert("Tên nhóm không được để trống")
                                            return
                                        }
                                        const url = await uploadFile(selectedFile);
                                        for (var i = 0; i < checkboxes.length; i++) {
                                            array.push(checkboxes[i].value)
                                        }
                                        let group = {
                                            nameGroup: nameRef.current.value,
                                            members: array,
                                            avtGroup: url
                                        }
                                        console.log(group)
                                        closeModal()
                                    }}>
                                        <p className="font-semibold text-white" >Tạo nhóm</p>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}