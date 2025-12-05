import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRole } from 'src/users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string; role?: UserRole }) {
    try {
      const user = await this.auth.register(body.email, body.password, body.role);
      return { id: user.id, email: user.email };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.auth.validateUser(body.email, body.password);
    if (!user) throw new BadRequestException('Invalid credentials');
    return this.auth.login(user);
  }
}
