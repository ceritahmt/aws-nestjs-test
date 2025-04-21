import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { isNumberString } from 'class-validator';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}
  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const existingDepartment = await this.departmentRepository.findOne({
      where: [
        { code: createDepartmentDto.code },
        { name: createDepartmentDto.name },
      ],
    });

    if (existingDepartment) {
      throw new BadRequestException(
        'Department with this code or name already exists',
      );
    }
    const department = this.departmentRepository.create(createDepartmentDto);
    return await this.departmentRepository.save(department);
  }

  async findAll(): Promise<Department[]> {
    return await this.departmentRepository.find();
  }

  async findOne(idOrCode: string): Promise<Department> {
    const existingDepartment = await this.departmentRepository.findOne({
      where: [
        { id: isNumberString(idOrCode) ? parseInt(idOrCode) : 0 },
        { code: idOrCode },
      ],
    });
    if (!existingDepartment) {
      throw new BadRequestException('Department not found');
    }
    return existingDepartment;
  }

  async update(
    idOrCode: string,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department> {
    const existingDepartment = await this.departmentRepository.findOne({
      where: [
        { id: isNumberString(idOrCode) ? parseInt(idOrCode) : 0 },
        { code: idOrCode },
      ],
    });
    if (!existingDepartment) {
      throw new BadRequestException('Department not found');
    }
    const department = this.departmentRepository.create(updateDepartmentDto);
    const res = await this.departmentRepository.update(
      existingDepartment.id,
      department,
    );

    if (res.affected == 0) {
      throw new BadRequestException('Department not updated');
    }
    return await this.departmentRepository.findOneOrFail({
      where: { id: existingDepartment.id },
    });
  }

  async remove(idOrCode: string): Promise<{ message: string }> {
    const existingDepartment = await this.departmentRepository.findOne({
      where: [
        { id: isNumberString(idOrCode) ? parseInt(idOrCode) : 0 },
        { code: idOrCode },
      ],
    });
    if (!existingDepartment) {
      throw new BadRequestException('Department not found');
    }
    await this.departmentRepository.delete(existingDepartment.id);
    return { message: 'Department deleted successfully' };
  }
}
