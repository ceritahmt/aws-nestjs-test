/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { TitleService } from '../title/title.service';
import { DepartmentService } from '../department/department.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;
  let titleService: TitleService;
  let departmentService: DepartmentService;

  const createUserDto: CreateUserDto = {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
    username: 'testuser',
    titleCode: '1',
    departmentCode: '1',
    code: '1',
  };
  const mockUser: User = {
    ...createUserDto,
    id: 1,
    create_at: new Date(),
    update_at: new Date(),
    delete_at: new Date(),
    status: true,
    lang: 'en',
    phone: '1234567890',
    department: {
      id: 1,
      code: '1',
      name: 'Test Department',
      email: 'test@example.com',
      create_at: new Date(),
      update_at: new Date(),
      delete_at: new Date(),
      users: [],
    },
    title: {
      id: 1,
      code: '1',
      name: 'Test Title',
      create_at: new Date(),
      update_at: new Date(),
      delete_at: new Date(),
      users: [],
    },
  };

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
    titleService = module.get<TitleService>(TitleService);
    departmentService = module.get<DepartmentService>(DepartmentService);

    jest.spyOn(service, 'findOne').mockResolvedValue(mockUser);
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
    jest.spyOn(userRepository, 'create').mockReturnValue(mockUser);
    jest.spyOn(userRepository, 'save').mockResolvedValue(mockUser);
    jest.spyOn(userRepository, 'find').mockResolvedValue([mockUser]);
    jest.spyOn(titleService, 'findOne').mockResolvedValue(mockUser.title);
    jest
      .spyOn(departmentService, 'findOne')
      .mockResolvedValue(mockUser.department);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be userRepository defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const user = await service.create(createUserDto);
      expect(user).toBeDefined();
      expect(user.email).toBe(createUserDto.email);
      expect(user.name).toBe(createUserDto.name);
      expect(user.username).toBe(createUserDto.username);
    });

    it('should call create method with correct parameters', async () => {
      await service.create(createUserDto);
      expect(userRepository.create).toHaveBeenCalledWith({
        ...createUserDto,
        password: expect.any(String) as string,
        department: mockUser.department,
        title: mockUser.title,
      });
    });

    it('should call save method', async () => {
      await service.create(createUserDto);
      expect(userRepository.save).toHaveBeenCalledWith(mockUser);
    });

    it('should call findOne method', async () => {
      await service.create(createUserDto);
      expect(service.findOne).toHaveBeenCalledWith(mockUser.id.toString());
    });
  });

  describe('findAll', () => {
    it('should call find method', async () => {
      const users = await service.findAll();
      expect(users).toBeDefined();
      expect(users.length).toBe(1);
      expect(users[0].id).toBe(mockUser.id);
    });
  });

  describe('findOne', () => {
    it('should call findOne method', async () => {
      const user = await service.findOne(mockUser.id.toString());
      expect(user).toBeDefined();
      expect(user.id).toBe(mockUser.id);
    });
  });

  describe('update', () => {
    it('should call update method', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'test',
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue({
        ...mockUser,
        ...updateUserDto,
      });
      jest.spyOn(userRepository, 'create').mockReturnValue({
        ...mockUser,
        ...updateUserDto,
      });
      jest.spyOn(userRepository, 'update').mockResolvedValue({
        raw: [],
        affected: 1,
        generatedMaps: [],
      });

      const user = await service.update(mockUser.id.toString(), updateUserDto);

      expect(userRepository.update).toHaveBeenCalledWith(mockUser.id, {
        ...mockUser,
        name: 'test',
      });

      expect(user).toBeDefined();
      expect(user.name).toBe('test');
    });
  });

  describe('remove', () => {
    it('should call remove method', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
      const result = await service.remove(mockUser.id.toString());
      expect(userRepository.delete).toHaveBeenCalledWith(mockUser.id);
      expect(result).toBeDefined();
      expect(result.message).toBe('User deleted successfully');
    });
  });
});
