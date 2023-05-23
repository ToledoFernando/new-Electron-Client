import React from "react";
// import { IResultSearch } from "./SearchTypes";
import iconDowload from "../../../public/iconDownload.svg";
import play from "../../../public/play.png";
import { loading, musicaActual } from "../../store/music/Music";
import { IMusicOnline } from "../../store/music/Musictype";
import { download as DownloadMusic } from "../../store/download/Download";
import { toast } from "sonner";
import closeIcon from "../../../public/close.svg";
import "./Search.scss";

function SearchCard({ musica }: { musica: IMusicOnline }) {
  const musicaAct = musicaActual((state) => state.setMusicOnlyne);
  const stateDownload = DownloadMusic((state) => state);
  const setLoad = loading((state) => state.setLoad);

  const getPlayMusic = async (musica: IMusicOnline) => {
    setLoad();
    await musicaAct(musica);
    setLoad();
  };

  const time = (num: number) => {
    const minutos = Math.floor(num / 60);
    const segundos = Math.floor(num % 60);
    if (segundos > 9) return `${minutos}:${segundos}` || "00:00";
    return `${minutos}:0${segundos}` || "00:00";
  };

  const downloadMusic = async (musica: IMusicOnline) => {
    if (stateDownload.isDownloading) {
      return toast.error("Ya se esta descargango una musica");
    }
    setLoad();
    toast.promise(musicaAct(musica), {
      loading: "Obteniendo URL...",
      success: (data) => {
        setLoad();
        stateDownload.downloadMusic(data);
        return `Descargando.... \n ${musica.title}`;
      },
      error: "Error",
    });
  };

  return (
    <div className="search-card">
      <img src={musica.img} width={100} height={70} alt="" />
      <p>{musica.title}</p>
      <label className="author">
        - {musica.author} - {time(musica.seconds - 1)}
      </label>
      <div className="degradado">
        <button title="descargar musica" onClick={() => downloadMusic(musica)}>
          <img src={iconDowload} width={30} height={30} alt="" />
        </button>
        <button
          title="reproducir musica - online"
          onClick={() => getPlayMusic(musica)}
          className="playButton"
        >
          <img src={play} width={20} height={20} alt="" />
        </button>
      </div>
    </div>
  );
}

export default SearchCard;
