import { IMusicOnline } from "../music/Musictype";

export interface ISearch {
  musics: IResultSearch[];
  getMusicSearch: (name: string) => Promise<any>;
  clearList: () => void;
}

export interface IResultSearch {
  videoId: string;
  url: string;
  title: string;
  image: string;
  thumbnail: string;
  seconds: number;
  views: number;
  author: string;
}
