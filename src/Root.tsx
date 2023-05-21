import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.tsx";
import Home from "./pages/Home/Home.tsx";
import Local from "./pages/Local/Local.tsx";
import Reproductor from "./components/Reproductor/Reproductor.tsx";
import { loading, musicaActual } from "./store/music/Music.ts";
import DownloadPage from "./pages/downloads/DownloadPage.tsx";
import ReproductorDemo from "./components/Reproductor/ReproductorDemo.tsx";
import Musicas from "./pages/music/Musicas.tsx";
import { Toaster } from "sonner";
import History from "./pages/history/History.tsx";
import "./Root.css";
import { download } from "./store/download/download.ts";

function App() {
  const load = loading((state) => state.loadingMusic);
  const musica = musicaActual((state) => state.musica);
  const setPorcentaje = download((state) => state.setPorcentaje);

  const xd = (a: any, b: number) => {
    setPorcentaje(b);
  };

  useEffect(() => {
    received("newProgress", xd);
  }, []);
  return (
    <div className="App">
      <NavBar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/downloads" element={<DownloadPage />} />
        <Route path="/local" element={<Local />} />
        <Route path="/music" element={<Musicas />} />
        <Route path="/history" element={<History />} />
      </Routes>
      {musica && <Reproductor musica={musica} />}
      {load && !musica && <ReproductorDemo />}
    </div>
  );
}

export default App;
