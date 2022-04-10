import { selectorFamily } from 'recoil';
import axios from 'axios';
import { config } from '../../../../env';

export const centersList = selectorFamily({
  key: 'center-list-per-exam',
  get: (id: string) => async () => {
    const response = await axios.get(
      config.api_url.sigrh + 'centers/exam/' + id
    );
    return response.data;
  },
});
