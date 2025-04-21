/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { TitleController } from './title.controller';
import { TitleService } from './title.service';
import { Title } from './entities/title.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import {
  mockTitle,
  mockCreateTitleDto,
  mockTitleRepository,
} from './mock/title.mock.data';

describe('TitleController', () => {
  let controller: TitleController;
  let service: TitleService;
  let titleRepository: Repository<Title>;

  const TITLE_REPOSITORY_TOKEN = getRepositoryToken(Title);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TitleController],
      providers: [
        TitleService,
        {
          provide: TITLE_REPOSITORY_TOKEN,
          useValue: mockTitleRepository,
        },
      ],
    }).compile();

    controller = module.get<TitleController>(TitleController);
    service = module.get<TitleService>(TitleService);
    titleRepository = module.get<Repository<Title>>(TITLE_REPOSITORY_TOKEN);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a title successfully', async () => {
      jest.spyOn(titleRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(service, 'create').mockResolvedValue(mockTitle);

      const result = await controller.create(mockCreateTitleDto);
      expect(result).toEqual(mockTitle);
      expect(service.create).toHaveBeenCalledWith(mockCreateTitleDto);
    });

    it('should handle errors when creating title', async () => {
      jest
        .spyOn(service, 'create')
        .mockRejectedValue(new BadRequestException('Title already exists'));

      await expect(controller.create(mockCreateTitleDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findOne', () => {
    it('should find a title by id', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockTitle);
      const result = await controller.findOne(mockTitle.id.toString());
      expect(result).toEqual(mockTitle);
    });

    it('should find a title by code', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockTitle);
      const result = await controller.findOne(mockTitle.code);
      expect(result).toEqual(mockTitle);
    });

    it('should handle errors when finding title', async () => {
      await expect(controller.findOne('aaa')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should find all titles', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([mockTitle]);
      const result = await controller.findAll();
      expect(result).toEqual([mockTitle]);
    });
  });

  describe('update', () => {
    it('should update a title', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockTitle);
      const result = await controller.update('1', mockCreateTitleDto);
      expect(result).toEqual(mockTitle);
    });

    it('should handle errors when updating title', async () => {
      await expect(
        controller.update('aaa', mockCreateTitleDto),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should delete a title', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue({
        message: 'Title deleted successfully',
      });
      const result = await controller.remove(mockTitle.id.toString());
      expect(result).toEqual({ message: 'Title deleted successfully' });
    });

    it('should handle errors when deleting title', async () => {
      await expect(controller.remove('aaa')).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
