import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtGuard } from '../common/guards/jwt/jwt.guard';

@Controller('users')
export class UsersController {
  @Get('me')
  @UseGuards(JwtGuard)
  getMe(@CurrentUser() user) {
    return user;
  }
}
