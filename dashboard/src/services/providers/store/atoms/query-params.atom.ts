import { atom } from 'recoil';
import { IQueryParam } from '../../../types';

export const queryParams = atom<IQueryParam>({
  key: 'query-params',
  default: {
    limit: 8,
    skip: 0,
    search: '',
  },
});
