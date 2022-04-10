export interface IQueryParam {
  limit: number;
  skip: number;
  search: string;
}

export interface IQueryAllResponse {
  total?: number;
  values?: any[];
}
