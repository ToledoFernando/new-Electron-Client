import { IPlayList } from "../../store/playList/PlayListTypes";
import { Link } from "react-router-dom";
import "./PlayListCard.scss";

function PlayListCard({ playList }: { playList: IPlayList }) {
  return (
    <Link className="link" to={`/playlist/${playList._id}`}>
      <div className="playListCard">
        <div className="imagePlayList">
          <img src={playList.img} />
        </div>
        <div>
          <h1>{playList.name}</h1>
          <p>Cantidad de Musica: {playList.musics.length}</p>
        </div>
      </div>
    </Link>
  );
}

export default PlayListCard;
