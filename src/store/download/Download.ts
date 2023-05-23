import { create } from "zustand";
import { IMusicUrl } from "../music/Musictype";
import { IDownload, IHistory } from "./DownloadTyped";

export const download = create<IDownload>((set) => ({
  isDownloading: false,
  Porcentaje: 0,
  Name: "",
  history: [],
  downloadMusic: async (musica: IMusicUrl) => {
    send("downloadMusicURL", musica);
    set({ Name: musica.name, isDownloading: true });
  },
  setDownloadReset: () =>
    set((state) => {
      localStorage.setItem(
        "historyMusic",
        JSON.stringify([
          ...state.history,
          { name: state.Name, id: Math.random() * 3000 },
        ])
      );
      return {
        isDownloading: !state.isDownloading,
        history: [
          ...state.history,
          { name: state.Name, id: Math.random() * 3000 },
        ],
      };
    }),
  setHistory: (newHistory: IHistory[]) => set({ history: newHistory }),
  setDeletehistory: (id: number) =>
    set((state) => {
      const history = state.history.filter((item: IHistory) => item.id !== id);
      localStorage.setItem("historyMusic", JSON.stringify(history));
      return { history: history };
    }),
  setPorcentaje: (porcentaje: number) => set({ Porcentaje: porcentaje }),
}));
