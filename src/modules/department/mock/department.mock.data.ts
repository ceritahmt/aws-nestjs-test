import { CreateDepartmentDto } from '../dto/create-department.dto';
import { Department } from '../entities/department.entity';

export const mockCreateDepartmentDto: CreateDepartmentDto = {
  code: 'TEST',
  name: 'Test Deparment',
  email: 'test@example.com',
};

export const mockDepartment: Department = {
  ...mockCreateDepartmentDto,
  id: 1,
  create_at: new Date(),
  update_at: new Date(),
  delete_at: new Date(),
  users: [],
};

export const mockDepartmentRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  findOneOrFail: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};
