import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux_Toolkit/store";
import { PersistGate } from "redux-persist/integration/react";
import { StompSessionProvider } from "react-stomp-hooks";
import { ToastContainer, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css/animate.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
const host = process.env.REACT_APP_HOST;
const bounce = cssTransition({
  enter: "animate__animated animate__bounceIn",
  exit: "animate__animated animate__bounceOut",
});
root.render(
  <BrowserRouter basename="/Zalo_Chat_Web">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StompSessionProvider url={`${host}/ws`}>
          <App />
          <ToastContainer
            position="top-right"
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="light"
            transition={bounce}
            stacked
          />
        </StompSessionProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
