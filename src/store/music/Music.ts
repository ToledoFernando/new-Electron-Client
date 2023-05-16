import { ReactNode } from "react";
import MusicCard from "../../components/MusicCards/MusicCard";
import { create } from "zustand";
import { IMusicaActual, IMusica, IMusicList } from "./Musictype";
import { Nodo } from "../user/ListClass";

export const musicaActual = create<IMusicaActual>((set) => ({
  ant: null,
  act: null,
  sig: null,
  musica: null,
  setMusica: async (nodo: Nodo) => {
    if (nodo === null) return;
    let newMusic: IMusica;
    newMusic = await getMusic(nodo.value);

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
}));

export const musicList = create<IMusicList>((set) => ({
  list: [],
  setList: (list) => {
    console.log("##################");
    console.log(list);
    console.log("##################");
    set({ list });
  },
}));
