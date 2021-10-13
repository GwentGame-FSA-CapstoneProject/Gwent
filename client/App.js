import React from "react";
import Routes from "./Routes";
import Game from "./components/Game";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        alignContent: "left",
        justifyContent: "left",
        flexDirection: "row",
        height: "100vh",
      }}
    >
      <Game />
    </div>
  );
};

export default App;
