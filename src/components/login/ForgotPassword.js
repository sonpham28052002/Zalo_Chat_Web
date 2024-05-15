import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";

import { useNavigate } from "react-router-dom";
import AuthenticationOTP from "./AuthenticationOTP";
import { FaUnlockAlt } from "react-icons/fa";
import { forgotPasswordAccount } from "../../services/Account_Service";
import Loader from "../chat/custom/loader";

export default function ForgotPassword() {
  var [idUser, setIdUser] = useState(undefined);
  var [phone, setPhone] = useState("84123456789");
  var [isAuthened, setIsAuthened] = useState(false);
  var [password, setPassword] = useState("");
  var [rePassword, setRePassword] = useState("");
  var [isChanged, setIsChanged] = useState(false);
  var [isChanging, setIsChanging] = useState(false);

  var history = useNavigate();

  function changePassword() {
    if (password !== rePassword) {
      alert("Mật khẩu không trùng khớp nhau");
      return;
    } else {
      setIsChanging(true);
      forgotPasswordAccount(
        (data) => {
          console.log(data);
          if (data === true) {
            setIsChanged(true);
          } else {
            setIsChanged(false);
          }
        },
        idUser,
        rePassword
      );
      setIsChanging(false);
    }
  }

  var auThen = (data) => {
    if (data) {
      setIdUser(data);
      setIsAuthened(true);
    }
  };
  return (
    <div
      className="h-full w-1/2 mr-1 flex flex-col items-center pt-5 px-14 relative "
      style={{ WebkitUserSelect: "none" }}
    >
      <img
        src={require("./asset/snapedit_1705786829845.png")}
        className="h-36"
        alt="/"
      ></img>
      <h1 className="font-bold text-3xl">QUÊN MẬT KHẨU</h1>
      <h4 className="text-gray-400 text-center text-sm font-medium">
        Hãy cung cấp cho chúng tôi số điện thoại đã đăng ký tài khoản.
      </h4>
      {isChanged ? (
        <div className="w-full my-4">
          <p className="text-center text-xl text-green-600 font-medium">
            Bạn đã thay đổi thành mật khẩu thành công
          </p>
          <p className="text-center text-sm text-green-600 font-medium">
            Vui lòng sử dụng mật khẩu và số điện thoại vừa thay đổi hoặc các
            phương pháp đăng nhập khác để đăng nhập.
          </p>
        </div>
      ) : (
        <div className="w-full">
          {isAuthened ? (
            <div className="w-full mb-4">
              <div className="mt-2">
                <label className="ml-2 font-medium text-base">
                  Nhập mật khẩu mới:
                </label>
                <div className="relative w-full ">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <FaUnlockAlt className="text-lg" />
                  </div>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md  w-full ps-10 p-2.5 focus:outline-none focus:border-black"
                    placeholder="Nhập mật khẩu mới..."
                  />
                </div>
              </div>
              <div className="mt-2">
                <label className="ml-2 font-medium text-base">
                  Nhập lại mật khẩu mới:
                </label>
                <div className="relative w-full ">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <FaUnlockAlt className="text-lg" />
                  </div>
                  <input
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    type="password"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md  w-full ps-10 p-2.5 focus:outline-none focus:border-black"
                    placeholder="Nhập lại mật khẩu mới....."
                  />
                </div>
              </div>
              {password !== rePassword && (
                <p className="text-red-500 text-sm">
                  Mật khẩu không trùng khớp nhau
                </p>
              )}
              <button
                onClick={() => {
                  changePassword();
                }}
                type="button"
                className=" mt-4 min-h-10 w-full rounded-md  bg-[#1a8dcd] hover:bg-slate-700 active:bg-blue-300 text-white font-semibold"
              >
                {isChanging ? <Loader /> : "Thay đổi mật khẩu"}
              </button>
            </div>
          ) : (
            <AuthenticationOTP
              phone={phone}
              setPhone={setPhone}
              callback={auThen}
              isCheckExistUser={true}
            />
          )}
        </div>
      )}

      <button
        onClick={() => {
          history(-1);
        }}
        type="button"
        className=" min-h-10 w-full rounded-md mb-3 bg-slate-500 hover:bg-slate-700 text-white font-semibold"
      >
        Quay lại
      </button>
    </div>
  );
}
