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
  loading: boolean;
  PlayListAux: IPlayList[];

  getPlayList: () => Promise<void>;
  getMusicas: (id: string) => Promise<IMusicAPI[]>;

  searchPlayList: (name: string) => Promise<void>;
  reset: () => void;

  clearMusicas: () => void;
}
