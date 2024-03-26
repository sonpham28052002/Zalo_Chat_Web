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
// eslint-disable-next-line
import { motion, useTime, useTransform } from "framer-motion";
function Login() {
  var [closeCookie, setCloseCookie] = useState(false);
  var [isExistsCookie, setIsExistCookie] = useState(true);
  // eslint-disable-next-line
  var [loading, setLoading] = useState(false);

  var dispatch = useDispatch();
  var history = useNavigate();

  // const time = useTime();
  // const rotate = useTransform(time, [0, 4000], [0, 360], { clamp: false });

  useEffect(() => {
    handleGetValueCookie("appchat", autoLoginWithCookie, setCloseCookie);
    // eslint-disable-next-line
  }, []);

  const autoLoginWithCookie = async (data) => {
    // eslint-disable-next-line
    if (data && JSON.stringify(data) != JSON.stringify({})) {
      await dispatch(getAPI(data.id));
      await setTimeout(() => {
        setIsExistCookie(true);
        history("/home");
      }, 5000);
    } else {
      setIsExistCookie(false);
    }
  };

  return (
    <>
      <div
        className="App flex items-center justify-center relative "
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          height: "100vh",
          WebkitUserSelect: "none",
        }}
      >
        {isExistsCookie ? (
          <div className="flex flex-col justify-start  items-center">
            <motion.img
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              src={require("./asset/snapedit_1705786829845.png")}
              className="h-96"
              alt="/"
            ></motion.img>

            <h1 className="text-5xl p-3 font-bold my-5 font-SedgwickAveDisplay">
              Chào mừng đến với APP-CHAT
            </h1>
            <Loader />
          </div>
        ) : (
          <>
            {loading && (
              <div className="h-[100vh] absolute top-0 z-50 inset-0 bg-white opacity-35">
                <Loader />
              </div>
            )}
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
          </>
        )}
        {closeCookie && !isExistsCookie && (
          <AcceptCookie setClose={setCloseCookie} />
        )}
      </div>
    </>
  );
}

export default Login;
