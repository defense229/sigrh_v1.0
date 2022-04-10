import { selectorFamily } from 'recoil';

export const fieldList = selectorFamily({
  key: 'field-state-per-exam',
  get: (id: string) => () => {},
});
