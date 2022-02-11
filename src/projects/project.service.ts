import { SiteDto } from './dto/site.dto';
import { ProjectsRepository, SiteRepository } from './project.repository';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectDto } from './dto/project.dto';
import { AiObject } from './enum/ai-object.enum';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsRepository)
    private projectsRepository: ProjectsRepository,
    private siteRepository: SiteRepository,
  ) {}

  readonly AiObjectOptions = [AiObject.SASHET, AiObject.ETC];
  //프로젝트 생성
  async createProject(projectDto: ProjectDto): Promise<object> {
    const {
      projectCode,
      projectName,
      projectPurpose,
      appUse,
      aiObject,
      startDate,
      endDate,
    } = projectDto;

    const aio: any = aiObject.toLowerCase();
    const index = this.AiObjectOptions.indexOf(aio);
    if (index === -1) {
      throw new BadRequestException('Ai오브젝트 값이 잘못되었습니다!');
    }

    //project 정보 입력
    const project = this.projectsRepository.create({
      projectCode,
      projectName,
      projectPurpose,
      appUse,
      aiObject: aio,
      startDate,
      endDate,
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

  async createSite(siteDto: SiteDto) {
    const { projectNo, siteName, siteAdress, siteContact } = siteDto;

    const site = this.siteRepository.create({
      projectNo,
      siteName,
      siteAdress,
      siteContact,
    });

    try {
      await this.siteRepository.save(site);
      return site;
    } catch (error) {
      throw new InternalServerErrorException('');
    }
  }
}
