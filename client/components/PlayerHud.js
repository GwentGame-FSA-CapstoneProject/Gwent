import React from "react";
import { player1WinsRound, player2WinsRound } from "../redux/index";

class PlayerHud extends React.Component {
  render() {
    return (
      <div>
        <h1>Hi this will be the HUD</h1>
      </div>
    );
  }
}

mapState = (state) => {
  return {
    player1RoundWins: state.player1RoundWins,
    player2RoundWins: state.player2RoundWins,
  };
};

mapDispatch = (dispatch) => {
  return {
    player1Wins: () => dispatch(player1WinsRound()),
    player2Wins: () => dispatch(player2WinsRound()),
  };
};

export default connect(mapState, mapDispatch)(PlayerHud);
