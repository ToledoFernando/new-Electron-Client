import { useEffect } from "react";
import { musicApi } from "../../store/music/Music";
import MusicGroup from "../../components/Music/MusicGroup";
import "./Music.scss";

function Musicas() {
  const API = musicApi((state) => state.setData);
  const musics = musicApi((state) => state.data);

  useEffect(() => {
    if (!musics.length) API();
    console.log(musics);
  }, []);

  return (
    <div className="musics">
      {/* <br /> */}
      {/* <h1>- Escuchar musica online</h1> */}
      <div className="musicContainer">
        {musics.length &&
          musics.map((element, index) => (
            <MusicGroup musica={element} key={index} />
          ))}
      </div>
    </div>
  );
}

export default Musicas;
