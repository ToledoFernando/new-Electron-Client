import { useState } from "react";

function ControlAudio({ audio }: { audio: HTMLAudioElement | null }) {
  const [isPlay, setIsPlay] = useState<boolean>(true);

  const play = () => {
    if (audio === null) return;
    isPlay ? audio.pause() : audio.play();
    setIsPlay(!isPlay);
  };

  return (
    <div>
      <button>Anterior</button>
      <button onClick={play}>{isPlay ? "Pause" : "Play"}</button>
      <button>Siguiente</button>
    </div>
  );
}

export default ControlAudio;
