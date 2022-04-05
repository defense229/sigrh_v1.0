export interface IExam {
  id?: string;
  label?: string;
  center?: string;
  status?: ExamStatus;
  enabled?: boolean;
}

export enum ExamStatus {
  NEW = 'NEW',
  PENDING = 'PENDING',
  CLOSED = 'CLOSED',
}
