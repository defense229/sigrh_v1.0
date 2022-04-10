import axios from 'axios';
import { selectorFamily } from 'recoil';
import { config } from '../../../../env';
import { TCandidateQuery } from '../../../types/candidates.types';
import { queryParams } from './query-params.atom';

export const candidatesList = selectorFamily({
  key: 'candidates-list',
  get:
    (id: string) =>
    async ({ get }) => {
      const params = get(queryParams);
      const response = await axios.get(
        config.api_url.sigrh + 'candidats/exam/' + id,
        {
          params,
        }
      );
      return response.data;
    },
});

export const candidatesFilterList = selectorFamily({
  key: 'candidates-accepted-list',
  get:
    (args: TCandidateQuery) =>
    async ({ get }) => {
      const params = get(queryParams);
      const response = await axios.get(
        config.api_url.sigrh +
          'candidats/exam/' +
          args.id +
          '/file-collect/' +
          args.type,
        {
          params,
        }
      );
      return response.data;
    },
});
