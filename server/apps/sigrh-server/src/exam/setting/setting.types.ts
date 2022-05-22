export interface IExamSetting {
  take?: number;
  quotaUnit?: ExamQuotaUnit;
  mapping?: Record<string, number>;
  wmQuotaUnit?: ExamQuotaUnit;
  wmQuota?: number;
  isDefinitive?: boolean;
  exam?: string;
  considerAllField?: boolean;
  codeMinistre?: string;
  codeDopa?: string;
  result?: any;
}

export enum ExamQuotaUnit {
  NUMBER = 'NUMBER',
  PERCENT = 'PERCENT',
}
