import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import PhoneInput from "react-phone-input-2";
import { getAccountByPhone } from "../../../services/Account_Service";
import { getUserById } from "../../../services/User_service";
import { useSelector } from "react-redux";
import { stompClient } from "../../../socket/socket";
export default function AddFriendModal({ isOpen, setIsOpen }) {
  let owner = useSelector((state) => state.data);
  var [phone, setPhone] = useState("84898168641");
  var [friend, setFriend] = useState(null);
  function closeModal() {
    let request = {
      id: owner.id,
      userName: owner.userName,
      avt: owner.avt,
      receiverId: friend?.id,
    };
    stompClient.send("/app/request-add-friend", {}, JSON.stringify(request));
    setIsOpen(false);
    // setImg(null);
    // setSelectedFile(null);
  }
  useEffect(() => {
    setFriend(null);
  }, []);
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
    console.log("element");
    console.log(owner);
    console.log(owner.friendRequests);
    for (let index = 0; index < owner.friendRequests.length; index++) {
      const element = owner.friendRequests[index];
      console.log(element.sender.id);
      console.log(friend.id);
      if (element.sender.id === friend.id) {
        return (
          <button
            className="w-full  btn-blur-gray rounded mr-5 text-center items-center justify-between h-10"
            onClick={() => {}}
          >
            <p className="font-semibold ">Chấp nhận lời mời kết bạn</p>
          </button>
        );
      } else if (element.receiver.id === friend.id) {
        return (
          <button
            className="w-full  btn-blur-gray rounded mr-5 text-center items-center justify-between h-10"
            onClick={() => {}}
          >
            <p className="font-semibold ">Đã gửi lời mời kết bạn.</p>
          </button>
        );
      }
    }
    for (let index = 0; index < owner.friendList.length; index++) {
      const element = owner.friendList[index];
      console.log(element.user.id);
      console.log(friend.id);
      if (element.user.id === friend.id) {
        return (
          <button
            className=" w-full btn-request rounded mr-5 text-center items-center justify-between h-10 bg-green-100"
            onClick={() => {}}
          >
            <p className="font-semibold text-green-500">Đã là bạn bè</p>
          </button>
        );
      }
    }

    return (
      <button
        className=" w-full btn-request btn-blur-gray rounded mr-5 text-center items-center justify-between h-10 "
        onClick={() => {
          closeModal();
        }}
      >
        <p className="font-semibold text-green-500">kết bạn</p>
      </button>
    );
  }

  function FriendView() {
    return (
      <div className="flex flex-col items-center justify-center -mt-5 h-fit w-full">
        <img
          alt="User Avatar"
          src={friend.avt}
          className="h-32 w-32 bg-white border rounded-full mt-10"
        />
        <div className="bg-white w-full mt-1 text-black px-12">
          <h1 className="font-semibold text-lg mb-2">Thông tin tài khoản</h1>
          <div className="h-6 px-1 w-full  flex flex-row items-center">
            <p className="w-28 text-sm font-sans  font-medium text-gray-400">
              Tên
            </p>
            <p className="w-fit font-sans text-sm">{friend.userName}</p>
          </div>

          <div className="h-6 px-1  flex flex-row items-center">
            <p className="w-28 text-sm font-sans  font-medium text-gray-400">
              Bio
            </p>
            <p className="w-fit font-sans text-sm">{friend.bio}</p>
          </div>
          <div className="h-6 px-1  flex flex-row items-center">
            <p className="w-28 text-sm font-sans  font-medium text-gray-400">
              Giới tính
            </p>
            <p className="w-fit font-sans text-sm">{friend.gender}</p>
          </div>
          <div className="h-6 px-1  flex flex-row items-center">
            <p className="w-28 text-sm font-sans  font-medium text-gray-400">
              Ngày sinh
            </p>
            <p className="w-fit font-sans text-sm">{friend.dob}</p>
          </div>
          <div className="h-6 px-1  flex flex-row items-center  ">
            <p className="w-28 text-sm font-sans  font-medium text-gray-400">
              Điện thoại
            </p>
            <p className="w-32 font-sans text-sm">+{friend.phone}</p>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center h-12 w-full mt-4 p-2 border-t  ">
          {checkFriend()}
        </div>
      </div>
    );
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
            onClick={() => {
              setIsOpen(false);
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            style={{
              position: "fixed",
              top: "18%",
              left: leftValue,
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "1em",
              borderRadius: "10px",
              zIndex: 1000,
            }}
          >
            <div className="flex flex-col min-h-[450px] h-fit w-[350px]">
              <div className="flex flex-col">
                <div className="pl-6 bg-white flex flex-row justify-between mb-2">
                  <p className="font-medium">Thêm bạn</p>

                  <div
                    className=" flex text-xl font-medium mr-2 justify-center items-center h-7 w-7 btn-close"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <IoMdClose />
                  </div>
                </div>
                <div className="bg-gray-300 h-[1px]"></div>
                <div className="flex flex-col h-20 border-b">
                  <p className="font-semibold w-40 my-1">Nhập Số điện thoại:</p>
                  <div className="w-full flex flex-row justify-around items-start">
                    <PhoneInput
                      country={"vn"}
                      value={phone}
                      onChange={setPhone}
                      className=" focus:border-black"
                      placeholder="xxx xxx xxx"
                      inputStyle={{
                        height: 36,
                        width: 260,
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
                    <button
                      className="btn-blur-blue rounded h-[34px] w-20 "
                      onClick={() => {
                        getUserByPhone();
                      }}
                    >
                      <p className="font-semibold text-white">Tìm</p>
                    </button>
                  </div>
                </div>

                {friend === null ? (
                  <div className="flex flex-col items-center justify-center h-40 w-full">
                    <p className="font-semibold text-center">
                      Nhập số điện thoại để tìm kiếm
                    </p>
                  </div>
                ) : friend === false ? (
                  <div className="flex flex-col items-center justify-center h-40 w-full">
                    <p className="font-semibold text-center">
                      Không tìm thấy người dùng
                    </p>
                  </div>
                ) : (
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
