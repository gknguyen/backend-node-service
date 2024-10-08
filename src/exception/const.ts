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
