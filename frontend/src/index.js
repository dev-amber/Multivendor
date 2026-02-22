import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import Store from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import axios from "axios"
import { BrowserRouter } from "react-router-dom";
import "./App.css";



axios.defaults.withCredentials = true; 

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={Store}>
   <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
