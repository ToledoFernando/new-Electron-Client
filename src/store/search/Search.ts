import { create } from "zustand";
import { ISearch } from "./SearchType";

export const searchMusic = create<ISearch>((set) => ({
  musics: [],
  getMusicSearch: async (name: string) => {
    const result = await window.searchMusicYT(name);
    set({ musics: result });
  },
  clearList: () => set({ musics: [] }),
}));
