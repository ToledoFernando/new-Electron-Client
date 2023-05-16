import MusicaActual from "../../components/MusicActual/MusicaActual";
import MusicList from "../../components/MusicCards/MusicList";
import { getMusic } from "../../store/user/UsersMusic";
import { useEffect } from "react";
import "./Local.scss";

function Local() {
  const setMusicas = getMusic((state) => state.getMusic);
  const lista = getMusic((state) => state.list);

  useEffect(() => {
    setMusicas();
  }, []);

  return (
    <div className="local">
      <h1>{lista.length}</h1>
      <MusicaActual />
      <div className="fileLocal">
        <MusicList musicas={lista} />
        <div className="folderLocal">
          <h1>Sin Carpetas</h1>
        </div>
      </div>
    </div>
  );
}

export default Local;
