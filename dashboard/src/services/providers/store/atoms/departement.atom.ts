import axios from 'axios';
import { atom, selectorFamily } from 'recoil';
import { config } from '../../../../env';

export const departementQuery = atom({
  key: 'departement-query',
  default: {},
});

export const departementsList = selectorFamily({
  key: 'center-list-per-exam',
  get:
    (id: string) =>
    async ({ get }) => {
      const dep = get(departementQuery);
      console.log(dep);
      const response = await axios.get(
        config.api_url.sigrh + 'departements/exam/' + id
      );
      return response.data;
    },
});
