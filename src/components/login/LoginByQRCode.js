import React, { useEffect, useState } from "react";

export default function LoginByQRCode() {
  var [timeCreateQrCode, setTimeCreateQrCode] = useState(undefined);
  var [QrCode, setQrCode] = useState("");
  useEffect(() => {
    localStorage.setItem("hasShownNotification", "false");
    setQrCode(
      `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${new Date().toISOString()}`
    );
  }, []);
  function checkAndNotify() {
    var hasShownNotification = localStorage.getItem("hasShownNotification");

    if (!hasShownNotification) {
      alert("Đã qua 5 phút. Thông báo 1 lần.");
      localStorage.setItem("hasShownNotification", "true");
    }
  }

  // Đặt hàm checkAndNotify để chạy sau 5 phút từ khi trang web được tải
  setTimeout(checkAndNotify, 1 * 1000);
  return (
    <div className="flex justify-center flex-col items-center mb-6">
      <div className="border p-2 rounded-lg flex flex-col items-center">
        <img
          alt=""
          className="h-56 "
          src={QrCode}
          onLoad={(e) => {
            setTimeCreateQrCode(new Date().toISOString());
          }}
        ></img>
        <h2 className="text-center mt-5 text-lg first-line:text-blue-600 ">
          Chỉ dùng để đăng nhập <br /> Zalo trên máy tính
        </h2>
      </div>
      <p className="font-medium text-sm text-slate-400 mt-2">
        Sử dụng ứng dụng Zalo để quét mã QR
      </p>
    </div>
  );
}
