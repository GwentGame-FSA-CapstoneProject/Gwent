import React, { Component } from 'react';
import { withRouter, BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Lobby from './src/components/Lobby';
import Game from './src/components/Game';

class Routes extends Component {
  render(){
    return(
          <Switch>
            <Route path="/lobby" component={Lobby} />
            <Route path="/game" component={Game} />
            <Route to="/" component={Lobby} />
            <Redirect to="/lobby" />
          </Switch>
    )
  }

}

export default Routes
