import React, { Component } from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Lobby from "./components/Lobby";
import Homepage from "./components/Homepage";
import ChatRoom from "./pages/ChatRoom";
import ClearChat from "./pages/ClearChat";

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/chatroom">
            <ChatRoom />
          </Route>

          <Route exact path="/clearChat">
            <ClearChat />
          </Route>
          <Route path="/lobby" component={Lobby} />
          <Route exact path="/homepage" component={Homepage} />
          <Redirect to="homepage" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
