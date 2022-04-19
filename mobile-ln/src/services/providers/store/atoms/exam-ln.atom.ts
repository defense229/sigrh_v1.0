import axios from 'axios';
import { selector } from 'recoil';
import { config } from '../../../../env';
import { IExam } from '../../../types';
import { queryParams } from './query-params.atom';

export const examLnList = selector<{
  values?: IExam[];
  total?: number;
  error: any;
}>({
  key: 'filter-exam-ln-store-state',
  get: async ({ get }) => {
    const params = get(queryParams);
    try {
      const response = await axios.get(config.api_url.defrecrutLn + 'exams', {
        params,
      });
      return response.data;
    } catch (error: any) {
      return { error: error, status: error.response.statusCode };
    }
  },
});
