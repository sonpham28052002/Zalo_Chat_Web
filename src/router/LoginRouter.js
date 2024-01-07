import React from "react";
import LoginByQRCode from "../components/login/LoginByQRCode";
import LoginByNumberPhone from "../components/login/LoginByNumberPhone";
import { Route, Routes } from "react-router-dom";

export default function LoginRouter(props) {
  return (
    <Routes>
      <Route path="/LoginByQRCode" element={<LoginByQRCode />}></Route>
      <Route
        path="/LoginByNumberPhone"
        element={<LoginByNumberPhone />}
      ></Route>
    </Routes>
  );
}
