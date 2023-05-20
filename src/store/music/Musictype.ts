import { ReactNode } from "react";
import { Nodo } from "../user/ListClass";

export interface IMusica {
  name: string;
  duracion: string;
  buffer: BufferSource | ArrayBuffer;
  img: string | null;
  online: boolean;
}

export interface IMusicUrl {
  name: string;
  time: number;
  author: string;
  mimeType: string;
  qualityLabel: any;
  bitrate: number;
  audioBitrate: number;
  itag: number;
  initRange: InitRange;
  indexRange: IndexRange;
  lastModified: string;
  contentLength: string;
  quality: string;
  img: string;
  projectionType: string;
  averageBitrate: number;
  audioQuality: string;
  approxDurationMs: string;
  audioSampleRate: string;
  audioChannels: number;
  loudnessDb: number;
  url: string;
  hasVideo: boolean;
  hasAudio: boolean;
  container: string;
  codecs: string;
  videoCodec: any;
  audioCodec: string;
  isLive: boolean;
  isHLS: boolean;
  online: boolean;
  isDashMPD: boolean;
}

export interface InitRange {
  start: string;
  end: string;
}

export interface IndexRange {
  start: string;
  end: string;
}

export interface IGetMusica {
  name: string;
  path: string;
}

export interface IMusicOnline {
  videoId: string;
  url: string;
  title: string;
  img: string;
  thumbnail: string;
  seconds: number;
  views: number;
  online: boolean;
  author: string;
}

export interface IMusicaActual {
  ant: Nodo | null;
  act: Nodo | null;
  sig: Nodo | null;
  musica: IMusicUrl | IMusica | null;
  setMusica: (nodo: Nodo) => void;
  setMusicOnlyne: (music: IMusicOnline) => Promise<any>;
  resetMusic: () => void;
  downloadMusic: (musica: IMusicUrl) => Promise<any>;
}

export interface IPlayer {
  audio: HTMLAudioElement | null;
  setAudio: (audio: ArrayBuffer | BufferSource) => void;
}

export interface IMusicList {
  list: ReactNode[];
  setList: (lista: ReactNode[]) => void;
}

export interface ILoad {
  loadingMusic: boolean;
  loadingList: boolean;
  setLoad: () => void;
  setLoadList: () => void;
}
