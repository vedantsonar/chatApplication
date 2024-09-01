import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/userContext.js";
import { SocketContextProvider } from "./context/socketContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
