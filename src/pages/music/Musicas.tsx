import { useEffect } from "react";
import { musicApi } from "../../store/music/Music";
import MusicGroup from "../../components/Music/MusicGroup";
import Barra from "../../components/Music/Barra";
import loadAnim from "../../../public/loadAnim.svg";
import { IMusicAPI, IMusicAPIResult } from "../../store/music/Musictype";
import "./Music.scss";
import SearchResultMusic from "../../components/Music/SearchResultMusic";

function Musicas() {
  const apiStore = musicApi((state) => state);

  useEffect(() => {
    if (apiStore.data.length === 0) apiStore.setData();
  }, []);

  let data = apiStore.data as IMusicAPIResult[];
  const funct = () => {
    if (apiStore.data.length > 0 && "artist" in apiStore.data[0]) {
      const data = apiStore.data as IMusicAPI[];
      return (
        <div className="musics-api">
          <Barra />
          <SearchResultMusic musicasResul={data} />
        </div>
      );
    } else if (apiStore.data.length > 0 && "musics" in apiStore.data[0]) {
      data = apiStore.data as IMusicAPIResult[];
      return (
        <div className="musics">
          <Barra />
          <div className="musicContainer">
            {apiStore.data.length &&
              data.map((element: IMusicAPIResult, index) => (
                <MusicGroup musica={element} key={index} />
              ))}
          </div>
        </div>
      );
    } else if (apiStore.data.length === 0) {
      if (apiStore.load) {
        return (
          <div className="loadMusics">
            <img src={loadAnim} alt="" />
          </div>
        );
      } else {
        return (
          <div className="musics">
            <Barra />
            <div className="musicContainer">
              <h1 className="no-music">No se encontro musica</h1>
            </div>
          </div>
        );
      }
    }
  };

  return funct();

  // return (
  //   <div className="musics">
  //     <Barra />
  //     <div className="musicContainer">
  //       {apiStore.data.length &&
  //         data.map((element: IMusicAPIResult, index) => (
  //           <MusicGroup musica={element} key={index} />
  //         ))}
  //     </div>
  //   </div>
  // );
}

export default Musicas;
