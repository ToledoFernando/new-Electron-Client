import { useState, ChangeEvent } from "react";
import { infoProblemStore } from "../../store/infoProblema/infoProblema";
import loadIcon from "../../../public/loadAnim.svg";
import "./modal.scss";
import { toast } from "sonner";

function MusicProblemModal() {
  const [infoProblem, setInfoProblem] = useState<string>("");
  const [titleProblem, setTitleProblem] = useState<string>("");
  const infoProblemData = infoProblemStore((state) => state);
  const [load, setLoad] = useState<boolean>(false);

  const handleChangeproblem = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInfoProblem(e.target.value);
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleProblem(e.target.value);
  };

  const sendProblem = async () => {
    setLoad(true);
    await infoProblemData.sendProblemaADM(
      infoProblem,
      titleProblem,
      infoProblemData.musicaId
    );
    setLoad(false);
    toast.success("Reporte enviado con exito");
    setInfoProblem("");
  };

  return (
    <div className="content-modal">
      <div className="title-modal">
        {load && (
          <span className="load-icon">
            <img src={loadIcon} alt="" />
          </span>
        )}
        <h1>Ingrese una breve descripcion de su Problema</h1>
        <input
          type="text"
          onChange={handleChangeTitle}
          value={titleProblem}
          placeholder="Titulo del problema"
        />
        <textarea
          onChange={handleChangeproblem}
          value={infoProblem}
          placeholder="Ingrese aqui su problema"
        ></textarea>
      </div>
      <div className="buttons-modal">
        <button onClick={infoProblemData.clearProblem} className="cancelar">
          Cancelar
        </button>
        <button onClick={sendProblem} className="reportar">
          Reportar Problema
        </button>
      </div>
    </div>
  );
}

export default MusicProblemModal;
