import BackgroundImage from "./asset/backgroud.png";
import "react-phone-input-2/lib/style.css";
import { LoginRouter } from "../../router/router";
import AcceptCookie from "./AcceptCookie";
import { useEffect, useState } from "react";
import { handleGetValueCookie } from "../../services/Cookie_Service";
import { useDispatch } from "react-redux";
import { getAPI } from "../../redux_Toolkit/slices";
import { useNavigate } from "react-router-dom";
import Loader from "../chat/custom/loader";
function Login() {
  var [closeCookie, setCloseCookie] = useState(true);

  var [loading, setLoading] = useState(false);

  var [account, setAccount] = useState();

  var dispatch = useDispatch();
  var history = useNavigate();
  useEffect(() => {
    handleGetValueCookie("appchat", setAccount, setCloseCookie);
  }, []);
  const autoLoginWithCookie = async () => {
    // eslint-disable-next-line
    if (account && account == {}) {
      setLoading(true);
      console.log("account");
      console.log(account);
      await dispatch(getAPI(account.id));
      setTimeout(() => {}, 2000);
      setLoading(false);
      history("/home");
    }
  };
  useEffect(() => {
    autoLoginWithCookie();
    // eslint-disable-next-line
  }, [account]);

  return (
    <>
      {loading && (
        <div className="h-[100vh] absolute top-0 z-50 inset-0 bg-white opacity-35">
          <Loader />
        </div>
      )}
      <div
        className="App flex items-center justify-center relative "
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
    </>
  );
}

export default Login;
