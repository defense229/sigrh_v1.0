export interface IExam {
  id?: string;
  label?: string;
  status?: TStatusExam;
  createdAt?: string;
}

export enum ExamStatus {
  NEW = 'NEW',
  PENDING = 'PENDING',
  CLOSED = 'CLOSED',
}

export type TStatusExam = 'NEW' | 'PENDING' | 'CLOSED';
