import { ReactNode, useState } from "react";
import MusicCard from "./MusicCard";
import { List } from "../../store/user/ListClass";
import { musicaActual } from "../../store/music/Music";
import SearchMusic from "./SearchMusic";

function MusicList({ musicas }: { musicas: List }) {
  let current = musicas.head;
  let currentAux = musicas.head;
  let lista: ReactNode[] = [];
  let listaAux: ReactNode[] = [];
  const [myList, setMyList] = useState<ReactNode[]>([]);

  const setMusic = musicaActual((state) => state.setMusica);

  while (current !== null) {
    myList.push(
      <MusicCard musica={current} set={setMusic} key={current.value.id} />
    );

    current = current.next;
  }
  listaAux = [...myList];

  const search = (name: string) => {
    if (name.length === 0) {
      setMyList(lista);
    } else {
      setMyList(lista);
      current = currentAux;
      while (current !== null) {
        if (current.value.name.toLowerCase().includes(name.toLowerCase())) {
          myList.push(
            <MusicCard musica={current} set={setMusic} key={current.value.id} />
          );
        }
        current = current.next;
      }
      // setMyList(temple);
    }
  };

  const resetSearch = () => {
    console.log("reset");
  };

  return (
    <div className="searchMusic">
      <SearchMusic searchName={search} reset={resetSearch} />
      <ul className="list-group">
        {myList.length ? myList : <h1>No se encontro ninguna Musica</h1>}
      </ul>
    </div>
  );
}

export default MusicList;
