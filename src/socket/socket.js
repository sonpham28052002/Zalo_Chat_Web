import SockJS from "sockjs-client";
import { over } from "stompjs";

const host = process.env.REACT_APP_HOST;
const sockjs = new SockJS(`${host}/ws`);
const stompClient = over(sockjs);

const LeaveRoom = async (roomID, userId) => {
  let mess = {
    roomID: roomID,
    userId: userId,
  };
  stompClient.send("/app/outCall", {}, JSON.stringify(mess));
};

const JoinRoom = async (roomID, userId, idGroup) => {
  let mess = {
    roomID: roomID,
    userId: userId,
    idGroup: idGroup,
  };
  stompClient.send("/app/inCall", {}, JSON.stringify(mess));
};
export { stompClient, LeaveRoom, JoinRoom };
