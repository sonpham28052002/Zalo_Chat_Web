import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { registerAccount } from "../../services/Account_Service";

export default function SignUpPasswordForm() {
  const location = useLocation();
  const history = useNavigate();
  const phone = location.state.phone;
  const id = location.state.id;
  // const phone = "0379046329";
  // const id = "16";
  // eslint-disable-next-line
  var [rePassword, setRePassword] = useState("");
  var [note, setNote] = useState("");
  const passwordRef = useRef(null);

  const handleEnterPassword = () => {
    const tmpPassword = passwordRef.current.value;
    var regrex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;
    var res = regrex.test(tmpPassword);
    if (!res)
      setNote(
        "Mật khẩu phải từ 8 ký tự trở lên, gồm chữ thường, chữ hoa và số"
      );
    else setNote("");
  };

  const handleRePassword = (rpw) => {
    const tmpPassword = passwordRef.current.value;
    setRePassword(rpw);
    if (tmpPassword !== rpw) setNote("Mật khẩu không trùng khớp");
    else setNote("");
  };

  const handleSignUpAccount = async () => {
    if (note.length > 0) {
      alert("Mật khẩu không hợp lệ, vui lòng thử lại!");
      return;
    }
    const account = {
      id: id,
      phone: phone,
      password: passwordRef.current.value,
      createDate: new Date(),
    };
    console.log(account);
    registerAccount(account)
      .then((responseData) => {
        console.log("Account registered successfully:", responseData);
        history("/signup/userform", { state: { phone, id } });
      })
      .catch((error) => {
        console.error("Failed to register account:", error);
      });
  };

  return (
    <div className="h-full w-1/2 mr-1 flex flex-col items-center pt-5 px-14 relative">
      <img
        src={require("./asset/snapedit_1705786829845.png")}
        className="h-36"
        alt="/"
      ></img>
      <h1 className="font-bold text-3xl text-center pb-7">NHẬP MẬT KHẨU</h1>
      <div className="w-full flex flex-col justify-center">
        <div className="pb-3">
          <label className="font-medium">Nhập mật khẩu: </label>
          <input
            ref={passwordRef}
            placeholder="Nhập mật khẩu"
            type="password"
            onBlur={() => {
              handleEnterPassword();
            }}
            className="h-10 w-full rounded-md focus:outline-none border border-gray border-solid p-1"
          />
        </div>
        <div className="pb-3">
          <label className="font-medium">Nhập lại mật khẩu: </label>
          <input
            placeholder="Nhập lại mật khẩu"
            type="password"
            onChange={(e) => {
              handleRePassword(e.target.value);
            }}
            className="h-10 w-full rounded-md focus:outline-none border border-gray border-solid p-1"
          />
          <p className="" style={{ color: "red", fontWeight: "400" }}>
            {note}
          </p>
        </div>
        <button
          onClick={() => {
            handleSignUpAccount();
          }}
          className="bg-blue-500 text-white font-bold rounded-md h-10 w-full"
        >
          Xác nhận mật khẩu
        </button>
        <button
          onClick={() => {
            history("/");
          }}
          type="button"
          className=" mt-2 min-h-10 w-full rounded-md mb-3 bg-slate-500 hover:bg-slate-700 text-white font-semibold"
        >
          Huỷ đăng ký
        </button>
      </div>
    </div>
  );
}
