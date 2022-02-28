import { ApiProperty } from '@nestjs/swagger';
export class ManagerDto {
  no: string;

  @ApiProperty({ description: '프로젝트 번호' })
  projectNo: string;

  @ApiProperty({ description: '현장 권한' })
  monitorSites: string;

  @ApiProperty({ description: '매니저 타입' })
  siteNo: string;

  @ApiProperty({ description: '매니저 별명' })
  managerNick: string;

  @ApiProperty({ description: '매니저 이메일' })
  managerEmail: string;

  @ApiProperty({ description: '매니저 연락처' })
  managerContact: string;

  @ApiProperty({ description: '매니저 계정 아이디' })
  managerId: string;

  @ApiProperty({ description: '매니저 계정 암호' })
  password: string;

  @ApiProperty({ description: '매니저 메모' })
  managerMemo: string;
}
