import { useState } from "react";
import HistoryCard from "../../components/history/HistoryCard";
import { download } from "../../store/download/Download";
import iconDownload from "../../../public/iconDownload.svg";
import { useEffect } from "react";
import "./History.scss";

function History() {
  const downloadStore = download((state) => state);
  const [historyDownload, setHistoryDownload] = useState<string[]>([]);

  useEffect(() => {
    const history = localStorage.getItem("historyMusic");
    if (history) setHistoryDownload([...historyDownload, history]);
    console.log(downloadStore);
    return () => console.log("OAIWDBOIAWBD");
  }, []);
  return (
    <div className="history">
      <h1>History</h1>
      <div className="history-card">
        <p>Nombre de la musica</p>
        <label>Estado</label>
        <label>Eliminar</label>
      </div>
      {downloadStore.isDownloading && (
        <div className="history-card">
          <p className="name-download">{downloadStore.Name}</p>
          <label>{downloadStore.Porcentaje}%</label>
          <div className="downloading">
            <img width={20} height={20} src={iconDownload} />
          </div>
        </div>
      )}

      <div className="histori-download">
        {historyDownload.length === 0 ? (
          <h1>No se encontro musicas descargadas</h1>
        ) : null}
        {/* {xd.map((num, index) => (
          <HistoryCard position={index} key={num} />
        ))} */}
      </div>
    </div>
  );
}

export default History;
