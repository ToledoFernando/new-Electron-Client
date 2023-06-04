import { useState } from "react";
import { genetoStore } from "../../store/generos/genero";
import { IGeneros } from "../../store/generos/generosType";
import "./barra.scss";
import { musicApi } from "../../store/music/Music";

function Barra() {
  const [name, setName] = useState<string>("");
  const [genero, setGenero] = useState<string>("all");
  const genrerData = genetoStore((state) => state.generos);
  const musicSearch = musicApi((state) => state);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeGener = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenero(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    musicSearch.setLoad(true);
    const buscar = {
      name: name,
      genero: genero,
    };
    await musicSearch.getSearchMusicAPI(buscar);
    musicSearch.setLoad(false);
  };

  return (
    <div className="barra">
      <button className="reset" onClick={() => musicSearch.resetData()}>
        Reset
      </button>
      <form className="form-buscar" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            onChange={handleChangeName}
            value={name}
            placeholder="Buscar Musica"
          />
          <button>Buscar</button>
        </div>
        <div className="select-genero">
          <p>Genero: </p>
          <select defaultValue="all" onChange={handleChangeGener}>
            <option value="all">Todos los generos</option>
            {genrerData.map((genero: IGeneros, index: number) => (
              <option key={index} value={genero._id}>
                {genero.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}

export default Barra;
