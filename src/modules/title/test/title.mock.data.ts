import { CreateTitleDto } from '../dto/create-title.dto';
import { Title } from '../entities/title.entity';

export const mockCreateTitleDto: CreateTitleDto = {
  code: 'TEST',
  name: 'Test Title',
};

export const mockTitle: Title = {
  ...mockCreateTitleDto,
  id: 1,
  create_at: new Date(),
  update_at: new Date(),
  delete_at: new Date(),
  users: [],
};

export const mockTitleRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  findOneOrFail: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};
