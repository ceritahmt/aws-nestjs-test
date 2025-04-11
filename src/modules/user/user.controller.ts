import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return user;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':idOrCode')
  findOne(@Param('idOrCode') idOrCode: string) {
    return this.userService.findOne(idOrCode);
  }

  @Patch(':idOrCode')
  update(@Param('idOrCode') idOrCode: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(idOrCode, updateUserDto);
  }

  @Delete(':idOrCode')
  remove(@Param('idOrCode') idOrCode: string) {
    return this.userService.remove(idOrCode);
  }
}
