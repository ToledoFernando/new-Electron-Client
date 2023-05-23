import { useState } from "react";
import HistoryCard from "../../components/history/HistoryCard";
import { download } from "../../store/download/Download";
import iconDownload from "../../../public/iconDownload.svg";
import { useEffect } from "react";
import "./History.scss";

type HistoryProps = { name: string; id: number };

function History() {
  const downloadStore = download((state) => state);

  useEffect(() => {
    const historial = localStorage.getItem("historyMusic");
    if (!historial) return downloadStore.setHistory([]);
    downloadStore.setHistory(JSON.parse(historial));
    return () => console.log("OAIWDBOIAWBD");
  }, []);
  return (
    <div className="history">
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
        {downloadStore.history.length === 0 ? (
          <h1>No se encontro musicas descargadas</h1>
        ) : null}
        {downloadStore.history?.map((name, index) => (
          <HistoryCard position={index} key={index} name={name} />
        ))}
      </div>
    </div>
  );
}

export default History;
