import { create } from "zustand";
import { IMusicaActual, IMusica } from "./Musictype";
import { Nodo } from "../user/ListClass";

export const musicaActual = create<IMusicaActual>((set) => ({
  ant: null,
  act: null,
  sig: null,
  musica: null,
  setMusica: async (nodo: Nodo | null) => {
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
}));
