import React, { useState } from "react";
import OTPInput from "react-otp-input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";
import { handleVertifi } from "../../firebase/firebaseService";
export default function ForgotPassword() {
  const history = useNavigate();
  var [phone, setPhone] = useState("84346676956");
  var [contentButton, setContentButton] = useState("Gửi");
  var [otpVertifi, setOtpVertifi] = useState();

  var [isVertifi, setVertifi] = useState(false);
  var [otp, setOtp] = useState("");

  return (
    <div className="h-full w-1/2 mr-1 flex flex-col items-center pt-5 px-14 relative">
      <img
        src={require("./asset/snapedit_1705786829845.png")}
        className="h-36"
        alt="/"
      ></img>
      <h1 className="font-bold text-3xl">ĐĂNG NHẬP VỚI OPT</h1>
      <h4 className="text-gray-400 text-base font-medium">
        Chào mừng bạn đến với chúng tôi.
      </h4>
      <form className="h-full w-full flex flex-col justify-start mt-5">
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
        <div id="recaptcha"></div>

        {!isVertifi || (
          <>
            <label className="ml-2 font-medium  mr-5">Nhập mã OPT:</label>
            <div className="relative w-full flex flex-row justify-center items-end mb-5 mt-1 ">
              <OTPInput
                numInputs={6}
                value={otp}
                onChange={setOtp}
                inputStyle={{
                  height: 35,
                  width: 35,
                  fontSize: 20,
                  borderWidth: 1,
                  borderColor: "black",
                  textAlign: "center",
                }}
                renderSeparator={<span className="mx-1">-</span>}
                renderInput={(props) => <input {...props} />}
              />
            </div>
          </>
        )}
        <button
          onClick={async () => {
            if (!isVertifi) {
              await handleVertifi("+" + phone, "recaptcha").then((e) => {
                setOtpVertifi(e);
                setVertifi(true);
                setContentButton("Xác thực SMS");
              });
            } else {
              if (otp.length === 6) {
                await otpVertifi
                  .confirm(otp)
                  .then((result) => {
                    console.log(result.user.uid);
                    console.log(result.user.phoneNumber);
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              } else {
                console.log("a");
              }
            }
          }}
          type="button"
          className="min-h-10 w-full rounded-md mb-3 bg-[#1a8dcd] text-white font-bold"
        >
          {contentButton}
        </button>
        <p className="mb-5 text-center text-sm font-medium text-slate-500 mr-1">
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
          className=" min-h-10 w-full rounded-md mb-3 bg-slate-500 hover:bg-slate-700 text-white font-semibold"
        >
          Đăng nhập bằng mật khẩu
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
