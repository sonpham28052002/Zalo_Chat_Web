import { AnimatePresence, motion } from "framer-motion";
import { CiCamera, CiEdit } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

const UserInfoModal = ({ isOpen, setIsOpen, user }) => {
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
            className="bg-slate-300  rounded-lg w-full max-w-fit shadow-xl cursor-default relative overflow-hidden text-black"
          >
            <div className="z-10">
              <div className="pl-6 h-9 bg-white flex flex-row items-center justify-between ">
                <h1 className="font-medium">Thông tin tài khoản</h1>
                <IoMdClose
                  className="text-xl font-medium mr-2 hover:text-red-600"
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                />
              </div>
              <div className="m-0 h-52">
                <img
                  alt="#"
                  className="h-full min-w-96 bg-cover bg-repeat-x"
                  src={user.coverImage}
                />
              </div>
              <div>
                <div className="relative h-16 bg-white">
                  <img
                    alt="#"
                    className="absolute -top-5 left-3 h-20 w-20 rounded-full border-2"
                    src={user.avt}
                  />
                  <div className="absolute top-8 left-16 w-7 h-7 border flex flex-row items-center rounded-full justify-center bg-slate-300 hover:bg-slate-400">
                    <CiCamera className=" text-xl text-black" />
                  </div>
                  <div className="absolute left-28 top-3 text-xl text-black font-medium flex flex-row items-end">
                    <h1>{user.name}</h1>
                    <div className=" ml-1 rounded-full h-6 w-6 flex flex-row justify-center items-center hover:bg-slate-300">
                      <CiEdit className="text-xl" />
                    </div>
                  </div>
                </div>
                <div className="bg-white w-full mt-1 text-black px-4 pb-12 border-b border-gray-300">
                  <h1 className="font-semibold text-lg">Thông tin tài khoản</h1>
                  <div className="h-8 px-1  flex flex-row items-center">
                    <p className="w-28 text-sm font-sans  font-medium text-gray-400">
                      Bio
                    </p>
                    <p className="w-28 font-sans">{user.Bio}</p>
                  </div>
                  <div className="h-8 px-1  flex flex-row items-center">
                    <p className="w-28 text-sm font-sans  font-medium text-gray-400">
                      Giới tính
                    </p>
                    <p className="w-28 font-sans">{user.gender}</p>
                  </div>
                  <div className="h-8 px-1  flex flex-row items-center">
                    <p className="w-28 text-sm font-sans  font-medium text-gray-400">
                      Ngày sinh
                    </p>
                    <p className="w-28 font-sans">{new Date(user.DOB).toLocaleDateString()}</p>
                  </div>
                  <div className="h-8 px-1  flex flex-row items-center  ">
                    <p className="w-28 text-sm font-sans  font-medium text-gray-400">
                      Điện thoại
                    </p>
                    <p className="w-32 font-sans">+{user.phone}</p>
                  </div>
                </div>
                <div className="w-full bg-white py-2 px-4">
                  <button className="w-full h-8 rounded-md hover:bg-slate-200 flex flex-row items-center justify-center font-medium">
                    <CiEdit className="text-xl mr-1" /> Cập Nhật
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default UserInfoModal;
