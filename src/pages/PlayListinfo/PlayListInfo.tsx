import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { playListStore } from "../../store/playList/playListStore";
// import PlayListInfoCard from "../../components/PlayListInfo/PlayListInfoCard";
import Card from "./Card";
import volverIcon from "../../../public/back.svg";
import { Nodo, List } from "./ClassList";
import "./PlayListInfo.scss";
import { IMusicAPI } from "../../store/music/Musictype";

function PlayListInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const playListdata = playListStore((state) => state);
  const [nodoList, setNodoList] = useState<List>();

  useEffect(() => {
    if (!id) return;
    playListdata.getMusicas(id).then((res) => {
      const list = new List();
      res.forEach((music: IMusicAPI) => list.push(music));
      setNodoList(list);
    });

    //Limpiamos el estado al desmontar el componente
    return playListdata.clearMusicas();
  }, []);

  return (
    <div className="playListInfo">
      <button className="volver" onClick={() => navigate(-1)}>
        <img src={volverIcon} />
      </button>
      {nodoList && <Card musica={nodoList} />}
    </div>
  );
}

export default PlayListInfo;
