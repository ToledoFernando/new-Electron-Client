import "./MusicCard.scss";
import { Nodo } from "../../store/user/ListClass";
import { IGetMusica } from "../../store/music/Musictype";

type setFuntion = (nodo: Nodo) => void;

function MusicCard({ musica, set }: { musica: Nodo; set: setFuntion }) {
  return (
    <div className="music-card" onClick={() => set(musica)}>
      <p>{musica.value.name.slice(0, -4)}</p>
    </div>
  );
}

export default MusicCard;
