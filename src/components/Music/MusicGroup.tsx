import { useRef } from "react";
import {
  IMusicAPIResult,
  IMusicAPIResultMusic,
} from "../../store/music/Musictype";
import MusicCard from "./MusicCard";
import "./MusicGroup.scss";

function MusicGroup({ musica }: { musica: IMusicAPIResult }) {
  const group = useRef<HTMLDivElement>(null);

  const next = () => {
    if (group.current === null) return;
    const anchoContenido = group.current.scrollWidth;
    const desplazamiento = anchoContenido * 0.05;
    group.current.scrollLeft += desplazamiento;
  };

  const back = () => {
    if (group.current === null) return;
    const anchoContenido = group.current.scrollWidth;
    const desplazamiento = anchoContenido * 0.05;
    group.current.scrollLeft -= desplazamiento;
  };

  return (
    <>
      <div className="relativ">
        {/* <h1>{Object.keys(musica)}</h1> */}
        <br />
        <div className="group" ref={group}>
          <span className="menos">
            <button onClick={back}>{"<"}</button>
          </span>
          <div className="content">
            {Object.values(musica)[0].map(
              (music: IMusicAPIResultMusic, index) => (
                <MusicCard key={index} musica={music} />
              )
            )}
          </div>
          <span className="mas">
            <button onClick={next}>{">"}</button>
          </span>
        </div>
      </div>
    </>
  );
}

export default MusicGroup;
