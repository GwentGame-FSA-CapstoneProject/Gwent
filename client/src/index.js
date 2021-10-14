import React from "react";
import Phaser from "phaser"; //Although this is not actually being used if its removed nothing works
import ReactDOM from "react-dom";
import Routes from "../Routes";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  document.getElementById("app")
);
