import SockJS from "sockjs-client";
import { over } from "stompjs";

const host = process.env.REACT_APP_HOST;
const sockjs = new SockJS(`${host}/ws`);
const stompClient = over(sockjs);

export { stompClient };
