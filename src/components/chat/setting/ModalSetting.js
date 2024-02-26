import { AnimatePresence, motion } from "framer-motion";
import { CiSettings } from "react-icons/ci";
import { IoMdClose, IoMdNotificationsOutline } from "react-icons/io";
import { IoOptionsOutline } from "react-icons/io5";
import { BiMessageRoundedDetail, BiEdit } from "react-icons/bi";

import { useState } from "react";
import Switchcomponent from "./switchcomponent";

const ModalSetting = ({ isOpen, setIsOpen }) => {
    var [indexSelect,setIndexSelect] = useState(0)
  var navData = [
    {
      id: 0,
      title: "Cài đặt chung",
      icon: <CiSettings className="mx-4 text-2xl" />,
    },
    {
      id: 1,
      title: "Giao diện",
      icon: <BiEdit className="mx-4 text-2xl" />,
    },
    {
      id: 2,
      title: "Thông báo",
      icon: <IoMdNotificationsOutline className="mx-4 text-2xl" />,
    },
    {
      id: 3,
      title: "Tin nhắn",
      icon: <BiMessageRoundedDetail className="mx-4 text-2xl" />,
    },
    {
      id: 4,
      title: "Tiện ích",
      icon: <IoOptionsOutline className="mx-4 text-2xl" />,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer "
        >
          <motion.div
            initial={{ scale: 0, rotate: "45.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "-180deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white  rounded-md w-full max-w-fit shadow-xl cursor-default relative overflow-hidden text-black"
          >
            <div className="h-14 text-2xl font-medium flex flex-row justify-between items-center">
              <div className="h-14 w-60 pl-5 flex flex-row items-center border-r">
                <p>Cài đặt</p>
              </div>
              <IoMdClose
                className="text-2xl font-medium mr-2 hover:text-red-600 "
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              />
            </div>
            <div className="z-10 min-h-96 w-max flex flex-row ">
              <div className="w-60 border-r pb-96 ">
                {navData.map((item) => (
                  <div className={`flex flex-row items-center h-12 hover:bg-gray-200 ${indexSelect === item.id?"bg-blue-200":""} `} key={item.id}
                  onClick={()=>{setIndexSelect(item.id)}}
                  >
                    {item.icon}
                    <p className="font-medium">{item.title}</p>
                  </div>
                ))}
              </div>
              <Switchcomponent value={indexSelect}/>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default ModalSetting;
