import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { IhpAdmin } from './IHPadmin.entity';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(IhpAdmin)
export class IhpAdminRepository extends Repository<IhpAdmin> {
  //관리자 생성
  async createAdmin(authCredentialDto: AuthCredentialDto): Promise<object> {
    const { ihpAdminId, password } = authCredentialDto;

    //암호 해쉬
    const salt = await bcrypt.genSalt();
    const hashedPw = await bcrypt.hash(password, salt);

    const adminType = 'super';

    const admin = this.create({
      ihpAdminId,
      password: hashedPw,
      adminType,
    });

    try {
      await this.save(admin);
      return {
        message: '등록되었습니다.',
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Existing Id');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
