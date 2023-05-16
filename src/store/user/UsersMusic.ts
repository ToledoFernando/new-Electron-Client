import { create } from "zustand";
import { IMusic, MusicStoreState, IMusicListLocal } from "./UserMusicTypes";
import { List } from "./ListClass";

export const getMusic = create<MusicStoreState>((set) => ({
  musics: new List(),
  list: [] as IMusicListLocal[],
  listAux: [] as IMusicListLocal[],
  getMusic: async () => {
    let musicas: IMusic[];

    musicas = await getMusicFolder();
    const NodeListMusic = new List();
    musicas.forEach((music: IMusic) => NodeListMusic.push(music));

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
    set({ musics: NodeListMusic, list: lista1, listAux: lista1 });
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
}));
