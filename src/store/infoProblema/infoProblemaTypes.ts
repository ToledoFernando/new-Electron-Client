export interface IInfoProblemas {
  isProblem: boolean;
  musicaId: string;

  setProblem: (musicaId: string) => Promise<any>;

  sendProblemaADM: (
    info: string,
    title: string,
    musicID: string
  ) => Promise<any>;

  clearProblem: () => void;
}
