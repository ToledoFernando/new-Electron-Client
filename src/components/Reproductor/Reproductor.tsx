import { useRef, useEffect, useState, ChangeEvent } from "react";
import { IMusicProps } from "./types";
import ControlAudio from "./ControlAudio";
import { musicaActual } from "../../store/music/Music";
import audioLogo from "../../../public/musicaLogo.png";
import volumenIcon from "../../../public/volumenIcon.png";
import "./Reproductor.scss";

function ViewImgAudio() {
  const audioIMG = musicaActual((state) => state.musica);
  return (
    <>
      {audioIMG?.img ? (
        <img className="imgMusic" src={audioIMG.img} alt="" />
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

  const finishAudio = () => {
    if (state.sig === null) return;
    state.setMusica(state.sig);
  };

  useEffect(() => {
    const music = new Blob([musica.buffer], { type: "audio/mp3" });
    const audio = document.createElement("audio");
    audio.preload = "metadata";
    audio.onloadedmetadata = () => {
      const result = time(audio.duration);
      setDuration(result);
    };
    let url = URL.createObjectURL(music);
    audio.src = url;
    setAudio(url);
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
          audio={audioElement.current}
          duration={duration}
          time={timeAudio}
          timeAct={time(timeAudio)}
        />
        <VolumenControl audio={audioElement.current} />
        <button onClick={state.resetMusic}>X</button>
      </div>
    </>
  );
}

export default Reproductor;
