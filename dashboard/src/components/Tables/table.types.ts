import { CommonElement } from '../../services/libs';

export interface ITable extends IPaginator {
  rows: ITableRow[];
  cols: ITableCol[];
  selection?: boolean;
  onSelectionChange?: (values: ITableRow[]) => void;
  onRowHover?: (row: ITableRow) => void;
  disableHeader?: boolean;
  selectedItems?: any[];
  onToastClosed?: () => void;
  onRemoved?: (selected: any[]) => void;
}

export interface ITableRow {
  id: string | number;
  [x: string]: any;
}

export interface ITableCol {
  label: string;
  name?: string;
  render?: (row: any) => CommonElement;
}

export interface IPaginator {
  limit?: number;
  skip?: number;
  total?: number;
  onNext?: () => void;
  onPrevious?: () => void;
  onSearch?: (value: string) => void;
}
