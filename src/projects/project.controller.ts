import {
  ApiCookieAuth,
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ProjectsService } from './project.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProjectDto } from './dto/project.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/utils/get-user.decorator';
import { SiteDto } from './dto/site.dto';
import { ManagerDto } from './dto/manager.dto';
import { UserDto } from './dto/user.dto';

@ApiTags('Project')
@ApiCookieAuth('jwt')
@Controller('project')
@UseGuards(AuthGuard('jwt2'))
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post('')
  @ApiOperation({
    summary: '프로젝트 생성',
    description: '프로젝트 생성한다',
  })
  async createProject(@Body() projectDto: ProjectDto): Promise<object> {
    return this.projectsService.createProject(projectDto);
  }

  @Get('/projectInfo')
  @ApiOperation({
    summary: '프로젝트 정보',
    description:
      'projectNo 없으면 전체 프로젝트, 있으면 해당 프로젝트 정보 가져온다.',
  })
  @ApiQuery({
    name: 'projectNo',
    required: false,
  })
  async getProject(@Query('projectNo') projectNo: string) {
    console.log(projectNo);
    return this.projectsService.getProjects(projectNo);
  }

  @Patch('/projectInfo')
  @ApiOperation({
    summary: '프로젝트 수정',
    description: '해당 프로젝트 정보 수정하기',
  })
  async updateProject(@Body() projectDto: ProjectDto) {
    return this.projectsService.updateProject(projectDto);
  }

  @Delete('/projectInfo')
  @ApiOperation({
    summary: '프로젝트 삭제',
    description: '해당 프로젝트 삭제한다',
  })
  async deleteProject(@Query('projectNo') projectNo: string) {
    return this.projectsService.deleteProject(projectNo);
  }

  @Get('/projectInfo/getDate')
  getProjectDate(@Query('projectNo') projectNo: string) {
    return this.projectsService.getProjectDate(projectNo);
  }

  @Post('/site')
  @ApiOperation({
    summary: '사이트 생성',
    description: '사이트를 생성한다.',
  })
  async createSite(@Body() siteDto: SiteDto): Promise<object> {
    return this.projectsService.createSite(siteDto);
  }

  @Get('/site')
  @ApiOperation({
    summary: '사이트 정보',
    description:
      'projectNo가 있으면 해당 프로젝트 모든 사이트 정보 가져오고, siteNo가 있으면 해당 사이트 정보만 가져온다. 복수의 siteNo를 받아올 수 있으며(string, ","로 구분) 리턴값은 site 객체의 배열이다.',
  })
  @ApiQuery({
    name: 'projectNo',
    required: false,
  })
  @ApiQuery({
    name: 'siteNo',
    required: false,
  })
  @ApiOkResponse({
    description: '프로젝트 리스트 불러오기',
  })
  async getSite(
    @Query('projectNo')
    projectNo: string,
    @Query('siteNo') siteNo: string,
  ) {
    console.log('siteNo : ' + siteNo);
    return this.projectsService.getSite(projectNo, siteNo);
  }

  @Delete('/site')
  @ApiOperation({
    summary: '사이트 삭제',
    description: '해당 사이트를 삭제한다.',
  })
  deleteSite(@Query('siteNo') siteNo) {
    return this.projectsService.deleteSite(siteNo);
  }

  @Patch('/site')
  @ApiOperation({
    summary: '사이트 수정',
    description: '해당 사이트를 수정한다.',
  })
  updateSite(@Body() siteDto: SiteDto) {
    return this.projectsService.updateSite(siteDto);
  }

  @Post('/manager')
  @ApiOperation({
    summary: '매니저 생성',
    description: '매니저를 생성한다.',
  })
  async createManager(@Body() managerDto: ManagerDto) {
    return this.projectsService.createManager(managerDto);
  }

  @Get('/manager')
  @ApiOperation({
    summary: '특정 매니저 정보',
    description:
      'managerNo에 해당하는 매니저 정보 불러온다. 배열로 반환하므로 인덱스 필요',
  })
  async getManager(@Query('managerNo') managerNo: string) {
    return this.projectsService.getManager(managerNo);
  }

  @ApiOperation({
    summary: '프로젝트 전체 매니저',
    description: '그 프로젝트에 해당되는 전체 매니저 정보를 가져온다.',
  })
  @Get('/managers')
  projectManagers(@Query('projectNo') projectNo: string) {
    console.log('projectNo', projectNo);
    return this.projectsService.getProjectManagers(projectNo);
  }

  @Delete('/manager')
  @ApiOperation({
    summary: '매니저 삭제',
    description: '매니저를 삭제한다.',
  })
  deleteManager(@Query('managerNo') managerNo: string) {
    return this.projectsService.deleteManager(managerNo);
  }

  @Post('/user')
  @ApiOperation({
    summary: '참여자 등록',
    description: '참여자를 등록한다.',
  })
  createUser(@Body() userDto: UserDto) {
    return this.projectsService.createUser(userDto);
  }

  @Get('/user')
  @ApiOperation({
    summary: '참여자 리스트',
    description: '사이트에 해당되는 전체 참여자 정보 불러온다',
  })
  getUsers(@Query('siteNo') siteNo: string) {
    console.log(siteNo);

    return this.projectsService.getUsers(siteNo);
  }

  @Get()
  @ApiOperation({
    summary: '로그인 계정 확인',
    description: '로그인 계정 정보 확인',
  })
  sayHello(@GetUser() admin) {
    console.log('sayHello() request : ', admin);
    return admin;
  }
}
