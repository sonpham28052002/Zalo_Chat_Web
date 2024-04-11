import { changePassword } from "../../../services/Account_Service";
import { AnimatePresence, motion } from "framer-motion";
import {useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

export default function ChangePasswordModal({ isOpen, setIsOpen }) {
    const owner = useSelector((state) => state.data);
    const oldPasswordRef = useRef("");
    const newPasswordRef = useRef("");
    const [note, setNote] = useState("");

    const handleOldPassword = () => {
        const tmpPassword = oldPasswordRef.current.value;
        var regrex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;
        var res = regrex.test(tmpPassword);
        if (!res) {
            setNote("Mật khẩu phải từ 8 ký tự trở lên, gồm chữ thường, chữ hoa và số");
        } else
            setNote("");
    };

    const handleNewPassword = () => {
        const tmpPassword = newPasswordRef.current.value;
        var regrex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;
        var res = regrex.test(tmpPassword);
        if (!res) {
            setNote("Mật khẩu phải từ 8 ký tự trở lên, gồm chữ thường, chữ hoa và số");
        } else
            setNote("");
    };

    const handleRePassword = (rpw) => {
        const tmpPassword = newPasswordRef.current.value;
        if (tmpPassword !== rpw) {
            setNote("Mật khẩu không trùng khớp");
        } else setNote("");
    };

    const handleChangePassword = async () => {
        if (note.length > 0) {
            alert("Thông tin bạn nhập chưa hợp lệ, vui lòng thử lại!");
            return;
        }
        let rs = await changePassword(owner.phone, oldPasswordRef.current.value, newPasswordRef.current.value);
        if (rs) {
            alert("Thay đổi mật khẩu thành công");
            setNote("");
            setIsOpen(!isOpen);
        } else {
            alert("Mật khẩu cũ bạn nhập chưa đúng, vui lòng thử lại!");
            return;
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    onClick={() => {
                        setNote("");
                        setIsOpen(!isOpen);
                    }}
                    className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer "
                >
                    <motion.div
                        key={'ChangePasswordModal'}
                        initial={{ scale: 0, rotate: "45.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "-180deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-slate-300  rounded-lg w-full max-w-fit shadow-xl cursor-default relative overflow-hidden text-black"
                    >
                        <div className="z-10 w-96">
                            <div className="pl-6 h-9 bg-white flex flex-row items-center justify-between ">
                                <h1 className="font-medium">Thay đổi mật khẩu</h1>
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
                                        <label className="font-medium">Nhập mật khẩu cũ: </label>
                                        <input
                                            ref={oldPasswordRef}
                                            type="password"
                                            onBlur={() => {
                                                handleOldPassword();
                                            }}
                                            className="h-10 w-full rounded-md focus:outline-none border border-gray border-solid p-1"
                                        />
                                    </div>

                                    <div className="pb-3">
                                        <label className="font-medium">Nhập mật khẩu mới: </label>
                                        <input
                                            ref={newPasswordRef}
                                            type="password"
                                            onBlur={() => {
                                                handleNewPassword();
                                            }}
                                            className="h-10 w-full rounded-md focus:outline-none border border-gray border-solid p-1"
                                        />
                                    </div>

                                    <div className="pb-3">
                                        <label className="font-medium">Nhập lại mật khẩu mới: </label>
                                        <input
                                            type="password"
                                            onChange={(e) => {
                                                handleRePassword(e.target.value);
                                            }}
                                            className="h-10 w-full rounded-md focus:outline-none border border-gray border-solid p-1"
                                        />
                                    </div>
                                    <p className="" style={{ color: "red", fontWeight: "400" }}>
                                        {note}
                                    </p>

                                    <button className="h-10 w-24 bg-blue-600 text-white rounded-md mt-5 mb-5 hover:bg-blue-700 self-center"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            handleChangePassword();
                                        }}
                                    >
                                        Xác nhận
                                    </button>

                                </form>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence >
    );
}
