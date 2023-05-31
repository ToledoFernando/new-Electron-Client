import { IMusicAPI } from "../music/Musictype";

export interface IPlayList {
  _id: string;
  name: string;
  musics: string[];
  img: string;
  gener: string[];
  __v: number;
}

export interface IPlayListStore {
  playList: IPlayList[];
  musicas: IMusicAPI[];
  getPlayList: () => Promise<void>;
  getMusicas: (id: string) => Promise<void>;

  clearMusicas: () => void;
}
