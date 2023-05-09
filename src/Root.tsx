import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.tsx";
import Home from "./pages/Home/Home.tsx";
import Local from "./pages/Local/Local.tsx";
import Reproductor from "./components/Reproductor/Reproductor.tsx";
import { musicaActual } from "./store/music/Music.ts";
import "./Root.css";

function App() {
  const musica = musicaActual((state) => state.musica);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/downloads" element={<h1>Downloads </h1>} />
        <Route path="/local" element={<Local />} />
        <Route path="/music" element={<h1>Musicas </h1>} />
      </Routes>
      {musica && <Reproductor musica={musica} />}
    </div>
  );
}

export default App;
