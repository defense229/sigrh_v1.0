import { IUser } from '../types/login.types';

export const sessionKeys = {
  user: '__DF_USER__',
};

export function login(user: IUser) {
  sessionStorage.setItem(sessionKeys.user, JSON.stringify(user));
}

export function logout() {
  sessionStorage.removeItem(sessionKeys.user);
}
