import "./MusicCard.scss";
import { Nodo } from "../../store/user/ListClass";
import { IGetMusica } from "../../store/music/Musictype";

type setFuntion = (musica: IGetMusica) => void;

function MusicCard({ musica, set }: { musica: Nodo; set: setFuntion }) {
  return (
    <div className="music-card" onClick={() => set(musica.value)}>
      <p>{musica.value.name.slice(0, -4)}</p>
    </div>
  );
}

export default MusicCard;
