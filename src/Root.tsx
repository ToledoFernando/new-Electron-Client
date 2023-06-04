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
import PlayList from "./pages/PlayList/PlayList.tsx";
import PlayListInfo from "./pages/PlayListinfo/PlayListInfo.tsx";
import MusicProblem from "./components/MusicProblem/MusicProblem.tsx";
import { infoProblemStore } from "./store/infoProblema/infoProblema.ts";
import { useNavigate } from "react-router-dom";
import { genetoStore } from "./store/generos/genero.ts";
import "./Root.css";

function App() {
  const load = loading((state) => state.loadingMusic);
  const musica = musicaActual((state) => state.musica);
  const stateDownload = download((state) => state);
  const isProblem = infoProblemStore((state) => state.isProblem);
  const gener = genetoStore((state) => state);
  const navigate = useNavigate();

  const newPorsentaje = (a: any, b: number) => {
    stateDownload.setPorcentaje(b);
  };

  const finishDownload = () => {
    stateDownload.setDownloadReset();
  };

  useEffect(() => {
    window.received("newProgress", newPorsentaje);
    window.received("finishProgress", finishDownload);
    gener.setGenetos();
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) navigate("/music");
  }, []);
  return (
    <div className="App">
      {isProblem && <MusicProblem />}
      <Bar />
      <NavBar />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/downloads" element={<DownloadPage />} />
        <Route path="/local" element={<Local />} />
        <Route path="/music" element={<Musicas />} />
        <Route path="/history" element={<History />} />
        <Route path="/playlist" element={<PlayList />} />
        <Route path="/playlist/:id" element={<PlayListInfo />} />
      </Routes>
      {musica && <Reproductor musica={musica} />}
      {load && !musica && <ReproductorDemo />}
    </div>
  );
}

export default App;
