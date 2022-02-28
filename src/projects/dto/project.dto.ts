import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import { AiObject } from '../enum/ai-object.enum';

export class ProjectDto {
  no: number;

  @ApiProperty({ description: '프로젝트 고유번호' })
  projectNo: string;

  @ApiProperty({ description: '프로젝트 코드' })
  projectCode: string;

  @ApiProperty({ description: '대표기관' })
  organization: string;

  @ApiProperty({ description: '프로젝트명' })
  projectName: string;

  @ApiProperty({ description: '프로젝트 목적' })
  projectPurpose: string;

  @ApiProperty({ description: '국가' })
  country: string;

  @ApiProperty({ description: '참여자 질환군' })
  userGroup: string;

  @ApiProperty({ description: '수집정보' })
  collectedInfo: string;

  @ApiProperty({ description: '앱사용' })
  appUse: boolean;

  @ApiProperty({ description: 'ai오브젝트' })
  aiObject: AiObject;

  @ApiProperty({ description: '프로젝트 시작일' })
  @IsDate()
  startDate: string;

  @ApiProperty({ description: '프로젝트 종료일' })
  @IsDate()
  endDate: string;

  @ApiProperty({ description: '프로젝트 메모' })
  memo: string;

  @ApiProperty({ description: '프로젝트 진행' })
  activated: boolean;
}
