import { useEffect, useState, useRef } from "react";
import logoMusica from "../../../public/musicaLogo.png";
import { musicaActual } from "../../store/music/Music";
import "./MusicaActual.scss";

function MusicaActual() {
  const musica = musicaActual((state) => state.musica);
  const [duration, setDuration] = useState<string | undefined>("00:00");

  const time = (num: number) => {
    const minutos = Math.floor(num / 60);
    const segundos = Math.floor(num % 60);
    if (segundos > 9) return `${minutos}:${segundos}` || "00:00";
    return `${minutos}:0${segundos}` || "00:00";
  };

  useEffect(() => {
    if (musica === null) return;
    const audio = document.createElement("audio");
    audio.preload = "metadata";
    const blob = new Blob([musica.buffer], { type: "type/mp3" });
    audio.onloadedmetadata = () => {
      const result = time(audio.duration);
      setDuration(result);
    };
    audio.src = URL.createObjectURL(blob);
  }, [musica]);

  return (
    <div className="musicaActual">
      <img src={logoMusica} alt="musicaLogo" width={100} height={100} />
      {!musica ? (
        <h1>Seleccione una musica para escuchar</h1>
      ) : (
        <div className="info_music">
          <h1 className={musica.name.length <= 40 ? "name" : "nameLong"}>
            {musica.name.slice(0, -4)}
          </h1>
          <p className="duration">- {duration}</p>
        </div>
      )}
    </div>
  );
}

export default MusicaActual;
