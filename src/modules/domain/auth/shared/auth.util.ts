import * as bcrypt from 'bcryptjs';

export function encodePassword(pass: string) {
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(pass, salt);
  return hash;
}
