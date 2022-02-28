import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { IhpAdminRepository } from './IhpAdmin.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  logger: Logger;

  constructor(
    @InjectRepository(IhpAdminRepository)
    private ihpAdminRepository: IhpAdminRepository,
    private jwtService: JwtService,
  ) {
    this.logger = new Logger();
  }

  //가입
  async signUp(authCredentialDto: AuthCredentialDto): Promise<object> {
    return this.ihpAdminRepository.createAdmin(authCredentialDto);
  }

  //로그인
  async login(authCredentialDto: AuthCredentialDto): Promise<string> {
    this.logger.log('login 수행');
    const { ihpAdminId, password } = authCredentialDto;
    const admin = await this.ihpAdminRepository.findOne({ ihpAdminId });

    //해당 아이디 존재하고 비밀번호 일치할때 jwt token 반환
    if (admin && (await bcrypt.compare(password, admin.password))) {
      return this.signAdmin(admin.ihpAdminId, admin.adminType);
    } else {
      throw new UnauthorizedException('login fail!');
    }
  }

  //로그인 상태 확인
  async verifyAsync(cookie): Promise<any> {
    return await this.jwtService.verifyAsync(cookie); //쿠키에 있는 토큰의 payload 반환
  }

  signAdmin(ihpAdminId: string, adminType: string): string {
    return this.jwtService.sign({
      adminId: ihpAdminId,
      type: adminType,
    });
  }
}
