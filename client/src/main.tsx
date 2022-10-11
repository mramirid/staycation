import { isNull } from "lodash-es";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";

const rootElement = document.getElementById("root");
if (isNull(rootElement)) {
  throw new TypeError("The root element is undefined");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
