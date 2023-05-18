import { List, Nodo } from "./ListClass";

/**
 * @remarks
 * Interfaz que se usa como type de Musica y type de carpetas, ambos tienen (name, path)
 */
export interface IMusic {
  id?: number;
  name: string;
  path: string;
}

export interface IResult {
  files: IMusic[];
  folders: IMusic[];
}

export interface IMusicListLocal {
  musica: Nodo;
  sig: Nodo | null;
  ant: Nodo | null;
}

export type MusicStoreState = {
  musics: List;
  folders: IMusic[];
  folderActual: string[];
  list: IMusicListLocal[];
  listAux: IMusicListLocal[];
  getMusic: () => void;
  setSearch: (name: string) => void;
  getMusicFolder: (folder: IMusic) => void;
  backToFolder: (path: string[]) => void;
};
