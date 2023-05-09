import MusicCard from "./MusicCard";
import { List } from "../../store/user/ListClass";
import { musicaActual } from "../../store/music/Music";

function MusicList({ musicas }: { musicas: List }) {
  let current = musicas.head;
  const lista = [];
  const setMusic = musicaActual((state) => state.setMusica);

  while (current !== null) {
    lista.push(
      <MusicCard musica={current} set={setMusic} key={current.value.id} />
    );
    current = current.next;
  }
  return <ul className="list-group">{lista}</ul>;
}

export default MusicList;
