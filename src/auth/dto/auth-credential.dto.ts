import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AuthCredentialDto {
  adminNo: number;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ description: '아이디' })
  ihpAdminId: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ description: '비밀번호' })
  password: string;

  adminType: string;
}
