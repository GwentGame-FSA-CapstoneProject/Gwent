import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";

const PLAYER1_ROUND_WIN = "PLAYER1_ROUND_WIN";
const PLAYER2_ROUND_WIN = "PLAYER2_ROUND_WIN";
const LOST_GAME = "LOST_GAME";
const START_GAME = "START_GAME";
const END_GAME = "END_GAME";
export const startGame = () => {
  return {
    type: START_GAME,
  };
};

export const endGame = () => {
  return {
    type: END_GAME,
  };
};
export const player1WinsRound = () => {
  return {
    type: PLAYER1_ROUND_WIN,
  };
};

export const player2WinsRound = () => {
  return {
    type: PLAYER2_ROUND_WIN,
  };
};

export const lostGame = () => {
  return {
    type: LOST_GAME,
  };
};

const intialState = {
  player1RoundWins: 0,
  player2RoundWins: 0,
  gameRunning: false,
};

function reducer(state = intialState, action) {
  switch (action.type) {
    case START_GAME:
      return { ...intialState, gameRunning: true };
    case END_GAME:
      return { ...intialState, gameRunning: false };
    case PLAYER1_ROUND_WIN:
      return { ...intialState, player1RoundWins: state.player1RoundWins + 1 };
    case PLAYER2_ROUND_WIN:
      return { ...intialState, player2RoundWins: state.player2RoundWins + 1 };
    default:
      return state;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancers(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

export default createStore(appReducer, middleware);
