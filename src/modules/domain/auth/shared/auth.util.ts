import * as bcrypt from 'bcryptjs';
import { decode, sign } from 'jsonwebtoken';
import { isString } from 'lodash';
import ENV from 'src/shared/env';
import { IAccessTokenPayload } from './auth.interface';

export function encodePassword(pass: string) {
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(pass, salt);
  return hash;
}

export function verifyEncodedPassword(pass: string, hashed: string) {
  return bcrypt.compare(pass, hashed);
}

/** https://github.com/auth0/node-jsonwebtoken/issues/927 */
export function getAccessToken(payload: IAccessTokenPayload, expiresIn = ENV.JWT.EXPIRES_IN) {
  return sign(payload, ENV.JWT.SECRET, { expiresIn });
}

export function decodeAccessToken(token: string): {
  payload?: IAccessTokenPayload;
  metadata?: {
    exp?: number;
    iss?: string;
    sub?: string;
    aud?: string | string[];
    nbf?: number;
    iat?: number;
    jti?: string;
  };
} {
  const payload = decode(token, { complete: true })?.payload;
  if (!payload || isString(payload)) return {};
  const { exp, iss, sub, aud, nbf, iat, jti, ...data } = payload;
  return {
    payload: data as IAccessTokenPayload,
    metadata: { exp, iss, sub, aud, nbf, iat, jti },
  };
}
