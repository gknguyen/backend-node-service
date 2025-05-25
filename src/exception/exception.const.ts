import { HttpStatus } from '@nestjs/common';

export const ERRORS = {
  CUSTOMER_IS_EXISTED: {
    message: 'This customer already existed.',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  CUSTOMER_NOT_FOUND: {
    message: 'This customer is not found.',
    statusCode: HttpStatus.NOT_FOUND,
  },
  CUSTOMER_CARD_NOT_FOUND: {
    message: 'This customer card is not found.',
    statusCode: HttpStatus.NOT_FOUND,
  },
};

export const AUTH_ERRORS = {
  USER_EXISTED: {
    message: 'User already existed.',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  USER_NOT_EXISTED: {
    message: 'User not existed.',
    statusCode: HttpStatus.NOT_FOUND,
  },
  INVALID_PASSWORD: {
    message: 'password incorrect.',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  ACCESS_TOKEN_NOT_FOUND: {
    message: 'access token not found.',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  INVALID_ACCESS_TOKEN: {
    message: 'Invalid access token.',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  ACCESS_TOKEN_EXPIRED: {
    message: 'Access token expired.',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
};
