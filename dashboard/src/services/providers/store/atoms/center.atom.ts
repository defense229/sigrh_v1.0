import { selectorFamily } from 'recoil';
import axios from 'axios';
import { config } from '../../../../env';
import { queryParams } from './query-params.atom';

export const centersList = selectorFamily({
  key: 'center-list-per-exam',
  get:
    (id: string) =>
    async ({ get }) => {
      const dep = get(queryParams);
      console.log(dep);
      const response = await axios.get(
        config.api_url.sigrh + 'centers/exam/' + id
      );
      return response.data;
    },
});
