import { create } from "zustand";
import {
  IMusicaActual,
  IMusica,
  IMusicList,
  IMusicOnline,
  IMusicUrl,
  ILoad,
} from "./Musictype";
import { Nodo } from "../user/ListClass";

export const loading = create<ILoad>((set) => ({
  loadingMusic: false,
  loadingList: false,
  setLoad: () => set((state) => ({ loadingMusic: !state.loadingMusic })),
  setLoadList: () => set((state) => ({ loadingList: !state.loadingList })),
}));

export const musicaActual = create<IMusicaActual>((set) => ({
  ant: null,
  act: null,
  sig: null,
  musica: null,
  setMusica: async (nodo: Nodo) => {
    if (nodo === null) return;
    let newMusic: IMusica;
    newMusic = await getMusic(nodo.value);
    newMusic.online = false;

    console.log(newMusic);
    set(() => ({
      ant: nodo.prevoius,
      act: nodo,
      sig: nodo.next,
      musica: newMusic,
    }));
  },
  resetMusic: () => {
    set(() => ({ musica: null }));
  },

  setMusicOnlyne: async (musica: IMusicOnline): Promise<any> => {
    console.log(musica);
    const xd: IMusicUrl = await getURLMusic(musica.videoId);
    xd.online = true;
    xd.img = musica.img;
    xd.name = musica.title;
    xd.time = musica.seconds;
    xd.author = musica.author;

    set({ musica: xd, ant: null, sig: null });
    return xd;
  },
  downloadMusic: async (musica: IMusicUrl) => {
    // console.log(musica);
    send("downloadMusicURL", musica);
  },
}));

export const musicList = create<IMusicList>((set) => ({
  list: [],
  setList: (list) => {
    set({ list });
  },
}));
