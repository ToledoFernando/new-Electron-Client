import { create } from "zustand";
import { IInfoProblemas } from "./infoProblemaTypes";
import { IReportProblem } from "../../vite-env";

export const infoProblemStore = create<IInfoProblemas>((set) => ({
  isProblem: false,
  musicaId: "",

  setProblem: async (musicID: string) => {
    set({ isProblem: true, musicaId: musicID });
  },

  sendProblemaADM: async (info: string, title: string, musicID: string) => {
    let problem: IReportProblem;
    problem = { musicaID: musicID, title, detalle: info };
    const result = await window.sendNewProblemsADM(problem);
    console.log(result);
    set({ isProblem: false, musicaId: "" });
  },

  clearProblem: () => set({ isProblem: false, musicaId: "" }),
}));
