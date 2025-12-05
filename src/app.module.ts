import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import dataSource from './data-source';
import { CurrentUserMiddleware } from './common/middleware/current-user/current-user.middleware';
import { User } from './users/user.entity';
import { Product } from './products/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ... (dataSource.options as any),
      entities: [User, Product],
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
