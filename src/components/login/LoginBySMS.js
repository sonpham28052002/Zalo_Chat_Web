import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAPI } from "../../redux_Toolkit/slices";
import AuthenticationOTP from "./AuthenticationOTP";
import Loader from "../chat/custom/loader";
export default function ForgotPassword() {
  const history = useNavigate();
  var [phone, setPhone] = useState("");
  var [isAuthened, setIsAuthened] = useState(false);
  var dispatch = useDispatch();

  var handleLogin = async (id) => {
    setIsAuthened(true);
    dispatch(getAPI(id));
    setIsAuthened(false);
    history("/home");
  };

  return (
    <div className="h-full w-1/2 mr-1 flex flex-col items-center pt-5 px-14 relative ">
      <img
        src={require("./asset/snapedit_1705786829845.png")}
        className="h-36"
        alt="/"
      ></img>
      <h1 className="font-bold  text-3xl h-14 text-center w-full	whitespace-nowrap overflow-hidden text-ellipsis">
        ĐĂNG NHẬP VỚI OPT
      </h1>
      <h4 className="text-gray-400 text-base text-center font-medium whitespace-nowrap overflow-hidden text-ellipsis w-full h-10">
        Chào mừng bạn đến với chúng tôi.
      </h4>
      {isAuthened ? (
        <Loader />
      ) : (
        <AuthenticationOTP
          phone={phone}
          setPhone={setPhone}
          callback={handleLogin}
          isCheckExistUser={true}
        />
      )}
      <p className="h-8 mb-1 text-center text-sm font-medium text-slate-500 mr-1 whitespace-nowrap overflow-hidden text-ellipsis w-full">
        Chưa có tài khoản nào trước đây.
        <Link to="/signup" className="hover:text-blue-700">
          Đăng ký ngay!
        </Link>
      </p>

      <button
        onClick={() => {
          history("/");
        }}
        type="button"
        className=" min-h-10 w-full rounded-md mb-3 bg-slate-500 hover:bg-slate-700 text-white font-semibold whitespace-nowrap overflow-hidden text-ellipsis "
      >
        Đăng nhập bằng mật khẩu
      </button>
      <button
        onClick={() => {
          history("/qr");
        }}
        type="button"
        className="min-h-10 w-full rounded-md mb-3 bg-slate-500 hover:bg-slate-700 text-white font-semibold whitespace-nowrap overflow-hidden text-ellipsis "
      >
        Đăng nhập bằng mã QR
      </button>
    </div>
  );
}
