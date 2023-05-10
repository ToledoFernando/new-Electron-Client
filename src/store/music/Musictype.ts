import { Nodo } from "../user/ListClass";

export interface IMusica {
  name: string;
  duracion: string;
  buffer: BufferSource | ArrayBuffer;
  img: string | null;
}

export interface IGetMusica {
  name: string;
  path: string;
}

export interface IMusicaActual {
  ant: Nodo | null;
  act: Nodo | null;
  sig: Nodo | null;
  musica: IMusica | null;
  setMusica: (nodo: Nodo) => void;
}

export interface IPlayer {
  audio: HTMLAudioElement | null;
  setAudio: (audio: ArrayBuffer | BufferSource) => void;
}
