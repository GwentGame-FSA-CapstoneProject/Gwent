import React from "react";
import { connect } from "react-redux";
import { player1WinsRound, player2WinsRound } from "../redux/index";
import Box from "@mui/material/Box";

class PlayerHud extends React.Component {
  componentDidMount() {}
  render() {
    console.log("hiya", this.props);
    return (
      <div className="container">
        <div className="playersection">
          <h1>PLAYER A</h1>
          <h2>Round wins: </h2>
          <p>Player image</p>
          <p>Total Strength:7</p>
          <p>Player Hand:4</p>
        </div>
        <div className="playersection">
          <h1>PLAYER B</h1>
          <h2>Round wins: 0</h2>
          <p>Player image</p>
          <p>Total Strength:7</p>
          <p>Player Hand:3</p>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    player1RoundWins: state.player1RoundWins,
    player2RoundWins: state.player2RoundWins,
  };
};

const mapDispatch = (dispatch) => {
  return {
    player1Wins: () => dispatch(player1WinsRound()),
    player2Wins: () => dispatch(player2WinsRound()),
  };
};

export default connect(mapState, mapDispatch)(PlayerHud);
