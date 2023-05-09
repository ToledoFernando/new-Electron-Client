import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root.tsx";
import { BrowserRouter } from "react-router-dom";
import "./global.css";

const currentPath = location.pathname;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename={currentPath}>
      <Root />
    </BrowserRouter>
  </React.StrictMode>
);
