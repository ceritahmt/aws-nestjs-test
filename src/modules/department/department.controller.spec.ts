/* eslint-disable @typescript-eslint/unbound-method */
import { TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { Department } from './entities/department.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import {
  mockCreateDepartmentDto,
  mockDepartment,
  mockDepartmentRepository,
} from './mock/department.mock.data';
import { BadRequestException } from '@nestjs/common';

describe('DepartmentController', () => {
  let controller: DepartmentController;
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

    controller = module.get<DepartmentController>(DepartmentController);
    service = module.get<DepartmentService>(DepartmentService);
    departmentRepository = module.get<Repository<Department>>(
      DEPARTMENT_REPOSITORY_TOKEN,
    );

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a title successfully', async () => {
      jest.spyOn(departmentRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(service, 'create').mockResolvedValue(mockDepartment);

      const result = await controller.create(mockCreateDepartmentDto);
      expect(result).toEqual(mockDepartment);
      expect(service.create).toHaveBeenCalledWith(mockCreateDepartmentDto);
    });

    it('should handle errors when creating department', async () => {
      jest
        .spyOn(service, 'create')
        .mockRejectedValue(
          new BadRequestException('Department already exists'),
        );

      await expect(controller.create(mockCreateDepartmentDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findOne', () => {
    it('should find a title by id', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockDepartment);
      const result = await controller.findOne(mockDepartment.id.toString());
      expect(result).toEqual(mockDepartment);
    });

    it('should find a department by code', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockDepartment);
      const result = await controller.findOne(mockDepartment.code);
      expect(result).toEqual(mockDepartment);
    });

    it('should handle errors when finding department', async () => {
      await expect(controller.findOne('aaa')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should find all departments', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([mockDepartment]);
      const result = await controller.findAll();
      expect(result).toEqual([mockDepartment]);
    });
  });

  describe('update', () => {
    it('should update a department', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockDepartment);
      const result = await controller.update('1', mockCreateDepartmentDto);
      expect(result).toEqual(mockDepartment);
    });

    it('should handle errors when updating department', async () => {
      await expect(
        controller.update('aaa', mockCreateDepartmentDto),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should delete a department', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue({
        message: 'Department deleted successfully',
      });
      const result = await controller.remove(mockDepartment.id.toString());
      expect(result).toEqual({ message: 'Department deleted successfully' });
    });

    it('should handle errors when deleting department', async () => {
      await expect(controller.remove('aaa')).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
