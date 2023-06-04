import { useEffect } from "react";
import { playListStore } from "../../store/playList/playListStore";
import PlayListCard from "../../components/PlayList/PlayListCard";
import "./PlayList.scss";
import Buscar from "../PlayListinfo/Buscar";

function PlayList() {
  const playListData = playListStore((state) => state);

  useEffect(() => {
    if (playListData.playList.length === 0) {
      playListStore.getState().getPlayList();
    }
  }, []);
  return (
    <div className="playList-page">
      <Buscar />
      <div className="playLists">
        {playListData.playList.length > 0 &&
          playListData.playList.map((item, index) => (
            <PlayListCard playList={item} key={index} />
          ))}
        {playListData.playList.length === 0 && (
          <h1 className="no-playList">No hay playlists</h1>
        )}
      </div>
    </div>
  );
}

export default PlayList;
