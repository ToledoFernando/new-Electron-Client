import React from "react";
import { searchMusic } from "../../store/search/Search";
import SearchCard from "./SearchCard";
import { IMusicOnline } from "../../store/music/Musictype";
import { loading } from "../../store/music/Music";
import iconLoad from "../../../public/loadAnim.svg";
import "./Search.scss";
import { IResultSearch } from "../../vite-env";

function SearchResult() {
  const loadList = loading((state) => state.loadingList);
  const music = searchMusic((state) => state.musics);

  return (
    <div className="div-result">
      {music.length > 0 ? (
        music.map((music: IMusicOnline | IResultSearch, index: number) => {
          if (!("img" in music)) return;
          return <SearchCard key={index} musica={music} />;
        })
      ) : (
        <div className="sin_musica">
          {loadList ? (
            <div className="load">
              <img src={iconLoad} alt="" />
            </div>
          ) : (
            <h1>ingrese el nombre de una musica para buscar algun resultado</h1>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResult;
