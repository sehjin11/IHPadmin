import { JwtService } from '@nestjs/jwt';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { Request, response, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //회원가입
  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() authCredentialDto: AuthCredentialDto): Promise<object> {
    return this.authService.signUp(authCredentialDto);
  }

  //로그인
  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(
    @Body() authCredentialDto: AuthCredentialDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwt = await this.authService.login(authCredentialDto); //토큰 받기
    response.cookie('jwt', jwt, { httpOnly: true }); //쿠키 넣음

    return {
      message: 'success',
    };
  }

  @Post('/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'logout success',
    };
  }

  //로그인 확인
  @Get('/user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.authService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      return data;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
