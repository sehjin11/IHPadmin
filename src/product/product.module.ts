import { JwtStrategy2 } from 'src/auth/strategy/jwt2.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { WatchHistoryRepository, WatchRepository } from './product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([WatchRepository, WatchHistoryRepository]),
  ],
  controllers: [ProductController],
  providers: [ProductService, JwtStrategy2],
})
export class ProductModule {}
