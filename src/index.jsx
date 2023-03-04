import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import GlobalStyle from "./GlobalStyle";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
    <GlobalStyle />
  </BrowserRouter>,
);
