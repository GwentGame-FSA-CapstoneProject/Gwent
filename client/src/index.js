import React from "react";
import Phaser from "phaser"; //Although this is not actually being used if its removed nothing works
import ReactDOM from "react-dom";
import Routes from "../Routes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,

  document.getElementById("app")
);
