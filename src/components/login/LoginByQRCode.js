import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import Loader from "../chat/custom/loader";
import { stompClient } from "../../socket/socket";
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { AiOutlineReload } from "react-icons/ai";
export default function LoginByQRCode() {
  var data = {
    id: "yGjQT5o0sleSmjHVDHT24SS8FAB2",
    name: "Rickey Jones",
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/455.jpg",
  };
  stompClient.connect(
    {},
    () => {
      stompClient.subscribe(
        "/user/" +
          "23486123904612040-612746124120-47120-4720-1470-071240-710247120-471204102740" +
          "/QR",
        (message) => {
          console.log("Received message private:", message.body);
        }
      );
    },
    (err) => {
      console.log(err);
    }
  );
  var [valueQR, setValueQR] = useState(uuidV4());
  var [disableQR, setDisableQR] = useState(false);
  var history = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setDisableQR(true);
    }, 10000);
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
      {false ? (
        <div className="mt-10 h-fit ">
          <img
            alt="#"
            src={data.image}
            className="shadow-2xl h-52 rounded-full border-2 border-white"
          />
          <h1 className="mt-2 text-xl font-bold text-center w-full">
            {data.name}
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
                      <AiOutlineReload className="font-medium mr-1"/>
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
