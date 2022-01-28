import { UsersService } from './users.service';
import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() userDto: UserDto): Promise<object> {
    console.log(userDto);

    return this.usersService.createUser(userDto);
  }
}
