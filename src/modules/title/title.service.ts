import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';
import { Title } from './entities/title.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { isNumberString } from 'class-validator';

@Injectable()
export class TitleService {
  constructor(
    @InjectRepository(Title)
    private readonly titleRepository: Repository<Title>,
  ) { }

  async create(createTitleDto: CreateTitleDto): Promise<Title> {
    const existingTitle = await this.titleRepository.findOne({
      where: [
        { code: createTitleDto.code },
      ],
    })
    const title = this.titleRepository.create(createTitleDto);
    return await this.titleRepository.save(title);
  }

  async findAll(): Promise<Title[]> {
    return await this.titleRepository.find();
  }

  async findOne(idOrCode: string):Promise<Title> {
    const title = await this.titleRepository.findOne({
      where: [
        { id: isNumberString(idOrCode) ? parseInt(idOrCode) : 0 },
        { code: idOrCode },
      ],
    });
    if (!title) {
      throw new BadRequestException('Title not found');
    }

    return title;
  }

  async update(idOrCode: string, updateTitleDto: UpdateTitleDto):Promise<Title> {
    const existingTitle = await this.titleRepository.findOne({
      where: [
        { id: isNumberString(idOrCode)? parseInt(idOrCode) : 0 },
        { code: idOrCode },
      ],
    });
    if (!existingTitle) {
      throw new BadRequestException('Title not found');
    }

    const title = this.titleRepository.create(updateTitleDto);
    const res= await this.titleRepository.update(existingTitle.id,title);

    if(res.affected==0){
      throw new BadRequestException('Title not updated');
    }
    const updatedTitle = await this.titleRepository.findOneOrFail({
      where: { id: existingTitle.id }, 
    });

    return updatedTitle;

  }

  async remove(idOrCode: string):Promise<undefined>  {
    const existingTitle = await this.titleRepository.findOne({
      where: [
        { id: isNumberString(idOrCode)? parseInt(idOrCode) : 0 },
        { code: idOrCode },
      ], 
    });

    if(!existingTitle){
      throw new BadRequestException('Title not found'); 
    }

    await this.titleRepository.delete(existingTitle.id);

    return;
  }
}
