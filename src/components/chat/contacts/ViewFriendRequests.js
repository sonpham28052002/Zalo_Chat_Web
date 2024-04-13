import { IoCaretDownOutline } from "react-icons/io5";
import { IoCaretForwardOutline } from "react-icons/io5";
import { SlEnvolopeLetter } from "react-icons/sl";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { useState, useEffect } from "react";
import "./style.css";
import { useSubscription } from "react-stomp-hooks";
import { useSelector } from "react-redux";
import { getFriendRequestListByOwnerId } from "../../../services/User_service";
import Loader from "../custom/loader";
import { stompClient } from "../../../socket/socket";

function ViewFriendRequests() {
  let owner = useSelector((state) => state.data);
  let [sendReqFriend, setSendReqFriend] = useState([]);
  let [requestFriend, setRequestFriend] = useState([]);
  let [isLoad, setIsLoad] = useState(false);
  const [isTurnOnRecomment, setTurnOnRecomment] = useState(false);

  useSubscription("/user/" + owner.id + "/requestAddFriend", (message) => {
    let mess = JSON.parse(message.body);
    if (mess.sender.id === owner.id) {
      setSendReqFriend([...sendReqFriend, mess]);
    } else if (mess.receiver.id === owner.id) {
      setRequestFriend([...requestFriend, mess]);
    }
  });

  useSubscription("/user/" + owner.id + "/acceptAddFriend", (message) => {
    let mess = JSON.parse(message.body);
    console.log(mess);
    setRequestFriend(
      requestFriend.filter((item) => item.sender.id !== mess.sender.id)
    );
    setSendReqFriend(
      sendReqFriend.filter((item) => item.receiver.id !== mess.receiver.id)
    );
  }); 

  useSubscription("/user/" + owner.id + "/declineAddFriend", (message) => {
    let mess = JSON.parse(message.body);
    console.log(mess);
    setRequestFriend(
      requestFriend.filter((item) => item.sender.id !== mess.sender.id)
    );
    setSendReqFriend(
      sendReqFriend.filter((item) => item.receiver.id !== mess.receiver.id)
    );
  }); 

  useEffect(() => {
    setIsLoad(true);
    getFriendRequestListByOwnerId(owner.id).then(async (data) => {
      let sendReq = [];
      let resp = [];
      let arrData = data;
      // eslint-disable-next-line
      await arrData.map((item) => {
        if (item.sender.id === owner.id) {
          sendReq.push(item);
        } else if (item.receiver.id === owner.id) {
          resp.push(item);
        }
      });
      setSendReqFriend([...sendReq]);
      setRequestFriend([...resp]);
      setIsLoad(false);
    });
  }, [owner.id]);

  function acceptFriendRequest(item) {
    stompClient.send("/app/accept-friend-request", {}, JSON.stringify(item));
  }

  function declineFriendRequest(item) {
    stompClient.send("/app/decline-friend-request", {}, JSON.stringify(item));
  }
  function ListRequest({ list }) {
    return (
      <div className="flex flex-row w-full flex-wrap">
        {list.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-around bg-white rounded mb-2 p-3 h-[200px] cursor-pointer request-item"
          >
            <div className="flex flex-row w-full">
              <img
                className="img-avatar rounded-full bg-cover bg-center mr-4 w-[60px]"
                src={item.sender.avt}
                alt="."
              ></img>
              <div className="flex flex-col items-start overflow-hidden">
                <p className="text-base font-semibold truncate  overflow-ellipsis overflow-hidden">
                  {item.sender.userName}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(item.sendDate).toDateString()}
                </p>
              </div>
              <BiMessageRoundedDetail
                className="w-7 h-7 ml-auto"
                color="gray"
              />
            </div>

            <div className="bg-gray-200 w-full border border-gray-300 rounded p-2 h-[60px]">
              <p className="text-sm text-left txt-request">
                {"Xin chào, mình là " + item.sender.userName}
              </p>
            </div>

            <div className="flex flex-row justify-around h-10 w-full">
              <button
                className="btn-request btn-blur-gray rounded"
                onClick={() => {
                  declineFriendRequest(item);
                }}
              >
                <p className="font-semibold">Từ chối</p>
              </button>
              <button
                className="btn-request btn-blur-blue rounded hover:text-white"
                onClick={() => {
                  acceptFriendRequest(item);
                }}
              >
                <p className="font-semibold ">Đồng ý</p>
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function ListRecomment({ list }) {
    return (
      <div className="flex flex-row w-full flex-wrap">
        {list.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-around bg-white rounded mb-2 p-3 h-[150px] request-item cursor-pointer"
          >
            <div className="flex flex-row items-center">
              <img
                className=" img-avatar rounded-full bg-cover bg-center mr-4"
                src={item.receiver.avt}
                alt="."
              ></img>
              <div className="flex flex-col items-start">
                <p className="text-base font-semibold overflow-hidden">
                  {item.receiver.userName}
                </p>
                <p className="text-sm text-gray-500">
                  {" "}
                  {new Date(item.sendDate).toDateString()}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-around h-10 w-full">
              <button
                className=" btn-blur-gray rounded w-full"
                onClick={() => {
                  declineFriendRequest(item);
                }}
              >
                <p className="font-semibold">Thu hồi yêu cầu</p>
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-row h-16 items-center">
        <div className="w-16">
          <SlEnvolopeLetter className="w-5 h-5 mx-auto" />
        </div>
        <div className="font-semibold">Lời mời kết bạn</div>
      </div>
      <hr></hr>
      <div className="flex flex-1 bg-gray-100 scrollable-div flex-col">
        <div className="txt-contacts items-center">
          <p className="text-sm font-semibold pb-3">
            Lời mời đã nhận ({requestFriend.length})
          </p>
          {isLoad ? <Loader /> : <ListRequest list={requestFriend} />}
        </div>

        <div className="txt-contacts items-center ">
          <button
            className="text-sm font-semibold flex flex-row items-center mb-3"
            onClick={() => setTurnOnRecomment(!isTurnOnRecomment)}
          >
            Đã gửi yêu cầu kết bạn ({sendReqFriend.length})
            {isTurnOnRecomment ? (
              <IoCaretDownOutline className="w-4 h-4" color="gray" />
            ) : (
              <IoCaretForwardOutline className="w-4 h-4" color="gray" />
            )}
          </button>

          {isTurnOnRecomment && <ListRecomment list={sendReqFriend} />}
        </div>
      </div>
    </div>
  );
}

export default ViewFriendRequests;
