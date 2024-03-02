import React from "react";
import {
  createCookie,
  handleGetValueCookie,
} from "../../services/Cookie_Service";

export default function AcceptCookie({ setClose }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-6 flex justify-between items-center">
      <div>
        <p className="text-sm">
          Trang web này sử dụng cookie để cải thiện trải nghiệm của bạn.
        </p>
        <p className="text-sm">
          Bằng cách tiếp tục sử dụng trang web, bạn đồng ý với việc sử dụng
          cookie.
        </p>
      </div>

      <div>
        <button
          className="text-sm bg-gray-800 hover:bg-red-400 text-white py-2 px-4 rounded mx-2"
          onClick={() => {
            setClose(false);
          }}
        >
          Từ chối
        </button>
        <button
          className="text-sm bg-gray-800 hover:bg-green-400 text-white py-2 px-4 rounded mx-2"
          onClick={() => {
            createCookie();
            handleGetValueCookie((data) => {
              console.log(JSON.parse(data));
            }, setClose);
          }}
        >
          Đồng ý
        </button>
      </div>
    </div>
  );
}
