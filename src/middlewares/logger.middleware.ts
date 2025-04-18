import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const logger = new Logger('Response', {
      timestamp: true,
    });

    const { method, originalUrl } = req;
    const timestamp = new Date().toISOString();
    res.on('finish', () => {
      const userAgent = req.get('user-agent') || '';
      const ip = req.ip;
      const statusCode = res.statusCode;
      const contentLength = res.getHeader('content-length') || 0;
      logger.log(
        `${timestamp} ${method} ${originalUrl}-${ip} ${userAgent} ${statusCode} ${String(contentLength)}`,
      );
    });
    next();
  }
}
