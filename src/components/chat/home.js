import React, { useState } from "react";
import { BsChatTextFill } from "react-icons/bs";
import { TiContacts } from "react-icons/ti";
import { IoIosCheckboxOutline } from "react-icons/io";
import { IoCloudOutline } from "react-icons/io5";
import { PiToolboxBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { HomeRouter } from "../../router/router";


import NavMenuSetting from "./setting/NavMenuSetting";
import InfoUser from "./infoUser/infoUser";
export default function Home() {
  var [indexSelect, setIndexSelect] = useState(0);

  return (
    <div className="min-w-screen-md  min-h-dvh flex flex-row">
      <div className=" bg-[#3883ac]  w-16 h-svh flex flex-col items-center justify-between">
        <div className="flex flex-col items-center h-96 w-full pt-7 ">
         <InfoUser/>
          <div className="w-full flex flex-col items-center">
            <Link
              to="/ChatRom"
              className={`${
                indexSelect === 0 ? "bg-[#1a8dcd]" : ""
              } w-full h-16 hover:bg-[#1a8dcd] flex flex-col items-center justify-center my-1 `}
              onClick={() => {
                setIndexSelect(0);
              }}
            >
              <BsChatTextFill className=" text-white text-3xl" />
            </Link>
            <Link
              to="/Contact"
              className={`${
                indexSelect === 1 ? "bg-[#1a8dcd]" : ""
              } w-full h-16 hover:bg-[#1a8dcd] flex flex-col items-center justify-center my-1 `}
              onClick={() => {
                setIndexSelect(1);
              }}
            >
              <TiContacts className="text-white text-3xl" />
            </Link>
            <Link
              to="/Todos"
              className={`${
                indexSelect === 2 ? "bg-[#1a8dcd]" : ""
              } w-full h-16 hover:bg-[#1a8dcd] flex flex-col items-center justify-center my-1 `}
              onClick={() => {
                setIndexSelect(2);
              }}
            >
              <IoIosCheckboxOutline className="text-white text-3xl" />
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col items-center">
          <Link
            to="/chat2"
            className="w-full h-16 hover:bg-[#1a8dcd] flex flex-col items-center justify-center"
          >
            <IoCloudOutline className="text-white text-3xl" />
          </Link>
          <Link
            to="/chat2"
            className="w-full h-16 hover:bg-[#1a8dcd] flex flex-col items-center justify-center"
          >
            <PiToolboxBold className="text-white text-3xl" />
          </Link>
         
            <NavMenuSetting/>
        </div>
      </div>
      <div className="h-svh w-screen">
        <HomeRouter />
      </div>
    </div>
  );
}