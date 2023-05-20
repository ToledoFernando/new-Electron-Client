import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.tsx";
import Home from "./pages/Home/Home.tsx";
import Local from "./pages/Local/Local.tsx";
import Reproductor from "./components/Reproductor/Reproductor.tsx";
import { loading, musicaActual } from "./store/music/Music.ts";
import DownloadPage from "./pages/downloads/DownloadPage.tsx";
import "./Root.css";
import ReproductorDemo from "./components/Reproductor/ReproductorDemo.tsx";

function App() {
  const load = loading((state) => state.loadingMusic);
  const musica = musicaActual((state) => state.musica);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/downloads" element={<DownloadPage />} />
        <Route path="/local" element={<Local />} />
        <Route path="/music" element={<h1>Musicas </h1>} />
      </Routes>
      {musica && <Reproductor musica={musica} />}
      {load && !musica && <ReproductorDemo />}
    </div>
  );
}

export default App;
