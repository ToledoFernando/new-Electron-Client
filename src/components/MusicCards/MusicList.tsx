import MusicCard from "./MusicCard";
import { List } from "../../store/user/ListClass";
import { musicaActual } from "../../store/music/Music";
import SearchMusic from "./SearchMusic";

function MusicList({ musicas }: { musicas: List }) {
  let current = musicas.head;
  const lista = [];
  const listaAux = [];
  const setMusic = musicaActual((state) => state.setMusica);

  while (current !== null) {
    lista.push(
      <MusicCard musica={current} set={setMusic} key={current.value.id} />
    );
    current = current.next;
  }

  const search = (name: string) => {
    console.log(name);
  };
  const resetSearch = () => {
    console.log("OIAWNDOAIWNDOIAW ");
  };
  return (
    <div className="searchMusic">
      <SearchMusic searchName={search} reset={resetSearch} />
      <ul className="list-group">{lista}</ul>
    </div>
  );
}

export default MusicList;
