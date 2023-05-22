import React from "react";
import "./Bar.scss";

function Bar() {
  return (
    <div className="bar">
      <h1>ElectronPlayer</h1>
      <div className="opt">
        <button className="minimize"></button>
        <button className="exit"></button>
      </div>
    </div>
  );
}

export default Bar;
