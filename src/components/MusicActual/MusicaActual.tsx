import { useEffect, useState, useRef } from "react";
import logoMusica from "../../../public/musicaLogo.png";
import { musicaActual } from "../../store/music/Music";
import "./MusicaActual.scss";
import { IMusica } from "../../store/music/Musictype";

function MusicaActual() {
  const musica = musicaActual((state) => state.musica);
  const [duration, setDuration] = useState<string | undefined>("00:00");
  const [type, setType] = useState<string | undefined>("mp3");

  const time = (num: number) => {
    const minutos = Math.floor(num / 60);
    const segundos = Math.floor(num % 60);
    if (segundos > 9) return `${minutos}:${segundos}` || "00:00";
    return `${minutos}:0${segundos}` || "00:00";
  };

  useEffect(() => {
    if (musica === null) return;
    if (musica.online) return;
    if (!("buffer" in musica)) return;
    const audio = document.createElement("audio");
    audio.preload = "metadata";
    const blob = new Blob([musica.buffer], { type: "type/mp3" });
    audio.onloadedmetadata = (evt) => {
      const result = time(audio.duration);
      setDuration(result);
    };
    audio.src = URL.createObjectURL(blob);
  }, [musica]);

  return (
    <div className="musicaActual">
      {musica?.img ? (
        <span
          className="musicaLogo"
          style={{ backgroundImage: `url(${musica.img})` }}
        ></span>
      ) : (
        <img src={logoMusica} alt="musicaLogo" width={100} height={100} />
      )}
      {!musica ? (
        <div className="sinMusica">
          <h1>Lista de musica local</h1>
          <p>
            Se cargaran automaticamente las musicas que se encuentren en la
            carpeta la carpeta Musica
          </p>
        </div>
      ) : (
        <div className="info_music">
          <h1 className={musica.name.length <= 40 ? "name" : "nameLong"}>
            {musica.name.slice(0, -4)}
          </h1>
          <p className="duration">
            - Duracion:{" "}
            {musica.online
              ? "time" in musica && time(musica.time - 1)
              : duration}
          </p>
          {musica.online && (
            <>
              <br />
              <p className="duration">
                {" "}
                - {"author" in musica && musica.author}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default MusicaActual;
