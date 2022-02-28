import { IsDate } from 'class-validator';

export class UserDto {
  userNo: string;

  siteNo: string;

  projectNo: string;

  userName: string;

  userGender: string;

  userBirth: string;

  userContact: string;

  userId: string;

  password: string;

  @IsDate()
  userAttendDate: string;

  @IsDate()
  userEndDate: string;

  activated: boolean;

  userMemo: string;
}
