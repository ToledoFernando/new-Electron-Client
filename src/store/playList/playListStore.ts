import { create } from "zustand";
import { IPlayList, IPlayListStore } from "./PlayListTypes";

export const playListStore = create<IPlayListStore>((set) => ({
  playList: [],
  musicas: [],
  loading: false,
  PlayListAux: [],

  getPlayList: async () => {
    const result = (await window.getAllPlayList()) as IPlayList[];
    set({ playList: result, PlayListAux: result });
  },

  getMusicas: async (id: string) => {
    const result = await window.getMusicByPlayList(id);
    set({ musicas: result });
    return result;
  },

  reset: () => set((state) => ({ playList: state.PlayListAux })),
  searchPlayList: async (name: string) => {
    const data = await window.getPlayListsByName(name);
    set({ playList: data });
  },

  clearMusicas: () => set({ musicas: [] }),
}));
