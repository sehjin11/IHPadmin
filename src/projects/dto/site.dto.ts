import { ApiProperty } from '@nestjs/swagger';

export class SiteDto {
  no: number;

  @ApiProperty({ description: '사이트 번호' })
  siteNo: string;

  @ApiProperty({ description: '프로젝트 번호' })
  projectNo: string;

  @ApiProperty({ description: '사이트 이름' })
  siteName: string;

  @ApiProperty({ description: '사이트 주소' })
  siteAddress: string;

  @ApiProperty({ description: '사이트 연락처' })
  siteContact: string;

  @ApiProperty({ description: '사이트 메모' })
  siteMemo: string;
}
