import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { getInfoUserById } from "../../../services/User_service";
import { useDispatch } from "react-redux";
import { putAPI } from "../../../redux_Toolkit/slices";

export default function UpdateInfoModal({ isOpen, setIsOpen }) {
  var [user, setUser] = useState(undefined);
  var owner = useSelector((state) => state.data);
  var [fullName, setFullName] = useState(owner.userName);
  var [note, setNote] = useState("");
  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);
  const [gender, setGender] = useState(owner.gender);
  const dispatch = useDispatch();
  const updateUser = (newUserInfo) => {
    dispatch(putAPI(newUserInfo));
  };

  useEffect(() => {
    getInfoUserById(owner.id, setUser);
    if (typeof user == "undefined") {
      return;
    }
    const [year, month, day] = user.dob.split("-");
    if (dayRef.current) {
      dayRef.current.value = parseInt(day, 10);
    }
    if (monthRef.current) {
      monthRef.current.value = parseInt(month, 10);
    }
    if (yearRef.current) {
      yearRef.current.value = year;
    }
  }, [isOpen, owner, user]);
  return (
    <AnimatePresence>
      {isOpen && typeof user !== "undefined" && (
        <motion.div
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer "
        >
          <motion.div
            key={"UpdateInfoModal"}
            initial={{ scale: 0, rotate: "45.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "-180deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-300  rounded-lg w-full max-w-fit shadow-xl cursor-default relative overflow-hidden text-black"
          >
            <div className="z-10 w-96">
              <div className="pl-6 h-9 bg-white flex flex-row items-center justify-between ">
                <h1 className="font-medium">Cập nhật thông tin cá nhân</h1>
                <IoMdClose
                  className="text-xl font-medium mr-2 hover:text-red-600"
                  onClick={() => {
                    setNote("");
                    setIsOpen(!isOpen);
                  }}
                />
              </div>
              <hr></hr>
              <div className="h-full w-96 mr-1 flex flex-col items-center px-14 relative bg-white">
                <form className="h-full w-full flex flex-col justify-start mt-5">
                  <div className="pb-3">
                    <label className="font-medium">Họ tên: </label>
                    <input
                      defaultValue={user.userName}
                      type="text"
                      onBlur={(e) => {
                        var fullname = e.target.value;
                        if (fullname.length === 0) {
                          setNote("Họ tên không được để trống");
                          return;
                        }
                        setNote("");
                        setFullName(e.target.value);
                      }}
                      className="h-10 w-full rounded-md focus:outline-none border border-gray border-solid p-1"
                    />
                    <p className="" style={{ color: "red", fontWeight: "400" }}>
                      {note}
                    </p>
                  </div>

                  <div className="pb-5">
                    <label className="font-medium">Ngày sinh: </label>
                    <div className="flex space-x-2">
                      <div>
                        <select
                          ref={dayRef}
                          defaultValue=""
                          className="h-10 w-full rounded-md focus:outline-none border border-gray border-solid p-1"
                        >
                          <option value="" disabled>
                            Ngày
                          </option>
                          {Array.from({ length: 31 }, (_, i) => i + 1).map(
                            (day) => (
                              <option key={day} value={day}>
                                {day}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div>
                        <select
                          ref={monthRef}
                          defaultValue=""
                          className="h-10 w-full rounded-md focus:outline-none border border-gray border-solid p-1"
                        >
                          <option value="" disabled>
                            Tháng
                          </option>
                          {[...Array(12)].map((_, i) => (
                            <option key={i} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <select
                          ref={yearRef}
                          defaultValue=""
                          className="h-10 w-full rounded-md focus:outline-none border border-gray border-solid p-1"
                        >
                          <option value="" disabled>
                            Năm
                          </option>
                          {[...Array(new Date().getFullYear() - 1900 + 1)].map(
                            (_, i) => (
                              <option
                                key={i}
                                value={new Date().getFullYear() - i}
                              >
                                {new Date().getFullYear() - i}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="pb-5">
                    <label className="font-medium">Giới tính: </label>
                    <select
                      value={user.gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="h-10 rounded-md focus:outline-none border border-gray border-solid p-1"
                    >
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>

                  <button
                    onClick={async () => {
                      if (fullName.length === 0) {
                        setNote("Họ tên không được để trống");
                        return;
                      }
                      const date = new Date(
                        yearRef.current.value,
                        monthRef.current.value - 1,
                        parseInt(dayRef.current.value, 10) + 1
                      );
                      let formattedDob = date.toISOString().split("T")[0];
                      let infoUpdateUser = { ...owner };
                      infoUpdateUser.userName = fullName;
                      infoUpdateUser.dob = formattedDob;
                      infoUpdateUser.gender = gender;
                      try {
                        updateUser(infoUpdateUser);
                        getInfoUserById(owner.id, setUser);
                      } catch (error) {
                        alert("Thao tác thất bại, vui lòng thử lại sau");
                      }
                      setIsOpen(!isOpen);
                    }}
                    type="button"
                    className="min-h-10 w-full rounded-md mb-3 bg-[#1a8dcd] text-white font-bold"
                  >
                    CẬP NHẬT
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
