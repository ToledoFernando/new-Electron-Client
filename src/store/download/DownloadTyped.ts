import { IMusicUrl } from "../music/Musictype";

export interface IHistory {
  name: string;
  id: number;
}

export interface IDownload {
  isDownloading: boolean;
  Porcentaje: number;
  Name: string;
  history: IHistory[];
  downloadMusic(musica: IMusicUrl): Promise<void>;
  setHistory: (newHistory: IHistory[]) => void;
  setDeletehistory: (id: number) => void;
  setDownloadReset: () => void;
  setPorcentaje: (newPorcentaje: number) => void;
}
