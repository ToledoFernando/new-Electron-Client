export interface IGeneros {
  name: string;
  _id: string;
}

export interface IGeneroStore {
  generos: IGeneros[];
  setGenetos: () => Promise<void>;
}
