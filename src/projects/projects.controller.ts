import { ProjectsService } from './projects.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ProjectDto } from './dto/project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  async createProject(@Body() projectDto: ProjectDto): Promise<object> {
    return this.projectsService.createProject(projectDto);
  }
}
