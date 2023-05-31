import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { playListStore } from "../../store/playList/playListStore";
import PlayListInfoCard from "../../components/PlayListInfo/PlayListInfoCard";
import volverIcon from "../../../public/back.svg";
import "./PlayListInfo.scss";

function PlayListInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const playListdata = playListStore((state) => state);

  useEffect(() => {
    if (!id) return;
    playListdata.getMusicas(id);

    return playListdata.clearMusicas();
  }, []);

  return (
    <div className="playListInfo">
      <button className="volver" onClick={() => navigate(-1)}>
        <img src={volverIcon} />
      </button>
      <div className="group">
        {playListdata.musicas.length &&
          playListdata.musicas.map((musica, index) => (
            <PlayListInfoCard musica={musica} key={index} />
          ))}
      </div>
    </div>
  );
}

export default PlayListInfo;
