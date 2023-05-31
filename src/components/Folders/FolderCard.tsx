import React from "react";
import folderIMG from "../../../public/folderIMG.svg";
import folderBack from "../../../public/folderBack.svg";
import { getMusic } from "../../store/user/UsersMusic";
import "./FolderCard.scss";

export function BackFolder() {
  const folder = getMusic((state) => state.folderActual);
  const backFolder = getMusic((state) => state.backToFolder);

  return (
    <div className="folder-card" onClick={() => backFolder(folder)}>
      <img src={folderBack} alt="" />
      <p className="name">Volver</p>
    </div>
  );
}

interface IMusic {
  name: string;
  path: string;
}

function FolderCard({
  folder,
  get,
}: {
  folder: IMusic;
  get: (folder: IMusic) => void;
}) {
  return (
    <div className="folder-card" onClick={() => get(folder)}>
      <img src={folderIMG} alt="" />
      <p className={folder.name.length > 10 ? "long-name" : "name"}>
        {folder.name}
      </p>
    </div>
  );
}

export default FolderCard;
