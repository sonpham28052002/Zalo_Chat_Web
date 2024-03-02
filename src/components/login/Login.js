import BackgroundImage from "./asset/backgroud.png";
import "react-phone-input-2/lib/style.css";
import { LoginRouter } from "../../router/router";
import AcceptCookie from "./AcceptCookie";
import { useEffect, useState } from "react";
import { handleGetValueCookie } from "../../services/Cookie_Service";
function Login() {
  var [closeCookie, setCloseCookie] = useState(true);
  var [account, setAccount] = useState(undefined);
  console.log(account);

  useEffect(() => {
    handleGetValueCookie(setAccount, setCloseCookie);
  }, []);
  return (
    <div
      className="App flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        height: "100vh",
        WebkitUserSelect: "none",
      }}
    >
      <div className="shadow-2xl rounded-lg  h-2/3 w-3/6 flex flex-row bg-[#fff]	">
        <LoginRouter />
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
      {closeCookie && <AcceptCookie setClose={setCloseCookie} />}
    </div>
  );
}

export default Login;
