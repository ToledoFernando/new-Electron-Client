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

declare function getMusicFolder(): Promise<IResult>;

declare function getMusic(file: IMusic): Promise<IMusicaResult>;

declare function getMusicFolderName(folder: IMusic): Promise<IResult>;

declare function getBackToFolder(path: string[]): Promise<IResult>;
