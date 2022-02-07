import { UsersRepository, WatchesRepository } from './users.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    @InjectRepository(WatchesRepository)
    private watchesRepository: WatchesRepository,
  ) {}

  async createUser(userDto: UserDto): Promise<object> {
    const date = new Date();
    const userCode =
      this.dateFormat(date) + randomUUID().replace(/-/g, '').substring(0, 5);

    const confirm = this.usersRepository.findOne(userCode);
    if (!confirm) {
      throw new ConflictException('중복된 유저코드입니다.');
    }
    const trim = userDto.watchSN.replace(/ /g, '');
    const watchSN = trim.split(',');
    console.log('watchSN split: ', watchSN);

    const beacon = userDto.beacon.split(',');
    const { userName, projectCode, attendDate } = userDto;
    const updateState: boolean = false;
    const activated: boolean = true;
    const watchSNs = watchSN;

    for (let i = 0; i < watchSN.length; i++) {
      const watchSN = watchSNs[i];
      console.log(watchSN);
      console.log(userCode);

      const watch = await this.watchesRepository.findOne(watchSN);
      console.log(watch);

      if (!watch) {
        const newWatch = this.watchesRepository.create({
          userCode,
          watchSN,
        });
        this.watchesRepository.save(newWatch);
        console.log(newWatch);
      } else {
        watch.userCode = userCode;
        watch.watchUpdateDate = new Date();
        this.watchesRepository.save(watch);
      }
    }

    const user = this.usersRepository.create({
      userCode,
      userName,
      projectCode,
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
      return error;
    }
    //const watchSNs = watchSN;
  }

  dateFormat(date: Date) {
    let month: any = date.getMonth() + 1;
    let day: any = date.getDate();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;

    return date.getFullYear().toString().substring(2) + month + day;
  }
}
