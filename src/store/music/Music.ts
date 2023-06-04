import { create } from "zustand";
import {
  IMusicaActual,
  IMusica,
  IMusicList,
  IMusicOnline,
  IMusicUrl,
  ILoad,
  IMusicApi,
  IMusicAPIResult,
  IMusicAPIResultMusic,
  IDataSearch,
  IMusicAPI,
} from "./Musictype";
import { Nodo as NodoLocal } from "../user/ListClass";
import { Nodo as NodoBBDD } from "../../pages/PlayListinfo/ClassList";
import { IMusic } from "../user/UserMusicTypes";

export const loading = create<ILoad>((set) => ({
  loadingMusic: false,
  loadingList: false,
  setLoad: () => set((state) => ({ loadingMusic: !state.loadingMusic })),
  setLoadList: () => set((state) => ({ loadingList: !state.loadingList })),
}));

export interface IMusic2 {
  id?: number;
  name: string;
  path: string;
}

export const musicaActual = create<IMusicaActual>((set) => ({
  ant: null,
  act: null,
  sig: null,
  musica: null,

  setMusica: async (nodo: NodoLocal | NodoBBDD) => {
    if (nodo === null) return;
    if (nodo instanceof NodoBBDD) return;
    let newMusic: IMusica;
    newMusic = (await window.getMusic(nodo.value)) as IMusica;
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

  getMusicYT: async (
    musica: IMusicAPIResultMusic | IMusic,
    ant: NodoBBDD | NodoLocal | null,
    sig: NodoBBDD | NodoLocal | null
  ) => {
    if (!("musicURL" in musica)) return;
    const xd = (await window.getMusicYTDL(musica.musicURL)) as IMusicUrl;

    xd.online = true;
    xd.id = musica._id;
    xd.img = musica.musicIMG;
    xd.name = musica.name;
    xd.time = musica.duration;
    xd.author = musica.artist;
    set({ musica: xd, ant: ant, sig: sig });
  },

  setMusicOnlyne: async (musica: IMusicOnline): Promise<IMusicUrl> => {
    console.log(musica);
    const xd = (await window.getURLMusic(musica.videoId)) as IMusicUrl;
    xd.online = true;
    xd.img = musica.img;
    xd.name = musica.title;
    xd.time = musica.seconds;
    xd.author = musica.author;

    set({ musica: xd, ant: null, sig: null });
    return xd;
  },

  setMusicApi: (music: IMusicAPIResult | IMusicAPIResultMusic) => {
    let xd: IMusicUrl = {} as IMusicUrl;

    if (!("name" in music)) return;
    if (!("musicIMG" in music)) return;
    if (!("duration" in music)) return;
    if (!("artist" in music)) return;
    if (!("musicURL" in music)) return;

    xd.online = true;
    xd.img = music.musicIMG;
    xd.name = music.name;
    xd.time = music.duration;
    xd.author = music.artist;
    xd.url = music.musicURL;

    set({ musica: xd });
  },
}));

export const musicList = create<IMusicList>((set) => ({
  list: [],
  setList: (list) => {
    set({ list });
  },
}));

export const musicApi = create<IMusicApi>((set) => ({
  data: [],
  load: false,
  dataAux: [],

  setLoad: (state: boolean) => set({ load: state }),

  setData: async () => {
    let musica: IMusicAPIResult[];
    musica = await window.getApiData();
    set({ data: musica, dataAux: musica });
  },
  getSearchMusicAPI: async (buscar: IDataSearch) => {
    if (buscar.name.length === 0) {
      set({ data: [] });
      const result = (await window.searchMusicByGener(
        buscar.genero
      )) as IMusicAPI[];
      set({ data: result });
    } else {
      set({ data: [] });
      const result = (await window.searchMusicAPI(buscar)) as IMusicAPI[];
      set({ data: result });
    }
  },
  resetData: () => set((state) => ({ data: state.dataAux })),
}));
