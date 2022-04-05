export interface ISelect {
  values?: any[];
  key?: string;
  onChange?: (x: any) => void;
  label?: string | null;
  required?: boolean;
  placeholder?: string;
}
