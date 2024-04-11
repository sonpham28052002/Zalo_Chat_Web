import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdClose } from "react-icons/io";
import PhoneInput from "react-phone-input-2";
import { getAccountByPhone } from '../../../services/Account_Service';
import { getUserById } from '../../../services/User_service';
import { useSelector } from 'react-redux';

export default function AddFriendModal({ isOpen, setIsOpen }) {
    let owner = useSelector((state) => state.data);
    var [phone, setPhone] = useState(null);
    var [friend, setFriend] = useState(null);
    function closeModal() {
        setIsOpen(false);
        // setImg(null);
        // setSelectedFile(null);
    }
    const leftValue = `calc((100vw - 350px) / 2)`;

    async function getUserByPhone() {
        let account = await getAccountByPhone(phone);
        if (!account) {
            setFriend(false);
            return;
        }
        let user = await getUserById(account.id);
        setFriend(user);
        return;
    }

    function checkFriend() {
        const friendExists = owner.friendList.some(friendItem => friendItem.user.id === friend.id);
        if (friendExists)
            return true;
        return false;
    }

    function FriendView() {
        return (
            <div className="flex flex-col items-center justify-center h-60 w-full">
                <img alt="User Avatar" src={friend.avt} className="h-32 w-32 rounded-full mt-10" />                
                <div className="bg-white w-full mt-1 text-black px-12">
                    <h1 className="font-semibold text-lg mb-2">Thông tin tài khoản</h1>
                    <div className="h-6 px-1  flex flex-row items-center">
                        <p className="w-28 text-sm font-sans  font-medium text-gray-400">
                            Tên
                        </p>
                        <p className="w-28 font-sans text-sm">{friend.userName}</p>
                    </div>

                    <div className="h-6 px-1  flex flex-row items-center">
                        <p className="w-28 text-sm font-sans  font-medium text-gray-400">
                            Bio
                        </p>
                        <p className="w-28 font-sans text-sm">{friend.bio}</p>
                    </div>
                    <div className="h-6 px-1  flex flex-row items-center">
                        <p className="w-28 text-sm font-sans  font-medium text-gray-400">
                            Giới tính
                        </p>
                        <p className="w-28 font-sans text-sm">{friend.gender}</p>
                    </div>
                    <div className="h-6 px-1  flex flex-row items-center">
                        <p className="w-28 text-sm font-sans  font-medium text-gray-400">
                            Ngày sinh
                        </p>
                        <p className="w-28 font-sans text-sm">{friend.dob}</p>
                    </div>
                    <div className="h-6 px-1  flex flex-row items-center  ">
                        <p className="w-28 text-sm font-sans  font-medium text-gray-400">
                            Điện thoại
                        </p>
                        <p className="w-32 font-sans text-sm">+{friend.phone}</p>
                    </div>
                </div>

                <div className='flex flex-row h-12 w-2/3 mt-4 '>
                    {checkFriend()
                        ?
                        <button className="btn-request rounded mr-5 text-center items-center justify-between h-10 bg-green-100">
                            <p className="font-semibold text-green-500">Đã là bạn bè</p>
                        </button>
                        :
                        <button className="btn-request btn-blur-gray rounded mr-5 text-center items-center justify-between h-10" onClick={() => { closeModal() }}>
                            <p className="font-semibold ">Kết bạn</p>
                        </button>
                    }
                    <button className=' btn-request rounded btn-add-friend h-10' onClick={() => checkFriend()}>
                        <p className="font-semibold ">Nhắn tin</p>
                    </button>
                </div>
            </div>
        )

    }

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
                            top: '18%',
                            left: leftValue,
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'white',
                            padding: '1em',
                            borderRadius: '10px',
                            zIndex: 1000,
                        }}
                    >
                        <div className='flex flex-col h-[450px] w-[350px]'>
                            <div className='flex flex-col'>
                                <div className="pl-6 bg-white flex flex-row justify-between mb-2">
                                    <p className="font-medium">Thêm bạn</p>

                                    <div className=" flex text-xl font-medium mr-2 justify-center items-center h-7 w-7 btn-close" onClick={() => {
                                        closeModal();
                                    }}>
                                        <IoMdClose />
                                    </div>
                                </div>
                                <div className='bg-gray-300 h-[1px]'></div>
                                <div className='flex flex-row justify-center items-center h-24' >
                                    <p className="font-semibold w-40">Nhập SĐT:</p>
                                    <PhoneInput
                                        country={"vn"}
                                        value={phone}
                                        onChange={setPhone}
                                        className="mb-2 focus:border-black"
                                        placeholder="xxx xxx xxx"
                                        inputStyle={{
                                            height: 20,
                                            width: 180,
                                            fontWeight: "500",
                                            borderRadius: 6,
                                            paddingTop: 18,
                                            paddingBottom: 15,
                                        }}
                                        buttonStyle={{
                                            borderBottomLeftRadius: 6,
                                            borderTopLeftRadius: 6,
                                        }}
                                    />
                                    <button className="btn-blur-blue rounded h-8 w-20 mr-5" >
                                        <p className="font-semibold text-white" onClick={() => { getUserByPhone() }}>Tìm</p>
                                    </button>
                                </div>


                                {friend === null ? (
                                    <div className="flex flex-col items-center justify-center h-40 w-full">
                                        <p className="font-semibold text-center">Nhập số điện thoại để tìm kiếm</p>
                                    </div>
                                ) :
                                    (friend === false ?
                                        <div className="flex flex-col items-center justify-center h-40 w-full">
                                            <p className="font-semibold text-center">Không tìm thấy người dùng</p>
                                        </div>
                                        :
                                        FriendView(friend)
                                    )}
                            </div>
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}