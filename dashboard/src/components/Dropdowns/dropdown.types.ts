import { CommonElement } from '../../services/libs';

export interface ISelect {
  values?: any[];
  key?: string;
  onChange?: (x: any) => void;
  label?: string | null;
  required?: boolean;
  placeholder?: string;
}

export interface IDropdown {
  children: CommonElement;
  dropdown: CommonElement;
}
