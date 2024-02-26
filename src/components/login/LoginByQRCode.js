import React from "react";
import QRCode from "react-qr-code";
export default function LoginByQRCode() {
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
      <QRCode
        className="h-1/2"
        value="23486123904612040-612746124120-47120-4720-1470-071240-710247120-471204102740"
      />
      <h4 className="text-base font-medium -mt-5 text-blue-600">
        chỉ sử dụng đăng nhập cho website
      </h4>
    </div>
  );
}
