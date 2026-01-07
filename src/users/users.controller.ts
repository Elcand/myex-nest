import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { User } from './users.entity';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.findAll(email);
  }

  @Post()
  crateUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.name, body.password);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Get('/auth/current-user')
  @UseGuards(AuthGuard)
  currentUser(@CurrentUser() user: User) {
    return user;
  }
}
