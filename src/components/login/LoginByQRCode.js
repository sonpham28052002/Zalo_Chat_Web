import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import Loader from "../chat/custom/loader";
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { AiOutlineReload } from "react-icons/ai";

import { useSubscription } from "react-stomp-hooks";
import { getAPI } from "../../redux_Toolkit/slices";
import { useDispatch } from "react-redux";
export default function LoginByQRCode() {
  var [valueQR, setValueQR] = useState(uuidV4());
  var [disableQR, setDisableQR] = useState(false);
  var [isScaned, setIsScaned] = useState(false);
  var history = useNavigate();
  var [userReceive, setUserReceive] = useState();
  var dispatch = useDispatch();

  useSubscription("/user/" + valueQR + "/QR", async (message) => {
    if (message) {
      console.log("a");
      let data = JSON.parse(message.body);
      console.log(data);
      data.content = JSON.parse(data.content);
      setUserReceive(data);
      if (data.content.id) {
        console.log(data.content.id);
        //   // await dispatch(getAPI(JSON.parse(message.body).idUser));
        // setIsScaned(false);
        //   history("/home");
      }
      setIsScaned(true);
    }
  });

  useEffect(() => {
    if (!userReceive) {
      setTimeout(() => {
        setDisableQR(true);
      }, 50000);
    }
    // eslint-disable-next-line
  }, [valueQR]);
  return (
    <div className="h-full w-1/2 mr-1 flex flex-col items-center pt-5 px-14 relative">
      <img
        src={require("./asset/snapedit_1705786829845.png")}
        className="h-36"
        alt="/"
      ></img>
      <h1 className="font-bold text-3xl">ĐĂNG NHẬP VỚI QR</h1>
      <h4 className="text-gray-400 text-base font-medium">
        Sử ứng dụng để quét mã QR bên dưới.
      </h4>
      {isScaned ? (
        <div className="mt-10 h-fit ">
          <img
            alt="#"
            src={userReceive?.content.avatar}
            className="shadow-2xl h-52 rounded-full border-2 border-white -mt-5"
          />
          <h1 className="mt-2 text-xl font-bold text-center w-full">
            {userReceive?.content.name}
          </h1>
          <p className="text-center text-sm text-gray-400">
            Vui lòng đợi chấp nhận
          </p>
          <div className="mt-5">
            <Loader />
          </div>
        </div>
      ) : (
        <>
          {
            <div className="relative h-1/2">
              {disableQR && (
                <>
                  <div className="top-3  absolute h-[280px] bg-slate-100 opacity-75 w-full flex flex-row justify-center items-center"></div>
                  <div className="absolute top-28  w-full  flex flex-col justify-center items-center">
                    <p className="font-medium">Mã đã hết hạn</p>
                    <button
                      className="shadow-md h-10 px-2 rounded-md bg-blue-400 hover:bg-blue-800 hover:text-white font-medium flex flex-row justify-center items-center"
                      onClick={() => {
                        setDisableQR(false);
                        setValueQR(uuidV4());
                      }}
                    >
                      <AiOutlineReload className="font-medium mr-1" />
                      Lấy mã mới
                    </button>
                  </div>
                </>
              )}
              <div className="border-2  border-white shadow-md p-3 rounded-md">
                <QRCode className="h-full " value={valueQR} />
              </div>
              <h4 className="text-base text-center font-medium mt-3 text-blue-300">
                chỉ sử dụng đăng nhập cho website
              </h4>
            </div>
          }
        </>
      )}
      <button
        className=" mt-5 min-h-10 w-full rounded-md  bg-slate-500 hover:bg-slate-700 text-white font-semibold flex flex-row justify-center items-center"
        onClick={() => {
          history("/");
        }}
      >
        <IoIosHome className="text-white text-xl mr-2" />
        Quay lại
      </button>
    </div>
  );
}
