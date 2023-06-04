import { useEffect, useState } from "react";
import Card from "../../pages/PlayListinfo/Card";
import { List } from "../../pages/PlayListinfo/ClassList";
import { IMusicAPI } from "../../store/music/Musictype";

function SearchResultMusic({ musicasResul }: { musicasResul: IMusicAPI[] }) {
  const [nodoList, setNodoList] = useState<List>();

  useEffect(() => {
    const list = new List();
    musicasResul.forEach((music: IMusicAPI) => list.push(music));
    setNodoList(list);
  }, []);

  return (
    <div className="playListInfo">{nodoList && <Card musica={nodoList} />}</div>
  );
}

export default SearchResultMusic;
