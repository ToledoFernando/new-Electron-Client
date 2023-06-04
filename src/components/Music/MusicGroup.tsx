import { useEffect, useRef, useState } from "react";
import { IMusicAPIResult } from "../../store/music/Musictype";
import "./MusicGroup.scss";
import { List } from "../../pages/PlayListinfo/ClassList";
import CardMusic from "./CardMusic";

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

  const [nodoList, setNodoList] = useState<List>();

  useEffect(() => {
    const list = new List();
    musica.musics.forEach((music) => list.push(music));
    setNodoList(list);
  }, []);

  return (
    <>
      <div className="relativ">
        <br />
        <div className="group" ref={group}>
          <span className="menos">
            <button onClick={back}>{"<"}</button>
          </span>
          <div className="content">
            {nodoList && <CardMusic musica={nodoList} />}
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
