import { useEffect, useState, useRef } from "react";
import { IMusicProps } from "./types";
import "./Reproductor.scss";
import ControlAudio from "./ControlAudio";

function Reproductor({ musica }: { musica: IMusicProps }) {
  const audioElement = useRef<HTMLAudioElement>(null);
  const [audio, setAudio] = useState<string>("");
  const [duration, setDuration] = useState<string>("00:00");

  const time = (num: number) => {
    const minutos = Math.floor(num / 60);
    const segundos = Math.floor(num % 60);
    if (segundos > 9) return `${minutos}:${segundos}` || "00:00";
    return `${minutos}:0${segundos}` || "00:00";
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
    <div className="reproductor">
      <audio className="musica" ref={audioElement} autoPlay src={audio}></audio>
      <div className="audio">
        <ControlAudio audio={audioElement.current} />
      </div>
      <input type="range" className="timeMusic" min="0" max="100" />
      <label>{duration}</label>
    </div>
  );
}

export default Reproductor;
