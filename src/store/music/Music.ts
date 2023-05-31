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

  getMusicYT: async (musica: IMusicAPIResultMusic) => {
    const xd = (await window.getMusicYTDL(musica.musicURL)) as IMusicUrl;

    xd.online = true;
    xd.id = musica._id;
    xd.img = musica.musicIMG;
    xd.name = musica.name;
    xd.time = musica.duration;
    xd.author = musica.artist;
    set({ musica: xd });
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
  setData: async () => {
    let musica: IMusicAPIResult[];
    musica = await window.getApiData();
    set({ data: musica });
  },
}));
