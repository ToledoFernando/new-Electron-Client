import React from "react";
import FolderCard, { BackFolder } from "./FolderCard";
import { getMusic } from "../../store/user/UsersMusic";
import "./Folders.scss";

function Folders({ folders }: { folders: IMusic[] }) {
  const getFolder = getMusic((state) => state.getMusicFolder);
  const backFolder = getMusic((state) => state.folderActual);

  const handleClick = (folder: IMusic) => {
    getFolder(folder);
  };
  return (
    <div className="folders">
      {backFolder.length > 0 && <BackFolder />}
      {folders.map((folder: IMusic, index: number) => (
        <FolderCard folder={folder} get={handleClick} key={index} />
      ))}
    </div>
  );
}

export default Folders;
