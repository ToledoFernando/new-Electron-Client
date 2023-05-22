import iconDownload from "../../../public/iconDownload.svg";
import iconBasura from "../../../public/basura.svg";

function HistoryCard({ position }: { position: number }) {
  const xd = Math.round(Math.random() * 2);
  return (
    <div className="history-card">
      <p className="name-download">{position + 1} - Musica de ejemplo</p>
      {xd % 2 === 0 ? (
        <label>{Math.round(Math.random() * 100)}%</label>
      ) : (
        <label></label>
      )}
      <button className={xd % 2 === 0 ? "downloading" : "success"}>
        {xd % 2 === 0 ? (
          <img className="download" src={iconDownload} />
        ) : (
          <img className="delete_music" src={iconBasura} />
        )}
      </button>
    </div>
  );
}

export default HistoryCard;
