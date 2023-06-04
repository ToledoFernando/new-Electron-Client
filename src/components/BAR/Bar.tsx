import { useEffect, useState } from "react";
import "./Bar.scss";
import ConfirmExit from "./ConfirmExit";
import { musicaActual } from "../../store/music/Music";

function Bar() {
  const [modal, setModal] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const state = musicaActual((state) => state);

  useEffect(() => {
    // setName
    if (state.musica === null) return;
    if ("buffer" in state.musica) setName(state.musica.name.slice(0, -4));
    else setName(state.musica.name);
  }, [state.musica]);

  return (
    <>
      {modal && <ConfirmExit set={setModal} />}
      <div className="bar">
        <h1>ElectronPlayer</h1>
        {/* <p className="nameMusic">{name}</p> */}
        <div className="opt">
          <button className="minimize" onClick={() => window.hide()}>
            -
          </button>
          <button className="exit" onClick={() => setModal(!modal)}>
            X
          </button>
        </div>
      </div>
    </>
  );
}

export default Bar;
