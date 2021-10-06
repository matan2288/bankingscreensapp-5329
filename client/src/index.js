import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { GlobalDataWrapper } from "./Components/Context/GlobalData.js";

ReactDOM.render(
  <React.StrictMode>
    <GlobalDataWrapper>
      <App />
    </GlobalDataWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);
