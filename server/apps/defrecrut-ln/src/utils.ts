import { pbkdf2Sync, randomBytes } from 'crypto';

export function encrypt(pass: string) {
  const salt = randomBytes(16).toString('hex');
  const cipher = pbkdf2Sync(pass, salt, 10, 64, `sha512`).toString('hex');
  return salt + ':' + cipher;
}

export function verify(pass: string, hash: string) {
  const [salt, cipher] = hash.split(':');
  const instance = pbkdf2Sync(pass, salt, 10, 64, `sha512`).toString('hex');
  return instance === cipher;
}
