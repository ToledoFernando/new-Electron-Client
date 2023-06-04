import { useState, ChangeEvent } from "react";

type Search = (name: string) => void;
type Reset = () => void;

function SearchMusic({ searchName }: { searchName: Search }) {
  const [search, setSearch] = useState<string>("");

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value);
  };

  return (
    <div className="inputSearch">
      <div className="divSearch">
        <input
          type="text"
          onChange={handleChange}
          value={search}
          placeholder="Nombre de la musica"
          id="searchInput"
        />
        <button id="searchButton" onClick={() => searchName(search)}>
          Buscar
        </button>
      </div>
    </div>
  );
}

export default SearchMusic;
