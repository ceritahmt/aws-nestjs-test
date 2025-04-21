/* eslint-disable @typescript-eslint/no-unused-vars */
import { Repository } from 'typeorm';
import { DepartmentService } from './department.service';
import { Department } from './entities/department.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import {
  mockDepartment,
  mockCreateDepartmentDto,
  mockDepartmentRepository,
} from './mock/department.mock.data';
import { DepartmentController } from './department.controller';

describe('DepartmentService', () => {
  let service: DepartmentService;
  let departmentRepository: Repository<Department>;

  const DEPARTMENT_REPOSITORY_TOKEN = getRepositoryToken(Department);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentController],
      providers: [
        DepartmentService,
        {
          provide: DEPARTMENT_REPOSITORY_TOKEN,
          useValue: mockDepartmentRepository,
        },
      ],
    }).compile();

    service = module.get<DepartmentService>(DepartmentService);
    departmentRepository = module.get<Repository<Department>>(
      DEPARTMENT_REPOSITORY_TOKEN,
    );

    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a department when it does not exist', async () => {
      jest.spyOn(departmentRepository, 'findOne').mockResolvedValue(null);
      jest
        .spyOn(departmentRepository, 'create')
        .mockReturnValue(mockDepartment);
      jest
        .spyOn(departmentRepository, 'save')
        .mockResolvedValue(mockDepartment);

      const result = await service.create(mockCreateDepartmentDto);
      expect(result).toEqual(mockDepartment);
    });

    it('should throw BadRequestException when department already exists', async () => {
      jest
        .spyOn(departmentRepository, 'findOne')
        .mockResolvedValue(mockDepartment);
      await expect(service.create(mockCreateDepartmentDto)).rejects.toThrow(
        new BadRequestException(
          'Department with this code or name already exists',
        ),
      );
    });
  });

  describe('findAll', () => {
    it('should return all departments', async () => {
      jest
        .spyOn(departmentRepository, 'find')
        .mockResolvedValue([mockDepartment]);

      const result = await service.findAll();
      expect(result).toEqual([mockDepartment]);
    });
  });

  describe('findOne', () => {
    it('should find a department by id', async () => {
      jest
        .spyOn(departmentRepository, 'findOne')
        .mockResolvedValue(mockDepartment);

      const result = await service.findOne(mockDepartment.id.toString());
      expect(result).toEqual(mockDepartment);
    });

    it('should find a department by code', async () => {
      jest
        .spyOn(departmentRepository, 'findOne')
        .mockResolvedValue(mockDepartment);

      const result = await service.findOne(mockDepartment.code);
      expect(result).toEqual(mockDepartment);
    });

    it('should throw BadRequestException when department not found', async () => {
      jest.spyOn(departmentRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(
        new BadRequestException('Department not found'),
      );
    });
  });

  describe('update', () => {
    it('should update a department successfully', async () => {
      jest
        .spyOn(departmentRepository, 'findOne')
        .mockResolvedValue(mockDepartment);
      jest
        .spyOn(departmentRepository, 'create')
        .mockReturnValue(mockDepartment);
      jest.spyOn(departmentRepository, 'update').mockResolvedValue({
        affected: 1,
        raw: [],
        generatedMaps: [],
      });
      jest.spyOn(departmentRepository, 'findOneOrFail').mockResolvedValue({
        ...mockDepartment,
        name: 'Updated Department',
      });

      const result = await service.update(mockDepartment.id.toString(), {
        name: 'Updated Department',
      });

      expect(result.name).toBe('Updated Department');
    });

    it('should throw BadRequestException when department not found', async () => {
      jest.spyOn(departmentRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.update('999', { name: 'Updated Department' }),
      ).rejects.toThrow(new BadRequestException('Department not found'));
    });

    it('should throw BadRequestException when update fails', async () => {
      jest
        .spyOn(departmentRepository, 'findOne')
        .mockResolvedValue(mockDepartment);
      jest.spyOn(departmentRepository, 'update').mockResolvedValue({
        affected: 0,
        raw: [],
        generatedMaps: [],
      });

      await expect(
        service.update(mockDepartment.id.toString(), {
          name: 'Updated Department',
        }),
      ).rejects.toThrow(new BadRequestException('Department not updated'));
    });
  });

  describe('remove', () => {
    it('should remove a department successfully', async () => {
      jest
        .spyOn(departmentRepository, 'findOne')
        .mockResolvedValue(mockDepartment);

      const result = await service.remove(mockDepartment.id.toString());
      expect(result).toEqual({ message: 'Department deleted successfully' });
    });

    it('should throw BadRequestException when department not found', async () => {
      jest.spyOn(departmentRepository, 'findOne').mockResolvedValue(null);

      await expect(service.remove('999')).rejects.toThrow(
        new BadRequestException('Department not found'),
      );
    });
  });
});
