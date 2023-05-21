import HistoryCard from "../../components/history/HistoryCard";
import { download } from "../../store/download/download";
import iconDownload from "../../../public/iconDownload.svg";
import { useEffect } from "react";
import "./History.scss";

function History() {
  const downloadStore = download((state) => state);
  let xd = [0, 1, 2, 3, 4];

  useEffect(() => {
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
          <img className="download" width={20} height={20} src={iconDownload} />
        </div>
      )}

      {xd.map((num) => (
        <HistoryCard key={num} />
      ))}
    </div>
  );
}

export default History;
