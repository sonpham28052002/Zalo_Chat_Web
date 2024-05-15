import { useState } from "react";
import { PiUserListLight } from "react-icons/pi";
import ViewListFriend from "./ViewListFriend";
import ViewListGroup from "./ViewListGroup";
import ViewFriendRequests from "./ViewFriendRequests";
import HeaderNavChat from "../chatbox/headerNavChat";
import { RiGroupLine } from "react-icons/ri";
import { SlEnvolopeLetter } from "react-icons/sl";

function Contacts() {
  const [active, setActive] = useState(1);

  const handleButtonClick = (buttonId) => {
    setActive(buttonId);
  };

  return (
    <div className="flex flex-row h-full  ">
      <div className="w-2/12 border-r-2 border-gray-200">
        <HeaderNavChat isSelect={false} />
        <div className="flex-1  ">
          <button
            className="flex flex-row h-16 w-full items-center"
            onClick={() => handleButtonClick(1)}
            style={{ backgroundColor: active === 1 ? "#e5efff" : "white" }}
          >
            <div className="w-16">
              <PiUserListLight className="w-7 h-7 mx-auto" />
            </div>
            <div className="font-semibold">Danh sách bạn bè</div>
          </button>

          <button
            className="flex flex-row h-16 w-full items-center"
            onClick={() => handleButtonClick(2)}
            style={{ backgroundColor: active === 2 ? "#e5efff" : "white" }}
          >
            <div className="w-16">
              <RiGroupLine className="w-7 h-7 mx-auto" />
            </div>
            <div className="font-semibold">Danh sách nhóm</div>
          </button>

          <button
            className="flex flex-row h-16 w-full items-center"
            onClick={() => handleButtonClick(3)}
            style={{ backgroundColor: active === 3 ? "#e5efff" : "white" }}
          >
            <div className="w-16">
              <SlEnvolopeLetter className="w-7 h-7 mx-auto" />
            </div>
            <div className="font-semibold">Lời mời kết bạn</div>
          </button>
        </div>
      </div>

      {active === 1 && <ViewListFriend />}
      {active === 2 && <ViewListGroup />}
      {active === 3 && <ViewFriendRequests />}
    </div>
  );
}

export default Contacts;
