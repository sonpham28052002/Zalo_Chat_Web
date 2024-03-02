import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaUnlockAlt } from "react-icons/fa";
import Loader from "../chat/custom/loader.js";
import { Link, useNavigate } from "react-router-dom";
import { getAccount } from "../../services/Account_Service.js";
import { handleSetValueCookie } from "../../services/Cookie_Service.js";

export default function LoginByNumberPhone() {
  const history = useNavigate();
  var [phone, setPhone] = useState(undefined);
  var [password, setPassword] = useState(undefined);
  var [isLoading, setIsLoading] = useState(false);

  var handleLoginWithPhoneAnhPassword = (phone, password) => {
    phone = "+" + phone;
    setIsLoading(true);

    getAccount(
      (data, loading) => {
        console.log("data");
        console.log(data);
        handleSetValueCookie(data);
        setIsLoading(false);
      },
      phone,
      password
    );
  };

  return (
    <div className="h-full w-1/2 mr-1 flex flex-col items-center pt-5 px-14 relative">
      <img
        src={require("./asset/snapedit_1705786829845.png")}
        className="h-36"
        alt="/"
      ></img>
      <h1 className="font-bold text-3xl">ĐĂNG NHẬP</h1>
      <h4 className="text-gray-400 text-base font-medium">
        Chào mừng bạn đến với chúng tôi.
      </h4>
      <form className="h-full w-full flex flex-col justify-center">
        <label className="ml-2 font-medium">Số điện thoại:</label>
        <PhoneInput
          country={"vn"}
          value={phone}
          onChange={setPhone}
          className="mb-2 focus:border-black"
          placeholder="xxx xxx xxx"
          inputStyle={{
            height: 20,
            width: "100%",
            fontWeight: "500",
            borderRadius: 6,
            paddingTop: 20,
            paddingBottom: 20,
          }}
          buttonStyle={{
            borderBottomLeftRadius: 6,
            borderTopLeftRadius: 6,
          }}
        />
        <label className="ml-2 font-medium">Mật khẩu:</label>
        <div className="relative w-full ">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <FaUnlockAlt className="text-lg" />
          </div>
          <input
            // value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md  w-full ps-10 p-2.5 focus:outline-none focus:border-black"
            placeholder="mật khẩu"
          />
        </div>

        <div className="flex flex-row justify-end items-center h-8 px-2">
          <Link
            className="text-sm font-medium text-slate-400 hover:decoration-solid hover:border-slate-400 border-b border-white hover:text-blue-700"
            to="/forgot"
          >
            Quên mật khẩu?
          </Link>
        </div>
        <button
          onClick={() => {
            handleLoginWithPhoneAnhPassword(phone, password);
          }}
          type="button"
          className="min-h-10 w-full rounded-md mb-3 bg-[#1a8dcd] text-white font-bold"
        >
          {isLoading ? <Loader /> : "Đăng nhập"}
        </button>
        <p className="mb-5 text-center text-sm font-medium text-slate-500 mr-1">
          Chưa có tài khoản nào trước đây.{" "}
          <Link to="/signup" className="hover:text-blue-700">
            Đăng ký ngay!
          </Link>
        </p>

        <button
          onClick={() => {
            history("/SMS");
          }}
          type="button"
          className=" min-h-10 w-full rounded-md mb-3 bg-slate-500 hover:bg-slate-700 text-white font-semibold"
        >
          Đăng nhập bằng thiết bị di động
        </button>
        <button
          onClick={() => {
            history("/qr");
          }}
          type="button"
          className="min-h-10 w-full rounded-md mb-3 bg-slate-500 hover:bg-slate-700 text-white font-semibold"
        >
          Đăng nhập bằng mã QR
        </button>
      </form>
    </div>
  );
}
