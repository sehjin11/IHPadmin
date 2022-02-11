import { IsDate } from 'class-validator';
import { AiObject } from '../enum/ai-object.enum';

export class ProjectDto {
  projectNo: string;

  projectCode: string;

  projectName: string;

  projectPurpose: string;

  appUse: boolean;

  aiObject: AiObject;

  @IsDate()
  startDate: string;

  @IsDate()
  endDate: string;

  activated: boolean;
}
