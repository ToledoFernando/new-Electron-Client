import {
  useEffect,
  useRef,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";

import { Nodo as NodoBBDD } from "../../pages/PlayListinfo/ClassList";
import { Nodo as NodoLocal } from "../../store/user/ListClass";

import { loading, musicaActual } from "../../store/music/Music";
import playIcon from "../../../public/play.png";
import pausa from "../../../public/pausa.png";
import sig from "../../../public/sig.png";
import iconReplay from "../../../public/replay.svg";

import "./ControlAudio.scss";

function ControlAudio({
  audio,
  duration,
  time,
  timeAct,
  play,
  isPlay,
  replay,
  setReplay,
}: {
  play: () => void;
  isPlay: boolean;
  replay: boolean;
  setReplay: Dispatch<SetStateAction<boolean>>;
  audio: HTMLAudioElement | null;
  duration: string;
  time: number;
  timeAct: string;
}) {
  const audioTag = useRef<HTMLInputElement>(null);
  const musica = musicaActual((state) => state);
  const load = loading((state) => state);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (audioTag.current === null) return;
    if (audio === null) return;
    audio.currentTime = Number(event.target.value);
    audioTag.current.value = audio.currentTime.toString();
    const porcentaje = (Number(event.target.value) / audio.duration) * 100;
    audioTag.current.style.backgroundSize = `${porcentaje.toFixed(2)}% 100%`;
  };

  useEffect(() => {
    if (audio === null) return;
    audio.addEventListener("timeupdate", () => {
      if (audioTag.current === null) return;
      audioTag.current.value = String(
        (audio.currentTime / audio.duration) * 100
      );
      audioTag.current.style.backgroundSize = `${audioTag.current.value}% 100%`;
    });
  }, [audio]);

  const changeMusicFollowing = async (
    musicaNode: NodoLocal | NodoBBDD | null
  ) => {
    if (musicaNode === null) return;
    if (musicaNode instanceof NodoBBDD) {
      load.setLoad();
      await musica.getMusicYT(
        musicaNode.value,
        musicaNode.prevoius,
        musicaNode.next
      );
      load.setLoad();
    }
    if (musicaNode instanceof NodoLocal) {
      musica.setMusica(musicaNode);
    }
  };

  const changeMusicPrevious = async (
    musicaNode: NodoBBDD | NodoLocal | null
  ) => {
    if (musicaNode === null) return;
    if (musicaNode instanceof NodoBBDD) {
      load.setLoad();
      await musica.getMusicYT(
        musicaNode.value,
        musicaNode.prevoius,
        musicaNode.next
      );
      load.setLoad();
    }
    if (musicaNode instanceof NodoLocal) {
      musica.setMusica(musicaNode);
    }
  };

  return (
    <div className="controlAudio">
      <button
        id="ant"
        className={musica.ant ? "ant" : "null"}
        onClick={() => musica.ant && changeMusicFollowing(musica.ant)}
        disabled={!musica.ant}
      >
        <img src={sig} alt="" width={25} height={25} />
      </button>
      <button onClick={play}>
        {isPlay ? (
          <img src={pausa} alt="" width={25} height={25} />
        ) : (
          <img src={playIcon} alt="" width={25} height={25} />
        )}
      </button>

      <button
        className={musica.sig ? "sig" : "null"}
        onClick={() => musica.sig && changeMusicPrevious(musica.sig)}
        disabled={!musica.sig}
      >
        <img src={sig} alt="" width={25} height={25} />
      </button>
      <label>{timeAct}</label>
      <input
        type="range"
        ref={audioTag}
        onChange={onChange}
        className="timeMusic"
        min={0}
        value={time}
        max={audio?.duration}
      />
      <label>{duration}</label>
      <button className="replayMusic" onClick={() => setReplay(!replay)}>
        <img
          src={iconReplay}
          style={!replay ? { filter: "invert(70%)" } : { filter: "invert(0%)" }}
          alt=""
          width={15}
          height={15}
        />
      </button>
    </div>
  );
}

export default ControlAudio;
