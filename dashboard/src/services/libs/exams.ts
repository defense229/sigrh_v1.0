export interface IExam {
  id?: string;
  label?: string;
  status?: ExamStatus;
}

export enum ExamStatus {
  NEW = 'NEW',
  PENDING = 'PENDING',
  CLOSED = 'CLOSED',
}
