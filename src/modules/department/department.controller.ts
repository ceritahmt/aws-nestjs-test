import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { Department } from './entities/department.entity';
import { ApiResponse } from '../../common/dto/api-response.dto';

@ApiBearerAuth()
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @ApiExtraModels(ApiResponse, Department)
  @ApiOkResponse({
    description: 'Create department',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(Department) },
          },
        },
      ],
    },
  })
  @Post()
  async create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return await this.departmentService.create(createDepartmentDto);
  }

  @ApiExtraModels(ApiResponse, Department)
  @ApiOkResponse({
    description: 'Get all departments',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponse) },
        {
          properties: {
            data: { type: 'array', items: { $ref: getSchemaPath(Department) } },
          },
        },
      ],
    },
  })
  @Get()
  async findAll() {
    return await this.departmentService.findAll();
  }

  @ApiExtraModels(ApiResponse, Department)
  @ApiOkResponse({
    description: 'Get department by id or code',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(Department) },
          },
        },
      ],
    },
  })
  @Get(':idOrCode')
  async findOne(@Param('idOrCode') idOrCode: string) {
    return await this.departmentService.findOne(idOrCode);
  }

  @ApiExtraModels(ApiResponse, Department)
  @ApiOkResponse({
    description: 'Update department',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(Department) },
          },
        },
      ],
    },
  })
  @Patch(':idOrCode')
  async update(
    @Param('idOrCode') idOrCode: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return await this.departmentService.update(idOrCode, updateDepartmentDto);
  }

  @Delete(':idOrCode')
  async remove(@Param('idOrCode') idOrCode: string) {
    return await this.departmentService.remove(idOrCode);
  }
}
