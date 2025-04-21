/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { TitleService } from '../title/title.service';
import { DepartmentService } from '../department/department.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { BadRequestException } from '@nestjs/common';
import {
  mockCreateUserDto,
  mockUser,
  mockUserRepository,
} from './mock/user.mock.data';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;
  let titleService: TitleService;
  let departmentService: DepartmentService;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: mockUserRepository,
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

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be userRepository defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(userRepository, 'create').mockReturnValue(mockUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue(mockUser);
      jest.spyOn(service, 'findOne').mockResolvedValue(mockUser);
      const user = await service.create(mockCreateUserDto);
      expect(user).toBeDefined();
      expect(user.email).toBe(mockCreateUserDto.email);
      expect(user.name).toBe(mockCreateUserDto.name);
      expect(user.username).toBe(mockCreateUserDto.username);
    });

    it('should throw an error if the user already exists', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
      await expect(service.create(mockCreateUserDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw an error if the title is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      jest
        .spyOn(titleService, 'findOne')
        .mockRejectedValue(new BadRequestException('Title not found'));

      await expect(service.create(mockCreateUserDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw an error if the department is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      jest
        .spyOn(departmentService, 'findOne')
        .mockRejectedValue(new BadRequestException('Department not found'));

      await expect(service.create(mockCreateUserDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should call find method', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValue([mockUser]);
      const users = await service.findAll();
      expect(users).toBeDefined();
      expect(users.length).toBe(1);
      expect(users[0].id).toBe(mockUser.id);
    });
  });

  describe('findOne', () => {
    it('should call findOne method', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
      const user = await service.findOne(mockUser.id.toString());
      expect(user).toBeDefined();
      expect(user.id).toBe(mockUser.id);
    });

    it('should throw an error if the user is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      await expect(service.findOne(mockUser.id.toString())).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('update', () => {
    const updateUserDto: UpdateUserDto = {
      name: 'test',
    };
    it('should call update method', async () => {
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

    it('should throw an error if the user is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      await expect(
        service.update(mockUser.id.toString(), updateUserDto),
      ).rejects.toThrow(BadRequestException);
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
