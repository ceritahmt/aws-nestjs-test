import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TitleService } from './title.service';
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';

@Controller('title')
export class TitleController {
  constructor(private readonly titleService: TitleService) {}

  @Post()
  async create(@Body() createTitleDto: CreateTitleDto) {
    return await this.titleService.create(createTitleDto);
  }

  @Get()
  async findAll() {
    return await this.titleService.findAll();
  }

  @Get(':idOrCode')
  async findOne(@Param('idOrCode') idOrCode: string) {
    return await this.titleService.findOne(idOrCode);
  }

  @Patch(':idOrCode')
  async update(
    @Param('idOrCode') idOrCode: string,
    @Body() updateTitleDto: UpdateTitleDto,
  ) {
    return await this.titleService.update(idOrCode, updateTitleDto);
  }

  @Delete(':idOrCode')
  async remove(@Param('idOrCode') idOrCode: string) {
    return await this.titleService.remove(idOrCode);
  }
}
