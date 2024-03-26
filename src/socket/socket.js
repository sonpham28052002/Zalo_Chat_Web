import { over } from "stompjs";
import SockJS from "sockjs-client";
const socket = new SockJS("http://localhost:8080/ws");
const stompClient = over(socket);
export { stompClient };
