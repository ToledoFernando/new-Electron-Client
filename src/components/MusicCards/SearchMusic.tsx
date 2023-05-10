import { useState, ChangeEvent } from "react";

type Search = (name: string) => void;
type Reset = () => void;

function SearchMusic({
  searchName,
  reset,
}: {
  searchName: Search;
  reset: Reset;
}) {
  const [search, setSearch] = useState<string>("");

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value);
  };

  return (
    <div className="inputSearch">
      <input
        type="text"
        onChange={handleChange}
        value={search}
        placeholder="Nombre de la musica"
        id="searchInput"
      />
      <input type="submit" value="Buscar" onClick={() => searchName(search)} />
      <input type="submit" value="Reset" onClick={reset} />
    </div>
  );
}

export default SearchMusic;
