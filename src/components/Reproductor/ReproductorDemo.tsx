import { useRef, useEffect, useState, ChangeEvent } from "react";
import { IMusicProps } from "./types";
import ControlAudio from "./ControlAudio";
import { loading, musicaActual } from "../../store/music/Music";
import audioLogo from "../../../public/musicaLogo.png";
import volumenIcon from "../../../public/volumenIcon.png";
import downloadIcon from "../../../public/iconDownload.svg";
import { IMusicUrl } from "../../store/music/Musictype";
import loadAnim from "../../../public/loadAnim.svg";
import "./Reproductor.scss";
import ControlAudioDemo from "./ControlAudioDemon";

function ViewImgAudio() {
  const audioIMG = musicaActual((state) => state.musica);
  const downloadMusic = musicaActual((state) => state.downloadMusic);
  const load = loading((state) => state.loadingMusic);

  const getDownloadMusic = (musica: IMusicUrl) => {
    downloadMusic(musica);
  };

  if (load) {
    return <img className="loadIMG" src={loadAnim} width={30} height={30} />;
  } else {
    return (
      <>
        {audioIMG?.img ? (
          <span
            style={{ backgroundImage: `url(${audioIMG.img})` }}
            className="imgMusic_online"
          >
            <div className="downloadMusic">
              <img
                src={downloadIcon}
                onClick={() => getDownloadMusic(audioIMG)}
                width={30}
                height={30}
              />
            </div>
          </span>
        ) : (
          <img
            className="imgMusic"
            src={audioLogo}
            alt=""
            width={40}
            height={40}
          />
        )}
      </>
    );
  }
}

function VolumenControlDemo() {
  return (
    <div className="volumentControl">
      <img
        className="volumenIcon"
        src={volumenIcon}
        alt=""
        width={15}
        height={15}
      />
      <input type="range" className="volumen" min={0} max={100} />
    </div>
  );
}

function ReproductorDemo() {
  return (
    <>
      <div className="reproductor">
        <ViewImgAudio />
        <ControlAudioDemo />
        <VolumenControlDemo />
        <button className="quitMusic">X</button>
      </div>
    </>
  );
}

export default ReproductorDemo;
