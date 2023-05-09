import { create } from "zustand";
import { IGetMusica, IMusicaActual, IMusica } from "./Musictype";

export const musicaActual = create<IMusicaActual>((set) => ({
  musica: null,
  setMusica: async (musica: IGetMusica) => {
    let newMusic: IMusica;
    newMusic = await getMusic(musica);

    set(() => ({ musica: newMusic }));
  },
}));
