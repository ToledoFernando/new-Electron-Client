import { create } from "zustand";
import { IMusic, MusicStoreState } from "./UserMusicTypes";
import { List } from "./ListClass";

export const getMusic = create<MusicStoreState>((set) => ({
  musics: new List(),
  getMusic: async () => {
    let musicas: IMusic[];

    musicas = await getMusicFolder();
    const listMusic = new List();
    musicas.forEach((music: IMusic) => listMusic.push(music));
    set({ musics: listMusic });
  },
}));
