import { useEffect, useState } from "react";
import { musicaActual, loading } from "../../store/music/Music";
import { IMusicAPIResultMusic } from "../../store/music/Musictype";
import { List, IMusicList } from "../../pages/PlayListinfo/ClassList";
import "./MusicGroup.scss";

function CardMusic({ musica }: { musica: List }) {
  const musicaAct = musicaActual((state) => state.getMusicYT);
  const actual = musicaActual((state) => state);
  const setLoad = loading((state) => state.setLoad);
  const [musicas, setMusicas] = useState<IMusicList[]>([]);

  const time = (num: number) => {
    const minutos = Math.floor(num / 60);
    const segundos = Math.floor(num % 60);
    if (segundos > 9) return `${minutos}:${segundos}` || "00:00";
    return `${minutos}:0${segundos}` || "00:00";
  };

  const getMusic = async (data: IMusicAPIResultMusic, ante: any, sig: any) => {
    setLoad();
    await musicaAct(data, ante, sig);
    setLoad();
  };

  useEffect(() => {
    let current = musica.head;
    let lista1: IMusicList[] = [];
    while (current !== null) {
      lista1.push({
        musica: current,
        sig: current.next,
        ant: current.prevoius,
      });
      current = current.next;
    }
    setMusicas(lista1);
  }, []);

  return (
    <>
      {musicas.length &&
        musicas.map((item, index) => (
          <div
            key={index}
            className={
              actual.musica?.name === item.musica.value.name
                ? "card_music_active"
                : "card_music"
            }
            onClick={() => getMusic(item.musica.value, item.ant, item.sig)}
          >
            <img
              src={
                item.musica.value.musicIMG ||
                "https://th.bing.com/th/id/OIG.ydlwZSfll52z3d9UxnYW?pid=ImgGn"
              }
              width={40}
              height={40}
              alt=""
            />
            <div className="info">
              <p
                className={
                  item.musica.value.name.length > 10 ? "name_long" : "name"
                }
              >
                {item.musica.value.name}
              </p>
              <p>- {item.musica.value.artist}</p>
              <p>{time(item.musica.value.duration - 1)}</p>
            </div>
          </div>
        ))}
    </>
  );
}

export default CardMusic;
