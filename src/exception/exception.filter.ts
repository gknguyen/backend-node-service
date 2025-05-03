import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const contextType = host.getType<string>();
    if (contextType === 'http') {
      this.httpException(exception, host);
    }
  }

  private httpException(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const res = exception.getResponse();

    response.status(status).json({
      timestamp: new Date().toISOString(),
      statusCode: status,
      error: res,
    });
  }
}
