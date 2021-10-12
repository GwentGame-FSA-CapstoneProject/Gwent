import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Lobby from './components/Lobby';
import Game from './components/Game';

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
