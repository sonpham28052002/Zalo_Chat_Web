import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationOTP from "./AuthenticationOTP";

export default function FormSignUp() {
  var [phone, setPhone] = useState();
  var history = useNavigate();
  var handleNextPageEnterPassword = (id) => {
    history("/signup/enterpassword", {
      state: { phone, id },
    });
  };
  return (
    <div
      className="h-full w-1/2 mr-1 flex flex-col items-center pt-5 px-14 relative"
      style={{ WebkitUserSelect: "none" }}
    >
      <img
        src={require("./asset/snapedit_1705786829845.png")}
        className="h-36"
        alt="/"
      ></img>
      <h1 className="font-bold text-3xl text-center">ĐĂNG KÝ TÀI KHOẢN</h1>
      <AuthenticationOTP
        phone={phone}
        setPhone={setPhone}
        callback={handleNextPageEnterPassword}
        isCheckExistUser={false}
      />
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
