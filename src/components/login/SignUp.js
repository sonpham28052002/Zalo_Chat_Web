import React from "react";
import { VscArrowLeft } from "react-icons/vsc";
import { Link } from "react-router-dom";

export default function SignUp() {
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

      <img
        src={require("./asset/snapedit_1705786829845.png")}
        className="h-36"
        alt="/"
      ></img>
      <h1 className="font-bold text-3xl">ĐĂNG NHẬP VỚI OPT</h1>
      <h4 className="text-gray-400 text-base font-medium">
        Chào mừng bạn đến với chúng tôi.
      </h4>
    </div>
  );
}
