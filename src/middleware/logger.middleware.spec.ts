import { NextFunction, Request, Response } from 'express';
import { logger } from 'src/shared/logger';
import { LoggerMiddleware } from './logger.middleware';

jest.mock('src/shared/logger');

describe('LoggerMiddleware', () => {
  let loggerMiddleware: LoggerMiddleware;

  beforeAll(() => {
    loggerMiddleware = new LoggerMiddleware();
  });

  it('Should call success', () => {
    const mockRequest = {
      headers: {},
      body: {},
      connection: {},
      method: 'GET',
    };
    const mockResponse = {
      json: jest.fn(),
      setHeader: jest.fn(),
      getHeaders: jest.fn(),
    };
    const nextFunction: NextFunction = jest.fn();

    loggerMiddleware.use(mockRequest as Request, mockResponse as any as Response, nextFunction);

    expect(logger.httpLog).toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalled();
  });
});
