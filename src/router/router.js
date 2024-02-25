import { Route, Routes } from "react-router-dom";
import LoginByQRCode from "../components/login/LoginByQRCode";
import LoginByNumberPhone from "../components/login/LoginByNumberPhone";
import ForgotPassword from "../components/login/ForgotPassword";
import LoginBySMS from "../components/login/LoginBySMS";
import SignUp from "../components/login/SignUp";
import Chat from "../components/chat/chatbox/Chat";
import Contact from "../components/chat/contact/Contact";
import Todo from "../components/chat/todo/Todo";

export function LoginRouter() {
  return (
    <Routes>
      <Route element={<LoginByNumberPhone />} path="/"></Route>
      <Route element={<LoginByQRCode />} path="/qr"></Route>
      <Route element={<LoginBySMS />} path="/SMS"></Route>
      <Route element={<ForgotPassword />} path="/forgot"></Route>
      <Route element={<SignUp />} path="/signup"></Route>
    </Routes>
  );
}
export function HomeRouter() {
  return (
    <Routes>
      <Route element={<Chat />} path="/ChatRom"></Route>
      <Route element={<Contact />} path="/Contact"></Route>
      <Route element={<Todo />} path="/Todos"></Route>
    </Routes>
  );
}
