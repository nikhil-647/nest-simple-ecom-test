import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const req = ctx.switchToHttp().getRequest();
    console.log(`[${req.method}] ${req.url}`);
    const now = Date.now();
    return next.handle().pipe(tap(() => console.log(`+${Date.now() - now}ms`)));
  }
}
