import { useEffect, useRef, useState } from "react";
import { VscArrowLeft } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

export default function SignUpUserInfoForm() {
    const location = useLocation();
    var phone = location.state.phone;
    const id = location.state.id
    var [fullName, setFullName] = useState("");
    const dayRef = useRef(null);
    const monthRef = useRef(null);
    const yearRef = useRef(null);
    const [gender, setGender] = useState("");

    var history = useNavigate();
    //set default value for day, month, year(you can remove or change it)
    useEffect(() => {
        if (dayRef.current) {
            dayRef.current.value = "9";
        }
        if (monthRef.current) {
            monthRef.current.value = "2";
        }
        if (yearRef.current) {
            yearRef.current.value = "2002";
        }
    }, []);

    return (
        <div
            className="h-full w-1/2 mr-1 flex flex-col items-center pt-5 px-14 relative"
            style={{ WebkitUserSelect: "none" }}
        >
            <Link
                to={-1}
                className="flex flex-row pl-1 items-center absolute top-2 left-1 "
            >
                <VscArrowLeft className="text-xl mr-1" />
                <p className="font-medium">Quay lại</p>
            </Link>

            <p className="font-bold text-2xl text-center pt-8 pb-4">NHẬP THÔNG TIN CỦA BẠN</p>

            <form className="h-full w-full flex flex-col justify-start mt-5">
                <div className="pb-3">
                    <label className="font-medium">Số điện thoại: </label>
                    {/* <input type="text" readOnly={true} value={"+"} className="h-10 w-full rounded-md focus:outline-none border border-gray border-solid bg-gray-100 p-1"></input> */}
                    <input type="text" readOnly={true} value={"+" + phone} className="h-10 w-full rounded-md focus:outline-none border border-gray border-solid bg-gray-100 p-1"></input>

                </div>
                <div className="pb-3">
                    <label className="font-medium">Họ tên: </label>
                    <input
                        type="text"
                        onChange={(e) => setFullName(e.target.value)}
                        className="h-10 w-full rounded-md focus:outline-none border border-gray border-solid p-1"
                    />
                </div>

                <div className="pb-5">
                    <label className="font-medium">Ngày sinh: </label>
                    <div className="flex space-x-2">
                        <div>
                            <select ref={dayRef} defaultValue="" className="h-10 w-full rounded-md focus:outline-none border border-gray border-solid p-1">
                                <option value="" disabled>Ngày</option>
                                {/* {[...Array(31)].map((_, i) =>
                                    <option key={i} value={i + 1}>{i + 1}</option>
                                )} */}
                                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                                    <option key={day} value={day}>
                                        {day}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <select ref={monthRef} defaultValue="" className="h-10 w-full rounded-md focus:outline-none border border-gray border-solid p-1">
                                <option value="" disabled>Tháng</option>
                                {[...Array(12)].map((_, i) =>
                                    <option key={i} value={i + 1}>{i + 1}</option>
                                )}
                            </select>
                        </div>
                        <div>
                            <select ref={yearRef} defaultValue="" className="h-10 w-full rounded-md focus:outline-none border border-gray border-solid p-1">
                                <option value="" disabled>Năm</option>
                                {[...Array(new Date().getFullYear() - 1900 + 1)].map((_, i) =>
                                    <option key={i} value={new Date().getFullYear() - i}>{new Date().getFullYear() - i}</option>
                                )}
                            </select>
                        </div>
                    </div>

                </div>

                <div className="pb-5">
                    <label className="font-medium">Giới tính: </label>
                    <select defaultValue="" onChange={(e) => setGender(e.target.value)} className="h-10 rounded-md focus:outline-none border border-gray border-solid p-1">
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                </div>

                <button
                    onClick={async () => {
                        console.log(fullName);
                        const date = new Date(yearRef.current.value, monthRef.current.value - 1, dayRef.current.value);
                        const user = {
                            id:id,
                            phone: phone,
                            userName: fullName,
                            date: date,
                            gender: gender
                        };
                        console.log(user);
                        // history("/userform", { state: { phone } });

                    }}
                    type="button"
                    className="min-h-10 w-full rounded-md mb-3 bg-[#1a8dcd] text-white font-bold"
                >ĐĂNG KÝ
                </button>
            </form>
        </div>
    )
}