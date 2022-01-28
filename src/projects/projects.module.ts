import { ProjectsRepository } from './projects.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsRepository])],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
