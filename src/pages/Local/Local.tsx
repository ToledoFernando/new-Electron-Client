import MusicaActual from "../../components/MusicActual/MusicaActual";
import MusicList from "../../components/MusicCards/MusicList";
import { getMusic } from "../../store/user/UsersMusic";
import { useEffect } from "react";
import "./Local.scss";

function Local() {
  const setMusicas = getMusic((state) => state.getMusic);
  const musicas = getMusic((state) => state.musics);

  useEffect(() => {
    setMusicas();
  }, []);

  return (
    <div className="local">
      <MusicaActual />
      <MusicList musicas={musicas} />
    </div>
  );
}

export default Local;
