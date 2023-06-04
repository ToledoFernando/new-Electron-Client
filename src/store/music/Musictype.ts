import { ReactNode } from "react";
import { Nodo as local } from "../user/ListClass";
import { Nodo as bbdd } from "../../pages/PlayListinfo/ClassList";
import { IMusic } from "../user/UserMusicTypes";

export interface IMusicAPIResult {
  name: string;
  musics: IMusicAPIResultMusic[];
}

export interface IDataSearch {
  name: string;
  genero: string;
}

export interface IMusicAPIResultMusic {
  _id: string;
  name: string;
  artist: string;
  musicURL: string;
  musicIMG: string;
  duration: number;
  gener: string[];
  __v: number;
}

export interface IMusica {
  name: string;
  duracion: string;
  buffer: BufferSource | ArrayBuffer;
  img: string | null;
  online: boolean;
}

export interface IMusicAPI {
  id?: number;
  _id: string;
  name: string;
  artist: string;
  musicURL: string;
  musicIMG: string;
  duration: number;
  gener: string[];
  __v: number;
}

export interface IMusicApi {
  data: IMusicAPIResult[] | IMusicAPI[];
  dataAux: IMusicAPIResult[];
  load: boolean;
  setLoad: (state: boolean) => void;
  setData: () => void;
  getSearchMusicAPI: (dataSearch: IDataSearch) => Promise<any>;
  resetData: () => void;
}

export interface IMusicUrl {
  id?: string;
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
  ant: local | bbdd | null;
  act: local | bbdd | null;
  sig: local | bbdd | null;
  musica: IMusicUrl | IMusica | null;
  setMusica: (nodo: local | bbdd) => void;
  setMusicOnlyne: (music: IMusicOnline) => Promise<any>;
  setMusicApi: (music: IMusicAPIResult | IMusicAPIResultMusic) => void;
  resetMusic: () => void;
  getMusicYT: (
    music: IMusicAPIResultMusic | IMusic,
    ant: local | bbdd | null,
    sig: local | bbdd | null
  ) => Promise<any>;
  // downloadMusic: (musica: IMusicUrl) => Promise<any>;
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
