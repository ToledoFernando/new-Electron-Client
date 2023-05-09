export interface IMusica {
  name: string;
  duracion: string;
  buffer: BufferSource | ArrayBuffer;
}

export interface IGetMusica {
  name: string;
  path: string;
}

export interface IMusicaActual {
  musica: IMusica | null;
  setMusica: (musica: IGetMusica) => void;
}

export interface IPlayer {
  audio: HTMLAudioElement | null;
  setAudio: (audio: ArrayBuffer | BufferSource) => void;
}
