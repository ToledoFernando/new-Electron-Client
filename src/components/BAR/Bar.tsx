import React, { useState } from "react";
import "./Bar.scss";
import ConfirmExit from "./ConfirmExit";

function Bar() {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <>
      {modal && <ConfirmExit set={setModal} />}
      <div className="bar">
        <h1>ElectronPlayer</h1>
        <div className="opt">
          <button className="minimize">-</button>
          <button className="exit" onClick={() => setModal(!modal)}>
            X
          </button>
        </div>
      </div>
    </>
  );
}

export default Bar;
