import { loading, musicaActual } from "../../store/music/Music";
import {
  IMusicAPIResult,
  IMusicAPIResultMusic,
} from "../../store/music/Musictype";
import "./MusicGroup.scss";

function MusicCard({ musica }: { musica: IMusicAPIResultMusic }) {
  const setLoad = loading((state) => state.setLoad);
  const setMusicOnline = musicaActual((state) => state.setMusicApi);

  const xd = (data: IMusicAPIResultMusic) => {
    // console.log("#############3");
    setMusicOnline(data);
  };
  return (
    <div className="card_music" onClick={() => xd(musica)}>
      <img src={musica.musicIMG} width={40} height={40} alt="" />
      <div className="info">
        <p className={musica.name.length > 60 ? "name_long" : "name"}>
          {musica.name}
        </p>
        <p>- {musica.artist}</p>
      </div>
    </div>
  );
}

export default MusicCard;
