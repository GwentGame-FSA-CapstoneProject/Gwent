import React, { Component } from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Lobby from "./components/Lobby";
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
          <Redirect to="lobby" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
