/// <reference types="vite/client" />

interface IMusic {
  name: string;
  path: string;
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

declare function getMusicFolder(): Promise<IResult>;

declare function getMusic(file: IMusic): Promise<IMusicaResult>;

declare function getMusicFolderName(folder: IMusic): Promise<IResult>;

declare function getBackToFolder(path: string[]): Promise<IResult>;

declare function searchMusicYT(name: string): Promise<IResultSearch[]>;

declare function getURLMusic(name: string): Promise<string>;

declare function downloadMusicURL(musica: IMusic): Promise<any>;

declare function send(event: string, data: any);

declare function received(event: string, func: (...args: any) => void);

declare function getApiData(): Promise<string>;
