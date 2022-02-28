import { SiteDto } from './dto/site.dto';
import {
  ManagerRepository,
  ProjectsRepository,
  SiteRepository,
  UserRepository,
} from './project.repository';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectDto } from './dto/project.dto';
import { AiObject } from './enum/ai-object.enum';
import { ManagerDto } from './dto/manager.dto';
import * as bcrypt from 'bcryptjs';
import { getManager } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class ProjectsService {
  logger: Logger;

  constructor(
    @InjectRepository(ProjectsRepository)
    private projectsRepository: ProjectsRepository,
    @InjectRepository(SiteRepository)
    private siteRepository: SiteRepository,
    @InjectRepository(ManagerRepository)
    private managerRepository: ManagerRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    this.logger = new Logger();
  }
  readonly AiObjectOptions = [AiObject.SASHET, AiObject.ETC];

  //프로젝트 생성
  async createProject(projectDto: ProjectDto): Promise<object> {
    const {
      projectCode,
      projectName,
      projectPurpose,
      country,
      userGroup,
      collectedInfo,
      memo,
      organization,
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
      organization,
      projectPurpose,
      country,
      userGroup,
      collectedInfo,
      memo,
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

  //프로젝트 정보 가져오기
  async getProjects(projectNo: string) {
    if (!projectNo) {
      return this.projectsRepository.find({
        order: {
          no: 'DESC',
        },
      });
    }
    const project = await this.projectsRepository.findOne({ projectNo });
    return project;
  }

  //프로젝트 수정
  async updateProject(projectDto: ProjectDto) {
    const project = await this.projectsRepository.findOne({
      projectNo: projectDto.projectNo,
      projectCode: projectDto.projectCode,
    });

    if (!project) {
      throw new NotFoundException('해당 프로젝트 정보를 찾을 수 없습니다!');
    }

    project.projectName = projectDto.projectName;
    project.projectPurpose = projectDto.projectPurpose;
    project.aiObject = projectDto.aiObject;
    project.startDate = projectDto.startDate;
    project.endDate = projectDto.endDate;
    project.appUse = projectDto.appUse;
    project.organization = projectDto.organization;
    project.activated = projectDto.activated;
    project.country = projectDto.country;
    project.userGroup = projectDto.userGroup;
    project.collectedInfo = projectDto.collectedInfo;
    project.memo = projectDto.memo;

    try {
      await this.projectsRepository.save(project);
      return project;
    } catch (error) {
      throw new InternalServerErrorException('');
    }
  }

  //프로젝트 삭제
  async deleteProject(projectNo: string) {
    try {
      await this.projectsRepository.delete({ projectNo });
      return '삭제되었습니다.';
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  //프로젝트 시작, 종료날 가져오기
  async getProjectDate(projectNo: string) {
    try {
      const date = await getManager().query(
        `select "projectNo", to_char("startDate", 'YYYY-MM-DD') as "startDate",to_char("endDate",'YYYY-MM-DD') as "endDate" from project where "projectNo"='${projectNo}'`,
      );
      console.log(date);

      return date[0];
    } catch (error) {}
  }

  //현장 등록
  async createSite(siteDto: SiteDto) {
    const { projectNo, siteName, siteAddress, siteContact, siteMemo } = siteDto;

    const site = this.siteRepository.create({
      projectNo,
      siteName,
      siteAddress,
      siteContact,
      siteMemo,
    });

    try {
      await this.siteRepository.save(site);
      return site;
    } catch (error) {
      throw new InternalServerErrorException('');
    }
  }

  //사이트 정보 가져오기
  async getSite(projectNo: string, siteNo: string) {
    //프로젝트 해당되는 전체 사이트들 가져오기
    if (!siteNo) {
      return this.siteRepository.find({
        where: { projectNo: projectNo },
        order: {
          no: 'ASC',
        },
      });
    }

    //배열로 siteNo받아와서 해당되는 사이트 정보 가져오기(전체 컬럼)
    try {
      const sites = [];
      const siteArray = siteNo.split(',');
      for (let siteNo of siteArray) {
        const site = await this.siteRepository.findOne(siteNo);
        sites.push(site);
      }
      return sites;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('');
    }
  }

  //사이트 삭제
  async deleteSite(siteNo: string) {
    try {
      this.siteRepository.delete({ siteNo });
      return { message: '삭제되었습니다.' };
    } catch (error) {
      this.logger.error(error);
      throw new Error('삭제 에러');
    }
  }

  //사이트 수정
  async updateSite(siteDto: SiteDto) {
    const site = await this.siteRepository.findOne(siteDto.siteNo);

    site.siteName = siteDto.siteName;
    site.siteContact = siteDto.siteContact;
    site.siteAddress = siteDto.siteAddress;
    site.siteMemo = siteDto.siteMemo;

    try {
      this.logger.log('사이트 수정 실행');
      await this.siteRepository.save(site);
      return site;
    } catch (error) {
      this.logger.error(error);
    }
  }

  //매니저 생성
  async createManager(managerDto: ManagerDto) {
    this.logger.log('매니저 생성 siteNo : ' + managerDto.monitorSites);
    const {
      monitorSites,
      projectNo,
      managerNick,
      siteNo,
      managerEmail,
      managerContact,
      managerId,
      managerMemo,
      password,
    } = managerDto;
    const salt = await bcrypt.genSalt();
    const hashedPw = await bcrypt.hash('inhand1233', salt);
    this.logger.log(projectNo);
    const manager = this.managerRepository.create({
      monitorSites,
      projectNo,
      managerEmail,
      managerContact,
      managerId,
      managerNick,
      siteNo,
      managerMemo,
      password: hashedPw,
    });

    try {
      await this.managerRepository.save(manager);
      return manager;
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException();
    }
  }

  //프로젝트에 해당되는 전체 매니저들 정보(일부 컬럼-담당 사이트이름 포함)
  async getProjectManagers(projectNo: string) {
    const managers = await getManager().query(
      `select m."no", s."siteName", m."managerNick", m."siteNo", m."managerNo", m."monitorSites", m."managerContact" from project_manager as m left join project_site as s on m."siteNo" = s."siteNo"
      where m."projectNo"='${projectNo}'`,
    );

    for (const manager of managers) {
      console.log(manager['monitorSites']);
      const sites = [];
      const siteArray = manager['monitorSites'].split(',');
      for (let siteNo of siteArray) {
        const site = await this.siteRepository.findOne(siteNo, {
          select: ['siteName'],
        });
        sites.push(site.siteName);
      }
      manager.monitorSitesName = sites.toString();
    }
    console.log(managers);
    return managers;
  }

  //특정 매니저 정보 가져오기
  async getManager(managerNo: string) {
    try {
      const manager = await getManager().query(
        `select m."no", m."managerNo", m."managerNick", m."siteNo", s."siteName", m."monitorSites", m."managerEmail", m."managerContact", m."managerId", m."managerMemo", m."projectNo" from project_manager as m left join project_site as s on m."siteNo" = s."siteNo"
        where m."managerNo"='${managerNo}'`,
      );
      return manager;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('');
    }
  }

  //매니저 삭제
  async deleteManager(managerNo: string) {
    try {
      await this.managerRepository.delete({ managerNo });
      return { message: '삭제되었습니다.' };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  //참여자 생성
  async createUser(userDto: UserDto) {
    const {
      userName,
      projectNo,
      siteNo,
      userGender,
      userBirth,
      userContact,
      userId,
      userAttendDate,
      userEndDate,
      activated,
      userMemo,
    } = userDto;

    //default 암호 입력
    const salt = await bcrypt.genSalt();
    const hashedPw = await bcrypt.hash('inhand1233', salt);

    try {
      const user = this.userRepository.create({
        projectNo,
        siteNo,
        userName,
        userGender,
        userBirth,
        userContact,
        userId,
        password: hashedPw,
        userAttendDate,
        userEndDate,
        activated,
        userMemo,
      });
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      return error;
    }
  }

  //그 사이트에 해당되는 참여자들 정보 가져오기
  async getUsers(siteNo: string) {
    const users = await this.userRepository.find({
      where: { siteNo: siteNo },
      order: {
        userNo: 'ASC',
      },
    });

    return users;
  }
}
