import { List, Nodo } from "./ListClass";

export interface IMusic {
  id?: number;
  name: string;
  path: string;
}

export type MusicStoreState = {
  musics: List;
  getMusic: () => void;
};
