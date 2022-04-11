import axios from 'axios';
import { selectorFamily } from 'recoil';
import { config } from '../../../../env';
import { queryParams } from './query-params.atom';

export const departementsList = selectorFamily({
  key: 'center-list-per-exam',
  get:
    (id: string) =>
    async ({ get }) => {
      const dep = get(queryParams);
      console.log(dep);
      const response = await axios.get(
        config.api_url.sigrh + 'departements/exam/' + id
      );
      return response.data;
    },
});
