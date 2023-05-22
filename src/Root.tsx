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
import { download } from "./store/download/Download.ts";
import Bar from "./components/BAR/Bar.tsx";
import "./Root.css";

function App() {
  const load = loading((state) => state.loadingMusic);
  const musica = musicaActual((state) => state.musica);
  const stateDownload = download((state) => state);

  const xd = (a: any, b: number) => {
    stateDownload.setPorcentaje(b);
    if (b === 100) {
      stateDownload.setDownloadReset();
    }
  };

  useEffect(() => {
    received("newProgress", xd);
  }, []);
  return (
    <div className="App">
      <Bar />
      <NavBar />
      <Toaster position="top-right" />
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
