import { atom } from 'recoil';
import { IUser } from '../../../types/login.types';

export const userStateAtom = atom<IUser>({
  key: 'user-store-state',
  default: {
    username: '',
    password: '',
    departement: '',
    role: '',
    id: '',
  },
});
