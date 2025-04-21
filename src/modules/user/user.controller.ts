import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiResponse } from '../../common/dto/api-response.dto';
import { User } from './entities/user.entity';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiExtraModels(ApiResponse, User)
  @ApiOkResponse({
    description: 'Create user',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(User) },
          },
        },
      ],
    },
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return user;
  }

  @ApiExtraModels(ApiResponse, User)
  @ApiOkResponse({
    description: 'User list',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponse) },
        {
          properties: {
            data: { type: 'array', items: { $ref: getSchemaPath(User) } },
          },
        },
      ],
    },
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiExtraModels(ApiResponse, User)
  @ApiOkResponse({
    description: 'Create user',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(User) },
          },
        },
      ],
    },
  })
  @Get(':idOrCode')
  findOne(@Param('idOrCode') idOrCode: string) {
    return this.userService.findOne(idOrCode);
  }

  @ApiExtraModels(ApiResponse, User)
  @ApiOkResponse({
    description: 'Create user',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(User) },
          },
        },
      ],
    },
  })
  @Patch(':idOrCode')
  update(
    @Param('idOrCode') idOrCode: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(idOrCode, updateUserDto);
  }

  @Delete(':idOrCode')
  remove(@Param('idOrCode') idOrCode: string) {
    return this.userService.remove(idOrCode);
  }
}
