import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { mockTitle } from '../../title/mock/title.mock.data';
import { mockDepartment } from '../../department/mock/department.mock.data';

export const mockCreateUserDto: CreateUserDto = {
  email: 'test@example.com',
  password: 'password123',
  name: 'Test User',
  username: 'testuser',
  titleCode: '1',
  departmentCode: '1',
  code: '1',
};

export const mockUser: User = {
  ...mockCreateUserDto,
  id: 1,
  create_at: new Date(),
  update_at: new Date(),
  delete_at: new Date(),
  status: true,
  lang: 'en',
  phone: '1234567890',
  department: mockDepartment,
  title: mockTitle,
};

export const mockUserRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  findOneOrFail: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};
