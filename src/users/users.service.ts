import { UsersRepository } from './users.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async createUser(userDto: UserDto): Promise<object> {
    const watchSN = userDto.watchSN.split(',');
    const beacon = userDto.beacon.split(',');
    const { userName, projectId, attendDate, updateState, activated } = userDto;

    const user = this.usersRepository.create({
      userName,
      projectId,
      watchSN,
      beacon,
      attendDate,
      updateState,
      activated,
    });
    try {
      await this.usersRepository.save(user);
      return user;
    } catch (error) {
      if (error.code === '23505') {
        return { message: '중복된 회원코드입니다.' };
      }
      return error;
    }
  }
}
