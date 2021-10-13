import React, { Component } from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Lobby from "./components/Lobby";
import Homepage from "./components/Homepage";
import Game from "./components/Game";

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/lobby" component={Lobby} />
          {/* <Route path="/game" component={Game} /> */}
          <Route exact path="/homepage" component={Homepage} />
          <Redirect to="Homepage" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
