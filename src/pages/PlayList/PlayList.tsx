import { useEffect } from "react";
import { playListStore } from "../../store/playList/playListStore";
import PlayListCard from "../../components/PlayList/PlayListCard";
import "./PlayList.scss";

function PlayList() {
  const playListData = playListStore((state) => state);

  useEffect(() => {
    if (playListData.playList.length === 0) {
      playListStore.getState().getPlayList();
    }
  }, []);
  return (
    <div className="playLists">
      {playListData.playList.length > 0 &&
        playListData.playList.map((item, index) => (
          <PlayListCard playList={item} key={index} />
        ))}
    </div>
  );
}

export default PlayList;
