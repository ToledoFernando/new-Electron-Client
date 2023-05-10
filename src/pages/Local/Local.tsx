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
      <div className="fileLocal">
        <MusicList musicas={musicas} />
        <div className="folderLocal">
          <h1>Sin Carpetas</h1>
        </div>
      </div>
    </div>
  );
}

export default Local;
