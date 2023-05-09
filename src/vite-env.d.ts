/// <reference types="vite/client" />

interface IMusic {
  name: string;
  path: string;
}

interface IMusicaResult {
  name: string;
  duracion: string;
  buffer: BufferSource | ArrayBuffer;
}

declare function getMusicFolder(): Promise<IMusic[]>;

declare function getMusic(file: IMusic): Promise<IMusicaResult>;
