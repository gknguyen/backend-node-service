import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import ENV from 'src/shared/env';

export function encodePassword(pass: string) {
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(pass, salt);
  return hash;
}

export function verifyEncodedPassword(pass: string, hashed: string) {
  return bcrypt.compare(pass, hashed);
}

/** https://github.com/auth0/node-jsonwebtoken/issues/927 */
export function getAccessToken(payload: string | object | Buffer, expiresIn = ENV.JWT.EXPIRES_IN) {
  return sign(payload, ENV.JWT.SECRET, { expiresIn });
}
