import { CanActivate, ExecutionContext, UnauthorizedException, Injectable } from '@nestjs/common';

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    if (!req.currentUser) throw new UnauthorizedException('Not authenticated');
    return true;
  }
}
