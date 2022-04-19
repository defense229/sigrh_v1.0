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

export const departementsLnList = selectorFamily({
  key: 'center-list-per-exam-ln',
  get:
    (id: string) =>
    async ({ get }) => {
      const dep = get(queryParams);
      console.log(dep);
      const response = await axios.get(
        config.api_url.defrecrutLn + 'departements/exam/' + id
      );
      return response.data;
    },
});

export const jurysLnList = selectorFamily({
  key: 'jury-list-per-exam-ln',
  get:
    (id: string) =>
    async ({ get }) => {
      const dep = get(queryParams);
      console.log(dep);
      const response = await axios.get(
        config.api_url.defrecrutLn + 'jury/exam/' + id
      );
      return response.data;
    },
});

export const jurysMemberLnList = selectorFamily({
  key: 'jury-member-list-per-exam-ln',
  get:
    (id: string) =>
    async ({ get }) => {
      const dep = get(queryParams);
      console.log(dep);
      const response = await axios.get(
        config.api_url.defrecrutLn + 'jury/members-exam/' + id
      );
      console.log(response.data);
      return response.data;
    },
});

export const quetionsLnList = selectorFamily({
  key: 'question-list-per-exam-ln',
  get:
    (id: string) =>
    async ({ get }) => {
      const dep = get(queryParams);
      console.log(dep);
      const response = await axios.get(
        config.api_url.defrecrutLn + 'questions/' + id
      );
      return response.data;
    },
});

export const candidatLnList = selectorFamily({
  key: 'candidat-list-per-exam-ln',
  get:
    (id: string) =>
    async ({ get }) => {
      const params = get(queryParams);
      console.log(params);
      const response = await axios.get(
        config.api_url.defrecrutLn + 'candidats/' + id,
        {
          params,
        }
      );
      return response.data;
    },
});
