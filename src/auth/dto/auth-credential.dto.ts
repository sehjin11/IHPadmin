import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  ihpAdminId: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
