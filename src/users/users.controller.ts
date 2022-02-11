import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
@UseGuards(AuthGuard('jwt2'))
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() userDto: UserDto): Promise<object> {
    console.log(userDto);

    return this.usersService.createUser(userDto);
  }

  @Get('/user')
  async user(@Req() request: Request) {
    return 'hihi';
  }
}
