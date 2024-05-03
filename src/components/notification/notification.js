import { cssTransition, toast } from "react-toastify";
import { stompClient } from "../../socket/socket";

const bounce = cssTransition({
  enter: "animate__animated animate__bounceIn",
  exit: "animate__animated animate__bounceOut",
});
function acceptFriendRequest(item) {
  stompClient.send("/app/accept-friend-request", {}, JSON.stringify(item));
}
function declineFriendRequest(item) {
  stompClient.send("/app/decline-friend-request", {}, JSON.stringify(item));
}
function FriendRequest({ friendRequest }) {
  return (
    <div className="h-16 flex flex-row items-start text-sm select-none">
      <img
        className="rounded-full h-11 w-11 mr-2"
        alt=""
        src={friendRequest?.sender.avt}
      />
      <div className="flex flex-col justify-around items-start">
        <p className="font-semibold">Lời mời kết bạn.</p>
        <p className="font-medium">
          {friendRequest?.sender.userName} vừa gửi lời mới kết bạn.
        </p>
      </div>
      <div className="h-full flex flex-col justify-around items-center text-xs ">
        <button
          className="border border-gray-500 w-20 h-6 flex flex-col justify-center items-center rounded-md hover:bg-[#6ab04c] hover:text-white hover:border-white"
          onClick={() => {
            acceptFriendRequest(friendRequest);
          }}
        >
          Chập nhận
        </button>
        <button
          className="border border-gray-500 w-20 h-6 flex flex-col justify-center items-center rounded-md hover:bg-[#d9534f] hover:text-white hover:border-white"
          onClick={() => {
            declineFriendRequest(friendRequest);
          }}
        >
          Từ chối
        </button>
      </div>
    </div>
  );
}

function MessageSingle({ image, userName }) {
  return (
    <div className="h-12 flex flex-row items-start text-sm select-none">
      <img className="rounded-full h-11 w-11 mr-2" alt="" src={image} />
      <div className="flex flex-col justify-around items-start">
        <p className="font-semibold">Tin nhắn mới.</p>
        <p className="text-xs">
          <span className="font-semibold">{userName}</span> vừa gửi cho bạn một
          tin nhắn mới.
        </p>
      </div>
    </div>
  );
}

function MessageGroup({ image, userName }) {
  return (
    <div className="h-12 flex flex-row items-start text-sm select-none">
      <img className="rounded-full h-11 w-11 mr-2" alt="" src={image} />
      <div className="flex flex-col justify-around items-start">
        <p className="font-semibold">Tin nhắn mới.</p>
        <p className="text-xs">
          Nhóm <span className="font-semibold">{userName}</span> vừa có một nhắn
          mới.
        </p>
      </div>
    </div>
  );
}

function SwitchNotification({ type, friendRequest, image, userName }) {
  switch (type) {
    case "MESSAGE_GROUP":
      return <MessageGroup image={image} userName={userName} />;
    case "MESSAGE_SINGLE":
      return <MessageSingle image={image} userName={userName} />;
    case "FRIEND_REQUEST":
      return <FriendRequest friendRequest={friendRequest} />;
    default:
      break;
  }
}

function animateCss({ type, friendRequest, image, userName, hoverPause }) {
  toast(
    <SwitchNotification
      image={image}
      userName={userName}
      type={type}
      friendRequest={friendRequest}
    />,
    {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: bounce,
    }
  );
}

export { animateCss };
