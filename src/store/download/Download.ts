import { create } from "zustand";
import { IMusicUrl } from "../music/Musictype";
import { IDownload } from "./DownloadTyped";

export const download = create<IDownload>((set) => ({
  isDownloading: false,
  Porcentaje: 0,
  Name: "",
  downloadMusic: async (musica: IMusicUrl) => {
    send("downloadMusicURL", musica);
    set((state) => ({ isDownloading: !state.downloadMusic }));
  },
  setDownload: () => set((state) => ({ isDownloading: !state.isDownloading })),
  setPorcentaje: (porcentaje: number) => set({ Porcentaje: porcentaje }),
  setName: (name: string) => set({ Name: name }),
}));
