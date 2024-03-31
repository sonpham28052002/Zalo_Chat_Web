import React, { useEffect, useRef, useState } from "react";
import OTPInput from "react-otp-input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";
import { handleVertifi } from "../../firebase/firebaseService";
import { useDispatch } from "react-redux";
import { getAPI } from "../../redux_Toolkit/slices";
import { handleGetValueCookie } from "../../services/Cookie_Service";
import Loader from "../chat/custom/loader";
import CountDownTimeLast from "./countDownTimeLast";
export default function ForgotPassword() {
  const history = useNavigate();
  var [phone, setPhone] = useState("84346676956");
  var [contentButton, setContentButton] = useState("Gửi");
  var [otpVertifi, setOtpVertifi] = useState();
  var buttonRef = useRef();

  var [isVertifi, setVertifi] = useState(false);
  var [otp, setOtp] = useState("");
  var [isload, setIsload] = useState(false);
  var [checkTime, setCheckTime] = useState(undefined);
  var [viewCountDown, setViewCountDown] = useState(false);

  var dispatch = useDispatch();

  useEffect(() => {
    checkTimeRequestOtp();
  }, []);

  function checkTimeRequestOtp() {
    handleGetValueCookie(
      "lastRequestOtp",
      (value) => {
        if (value.time) {
          var differenceInSeconds = Math.floor(
            (new Date() - new Date(value.time)) / 1000
          );
          console.log(differenceInSeconds);

          if (differenceInSeconds > 180) {
            setViewCountDown(false);
            setCheckTime(undefined);
          } else {
            buttonRef.current.disabled = true;
            setViewCountDown(true);
            setCheckTime(180 - differenceInSeconds);
          }
        }
      },
      () => {}
    );
  }

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
          ref={buttonRef}
          onClick={async () => {
            setIsload(true);
            if (contentButton === "Gửi") {
              await handleVertifi("+" + phone).then((e) => {
                if (e) {
                  setOtpVertifi(e);
                  setVertifi(true);
                  setContentButton("Xác thực SMS");
                }
                setIsload(false);
              });
              setTimeout(() => {
                setIsload(false);
              }, 5000);
            } else if (contentButton === "Xác thực SMS") {
              if (otp.length === 6) {
                setIsload(true);
                await otpVertifi
                  .confirm(otp)
                  .then(async (result) => {
                    await dispatch(getAPI(result.user.uid));
                    setIsload(false);
                    history("/home");
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
          {viewCountDown ? (
            <CountDownTimeLast
              timeCheck={checkTime}
              setView={() => {
                setViewCountDown(false);
                buttonRef.current.disabled = false;
              }}
            />
          ) : (
            <div>{isload ? <Loader /> : contentButton}</div>
          )}
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
