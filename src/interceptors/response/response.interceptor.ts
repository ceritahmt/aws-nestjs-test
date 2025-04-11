import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T; 
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const res = next.handle().pipe(map(data => ({
      statusCode: 200,
      message: 'Request was successful',
      data: data
    })));
 
    return res;
  }
}
