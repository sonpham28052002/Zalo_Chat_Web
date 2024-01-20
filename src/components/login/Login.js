import BackgroundImage from "./asset/backgroud.png";
import "react-phone-input-2/lib/style.css";
import LoginByNumberPhone from "./LoginByNumberPhone";
import { Route, Routes } from "react-router-dom";
import LoginByQRCode from "./LoginByQRCode";
import LoginBySMS from "./LoginBySMS";

function Login() {
  // var [content, setContent] = useState([
  //   "ĐĂNG NHẬP",
  //   "Số điện thoại",
  //   "Mật khẩu",
  //   "Quên mật khẩu",
  //   "Đăng nhập",
  //   "Đăng nhập bằng thiết bị di động",
  //   "Đăng nhập bằng mã QR",
  // ]);

  return (
    <div
      className="App flex items-center justify-center"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        height: "100vh",
      }}
    >
      <div className="shadow-2xl rounded-lg  h-2/3 w-3/6 flex flex-row bg-[#fff]	">
        <Routes>
          <Route element={<LoginByNumberPhone />} path="/"></Route>
          <Route element={<LoginByQRCode />} path="/qr"></Route>
          <Route element={<LoginBySMS />} path="/SMS"></Route>

        </Routes>
        <div
          className="h-full w-1/2 ml-1 bg-slate-800 m-0 rounded-r-lg flex  justify-center items-end "
          style={{
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: "cover",
          }}
        >
          <img
            src={require("./asset/Computer login-bro.png")}
            alt="/"
            className="h-2/3 "
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Login;
