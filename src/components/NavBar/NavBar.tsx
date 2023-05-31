import { Link } from "react-router-dom";
import NavBarOption from "./NavBarOption.tsx";
import music from "../../../public/music.svg";
import download from "../../../public/download.svg";
import folder from "../../../public/folder.svg";
import history from "../../../public/history.svg";
import icon from "../../../public/icon.png";
import playList from "../../../public/playlist.svg";
import "./NavBar.scss";

function NavBar() {
  return (
    <div className="NavBar">
      <div className="navContainer">
        <Link to="/">
          <img src={icon} alt="icon" width={40} height={40} />
        </Link>
        <ul>
          <NavBarOption path="/music" img={music} />
          <NavBarOption path="/playlist" img={playList} />
          <NavBarOption path="/downloads" img={download} />
          <NavBarOption path="/local" img={folder} />
          <NavBarOption path="/history" img={history} />
        </ul>
      </div>
      <label>v2.0</label>
    </div>
  );
}

export default NavBar;
