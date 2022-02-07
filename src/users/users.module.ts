import { UsersRepository, WatchesRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository, WatchesRepository])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
