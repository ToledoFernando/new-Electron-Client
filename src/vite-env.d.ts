/// <reference types="vite/client" />

interface IMusic {
  name: string;
  path: string;
}

interface IMusicAPIResult {
  name: string;
  musics: IMusicAPIResultMusic[];
}

interface IMusicAPIResultMusic {
  _id: string;
  name: string;
  artist: string;
  musicURL: string;
  musicIMG: string;
  duration: number;
  gener: string[];
  __v: number;
}

interface IResult {
  files: IMusic[];
  folders: IMusic[];
}

interface IMusicaResult {
  name: string;
  duracion: string;
  buffer: BufferSource | ArrayBuffer;
  img: null | string;
}

export interface IResultSearch {
  videoId: string;
  url: string;
  title: string;
  image: string;
  thumbnail: string;
  seconds: number;
  views: number;
  author: string;
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

export interface IReportProblem {
  musicaID: string;
  title: string;
  detalle: string;
}

declare global {
  interface Window {
    getMusicFolder: () => Promise<IResult>;
    getMusic: (file: IMusic) => Promise<IMusicaResult>;
    getMusicFolderName: (folder: IMusic) => Promise<IResult>;
    getBackToFolder: (path: string[]) => Promise<IResult>;
    searchMusicYT: (name: string) => Promise<IResultSearch[]>;
    getURLMusic: (name: string) => Promise<IMusicUrl>;
    downloadMusicURL: (musica: IMusic) => Promise<any>;
    send: (event: string, data: any) => void;
    received: (event: string, func: (...args: any) => void) => void;
    getApiData: () => Promise<IMusicAPIResult[]>;
    closeApp: () => Promise<any>;
    getMusicYTDL: (videoURL: string) => Promise<any>;
    moveWindow: (event: string) => Promise<any>;
    getAllPlayList: () => Promise<any>;
    getMusicByPlayList: (id: string) => Promise<any>;
    hide: () => void;
    sendNewProblemsADM: (problem: IReportProblem) => Promise<any>;
    openWebOficial: () => void;
  }
}
