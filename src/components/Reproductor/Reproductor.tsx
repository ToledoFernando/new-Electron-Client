import { useRef, useEffect, useState, ChangeEvent } from "react";
import { IMusicProps } from "./types";
import ControlAudio from "./ControlAudio";
import { loading, musicaActual } from "../../store/music/Music";
import audioLogo from "../../../public/musicaLogo.png";
import volumenIcon from "../../../public/volumenIcon.png";
import downloadIcon from "../../../public/iconDownload.svg";
import alertIcon from "../../../public/alert.svg";
import { IMusicUrl, IMusica } from "../../store/music/Musictype";
import loadAnim from "../../../public/loadAnim.svg";
import iconClose from "../../../public/close.svg";
import { download } from "../../store/download/Download";
import { toast } from "sonner";
import "./Reproductor.scss";
import { infoProblemStore } from "../../store/infoProblema/infoProblema";

function ViewImgAudio() {
  const audioIMG = musicaActual((state) => state.musica);
  const downloadMusic = download((state) => state);
  const load = loading((state) => state.loadingMusic);

  const getDownloadMusic = (musica: IMusicUrl | IMusica) => {
    //validamos que musica sea un type IMusicUrl
    if (!("bitrate" in musica)) return;

    downloadMusic.downloadMusic(musica);
    toast.error("Descarga iniciada");
    console.log(musica);
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

function Reproductor({
  musica,
}: {
  musica: IMusicProps | IMusicUrl | IMusica;
}) {
  const audioElement = useRef<HTMLAudioElement>(null);
  const [audio, setAudio] = useState<string>("");
  const [duration, setDuration] = useState<string>("00:00");
  const [timeAudio, setTimeAudio] = useState<number>(0);
  const [isPlay, setIsPlay] = useState<boolean>(true);
  const [replay, setReplay] = useState<boolean>(false);
  const state = musicaActual((state) => state);
  const infoProblemData = infoProblemStore((state) => state);

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
    if (replay) {
      if (audioElement.current === null) return;
      audioElement.current.pause();
      audioElement.current.currentTime = 0;
      audioElement.current.play();
      return;
    } else {
      if (state.sig === null) return setIsPlay(false);
      state.setMusica(state.sig);
    }
  };

  useEffect(() => {
    if (state.musica) {
      if (!state.musica?.online) {
        if (!("buffer" in musica)) return;
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
        try {
          if (!("url" in state.musica)) return;
          const audio = document.createElement("audio");
          audio.addEventListener("loadstart", () =>
            console.log("Iniciando carga del audio")
          );
          audio.addEventListener("error", () =>
            console.log("Fallo la carga del audio")
          );
          audio.preload = "metadata";
          audio.onloadedmetadata = () => {
            const result = time(audio.duration);
            setDuration(result);
          };
          setIsPlay(true);
          audio.src = state.musica.url;
          audio.volume = audioElement?.current?.volume || 0;
          setAudio(state.musica.url);
        } catch (error) {
          state.resetMusic();
          toast.error("Ocurrio un error al solicitar la musica");
        }
      }
    }
  }, [musica]);

  const setProblem = () => {
    if (state.musica === null) return;
    if (!("id" in state.musica)) return;
    if (state.musica.id === undefined) return;
    infoProblemData.setProblem(state.musica.id);
  };

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
          replay={replay}
          setReplay={setReplay}
        />
        <VolumenControl audio={audioElement.current} />
        <div className="butonOpt">
          {/* Validamos que exista el id en el estado */}
          {state.musica &&
          "id" in state.musica &&
          state.musica.id !== undefined ? (
            <img
              src={alertIcon}
              width={20}
              height={20}
              onClick={setProblem}
              title="Reportar Problema con la musica"
            />
          ) : null}
          <button className="quitMusic" onClick={state.resetMusic}>
            <img src={iconClose} alt="" width={20} height={20} />
          </button>
        </div>
      </div>
    </>
  );
}

export default Reproductor;
