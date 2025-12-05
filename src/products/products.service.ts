import { Injectable } from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  create(dto: Partial<Product>) {
    const p = this.repo.create(dto);
    return this.repo.save(p);
  }

  async search(q: string) {
    if (!q) return this.repo.find();
    return this.repo.find({
      where: [
        { title: ILike(`%${q}%`) },
        { description: ILike(`%${q}%`) },
        { tags: ILike(`%${q}%`) },
      ],
    });
  }

  findAll() { return this.repo.find(); }
  findOne(id: number) { return this.repo.findOne({ where: { id } }); }
  update(id: number, dto: Partial<Product>) { return this.repo.update(id, dto); }
  delete(id: number) { return this.repo.delete(id); }
}
