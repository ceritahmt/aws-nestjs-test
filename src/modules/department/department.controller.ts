import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  async create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return await this.departmentService.create(createDepartmentDto);
  }

  @Get()
  async findAll() {
    return await this.departmentService.findAll();
  }

  @Get(':idOrCode')
  async findOne(@Param('idOrCode') idOrCode: string) {
    return await this.departmentService.findOne(idOrCode);
  }

  @Patch(':idOrCode')
  async update(@Param('idOrCode') idOrCode: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return await this.departmentService.update(idOrCode, updateDepartmentDto);
  }

  @Delete(':idOrCode')
  async remove(@Param('idOrCode') idOrCode: string) {
    return await this.departmentService.remove(idOrCode);
  }
}
