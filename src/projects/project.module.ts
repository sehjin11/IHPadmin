import { ProjectsRepository } from './project.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProjectsService } from './project.service';
import { ProjectsController } from './project.controller';
import { JwtStrategy2 } from 'src/auth/strategy/jwt2.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsRepository])],
  providers: [ProjectsService, JwtStrategy2],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
