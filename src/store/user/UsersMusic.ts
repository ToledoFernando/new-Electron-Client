import { create } from "zustand";
import {
  IMusic,
  MusicStoreState,
  IMusicListLocal,
  IResult,
} from "./UserMusicTypes";
import { List } from "./ListClass";

export const getMusic = create<MusicStoreState>((set) => ({
  musics: new List(),
  folders: [] as IMusic[],
  folderActual: [],
  list: [] as IMusicListLocal[],
  listAux: [] as IMusicListLocal[],
  getMusic: async () => {
    let musicas: IResult;

    musicas = await window.getMusicFolder();

    const NodeListMusic = new List();
    let folders: IMusic[] = [];

    musicas.files.forEach((music: IMusic) => NodeListMusic.push(music));
    musicas.folders.forEach((carpeta: IMusic) => folders.push(carpeta));

    let current = NodeListMusic.head;
    let lista1: IMusicListLocal[] = [];
    while (current !== null) {
      lista1.push({
        musica: current,
        sig: current.next,
        ant: current.prevoius,
      });
      current = current.next;
    }
    set({
      musics: NodeListMusic,
      list: lista1,
      listAux: lista1,
      folders: folders,
    });
  },

  setSearch: (name: string) => {
    if (name.length === 0) set((state) => ({ list: state.listAux }));
    else {
      set((state) => {
        const listFilter = state.listAux.filter((music) =>
          music.musica.value.name.toLowerCase().includes(name.toLowerCase())
        );

        const newList = new List();
        listFilter.forEach((music) => newList.push(music.musica.value));

        let current = newList.head;
        let lista1: IMusicListLocal[] = [];
        while (current !== null) {
          lista1.push({
            musica: current,
            sig: current.next,
            ant: current.prevoius,
          });
          current = current.next;
        }
        return { list: lista1 };
      });
    }
  },
  getMusicFolder: async (folder: IMusic) => {
    let musicas: IResult;
    musicas = await window.getMusicFolderName(folder);

    const NodeListMusic = new List();
    let folders: IMusic[] = [];

    musicas.files.forEach((music: IMusic) => NodeListMusic.push(music));
    musicas.folders.forEach((carpeta: IMusic) => folders.push(carpeta));

    let current = NodeListMusic.head;
    let lista1: IMusicListLocal[] = [];
    while (current !== null) {
      lista1.push({
        musica: current,
        sig: current.next,
        ant: current.prevoius,
      });
      current = current.next;
    }
    set((state) => ({
      musics: NodeListMusic,
      list: lista1,
      listAux: lista1,
      folders: folders,
      folderActual: [...state.folderActual, folder.name],
    }));
  },
  backToFolder: async (path: string[]) => {
    let musicas: IResult;

    musicas = await window.getBackToFolder(path);

    const NodeListMusic = new List();
    let folders: IMusic[] = [];

    musicas.files.forEach((music: IMusic) => NodeListMusic.push(music));
    musicas.folders.forEach((carpeta: IMusic) => folders.push(carpeta));

    let current = NodeListMusic.head;
    let lista1: IMusicListLocal[] = [];
    while (current !== null) {
      lista1.push({
        musica: current,
        sig: current.next,
        ant: current.prevoius,
      });
      current = current.next;
    }
    let newPath = path.slice(0, -1);
    set((state) => ({
      musics: NodeListMusic,
      list: lista1,
      listAux: lista1,
      folders: folders,
      folderActual: newPath,
    }));
  },
}));
