import React, { useState } from "react";
import OTPInput from "react-otp-input";
import PhoneInput from "react-phone-input-2";
import Loader from "../chat/custom/loader";
import { getAccountByPhone } from "../../services/Account_Service";
import { handleVertifi } from "../../firebase/firebaseService";
import CountDownTime from "./CountDownTime";

export default function AuthenticationOTP({
  phone,
  setPhone,
  callback,
  isCheckExistUser,
}) {
  var [otp, setOtp] = useState("");
  var [otpVertifi, setOtpVertifi] = useState(undefined);
  var [isloadSendOTP, setIsloadSendOTP] = useState(true);
  var [isloadVertifi, setIsloadVertifi] = useState(true);

  var [isCountDown, setIsCountDown] = useState(false);
  var [contentButton, setContentButton] = useState("Gửi mã");

  async function sendOpt() {
    if (phone !== "" && phone !== undefined && phone !== "84") {
      if (isCheckExistUser) {
        setIsloadSendOTP(false);
        setOtp(undefined);
        await getAccountByPhone(phone).then(async (res) => {
          if (res) {
            await handleVertifi("+" + phone)
              .then((e) => {
                if (e) {
                  console.log("gửi");
                  setOtpVertifi(e);
                  setIsCountDown(true);
                  setContentButton("Gửi lại mã");
                  setIsloadSendOTP(true);
                } else {
                  console.log("no gửi");
                }
              })
              .catch((Error) => {
                console.log(Error);
              });
          } else {
            alert("Số điện thoại chưa được đăng kí tài khoản");
            setIsloadSendOTP(true);
          }
        });
      } else {
        await getAccountByPhone(phone).then(async (res) => {
          if (!res) {
            await handleVertifi("+" + phone)
              .then((e) => {
                if (e) {
                  console.log("gửi");
                  setOtpVertifi(e);
                  setIsCountDown(true);
                  setContentButton("Gửi lại mã");
                  setIsloadSendOTP(true);
                } else {
                  console.log("no gửi");
                }
              })
              .catch((Error) => {
                console.log(Error);
              });
          } else {
            alert("Số điện thoại đã được đăng kí tài khoản");
            setIsloadSendOTP(true);
          }
        });
      }
    } else {
      alert("Vui lòng nhập số điện thoại");
    }
  }
  async function vertifiOTP() {
    if (otp.length === 6) {
      setIsloadVertifi(true);
      await otpVertifi
        .confirm(otp)
        .then(async (result) => {
          await callback(result.user.uid);
        })
        .catch((e) => {
          alert("Mã OTP không đúng");
        });
    } else {
      alert("Vui lòng nhập OTP đủ 6 số");
    }
  }

  return (
    <div className="w-full mt-2">
      <label className=" text-base ml-2 font-medium">Số điện thoại:</label>
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
      {otpVertifi && (
        <div>
          <label className=" text-sm ml-2 font-medium  mr-5">
            Nhập mã OPT:
          </label>
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
          <button
            onClick={async () => {
              await vertifiOTP();
            }}
            type="button"
            className="min-h-10 w-full active:bg-blue-300 rounded-md mb-3 bg-[#1a8dcd] text-white font-bold"
          >
            <div>{isloadVertifi ? "Xác thực" : <Loader />}</div>
          </button>
        </div>
      )}

      <button
        onClick={async () => {
          await sendOpt();
        }}
        type="button"
        disabled={isCountDown}
        className={` ${
          isCountDown ? "bg-gray-300" : "active:bg-blue-300"
        } min-h-10 w-full  rounded-md mb-3 bg-[#1a8dcd] text-white font-bold`}
      >
        {!isCountDown ? (
          <div>{isloadSendOTP ? contentButton : <Loader />}</div>
        ) : (
          <CountDownTime setIsCountDown={setIsCountDown} />
        )}
      </button>
    </div>
  );
}
