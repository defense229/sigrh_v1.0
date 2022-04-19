import { atom } from 'recoil';
import { Ii18n } from '../../../types/i18n.types';
import { fr } from '../../i18n/fr';

export const i18nStateAtom = atom<Ii18n>({
  key: 'i18n-state',
  default: {
    language: 'fr',
    dictionnary: fr,
  },
});
