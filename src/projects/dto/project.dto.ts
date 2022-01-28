import { IsDate } from 'class-validator';

export class ProjectDto {
  projectId: string;

  projectCode: string;

  projectName: string;

  @IsDate()
  startDate: string;

  @IsDate()
  endDate: string;

  projectPurpose: string;

  projectSite: string;

  manager: string;
}
