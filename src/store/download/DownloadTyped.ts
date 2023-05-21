import { IMusicUrl } from "../music/Musictype";

export interface IDownload {
  isDownloading: boolean;
  Porcentaje: number;
  Name: string;
  downloadMusic(musica: IMusicUrl): Promise<void>;
  setDownload: () => void;
  setPorcentaje: (newPorcentaje: number) => void;
  setName: (name: string) => void;
}
