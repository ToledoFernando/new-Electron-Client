import { musicaActual, loading } from "../../store/music/Music";
import { IMusicAPIResultMusic } from "../../store/music/Musictype";
import "./PlayListInfoCard.scss";

function PlayListInfoCard({ musica }: { musica: IMusicAPIResultMusic }) {
  const musicaAct = musicaActual((state) => state.getMusicYT);
  const setLoad = loading((state) => state.setLoad);

  const time = (num: number) => {
    const minutos = Math.floor(num / 60);
    const segundos = Math.floor(num % 60);
    if (segundos > 9) return `${minutos}:${segundos}` || "00:00";
    return `${minutos}:0${segundos}` || "00:00";
  };

  const getMusic = async (data: IMusicAPIResultMusic) => {
    setLoad();
    await musicaAct(data);
    setLoad();
  };
  return (
    <div className="card_music_playList" onClick={() => getMusic(musica)}>
      <img
        src={
          musica.musicIMG ||
          "https://th.bing.com/th/id/OIG.ydlwZSfll52z3d9UxnYW?pid=ImgGn"
        }
        width={40}
        height={40}
        alt=""
      />
      <div className="info">
        <p className={musica.name.length > 10 ? "name_long" : "name"}>
          {musica.name}
        </p>
        <p>- {musica.artist}</p>
        <p>{time(musica.duration - 1)}</p>
      </div>
    </div>
  );
}

export default PlayListInfoCard;
