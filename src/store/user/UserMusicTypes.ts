import { List, Nodo } from "./ListClass";

export interface IMusic {
  id?: number;
  name: string;
  path: string;
}

export interface IMusicListLocal {
  musica: Nodo;
  sig: Nodo | null;
  ant: Nodo | null;
}

export type MusicStoreState = {
  musics: List;
  list: IMusicListLocal[];
  listAux: IMusicListLocal[];
  getMusic: () => void;
  setSearch: (name: string) => void;
};
