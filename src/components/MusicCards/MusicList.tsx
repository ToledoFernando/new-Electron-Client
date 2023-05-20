import { useEffect } from "react";
import MusicCard from "./MusicCard";
import SearchMusic from "./SearchMusic";
import { IMusicListLocal } from "../../store/user/UserMusicTypes";
import { musicaActual } from "../../store/music/Music";
import { getMusic } from "../../store/user/UsersMusic";

function MusicList({ musicas }: { musicas: IMusicListLocal[] }) {
  const set = musicaActual((state) => state.setMusica);
  const searchMusic = getMusic((state) => state.setSearch);
  const music = getMusic((state) => state.musics);

  const search = (name: string) => {
    searchMusic(name);
  };

  const resetSearch = () => {
    console.log("reset");
  };

  useEffect(() => {
    console.log();
  });

  return (
    <div className="searchMusic">
      <SearchMusic searchName={search} reset={resetSearch} />
      <ul className="list-group">
        {musicas.length > 0 ? (
          musicas.map((music) => (
            <MusicCard
              musica={music.musica}
              set={set}
              key={music.musica.value.id}
            />
          ))
        ) : (
          <h1>No se encontro ninguna Musica</h1>
        )}
      </ul>
    </div>
  );
}

export default MusicList;
