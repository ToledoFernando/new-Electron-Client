import { useEffect } from "react";
import { musicApi } from "../../store/music/Music";
import MusicGroup from "../../components/Music/MusicGroup";
import "./Music.scss";

function Musicas() {
  const apiStore = musicApi((state) => state);

  useEffect(() => {
    if (apiStore.data.length === 0) apiStore.setData();
  }, []);

  return (
    <div className="musics">
      <h1>- Escuchar musica online</h1>
      <div className="musicContainer">
        {apiStore.data.length &&
          apiStore.data.map((element, index) => (
            <MusicGroup musica={element} key={index} />
          ))}
      </div>
    </div>
  );
}

export default Musicas;
