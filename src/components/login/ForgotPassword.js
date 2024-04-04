import React, { useEffect, useRef, useState } from "react";
import OTPInput from "react-otp-input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { useNavigate } from "react-router-dom";
import { handleVertifi } from "../../firebase/firebaseService";
import { FaUnlockAlt } from "react-icons/fa";
import Loader from "../chat/custom/loader";
import {
  forgotPasswordAccount,
  getAccountByPhone,
} from "../../services/Account_Service";
import {
  handleGetValueCookie,
  handleSetValueCookie,
} from "../../services/Cookie_Service";
import CountDownTimeLast from "./countDownTimeLast";

export default function ForgotPassword() {
  var [phone, setPhone] = useState("84346676956");
  var [contentButton, setContentButton] = useState("Gửi");
  var [otpVertifi, setOtpVertifi] = useState();

  var [password, setPassword] = useState("");
  var [rePassword, setRePassword] = useState("");

  var [idAccount, setidAccount] = useState(undefined);
  var [otp, setOtp] = useState("");
  var [isload, setIsload] = useState(false);
  var history = useNavigate();
  var [checkUpdate, setCheckUpdate] = useState(true);
  var [notifi, setNotifi] = useState("");
  var [checkTime, setCheckTime] = useState(undefined);
  var [viewCountDown, setViewCountDown] = useState(false);

  var buttonRef = useRef();
  useEffect(() => {
    // checkTimeRequestOtp();
  }, []);

  function checkTimeRequestOtp() {
    handleGetValueCookie(
      "lastRequestOtp",
      (value) => {
        if (value.time) {
          console.log(value.time);
          var differenceInSeconds = Math.floor(
            (new Date() - new Date(value.time)) / 1000
          );
          console.log(differenceInSeconds);

          if (differenceInSeconds > 180) {
            setViewCountDown(false);
            setCheckTime(undefined);
          } else {
            setIsload(false);
            setViewCountDown(true);
            setCheckTime(180 - differenceInSeconds);
          }
        }
      },
      () => {}
    );
  }
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
      <h1 className="font-bold text-3xl">QUÊN MẬT KHẨU</h1>
      <h4 className="text-gray-400 text-center text-base font-medium">
        Hãy cung cấp cho chúng tôi số điện thoại đã đăng ký tài khoản.
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
        {!checkUpdate && <p className={` text-sm  text-red-700 `}>{notifi}</p>}
        {notifi === "Cập nhật mật khẩu thành công." && (
          <p className={`m-1 text-sm  text-green-500 `}>{notifi}</p>
        )}
        <div id="recaptcha"></div>
        {contentButton === "Xác thực SMS" && (
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
        {contentButton === "Cập nhật" && (
          <div className="mb-4">
            <label className="font-medium">Nhập mật khẩu mới:</label>
            <div className="relative w-full ">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <FaUnlockAlt className="text-lg" />
              </div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md  w-full ps-10 p-2.5 focus:outline-none focus:border-black"
                placeholder="mật khẩu"
              />
            </div>
            <label className="font-medium">Nhập lại mật khẩu mới:</label>
            <div className="relative w-full ">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <FaUnlockAlt className="text-lg" />
              </div>
              <input
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                type="password"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md  w-full ps-10 p-2.5 focus:outline-none focus:border-black"
                placeholder="mật khẩu"
              />
            </div>
          </div>
        )}
        <button
          ref={buttonRef}
          onClick={async () => {
            if (contentButton === "Cập nhật") {
              setIsload(true);
              if (password === rePassword) {
                forgotPasswordAccount(
                  (result) => {
                    if (result) {
                      console.log(result);
                      setNotifi("Cập nhật mật khẩu thành công.");
                      buttonRef.current.disabled = true;
                      // checkTimeRequestOtp();
                      setContentButton("Vui lòng quay lại đăng nhập.");
                      setIsload(false);
                    } else {
                      setCheckUpdate(false);
                      setNotifi("Mật khẩu cập nhật không thành công!!!");
                      setIsload(false);
                    }
                  },
                  idAccount,
                  password
                );
              } else {
                setCheckUpdate(false);
                setNotifi("Mật khẩu không khớp nhau vui lòng kiểm tra lại!!!");
                setIsload(true);
              }
            } else if (contentButton === "Gửi") {
              setOtp(undefined);
              setPassword("");
              setRePassword("");
              setIsload(true);
              // checkTimeRequestOtp();
              await getAccountByPhone(phone).then(async (res) => {
                console.log(res);
                if (res) {
                  await handleVertifi("+" + phone)
                    .then((e) => {
                      if (e) {
                        console.log("gửi");
                        setOtpVertifi(e);
                        setContentButton("Xác thực SMS");
                      } else {
                        console.log("no gửi");
                      }
                      setIsload(false);
                      handleSetValueCookie("lastRequestOtp", {
                        time: new Date(),
                      });
                    })
                    .catch((Error) => {
                      console.log(Error);
                    });
                } else {
                  alert("Số điện thoại chưa được đăng kí tài khoản");
                  setIsload(false);
                }
              });
              console.log("gửi");
            } else if (contentButton === "Xác thực SMS") {
              setIsload(true);
              if (otp.length === 6) {
                await otpVertifi
                  .confirm(otp)
                  .then((result) => {
                    setidAccount(result.user.uid);
                    console.log(result.user.uid);
                    setIsload(false);
                    setCheckUpdate(true);
                    setContentButton("Cập nhật");
                  })
                  .catch((e) => {
                    setCheckUpdate(false);
                    setNotifi("Mã OTP không đúng vui lòng kiểm tra lại!");
                    setIsload(false);
                  });
              } else {
                setCheckUpdate(false);
                setNotifi("Mã OTP phải đủ 6 số !");
                setIsload(false);
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
              }}
            />
          ) : (
            <div>{isload ? <Loader /> : contentButton}</div>
          )}
        </button>
        <button
          onClick={() => {
            history(-1);
          }}
          type="button"
          className=" min-h-10 w-full rounded-md mb-3 bg-slate-500 hover:bg-slate-700 text-white font-semibold"
        >
          Quay lại
        </button>
      </form>
    </div>
  );
}
