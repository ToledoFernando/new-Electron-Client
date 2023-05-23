import iconDownload from "../../../public/iconDownload.svg";
import iconBasura from "../../../public/basura.svg";
import { download } from "../../store/download/Download";

function HistoryCard({
  name,
  position,
}: {
  position: number;
  name: { name: string; id: number };
}) {
  const statehistory = download((state) => state);

  const deleteMusicHistori = (name: { name: string; id: number }) => {
    statehistory.setDeletehistory(name.id);
  };

  return (
    <div className="history-card">
      <p className="name-download">
        {position + 1} - {name.name}
      </p>
      <label>Completado</label>
      <button className="success" onClick={() => deleteMusicHistori(name)}>
        <img className="delete_music" src={iconBasura} />
      </button>
    </div>
  );
}

export default HistoryCard;
