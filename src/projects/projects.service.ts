import { ProjectsRepository } from './projects.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsRepository)
    private projectsRepository: ProjectsRepository,
  ) {}
  async createProject(projectDto: ProjectDto): Promise<object> {
    const {
      projectCode,
      projectName,
      startDate,
      endDate,
      projectPurpose,
      manager,
      projectSite,
    } = projectDto;
    const activated: boolean = false;
    const project = this.projectsRepository.create({
      projectCode,
      projectName,
      startDate,
      endDate,
      projectPurpose,
      manager,
      projectSite,
      activated,
    });
    try {
      await this.projectsRepository.save(project);
      return project;
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        return { message: '중복된 프로젝트 코드입니다.' };
      }
      return error;
    }
  }
}
