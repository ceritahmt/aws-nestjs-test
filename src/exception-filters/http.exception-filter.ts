import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.getResponse();
    const timestamp = new Date().toISOString();
    const ip = request.ip;
    const userAgent = request.headers['user-agent'];
    const url = request.url;
    const method = request.method;
    const contentLength = response.getHeader('content-length');
    this.logger.error(
      `${timestamp} ${method} ${url}-${ip} ${userAgent} ${status} ${String(contentLength)} ${JSON.stringify(message)}`,
    );
    response.status(status).json(message);
  }
}
