import React from "react";
// import { IResultSearch } from "./SearchTypes";
import iconDowload from "../../../public/iconDownload.svg";
import play from "../../../public/play.png";
import { loading, musicaActual } from "../../store/music/Music";
import { IMusicOnline } from "../../store/music/Musictype";
import "./Search.scss";

function SearchCard({ musica }: { musica: IMusicOnline }) {
  const musicaAct = musicaActual((state) => state.setMusicOnlyne);
  const download = musicaActual((state) => state.downloadMusic);
  const setLoad = loading((state) => state.setLoad);

  const getPlayMusic = async (musica: IMusicOnline) => {
    setLoad();
    await musicaAct(musica);
    setLoad();
  };

  const downloadMusic = async (musica: IMusicOnline) => {
    setLoad();
    const music = await musicaAct(musica);
    setLoad();
    download(music);
  };

  return (
    <div className="search-card">
      <img src={musica.img} width={100} height={70} alt="" />
      <p>{musica.title}</p>
      <label className="author">- {musica.author} - </label>
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
