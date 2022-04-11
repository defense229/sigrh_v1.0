export interface IExam {
  id?: string;
  label?: string;
  center?: string;
  status?: ExamStatus;
  enabled?: boolean;
  candidateFileCollectStep?: ExamStepStatus;
  sportStep?: ExamStepStatus;
  fileAuthenticationStep?: ExamStepStatus;
  writingStep?: ExamStepStatus;
  healthControlStep?: ExamStepStatus;
}

export enum ExamStatus {
  NEW = 'NEW',
  PENDING = 'PENDING',
  CLOSED = 'CLOSED',
}

export enum ExamStepStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export const examSteps = {
  candidateFileCollectStep: 'INACTIVE',
  sportStep: 'INACTIVE',
  fileAuthenticationStep: 'INACTIVE',
  writingStep: 'INACTIVE',
  healthControlStep: 'INACTIVE',
};

export enum ExamRepartitionStatus {
  WAITING = 'WAITING',
  PROCESSING = 'PROCESSING',
  FINISHED = 'FINISHED',
}
