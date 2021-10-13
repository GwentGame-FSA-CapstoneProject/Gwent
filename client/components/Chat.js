import React from "react";

export default class Chat extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          alignContent: "right",
          justifyContent: "right",
          flexDirection: "row",
          height: "100vh",
        }}
      >
        <h3>Chatty</h3>
      </div>
    );
  }
}
