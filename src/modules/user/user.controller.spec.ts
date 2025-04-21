/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TitleService } from '../title/title.service';
import { DepartmentService } from '../department/department.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Title } from '../title/entities/title.entity';
import { Department } from '../department/entities/department.entity';
import { Repository } from 'typeorm';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  let userRepository: Repository<User>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  const mockCreateUserDto: CreateUserDto = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password',
    username: 'john.doe',
    titleCode: '1',
    departmentCode: '1',
    code: '1',
  };
  const mockTitle: Title = {
    id: 1,
    name: 'Mr',
    code: '1',
    create_at: new Date(),
    update_at: new Date(),
    users: [],
    delete_at: new Date(),
  };
  const mockDepartment: Department = {
    id: 1,
    name: 'IT',
    code: '1',
    create_at: new Date(),
    update_at: new Date(),
    users: [],
    email: 'it@example.com',
    delete_at: new Date(),
  };
  const mockUser: User = {
    ...mockCreateUserDto,
    department: mockDepartment,
    title: mockTitle,
    id: 1,
    create_at: new Date(),
    update_at: new Date(),
    delete_at: new Date(),
    status: true,
    phone: '1234567890',
    lang: 'en',
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...mockUserWithoutPassword } = mockUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: TitleService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: DepartmentService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);

    jest
      .spyOn(userService, 'findOne')
      .mockResolvedValue(mockUserWithoutPassword);

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
    jest.spyOn(userRepository, 'create').mockReturnValue(mockUser);
    jest.spyOn(userRepository, 'update').mockResolvedValue({
      raw: [],
      affected: 1,
      generatedMaps: [],
    });
    jest.spyOn(userRepository, 'save').mockResolvedValue(mockUser);
    jest.spyOn(userRepository, 'find').mockResolvedValue([mockUser]);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      const result = await controller.create(mockCreateUserDto);
      expect(result).toEqual(mockUserWithoutPassword);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(mockUserWithoutPassword);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const result = await controller.findAll();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...mockUserWithoutPassword } = mockUser;
      expect(result).toEqual([mockUserWithoutPassword]);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const result = await controller.update('1', mockCreateUserDto);
      expect(result).toEqual(mockUserWithoutPassword);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const result = await controller.remove('1');
      expect(result).toEqual({ message: 'User deleted successfully' });
    });
  });
});
