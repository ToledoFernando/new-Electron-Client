import MusicaActual from "../../components/MusicActual/MusicaActual";
import MusicList from "../../components/MusicCards/MusicList";
import { getMusic } from "../../store/user/UsersMusic";
import { useEffect } from "react";
import Folders from "../../components/Folders/Folders";
import "./Local.scss";

function Local() {
  const setMusicas = getMusic((state) => state.getMusic);
  const lista = getMusic((state) => state.list);
  const carpetas = getMusic((state) => state.folders);

  useEffect(() => {
    setMusicas();
  }, []);

  return (
    <div className="local">
      <MusicaActual />
      <div className="fileLocal">
        <MusicList musicas={lista} />
        <div className="folderLocal">
          <Folders folders={carpetas} />
        </div>
      </div>
    </div>
  );
}

export default Local;
