import { create } from "zustand";
import { IGeneroStore, IGeneros } from "./generosType";

const getGenerosAPI = async () => {
  const data = await window.getGenerosAPI();
  return data;
};

export const genetoStore = create<IGeneroStore>((set) => ({
  generos: [],
  setGenetos: async () => {
    const result = (await getGenerosAPI()) as IGeneros[];
    set({ generos: result });
  },
}));
