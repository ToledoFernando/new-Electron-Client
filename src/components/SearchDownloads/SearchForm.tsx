import React, { useState } from "react";
import { searchMusic } from "../../store/search/Search";
import { loading } from "../../store/music/Music";
import "./SearchForm.scss";

function SearchForm() {
  const [name, setName] = useState<string>("");
  const setLoadList = loading((state) => state.setLoadList);
  const search = searchMusic((state) => state.getMusicSearch);
  const clearList = searchMusic((state) => state.clearList);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearList();
    setLoadList();
    await search(name);
    setLoadList();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className="searchForm">
      <h3>Ingrese el nombre de una musica</h3>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          onChange={handleChange}
          value={name}
          placeholder="Nombre de la musica "
        />
        <button>Buscar</button>
      </form>
    </div>
  );
}

export default SearchForm;
