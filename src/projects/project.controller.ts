import { ProjectsService } from './project.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProjectDto } from './dto/project.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/utils/get-user.decorator';
import { SiteDto } from './dto/site.dto';

@Controller('projects')
@UseGuards(AuthGuard('jwt2'))
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post('')
  async createProject(@Body() projectDto: ProjectDto): Promise<object> {
    return this.projectsService.createProject(projectDto);
  }

  @Post('/site')
  async createSite(@Body() siteDto: SiteDto): Promise<object> {
    return this.projectsService.createSite(siteDto);
  }

  @Get()
  sayHello(@GetUser() admin) {
    console.log('sayHello() request : ', admin);
    return 'say hi!';
  }
}
