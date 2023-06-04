import { useState } from "react";
import { playListStore } from "../../store/playList/playListStore";
import "./Buscar.scss";

function Buscar() {
  const [name, setName] = useState<string>("");
  const playListData = playListStore((state) => state);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.length === 0) return playListData.reset();
    await playListData.searchPlayList(name);
  };

  return (
    <div className="buscarPlaylist">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          value={name}
          placeholder="Buscar... (vacio => todas las playlist)"
        />
        <button>Buscar</button>
      </form>
    </div>
  );
}

export default Buscar;
