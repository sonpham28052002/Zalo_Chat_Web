import React, { useState } from "react";
import OTPInput from "react-otp-input";
import PhoneInput from "react-phone-input-2";
import { handleVertifi } from "../../firebase/firebaseService";
import { useNavigate } from "react-router-dom";
import { VscArrowLeft } from "react-icons/vsc";
import { Link } from "react-router-dom";
export default function FormSignUp() {
  var [phone, setPhone] = useState("84379046321");
  var [otpVertifi, setOtpVertifi] = useState();
  var [isVertifi, setVertifi] = useState(false);
  var [otp, setOtp] = useState("");
  var [contentButton, setContentButton] = useState("Gửi");
  var history = useNavigate();

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
      <h1 className="font-bold text-3xl text-center">ĐĂNG Ký VỚI OPT</h1>
      <div className="h-full w-full flex flex-col justify-start mt-5">
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
            if (contentButton === "Gửi") {
              await handleVertifi("+" + phone, "recaptcha")
                .then((e) => {
                  if (e) {
                    setOtpVertifi(e);
                    setVertifi(true);
                    setContentButton("Xác thực SMS");
                  }
                })
                .catch((Error) => {
                  console.log(Error);
                });
            } else if (contentButton === "Xác thực SMS") {
              if (otp.length === 6) {
                await otpVertifi
                  .confirm(otp)
                  .then((result) => {
                    if (result) {
                      const id = result.user.uid;
                      history("/signup/enterpassword", {
                        state: { phone, id },
                      });
                    } else {
                      alert("Mã OTP không hợp lệ");
                    }
                  })
                  .catch((e) => {
                    alert("Mã OTP không hợp lệ");
                  });
              } else {
                alert("Mã OTP không hợp lệ");
              }
            }
          }}
          type="button"
          className="min-h-10 w-full rounded-md mb-3 bg-[#1a8dcd] text-white font-bold"
        >
          {contentButton}
        </button>
      </div>
    </div>
  );
}
