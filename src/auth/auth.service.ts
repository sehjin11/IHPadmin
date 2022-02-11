import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { IhpAdminRepository } from './IhpAdmin.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(IhpAdminRepository)
    private ihpAdminRepository: IhpAdminRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<object> {
    return this.ihpAdminRepository.createAdmin(authCredentialDto);
  }

  //로그인
  async login(authCredentialDto: AuthCredentialDto): Promise<string> {
    const { ihpAdminId, password } = authCredentialDto;
    const admin = await this.ihpAdminRepository.findOne({ ihpAdminId });

    //해당 아이디 존재하고 비밀번호 일치할때 jwt token 반환
    if (admin && (await bcrypt.compare(password, admin.password))) {
      return this.signAdmin(admin.ihpAdminId, 'IHPadmin');
    } else {
      throw new UnauthorizedException('login fail!');
    }
  }

  async verifyAsync(cookie) {
    return await this.jwtService.verifyAsync(cookie); //쿠키 토큰 payload 반환
  }

  signAdmin(ihpAdminId: string, type: string) {
    return this.jwtService.sign({
      adminId: ihpAdminId,
      type: type,
    });
  }
}
