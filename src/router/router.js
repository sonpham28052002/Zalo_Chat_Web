import { Route, Routes } from "react-router-dom";
import LoginByQRCode from "../components/login/LoginByQRCode";
import LoginByNumberPhone from "../components/login/LoginByNumberPhone";
import ForgotPassword from "../components/login/ForgotPassword";
import LoginBySMS from "../components/login/LoginBySMS";
import SignUp from "../components/login/SignUp";
import Chat from "../components/chat/chatbox/Chat";
import Contact from "../components/chat/contacts/index";
import Todo from "../components/chat/todo/Todo";
import Login from "../components/login/Login";
import SignUpUserInfoForm from "../components/login/SignUpUserInfoForm";
import Home from "../components/chat/home";
import SignUpPasswordForm from "../components/login/SignUpPasswordForm";
import { useState } from "react";
import FormSignUp from "../components/login/formSignUp";
import SignUpPreviewInfoForm from "../components/login/SignUpPreviewInfoForm";

export function LoginRouter() {
  return (
    <Routes>
      <Route element={<LoginByNumberPhone />} path="/"></Route>
      <Route element={<LoginByQRCode />} path="/qr"></Route>
      <Route element={<LoginBySMS />} path="/SMS"></Route>
      <Route element={<ForgotPassword />} path="/forgot"></Route>
      <Route element={<SignUp />} path="/signup*"></Route>
    </Routes>
  );
}
export function HomeRouter() {
  var [idConversation, setIdConversation] = useState(-1);
  return (
    <Routes>
      <Route
        element={
          <Chat
            setIdConversation={setIdConversation}
            idConversation={idConversation}
          />
        }
        path="/"
      ></Route>
      <Route element={<Contact />} path="/Contact"></Route>
      <Route element={<Todo />} path="/Todos"></Route>
    </Routes>
  );
}
export function SignUpRouter() {
  return (
    <Routes>
      <Route element={<FormSignUp />} path="/"></Route>
      <Route element={<SignUpPasswordForm />} path="/enterpassword"></Route>
      <Route element={<SignUpUserInfoForm />} path="/userform"></Route>
      <Route element={<SignUpPreviewInfoForm />} path="/preview"></Route>
    </Routes>
  );
}
export function AcceptRouter() {
  return (
    <Routes>
      <Route element={<Login />} path="/*"></Route>
      <Route element={<Home />} path="/home*"></Route>
    </Routes>
  );
}
