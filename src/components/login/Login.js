import { useState } from "react";
import { Link } from "react-router-dom";
import Backgroud from "./backgroud";
import LoginRouter from "../../router/LoginRouter";
function Login() {
  var [isSelect, setSelect] = useState(true);

  return (
    <div className="App" style={{ height: 894, width: 1898 }}>
      <header className="App-header" style={{ height: 894, width: 1898 }}>
        <div className=" h-full w-full bg-transparent select-none absolute flex flex-col items-center pt-14 ">
          <img src={require("./asset/zlogo.png")} alt="" className="h-10"></img>
          <h2 className="font-semibol text-center mt-5">
            Đăng nhập tài khoản Zalo
            <br />
            để kết nối với ứng dụng Zalo Web
          </h2>
          <div className="mt-5 w-1/5  max-h-max  shadow-2xl bg-white ">
            <ul className="flex justify-center items-center h-max text-sm border-b">
              <li key={0} className="w-1/2" onClick={() => setSelect(true)}>
                <Link
                  className={`${
                    isSelect
                      ? "font-bold border-b border-slate-500 text-slate-950"
                      : ""
                  } w-full h-12  flex justify-center items-center active:font-bold active:border-b active:border-slate-500 text-slate-400 `}
                  to="/LoginByQRCode"
                >
                  VỚI MÃ QR
                </Link>
              </li>
              <li className="text-3xl text-slate-400">&#8739;</li>
              <li key={1} className="w-1/2" onClick={() => setSelect(false)}>
                <Link
                  className={`${
                    !isSelect
                      ? "font-bold border-b border-slate-500 text-slate-950"
                      : ""
                  } w-full h-12  flex justify-center items-center active:font-bold active:border-b active:border-slate-500 text-slate-400 `}
                  to="/LoginByNumberPhone"
                >
                  VỚI SỐ ĐIỆN THOẠI
                </Link>
              </li>
            </ul>
            <div className="h-full w-full p-4">
              <LoginRouter />
            </div>
          </div>
        </div>
        {/* backgroud Zalo */}
        <Backgroud />
      </header>
    </div>
  );
}

export default Login;
