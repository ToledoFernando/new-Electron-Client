import { Dispatch, SetStateAction } from "react";
import "./ConfirmExit.scss";

function ConfirmExit({ set }: { set: Dispatch<SetStateAction<boolean>> }) {
  return (
    <div className="confirmExit">
      <div className="modal">
        <h4>Seguro de Salir?</h4>
        <div className="opciones">
          <button className="cancel" onClick={() => set(false)}>
            Cancelar
          </button>
          <button className="exit" onClick={() => window.closeApp()}>
            Salir
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmExit;
