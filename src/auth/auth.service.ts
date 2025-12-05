import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { UserRole } from './../users/user.entity';
import { Secret } from 'jsonwebtoken';


dotenv.config();

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(email: string, password: string, role?: UserRole ) {
    const existing = await this.usersService.findByEmail(email);
    if (existing) throw new Error('Email exists');
    return this.usersService.create(email, password, role);
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return null;
    return user;
  }

  login(user: any) {
    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, "MY_SECRET", { expiresIn: "7d" });

    return { token };
  }
}
