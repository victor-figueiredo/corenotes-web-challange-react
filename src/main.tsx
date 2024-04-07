import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/_main.scss";
import { MyContextProvider } from "./context/useContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MyContextProvider>
      <App />
    </MyContextProvider>
  </React.StrictMode>
);
