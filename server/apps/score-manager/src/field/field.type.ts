export interface IField {
  label: string;
  coefficient: number;
  exam: string;
  extras?: Record<string, any>;
  enabled?: boolean;
}
