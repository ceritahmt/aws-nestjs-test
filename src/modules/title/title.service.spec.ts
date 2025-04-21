/* eslint-disable @typescript-eslint/no-unused-vars */
import { Repository } from 'typeorm';
import { TitleService } from './title.service';
import { Title } from './entities/title.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import {
  mockTitle,
  mockCreateTitleDto,
  mockTitleRepository,
} from './mock/title.mock.data';
import { TitleController } from './title.controller';

describe('TitleService', () => {
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

    service = module.get<TitleService>(TitleService);
    titleRepository = module.get<Repository<Title>>(TITLE_REPOSITORY_TOKEN);

    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a title when it does not exist', async () => {
      jest.spyOn(titleRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(titleRepository, 'create').mockReturnValue(mockTitle);
      jest.spyOn(titleRepository, 'save').mockResolvedValue(mockTitle);

      const result = await service.create(mockCreateTitleDto);
      expect(result).toEqual(mockTitle);
    });

    it('should throw BadRequestException when title already exists', async () => {
      jest.spyOn(titleRepository, 'findOne').mockResolvedValue(mockTitle);
      await expect(service.create(mockCreateTitleDto)).rejects.toThrow(
        new BadRequestException('Title already exists'),
      );
    });
  });

  describe('findAll', () => {
    it('should return all titles', async () => {
      jest.spyOn(titleRepository, 'find').mockResolvedValue([mockTitle]);

      const result = await service.findAll();
      expect(result).toEqual([mockTitle]);
    });
  });

  describe('findOne', () => {
    it('should find a title by id', async () => {
      jest.spyOn(titleRepository, 'findOne').mockResolvedValue(mockTitle);

      const result = await service.findOne(mockTitle.id.toString());
      expect(result).toEqual(mockTitle);
    });

    it('should find a title by code', async () => {
      jest.spyOn(titleRepository, 'findOne').mockResolvedValue(mockTitle);

      const result = await service.findOne(mockTitle.code);
      expect(result).toEqual(mockTitle);
    });

    it('should throw BadRequestException when title not found', async () => {
      jest.spyOn(titleRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(
        new BadRequestException('Title not found'),
      );
    });
  });

  describe('update', () => {
    it('should update a title successfully', async () => {
      jest.spyOn(titleRepository, 'findOne').mockResolvedValue(mockTitle);
      jest.spyOn(titleRepository, 'create').mockReturnValue(mockTitle);
      jest.spyOn(titleRepository, 'update').mockResolvedValue({
        affected: 1,
        raw: [],
        generatedMaps: [],
      });
      jest.spyOn(titleRepository, 'findOneOrFail').mockResolvedValue({
        ...mockTitle,
        name: 'Updated Title',
      });

      const result = await service.update(mockTitle.id.toString(), {
        name: 'Updated Title',
      });

      expect(result.name).toBe('Updated Title');
    });

    it('should throw BadRequestException when title not found', async () => {
      jest.spyOn(titleRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.update('999', { name: 'Updated Title' }),
      ).rejects.toThrow(new BadRequestException('Title not found'));
    });

    it('should throw BadRequestException when update fails', async () => {
      jest.spyOn(titleRepository, 'findOne').mockResolvedValue(mockTitle);
      jest.spyOn(titleRepository, 'update').mockResolvedValue({
        affected: 0,
        raw: [],
        generatedMaps: [],
      });

      await expect(
        service.update(mockTitle.id.toString(), { name: 'Updated Title' }),
      ).rejects.toThrow(new BadRequestException('Title not updated'));
    });
  });

  describe('remove', () => {
    it('should remove a title successfully', async () => {
      jest.spyOn(titleRepository, 'findOne').mockResolvedValue(mockTitle);

      const result = await service.remove(mockTitle.id.toString());
      expect(result).toEqual({ message: 'Title deleted successfully' });
    });

    it('should throw BadRequestException when title not found', async () => {
      jest.spyOn(titleRepository, 'findOne').mockResolvedValue(null);

      await expect(service.remove('999')).rejects.toThrow(
        new BadRequestException('Title not found'),
      );
    });
  });
});
