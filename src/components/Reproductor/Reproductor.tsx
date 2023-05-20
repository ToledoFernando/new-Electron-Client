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

function VolumenControl({ audio }: { audio: HTMLAudioElement | null }) {
  if (!audio) return null;
  const audioTag = useRef<HTMLInputElement>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(event.target.value) * 0.01;
    if (audioTag.current === null) return;
    audioTag.current.style.backgroundSize = `${Number(
      event.target.value
    )}% 100%`;
  };

  useEffect(() => {
    if (audioTag.current !== null) {
      const audioVolumen = Number(audioTag.current?.value);
      audioTag.current.value = audioVolumen.toString();
      audioTag.current.style.backgroundSize = `${audioTag.current.value}% 100%`;
    }
  }, []);

  return (
    <div className="volumentControl">
      <img
        className="volumenIcon"
        src={volumenIcon}
        alt=""
        width={15}
        height={15}
      />
      <input
        ref={audioTag}
        type="range"
        onChange={onChange}
        className="volumen"
        min={0}
        max={100}
      />
    </div>
  );
}

function Reproductor({ musica }: { musica: IMusicProps }) {
  const audioElement = useRef<HTMLAudioElement>(null);
  const [audio, setAudio] = useState<string>("");
  const [duration, setDuration] = useState<string>("00:00");
  const [timeAudio, setTimeAudio] = useState<number>(0);
  const [isPlay, setIsPlay] = useState<boolean>(true);
  const state = musicaActual((state) => state);

  const time = (num: number) => {
    const minutos = Math.floor(num / 60);
    const segundos = Math.floor(num % 60);
    if (segundos > 9) return `${minutos}:${segundos}` || "00:00";
    return `${minutos}:0${segundos}` || "00:00";
  };

  const handleChangeTime = (e: ChangeEvent<HTMLAudioElement>) => {
    if (audioElement.current === null) return;
    const num = Math.floor(e.currentTarget.currentTime);
    setTimeAudio(num);
  };

  const play = () => {
    if (audioElement.current === null) return;
    if (isPlay) {
      audioElement.current.pause();
      setIsPlay(false);
    } else {
      audioElement.current.play();
      setIsPlay(true);
    }
  };

  const finishAudio = () => {
    if (state.sig === null) return;
    state.setMusica(state.sig);
  };

  useEffect(() => {
    if (state.musica) {
      if (!state.musica?.online) {
        const music = new Blob([musica.buffer], { type: "audio/mp3" });
        const audio = document.createElement("audio");
        audio.preload = "metadata";
        audio.onloadedmetadata = () => {
          const result = time(audio.duration);
          setDuration(result);
        };
        setIsPlay(true);
        let url = URL.createObjectURL(music);
        audio.src = url;
        setAudio(url);
      } else {
        console.log("ES ONLINE");
        const audio = document.createElement("audio");
        audio.preload = "metadata";
        audio.onloadedmetadata = () => {
          const result = time(audio.duration);
          setDuration(result);
        };
        setIsPlay(true);
        audio.src = state.musica.url;
        setAudio(state.musica.url);
      }
    }
  }, [musica]);

  return (
    <>
      <audio
        className="musica"
        ref={audioElement}
        onTimeUpdate={handleChangeTime}
        autoPlay
        onEnded={finishAudio}
        src={audio}
      ></audio>
      <div className="reproductor">
        <ViewImgAudio />
        <ControlAudio
          play={play}
          isPlay={isPlay}
          audio={audioElement.current}
          duration={duration}
          time={timeAudio}
          timeAct={time(timeAudio)}
        />
        <VolumenControl audio={audioElement.current} />
        <button className="quitMusic" onClick={state.resetMusic}>
          X
        </button>
      </div>
    </>
  );
}

export default Reproductor;
