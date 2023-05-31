import { create } from "zustand";
import { IPlayList, IPlayListStore } from "./PlayListTypes";

export const playListStore = create<IPlayListStore>((set) => ({
  playList: [],
  musicas: [],
  getPlayList: async () => {
    const result = (await window.getAllPlayList()) as IPlayList[];
    set({ playList: result });
  },

  getMusicas: async (id: string) => {
    const result = await window.getMusicByPlayList(id);
    set({ musicas: result });
  },

  clearMusicas: () => set({ musicas: [] }),
}));
