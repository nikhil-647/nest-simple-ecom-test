import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>, // why we adding this ? for getting repo but still
  ) {}

  async create(email: string, password: string, role: UserRole = UserRole.USER) {
    const hashed = await bcrypt.hash(password, 10);
    const user = this.repo.create({ email, password: hashed, role });
    return this.repo.save(user);
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }
}
