import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../../../users/users.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: any, res: any, next: () => void) {
    const auth = req.headers.authorization;
    if (!auth) { req.currentUser = null; return next(); }

    const [, token] = auth.split(' ');
    if (!token) { req.currentUser = null; return next(); }

    try {
      const payload: any = jwt.verify(token, process.env.JWT_SECRET!);
      const user = await this.usersService.findById(payload.id);
      req.currentUser = user || null;
    } catch (e) {
      req.currentUser = null;
    }
    next();
  }
}
