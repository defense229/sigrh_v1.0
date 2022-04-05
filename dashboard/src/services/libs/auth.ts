import { IUser } from '../types/login.types';
import { sessionKeys } from './keys';

export function login(user: IUser) {
  sessionStorage.setItem(sessionKeys.user, JSON.stringify(user));
}

export function logout() {
  sessionStorage.removeItem(sessionKeys.user);
}
